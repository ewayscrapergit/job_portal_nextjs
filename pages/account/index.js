import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import GeneralInfo from "../../components/profile/GeneralInfo";
import axios from "axios";
import fileDownload from "js-file-download";
import JobPreference from "../../components/profile/JobPreference";
import ChangePassword from "../../components/profile/ChangePassword";
import UploadCV from "../../components/cv";
import Newsletter from "../../components/newsletter";
import { useDispatch, useSelector } from "react-redux";
import PopupLayout from "../../components/popup_layout";
import Project from "../../components/profile/Project";
import { popupAction } from "../../redux/actions/popupActions";
import Swal from "sweetalert2";
import Link from "next/link";
import Banner from "../../components/banner";
import { useTranslation } from "react-i18next";

export default function Account() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const [user_details, setUser_details] = useState([]);
  const [user_projects, setUser_projects] = useState([]);
  const [project, setProject] = useState(false);
  const [apply_jobs_status, setApply_jobs_status] = useState([]);
  const [inf_tabHandle, setInf_tabHandle] = useState();
  const [tab_btnHandle, setTab_btnHandle] = useState("");
  const [refresh, setRefresh] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const popuphn = useSelector((state) => state.popuphn);

  useEffect(() => {
    $(".tab_btn").click(function () {
      var inf_tab = $(this).attr("data-id");
      setInf_tabHandle(inf_tab);
      var tab_btn = $(this).parent().find(".tab_btn");
      setTab_btnHandle(tab_btn);
      $(".inf_tab").removeClass("active");
      $(".inf_tab[data-id='" + inf_tab + "']").addClass("active");
      $(".tab_btn").removeClass("active");
      tab_btn.addClass("active");
    });
  }, []);

  // Image Upload Start
  const [file, setFile] = useState();
  const uploadImageClick = () => {
    inputFile.current.click();
  };
  const handleImageUpload = async (e) => {
    setFile(e.target.files[0]);
  };
  // Image Upload End

  // CV Upload Start
  const [cvFile, setCvFile] = useState();
  const handleCvUpload = async (e) => {
    setCvFile(e.target.files[0]);
  };
  // CV Upload End

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

  // Project Delete Start
  const proDelHandler = async (id) => {
    const { data } = await axios.post(
      `${process.env.URL}/api/del-user-project`,
      { id }
    );
    if (data.status == "1") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(popupAction());
    }
  };
  //  Project Delete End

  useEffect(() => {
    const changeProfilePicAndCV = async () => {
      let id = userInfo.id;
      // Apply Jobs Status Start
      const statusRes = await axios.get(
        `${process.env.URL}/api/apply-jobs-status/${id}`
      );
      setApply_jobs_status(statusRes.data.data);
      // Apply Jobs Status End

      // Insert Profile Pic And CV Start
      const formData = new FormData();
      formData.append("upload_pic", file);
      formData.append("upload_cv", cvFile);
      formData.append("user_id", id);
      const picRes = await axios.post(
        `${process.env.URL}/api/user/profile-pic`,
        formData
      );
      if (picRes.data.status == "1") {
        // window.location.reload();
        $(".inf_tab").removeClass("active");
        $(".inf_tab[data-id='" + inf_tabHandle + "']").addClass("active");
        $(".tab_btn").removeClass("active");
        tab_btnHandle.addClass("active");
        setRefresh(true);
      }
      // Insert Profile Pic And CV End
    };
    changeProfilePicAndCV();
  }, [file, cvFile, popuphn]);

  useEffect(() => {
    const getUserData = async () => {
      // Get User Details Start
      let id = userInfo.id;
      const { data } = await axios.get(
        `${process.env.URL}/api/users-details/${id}`
      );
      setUser_details(data.data);
      setUser_projects(data.projects);
      // Get User Details End
    };
    getUserData();
    setRefresh(false);
  }, [refresh, popuphn]);

  useEffect(() => {
    setProject(false);
  }, [popuphn]);

  return (
    <>
      {/* Inner Banner */}
      <Banner name="Account" />

      {/* Update Profile */}
      <div className="up-profile">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-12">
                <div className="pp-block">
                  <h2>{t("account-title")}</h2>
                  <ul className="tab_menu">
                    <li>
                      <a data-id="tab-1" className="tab_btn active">
                        {t("account-General")}
                      </a>
                    </li>
                    <li>
                      <a data-id="tab-2" className="tab_btn">
                        {t("account-Profile")}
                      </a>
                    </li>
                    <li>
                      <a data-id="tab-4" className="tab_btn">
                        {t("account-CV")}
                      </a>
                    </li>
                    <li>
                      <a data-id="tab-5" className="tab_btn">
                        {t("account-Projects")} ({user_projects.length})
                      </a>
                    </li>
                    <li>
                      <a data-id="tab-6" className="tab_btn">
                        {t("account-Job")}
                      </a>
                    </li>
                    <li>
                      <a data-id="tab-7" className="tab_btn">
                        {t("account-Password")}
                      </a>
                    </li>
                    <li>
                      <a data-id="tab-8" className="tab_btn">
                        {t("account-Apply-Status")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-12">
                <div className="inf_tab active" data-id="tab-1">
                  <GeneralInfo />
                </div>
                <div className="inf_tab" data-id="tab-2">
                  <h2>{t("account-Update")}</h2>
                  <div className="pro-img">
                    <img src={user_details.profile_img} alt="" />
                    <input
                      style={{ display: "none" }}
                      accept=".jpg,.png,.jpeg"
                      ref={inputFile}
                      type="file"
                      onChange={handleImageUpload}
                    />

                    <button onClick={uploadImageClick}>
                      <i className="fa fa-camera" />
                    </button>
                  </div>
                </div>
                <div className="inf_tab" data-id="tab-4">
                  <h2>{t("account-Upload")}</h2>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <input
                        type="file"
                        className="form-control"
                        accept=".pdf,.docx,.doc"
                        onChange={handleCvUpload}
                      />
                    </div>
                  </div>
                  {user_details.cv !== "" ? (
                    <button
                      type="button"
                      className="download-cv-btn"
                      onClick={() =>
                        handleDownload(
                          `${process.env.URL}/admin-property/uploads/users_cv/${user_details.cv}`,
                          `${user_details.cv}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {t("account-Download")}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="inf_tab" data-id="tab-5">
                  <h2>{t("account-My")}</h2>
                  <div className="add_btn">
                    <button onClick={() => setProject(true)}>
                      {t("account-Add-New-Project")}
                    </button>
                  </div>

                  <div class="project-listing">
                    <h2>{t("account-list")}</h2>
                    <div class="inners">
                      {user_projects.length == 0 ? (
                        <h6>{t("account-project-msg")}</h6>
                      ) : (
                        <>
                          {user_projects?.map((items) => {
                            return (
                              <div class="box" key={items.id}>
                                <img src={items.screenshots} alt="" />
                                <h2>{items.title}</h2>
                                <h6>{items.used_technology}</h6>
                                <p>{items.description}</p>
                                <a
                                  href={items.url}
                                  target="_blank"
                                  className="view-btn"
                                >
                                  {t("account-view-project")}
                                </a>
                                <div className="del-wrap">
                                  <a
                                    className="del-btn"
                                    onClick={() => proDelHandler(items.id)}
                                  >
                                    <i
                                      class="fa fa-trash"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="inf_tab" data-id="tab-6">
                  <JobPreference details={user_details} />
                </div>
                <div className="inf_tab" data-id="tab-7">
                  <ChangePassword />
                </div>
                <div className="inf_tab" data-id="tab-8">
                  <h2>{t("account-apply-job")}</h2>
                  <div class="apply-jobs-listing">
                    <div class="inners">
                      {apply_jobs_status.length == 0 ? (
                        <h6>{t("account-job-msg")}</h6>
                      ) : (
                        <>
                          {apply_jobs_status?.map((items) => {
                            // console.log(items);
                            return (
                              <Link href={`/jobs/${items.id}`} key={items.id}>
                                <div class="box" style={{ cursor: "pointer" }}>
                                  <img
                                    src={`${process.env.URL}/admin-property/uploads/images/job_logo/${items.company_logo}`}
                                    alt=""
                                  />
                                  <h2>{items.title}</h2>
                                  <p>{items.job_role}</p>
                                  <h3>{items.employment_type}</h3>
                                  <h4>
                                    {t("account-Status")}:{" "}
                                    <span>
                                      {items.apply_status == ""
                                        ? "NA"
                                        : items.apply_status}
                                    </span>
                                  </h4>
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
            </div>
          </div>
        </div>
      </div>

      {/* UPload CV Start */}
      <UploadCV />

      {/* Subscribe Start */}
      <Newsletter />

      {/* Create Login Popup */}
      <PopupLayout trigger={project} setTrigger={setProject}>
        <Project />
      </PopupLayout>
    </>
  );
}
