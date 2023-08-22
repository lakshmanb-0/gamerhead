import "./globals.scss";

export const metadata = {
  title: "GamerHead",
  description:
    "Welcome to GameStore, your ultimate destination for all things gaming! Step into a world of endless fun and adventure as we bring you the best selection of video games, consoles, and gaming accessories. Our website is designed to cater to gamers of all ages and preferences, providing an immersive and user-friendly experience. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
