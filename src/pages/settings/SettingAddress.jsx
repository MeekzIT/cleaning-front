import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Settings";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Button from "../../components/button/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddressModal from "./AddressModal";

import "./Settings.css";
import { delAddress, getUser } from "../../store/actions/authAction";
import EditAddress from "./EditAddress";
import { useTranslation } from "react-i18next";

const SettingAddress = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [values, setValues] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const data = useSelector((state) => state.auth.address);
  const lang = useSelector((state) => state.lang.lang);

  useEffect(() => {
    dispatch(getUser());
  }, [open, openEdit]);

  return (
    <div className="settings">
      <Sidebar />
      <div className="settings-user">
        {data?.length === 0 ? (
          <div className="loading-box">
            <AddLinkIcon
              sx={{
                color: "#01dfa4",
                fontSize: "100px",
              }}
            />
            <h3>{t("noting")}</h3>
            <Button onClick={handleOpen}>
              {t("add")} {t("address")}
            </Button>
          </div>
        ) : (
          <div>
            <div className="services-title">
              <h1>{t("addreses")}</h1>
            </div>
            <div style={{ width: "20px", margin: "10px 0" }}>
              <Button onClick={handleOpen}>
                {t("add")} {t("address")}
              </Button>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">{t("city")}</TableCell>
                    <TableCell align="left">{t("street")}</TableCell>
                    <TableCell align="left">{t("home")}</TableCell>
                    <TableCell align="left">{t("floor")}</TableCell>
                    <TableCell align="left">{t("notes")}</TableCell>
                    <TableCell align="left">{t("area")}</TableCell>
                    <TableCell align="left">{t("edit")}</TableCell>
                    <TableCell align="left">{t("del")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row, idx) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{idx + 1}</TableCell>
                      <TableCell align="left">
                        {lang == "am"
                          ? row.City.nameHy
                          : lang == "ru"
                          ? row.City.nameRu
                          : row.City.nameEn}
                      </TableCell>
                      <TableCell align="left">{row.street}</TableCell>
                      <TableCell align="left">{row.home}</TableCell>
                      <TableCell align="left">{row.floor}</TableCell>
                      <TableCell align="left">{row.notes}</TableCell>
                      <TableCell align="left">{row.area}</TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => {
                            setValues({
                              id: row?.id,
                              city: String(row?.City?.id),
                              street: row?.street,
                              home: row?.home,
                              floor: row?.floor,
                              notes: row?.notes,
                              area: row?.area,
                            });
                            handleOpenEdit();
                          }}
                        >
                          {t("edit")}
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => dispatch(delAddress({ id: row.id }))}
                        >
                          {t("del")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
      <AddressModal open={open} handleClose={handleClose} />
      <EditAddress
        open={openEdit}
        handleClose={handleCloseEdit}
        values={values}
      />
    </div>
  );
};

export default SettingAddress;
