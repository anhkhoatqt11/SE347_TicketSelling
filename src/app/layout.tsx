import { ReduxProvider } from "@/redux/Provider";
import { Header } from "@/components/header";
import "./globals.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import AuthProvider from "../../context/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TicketNow',
  description: 'TicketNow - Nền tảng bán vé sự kiện',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <ReduxProvider>
              <Toaster />
              {children}
            </ReduxProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}