import {
  Box,
  Container,
  Grid,
  Grow,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import lightLogo from "../assets/images/light-logo.png";
import darkLogo from "../assets/images/dark-logo.png";
import { ROUTE_PATHS } from "../routes";

export default function DefaultView() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Container maxWidth="sm">
      <Header isNewGame={true} top={false} />
      <Grid container spacing={2} marginTop={8}>
        <Grid item xs={12}>
          <Grow in={true}>
            <Box marginBottom={3} marginTop={3}>
              <img
                src={theme.palette.mode === "dark" ? darkLogo : lightLogo}
                alt="phrasal verbs"
                width="100%"
              />
            </Box>
          </Grow>
          <Grow in={true}>
            <Box marginBottom={3}>
              <Link to={ROUTE_PATHS.GAME}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {t("Start new game")}
                </Button>
              </Link>
            </Box>
          </Grow>
          <Grow in={true}>
            <Box marginBottom={3}>
              <Link to={ROUTE_PATHS.SCORES}>
                <Button
                  variant="text"
                  color="secondary"
                  size="large"
                  // sx={{ color: "white", fontWeight: "bold" }}
                >
                  {t("Show scores")}
                </Button>
              </Link>
            </Box>
          </Grow>
        </Grid>
      </Grid>
    </Container>
  );
}
