import type { Metadata } from "next";
import { JetBrains_Mono, Lora } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import AudioPlayer from "./components/AudioPlayer";
import CursorSync from "./components/CursorSync";
import { getAllBooks } from "./(subpages)/books/utils";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "alex's webpage",
  description: "Alex Hamidi's personal website",
  icons: {
    icon: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const books = getAllBooks().map(book => ({
    slug: book.slug,
    title: book.title
  }));

  return (
    <html lang="en">
      <body className={`${mono.variable} ${lora.variable} antialiased`}>
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/bg.gif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -2
          }}
        />
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(255, 255, 255)',
            zIndex: -1
          }}
        />
        <CursorSync />
        <Sidebar booksData={books} />
        <main className="min-h-screen pt-15 flex justify-center items-start">
          <div className="w-full max-w-[40vw]">
            {children}
          </div>
        </main>
        <AudioPlayer />
      </body>
    </html>
  );
}
