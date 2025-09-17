import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div className="h-[100dvh] flex items-center justify-center">
        <Loader2 className="animate-spin w-16 h-16" />
      </div>
    </>
  );
}
