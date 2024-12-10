"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import bg from "@/../public/authBg.webp";
import Image from "next/image";
import Link from "next/link";
import scss from "./SignUp.module.scss";

interface IFormInput {
  phone: string;
  password: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Form submitted successfully:", data);
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

  const isValidPhone = watch("phone")?.length === 18;
  const isValidPassword = watch("password")?.length >= 8;

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
              <div className={scss.icon}>
                {errors.phone && isSubmitted ? (
                  <MdErrorOutline title={errors.phone.message} />
                ) : isValidPhone ? (
                  <IoCheckmarkDone className={scss.successIcon} />
                ) : null}
              </div>
            </div>
          </div>

          <div className={scss.password}>
            <h4>Пароль</h4>
            <div className={scss.inputWrapper}>
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
              <div className={scss.icon}>
                {errors.password && isSubmitted ? (
                  <MdErrorOutline title={errors.password.message} />
                ) : isValidPassword ? (
                  <IoCheckmarkDone className={scss.successIcon} />
                ) : null}
              </div>
            </div>
          </div>

          <div className={scss.remember}>
            <label className={scss.checkbox}>
              <input type="checkbox" />
              <span>Запомнить</span>
            </label>
            <Link href="/auth/forgot">Забыли пароль?</Link>
          </div>

          <button type="submit" className={scss.signIn}>
            Войти
          </button>
        </form>

        <div className={scss.register}>
          <span>Вы у нас впервые?</span>
          <Link href="/auth/sign-up">Создать аккаунт</Link>
        </div>
      </div>
      <Image className={scss.bg} src={bg} alt="bg" />
    </div>
  );
};

export default SignUp;
