import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import Navbar from "@/components/Navbar/Navbar"; // Import Navbar component
import "./globals.css"; // Import any global styles (if any)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <SessionProvider>
          <Navbar /> {/* Include Navbar here */}
          {children} {/* Render the children components here */}
        </SessionProvider>
      </body>
    </html>
  );
}
