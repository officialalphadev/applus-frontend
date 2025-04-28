import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  console.log('token middleware ==>', token)

  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define protected routes
  const protectedPaths = ['/dashboard', '/profile', '/products']
  const isProtectedPath = protectedPaths.some((protectedPath) => path === protectedPath || path.startsWith(`${protectedPath}/`))

  if (isProtectedPath && !token) {
    // Redirect to login page if accessing protected route without authentication
    const url = new URL('/auth/login', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Specify which routes the middleware should run on
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/products/:path*']
}
