import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";
import PopupLayout from "../popup_layout";
import Login from "../login";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function FeaturedJobs() {
  const { t } = useTranslation();
  const router = useRouter();
  const [featured, setFeatured] = useState([]);

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

  const popuphn = useSelector((state) => state.popuphn);

  useEffect(() => {
    const lang =
      typeof window !== "undefined" && localStorage.getItem("lang")
        ? JSON.parse(localStorage.getItem("lang"))
        : null;

    const getFeatured = async () => {
      if (lang == "en") {
        const { data } = await axios.get(
          `${process.env.URL}/api/all-en-featured-jobs`
        );
        setFeatured(data.data);
      } else {
        const { data } = await axios.get(
          `${process.env.URL}/api/all-de-featured-jobs`
        );
        setFeatured(data.data);
      }
    };
    getFeatured();
  }, [popuphn]);
  // console.log(featured);
  return (
    <>
      <div className="featured-job">
        <div className="container">
          <div className="title">
            <h2>{t("featured-job-Featured")}</h2>
          </div>
          <div className="inner">
            {featured
              .map((items) => {
                return (
                  <div
                    className="box"
                    key={items.id}
                    style={{ cursor: "pointer" }}
                  >
                    <Link href={`/jobs/${items.id}`}>
                      <div className="top">
                        <img
                          src={`${process.env.URL}/admin-property/uploads/images/job_logo/${items.company_logo}`}
                          alt=""
                        />
                        <h2>{items.title}</h2>
                        <p>{items.job_role}</p>
                        <h3>{items.employment_type}</h3>
                      </div>
                    </Link>
                    <div className="btm">
                      <div className="lt">
                        <h2>
                          {items.days == 0 ? "Today" : `${items.days} days ago`}
                        </h2>
                        <h3>₹{items.salary}</h3>
                      </div>
                      <div className="rt">
                        <a onClick={() => applyJobHandler(items.id)}>
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
              .slice(0, 6)}
          </div>
          <div className="find-btn">
            <Link href="/jobs">
              <a>{t("featured-job-btn")}</a>
            </Link>
          </div>
        </div>
      </div>
      {/* Create Login Popup */}
      <PopupLayout trigger={login} setTrigger={setLogin}>
        <Login />
      </PopupLayout>
    </>
  );
}
