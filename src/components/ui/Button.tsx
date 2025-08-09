export default function Button({ loading, children, disabled, ...props }: Props) {
  const isDisabled = disabled || loading;
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`w-full py-3 px-4 rounded-lg font-semibold shadow-md transition duration-200 ${
        isDisabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
      }`}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
