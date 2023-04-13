import { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  );
}
