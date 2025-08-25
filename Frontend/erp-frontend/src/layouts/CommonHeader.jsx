export default function CommonHeader({ title }) {
  return (
    <header className="h-14 border-b bg-white flex items-center px-4">
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
