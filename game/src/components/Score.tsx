import { Box, Grid } from "@mui/material";

import Counter from "./Counter";

export default function Score({
  score,
  scoreFrom,
}: {
  score: number;
  scoreFrom: number;
}) {
  return (
    <Grid item xs={6}>
      <Box display="flex" justifyContent="flex-end">
        <Counter from={scoreFrom} to={score} duration={2} variant="h6" color="primary" />
      </Box>
    </Grid>
  );
}
