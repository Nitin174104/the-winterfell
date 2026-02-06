export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/mood", "/health", "/custom", "/dashboard"],
};
