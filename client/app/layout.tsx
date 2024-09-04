import './globals.css';
import 'react-quill/dist/quill.snow.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}