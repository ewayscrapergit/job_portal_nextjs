import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ContactUs from "../contactUs";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const router = useRouter();
  const url = router.pathname;
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="top-block">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="box">
                  <div className="logo">
                    <a href="#">
                      <img src="/images/logo2.png" alt="" />
                    </a>
                  </div>
                  <div className="cont_us">
                    <h3>{t("footer-Contact")}</h3>
                    <ul>
                      <li>
                        <a href="tel:">
                          <i className="fa-solid fa-phone" /> (0123) 456 789
                        </a>
                      </li>
                      <li>
                        <a href="mailto:">
                          <i className="fa-solid fa-paper-plane" />{" "}
                          info@jobportal.gmail.com
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="social">
                    <h3>{t("footer-Social")}</h3>
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12">
                <div className="box">
                  <h2>{t("footer-our")}</h2>
                  <ul>
                    <li>
                      <Link href="/">
                        <a className={`${url == "/" ? "header-active" : ""}`}>
                          {t("header-Home")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/about">
                        <a
                          className={`${
                            url == "/about" ? "header-active" : ""
                          }`}
                        >
                          {t("header-About")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/clients">
                        <a
                          className={`${
                            url == "/clients" ? "header-active" : ""
                          }`}
                        >
                          {t("header-Clients")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/it-specialist">
                        <a
                          className={`${
                            url == "/it-specialist" ? "header-active" : ""
                          }`}
                        >
                          {t("header-IT-Specialist")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blogs">
                        <a
                          className={`${
                            url == "/blogs" ? "header-active" : ""
                          }`}
                        >
                          {t("header-Blogs")}
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-12">
                <ContactUs t={t} />
              </div>
            </div>
          </div>
          <div className="btm-block">
            <p>{t("footer-copyright")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
