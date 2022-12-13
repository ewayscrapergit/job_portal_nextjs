import React from "react";
import { useTranslation } from "react-i18next";

export default function Banner({ name }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="inn-bann">
        <img src="/images/inner-bnn2.jpg" alt="" />
        <div className="desc">
          <div className="container">
            <h1>{t(`banner-${name}`)}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
