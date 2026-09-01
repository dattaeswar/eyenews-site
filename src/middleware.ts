import { NextRequest, NextResponse } from 'next/server';

// Protects /admin with HTTP Basic Auth.
// Credentials are set via Vercel environment variables:
//   ADMIN_USERNAME, ADMIN_PASSWORD
// Falls back to a default (dev-only) password if not configured, so local
// testing still works — but Vercel MUST have these env vars set for production.
export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization');

  const expectedUser = process.env.ADMIN_USERNAME || 'eyenews-admin';
  const expectedPass = process.env.ADMIN_PASSWORD || 'change-me-now';

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pass] = Buffer.from(authValue, 'base64').toString().split(':');

    if (user === expectedUser && pass === expectedPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Eye News Admin"',
    },
  });
}

export const config = {
  matcher: '/admin/:path*',
};
