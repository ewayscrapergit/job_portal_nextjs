import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PopupLayout from "../popup_layout";
import Register from "../register";
import Login from "../login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { popupAction } from "../../redux/actions/popupActions";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJson from "../../locales/en/en";
import deJson from "../../locales/de/de";
import $ from "jquery";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enJson,
    },
    de: {
      translation: deJson,
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default function Header() {
  const { t } = useTranslation();

  const router = useRouter();
  const dispatch = useDispatch();
  const url = router.pathname;
  const [sticky, setSticky] = useState("");

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const [language, setLanguage] = useState("en");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, popup } = userLogin;

  useEffect(() => {
    setLogin(false);
    setRegister(false);
  }, [popup]);

  const getRegisterPopup = () => {
    setRegister(true);
  };

  const getLoginPopup = () => {
    setLogin(true);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop > 30 ? " navbar-shrink" : "";
    setSticky(stickyClass);
  };
  const classes = `navbar navbar-default fixed-top ${sticky}`;

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  useEffect(() => {
    var langArray = [];
    $(".vodiapicker option").each(function () {
      var img = $(this).attr("data-thumbnail");
      var text = this.innerText;
      var value = $(this).val();
      var item =
        '<li><img src="' +
        img +
        '" alt="" value="' +
        value +
        '"/><span>' +
        text +
        "</span></li>";
      langArray.push(item);
    });

    $("#a").html(langArray);

    //Set the button value to the first el of the array
    $(".btn-select").html(langArray[0]);
    $(".btn-select").attr("value", "en");

    //change button stuff on click
    $("#a li").click(function () {
      var img = $(this).find("img").attr("src");
      var value = $(this).find("img").attr("value");
      var text = this.innerText;
      var item =
        '<li><img src="' + img + '" alt="" /><span>' + text + "</span></li>";
      $(".btn-select").html(item);
      $(".btn-select").attr("value", value);
      $(".b").toggle();
      // console.log("ffffff", value);
      setLanguage(value);
      dispatch(popupAction());
    });

    $(".btn-select").click(function () {
      $(".b").toggle();
      console.log("click");
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", JSON.stringify(language));
    i18n.changeLanguage(language);
  }, [language]);

  // console.log("dfs", language);
  return (
    <>
      <div className={classes}>
        <div className="container">
          <div className="logo">
            <Link href="/">
              <a>
                <img src="/images/logo.png" alt="" />
              </a>
            </Link>
          </div>
          <div className="rt-side">
            <div className="navigation">
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
                    <a className={`${url == "/about" ? "header-active" : ""}`}>
                      {t("header-About")}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/clients">
                    <a
                      className={`${url == "/clients" ? "header-active" : ""}`}
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
                    <a className={`${url == "/blogs" ? "header-active" : ""}`}>
                      {t("header-Blogs")}
                    </a>
                  </Link>
                </li>
                {userInfo ? (
                  <li>
                    <Link href="/account">
                      <a
                        className={`${
                          url == "/account" ? "header-active" : ""
                        }`}
                      >
                        {t("header-Account")}
                      </a>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
            <div className="find-job">
              <Link href="/jobs">
                <a
                  className={`${
                    url == "/jobs" || url == "/jobs/[id]" ? "header-active" : ""
                  }`}
                >
                  <i className="fa-solid fa-magnifying-glass" />{" "}
                  {t("header-Find-Jobs")}
                </a>
              </Link>
            </div>
            <div className="find-job">
              <Link href="/candidates">
                <a
                  className={`${
                    url == "/candidates" || url == "/candidates/[id]"
                      ? "header-active"
                      : ""
                  }`}
                >
                  <i className="fa-solid fa-magnifying-glass" />{" "}
                  {t("header-Find-Candidates")}
                </a>
              </Link>
            </div>
            <div className="post-job">
              {userInfo ? (
                <ul>
                  <li>
                    <a onClick={logoutHandler}>{t("header-Logout")}</a>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <a
                      onClick={getLoginPopup}
                      className={login == true ? "header-active" : ""}
                    >
                      {t("header-Login")}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={getRegisterPopup}
                      className={register == true ? "header-active" : ""}
                    >
                      {t("header-Register")}
                    </a>
                  </li>
                </ul>
              )}
            </div>
            <select className="vodiapicker">
              <option
                value="en"
                data-thumbnail="/images/eng.png"
              >
                English
              </option>
              <option
                value="de"
                data-thumbnail="/images/netherlands.png"
              >
                Dutch
              </option>
            </select>

            <div className="lang-select">
              <button className="btn-select" value=""></button>
              <div className="b">
                <ul id="a"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Create Login Popup */}
      <PopupLayout trigger={login} setTrigger={setLogin}>
        <Login />
      </PopupLayout>
      {/* Create Register Popup */}
      <PopupLayout trigger={register} setTrigger={setRegister}>
        <Register />
      </PopupLayout>
    </>
  );
}
