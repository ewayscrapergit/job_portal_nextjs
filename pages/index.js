import axios from "axios";
import React, { useEffect, useState } from "react";
import UploadCV from "../components/cv";
import FeaturedJobs from "../components/featured";
import Newsletter from "../components/newsletter";
import PopularJobs from "../components/popular";
import Technology from "../components/technology";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const [all_jobs, setAll_jobs] = useState("");
  const [all_companies, setAll_companies] = useState("");
  const [countries, setCountries] = useState([]);

  const [searchSelect, setSearchSelect] = useState("all");
  const [searchText, setSearchText] = useState("");

  const searchHandler = () => {
    if (searchText !== "") {
      router.push(`/search/${searchSelect}?key=${searchText}`);
    }
  };

  useEffect(() => {
    const getAllTestimonials = async () => {
      const { data } = await axios.get(
        `${process.env.URL}/api/get-all-en-testimonials`
      );
      setAll_companies(data.all_companies);
      setAll_jobs(data.all_jobs);
    };
    getAllTestimonials();
    const getAllCountries = async () => {
      const { data } = await axios.get(
        `${process.env.URL}/api/get-all-countries`
      );
      setCountries(data.data);
    };
    getAllCountries();
  }, []);

  return (
    <>
      {/* Banner Start */}
      <div className="banner">
        <img src="/images/banner.jpg" alt="" />
        <div className="desc">
          <div className="container">
            <div className="text-pnl">
              <h3>{t("banner-Its")}</h3>
              <h1> {t("banner-Search")} </h1>
              <h2> {t("banner-Discover")} </h2>
              <ul>
                <li>
                  <img src="/images/ban-icn1.png" alt="" /> {all_jobs}{" "}
                  {t("banner-Jobs")}
                </li>
                <li>
                  <img src="/images/ban-icn2.png" alt="" /> 500+{" "}
                  {t("banner-Companies")}
                </li>
              </ul>
              <h4>
                <span>{all_jobs}</span> {t("banner-jobs-listed")}
              </h4>
              <div className="search_wrap">
                <div className="row g-3">
                  <div className="col-lg-4 col-sm-12">
                    <div className="block">
                      <input
                        type="text"
                        placeholder={t("banner-placeholder")}
                        className="form-control"
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-12">
                    <div className="block">
                      <select
                        className="form-control"
                        onChange={(e) => setSearchSelect(e.target.value)}
                      >
                        <option value="all">{t("banner-option")}</option>
                        {countries.map((items, index) => {
                          return (
                            <>
                              <option value={items.country} key={index}>
                                {items.country}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-12">
                    <div className="send_btn">
                      <button
                        type="submit"
                        value="send"
                        onClick={() => searchHandler()}
                      >
                        {t("banner-btn")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Start */}
      <Technology />

      {/* Hired Start */}
      <PopularJobs />

      {/* Why Us Start */}
      <div className="why-us">
        <div className="container">
          <div className="title">
            <h2>{t("why-us-why-people")}</h2>
            <p>{t("why-us-Praesent")}</p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-4 col-xs-12">
              <div className="box">
                <h3>01</h3>
                <h2>{t("why-us-Job")}</h2>
                <p>{t("why-us-Aenean")}</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-4 col-xs-12">
              <div className="box">
                <h3>02</h3>
                <h2>{t("why-us-Company")}</h2>
                <p>{t("why-us-Aenean-ultricies")}</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-4 col-xs-12">
              <div className="box">
                <h3>03</h3>
                <h2>{t("why-us-Career")}</h2>
                <p>{t("why-us-Aenean-ultricies-ut")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Job Start */}
      <FeaturedJobs />

      {/* Reasons Choose Start */}
      <div className="reasons-ch">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="img-block">
                <img src="/images/reasong-img.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="text-block">
                <h3>{t("Reasons-Services")}</h3>
                <h2>
                  {t("Reasons-More")} <span>{t("Reasons-round")}</span>{" "}
                  {t("Reasons-choose")}
                </h2>
                <p>{t("Reasons-Praesent")}</p>
                <ul>
                  <li>{t("Reasons-World")}</li>
                  <li>{t("Reasons-Trusted")}</li>
                  <li>{t("Reasons-Expert")}</li>
                  <li>{t("Reasons-Fast")}</li>
                </ul>
                <Link href="/jobs">
                  <a>
                    <i className="fa-solid fa-magnifying-glass" />{" "}
                    {t("Reasons-btn")}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Start */}
      {/* <Clients /> */}

      {/* Reviews Start */}
      {/* <div className="reviews">
        <div className="container">
          <h2>
            <span>Reviews</span> of people who have <br /> found jobs through
            JobPortal
          </h2>
          <div className="review_slider">
            <Slider {...settings}>
              {testimonials.map((items) => {
                return (
                  <div className="item" key={items.id}>
                    <p>{items.description}</p>
                    <h3>{items.name}</h3>
                    <h4>{items.designation}</h4>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div> */}

      {/* UPload CV Start */}
      <UploadCV />

      {/* Newsletter Start */}
      <Newsletter />
    </>
  );
}
