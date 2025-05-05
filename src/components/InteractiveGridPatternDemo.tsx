"use client";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

export function InteractiveGridPatternDemo() {
  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
    </div>
  );
}
