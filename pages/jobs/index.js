import axios from "axios";
import React, { useEffect, useState } from "react";
import UploadCV from "../../components/cv";
import Newsletter from "../../components/newsletter";
import { Markup } from "interweave";
import Link from "next/link";
import { ShimmerPostItem } from "react-shimmer-effects";
import PopupLayout from "../../components/popup_layout";
import Register from "../../components/register";
import { useSelector } from "react-redux";
import Banner from "../../components/banner";
import { useTranslation } from "react-i18next";

export default function JobLists() {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);
  const [register, setRegister] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, popup } = userLogin;

  const popuphn = useSelector((state) => state.popuphn);

  useEffect(() => {
    setRegister(false);
  }, [popup, popuphn]);

  useEffect(() => {
    const lang =
      typeof window !== "undefined" && localStorage.getItem("lang")
        ? JSON.parse(localStorage.getItem("lang"))
        : null;

    const getJobs = async () => {
      if (lang == "en") {
        const { data } = await axios.get(`${process.env.URL}/api/all-en-jobs`);
        setJobs(data.data);
      } else {
        const { data } = await axios.get(`${process.env.URL}/api/all-de-jobs`);
        setJobs(data.data);
      }
    };
    getJobs();
  }, [popuphn]);

  return (
    <>
      {/* Inner Banner */}
      <Banner name="Jobs" />

      {/* Listing Page Profile */}
      <div className="job_listing">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-12">
              {jobs.length == 0 ? (
                <>
                  <ShimmerPostItem card title cta contentCenter />
                  <ShimmerPostItem card title cta contentCenter />
                </>
              ) : (
                <>
                  {jobs.map((items) => {
                    return (
                      <Link href={`/jobs/${items.id}`} key={items.id}>
                        <div className="box" style={{ cursor: "pointer" }}>
                          <span className="save">
                            <i className="fa-solid fa-bookmark" />
                          </span>
                          <h2>{items.title}</h2>
                          <h3>{items.job_role}</h3>
                          <ul className="basic">
                            <li>
                              <i className="fa-solid fa-briefcase" />{" "}
                              <span>{items.experience}</span>
                            </li>
                            <li>
                              <i className="fa-solid fa-indian-rupee-sign" />{" "}
                              <span>{items.salary}</span>
                            </li>
                            <li>
                              <i className="fa-solid fa-location-dot" />{" "}
                              <span>{items.location}</span>
                            </li>
                          </ul>
                          <h4 className="jobtags">{items.key_skills}</h4>
                          <h3>{t("job-Responsibilities")} :</h3>
                          <Markup content={items.responsibilities} />
                        </div>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
            {userInfo ? (
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="love_jobs">
                  <div className="text">
                    <h2>{t("job-Love")}</h2>
                    <p>{t("job-Register")}</p>
                    <Link href="/account">{t("job-Account")}</Link>
                  </div>
                  <div className="img">
                    <img src="/images/jobs-img.png" alt="" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="love_jobs">
                  <div className="text">
                    <h2>{t("job-Love")}</h2>
                    <p>
                      <p>{t("job-Register")}</p>
                    </p>
                    <button onClick={() => setRegister(true)}>
                      {t("job-btn")}
                    </button>
                  </div>
                  <div className="img">
                    <img src="/images/jobs-img.png" alt="" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* UPload CV Start */}
      <UploadCV />

      {/* Subscribe Start */}
      <Newsletter />

      {/* Create Register Popup */}
      <PopupLayout trigger={register} setTrigger={setRegister}>
        <Register />
      </PopupLayout>
    </>
  );
}
