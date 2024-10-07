export default function Main({ children }) {
  return (
    <main className="min-h-full h-auto w-full flex flex-col pb-32" id="content">
      {children}
    </main>
  );
}