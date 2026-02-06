import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const envCheck = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DATABASE_URL_DEFINED: !!process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  try {
    // Attempt a simple query to verify connection
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      data: {
        userCount,
      },
      env: envCheck,
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : String(error),
      env: envCheck,
    }, { status: 500 });
  }
}
