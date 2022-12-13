import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function GeneralInfo() {
  const { t } = useTranslation();

  const [successMsg, setSuccessMsg] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // console.log(userInfo.id);

  const initilValue = {
    full_name: "",
    phone: "",
    checkboxOption: [],
    designation: "",
    specialist: "",
    alternate_phone: "",
    state: "",
    city: "",
    local_area: "",
    pin_code: "",
    fresher: false,
    experience_years: "",
    experience_months: "",
    current_company_name: "",
    current_monthly_salary: "",
    desired_monthly_salary: "",
    basicORgraduation: "",
    post_graduation: "",
    diploma_name: "",
    work_domain: "",
    gender: "",
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required(t("input-fullname")),
    checkboxOption: Yup.array().test({
      name: "categories_test",
      exclusive: true,
      message: t("input-checkbox"),
      test: (value) => value.length > 0,
    }),
    designation: Yup.string().required(t("input-Designation")),
    specialist: Yup.string().required(t("input-specialist")),
    phone: Yup.string()
      .min(5, t("input-minimum"))
      .matches(/^[0-9]*$/, t("input-only"))
      .required(t("input-phone")),
    alternate_phone: Yup.string()
      .min(5, t("input-minimum"))
      .matches(/^[0-9]*$/, t("input-only")),
    state: Yup.string().required(t("input-state")),
    city: Yup.string().required(t("input-city")),
    local_area: Yup.string().required(t("input-local-area")),
    pin_code: Yup.string().required(t("input-pin-code")),
    current_company_name: Yup.string().required(t("input-curr-company")),
    current_monthly_salary: Yup.string().required(t("input-curr-salary")),
    desired_monthly_salary: Yup.string().required(t("input-Desired-salary")),
    // basicORgraduation: Yup.string().required("Please select basic/graduation"),
    // post_graduation: Yup.string().required("Please select post graduation"),
    diploma_name: Yup.string().required(t("input-diploma")),
    work_domain: Yup.string().required(t("input-work-domain")),
    gender: Yup.string().required(t("input-gender")),
  });

  async function OnSubmit(values) {
    // dispatch(login(values));
    // console.log(values);
    // console.log(selectedDate);
    const insertGeneralInfo = await axios.post(
      `${process.env.URL}/api/create-general-information`,
      {
        user_id: userInfo.id,
        dob: selectedDate,
        technology: tagData,
        values,
      }
    );
    setSuccessMsg(insertGeneralInfo.data.msg);
    // console.log(insertGeneralInfo.data);
  }

  const [experienceHandle, setExperienceHandle] = useState(false);
  const fresherCheckHandler = (e) => {
    const checked = e.target.checked;
    if (checked) {
      //  alert("checked")
      setExperienceHandle(true);
    } else {
      // alert("not");
      setExperienceHandle(false);
    }
  };

  const [saveData, setSaveData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allSpecialist, setAllSpecialist] = useState([]);

  // sefwgwr
  const [tagData, setTagData] = useState([]);

  const removeTagData = (indexToRemove) => {
    setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);
  };
  const addTagData = (event) => {
    if (event.target.value !== "") {
      setTagData([...tagData, event.target.value]);
      event.target.value = "";
    }
  };
  // efewgerg

  // console.log(tagData);

  const getUserDetails = async () => {
    let id = userInfo.id;
    const { data } = await axios.get(
      `${process.env.URL}/api/users-details/${id}`
    );
    // console.log(data.data);

    const saveValues = {
      full_name: data.data.full_name,
      checkboxOption: JSON.parse(data.data.interest_in),
      phone: data.data.phone,
      alternate_phone: data.data.alternate_phone,
      state: data.data.state,
      city: data.data.city,
      local_area: data.data.local_area,
      pin_code: data.data.pin_code,
      fresher: data.data.fresher == "true" ? true : false,
      experience_years: data.data.experience_years,
      experience_months: data.data.experience_months,
      current_company_name: data.data.current_company_name,
      current_monthly_salary: data.data.current_monthly_salary,
      desired_monthly_salary: data.data.desired_monthly_salary,
      basicORgraduation: data.data.basicORgraduation,
      post_graduation: data.data.post_graduation,
      diploma_name: data.data.diploma_name,
      work_domain: data.data.work_domain,
      gender: data.data.gender,
      designation: data.data.designation,
      specialist: data.data.specialist,
    };
    if (data.data.fresher == "true") setExperienceHandle(true);
    setSelectedDate(
      data.data.dob !== "" ? new Date(data.data.dob) : new Date()
    );
    if (data.data.technology !== null) {
      setTagData(data.data.technology.split(","));
    }
    setSaveData(saveValues);
  };

  const getSpecialist = async () => {
    const { data } = await axios.get(
      `${process.env.URL}/api/all-specialist_category`
    );
    setAllSpecialist(data.data);
  };

  const popuphn = useSelector((state) => state.popuphn);

  useEffect(() => {
    getUserDetails();
    getSpecialist();
  }, [popuphn]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSuccessMsg("");
    }, 3000);
    return () => clearInterval(interval);
  }, [successMsg]);

  return (
    <Formik
      initialValues={saveData || initilValue}
      validationSchema={validationSchema}
      onSubmit={OnSubmit}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting }) => (
        <>
          <h2>{t("account-gen-title")}</h2>
          <Form>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-fullname")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.full_name && touched.full_name
                        ? " is-invalid"
                        : "")
                    }
                    name="full_name"
                  />
                  <ErrorMessage
                    name="full_name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Interest")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <span className="check-box-span">
                    <Field
                      type="checkbox"
                      className={
                        "form-check-input " +
                        (errors.checkboxOption && touched.checkboxOption
                          ? " is-invalid"
                          : "")
                      }
                      value="full_time_job"
                      name="checkboxOption"
                    />
                    <label htmlFor="privacy">
                      {t("account-gen-full-time")}
                    </label>
                  </span>

                  <span className="check-box-span">
                    <Field
                      type="checkbox"
                      className={
                        "form-check-input " +
                        (errors.checkboxOption && touched.checkboxOption
                          ? " is-invalid"
                          : "")
                      }
                      value="part_time_job"
                      name="checkboxOption"
                    />
                    <label htmlFor="privacy">
                      {t("account-gen-part-time")}
                    </label>
                    <ErrorMessage
                      name="checkboxOption"
                      component="div"
                      className="invalid-feedback"
                    />
                  </span>
                  <ErrorMessage
                    name="checkboxOption"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>

            {/*  */}
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Designation")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.designation && touched.designation
                        ? " is-invalid"
                        : "")
                    }
                    name="designation"
                  />
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Specialist")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    as="select"
                    className={
                      "form-control" +
                      (errors.specialist && touched.specialist
                        ? " is-invalid"
                        : "")
                    }
                    name="specialist"
                  >
                    <option value="">Select</option>
                    {allSpecialist.map((item) => {
                      return <option value={item.name}>{item.name}</option>;
                    })}
                  </Field>
                  <ErrorMessage
                    name="specialist"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Technology")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <div className="tag-input">
                    <ul className="tags">
                      {tagData.map((tag, index) => (
                        <li key={index} className="tag">
                          <span className="tag-title">{tag}</span>
                          <span
                            className="tag-close-icon"
                            onClick={() => removeTagData(index)}
                          >
                            x
                          </span>
                        </li>
                      ))}
                    </ul>
                    <input
                      type="text"
                      onKeyUp={(event) =>
                        event.key === "Enter" ? addTagData(event) : null
                      }
                      placeholder={t("account-gen-tag-placeholder")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-number")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.phone && touched.phone ? " is-invalid" : "")
                    }
                    name="phone"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Alternate")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.alternate_phone && touched.alternate_phone
                        ? " is-invalid"
                        : "")
                    }
                    name="alternate_phone"
                  />
                  <ErrorMessage
                    name="alternate_phone"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-State")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    as="select"
                    className={
                      "form-control" +
                      (errors.state && touched.state ? " is-invalid" : "")
                    }
                    name="state"
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Orissa">Orissa</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli">
                      Dadra and Nagar Haveli
                    </option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Puducherry">Puducherry</option>
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-City")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.city && touched.city ? " is-invalid" : "")
                    }
                    name="city"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Local-Area")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.local_area && touched.local_area
                        ? " is-invalid"
                        : "")
                    }
                    name="local_area"
                  />
                  <ErrorMessage
                    name="local_area"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-PIN-Code")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.pin_code && touched.pin_code ? " is-invalid" : "")
                    }
                    name="pin_code"
                  />
                  <ErrorMessage
                    name="pin_code"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Fresher")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <label className="check-box-span">
                    <Field
                      type="checkbox"
                      className={
                        "form-check-input " +
                        (errors.fresher && touched.fresher ? " is-invalid" : "")
                      }
                      id="fresher_checkbox"
                      name="fresher"
                      onClick={(e) => fresherCheckHandler(e)}
                    />
                    Yes
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Experience")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <Field
                        as="select"
                        className={
                          "form-control" +
                          (errors.experience_years && touched.experience_years
                            ? " is-invalid"
                            : "")
                        }
                        name="experience_years"
                        disabled={experienceHandle}
                        style={
                          experienceHandle == true
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      >
                        <option value="">Select Year(s)</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="3">3 Years</option>
                        <option value="4">4 Years</option>
                        <option value="5">5 Years</option>
                        <option value="6">6 Years</option>
                        <option value="7">7 Years</option>
                        <option value="8">8 Years</option>
                        <option value="9">9 Years</option>
                        <option value="10">10 Years</option>
                        <option value="11">11+ Years</option>
                      </Field>
                      <ErrorMessage
                        name="experience_years"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <Field
                        as="select"
                        className={
                          "form-control" +
                          (errors.experience_months && touched.experience_months
                            ? " is-invalid"
                            : "")
                        }
                        name="experience_months"
                        disabled={experienceHandle}
                        style={
                          experienceHandle == true
                            ? { cursor: "not-allowed" }
                            : {}
                        }
                      >
                        <option value="">Select Month(s)</option>
                        <option value="1">1 Month</option>
                        <option value="2">2 Months</option>
                        <option value="3">3 Months</option>
                        <option value="4">4 Months</option>
                        <option value="5">5 Months</option>
                        <option value="6">6 Months</option>
                        <option value="7">7 Months</option>
                        <option value="8">8 Months</option>
                        <option value="9">9 Months</option>
                        <option value="10">10 Months</option>
                        <option value="11">11 Months</option>
                      </Field>
                      <ErrorMessage
                        name="experience_months"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-company-name")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.current_company_name &&
                      touched.current_company_name
                        ? " is-invalid"
                        : "")
                    }
                    name="current_company_name"
                  />
                  <ErrorMessage
                    name="current_company_name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Salary")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.current_monthly_salary &&
                      touched.current_monthly_salary
                        ? " is-invalid"
                        : "")
                    }
                    name="current_monthly_salary"
                  />
                  <ErrorMessage
                    name="current_monthly_salary"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Desired-Salary")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.desired_monthly_salary &&
                      touched.desired_monthly_salary
                        ? " is-invalid"
                        : "")
                    }
                    name="desired_monthly_salary"
                  />
                  <ErrorMessage
                    name="desired_monthly_salary"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Basic/Graduation")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    as="select"
                    className={
                      "form-control" +
                      (errors.basicORgraduation && touched.basicORgraduation
                        ? " is-invalid"
                        : "")
                    }
                    name="basicORgraduation"
                  >
                    <option value="">Select</option>
                    <option value="B.Sc.IT">B.Sc.IT</option>
                    <option value="B.A">B.A</option>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                    <option value="BCom">BCom</option>
                    <option value="BE">BE</option>
                    <option value="BSc">BSc</option>
                    <option value="BTech(IT)">BTech(IT)</option>
                    <option value="BTech(CS)">BTech(CS)</option>
                    <option value="BTech(EC)">BTech(EC)</option>
                    <option value="BTech">BTech</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="basicORgraduation"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Post-Graduation")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    as="select"
                    className={
                      "form-control" +
                      (errors.post_graduation && touched.post_graduation
                        ? " is-invalid"
                        : "")
                    }
                    name="post_graduation"
                  >
                    <option value="">Select</option>
                    <option value="M.Sc.IT">M.Sc.IT</option>
                    <option value="M.A">M.A</option>
                    <option value="M.Com">M.Com</option>
                    <option value="M.Sc">M.Sc</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                    <option value="MCM">MCM</option>
                    <option value="MS">MS</option>
                    <option value="M.Tech(IT)">M.Tech(IT)</option>
                    <option value="M.Tech(CS)">M.Tech(CS)</option>
                    <option value="M.Tech(EC)">M.Tech(EC)</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="post_graduation"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Diploma_Name")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.diploma_name && touched.diploma_name
                        ? " is-invalid"
                        : "")
                    }
                    name="diploma_name"
                  />
                  <ErrorMessage
                    name="diploma_name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-Work-Domain")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.work_domain && touched.work_domain
                        ? " is-invalid"
                        : "")
                    }
                    name="work_domain"
                  />
                  <ErrorMessage
                    name="work_domain"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-i-am")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    as="select"
                    className={
                      "form-control" +
                      (errors.gender && touched.gender ? " is-invalid" : "")
                    }
                    name="gender"
                  >
                    <option value="">Select</option>
                    <option value="male">{t("account-gen-male")}</option>
                    <option value="female">{t("account-gen-female")}</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("account-gen-dob")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <DatePicker
                    className="form-control"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    maxDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    // isClearable
                    yearDropdownItemNumber={100}
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown={true}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <p
                style={{
                  color: "green",
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                {successMsg}
              </p>
            </div>
            <div className="up-btn offset-lg-3">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}{" "}
                {t("account-gen-btn")}
              </button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
