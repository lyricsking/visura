import { redirect } from "react-router";
import { StaffRole } from "~/core/user/types/staff.type";

/**
 * Gets the subdomain string of the current url
 *
 * @param request The current Request object
 * @param redirectUrl The url to redirect to if there is no subdomain provided.
 */
export function getSubdomain(request: Request, redirectUrl?: string) {
  let { hostname, pathname } = new URL(request.url);
  let [subdomain, domain, tld] = hostname.split(".");

  // if tld is undefined it means there was no subdomain
  // so we return "null"
  if (!tld) return null;
  // // if tld is not undefined and provided subdomain does not match
  // // any of the expected subdomain, it means a wrong subdomain was
  // // provided. We simply redirect to the pathname without subdomain
  // if (tld && !Object.values(StaffRole).includes(subdomain as StaffRole)) {
  //   // let neUrl = new URL(redirectUrl).
  //   // throw redirect(redirectUrl || pathname);
  //   console.log("subdomain", subdomain);
  // }
  // the subdomain matched an expectation, we will return it.
  return subdomain;
}
