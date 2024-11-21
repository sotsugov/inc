import type { Metadata } from 'next';
import { Inter as Font_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const fontSans = Font_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: 'variable',
});

export const metadata: Metadata = {
  title: 'Increment',
  description: 'LLM request cost estimation tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${fontSans.variable} font-[family-name:var(--font-sans)] min-h-screen bg-background antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
