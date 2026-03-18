import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const O_REDIRECTS: Record<string, string> = {
  sitescroll: "/w/scroll",
  "sitescroll-app": "https://sitescroll.fun",
  sitescrolldemo: "https://sitescroll.fun",
  antiwall: "/w/antiwall",
  umari: "/w/umari",
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }
  const o = request.nextUrl.searchParams.get("o")?.toLowerCase();
  if (!o) {
    return NextResponse.next();
  }
  const target = O_REDIRECTS[o];
  if (!target) {
    return NextResponse.next();
  }
  if (target.startsWith("http")) {
    return NextResponse.redirect(target);
  }
  const url = request.nextUrl.clone();
  url.pathname = target;
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
