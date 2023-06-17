import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/actions/authAction";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./Order.css";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { getServices } from "../../store/actions/servicesAction";
import Button from "../../components/button/Button";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { setAuthOrder } from "../../store/actions/orderAction";
import Swal from "sweetalert2";
import { io } from "socket.io-client";
import Price from "./price";
import PrePrice from "./prePrice";

const IsAuthOrder = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [withArea, setWithArea] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const data = useSelector((state) => state.auth.address);
  const category = useSelector((state) => state.services.services);
  const lang = useSelector((state) => state.lang.lang);
  const socket = useRef();

  const initialValues = {
    categoryId: "",
    subCategoryId: "",
    address: "",
    date: "",
    time: "",
    prepay: "qesh",
  };

  useEffect(() => {
    dispatch(getUser());
    dispatch(getServices());
    socket.current = io("ws://localhost:8000");
  }, []);

  const handleFormSubmit = (values) => {
    dispatch(setAuthOrder({ ...values, id: user.id }));
    socket.current.emit("sendActivityInvite", {
      date: values.date + "T" + values.time,
      categoryId: values.categoryId,
      subCategoryId: values.subCategoryId,
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
    categoryId: Yup.string().required(t("required")),
    subCategoryId: Yup.string().required(t("required")),
    address: Yup.string().required(t("required")),
    date: Yup.string().required(t("required")),
    time: Yup.string().required(t("required")),
    prepay: Yup.string().required(t("required")),
  });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="services-title">
        <h1>{t("order")}</h1>
      </div>
      <div
        style={{
          width: "70%",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {(formik) => (
            <Form className="order-form">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <div>
                    {data?.length ? (
                      <Field name="address">
                        {({ field }) => (
                          <TextField
                            {...field}
                            select
                            label={t("address")}
                            variant="outlined"
                          >
                            {data?.map((i) => {
                              return (
                                <MenuItem key={i.id} value={i.id}>
                                  {t("street")} - {i?.street} / {t("home")} -{" "}
                                  {i?.home} / {t("floor")} - {i?.floor} /
                                </MenuItem>
                              );
                            })}
                          </TextField>
                        )}
                      </Field>
                    ) : (
                      <h2 style={{ color: "maroon" }}>{t("add-address")}</h2>
                    )}
                  </div>
                </div>
                <div>
                  <Field name="categoryId">
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
                </div>
                <div>
                  <Field name="subCategoryId">
                    {({ field }) => (
                      <TextField
                        {...field}
                        select
                        label={t("subcategory-type")}
                        variant="outlined"
                        onChange={(e) => {
                          formik.setFieldValue(
                            "subCategoryId",
                            e.target.value.id
                          );
                          setWithArea(e.target.value.withArea);
                        }}
                      >
                        {formik.values.categoryId &&
                          category
                            ?.filter((i) => i.id == formik.values.categoryId)[0]
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
                </div>
                <div>
                  <Field name="time">
                    {({ form }) => (
                      <TimePicker
                        label={t("time")}
                        name="time"
                        value={formik.values.time}
                        format="HH:mm"
                        disablePast
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
                {formik.values.categoryId &&
                  formik.values.subCategoryId &&
                  category
                    ?.filter((i) => i.id == formik.values.categoryId)[0]
                    .SubCategories?.filter(
                      (o) => o.id == formik.values.subCategoryId
                    )[0]?.price && (
                    <div>
                      <div
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        {formik.values.categoryId &&
                          formik.values.subCategoryId && (
                            <Price
                              price={
                                category
                                  ?.filter(
                                    (i) => i.id == formik.values.categoryId
                                  )[0]
                                  .SubCategories?.filter(
                                    (o) => o.id == formik.values.subCategoryId
                                  )[0].price
                              }
                              withArea={withArea}
                              area={
                                data?.filter(
                                  (i) => i.id === formik.values.address
                                )[0]?.area
                              }
                            />
                          )}
                        {formik.values.prepay === "online" &&
                          formik.values.categoryId &&
                          formik.values.subCategoryId && (
                            <PrePrice
                              price={
                                category
                                  ?.filter(
                                    (i) => i.id == formik.values.categoryId
                                  )[0]
                                  .SubCategories?.filter(
                                    (o) => o.id == formik.values.subCategoryId
                                  )[0].price
                              }
                              withArea={withArea}
                              area={
                                data?.filter(
                                  (i) => i.id === formik.values.address
                                )[0]?.area
                              }
                            />
                          )}
                        {/* {formik.values.prepay === "online" && (
                          <h3>
                            {t("pre")} 20% ` {"  "}
                            {formik.values.categoryId &&
                              formik.values.subCategoryId &&
                              data.filter(
                                (i) => i.id === formik.values.address
                              ) &&
                              Number(
                                category
                                  ?.filter(
                                    (i) => i.id == formik.values.categoryId
                                  )[0]
                                  .SubCategories.filter(
                                    (o) => o.id == formik.values.subCategoryId
                                  )[0]?.price
                              ) *
                                Number(
                                  data.filter(
                                    (i) => i.id === formik.values.address
                                  )[0].area
                                ) *
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
                            formik.setFieldValue("prepay", event.target.value);
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
              </LocalizationProvider>
              <div>
                <Button type="submit" disabled={data?.length == 0}>
                  {data?.length > 0 ? t("send") : t("add-address")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default IsAuthOrder;
