import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold">Hello World</h1>
        <Button>Hello</Button>
      </div>
    </>
  );
}
