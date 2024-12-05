"use client";
import Image from "next/image";
import scss from "./Sitebar.module.scss";
import user from "@/../public/user.svg";
import arrow from "@/../public/icons/arrowRigth.svg";
import logout from "@/../public/icons/iconsLogout.svg";
import hashtag from "@/../public/icons/хештег.svg";
import proche from "@/../public/icons/прочее.svg";

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
          />
          <span className={scss.onlineDiv}></span>
        </div>
        <Image src={proche} alt="proche"/>
      </div>
      <div className={scss.userMenu}>
        <span>
          <h3>
            Отсуствует <Image src={arrow} alt="arrow" className={scss.arrow} />
          </h3>
          <Image src={logout} alt="logout" className={scss.logout} />
        </span>
        <details className={scss.detailsPersonal}>
          <summary>Личный кабинет</summary>
          <h3>
            <Image src={hashtag} alt="#" className={scss.hashtag} /> Dashboard
          </h3>
          <h3>
            <Image src={hashtag} alt="#" className={scss.hashtag} /> Dashboard
          </h3>
        </details>
        <details className={scss.detailsPersonal}>
          <summary>Входящие сообщения</summary>
          <h3>Мединфо</h3>
          <h3>Мединфо</h3>
        </details>
      </div>
    </div>
  );
};

export default SiteBar;
