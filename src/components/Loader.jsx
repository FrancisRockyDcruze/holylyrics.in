export default function Loader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl px-8 py-6 flex flex-col items-center min-w-[260px]">

        <div className="w-12 h-12 border-4 border-gray-300 border-t-bgColor rounded-full animate-spin"></div>

        <h2 className="mt-5 text-lg font-semibold text-bgColor">
          {text}
        </h2>

      </div>
    </div>
  );
}