"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import Link from "next/link";
import scss from "./MedAuth.module.scss";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  company: string;
  QuantityEmp: string;
}

const MedAuth = () => {
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
  const isValidEmail = watch("email")?.includes("@");
  const isValidName = watch("name")?.length > 2;
  const isValidCompany = watch("company")?.length > 2;
  const isValidQuantity = watch("QuantityEmp")?.length > 0;

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
    if (field === "company" && isValidCompany)
      return <IoCheckmarkDone className={scss.successIcon} />;
    if (field === "QuantityEmp" && isValidQuantity)
      return <IoCheckmarkDone className={scss.successIcon} />;
    return null;
  };

  const renderInputField = (name: keyof IFormInput, label: string) => (
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
          inputMode={
            name === "QuantityEmp" || name === "phone" ? "numeric" : "text"
          }
          type={name === "QuantityEmp" ? "number" : "text"}
          {...register(name, {
            required: `${label} обязательно`,
            ...(name === "QuantityEmp" && {
              validate: (value) =>
                value.length <= 3 || "Можно ввести не более 3 цифр",
            }),
            ...(name === "phone" && {
              validate: {
                validLength: (value) =>
                  value.length === 18 || "Введите полный номер телефона",
              },
            }),
            ...(name === "email" && {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Некорректный email",
              },
            }),
          })}
          style={{
            borderColor: errors[name] && isSubmitted ? "#FF5E5D" : "",
          }}
          onInput={(e) => {
            if (name === "QuantityEmp") {
              const input = e.target as HTMLInputElement;
              input.value = input.value.slice(0, 3);
            }
          }}
        />
        <div className={scss.icon}>{renderValidationIcon(name)}</div>
      </div>
    </div>
  );

  return (
    <div className={scss.MedAuth}>
      <div className={scss.content}>
        <div>
          <h1>Создаем аккаунт</h1>
          <p>Пожалуйста, заполните поля ниже</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInputField("name", "ФИО")}
          {renderInputField("email", "E-mail")}
          {renderInputField("phone", "Номер телефона")}
          <div className={scss.inputsWrapper}>
            {renderInputField("company", "Название компании")}
            {renderInputField("QuantityEmp", "Количество сотрудников")}
          </div>
          <button type="submit" className={scss.signIn}>
            Зарегистрироваться
          </button>
        </form>
        <div className={scss.agree}>
          <label>
            <input type="checkbox" />
            <span>
              Я прочел(а) и согласен(сна) с <span>Условиями использования</span>{" "}
              и <span>Политикой конфиденциальности</span> Medinfo.
            </span>
          </label>
        </div>
        <div className={scss.login}>
          <span>Уже есть аккаунт на Medinfo?</span>
          <Link href="/auth/sign-in">Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default MedAuth;
