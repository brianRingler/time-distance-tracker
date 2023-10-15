import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Simply Track",
  description:
    "The best place to track your hours logged and distance traveled!",
};

//TODO: move get server session to useEffect so it is not blocking thread?
export default async function RootLayout({ children }) {
  const session = await getServerSession();
  console.log("session: ", session);
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <header>
            <NavBar />
          </header>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
