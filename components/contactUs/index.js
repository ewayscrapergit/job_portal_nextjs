import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t } = useTranslation();
  const [successMsg, setSuccessMsg] = useState("");
  const initilValue = {
    name: "",
    email: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z ]+$/, t("input-name-only"))
      .required(t("input-name")),
    email: Yup.string().email(t("input-invalid")).required(t("input-email")),
    phone: Yup.string()
      .min(5, t("input-minimum"))
      .matches(/^[0-9-+]*$/, t("input-only"))
      .required(t("input-phone")),
  });

  async function OnSubmit(values, action) {
    const { data } = await axios.post(`${process.env.URL}/api/contact-us`, {
      values,
    });
    console.log(data);
    if (data.status == 1) {
      setSuccessMsg(data.msg);
      action.resetForm();
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
        <div className="box">
          <h2>{t("footer-Contact")}</h2>
          <p>{t("footer-Lorem")}</p>
          <Form>
            <div className="block">
              <Field
                type="text"
                className={
                  "form-control" +
                  (errors.name && touched.name ? " is-invalid" : "")
                }
                name="name"
                placeholder={t("footer-Name")}
              />
              <ErrorMessage
                name="name"
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
                placeholder={t("footer-Email")}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="block">
              <Field
                type="text"
                className={
                  "form-control" +
                  (errors.phone && touched.phone ? " is-invalid" : "")
                }
                name="phone"
                placeholder={t("footer-Phone")}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <p
              className="success_msg"
              style={{
                paddingTop: 10,
                color: "green",
                fontSize: 15,
              }}
            >
              {successMsg}
            </p>
            <div className="send-btn">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}{" "}
                {t("footer-btn")}
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
