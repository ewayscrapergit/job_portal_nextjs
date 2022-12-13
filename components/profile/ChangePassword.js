import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ChangePassword() {
  const { t } = useTranslation();

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const initilValue = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(6, t("input-pass-minimum"))
      .required(t("input-curr-pass")),
    newPassword: Yup.string()
      .min(6, t("input-pass-minimum"))
      .required(t("input-new-pass")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], t("input-pass-match"))
      .required(t("input-con-pass")),
  });

  async function OnSubmit(values) {
    // console.log(values);
    const passRes = await axios.post(`${process.env.URL}/api/user/details`, {
      jobPreferences: "",
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      user_id: userInfo.id,
    });
    // console.log(passRes.data);
    if (passRes.data.status == 1) {
      setErrorMsg("");
      setSuccessMsg(passRes.data.msg);
    } else {
      setSuccessMsg("");
      setErrorMsg(passRes.data.msg);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSuccessMsg("");
    }, 3000);
    return () => clearInterval(interval);
  }, [successMsg]);

  return (
    <Formik
      initialValues={initilValue}
      validationSchema={validationSchema}
      onSubmit={OnSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <>
          <h2>{t("password-title")}</h2>
          <Form>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("password-current")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="password"
                    className={
                      "form-control" +
                      (errors.currentPassword && touched.currentPassword
                        ? " is-invalid"
                        : "")
                    }
                    name="currentPassword"
                    placeholder={t("password-current")}
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("password-new")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="password"
                    className={
                      "form-control" +
                      (errors.newPassword && touched.newPassword
                        ? " is-invalid"
                        : "")
                    }
                    name="newPassword"
                    placeholder={t("password-new")}
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>{t("password-confirm")}</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="password"
                    className={
                      "form-control" +
                      (errors.confirmPassword && touched.confirmPassword
                        ? " is-invalid"
                        : "")
                    }
                    name="confirmPassword"
                    placeholder={t("password-confirm")}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <p
                style={{
                  color: successMsg == "" ? "red" : "green",
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                {successMsg == "" ? errorMsg : successMsg}
              </p>
            </div>
            <div className="up-btn offset-lg-3">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}{" "}
                {t("password-btn")}
              </button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
