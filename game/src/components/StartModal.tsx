import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

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
      <DialogTitle id="alert-dialog-title">Phrasal Verbs Quiz</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box>
            <Typography variant="h1" color="primary">
              {score}
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
