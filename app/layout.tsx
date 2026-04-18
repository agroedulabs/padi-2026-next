import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Suntikan Darurat Tailwind via CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body style={{ backgroundColor: 'black', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
