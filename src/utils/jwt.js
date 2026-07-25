import { jwtDecode } from "jwt-decode";

// Decode a JWT payload without verifying signature (client-side read only).
export function decodeToken(token) {
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

// Normalize roles from common JWT claim shapes into a string[].
export function extractRoles(payload) {
  if (!payload) return [];
  const raw =
    payload.roles ??
    payload.authorities ??
    payload.role ??
    payload.scope ??
    [];

  const arr = Array.isArray(raw) ? raw : String(raw).split(/[\s,]+/);
  return arr
    .map((r) => (typeof r === "object" ? r.authority ?? r.name : r))
    .filter(Boolean)
    .map((r) => String(r).replace(/^ROLE_/, ""));
}

// True if the token's exp claim is in the past.
export function isExpired(payload) {
  if (!payload?.exp) return false;
  return payload.exp * 1000 < Date.now();
}
