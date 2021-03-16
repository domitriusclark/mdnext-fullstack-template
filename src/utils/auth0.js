import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  // The secret used to encrypt the cookie.
  secret:
    process.env.AUTH0_COOKIE_SECRET ||
    'aE1OUWcLTmSLn8I79hNJPzjTo5-aE1OUWcLTmSLn8I79hNJPzjTo5',
  authorizationParams: {
    scope: 'openid profile email',
    audience: process.env.AUTH0_AUDIENCE,
  },
  routes: {
    callback: '/api/auth/callback',
    postLogoutRedirect: '/',
  },
  // VERCEL_ENV is available on 'preview' deployments
  // for other 'production' builds we fall back to the prod domain
  baseURL: process.env.AUTH0_BASE_URL,
  // deployed url or to production
  session: {
    rollingDuration: 60 * 60 * 24,
    absoluteDuration: 60 * 60 * 24 * 7,
  },
});
