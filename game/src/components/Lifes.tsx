import { Box, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Lifes({ lifes }: { lifes: number }) {
    return (
      <Grid item xs={6}>
        <Box display="flex" justifyContent="flex-start" marginTop="6px">
          {Array.from({ length: lifes }, (_, index) => (
            <FavoriteIcon color="warning" key={index} />
          ))}
        </Box>
      </Grid>
    );
  }