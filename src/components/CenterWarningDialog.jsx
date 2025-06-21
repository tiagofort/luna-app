export default function CenterWarningDialog({ title, message, onClose, buttonMessage }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-lg font-medium">{message}</p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
          >
            {buttonMessage}
          </button>
        </div>
      </div>
    </div>
  );
}