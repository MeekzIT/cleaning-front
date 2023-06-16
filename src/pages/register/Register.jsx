import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LOGIN_PAGE } from "../../routing/pats";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../components/button/Button";
import { useDispatch } from "react-redux";
import { register } from "../../store/actions/authAction";
import { useTranslation } from "react-i18next";

const theme = createTheme();

export default function Register() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, t("too-short"))
      .max(50, "Too Long!")
      .required(t("required")),
    lastName: Yup.string()
      .min(2, t("too-short"))
      .max(50, t("too-long"))
      .required(t("required")),
    email: Yup.string().email(t("invalid-email")).required(t("required")),
    phone: Yup.string()
      .matches(/^[0-9]+$/, t("only-digits"))
      .min(7, t("too-short"))
      .max(10, t("too-long"))
      .required(t("required")),
    password: Yup.string()
      .min(8, t("too-short"))
      .max(50, t("too-long"))
      .required(t("required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("passwords-much"))
      .required(t("required")),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            {t("register")}
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              if (values.password === values.confirmPassword) {
                dispatch(
                  register({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    phoneNumber: values.phone,
                  })
                );
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box noValidate sx={{ mt: 3, mb: 5 }}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label={t("name")}
                        name="firstName"
                        type="text"
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        sx={{ width: "100%" }}
                        as={TextField}
                        variant="outlined"
                        label={t("surname")}
                        name="lastName"
                        type="text"
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={24}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label={t("email")}
                        name="email"
                        type="email"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label={t("phone")}
                        name="phone"
                        type="text"
                        error={touched.phone && Boolean(errors.phone)}
                        fullWidth
                        helperText={touched.phone && errors.phone}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label={t("password")}
                        name="password"
                        type="password"
                        error={touched.password && Boolean(errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    <Grid item xs={20}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label={t("confirm-password")}
                        name="confirmPassword"
                        type="password"
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} mt={5}>
                    <Button type="submit ">{t("register")}</Button>
                  </Grid>

                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href={LOGIN_PAGE} variant="body2">
                        {t("goto-login")}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
