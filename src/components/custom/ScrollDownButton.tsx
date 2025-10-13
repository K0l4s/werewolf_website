import { useEffect, useState } from "react";

export default function ScrollDownButton() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const bottomPosition = document.documentElement.scrollHeight - 50; // khoảng cách 50px cho mượt
      setIsAtBottom(scrollPosition >= bottomPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex justify-center items-center flex-col mt-6 fixed bottom-4 right-4 transform -translate-x-1/2 z-50 transition-opacity duration-500 ${
        isAtBottom ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <span className="text-sm text-zinc-400">Scroll Down</span>
      <button
        onClick={() => {
          window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
        className="mt-4 p-2 rounded-full bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:shadow-lg border border-zinc-700 hover:border-zinc-600 transition-all duration-300"
        aria-label="Scroll Down"
      >
        <svg
          className="w-6 h-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
}
