"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function GoalPage() {
  return (
    <>
      <section className="py-[20px]">
        <div>
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl font-semibold md:mb-0">Goals</h1>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search Goal"
                className="hidden md:block md:w-[250px]"
              />
              <Button>
                <Plus />
                Create Goal
              </Button>
            </div>
          </div>
          <div>
            <Input
              type="text"
              placeholder="Search Goal"
              className="block md:hidden"
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Hello</h2>
      </section>
    </>
  );
}
