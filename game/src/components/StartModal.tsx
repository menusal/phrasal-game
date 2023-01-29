import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../routes";
import Counter from "./Counter";

export default function StartModal({
  open,
  score,
  onClose,
}: {
  open: boolean;
  score: number;
  onClose: () => void;
}) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"> Your final score is</DialogTitle>
      <DialogContent className="modalContent">
        <DialogContentText id="alert-dialog-description">
          <Box display="flex" justifyContent="center">
            <Counter
              from={0}
              to={score}
              duration={2}
              variant="h3"
              color="primary"
            />
          </Box>
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
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
