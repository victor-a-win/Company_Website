"use client";

import { guestOnlyRoutes, privateRoutes, publicRoutes } from "@/data/nav.links";
import RouteData from "@/model/route.model";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth.context";
import { usePathname } from "next/navigation";
import useOpenToggle from "@/hooks/useOpenToggle";
import { BlogCreateModal } from "../blog/blog.create.modal";

type Props = {
  logo?: { src?: string; alt?: string; width?: number; height?: number };
  title?: string;
};

const AppNavbar = ({
  logo = {
    src: "/logo/logoipsum-248.svg",
    alt: "Logo Ipsum",
    width: 36,
    height: 36,
  },
  title = "My Bus-ID",
}: Props) => {
  // Check valid auth user
  const auth = useAuth();
  const pathname = usePathname();
  const { isOpen, open, close } = useOpenToggle();

  const isActive = (path: string): boolean =>
    path === "/"
      ? pathname === "/"
      : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Navbar fluid className="sticky top-0 z-50 bg-white dark:bg-black">
      <NavbarBrand as={Link} href="/">
        {logo.src ? (
          <Image
            src={logo.src}
            className="mr-3 h-6 sm:h-9 dark:grayscale dark:invert"
            alt={logo.alt || "Logo"}
            width={logo.width || 36}
            height={logo.height || 36}
          />
        ) : null}
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          {title}
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {auth?.user ? (
          <>
            <Button pill outline color={"dark"} className="mr-4" onClick={open}>
              <PlusCircleIcon className="mr-2 size-5" />
              Create Post
            </Button>
            <BlogCreateModal openModal={isOpen} onClose={close} />
          </>
        ) : null}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {[
          ...publicRoutes,
          ...(auth?.user ? privateRoutes : guestOnlyRoutes),
        ].map(({ path, label }: RouteData) => (
          <NavbarLink as={Link} key={path} href={path} active={isActive(path)}>
            {label}
          </NavbarLink>
        ))}
      </NavbarCollapse>
    </Navbar>
  );
};

export default AppNavbar;
