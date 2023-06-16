import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Settings";
import "./Settings.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import Button from "../../components/button/Button";
import { TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  changeAvavtar,
  editAccount,
  editAvatar,
  editPassword,
} from "../../store/actions/authAction";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const SettingUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.user);
  const avatar = useSelector((state) => state.auth.avatar);
  const [up, setUp] = useState(false);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t("required")),
    lastName: Yup.string().required(t("required")),
    email: Yup.string().email(t("invalid-email")).required(t("required")),
    phoneNumber: Yup.string().required(t("required")),
  });

  const validationPassword = Yup.object().shape({
    password: Yup.string()
      .min(8, t("too-short"))
      .max(50, t("too-long"))
      .required(t("required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("passwords-much"))
      .required(t("required")),
  });

  const initialValues = {
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    phoneNumber: data?.phoneNumber,
  };

  const initialPassword = {
    password: "",
    confirmPassword: "",
  };

  const handleFile = (e) => {
    let files = [];
    Object.keys(e.target.files).map((f) => {
      if (f === "Length") return;
      files.push(e.target.files[0]);
    });
    uploadImage(files);
  };

  let arrOfImages = [];
  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "armcodingImage");
    formData.append("cloud_name", "armcoding");
    axios
      .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
      .then((res) => {
        arrOfImages.push(res.data.url);
        dispatch(changeAvavtar(res.data.url));
        setUp(true);
      });
  };

  return (
    <div className="settings">
      <Sidebar />
      <div className="settings-user">
        {!data ? (
          <div className="loading-box">
            <CircularProgress
              sx={{
                color: "#01dfa4",
              }}
            />
            <h3>{t("loading")}</h3>
          </div>
        ) : (
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => dispatch(editAccount(values))}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="services-title">
                    <h1>{t("change-credentials")}</h1>
                  </div>
                  <Field
                    as={TextField}
                    name="firstName"
                    label={t("name")}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    name="lastName"
                    label={t("surname")}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    name="email"
                    label={t("email")}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    name="phoneNumber"
                    label={t("phone")}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />

                  <Button type="submit">{t("send")}</Button>
                </Form>
              )}
            </Formik>
            <Formik
              initialValues={initialPassword}
              validationSchema={validationPassword}
              onSubmit={(values) =>
                dispatch(editPassword({ password: values.password }))
              }
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="services-title">
                    <h1>{t("change-password")}</h1>
                  </div>
                  <Field
                    as={TextField}
                    name="password"
                    label={t("password")}
                    type="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />

                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label={t("confirm-password")}
                    type="password"
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />

                  <Button type="submit">{t("send")}</Button>
                </Form>
              )}
            </Formik>
          </div>
        )}
        <div className="settings-avatar">
          <div className="services-title">
            <h1>{t("change-avatar")}</h1>
          </div>
          {!avatar ? (
            <AccountCircleIcon sx={{ fontSize: "50px" }} />
          ) : (
            <img src={avatar} alt="avatar" />
          )}
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={handleFile}
            className="custom-file-input"
          />
          {up && (
            <Button
              onClick={() => {
                dispatch(editAvatar({ image: avatar }));
                setUp(false);
              }}
            >
              upload
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingUser;
