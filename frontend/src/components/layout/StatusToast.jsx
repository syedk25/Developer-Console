import { AlertCircle, Check, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { dismissStatusMessage } from "../../store/appSlice";

export default function StatusToast() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.app.statusMessage);
  if (!message) return null;

  const isError = message.startsWith("Invalid") || message.startsWith("Unable");
  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-xl ${isError ? "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200" : "border-teal-200 bg-teal-50 text-teal-900 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-200"}`}
      role="status"
    >
      {isError ? <AlertCircle size={17} /> : <Check size={17} />}
      <span>{message}</span>
      <button
        className="ml-1 rounded p-1 hover:bg-black/5 dark:hover:bg-white/10"
        onClick={() => dispatch(dismissStatusMessage())}
        aria-label="Dismiss"
      >
        <X size={15} />
      </button>
    </div>
  );
}
