import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Newsletter() {
  const { t } = useTranslation();
  const [successMsg, setSuccessMsg] = useState("");

  const initilValue = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("input-invalid")).required(t("input-email")),
  });

  async function OnSubmit(values, action) {
    const { data } = await axios.post(`${process.env.URL}/api/newsletter`, {
      values,
    });
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
        <div className="subscribe">
          <div className="container">
            <div className="top-block">
              <h2>{t("subscribe-Subscribe")}</h2>
              <p>{t("subscribe-Donec")}</p>
              <Form>
                <Field
                  type="text"
                  className={
                    "field" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                  name="email"
                  placeholder={t("subscribe-placeholder")}
                />

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}{" "}
                  {t("subscribe-btn")}
                </button>

                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </Form>
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
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
