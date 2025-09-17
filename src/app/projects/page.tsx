import CreateProject from "@/components/Projects/CreateProject";
import ProjectsList from "@/components/Projects/ProjectsList";
import React from "react";

export default function ProjectsPage() {
  return (
    <>
      <section className="py-[20px]">
        <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold mb-4">Projects</h1>
          <CreateProject />
        </div>
        <ProjectsList />
      </section>
    </>
  );
}
