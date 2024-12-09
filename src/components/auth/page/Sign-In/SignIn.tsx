"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import bg from "@/../public/authBg.webp";
import Image from "next/image";
import Link from "next/link";
import scss from "./SignIn.module.scss";

interface IFormInput {
  phone: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "").substring(0, 12);

    const formatted = cleaned.replace(
      /^996(\d{0,3})(\d{0,3})(\d{0,3})$/,
      (_, g1, g2, g3) => {
        let result = "+996";
        if (g1) result += ` (${g1}`;
        if (g1 && g2) result += `) ${g2}`;
        if (g1 && g2 && g3) result += ` ${g3}`;
        return result;
      }
    );

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (!inputValue.startsWith("+996")) {
      setValue("phone", "+996", { shouldValidate: true });
      return;
    }

    const formatted = formatPhoneNumber(inputValue);
    setValue("phone", formatted, { shouldValidate: true });
  };

  return (
    <div className={scss.SignIn}>
      <div className={scss.content}>
        <h1>Medinfo 👋</h1>
        <p>Введите номер телефона и пароль, чтобы войти</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={scss.phone}>
            <h4>Номер телефона</h4>
            <div className={scss.inputWrapper}>
              <input
                type="text"
                value={watch("phone") || "+996"}
                {...register("phone", {
                  required: "Номер телефона обязателен",
                  validate: (value) =>
                    value.length === 18 || "Введите полный номер телефона",
                })}
                onChange={handlePhoneChange}
              />
              {errors.phone && (
                <div>
                  <MdErrorOutline />
                  <p className={scss.errorText}>{errors.phone.message}</p>
                </div>
              )}
            </div>
          </div>

          <div className={scss.password}>
            <h4>Пароль</h4>
            <input
              placeholder="Введите как минимум 8 символов"
              type="password"
              {...register("password", {
                required: "Пароль обязателен",
                minLength: {
                  value: 8,
                  message: "Пароль должен быть не менее 8 символов",
                },
              })}
            />
            {errors.password && (
              <div>
                <MdErrorOutline />
                <p className={scss.errorText}>{errors.password.message}</p>
              </div>
            )}
          </div>

          <div className={scss.remember}>
            <label className={scss.checkbox}>
              <input type="checkbox" />
              <span>Запомнить</span>
            </label>
            <Link href="#">Забыли пароль?</Link>
          </div>

          <button type="submit" className={scss.signIn}>
            Войти
          </button>
        </form>

        <div className={scss.register}>
          <span>Вы у нас впервые?</span>
          <Link href="#">Создать аккаунт</Link>
        </div>
      </div>
      <Image className={scss.bg} src={bg} alt="bg" />
    </div>
  );
};

export default SignIn;
