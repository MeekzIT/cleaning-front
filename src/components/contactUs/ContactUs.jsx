import { useTranslation } from "react-i18next";
import desc from "../../images/contact-us-ill-desc.svg";
import mobile from "../../images/contact-us-ill-mobile.svg";
import hoe from "../../images/contact-us-hoe.svg";
import Button from "../button/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./ContactUs.css";
import { useIsDesktop, useIsMobile } from "../../helpers/useScreenType";
import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setContactForm } from "../../store/actions/info";
import Swal from "sweetalert2";

const ContactUs = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    name: Yup.string().required(t("required")),
    surname: Yup.string().required(t("required")),
    email: Yup.string().email(t("invalid-email")).required(t("required")),
    message: Yup.string().required(t("required")),
  });
  return (
    <div className="contact-us">
      <span className="contact-us-ill">
        {isMobile && <img src={mobile} alt="mobile" />}
        {isDesktop && <img src={desc} alt="desc" />}
      </span>
      <h1>{t("contact-us")}</h1>
      <div className="contact-us-content">
        <div className="contact-us-image-box">
          <span>{t("order-now")}</span>
          <img src={hoe} alt="hoe" />
        </div>
        <Formik
          initialValues={{ name: "", surname: "", email: "", message: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(setContactForm({ ...values, subject: "" }));
            Swal.fire({
              position: "center",
              iconColor: "#1a1940",
              icon: "success",
              title: t("answer-toemal"),
              showConfirmButton: false,
              timer: 1500,
            });
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form
              style={{
                zIndex: "5",
              }}
            >
              <Grid
                container
                spacing={2}
                style={{
                  padding: "10px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{
                    zIndex: "5",
                  }}
                >
                  <Field name="name">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label={t("name")}
                        variant="outlined"
                        fullWidth
                        error={Boolean(field.value && field.error)}
                        helperText={field.value && field.error}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="name"
                    component="div"
                    style={{ color: "maroon" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field name="surname">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label={t("surname")}
                        variant="outlined"
                        fullWidth
                        error={Boolean(field.value && field.error)}
                        helperText={field.value && field.error}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="surname"
                    component="div"
                    style={{ color: "maroon" }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field name="email">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label={t("email")}
                        variant="outlined"
                        fullWidth
                        error={Boolean(field.value && field.error)}
                        helperText={field.value && field.error}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "maroon" }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field name="message">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label={t("message")}
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={4}
                        error={Boolean(field.value && field.error)}
                        helperText={field.value && field.error}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="message"
                    component="div"
                    style={{ color: "maroon" }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {t("send")}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactUs;
