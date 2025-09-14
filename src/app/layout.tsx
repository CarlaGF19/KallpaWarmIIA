
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'KallpaIA - Inspiring Women in STEAM',
  description: 'El futuro de la educación STEAM para mujeres, hoy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Poppins:wght@700;800&family=Inter:wght@400;500&family=Nunito+Sans:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <div className="font-body antialiased">
            {children}
            <Toaster />
        </div>
      </body>
    </html>
  );
}
