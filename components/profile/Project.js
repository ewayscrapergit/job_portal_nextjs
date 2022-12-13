import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { popupAction } from "../../redux/actions/popupActions";
import { useTranslation } from "react-i18next";

export default function Project() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tagData, setTagData] = useState([]);

  // Image Upload Start
  const [file, setFile] = useState();
  const handleImageUpload = async (e) => {
    setFile(e.target.files[0]);
  };
  // Image Upload End

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const initilValue = {
    title: "",
    description: "",
    url: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t("input-Title")),
    description: Yup.string().required(t("input-Description")),
    // url: Yup.string().required("Project URL is required"),
  });

  async function OnSubmit(values) {
    const formData = new FormData();
    formData.append("upload_project_img", file);
    formData.append("technology_tags", tagData);
    formData.append("title", values.title);
    formData.append("project_url", values.url);
    formData.append("project_description", values.description);
    formData.append("user_id", userInfo.id);
    const projectRes = await axios.post(
      `${process.env.URL}/api/user/projects`,
      formData
    );
    if (projectRes.data.status == "1") {
      dispatch(popupAction());
    }
  }

  const removeTagData = (indexToRemove) => {
    setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);
  };
  const addTagData = (event) => {
    if (event.target.value !== "") {
      setTagData([...tagData, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <Formik
      initialValues={initilValue}
      validationSchema={validationSchema}
      onSubmit={OnSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <div className="add_projet">
          <Form>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>Project Title</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.title && touched.title ? " is-invalid" : "")
                    }
                    name="title"
                    placeholder="Project Title"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>Used Technology</p>
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
                      placeholder="Press enter to add a technology"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>Project URL</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (errors.url && touched.url ? " is-invalid" : "")
                    }
                    name="url"
                    placeholder="Project URL"
                  />
                  <ErrorMessage
                    name="url"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>Project Description</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Field
                    type="text"
                    as="textarea"
                    className={
                      "form-control" +
                      (errors.description && touched.description
                        ? " is-invalid"
                        : "")
                    }
                    name="description"
                    placeholder="Project Description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <p>Project Screenshot</p>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <input
                    accept=".jpg,.png,.jpeg"
                    type="file"
                    onChange={handleImageUpload}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="up-btn offset-lg-3">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}{" "}
                Update
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
