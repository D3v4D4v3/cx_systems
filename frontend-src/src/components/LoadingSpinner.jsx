const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-hacker-red/30 border-t-hacker-red rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-hacker-red font-mono text-xs animate-pulse">...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;