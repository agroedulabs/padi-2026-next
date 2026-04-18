import "./globals.css"; // Baris ini WAJIB ada di paling atas

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
