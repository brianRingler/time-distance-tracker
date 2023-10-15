"use client";
import { useState, useEffect } from "react";


// export const metadata = {
//   title: "Time Distance Tracker",
// };

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("api/get-users", { cache: "no-store" });
      const data = await res.json();
      console.log("I am Data");
      console.log(data);
      setUsers(data);
    }
    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen">

      <h1 className="text-4xl font-bold text-primary mb-4 mt-12">
        Simply Track Miles
      </h1>
      <p className="text-lg border border-primary-light p-4 rounded-lg max-w-screen-md text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
        molestiae odit odio tempora assumenda dignissimos numquam debitis quos
        fugiat repellendus, nesciunt fugit exercitationem nemo rem neque quae
        ratione, qui laborum?
      </p>
    </main>
  );
}
