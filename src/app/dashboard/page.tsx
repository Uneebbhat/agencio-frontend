import CreateGoal from "@/components/Dashboard/CreateGoal";
import MyProjects from "@/components/Dashboard/MyProjects";
import Greeting from "@/components/Greeting";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token").value
  if (!token) {
    redirect("/login")
  }

  return (
    <section className="py-[20px]">
      <Greeting />
      <CreateGoal />
      <MyProjects />
    </section>
  );
}
