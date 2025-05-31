import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;
  console.log('[Middleware] Checking token...');

  const isPublicPage = pathname === '/signin' || pathname === '/signup';

  if (token && isPublicPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!images|_next/static|_next/image|favicon.ico).*)',
  ],
};
