import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import MobileHeader from "./mobile-header";
import { paths } from "@/utils/paths";
import ThemeToggle from "../../theme-toggle";

const Header = () => {
  return (
    <div
      className={`h-16 z-[40] items-center flex justify-between bg-accent shadow-md sticky top-0`}
    >
      <MobileHeader></MobileHeader>
      <div className="flex items-center ml-10">
        <ThemeToggle></ThemeToggle>
      </div>

      <div className="md:flex hidden items-center justify-between w-full">
        <div className="flex flex-grow justify-center">
          <ul className="flex gap-10 items-center">
            <li className="font-normal">
              <Link href="/">Home</Link>
            </li>
          </ul>
        </div>
        <div className="flex  md:gap-x-7 items-center justify-end mr-10">
          <Link href={paths.landing.login}>Login</Link>
          <Link href={paths.landing.register}>
            <Button type="button"> Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
