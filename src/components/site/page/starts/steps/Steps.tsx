"use client";
import React, { ChangeEvent, useState } from "react";
import scss from "./Steps.module.scss";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const Steps = () => {
  const [step, SetStep] = useState(1);
  const [value, setValue] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const nextStep = () => {
    if (step < 4) {
      SetStep(step + 1);
    }
  };

  return (
    <div className={scss.steps}>
      <h3>#Dashboard</h3>
      <div className={scss.content}>
        {step === 1 && (
          <div className={scss.step1}>
            <p>Шаг 1 из {value + 1}</p>
            <h1>Сколько детей в вашей семье?</h1>
            <p>
              Чтобы создать отдельные медицинские карты для каждого ребенка,
              уточните количество детей в семье. Так вам будет удобнее хранить
              всю необходимую информацию.
            </p>
            <span>
              <input
                type="range"
                className={scss.range}
                max={10}
                value={value}
                min={0}
                onChange={handleChange}
              />
              <p>{value}</p>
            </span>
            <button onClick={() => nextStep()}>
              Следующий шаг <IoIosArrowForward className={scss.icons} />
            </button>
          </div>
        )}
        {step === 2 && (
          <div className={scss.step1}>
            <p>
              Шаг {step} из {value + 1}
            </p>
            <h1>Введите имя {value - 1} ребенка</h1>
            <p>
              Пожалуйста введите точные данные вашего ребенка. Правильные
              сведения упрощают работу нашей платформы.
            </p>
            <div className={scss.inputs}>
              <label>
                Полное имя
                <input
                  type="text"
                  className={scss.name}
                  placeholder="Полное имя"
                />
              </label>
              <span>
                <label>
                  Дата рождения
                  <input
                    type="date"
                    className={scss.date}
                    placeholder="День. Месяц. Год"
                  />
                </label>
                <label>
                  Пол
                  <select className={scss.select}>
                    <option>Женский</option>
                    <option>Мужской</option>
                  </select>
                </label>
              </span>
              <label>
                Город проживания
                <input
                  type="text"
                  placeholder="Город проживания"
                  className={scss.city}
                />
              </label>
            </div>
            <button onClick={() => nextStep()}>
              Следующий шаг <IoIosArrowForward className={scss.icons} />
            </button>
          </div>
        )}
        {step == 3 && (
          <div className={scss.step1}>
            <p>Шаг 4 из 4</p>
            <h1>Завершено!</h1>
            <p>
              Поздравляем! Вы успешно создали медицинские карты своим детям.
              Теперь у вас есть полный доступ ко всем возможностям платформы. 
            </p>
            ///////
           <Link href={'/'}>
           <button>
              Приступить к работе <IoIosArrowForward className={scss.icons} />
            </button>
           </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Steps;
