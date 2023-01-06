import { Grid, Box, IconButton } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function LanguageSelect() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const handleChange = (lang: string) => {
    setLanguage(lang === "en" ? "es" : "en");
    i18n.changeLanguage(lang);
  };
  return (
    <Grid item xs={6}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
      >
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => handleChange(language)}
          color="inherit"
        >
          {language === "en" ? (
            <span className="fi fi-gb flag"></span>
          ) : (
            <span className="fi fi-es flag"></span>
          )}
        </IconButton>
        {language.toUpperCase()}

      </Box>
    </Grid>
  );
}
