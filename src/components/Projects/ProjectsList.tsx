"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import useGetAllProjects from "@/hooks/api/useGetAllProjects";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    client: "Acme Corp",
    status: "In Progress",
    createdAt: "2025-04-01",
    progress: 45,
  },
  {
    id: 2,
    name: "Mobile App Development",
    client: "TechNova",
    status: "Completed",
    createdAt: "2025-03-15",
    progress: 100,
  },
  {
    id: 3,
    name: "Marketing Dashboard",
    client: "BrightMedia",
    status: "Pending",
    createdAt: "2025-03-30",
    progress: 10,
  },
];

const statusColors: Record<string, string> = {
  Pending: "bg-gray-500",
  "In Progress": "bg-yellow-500",
  Completed: "bg-green-500",
  "On Hold": "bg-blue-500",
  Cancelled: "bg-red-500",
};

const ProjectsList = () => {
  const { projects, loading } = useGetAllProjects();
  return (
    <div className="pt-8">
      <ScrollArea className="h-[600px] rounded-md border p-4">
        <div className="space-y-4">
          {projects ? (
            projects.map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project._id}`}
                className="block transition-all hover:scale-[1.01]"
              >
                <Card className="w-full shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <div>
                        <div className="font-semibold">
                          {project.projectName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Client:{" "}
                          <span className="text-primary font-medium">
                            {project.clientName}
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          statusColors[project.projectStatus]
                        } text-white text-xs`}
                      >
                        {project.projectStatus}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    <div className="text-xs text-gray-500">
                      Created on:{" "}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="w-full" />
                      <span className="text-xs text-muted-foreground w-10 text-right">
                        {project.progress}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <>
              <h2>No projects found</h2>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProjectsList;
