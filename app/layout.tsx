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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-black text-white min-h-screen h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center w-full p-0 m-0 max-w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}