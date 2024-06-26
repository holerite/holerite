import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const currentUser = request.cookies.get("user");

	if (currentUser && request.nextUrl.pathname.startsWith("/login")) {
		return Response.redirect(new URL("/app/relatorio", request.url));
	}

	if (!currentUser && request.nextUrl.pathname.startsWith("/app")) {
		return Response.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
