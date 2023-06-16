import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { REGISTER_PAGE } from "../../routing/pats";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../components/button/Button";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/authAction";
import { useTranslation } from "react-i18next";

const theme = createTheme();

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(t("invalid-email")).required(t("required")),
    password: Yup.string().required(t("required")),
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              dispatch(login(values));
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    {t("login")}
                  </Typography>
                  <Box noValidate sx={{ mt: 1 }}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      label={t("email")}
                      name="email"
                      type="email"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      fullWidth
                      sx={{ mb: 3 }}
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      label={t("password")}
                      name="password"
                      type="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      fullWidth
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label={t("reminde-me")}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="secondary"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {t("login")}
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Link href={REGISTER_PAGE} variant="body2">
                          {t("goto-register")}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
