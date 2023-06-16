import { useShowTranslate } from "../../helpers/useShowTranslate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { ORDERING_PAGE } from "../../routing/pats";
import { useScreenType } from "../../helpers/useScreenType";
import { useTranslation } from "react-i18next";

const CardService = ({
  path,
  titleHy,
  titleRu,
  titleEn,
  descHy,
  descRu,
  descEn,
  mainImage,
  show,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const screen = useScreenType();
  const title = useShowTranslate(titleHy, titleRu, titleEn);
  const desc = useShowTranslate(descHy, descRu, descEn);
  return (
    <Card
      sx={{
        maxWidth:
          screen === "lg" || screen === "xl"
            ? "500px"
            : screen === "md"
            ? "400px"
            : screen === "sm" && "300px",
        marginBottom: "20px",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={mainImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => navigate(`/services/${path}`)}>
          {t("show-more")}
        </Button>
        {show && screen !== "sm" && (
          <Button variant="secondary" onClick={() => navigate(ORDERING_PAGE)}>
            {t("order")}
          </Button>
        )}
      </CardActions>
      <CardActions>
        {show && screen === "sm" && (
          <Button variant="secondary" onClick={() => navigate(ORDERING_PAGE)}>
            {t("order")}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CardService;
