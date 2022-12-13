import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function JobPreference({ details }) {
  const { t } = useTranslation();

  const [successMsg, setSuccessMsg] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const initilValue = {
    job_preferences: "",
  };

  const validationSchema = Yup.object().shape({
    job_preferences: Yup.string().required(t("input-job-prefer")),
  });

  async function OnSubmit(values) {
    // console.log(values);
    const prePassRes = await axios.post(`${process.env.URL}/api/user/details`, {
      jobPreferences: values.job_preferences,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      user_id: userInfo.id,
    });
    // console.log(prePassRes.data);
    setSuccessMsg(prePassRes.data.msg);
  }
  const [saveData, setSaveData] = useState(null);

  useEffect(() => {
    const saveValues = {
      job_preferences: details.job_preferences,
    };
    setSaveData(saveValues);
  }, [details]);

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
          <h2>{t("preferences-title")}</h2>
          <p>{t("preferences-des")}</p>
          <Form>
            <div className="form-group">
              {/* <textarea
              placeholder="Enter Addition Information as per your Job Requirements"
              className="form-control"
              defaultValue=""
            /> */}
              <Field
                type="text"
                as="textarea"
                className={
                  "form-control" +
                  (errors.job_preferences && touched.job_preferences
                    ? " is-invalid"
                    : "")
                }
                name="job_preferences"
                placeholder={t("preferences-placeholder")}
              />
              <ErrorMessage
                name="job_preferences"
                component="div"
                className="invalid-feedback"
              />
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
            <div className="up-btn">
              {/* <button>Update</button> */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="send_btn"
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                {t("preferences-btn")}
              </button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
