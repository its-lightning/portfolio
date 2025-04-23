import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: "Portfolio App",
  description: "A minimalist portfolio built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <main className="container mx-auto px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}