import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // halaman admin membutuhkan role admin
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.user.role === "admin";
      }

      return !!token;
    },
  },
});

export const config = { matcher: ["/admin/:path*", "/user/:path*"] };
