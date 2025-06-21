import { AlertTriangle } from "lucide-react";

// interface ClientsTableErrorProps {
//   message?: string;
//   onRetry: () => void;
// }

const ClientsTableError = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 bg-red-100 border border-red-400 rounded-lg w-[100%] max-w-[800px] mx-auto">
      <AlertTriangle className="text-red-600" size={32} />
      <p className="text-red-800 font-semibold">Unable to fetch the clients</p>
    </div>
  );
};

export default ClientsTableError;
