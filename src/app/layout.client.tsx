"use client";
import LayoutPage from "@/components/site/layout/LayoutPage";
import React, { FC, ReactNode } from "react";

interface LayoutClientType {
  children: ReactNode;
}

const LayoutClient: FC<LayoutClientType> = ({ children }) => {
  return <LayoutPage>{children}</LayoutPage>;
};

export default LayoutClient;
