import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      phone,
      case_type = 'car_accident',
      incident_date,
      incident_location,
      description,
      injuries,
      police_report_filed,
      ai_case_data,
    } = body;

    // Validate required fields
    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and description are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Insert the case
    const { data: caseData, error: caseError } = await supabase
      .from('cases')
      .insert({
        name,
        email: email.toLowerCase().trim(),
        phone,
        case_type,
        incident_date,
        incident_location,
        description,
        injuries,
        police_report_filed,
        ai_case_data,
        status: 'new',
        priority: 0,
      })
      .select()
      .single();

    if (caseError) {
      console.error('Supabase error:', caseError);
      return NextResponse.json(
        { error: 'Failed to submit case', details: caseError.message },
        { status: 500 }
      );
    }

    // Log the case creation activity
    await supabase
      .from('case_activities')
      .insert({
        case_id: caseData.id,
        activity_type: 'case_created',
        description: 'Case submitted by client',
        metadata: {
          source: 'ai_case_builder',
          ip: request.headers.get('x-forwarded-for') || 'unknown',
        },
      });

    return NextResponse.json({
      success: true,
      case_number: caseData.case_number,
      case_id: caseData.id,
      message: 'Case submitted successfully',
    });

  } catch (error: any) {
    console.error('Error submitting case:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

