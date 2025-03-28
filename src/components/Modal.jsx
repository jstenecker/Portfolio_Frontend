/* eslint-disable react/prop-types */
const Modal = ({ children, onClose }) => {
    return (
      <div
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded max-w-3xl shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-gray-600 dark:text-gray-300 hover:text-red-500"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  