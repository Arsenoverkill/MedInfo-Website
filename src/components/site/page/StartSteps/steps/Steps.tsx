"use client";
import React, { useState } from "react";
import scss from "./Steps.module.scss";
import { IoIosArrowForward } from "react-icons/io";

const Steps = () => {
  const [step, SetStep] = useState(1);

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
            <p>Шаг 1 из 4</p>
            <h1>Сколько детей в вашей семье?</h1>
            <p>
              Чтобы создать отдельные медицинские карты для каждого ребенка,
              уточните количество детей в семье. Так вам будет удобнее хранить
              всю необходимую информацию.
            </p>
            <span>
              <input type="range" className={scss.range} /> <p>2</p>
            </span>
            <button onClick={() => nextStep()}>
              Следующий шаг <IoIosArrowForward className={scss.icons} />
            </button>
          </div>
        )}
        {step === 2 && (
          <div className={scss.step1}>
            <p>Шаг 2 из 4</p>
            <h1>Введите имя первого ребенка</h1>
            <p>
              Пожалуйста введите точные данные вашего ребенка. Правильные
              сведения упрощают работу нашей платформы.
            </p>
            <div className={scss.inputs}>
              <label>
                Полное имя
                <input type="text" className={scss.range} />
              </label>
              <span>
                <label>
                  Дата рождения
                  <input type="date" about="date" />
                </label>
                <label>
                  Пол
                  <select>
                    <option>Женский</option>
                    <option>Мужской</option>
                  </select>
                </label>
              </span>
              <label>
                Город проживания
                <input type="text" />
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
            <button>
              Приступить к работе <IoIosArrowForward className={scss.icons} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Steps;
