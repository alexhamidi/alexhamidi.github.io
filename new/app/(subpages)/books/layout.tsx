export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center text-gray-900 font-mono overflow-x-hidden">
      {children}
    </div>
  );
}
