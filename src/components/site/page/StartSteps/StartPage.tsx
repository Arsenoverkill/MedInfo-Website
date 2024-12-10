import React from "react";
import scss from "./StartPage.module.scss";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { BsCardChecklist } from "react-icons/bs";
import image from "@/../public/start1.svg";
import Image from "next/image";
import Link from "next/link";

const StartPageOne = () => {
  return (
    <div className={scss.StartPageOne}>
      <div className="container">
        <h3># Мединфо</h3>
        <div className={scss.content}>
          <div className={scss.AllBlock}>
            <Image
              src={image}
              alt=""
              width={1000}
              height={1000}
              className={scss.image}
            />
            <h1>Начните следить за здоровьем детей прямо сейчас!</h1>
            <p>
              Ответьте на несколько простых вопросов, заполните информацию о
              детях, и вы сможете полностью использовать все возможности нашего
              сервиса.
            </p>
            <div className={scss.blocks}>
              <div className={scss.block}>
                <span className={scss.iconContainer}>
                <RiQuestionAnswerLine className={scss.icons} />{" "}
                </span>
                <span>
                  <h4>Как работать с платформой?</h4>
                  <h5>Переход к диалогу с Medinfo</h5>
                </span>
              </div>
               <Link href={'/startStep/steps'}>
              <div className={scss.block}>
                <span className={scss.iconContainer}>
                <BsCardChecklist className={scss.icons} />{" "}
                </span>
               <span>
                  <h4>Начать работу!</h4>
                  <h5>Создание медицинской карты детям</h5>
                </span>
              </div>
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPageOne;
