import Image from "next/image";
import Login from "./Login/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <Login/>
    </main>
  );
}
