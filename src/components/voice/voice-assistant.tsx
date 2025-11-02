'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotions?: string[];
}

export function VoiceAssistant() {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<string>('Ready to help');
  const [error, setError] = useState<string>('');
  
  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const isSendingRef = useRef<boolean>(false);

  // System prompt for the legal guidance assistant
  const SYSTEM_PROMPT = `You are a compassionate and knowledgeable legal guidance assistant for people who have been in car accidents in Atlanta, Georgia. Your role is to:

1. Provide clear, easy-to-understand guidance about what to do after a car accident
2. Help people understand their rights without giving direct legal advice
3. Explain the process of working with personal injury attorneys
4. Answer questions about Georgia car accident laws in simple terms
5. Guide people on documenting their accident properly
6. Explain when they should seek medical attention and legal representation

IMPORTANT GUIDELINES:
- Be empathetic - people calling may be stressed, injured, or confused
- Use simple language, avoiding legal jargon unless specifically asked
- Never provide direct legal advice or guarantees about case outcomes
- Always recommend speaking with a qualified attorney for case-specific advice
- Be patient and encouraging
- Adapt your language to the caller's level of understanding
- For attorneys calling, you can use more technical legal terminology

KEY TOPICS YOU CAN DISCUSS:
- Steps to take immediately after an accident (safety, documentation, medical care)
- What information to collect at the accident scene
- How to deal with insurance companies
- Understanding fault and liability in Georgia
- Types of compensation available
- The statute of limitations in Georgia (2 years for most personal injury cases)
- What to expect when working with an attorney
- Common mistakes to avoid after an accident

Remember: You're here to educate and guide, not to practice law. Always encourage people to consult with a licensed attorney for their specific situation.`;

  // Connect to Hume EVI
  const connectToVoiceAssistant = async () => {
    try {
      setStatus('Connecting...');
      setError('');

      // Get access token from our API
      const response = await fetch('/api/hume/auth');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to authenticate');
      }

      const { accessToken } = await response.json();

      // Initialize audio context
      audioContextRef.current = new AudioContext();

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });

      // Helper to turn Blob -> base64 string
      const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1] || '';
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };

      // Setup media recorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = async (event) => {
        try {
          if (event.data.size > 0 && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            // Convert to base64 and stream to Hume as audio_input
            const base64 = await blobToBase64(event.data);
            const payload = {
              type: 'audio_input',
              data: base64,
            } as const;
            socketRef.current.send(JSON.stringify(payload));
          }
        } catch (err) {
          console.error('Error sending audio chunk:', err);
        }
      };

      // Connect to Hume EVI WebSocket
      const wsUrl = `wss://api.hume.ai/v0/evi/chat?access_token=${accessToken}`;

      socketRef.current = new WebSocket(wsUrl);

      socketRef.current.onopen = () => {
        setIsConnected(true);
        setStatus('Connected - Start speaking');
        
        // Send session settings with systemPrompt
        socketRef.current?.send(JSON.stringify({
          type: 'session_settings',
          systemPrompt: SYSTEM_PROMPT,
        }));

        // Start recording
        mediaRecorderRef.current?.start(100); // Send data every 100ms
      };

      socketRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'user_message') {
            setMessages(prev => [...prev, {
              role: 'user',
              content: data.text,
              timestamp: new Date(),
            }]);
          } else if (data.type === 'assistant_message') {
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: data.text,
              timestamp: new Date(),
              emotions: data.emotions,
            }]);
          } else if (data.type === 'audio_output') {
            // Play audio response
            playAudioResponse(data.data);
          }
        } catch (err) {
          console.error('Error parsing message:', err);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error occurred');
        setStatus('Error - Please try again');
      };

      socketRef.current.onclose = () => {
        setIsConnected(false);
        setStatus('Disconnected');
        cleanupConnection();
      };

    } catch (err) {
      console.error('Error connecting:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect');
      setStatus('Connection failed');
    }
  };

  // Play audio response from Hume
  const playAudioResponse = async (audioData: string) => {
    if (!audioContextRef.current) return;

    try {
      const audioBuffer = await audioContextRef.current.decodeAudioData(
        Uint8Array.from(atob(audioData), c => c.charCodeAt(0)).buffer
      );
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.start();
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  };

  // Disconnect from voice assistant
  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
    cleanupConnection();
  };

  // Cleanup resources
  const cleanupConnection = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }

    mediaRecorderRef.current = null;
    socketRef.current = null;
    audioContextRef.current = null;
    audioChunksRef.current = [];
  };

  // Toggle mute
  const toggleMute = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupConnection();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Voice Legal Guidance Assistant
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Talk to our AI assistant about your car accident in Atlanta
        </p>
        <p className="text-sm text-gray-500">
          Get immediate guidance on what to do after an accident, understand your rights, and learn about the legal process
        </p>
      </div>

      {/* Status Display */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="flex items-center justify-center mb-6">
          <div className={`w-4 h-4 rounded-full mr-3 ${
            isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
          }`} />
          <span className="text-lg font-medium">{status}</span>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">
              <strong>Error:</strong> {error}
            </p>
            <p className="text-red-600 text-xs mt-2">
              Check your Hume API credentials and permissions in your server environment (e.g., Vercel project settings).
            </p>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          {!isConnected ? (
            <button
              onClick={connectToVoiceAssistant}
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              <Phone size={24} />
              Start Voice Call
            </button>
          ) : (
            <>
              <button
                onClick={toggleMute}
                className={`flex items-center gap-2 px-6 py-4 rounded-lg transition-colors ${
                  isMuted 
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
              
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <PhoneOff size={24} />
                End Call
              </button>
            </>
          )}
        </div>
      </div>

      {/* Conversation Transcript */}
      {messages.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversation</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-50 ml-8'
                    : 'bg-gray-50 mr-8'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`font-semibold ${
                    message.role === 'user' ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                <p className="mt-2 text-gray-800">{message.content}</p>
                {message.emotions && message.emotions.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    Detected emotions: {message.emotions.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Information Cards */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-3">What You Can Ask</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• What should I do immediately after an accident?</li>
            <li>• How do I document my accident properly?</li>
            <li>• When should I contact an attorney?</li>
            <li>• What compensation am I entitled to?</li>
            <li>• How long do I have to file a claim in Georgia?</li>
            <li>• What if the other driver doesn't have insurance?</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-900 mb-3">Why Use Voice?</h3>
          <ul className="space-y-2 text-green-800 text-sm">
            <li>• Faster than typing, especially if injured</li>
            <li>• More natural conversation flow</li>
            <li>• Empathetic AI understands your emotions</li>
            <li>• Available 24/7 for immediate guidance</li>
            <li>• Private and confidential</li>
            <li>• No obligation or cost</li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-bold text-yellow-900 mb-2">Important Notice</h3>
        <p className="text-yellow-800 text-sm">
          This voice assistant provides general information and guidance only. It does not constitute legal advice 
          and does not create an attorney-client relationship. For specific legal advice about your situation, 
          please consult with a licensed attorney. All conversations are for educational purposes.
        </p>
      </div>
    </div>
  );
}

