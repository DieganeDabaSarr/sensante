import { Inter } from "next/font/google";
import SessionWrapper from "@/components/SessionWrapper";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <SessionWrapper>
          <div className="flex flex-col h-screen overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}