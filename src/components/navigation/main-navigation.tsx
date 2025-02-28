"use client";

import Link from "next/link";
import { useState } from "react";

import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";

import { X, Menu } from "lucide-react";

interface Props {
  children?: React.ReactNode;
}

const MainNavigation = ({ children }: Props) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <div className="flex gap-6 md:gap-10">
      <button
        className="flex items-center md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <span className="sr-only">Menu</span>
        {showMobileMenu ? <X /> : <Menu />}
      </button>
      {showMobileMenu && <MobileNavigation>{children}</MobileNavigation>}

      <Link
        href="/"
        className="flex h-12 items-center space-x-2 text-lg font-bold"
      >
        ATS
      </Link>
      <div className="hidden md:flex">
        <DesktopNavigation />
      </div>
    </div>
  );
};

export default MainNavigation;
