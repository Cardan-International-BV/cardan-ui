const alphabet =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function randomPart(length: number) {
  return Array.from(
    crypto.getRandomValues(new Uint8Array(length)),
    (byte) => alphabet[byte % alphabet.length],
  ).join('');
}

function newCodes() {
  return Array.from({ length: 8 }, () => `${randomPart(10)}-${randomPart(10)}`);
}

let codes = newCodes();

/** The mock's current recovery codes, shared by its GET and POST routes. */
export function demoRecoveryCodes() {
  return codes;
}

/** Replaces the codes, so regenerating in the demo shows a new set. */
export function regenerateDemoRecoveryCodes() {
  codes = newCodes();
}
