export default function Button({text, onClick, status}) {
  if (status === "default") {
    return (
      <button
        onClick={onClick}
        className="w-max-content mr-4 bg-black text-white text-xs font-semibold p-3 transition-all duration-75 border-2 border-black active:bg-white active:border-2 active:border-black active:text-black mt-2 sm:mt-0"
      >
        {text}
      </button>
    );
  }
  if (status === "success") {
    return (
      <button
        disabled
        onClick={onClick}
        className="w-max-content mr-4 bg-white text-green-500 text-xs font-semibold p-3 transition-all duration-75 border-2 border-green-500 active:bg-white active:border-2 active:border-green-400 active:text-green-400 mt-2 sm:mt-0"
      >
        {text}
      </button>
    );
  }
  if (status === "error") {
    return (
      <button
        disabled
        onClick={onClick}
        className="w-max-content mr-4 bg-white text-red-500 text-xs font-semibold p-3 transition-all duration-75 border-2 border-red-500 active:bg-white active:border-2 active:border-red-400 active:text-red-400 mt-2 sm:mt-0"
      >
        {text}
      </button>
    );
  }
  if (status === "neutral") {
    return (
      <button
        onClick={onClick}
        className="w-max-content mr-4 bg-white text-black text-xs font-semibold p-3 transition-all duration-75 border-2 border-black active:bg-white mt-2 sm:mt-0"
      >
        {text}
      </button>
    );
  }
  if (status === "hidden") {
    return null;
  }
}
