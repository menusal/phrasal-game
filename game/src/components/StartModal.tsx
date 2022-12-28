import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
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
          <>
            <Counter
              from={0}
              to={score}
              duration={2}
              variant="h3"
              color="primary"
            />
          </>
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
