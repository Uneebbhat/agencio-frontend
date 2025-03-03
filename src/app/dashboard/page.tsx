import CreateGoal from "@/components/Dashboard/CreateGoal";
import MyProjects from "@/components/Dashboard/MyProjects";
import Greeting from "@/components/Greeting";

export default function Page() {
  return (
    <section className="p-[20px]">
      <Greeting />
      <CreateGoal />
      <MyProjects />
    </section>
  );
}
