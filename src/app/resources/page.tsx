import { redirect } from "next/navigation";

/**
 * Resources Route
 * Redirects directly to the AWS & Cloud course where both Notes and Resources
 * are housed in dedicated tabs.
 */
export default function ResourcesRedirect() {
  redirect("/?category=cloud-aws");
}
