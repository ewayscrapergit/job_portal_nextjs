import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function UploadCV() {
  const { t } = useTranslation();
  return (
    <>
      <div className="upload-cv">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="text-block">
                <h3>{t("upload-cv-Build")}</h3>
                <h2>
                  {t("upload-cv-Get")} <span>{t("upload-cv-valuable")}</span>{" "}
                  {t("upload-cv-your")}
                </h2>
                <p>{t("upload-cv-Lorem")}</p>
                <div className="find-btn">
                  <Link href="/jobs">
                    <a>{t("upload-cv-btn")}</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="img-block">
                <img src="/images/cv-img.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
