import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, TextField, TextareaAutosize, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, editAddress } from "../../store/actions/authAction";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";

const EditAddress = ({ open, handleClose, values }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const City = useSelector((state) => state.info.city);
  const lang = useSelector((state) => state.lang.lang);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const validationSchema = Yup.object().shape({
    city: Yup.number().required(t("required")),
    street: Yup.string().required(t("required")),
    home: Yup.string().required(t("required")),
    floor: Yup.string().required(t("required")),
    notes: Yup.string().required(t("required")),
    area: Yup.string().required(t("required")),
  });
  const initial = {
    city: values?.city,
    floor: values?.floor,
    home: values?.home,
    notes: values?.notes,
    street: values?.street,
    area: values?.area,
  };

  <Grid item xs={12}>
    <Typography id="modal-modal-title" variant="h4" component="h2">
      {t("edit")} {t("address")}
    </Typography>
  </Grid>;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {values?.city && (
          <Formik
            initialValues={initial}
            validationSchema={validationSchema}
            onSubmit={(v) => {
              dispatch(editAddress({ ...v, id: values.id }));
              handleClose();
            }}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Grid item xs={12}>
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                  >
                    {t("edit")} {t("address")}
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        City
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.city}
                        onChange={handleChange}
                        name="city"
                        label={t("city")}
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city}
                      >
                        {City?.map((i) => {
                          return (
                            <MenuItem value={i.id} key={i.id}>
                              {lang == "am"
                                ? i?.nameHy
                                : lang == "ru"
                                ? i?.nameRu
                                : i?.nameEn}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="street"
                      as={TextField}
                      label={t("street")}
                      fullWidth
                      error={errors.street && touched.street}
                      helperText={touched.street && errors.street}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="home"
                      as={TextField}
                      label={t("home")}
                      fullWidth
                      error={errors.home && touched.home}
                      helperText={touched.home && errors.home}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="floor"
                      as={TextField}
                      label={t("floor")}
                      fullWidth
                      error={errors.floor && touched.floor}
                      helperText={touched.floor && errors.floor}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="area"
                      as={TextField}
                      label={t("area")}
                      fullWidth
                      error={errors.area && touched.area}
                      helperText={touched.area && errors.area}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="notes"
                      as={TextareaAutosize}
                      label={t("notes")}
                      rowsMin={3}
                      fullWidth
                      error={errors.notes && touched.notes}
                      helperText={touched.notes && errors.notes}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      {t("send")}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </Modal>
  );
};

export default EditAddress;
