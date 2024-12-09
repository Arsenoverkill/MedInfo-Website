import LayoutPage from "@/components/site/layout/LayoutPage";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <LayoutPage>{children}</LayoutPage>;
};

export default Layout;
