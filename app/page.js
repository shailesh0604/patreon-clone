import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import HomeClient from "./HomeClient";

export default async function LandingPage() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return <HomeClient />
}