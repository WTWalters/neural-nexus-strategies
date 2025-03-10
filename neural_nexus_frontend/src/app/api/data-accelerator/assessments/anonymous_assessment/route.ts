import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create a fake assessment with a random ID
    const assessment = {
      id: Math.floor(Math.random() * 1000) + 1,
      organization_name: body.organization_name,
      email: body.email,
      industry: body.industry || "",
      company_size: body.company_size || "",
      assessment_type: body.assessment_type || "QUICK",
      subscription_tier: "FREE",
      status: "DRAFT",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return NextResponse.json(assessment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create assessment" }, { status: 500 });
  }
}
