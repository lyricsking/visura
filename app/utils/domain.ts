const allowedDomains = [ "admin", "support", "tec"];

/**
 * Gets the subdomain string of the current url
 * 
 * @param request The current Request object
 * @param redirectUrl The url to redirect to if there is no subdomain provided.
 */
 export function getSubdomain(request: Request, redirectUrl?: URL) {
  let { hostname, pathname } = new URL(request.url)
  let [subdomain, domain, tld] = hostname.split(".")
  // if tld is undefined it means there was no subdomain
  // so we return "null"
  if (!tld) return null;
  // if provided subdomain does not matches any of the expected subdomain, we simply redirect to the pathname without subdomain
  if(!Object.values(StaffRole).includes(subdomain)) return redirect(redirectUrl||"/"+pathname);
  // the subdomain matched an expectqtion, we will return it.
  return subdomain;
}