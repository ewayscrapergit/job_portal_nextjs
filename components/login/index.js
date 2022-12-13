import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  const initilValue = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("input-invalid")).required(t("input-email")),
    password: Yup.string().required(t("input-password")),
  });

  async function OnSubmit(values) {
    dispatch(login(values));
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
            <h2>{t("login-title")}</h2>
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
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                  name="email"
                  placeholder={t("login-email")}
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
                  placeholder={t("login-password")}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="log-btn">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}{" "}
                  {t("login-btn")}
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}
