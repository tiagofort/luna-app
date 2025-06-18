
const Dialog = ({ title, message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg border border-gray-300 rounded p-4 z-50">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm mt-1">{message}</p>
      <button
        onClick={onClose}
        className="text-blue-500 text-sm mt-2 hover:underline"
      >
        OK
      </button>
    </div>
  );
};

export default Dialog;