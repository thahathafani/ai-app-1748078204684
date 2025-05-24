import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  if (!req.cookies.sb:session) {
    url.pathname = '/api/auth/signin';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}