import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1 mx-auto max-w-7xl px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
