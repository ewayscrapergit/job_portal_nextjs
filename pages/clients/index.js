import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Banner from "../../components/banner";
import Newsletter from "../../components/newsletter";
import { ShimmerPostItem } from "react-shimmer-effects";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Clients() {
  const [testimonials, setTestimonials] = useState([]);
  const { t } = useTranslation();

  const popuphn = useSelector((state) => state.popuphn);

  useEffect(() => {
    const lang =
      typeof window !== "undefined" && localStorage.getItem("lang")
        ? JSON.parse(localStorage.getItem("lang"))
        : null;

    const getAllTestimonials = async () => {
      if (lang == "en") {
        const { data } = await axios.get(
          `${process.env.URL}/api/get-all-en-testimonials`
        );
        setTestimonials(data.data);
      } else {
        const { data } = await axios.get(
          `${process.env.URL}/api/get-all-de-testimonials`
        );
        setTestimonials(data.data);
      }
    };
    getAllTestimonials();
  }, [popuphn]);
  return (
    <>
      <>
        {/* Inner Banner */}
        <Banner name="Clients" />

        {/* Clients Start */}
        <div className="our_clients">
          <div className="container">
            <div className="title">
              <h3>{t("our_clients-Take")}</h3>
              <h2>{t("our_clients-Our")}</h2>
            </div>
            {testimonials.length == 0 ? (
              <div className="cl-feed">
                <ShimmerPostItem card title cta contentCenter />
                <ShimmerPostItem card title cta contentCenter />
              </div>
            ) : (
              <div className="cl-feed">
                {testimonials.map((items) => {
                  return (
                    <div className="box">
                      <p>{items.review}</p>
                      <h3>_{items.company_name}</h3>
                      <h4>{t("our_clients-Company")}</h4>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* Subscribe Start */}
        <Newsletter />
      </>
    </>
  );
}
