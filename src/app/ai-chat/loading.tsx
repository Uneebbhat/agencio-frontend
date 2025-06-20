import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center">
      <Loader2 className="w-14 h-14 animate-spin text-wblack" />
    </div>
  );
};

export default Loading;
