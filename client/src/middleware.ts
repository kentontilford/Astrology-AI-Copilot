import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    '/',
    '/auth/sign-in',
    '/auth/sign-up',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
  ],

  // Routes that can be accessed by signed-in users
  ignoredRoutes: [
    '/_next',
    '/favicon.ico',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};