import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import NavBar from "./components/NavBar";
// import NavBar2 from "./components/NavBar2"

export const metadata = {
  title: "Simply Track",
  description:
    "The best place to track your hours logged and distance traveled!",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession();
  console.log('session: ',session)
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NavBar />
          {/* <NavBar2 /> */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
