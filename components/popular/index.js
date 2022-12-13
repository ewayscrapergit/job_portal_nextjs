import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function PopularJobs() {
  const { t } = useTranslation();
  const [popular, setPopular] = useState([]);

  const popuphn = useSelector((state) => state.popuphn);

  useEffect(() => {
    const lang =
      typeof window !== "undefined" && localStorage.getItem("lang")
        ? JSON.parse(localStorage.getItem("lang"))
        : null;

    const getPopular = async () => {
      if (lang == "en") {
        const { data } = await axios.get(
          `${process.env.URL}/api/all-en-popular-jobs`
        );
        setPopular(data.data);
      } else {
        const { data } = await axios.get(
          `${process.env.URL}/api/all-de-popular-jobs`
        );
        setPopular(data.data);
      }
    };
    getPopular();
  }, [popuphn]);

  return (
    <>
      <div className="hired">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="title">
                <h2>
                  {t("popular-Get-hired")}{" "}
                  <span>{t("popular-the-popular")}</span>
                </h2>
                <p>{t("popular-Lorem-ipsum")}</p>
              </div>
              <div className="text-block">
                <div className="row g-4">
                  {popular
                    .map((item) => {
                      return (
                        <Link href={`/jobs/${item.id}`} key={item.id}>
                          <div
                            className="col-lg-6 col-md-6 col-sm-12"
                            key={item.id}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="box">
                              <div className="top-pnl">
                                <h2>{item.job_role}</h2>
                                <h3>{item.title}</h3>
                                <h4>{item.location}</h4>
                                <h5>{item.employment_type}</h5>
                              </div>
                              <div className="btm-pnl">
                                <h2>
                                  {item.days == 0
                                    ? "Today"
                                    : `${item.days} days ago`}
                                </h2>
                                <div className="comp">
                                  <div className="lt">
                                    <h4>{item.company_name}</h4>
                                  </div>
                                  <div className="rt">
                                    <img
                                      src={`${process.env.URL}/admin-property/uploads/images/job_logo/${item.company_logo}`}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                    .slice(0, 2)}
                </div>
                <div className="all-btn">
                  <Link href="/jobs">
                    <a>{t("popular-All-Offers")}</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="img-block">
                <img src="/images/hired-img.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
