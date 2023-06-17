import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "../../components/button/Button";
import { useSelector, useDispatch } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useRef, useState } from "react";
import { getServices } from "../../store/actions/servicesAction";
import TextArea from "../../components/input/TextArea";
import IsAuthOrder from "./IsAuthOrder";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { io } from "socket.io-client";
import "./Order.css";
import { setOrder } from "../../store/actions/orderAction";
import Swal from "sweetalert2";
import Price from "./price";
import PrePrice from "./prePrice";

// export const socket = io("ws://localhost:8900");

const Order = () => {
  const { t } = useTranslation();
  const dispactch = useDispatch();
  const socket = useRef();
  const [withArea, setWithArea] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const category = useSelector((state) => state.services.services);
  const lang = useSelector((state) => state.lang.lang);

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
  }, []);
  const handleFormSubmit = (values) => {
    dispactch(setOrder(values));
    socket.current.emit("sendActivityInvite", {
      date: values.date + "T" + values.time,
      categoryId: values.select1,
      subCategoryId: values.select2,
      prePay: false,
      addressId: values.address,
    });
    Swal.fire({
      icon: "success",
      title: t("order-compated"),
      text: t("our-hoe"),
      iconColor: "#1a1940",
      confirmButtonColor: "#1a1940",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("required")),
    surname: Yup.string().required(t("required")),
    email: Yup.string().email("Invalid email").required(t("required")),
    phone: Yup.string().required(t("required")),
    // notes: Yup.string().required(t("required")),
    select1: Yup.string().required(t("required")),
    select2: Yup.string().required(t("required")),
    address: Yup.string().required(t("required")),
    date: Yup.string().required(t("required")),
    time: Yup.string().required(t("required")),
    // area: Yup.number() || null,
    prepay: Yup.string().required(t("required")),
  });
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    // notes: "",
    select1: "",
    select2: "",
    address: "",
    date: "",
    time: "",
    area: "",
    prepay: "qesh",
  };

  useEffect(() => {
    dispactch(getServices());
  }, []);
  return (
    <div>
      {isAuth ? (
        <IsAuthOrder />
      ) : (
        <>
          <div className="services-title">
            <h1>{t("order")}</h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {(formik) => (
              <Form className="order-form">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <Field name="name">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label={t("name")}
                          variant="outlined"
                          error={meta.touched.name && meta.error.name}
                          helperText={meta.touched.name && meta.error.name}
                          fullWidth
                        />
                      )}
                    </Field>

                    <Field name="surname">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label={t("surname")}
                          variant="outlined"
                          error={meta.touched.surname && meta.error.surname}
                          helperText={
                            meta.touched.surname && meta.error.surname
                          }
                          fullWidth
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="email">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label={t("email")}
                          variant="outlined"
                          error={meta.touched.email && meta.error.email}
                          helperText={meta.touched.email && meta.error.email}
                        />
                      )}
                    </Field>

                    <Field name="phone">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label={t("phone")}
                          variant="outlined"
                          error={meta.touched.phone && meta.error.phone}
                          helperText={meta.touched.phone && meta.error.phone}
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="date">
                      {({ form }) => (
                        <DesktopDatePicker
                          name="date"
                          label={t("date")}
                          disablePast
                          value={formik.values.date}
                          format="YYYY-MM-DD"
                          onChange={(value) => {
                            form.setFieldValue(
                              "date",
                              dayjs(value).format("YYYY-MM-DD")
                            );
                          }}
                        />
                      )}
                    </Field>

                    <Field name="time">
                      {({ form }) => (
                        <TimePicker
                          label={t("time")}
                          name="time"
                          disablePast
                          value={formik.values.time}
                          format="HH:mm"
                          onChange={(value) => {
                            form.setFieldValue(
                              "time",
                              dayjs(value).format("HH:mm")
                            );
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="select1">
                      {({ field }) => (
                        <TextField
                          {...field}
                          select
                          label={t("service-type")}
                          variant="outlined"
                        >
                          {category?.map((i) => {
                            return (
                              <MenuItem key={i.id} value={i.id}>
                                {lang == "am"
                                  ? i?.naemHy
                                  : lang == "ru"
                                  ? i?.nameRu
                                  : i?.nameEn}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      )}
                    </Field>

                    <Field name="select2">
                      {({ field }) => (
                        <TextField
                          {...field}
                          select
                          label={t("subcategory-type")}
                          variant="outlined"
                          onChange={(e) => {
                            formik.setFieldValue("select2", e.target.value.id);
                            if (!e.target.value.withArea)
                              formik.setFieldValue("area", null);
                            setWithArea(e.target.value.withArea);
                          }}
                        >
                          {formik.values.select1 &&
                            category
                              ?.filter((i) => i.id == formik.values.select1)[0]
                              .SubCategories.map((i) => {
                                return (
                                  <MenuItem key={i.id} value={i}>
                                    {lang == "am"
                                      ? i?.naemHy
                                      : lang == "ru"
                                      ? i?.nameRu
                                      : i?.nameEn}
                                  </MenuItem>
                                );
                              })}
                        </TextField>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="address">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label={t("address")}
                          variant="outlined"
                          error={meta.touched.address && meta.error.address}
                          helperText={
                            meta.touched.address && meta.error.address
                          }
                        />
                      )}
                    </Field>
                    {withArea && (
                      <Field name="area">
                        {({ field, meta }) => (
                          <TextField
                            {...field}
                            label={t("area")}
                            variant="outlined"
                            error={meta.touched.area && meta.error.area}
                            helperText={meta.touched.area && meta.error.area}
                          />
                        )}
                      </Field>
                    )}
                  </div>
                  {/* <Field name="notes">
                    {({ field, meta, form }) => (
                      <TextArea
                        {...field}
                        placeholder={t("notes")}
                        variant="outlined"
                        error={meta.touched.notes && meta.error.notes}
                        helperText={meta.touched.notes && meta.error.notes}
                        color="secondary"
                        minRows={2}
                        size="lg"
                        onChange={(value) => {
                          form.setFieldValue("notes", value);
                        }}
                      />
                    )}
                  </Field> */}
                  <div>
                    {formik.values.select1 &&
                      formik.values.select2 &&
                      category
                        ?.filter((i) => i.id == formik.values.select1)[0]
                        .SubCategories.filter(
                          (o) => o.id == formik.values.select2
                        )[0]?.price && (
                        <div>
                          <div
                            style={{
                              flexDirection: "column",
                            }}
                          >
                            {formik.values.select1 && formik.values.select2 && (
                              <Price
                                price={
                                  category
                                    ?.filter(
                                      (i) => i.id == formik.values.select1
                                    )[0]
                                    .SubCategories.filter(
                                      (o) => o.id == formik.values.select2
                                    )[0].price
                                }
                                withArea={withArea}
                                area={formik.values.area}
                              />
                            )}

                            {/* <h3>
                              {t("all")} `
                              {formik.values.select1 &&
                              formik.values.select2 &&
                              formik.values.area ? (
                                <>
                                  {Number(
                                    category
                                      ?.filter(
                                        (i) => i.id == formik.values.select1
                                      )[0]
                                      .SubCategories.filter(
                                        (o) => o.id == formik.values.select2
                                      )[0].price
                                  ) * Number(formik.values.area)}
                                  ֏
                                </>
                              ) : (
                                <>
                                  {Number(
                                    category
                                      ?.filter(
                                        (i) => i.id == formik.values.select1
                                      )[0]
                                      .SubCategories.filter(
                                        (o) => o.id == formik.values.select2
                                      )[0].price
                                  )}
                                  ֏
                                </>
                              )}
                            </h3> */}
                            {formik.values.prepay === "online" &&
                              formik.values.select1 &&
                              formik.values.select2 && (
                                <PrePrice
                                  price={
                                    category
                                      ?.filter(
                                        (i) => i.id == formik.values.select1
                                      )[0]
                                      .SubCategories.filter(
                                        (o) => o.id == formik.values.select2
                                      )[0].price
                                  }
                                  withArea={withArea}
                                  area={formik.values.area}
                                />
                              )}
                            {/* {formik.values.prepay === "online" && (
                              <h3>
                                {t("pre")} 20% ` {"  "}
                                {formik.values.select1 &&
                                  formik.values.select2 &&
                                  Number(
                                    category
                                      ?.filter(
                                        (i) => i.id == formik.values.select1
                                      )[0]
                                      .SubCategories.filter(
                                        (o) => o.id == formik.values.select2
                                      )[0].price
                                  ) *
                                    Number(formik.values.area) *
                                    0.2 +
                                    "֏"}
                              </h3>
                            )} */}
                          </div>
                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                              {t("paytment-metod")}
                            </FormLabel>
                            <RadioGroup
                              aria-label="prepay"
                              name="prepay"
                              value={formik.values.prepay}
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "prepay",
                                  event.target.value
                                );
                              }}
                            >
                              <FormControlLabel
                                value={"qesh"}
                                control={<Radio />}
                                label={t("qesh")}
                              />
                              <FormControlLabel
                                value={"online"}
                                control={<Radio />}
                                label={t("online")}
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      )}
                  </div>
                  <div>
                    <Button type="submit">{t("send")}</Button>
                  </div>
                </LocalizationProvider>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default Order;
