
const Unauthorized = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">401</h1>
        <h1 className="text-4xl font-bold text-black mb-4">UNAUTHORIZED</h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>
        <a
          href="/"
        className="px-6 py-2 text-white bg-[#9191ff] rounded hover:bg-[#9191ff]/70 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
