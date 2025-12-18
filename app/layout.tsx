import "./globals.css";

export const metadata = {
  title: "SaaS Analytics Dashboard",
  description: "Modern analytics platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-zinc-100">
        {children}
      </body>
    </html>
  );
}
