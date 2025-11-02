import React from 'react';
import { ModernLayout } from '@/components/layout/modern-layout';
import { VoiceAssistant } from '@/components/voice/voice-assistant';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voice Legal Guidance - Talk to Our AI Assistant | Car Crashes in Atlanta',
  description: 'Speak with our AI-powered voice assistant about your car accident. Get immediate guidance on what to do after an accident, understand your rights, and learn about the legal process in Atlanta.',
  keywords: [
    'voice legal assistant',
    'AI car accident help',
    'speak to legal assistant',
    'accident guidance Atlanta',
    'voice-activated legal help',
    'car accident advice',
    'talk to AI lawyer',
    'immediate accident help'
  ],
  openGraph: {
    title: 'Voice Legal Guidance - Talk to Our AI Assistant',
    description: 'Get immediate voice guidance about your car accident in Atlanta. Available 24/7.',
    type: 'website',
  },
};

// Structured data for Voice Assistant page
const voiceAssistantSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Voice Legal Guidance Assistant",
  "description": "AI-powered voice assistant for car accident victims in Atlanta providing immediate legal guidance",
  "url": "https://www.carcrashatl.com/voice-assistant",
  "applicationCategory": "LegalApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Voice-activated legal guidance",
    "24/7 availability",
    "Empathetic AI responses",
    "Real-time conversation",
    "Multi-language support",
    "Privacy-focused design"
  ],
  "provider": {
    "@type": "Organization",
    "name": "Car Crashes in Atlanta",
    "url": "https://www.carcrashatl.com"
  }
};

export default function VoiceAssistantPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(voiceAssistantSchema),
        }}
      />
      
      <ModernLayout>
        <main id="main-content" role="main" aria-label="Voice Legal Guidance Assistant">
          <VoiceAssistant />
          
          {/* Additional Information Section */}
          <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                How Our Voice Assistant Helps You
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Immediate Help</h3>
                  <p className="text-gray-600">
                    Get guidance right away, day or night. No waiting for office hours or appointments.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Empathetic Support</h3>
                  <p className="text-gray-600">
                    Our AI understands emotions and provides compassionate, stress-free guidance.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Private & Secure</h3>
                  <p className="text-gray-600">
                    Your conversations are confidential. We prioritize your privacy and security.
                  </p>
                </div>
              </div>

              <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Perfect For:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Accident Victims</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Just had an accident and need immediate guidance</li>
                      <li>• Want to understand your legal rights</li>
                      <li>• Need help documenting your case</li>
                      <li>• Wondering if you need an attorney</li>
                      <li>• Have questions about insurance claims</li>
                      <li>• Confused about the legal process</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Attorneys & Professionals</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Quick reference for Georgia accident law</li>
                      <li>• Help clients understand the process</li>
                      <li>• 24/7 resource for client education</li>
                      <li>• Preliminary case assessment tool</li>
                      <li>• Streamline client intake process</li>
                      <li>• Provide after-hours support</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-lg font-bold text-blue-900 mb-2">🎙️ Voice Tips</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Speak clearly and naturally</li>
                  <li>• Use a quiet environment for best results</li>
                  <li>• Ask follow-up questions if you need clarification</li>
                  <li>• The AI adapts to your level of understanding</li>
                  <li>• Conversation history is shown below the call controls</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </ModernLayout>
    </>
  );
}

