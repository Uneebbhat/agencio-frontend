import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CreateGoal = () => {
  const goals = [
    {
      title: "Learn React",
      endDate: "04 March 2025",
      progress: 80,
    },
    {
      title: "Learn NodeJS",
      endDate: "10 March 2025",
      progress: 10,
    },
  ];
  return (
    <>
      <section className="w-full my-[40px]">
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between p-[12px] md:px-[24px]">
            <CardTitle className="text-2xl">Goals</CardTitle>
            <Button>
              <Plus />
              Add goal
            </Button>
          </CardHeader>
          <CardContent className="p-[12px] md:px-[24px]">
            {goals.map((goal, i) => (
              <div key={i} className="mb-[20px]">
                <Card>
                  <CardHeader className="flex flex-col md:flex-row justify-between md:items-center">
                    <CardTitle className="text-2xl">{goal.title}</CardTitle>
                    <div className="flex flex-col md:flex-row gap-[20px]">
                      <p>{goal.endDate as any}</p>
                      <p>{goal.progress}% Achieved</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Progress value={goal.progress} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default CreateGoal;
