/**
 * An array of rotues that are accessible to the public
 * These routes do not requre authentication
 * @type {string[]}
 */
export const publicRotues = [
  "/"
];

export const authRoutes = [
  "/auth/login",
  "/auth/register"
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";