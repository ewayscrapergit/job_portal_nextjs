import axios from "axios";
import { Markup } from "interweave";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ShimmerPostItem } from "react-shimmer-effects";
import UploadCV from "../../components/cv";
import Newsletter from "../../components/newsletter";

export default function Search() {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchJobs, setSearchJobs] = useState([]);
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { id, key } = router.query;
      const getSearchResults = async () => {
        const { data } = await axios.post(
          `${process.env.URL}/api/search-jobs`,
          { id, key }
        );
        setSearchJobs(data.data);
      };
      getSearchResults();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (searchJobs.length == 0) {
      const interval = setInterval(() => {
        setMsg(true);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [searchJobs]);

  // console.log(msg);
  return (
    <>
      {/* Inner Banner */}
      <div className="inn-bann">
        <img src="/images/banner.png" alt="" />
        <div className="desc">
          <div className="container">
            <h1>{t("search-banner")}</h1>
          </div>
        </div>
      </div>

      {/* Listing Page Profile */}
      <div className="job_listing">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {searchJobs.length == 0 ? (
                <>
                  {msg == false ? (
                    <>
                      <ShimmerPostItem card title cta contentCenter />
                      <ShimmerPostItem card title cta contentCenter />
                    </>
                  ) : (
                    <h5>{t("search-msg")}</h5>
                  )}
                </>
              ) : (
                <>
                  {searchJobs.map((items) => {
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
                          <h3>{t("search-Responsibilities")} :</h3>
                          <Markup content={items.responsibilities} />
                        </div>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* UPload CV Start */}
      <UploadCV />

      {/* Subscribe Start */}
      <Newsletter />
    </>
  );
}
