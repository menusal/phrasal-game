import { AppBar, Toolbar, Grid, Box } from "@mui/material";
import Lifes from "./Lifes";
import Score from "./Score";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";
import ModeToggle from "./ModeToggle";

export default function Header({
  score,
  scoreFrom,
  time,
  timeFrom,
  isRunning,
  lifes,
}: {
  score: number;
  scoreFrom: number;
  time: number;
  timeFrom: number;
  isRunning: boolean;
  lifes: number;
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Grid container>
            <Lifes lifes={lifes} />
            <Score score={score} scoreFrom={scoreFrom} />
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar position="fixed" color="secondary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Grid container>
            <LanguageSelect />
            <ModeToggle />
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
