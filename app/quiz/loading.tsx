import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-gray-800 animate-spin" />
    </div>
  );
};

export default Loading;
