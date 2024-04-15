"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { paths } from "@/utils/paths";
import { Button } from "@/components/ui/button";

const MobileHeader = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger className="md:hidden ml-4">
        <Menu></Menu>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Links</SheetTitle>
          <SheetDescription className="ml-10">
            <div className="flex items-center justify-start  gap-x-4 my-10">
              <Link href={paths.landing.login}>Login</Link>
              <Link href={paths.landing.register}>
                <Button type="button"> Register</Button>
              </Link>
            </div>
            <div className=" flex items-start justify-start">
              <ul className="flex flex-col gap-10 items-start justify-start ">
                <li className="font-normal ">
                  <Link href="/" onClick={() => setSheetOpen(false)}>
                    Home
                  </Link>
                </li>
                <li className="font-normal ">
                  <Link
                    href={paths.landing.aboutus}
                    onClick={() => setSheetOpen(false)}
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;
