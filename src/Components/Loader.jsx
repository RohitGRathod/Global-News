function Loader() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <h1 className="text-lg text-blue-500 font-medium">Fetching news...</h1>
    </div>
  );
}

export default Loader;
