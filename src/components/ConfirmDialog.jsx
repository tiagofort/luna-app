export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-md font-medium">{message}</p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-mainColor text-white rounded-xl hover:bg-green-700 transition"
          >
            YES
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
}
