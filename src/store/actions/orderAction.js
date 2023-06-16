import axios from "axios";
import { api } from "../../helpers/keys";
import { io } from "socket.io-client";

export const setAuthOrder = (data) => {
  return (dispatch) => {
    axios
      .post(
        `${api}/order/create`,
        {
          userId: data.id,
          date: data.date + "T" + data.time,
          categoryId: data.categoryId,
          subCategoryId: data.subCategoryId,
          prePay: false,
          ourUser: true,
          addressId: data.address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {});
  };
};

export const setOrder = (data) => {
  return (dispatch) => {
    axios
      .post(`${api}/order/create`, {
        userId: "null",
        firstName: data.name,
        lastName: data.surname,
        email: data.email,
        number: data.phone,
        secondNumber: "",
        date: data.date + "T" + data.time,
        address: data.address,
        notes: "",
        area: data.area,
        addressId: null,
        ourUser: false,
        categoryId: data.select1,
        subCategoryId: data.select2,
        prePay: false,
      })
      .then((res) => {});
  };
};
