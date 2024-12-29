"use client";
import { FC, ReactNode, useState, useEffect } from "react";
import bg1 from "@/../public/medinfo1.png";
import bg2 from "@/../public/medinfo2.png";
import bg3 from "@/../public/authBg.webp";
import Image from "next/image";
import scss from "./LayoutAuth.module.scss";

interface LayoutPageType {
  children: ReactNode;
}

const images = [bg1, bg2, bg3];

const LayoutPageAuth: FC<LayoutPageType> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={scss.LayoutPage}>
      <main>{children}</main>
      <div className={scss.imageWrapper}>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`background ${index + 1}`}
            className={`${scss.bg} ${
              index === currentIndex ? scss.active : scss.inactive
            }`}
            priority={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default LayoutPageAuth;
