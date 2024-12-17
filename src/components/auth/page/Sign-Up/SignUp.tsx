"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { FaRegEyeSlash } from "react-icons/fa6";
import Link from "next/link";
import scss from "./SignUp.module.scss";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
  const isValidConfirmPassword = watch("confirmPassword") === watch("password");
  const isValidEmail = watch("email")?.includes("@");
  const isValidName = watch("name")?.length > 2;

  const renderValidationIcon = (field: keyof IFormInput) => {
    if (errors[field] && isSubmitted) {
      return <MdErrorOutline title={errors[field]?.message} />;
    }
    if (field === "name" && isValidName)
      return <IoCheckmarkDone className={scss.successIcon} />;
    if (field === "email" && isValidEmail)
      return <IoCheckmarkDone className={scss.successIcon} />;
    if (field === "phone" && isValidPhone)
      return <IoCheckmarkDone className={scss.successIcon} />;
    if (field === "password" && isValidPassword)
      return <IoCheckmarkDone className={scss.successIcon} />;
    if (field === "confirmPassword" && isValidConfirmPassword)
      return <IoCheckmarkDone className={scss.successIcon} />;
    return null;
  };

  const renderInputField = (
    name: keyof IFormInput,
    label: string,
    type: string = "text"
  ) => (
    <div className={scss.inputGroup}>
      <h4
        style={{
          color: errors[name] && isSubmitted ? "#FF5E5D" : "",
        }}
      >
        {errors[name] && isSubmitted ? errors[name]?.message : label}
      </h4>
      <div className={scss.inputWrapper}>
        <input
          type={
            name === "password" || name === "confirmPassword"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={`Введите ${label.toLowerCase()}`}
          {...register(name, {
            required: `${label} обязательно`,
            minLength:
              name === "password"
                ? {
                    value: 8,
                    message: "Пароль должен быть не менее 8 символов",
                  }
                : undefined,
            pattern:
              name === "email"
                ? {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Некорректный email",
                  }
                : undefined,
            validate:
              name === "confirmPassword"
                ? (value) =>
                    value === watch("password") || "Пароли не совпадают"
                : undefined,
          })}
          style={{
            borderColor: errors[name] && isSubmitted ? "#FF5E5D" : "",
          }}
          onChange={name === "phone" ? handlePhoneChange : undefined}
        />
        <div className={scss.icon}>
          {name === "password" || name === "confirmPassword" ? (
            showPassword ? (
              <FiEye
                className={scss.eye}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaRegEyeSlash
                className={scss.eye}
                onClick={() => setShowPassword(true)}
              />
            )
          ) : (
            renderValidationIcon(name)
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={scss.SignUp}>
      <div className={scss.content}>
        <h1>Medinfo 👋</h1>
        <p>Введите номер телефона и пароль, чтобы войти</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInputField("name", "Имя")}
          {renderInputField("email", "Email", "email")}
          {renderInputField("phone", "Номер телефона")}
          {renderInputField("password", "Пароль")}
          {renderInputField("confirmPassword", "Подтвердите пароль")}

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
    </div>
  );
};

export default SignIn;
