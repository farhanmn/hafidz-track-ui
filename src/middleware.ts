import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import {roleAccessMap} from "@/lib/roleAccess";

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

  // return NextResponse.next();
  try {
    if (!isPublicPage) {
      const decoded = jwt.decode(token || '') as { role?: string };
      const role = decoded?.role;
      if (!role) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      const allowedRoutes = roleAccessMap[role.toLowerCase()] || [];
      // Cek apakah route sekarang termasuk yang diizinkan
      const isAllowed = allowedRoutes.some((route) =>
        pathname === route || pathname.startsWith(`${route}/`)
      );

      if (!isAllowed) {
        return NextResponse.rewrite(new URL('/_not-found', req.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: [
    '/((?!images|_next/static|_next/image|favicon.ico).*)',
  ],
};
