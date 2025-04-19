import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

const publicRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const token = localStorage.getItem('token');

    const path = request.nextUrl.pathname;

    const isPublicRoute = publicRoutes.some(route => path.startsWith(route));

    if (!token && !isPublicRoute) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', path);
        return NextResponse.redirect(loginUrl);
    }

    if (token && path === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};