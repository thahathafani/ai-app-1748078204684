import './globals.css';
import { SessionProvider } from '@supabase/auth-helpers-nextjs';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}