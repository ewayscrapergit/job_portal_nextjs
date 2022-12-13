import React, { useEffect, useState } from "react";
import UploadCV from "../../components/cv";
import Newsletter from "../../components/newsletter";
import { useRouter } from "next/router";
import axios from "axios";
import { Markup } from "interweave";
import { ShimmerPostDetails } from "react-shimmer-effects";
import { useSelector } from "react-redux";
import PopupLayout from "../../components/popup_layout";
import Login from "../../components/login";
import Swal from "sweetalert2";
import Banner from "../../components/banner";
import { useTranslation } from "react-i18next";

export default function JobDetails() {
  const { t } = useTranslation();
  const router = useRouter();
  const [singleJob, setSingleJob] = useState([]);
  const [key_skills, setkey_Skills] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, popup } = userLogin;

  const [login, setLogin] = useState(false);

  const applyJobHandler = async (id) => {
    if (userInfo) {
      // let id = userInfo.id;
      const { data } = await axios.get(
        `${process.env.URL}/api/users-details/${userInfo.id}`
      );
      if (data.data.cv !== "") {
        const { data } = await axios.post(`${process.env.URL}/api/apply-jobs`, {
          job_id: id,
          user_id: userInfo.id,
        });
        // console.log(data);
        if (data.status == 1) {
          Swal.fire({
            title: data.msg,
          });
        } else {
          Swal.fire({
            title: data.msg,
          });
        }
      } else {
        Swal.fire({
          title: "Please upload your CV.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/account");
          }
        });
      }
    } else {
      setLogin(true);
    }
  };

  useEffect(() => {
    setLogin(false);
  }, [popup]);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;

      const lang =
        typeof window !== "undefined" && localStorage.getItem("lang")
          ? JSON.parse(localStorage.getItem("lang"))
          : null;

      const getSingleJob = async () => {
        if (lang == "en") {
          const { data } = await axios.get(
            `${process.env.URL}/api/en-job/${id}`
          );
          // console.log(data.data);
          setSingleJob(data.data);
          const skills_arr = data.data.key_skills.split(",");
          setkey_Skills(skills_arr);
          const technologies_arr = data.data.role_technology.split(",");
          setTechnologies(technologies_arr);
        } else {
          const { data } = await axios.get(
            `${process.env.URL}/api/de-job/${id}`
          );
          // console.log(data.data);
          setSingleJob(data.data);
          const skills_arr = data.data.key_skills.split(",");
          setkey_Skills(skills_arr);
          const technologies_arr = data.data.role_technology.split(",");
          setTechnologies(technologies_arr);
        }
      };
      getSingleJob();
    }
  }, [router.isReady]);

  // console.log("wdfdsw", singleJob.length);

  return (
    <>
      <Banner name="Jobs" />

      {/* Listing Page Profile */}
      <div className="job_details">
        <div className="container">
          {singleJob.length == 0 ? (
            <div className="box">
              <ShimmerPostDetails card cta variant="SIMPLE" />
            </div>
          ) : (
            <div className="box">
              <h2>{singleJob.title}</h2>
              <ul className="basic">
                <li>
                  <i className="fa-solid fa-briefcase" />{" "}
                  <span>{singleJob.experience}</span>
                </li>
                <li>
                  <i className="fa-solid fa-indian-rupee-sign" />{" "}
                  <span>{singleJob.salary}</span>
                </li>
                <li>
                  <i className="fa-solid fa-location-dot" />{" "}
                  <span>{singleJob.location}</span>
                </li>
              </ul>
              <span className="post_date">
                {t("job-details-Posted")}:{" "}
                {singleJob.days == 0
                  ? t("job-details-Today")
                  : `${singleJob.days} ${t("job-details-days")}`}
              </span>
              <h4>{t("job-details-Job-Description")} : </h4>
              <Markup content={singleJob.description} />
              <br />
              <h5>{t("job-details-Key")} :</h5>
              <ul>
                {key_skills.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
              <h5>{t("job-details-Technology")} :</h5>
              <ul>
                {technologies.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h5>{t("job-details-Minimum")} :</h5>
              <Markup content={singleJob.minimum_qualifications} />
              <h5>{t("job-details-Preferred")} :</h5>
              <Markup content={singleJob.preferred_qualifications} />
              <h5>{t("job-details-Responsibilities")}</h5>
              <Markup content={singleJob.responsibilities} />
              <div class="emp_role">
                <h6>
                  <span>{t("job-details-Job-Role")} :</span>{" "}
                  {singleJob.job_role}
                </h6>
                <h6>
                  <span>{t("job-details-Industry")} :</span>{" "}
                  {singleJob.industry}
                </h6>
                <h6>
                  <span>{t("job-details-Functional")} :</span>{" "}
                  {singleJob.functional_area}
                </h6>
                <h6>
                  <span>{t("job-details-Employment")} :</span>{" "}
                  {singleJob.employment_type}
                </h6>
                <h6>
                  <span>{t("job-details-Education")} :</span>{" "}
                  {singleJob.education}
                </h6>
              </div>
              <div className="apply-btn">
                <button onClick={() => applyJobHandler(singleJob.id)}>
                  {t("job-details-btn")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* UPload CV Start */}
      <UploadCV />

      {/* Subscribe Start */}
      <Newsletter />

      {/* Create Login Popup */}
      <PopupLayout trigger={login} setTrigger={setLogin}>
        <Login />
      </PopupLayout>
    </>
  );
}
