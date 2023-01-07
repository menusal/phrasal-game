import { AppBar, Toolbar, Grid, Box } from "@mui/material";
import Lifes from "./Lifes";
import Score from "./Score";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";
import ModeToggle from "./ModeToggle";

export default function Header({
  top,
  score,
  scoreFrom,
  lifes,
  isNewGame,
}: {
  top: boolean;
  isNewGame: boolean;
  score?: number;
  scoreFrom?: number;
  lifes?: number;
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default" sx={{ opacity: top ? 1 : 0}}>
        <Toolbar>
          <Grid container>
            <Lifes lifes={lifes || 0} />
            <Score score={score || 0} scoreFrom={scoreFrom || 0} />
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar position="fixed" color="secondary" sx={{ top: "auto", bottom: 0 }} >
        <Toolbar>
          <Grid container>
            <LanguageSelect isNewGame={isNewGame}/>
            <ModeToggle />
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
