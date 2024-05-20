import { auth } from '@/auth';

const AUTH_PAGES = ['/sign-in', '/sign-up'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
    return Response.redirect(new URL('/sign-in', nextUrl));
  }

  if (AUTH_PAGES.includes(nextUrl.pathname) && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
