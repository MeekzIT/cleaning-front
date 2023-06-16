import { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../store/actions/servicesAction";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import "./Images.css";
import Button from "../../components/button/Button";
import { Pagination } from "../../components/pagination/Pagination";
import { useTranslation } from "react-i18next";

const Images = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [image, setActive] = useState(null);
  const [index, setIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const data = useSelector((state) => state.services.images);
  const count = useSelector((state) => state.services.count);
  useEffect(() => {
    dispatch(getImages({ offset: page }));
  }, [page]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "3px solid #01DFA4",
    boxShadow: 24,
  };

  const showNextImage = () => {
    setIndex(index + 1);
    data[index + 1].image && setActive(data[index + 1]?.image);
  };

  const showPrevImage = () => {
    setIndex(index - 1);
    data[index - 1].image && setActive(data[index - 1]?.image);
  };

  return (
    <div>
      <div className="services-title">
        <h1>{t("images")}</h1>
      </div>
      <div className="images-box">
        {data?.map((i, idx) => {
          return (
            <img
              src={i.image}
              alt={`${i.id}`}
              key={i.id}
              onClick={() => {
                setActive(i.image);
                setIndex(idx);
                handleOpen();
              }}
            />
          );
        })}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={image} alt="image" className="active-image-modal" />
          {index !== data?.length - 1 && (
            <span className="ArrowRightIcon">
              <Button variant="secondary" onClick={showNextImage}>
                <KeyboardArrowRightIcon fontSize="large" />
              </Button>
            </span>
          )}
          {index !== 0 && (
            <span className="ArrowLeftIcon">
              <Button variant="secondary" onClick={showPrevImage}>
                <KeyboardArrowLeftIcon fontSize="large" />
              </Button>
            </span>
          )}
        </Box>
      </Modal>

      <Pagination
        productLength={data?.length}
        count={Math.ceil(count / 18)}
        page={page}
        setPage={setPage}
        pages={pages}
        setPages={setPages}
      />
    </div>
  );
};

export default Images;
