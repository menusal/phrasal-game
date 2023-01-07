import { Grid, Box, IconButton } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function LanguageSelect({isNewGame} : {isNewGame: boolean}) {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const handleChange = (lang: string) => {
    setLanguage(lang === "en" ? "es" : "en");
    i18n.changeLanguage(lang);
  };

  return (
    <Grid item xs={6}>
      <Box
        sx={{
          display: isNewGame ? "flex" : "none",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
      >
        
        <IconButton
          sx={{ mr: 0.5, fontSize: '1em' }}
          onClick={() => handleChange(language)}
          color="inherit"

        >
          {t("Switch to")}
          {language === "en" ? (
            <span className="fi fi-gb flag"></span>
          ) : (
            <span className="fi fi-es flag"></span>
          )}
        </IconButton>
      </Box>
    </Grid>
  );
}
