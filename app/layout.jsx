import "./globals.css";

export const metadata = {
  title: "Winston Coach — Presentation Intelligence",
  description:
    "Six Patrick Winston MIT frameworks to make your presentations unforgettable. Craft openings, eliminate slide crimes, structure for persuasion.",
  keywords: "presentation coach, Patrick Winston, MIT, public speaking, slides",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
