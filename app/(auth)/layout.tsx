export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex items-center justify-center h-screen">
      {children}
    </section>
  );
}
