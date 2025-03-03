import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MyProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Project 1",
      progress: 78,
    },
    {
      id: 2,
      title: "Project 2",
      progress: 0,
    },
    {
      id: 3,
      title: "Project 3",
      progress: 16,
    },
    {
      id: 4,
      title: "Project 4",
      progress: 100,
    },
  ];
  return (
    <>
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between p-[12px] md:px-[24px]">
          <CardTitle className="text-2xl">Projects</CardTitle>
          <Button>
            <Plus />
            Add project
          </Button>
        </CardHeader>
        <CardContent className="p-[12px] md:px-[24px]">
          {projects.map((project) => (
            <div key={project.id} className="mb-[20px]">
              <Card>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={project.progress} />
                  <p>{project.progress}% Completed</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default MyProjects;
