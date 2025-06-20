"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught:", error);
  }, [error]);

  return (
    <section className="flex items-center justify-center h-[100dvh] md:h-[80dvh] dark:bg-gray-900">
      <Card className="w-[400px] text-center p-6 shadow-lg">
        <CardHeader>
          <AlertCircle className="w-10 h-10 mx-auto text-red-500" />
          <CardTitle className="text-2xl mt-2">Something went wrong!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300">{error.message}</p>
          <Button className="mt-4" onClick={reset}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
