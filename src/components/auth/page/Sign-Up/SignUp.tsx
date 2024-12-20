"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import peopleIcons from "@/../public/people icon.svg";
import scss from "./SignUp.module.scss";
import Image from "next/image";

const SignUp = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
  const router = useRouter();

  const options = [
    {
      id: "option1",
      label: "Вы - обычный пользователь платформы “Medinfo”",
      registerType: "/auth/sign-up/user",
    },
    {
      id: "option2",
      label: "Вы - медицинский работник партнера “Medinfo”",
      registerType: "/auth/sign-up/med-personal",
    },
    {
      id: "option3",
      label: "Вы - наш партнер “Medinfo”",
      registerType: "/auth/sign-up/employee",
    },
  ];

  const handleOptionClick = (id: string) => {
    setSelectedCheckbox(id);
  };

  return (
    <div className={scss.SignUp}>
      <h1>Medinfo 👋</h1>
      <p>Нам нужно установить вашу роль для корректной работы платформы.</p>
      <div className={scss.content}>
        {options.map((option) => (
          <div
            key={option.id}
            style={{
              border:
                selectedCheckbox === option.id
                  ? "2px solid #70bfd1"
                  : "2px solid transparent",
              background: selectedCheckbox === option.id ? "#4a89dc5c" : "",
            }}
            onClick={() => handleOptionClick(option.id)}
          >
            <Image src={peopleIcons} alt="peopleIcons" />
            <span>{option.label}</span>
            <input
              checked={selectedCheckbox === option.id}
              readOnly
              type="checkbox"
            />
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          router.push(
            options.find((option) => option.id === selectedCheckbox)
              ?.registerType || ""
          )
        }
      >
        Далее
      </button>

    </div>
  );
};

export default SignUp;
