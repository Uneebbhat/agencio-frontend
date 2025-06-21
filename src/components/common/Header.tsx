import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import useUserStore from "@/store/useUserStore";

const Header = () => {
  const user = useUserStore((state) => state.getUser());
  return (
    <>
      <header className="flex justify-between items-center px-[20px] md:px-[40px] py-[20px]">
        <div>
          <Image
            src={"/assets/logo-black.png"}
            alt="Agencio"
            width={100}
            height={100}
          />
        </div>
        <nav className="hidden md:flex items-center gap-[40px]">
          <a href="/">Home</a>
          <a href="/">Features</a>
          <a href="/">Pricing</a>
        </nav>
        {user && user ? (
          <>
            <div>
              <Link href={"/dashboard"}>
                <Button className="">Dashboard</Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-[10px]">
              <Link href={"/signup"}>
                <Button className="">Get started</Button>
              </Link>
              <Link href={"/login"}>
                <Button className="" variant={"outline"}>
                  Login
                </Button>
              </Link>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
