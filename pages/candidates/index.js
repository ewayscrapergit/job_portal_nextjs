import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Banner from "../../components/banner";
import fileDownload from "js-file-download";
import ReactPaginate from "react-paginate";
import Newsletter from "../../components/newsletter";
import { useTranslation } from "react-i18next";

export default function Candidates() {
  const { t } = useTranslation();

  const [searchSpecialistKey, setSearchSpecialistKey] = useState("");
  const [searchHandler, setSearchHandler] = useState(false);
  const [searchSpecialistUsers, setSearchSpecialistUsers] = useState([]);

  // CV Download Start
  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  // CV Download End

  const searchHandlerBtn = (e) => {
    e.preventDefault();
    setSearchHandler(true);
  };

  // Pagination Start
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 30;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(searchSpecialistUsers.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayUsers = searchSpecialistUsers
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((items, inx) => {
      if (items.cv !== "" && items.technology !== null)
        return (
          <div className="box" key={inx}>
            <div className="top">
              <div className="img">
                <img src={items.profile_img} alt="" />
              </div>
              <div className="text">
                <h2>{items.full_name}</h2>
                <h3>{items.specialist}</h3>
                <h4>
                  {items.designation}{" "}
                  <span>
                    {items.interest_in == '["full_time_job"]'
                      ? "Full Time"
                      : items.interest_in == '["part_time_job"]'
                      ? "Part Time"
                      : "Full Time & Part Time"}
                  </span>
                </h4>
              </div>
            </div>
            <div className="mid">
              <p>{items.technology.split(",").join("/")}</p>
            </div>
            <div className="resume-btn">
              <a
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleDownload(
                    `${process.env.URL}/admin-property/uploads/users_cv/${items.cv}`,
                    `${items.cv}`
                  )
                }
              >
                {t("candidates-Resume")}
              </a>
            </div>
          </div>
        );
    });
  // Pagination End

  useEffect(() => {
    const searchSpecialistUsers = async () => {
      const { data } = await axios.post(
        `${process.env.URL}/api/search-specialist_users`,
        { searchSpecialistKey }
      );
      setSearchSpecialistUsers(data.data);
      setSearchHandler(false);
    };
    searchSpecialistUsers();
  }, [searchHandler]);

  return (
    <>
      <>
        {/* Inner Banner */}
        <Banner name="Candidates" />

        <div className="find-cand">
          <div className="container">
            <div className="search-bar">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12">
                  <h3>
                    {t("candidates-Search")}{" "}
                    <span>{t("candidates-Candidates")}</span>
                  </h3>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-12">
                  <form>
                    <input
                      type="text"
                      name=""
                      placeholder={t("candidates-placeholder")}
                      className="field"
                      onChange={(e) => setSearchSpecialistKey(e.target.value)}
                    />
                    <button onClick={(e) => searchHandlerBtn(e)}>
                      {searchHandler == true ? (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      ) : (
                        ""
                      )}{" "}
                      {t("candidates-btn")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="candi-list">
              {/* <h2>Candidates</h2> */}
              {searchSpecialistUsers.length == 0 ? (
                <div className="inn">
                  <h5>{t("candidates-msg")}</h5>
                </div>
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
    </>
  );
}
