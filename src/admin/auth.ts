const SESSION_KEY = "tpa_admin_session";
const ADMIN_USER = "admin";
const ADMIN_PASS = "tpa2026!";

export const login = (user: string, pass: string) => {
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    window.localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ token: "ok", createdAt: Date.now() })
    );
    return true;
  }
  return false;
};

export const logout = () => {
  window.localStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return Boolean(window.localStorage.getItem(SESSION_KEY));
};
