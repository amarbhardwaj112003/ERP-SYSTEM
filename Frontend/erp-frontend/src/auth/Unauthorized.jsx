export default function Unauthorized() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold mb-2">Unauthorized</h1>
        <p className="text-gray-600">You don’t have permission to view this page.</p>
        <a href="/" className="inline-block mt-6 px-5 py-2 rounded bg-black text-white">Go Home</a>
      </div>
    </div>
  );
}
