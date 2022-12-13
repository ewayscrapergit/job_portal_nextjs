import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  const initilValue = {
    full_name: "",
    email: "",
    password: "",
    con_password: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required(t("input-fullname")),
    email: Yup.string().email(t("input-invalid")).required(t("input-email")),
    password: Yup.string()
      .min(6, t("input-pass-minimum"))
      .required(t("input-password")),
    con_password: Yup.string()
      .oneOf([Yup.ref("password"), null], t("input-pass-match"))
      .required(t("input-con-pass")),
    acceptTerms: Yup.bool().oneOf([true], t("input-accept")),
  });

  async function OnSubmit(values) {
    dispatch(register(values));
  }

  return (
    <Formik
      initialValues={initilValue}
      validationSchema={validationSchema}
      onSubmit={OnSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <div className="register_popup">
          <div className="log-box">
            <h2>{t("register-title")}</h2>
            <div className="col-lg-12">
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                {error}
              </p>
            </div>
            <Form>
              <div className="block">
                <Field
                  type="text"
                  className={
                    "form-control" +
                    (errors.full_name && touched.full_name ? " is-invalid" : "")
                  }
                  name="full_name"
                  placeholder={t("register-full-name")}
                />
                <ErrorMessage
                  name="full_name"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="block">
                <Field
                  type="text"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                  name="email"
                  placeholder={t("register-email")}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="block">
                <Field
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                  name="password"
                  placeholder={t("register-pass")}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="block">
                <Field
                  type="password"
                  className={
                    "form-control" +
                    (errors.con_password && touched.con_password
                      ? " is-invalid"
                      : "")
                  }
                  name="con_password"
                  placeholder={t("register-con-pass")}
                />
                <ErrorMessage
                  name="con_password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="accepted">
                <Field
                  type="checkbox"
                  className={
                    "form-check-input " +
                    (errors.acceptTerms && touched.acceptTerms
                      ? " is-invalid"
                      : "")
                  }
                  id="privacy"
                  name="acceptTerms"
                />
                <label htmlFor="privacy">{t("register-Accepted")}</label>
                <ErrorMessage
                  name="acceptTerms"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="log-btn">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}{" "}
                  {t("register-btn")}
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}
