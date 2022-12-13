import React, { useEffect } from "react";
import Newsletter from "../../components/newsletter";
import Banner from "../../components/banner";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <>
        {/* Inner Banner */}
        <Banner name={"About"} />

        <div className="about-job">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="img-block">
                  <img src="images/about-img.jpg" alt="" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6ss col-sm-12">
                <div className="text-block">
                  <img src="images/ab-icn.png" alt="" />
                  <h2>
                    {t("about-job-About")}{" "}
                    <span>{t("about-job-JobPortal")}</span>
                  </h2>
                  <p>{t("about-job-Created")}</p>
                  <p>{t("about-job-When")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-exp">
          <div className="container">
            <div className="inn">
              <div className="box">
                <div className="icon">
                  <img src="images/exp-icn1.png" alt="" />
                </div>
                <h2>
                  {t("about-job-Experience")}{" "}
                  <span>{t("about-job-Expertise")}</span>
                </h2>
                <p>{t("about-job-ADS")}</p>
              </div>
              <div className="box">
                <div className="icon">
                  <img src="images/exp-icn2.png" alt="" />
                </div>
                <h2>
                  {t("about-job-Customer")}{" "}
                  <span>{t("about-job-Oriented")}</span>
                </h2>
                <p>{t("about-job-We-understand")}</p>
              </div>
              <div className="box">
                <div className="icon">
                  <img src="images/exp-icn3.png" alt="" />
                </div>
                <h2>
                  {t("about-job-Employment")}{" "}
                  <span>{t("about-job-Support")}</span>
                </h2>
                <p>{t("about-job-ADS-ICT")}</p>
              </div>
              <div className="box">
                <div className="icon">
                  <img src="images/exp-icn4.png" alt="" />
                </div>
                <h2>
                  {t("about-job-Talent")} <span>{t("about-job-Network")}</span>
                </h2>
                <p>{t("about-job-Employment-opportunities")}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Subscribe Start */}
        <Newsletter />
      </>
    </>
  );
}
