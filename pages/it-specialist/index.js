import React, { useEffect, useState } from "react";
import Banner from "../../components/banner";
import Newsletter from "../../components/newsletter";
import { ShimmerPostItem, ShimmerSectionHeader } from "react-shimmer-effects";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

export default function ItSpecialist() {
  const { t } = useTranslation();

  const [allSpecialist, setAllSpecialist] = useState([]);
  const [specialistKey, setSpecialistKey] = useState("All");
  const [specialistUsers, setSpecialistUsers] = useState([]);
  const [msg, setMsg] = useState(false);

  // Pagination Start
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 30;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(specialistUsers.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayUsers = specialistUsers
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((items) => {
      if (items.technology !== null)
        return (
          <div className="box">
            <div className="top">
              <div className="img">
                <img src={items.profile_img} alt="" />
              </div>
              <div className="text">
                <h2>{items.full_name}</h2>
                <h3>{items.specialist}</h3>
                <h4>
                  {items.designation} <span>Full-Time</span>
                </h4>
              </div>
            </div>
            <div className="mid">
              <p>{items.technology.split(",").join("/")}</p>
            </div>
          </div>
        );
    });
  // Pagination End

  useEffect(() => {
    const getSpecialist = async () => {
      const { data } = await axios.get(
        `${process.env.URL}/api/all-specialist_category`
      );
      setAllSpecialist(data.data);
      // console.log(data.data);

      const res = await axios.post(
        `${process.env.URL}/api/all-specialist_users`,
        { specialistKey }
      );
      setSpecialistUsers(res.data.data);
    };
    getSpecialist();
  }, [specialistKey]);

  useEffect(() => {
    if (specialistUsers.length == 0) {
      const interval = setInterval(() => {
        setMsg(true);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [specialistUsers]);

  return (
    <>
      {/* Inner Banner */}
      <Banner name="Specialist" />

      <div className="it-service-wrp">
        <div className="container">
          <h2>{t("it-specialist-title")}</h2>
          {allSpecialist.length == 0 ? (
            <ShimmerSectionHeader />
          ) : (
            <ul>
              <li>
                <a onClick={() => setSpecialistKey("All")}>
                  {t("it-specialist-All")}
                </a>
              </li>
              {allSpecialist.map((specialist) => {
                return (
                  <li>
                    <a onClick={() => setSpecialistKey(specialist.name)}>
                      {specialist.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="it-spe">
        <div className="container">
          <div className="candi-list">
            <h2>
              {t("it-specialist-View")} : {specialistKey}
            </h2>
            {specialistUsers.length == 0 ? (
              <>
                {msg == false ? (
                  <>
                    <div className="inn">
                      <ShimmerPostItem card title cta contentCenter />
                      <ShimmerPostItem card title cta contentCenter />
                      <ShimmerPostItem card title cta contentCenter />
                    </div>
                  </>
                ) : (
                  <div className="inn">
                    <h5>{"it-specialist-Msg"}</h5>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="inn">{displayUsers}</div>
                {displayUsers.length >= 30 ? (
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Subscribe Start */}
      <Newsletter />
    </>
  );
}
