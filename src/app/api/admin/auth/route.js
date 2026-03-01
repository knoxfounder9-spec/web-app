import dbConnect from '@/lib/db';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();
  
  // Validate against Env variables
  const isValidUser = username === process.env.ADMIN_USERNAME;
  const isCorrectPass = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);

  if (!isValidUser || !isCorrectPass) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret);

  cookies().set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400 // 1 day
  });

  return NextResponse.json({ success: true });
}
