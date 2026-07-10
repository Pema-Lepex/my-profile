import { redirect } from "next/navigation";

/**
 * The home module's sections are composed at "/" by app/page.tsx. This route
 * exists because the folder does — it forwards rather than serving a second,
 * duplicate copy of the landing page.
 */
export default function HomePage() {
  redirect("/");
}
