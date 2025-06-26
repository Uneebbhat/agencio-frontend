import CreateGoal from "@/components/Dashboard/CreateGoal";
import MyProjects from "@/components/Dashboard/MyProjects";
import Greeting from "@/components/Greeting";

export default function DashboardPage() {
  return (
    <section className="py-[20px]">
      <Greeting />
      <CreateGoal />
      <MyProjects />
    </section>
  );
}
