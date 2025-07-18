import { NextResponse } from 'next/server';
import { registerUser } from '../../../../services/authService.js';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, role, department, level } = body;
    
    if (!email || !password || !role || !department || !level) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await registerUser(email, password, { role, department, level });
    
    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}