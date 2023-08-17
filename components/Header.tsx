"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

import Logo from "@/images/logo.png";
import { navLinks } from "@/utils/navLinks";

const Header = () => {
  const currentRoute = usePathname();

  return (
    <header className={`${styles.header}`}>
      <Link href="/">
        <Image src={Logo} alt="" width="60" height="60" priority />
      </Link>

      <nav>
        <ul>
          {navLinks.map((link, index) => {
            return (
              <li key={index}>
                <Link
                  href={link.path}
                  className={`${
                    currentRoute === link.path ? "text-amber-500" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
