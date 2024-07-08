export function getSearchParamByUrl(): { [x: string]: string } {
  const q: Record<string, string> = {};
  decodeURIComponent(window.location.href).replace(/([^?&=]+)=([^&#]+)/g, (_, k, v) => (q[k] = v));
  return q;
}

export function isCspOrGspPage() {
  const match = /(csp|gsp)\.aliexpress\.com/.exec(location.host);
  if (match && match[1]) {
    return match[1];
  }

  return false;
}