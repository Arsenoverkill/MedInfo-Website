"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import Link from "next/link";
import scss from "./EmployeeAuth.module.scss";

interface IFormInput {
  name: string;
  phone: string;
  employee: string;
  position: string;
}

const employeeSuggestions = ["Иванов", "Иванова", "Иван"];
const positionSuggestions = ["Менеджер", "Разработчик", "Дизайнер"];

const UserAuth = () => {
  const [employeeSuggestion, setEmployeeSuggestion] = useState<string>("");
  const [positionSuggestion, setPositionSuggestion] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      phone: "+996",
      employee: "",
      position: "",
    },
  });

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

  const handleInputEmployee = (e: string) => {
    setValue("employee", e, { shouldValidate: true });
    const match = employeeSuggestions.find((word) =>
      word.toLowerCase().startsWith(e.toLowerCase())
    );
    setEmployeeSuggestion(match ? match.slice(e.length) : "");
  };

  const handleInputPosition = (e: string) => {
    setValue("position", e, { shouldValidate: true });
    const match = positionSuggestions.find((word) =>
      word.toLowerCase().startsWith(e.toLowerCase())
    );
    setPositionSuggestion(match ? match.slice(e.length) : "");
  };

  const handleKeyEmployee = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab" && employeeSuggestion) {
      event.preventDefault();
      const currentValue = watch("employee");
      setValue("employee", currentValue + employeeSuggestion, {
        shouldValidate: true,
      });
      setEmployeeSuggestion("");
    }
  };

  const handleKeyPosition = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab" && positionSuggestion) {
      event.preventDefault();
      const currentValue = watch("position");
      setValue("position", currentValue + positionSuggestion, {
        shouldValidate: true,
      });
      setPositionSuggestion("");
    }
  };
  const renderValidationIcon = (field: keyof IFormInput) => {
    if (errors[field] && isSubmitted) {
      return <MdErrorOutline title={errors[field]?.message} />;
    }
    const value = watch(field);
    if (field === "employee" && value?.length > 2)
      return <IoCheckmarkDone className={scss.successIcon} />;
    if (field === "position" && value?.length > 2)
      return <IoCheckmarkDone className={scss.successIcon} />;
    if (field === "phone" && value?.length === 18)
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
          type={type}
          placeholder={`Введите ${label.toLowerCase()}`}
          {...register(name, {
            required: `${label} обязательно`,
          })}
          style={{
            borderColor: errors[name] && isSubmitted ? "#FF5E5D" : "",
          }}
          onChange={(e) => {
            if (name === "phone") handlePhoneChange(e);
            else if (name === "employee") handleInputEmployee(e.target.value);
            else if (name === "position") handleInputPosition(e.target.value);
          }}
          onKeyDown={
            name === "employee" ? handleKeyEmployee : handleKeyPosition
          }
        />
        <div className={scss.icon}>{renderValidationIcon(name)}</div>
        {name == "employee" || name == "position" ? (
          <div className={scss.overlay}>
            {name === "employee" ? watch("employee") : watch("position")}
            <span
              style={{
                color:
                  (name === "employee" && watch("employee") == "") ||
                  (name === "position" && watch("position") == "")
                    ? "transparent"
                    : "",
              }}
              className={scss.suggestion}
            >
              {name === "employee" ? employeeSuggestion : positionSuggestion}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className={scss.EmployeeAuth}>
      <div className={scss.content}>
        <h1>Создаем аккаунт</h1>
        <p>Пожалуйста, заполните поля ниже</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInputField("name", "ФИО")}
          {renderInputField("phone", "Номер телефона")}
          <div className={scss.inputsWrapper}>
            {renderInputField("employee", "Сотрудник")}
            {renderInputField("position", "Должность")}
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

export default UserAuth;
