import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../store/actions/authAction";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";

const AddressModal = ({ open, handleClose }) => {
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

  const initialValues = {
    city: "",
    street: "",
    home: "",
    floor: "",
    notes: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(addAddress(values));
      handleClose();
    },
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                {t("add")} {t("address")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  name="city"
                  label={t("city")}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
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
              <TextField
                fullWidth
                label={t("street")}
                name="street"
                value={formik.values.street}
                onChange={formik.handleChange}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("home")}
                name="home"
                value={formik.values.home}
                onChange={formik.handleChange}
                error={formik.touched.home && Boolean(formik.errors.home)}
                helperText={formik.touched.home && formik.errors.home}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("floor")}
                name="floor"
                value={formik.values.floor}
                onChange={formik.handleChange}
                error={formik.touched.floor && Boolean(formik.errors.floor)}
                helperText={formik.touched.floor && formik.errors.floor}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                minRows={3}
                placeholder={t("area")}
                name="area"
                value={formik.values.area}
                onChange={formik.handleChange}
                error={formik.touched.area && Boolean(formik.errors.area)}
                helperText={formik.touched.area && formik.errors.area}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                fullWidth
                minRows={3}
                placeholder={t("notes")}
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                error={formik.touched.notes && Boolean(formik.errors.notes)}
                helperText={formik.touched.notes && formik.errors.notes}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit">{t("send")}</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddressModal;
