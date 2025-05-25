import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log('[Middleware] Checking token...');

  console.log({token});
  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!signin|signup|_next/static|_next/image|favicon.ico).*)',
  ],
};
