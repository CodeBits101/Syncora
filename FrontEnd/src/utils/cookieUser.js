import Cookies from "js-cookie";

const USER_COOKIE_KEY = "user";
const DEFAULT_USER = {
  name: "Guest",
  role: "visitor",
  timestamp: new Date().toISOString(),
};

/**
 * Gets user from cookie. If not present, sets a default user.
 * @returns {Object} user
 */
export function getOrSetUserFromCookie() {
  const cookie = Cookies.get(USER_COOKIE_KEY);
  if (cookie) {
    try {
      return JSON.parse(cookie);
    } catch (err) {
      console.error("Invalid user cookie:", err);
      Cookies.remove(USER_COOKIE_KEY);
    }
  }

  Cookies.set(USER_COOKIE_KEY, JSON.stringify(DEFAULT_USER), {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });

  return DEFAULT_USER;
}
