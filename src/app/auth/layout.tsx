import LayoutPageAuth from "@/components/auth/layout/LayoutAuth";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <LayoutPageAuth>{children}</LayoutPageAuth>;
};

export default Layout;
