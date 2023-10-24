"use client";
import { usePathname } from "next/navigation";

const getCurrentPath = () => {
  const currentPath = usePathname()
    .split("/")
    .at(-1)
    .replace(/^\w/, (char) => char.toUpperCase())
    .replace(/([a-z])([A-Z])/g, "$1 $2");

  return currentPath ? currentPath : "Dashboard";
};

export default getCurrentPath;
