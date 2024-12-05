"use client"
import React, { FC, ReactNode } from "react";
import scss from "./Layout.module.scss";
import SiteBar from "./SiteBar/Sitebar";

interface LayoutPageType {
  children: ReactNode;
}

const LayoutPage: FC<LayoutPageType> = ({ children }) => {
  return (
    <div className={scss.LayoutPage}>
      <SiteBar />
      <main>{children}</main>
    </div>
  );
};

export default LayoutPage;
