export default function Input({ label, error, ...props }: Props) {
  return (
    <div className="mb-5">
      {label && <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>}
      <input
        {...props}
        className={`w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
