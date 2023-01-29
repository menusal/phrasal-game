import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Grow,
  Toolbar,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import useScoreHystoryFromLocalStorage from "../hooks/useScoreHystoryFromLocalStorage";
import { ROUTE_PATHS } from "../routes";

export default function Scores() {
  const { scoreHistory } = useScoreHystoryFromLocalStorage();
  return (
    <Container maxWidth="sm">
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Box>
            <Link to={ROUTE_PATHS.DEFAULT}>
              <Button
                variant="text"
                color="primary"
                size="large"
                sx={{ fontWeight: "bold" }}
              >
                {t("Home")}
              </Button>
            </Link>
          </Box>
          <Box>
            <Link to={ROUTE_PATHS.GAME}>
              <Button
                variant="text"
                color="primary"
                size="large"
                sx={{ fontWeight: "bold" }}
              >
                {t("Game")}
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Header isNewGame={true} top={false} />
      <Grid
        container
        spacing={2}
        marginTop={8}
        paddingLeft={2}
        paddingRight={2}
      >
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t("Scores")}
          </Typography>
        </Grid>
        {scoreHistory.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              {t("No scores yet")}
            </Typography>
          </Grid>
        )}
        {scoreHistory.map((score, idx) => (
          <Grow in={true}>
            <Grid
              container
              spacing={2}
              marginTop={2}
              key={idx}
              sx={{
                borderBottom: "1px solid #ccc",
              }}
            >
              <Grid item xs={10}>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  textAlign="left"
                >
                  {formatDate(score.date)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Box display="flex" justifyContent="flex-end">
                  <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                    {score.score}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grow>
        ))}
      </Grid>
    </Container>
  );
}

// aux
function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    calendar: "gregory",
    numberingSystem: "latn",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "Atlantic/Canary"
  }).format(new Date(date));
}
