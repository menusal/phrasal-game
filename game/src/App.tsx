import { useEffect, useState } from "react";
import "./App.css";
import {
  Container,
  Grid,
  Grow,
  Typography,
  Button,
  Box,
  Divider,
  Zoom,
} from "@mui/material";
import { Quiz } from "./types";
import useQuestion from "./hooks/useQuestion";
import useTimer from "./hooks/useTimer";
import useLifes from "./hooks/useLifes";
import useScore from "./hooks/useScore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import JSConfetti from "js-confetti";
import { MAX_SCORE } from "./config";

const jsConfetti = new JSConfetti();

function App() {
  const [response, setResponse] = useState<string>("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [animate, setAnimate] = useState<boolean>(false);

  const { getQuiz } = useQuestion();

  const { time, isRunning, start, stop, reset, formatTime } = useTimer();

  const { lifes, removeLife, resetLifes } = useLifes();

  const { score, addPoint, resetScore } = useScore();

  const resetGame = () => {
    resetLifes();
    resetScore();
    reset();
    stop();
  };

  const fetchQuiz = async () => {
    const quiz = await getQuiz();
    console.log(quiz);
    setQuiz(quiz);
  };

  useEffect(() => {
    fetchQuiz();
    setAnimate(true);
    start();
  }, []);

  useEffect(() => {
    if (lifes === 0) {
      resetGame();
      fetchQuiz();
    }
  }, [lifes]);

  const handleResponse = (response: string) => {
    setResponse(response);
    stop();
    reset();
    if (response === quiz?.question.description) {
      jsConfetti.addConfetti();
      addPoint(time);
    } else {
      removeLife();
    }
  };

  const handleNext = () => {
    setAnimate(false);
    setResponse("");
    setTimeout(() => {
      fetchQuiz();
      setAnimate(true);
      start();
    }, 1500);
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={1}>
        <Timer time={time} isRunning={isRunning} />
        <Score score={score} />
        <Lifes lifes={lifes} />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grow in={true}>
            <Box marginBottom={6} marginTop={3}>
              <Typography variant="h5" color="initial">
                Phrasal Verbs Quiz
              </Typography>
            </Box>
          </Grow>
          {/* <Grow in={true}>
            <Box marginBottom={3}>
              <Typography variant="h6" color="initial">
                {formatTime(time)}
              </Typography>
            </Box>
          </Grow> */}
          {quiz && (
            <>
              <Zoom in={animate}>
                <Typography variant="h5" color="initial">
                  {quiz.question.name}
                </Typography>
              </Zoom>

              <Box>
                {quiz.responses.map((option, index) => (
                  <Grow in={animate} timeout={500 * index} key={index}>
                    <Box marginTop={3}>
                      <Button
                        fullWidth
                        disableFocusRipple={response !== ""}
                        disableRipple={response !== ""}
                        disableTouchRipple={response !== ""}
                        variant="contained"
                        color={
                          response === ""
                            ? "primary"
                            : option === quiz.question.description
                            ? `success`
                            : response === option
                            ? `error`
                            : `primary`
                        }
                        size="large"
                        className="response"
                        onClick={
                          response === ""
                            ? () => handleResponse(option)
                            : () => {}
                        }
                      >
                        {option}
                      </Button>
                    </Box>
                  </Grow>
                ))}
                <Divider />
                <Box
                  marginTop={6}
                  display={response === "" ? "none" : "-moz-initial"}
                >
                  <Button
                    color="primary"
                    variant="outlined"
                    fullWidth
                    onClick={handleNext}
                  >
                    Siguiente
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;

function Lifes({ lifes }: { lifes: number }) {
  return (
    <Grid item xs={4}>
       <Box display="flex" justifyContent="flex-end">
      {Array.from({ length: lifes }, (_, index) => (
        <FavoriteIcon color="error" key={index} />
      ))}
      </Box>
    </Grid>
  );
}

function Score({ score }: { score: number }) {
  return (
    <Grid item xs={4}>
      <Typography variant="h6" color="initial">
        {score}
      </Typography>
    </Grid>
  );
}

function Timer({ time, isRunning }: { time: number, isRunning: boolean }) {

  const points = Math.floor(MAX_SCORE / time);

  return (
    <Grid item xs={4}>
      <Box display="flex" justifyContent="flex-start">
      <Typography variant="h6" color="initial">
        {isFinite(points) ? points : 0}
      </Typography>
      </Box>
    </Grid>
  );
}
