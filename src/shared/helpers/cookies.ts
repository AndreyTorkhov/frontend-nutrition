const ACCESS_COOKIE = "access";
const ACCESS_TTL_SEC = 60 * 60;

export function setAccessToken(token: string) {
  document.cookie = `${ACCESS_COOKIE}=${encodeURIComponent(
    token,
  )}; Path=/; SameSite=Lax; Max-Age=${ACCESS_TTL_SEC}`;
}

export function getAccessToken(): string | null {
  const match = document.cookie.match(
    new RegExp("(^| )" + ACCESS_COOKIE + "=([^;]+)"),
  );
  return match ? decodeURIComponent(match[2]) : null;
}

export function clearAccessToken() {
  document.cookie = `${ACCESS_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function getAccessFromCookie() {
  return document.cookie
    .split("; ")
    .find((v) => v.startsWith("access="))
    ?.split("=")[1];
}
