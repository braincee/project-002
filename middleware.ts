export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/audience", "/content", "/dashboard", "/logs", "/manage"],
};
