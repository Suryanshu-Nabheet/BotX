import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/ask")) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/", "/ask/:path*", "/api/:path*"],
};
