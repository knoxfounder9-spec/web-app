export const metadata = {
  title: "Grind Portal",
  description: "Recruitment System"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#0f0f0f",
          color: "white"
        }}
      >
        {children}
      </body>
    </html>
  );
}
