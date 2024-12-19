"use client";
import Image from "next/image";
import scss from "./Sitebar.module.scss";
import user from "@/../public/user.svg";
import proche from "@/../public/icons/прочее.svg";
import message from "@/../public/message.svg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineHashtag } from "react-icons/hi";
import { BsCapsule } from "react-icons/bs";
import { RiTestTubeLine } from "react-icons/ri";
import { IoLayersOutline } from "react-icons/io5";
import { RiLinksLine } from "react-icons/ri";

const SiteBar = () => {
  return (
    <div className={scss.siteBar}>
      <div className={scss.userProfile}>
        <div className={scss.userDiv}>
          <Image
            className={scss.user}
            src={user}
            alt="user"
            width={1000}
            height={1000}
            priority
            rel="preload"
          />
          <span className={scss.onlineDiv}></span>
        </div>
        <Image src={proche} alt="proche" className={scss.proche} />
        <Image src={message} alt="" className={scss.message} />
        <h4>DMs</h4>
      </div>
      <div className={scss.userMenu}>
        <span>
          <h3>
            Отсуствует <IoIosArrowForward className={scss.arrow} />
          </h3>
          <RiLogoutBoxRLine className={scss.logout} />
        </span>
        <details className={scss.detailsPersonal} open>
          <summary className={scss.personalTitle}>
            {" "}
            <IoIosArrowForward className={scss.arrowDetails} /> Личный кабинет
          </summary>
          <h3>
            <div className={scss.iconTittle}>
              <HiOutlineHashtag className={scss.hashtag} /> Dashboard{" "}
            </div>
          </h3>
          <h3>
            <div className={scss.iconTittle}>
              <HiOutlineHashtag className={scss.hashtag} /> Медицинская карта
            </div>
            <div className={scss.quantity}>222</div>
          </h3>
          <h3>
            <div className={scss.iconTittle}>
              <HiOutlineHashtag className={scss.hashtag} /> Прививки
            </div>
            <div className={scss.quantity}>10</div>
          </h3>
          <h3>
            <div className={scss.iconTittle}>
              <HiOutlineHashtag className={scss.hashtag} /> Назначения
            </div>
            <div className={scss.quantity}>191</div>
          </h3>
          <h2>
            Добавить канал <IoIosArrowForward className={scss.arrow} />
          </h2>
        </details>
        <details className={scss.detailsPersonal} open>
          <summary className={scss.personalTitle}>
            {" "}
            <IoIosArrowForward className={scss.arrowDetails} /> Входящие
            сообщения
          </summary>
          <h3>
            <div className={scss.iconTittle}>
              {" "}
              <Image
                src={user}
                alt=""
                width={1000}
                height={1000}
                className={scss.userMsg}
              />
              Мединфо
              <div className={scss.onlineDiv}></div>
            </div>
            <div className={scss.quantity}>1</div>
          </h3>
          <h3>
            <div className={scss.iconTittle}>
              {" "}
              <Image
                src={user}
                alt=""
                width={1000}
                height={1000}
                className={scss.userMsg}
              />
              Мединфо
              <div className={scss.onlineDiv}></div>
            </div>
            <div className={scss.quantity}>444</div>{" "}
          </h3>
          <h3>
            <div className={scss.iconTittle}>
              {" "}
              <Image
                src={user}
                alt=""
                width={1000}
                height={1000}
                className={scss.userMsg}
              />
              Мединфо
              <div className={scss.onlineDiv}></div>
            </div>
            <div className={scss.quantity}>444</div>{" "}
          </h3>
          <h3>
            <div className={scss.iconTittle}>
              {" "}
              <Image
                src={user}
                alt=""
                width={1000}
                height={1000}
                className={scss.userMsg}
              />
              Мединфо
              <div className={scss.onlineDiv}></div>
            </div>
            <div className={scss.quantity}>444</div>{" "}
          </h3>
          <h2>
            Все сообщения <IoIosArrowForward className={scss.arrow} />
          </h2>
        </details>
        <div className={scss.userOptions}>
          <h2>
            {" "}
            <BsCapsule className={scss.optionIcons} /> Купить медикаменты
          </h2>
          <h2>
            {" "}
            <RiTestTubeLine className={scss.optionIcons} /> Сдать анализы
          </h2>
          <h2>
            {" "}
            <IoLayersOutline className={scss.optionIcons} /> Добавить медисторию
          </h2>
          <h2>
            {" "}
            <RiLinksLine className={scss.optionIcons} /> Cвязать платформу с
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SiteBar;
