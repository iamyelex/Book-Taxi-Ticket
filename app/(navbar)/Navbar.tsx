// import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

// const navList = ["Home", "History", "Help"];

export default async function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b p-3 shadow-sm md:px-10">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image
            src="/logo.PNG"
            alt="BookTaxi logo"
            width={120}
            height={60}
            priority
            quality={100}
            className="rounded-lg"
          />
        </Link>

        {/* <ul className="hidden gap-6 md:flex">
          {navList.map((list) => (
            <li
              key={list}
              className="cursor-pointer rounded-md p-2 transition-all hover:bg-gray-100"
            >
              {list}
            </li>
          ))}
        </ul> */}
      </div>

      {/* <UserButton afterSignOutUrl="/" /> */}
    </nav>
  );
}
