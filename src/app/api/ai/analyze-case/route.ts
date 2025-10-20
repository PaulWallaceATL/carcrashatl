import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';
export const maxDuration = 30; // 30 seconds max for analysis

// Initialize OpenAI client lazily (at runtime, not build time)
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  
  return new OpenAI({
    apiKey: apiKey,
  });
}

interface CaseAnalysisRequest {
  caseDetails: {
    accidentDate: string;
    location: string;
    description: string;
    injuries: string;
    policeReportFiled: boolean;
  };
  uploadedFiles: Array<{
    name: string;
    type: string;
    category: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: CaseAnalysisRequest = await request.json();
    const { caseDetails, uploadedFiles } = body;

    // Validate required fields
    if (!caseDetails.description || !caseDetails.accidentDate) {
      return NextResponse.json(
        { error: 'Missing required case details' },
        { status: 400 }
      );
    }

    // Prepare prompt for OpenAI
    const prompt = `You are an expert car accident attorney AI assistant. Analyze this car accident case and provide a detailed assessment.

CASE DETAILS:
- Accident Date: ${caseDetails.accidentDate}
- Location: ${caseDetails.location}
- Description: ${caseDetails.description}
- Injuries: ${caseDetails.injuries || 'None reported'}
- Police Report Filed: ${caseDetails.policeReportFiled ? 'Yes' : 'No'}

EVIDENCE UPLOADED:
${uploadedFiles.map(f => `- ${f.name} (${f.category})`).join('\n')}

Provide a JSON response with the following structure:
{
  "strengthScore": <number 0-100>,
  "estimatedValue": {
    "min": <number>,
    "max": <number>
  },
  "keyFactors": [<array of 4-6 positive factors>],
  "nextSteps": [<array of 4-6 recommended actions>],
  "urgentActions": [<array of 3-5 time-sensitive actions>],
  "reasoning": "<brief explanation of the assessment>"
}

Consider:
1. Evidence quality and completeness
2. Liability clarity
3. Injury severity
4. Georgia car accident law
5. Typical settlement ranges for similar cases
6. Statute of limitations (2 years in Georgia)

Be realistic, helpful, and legally accurate. Focus on empowering the victim with knowledge.`;

    // Get OpenAI client (lazy initialization)
    const openai = getOpenAIClient();
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Latest model
      messages: [
        {
          role: 'system',
          content: 'You are an expert car accident case analyst. Provide detailed, accurate, and helpful case assessments in JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 1500,
    });

    const analysisText = completion.choices[0]?.message?.content;
    
    if (!analysisText) {
      throw new Error('No response from AI');
    }

    const analysis = JSON.parse(analysisText);

    // Return the analysis
    return NextResponse.json({
      success: true,
      analysis: {
        strengthScore: analysis.strengthScore,
        estimatedValue: analysis.estimatedValue,
        keyFactors: analysis.keyFactors,
        nextSteps: analysis.nextSteps,
        urgentActions: analysis.urgentActions,
        reasoning: analysis.reasoning
      },
      usage: {
        tokens: completion.usage?.total_tokens || 0,
        model: completion.model
      }
    });

  } catch (error: any) {
    console.error('AI Analysis Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze case',
        message: error.message || 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
      },
      { status: 500 }
    );
  }
}

