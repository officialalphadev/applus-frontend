import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { Logger } from '@/lib'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  Logger.Trace(`token middleware ==> ${JSON.stringify(token)}`)

  const path = request.nextUrl.pathname

  const protectedPaths = ['/dashboard', '/profile', '/products']
  const isProtectedPath = protectedPaths.some((protectedPath) => path === protectedPath || path.startsWith(`${protectedPath}/`))

  if (isProtectedPath && !token) {
    const url = new URL('/auth/login', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/products/:path*']
}
