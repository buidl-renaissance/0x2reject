import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Any gods.work apex or subdomain (doing.gods.work, www.gods.work, …). */
export function isGodsWorkHost(host: string): boolean {
  const hostname = host.split(':')[0]?.toLowerCase() ?? '';
  return hostname === 'gods.work' || hostname.endsWith('.gods.work');
}

export function middleware(request: NextRequest) {
  if (!isGodsWorkHost(request.headers.get('host') ?? '')) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  if (pathname === '/' || pathname === '') {
    const url = request.nextUrl.clone();
    url.pathname = '/doing-gods-work';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
