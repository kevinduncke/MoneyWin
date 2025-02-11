"using strict";

export async function hashPassword(password) {
  // CONVERT TO UINT8ARRAY
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  // HASH WITH SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  // HASH TO HEX STRING
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashedPassword;
}
