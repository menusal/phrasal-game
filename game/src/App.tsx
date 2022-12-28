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
  AppBar,
  IconButton,
  Toolbar,
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
import StartModal from "./components/StartModal";

const jsConfetti = new JSConfetti();

function App() {
  const [response, setResponse] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [animate, setAnimate] = useState<boolean>(false);
  const [buttonTex, setButtonText] = useState<string>("Start");

  const { getQuiz } = useQuestion();

  const { time, isRunning, start, stop, reset, formatTime } = useTimer();

  const { lifes, removeLife, resetLifes } = useLifes();

  const { score, addPoint, resetScore } = useScore();

  const resetGame = () => {
    resetLifes();
    reset();
    stop();
    setOpen(true);
    setButtonText("Start new game");
  };

  const fetchQuiz = async () => {
    const quiz = await getQuiz();

    setQuiz(quiz);
  };

  useEffect(() => {
    setResponse("start");
    setUpGame();
    resetGame();
  }, []);

  useEffect(() => {
    if (lifes === 0) {
      resetGame();
    }
  }, [lifes]);

  const setUpGame = () => {
    setOpen(false);
    setAnimate(true);
  };

  const startGame = () => {
    setUpGame();
    fetchQuiz();
    start();
  };

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
    setButtonText("Next");

    setTimeout(() => {
      fetchQuiz();
      setAnimate(true);
      start();
    }, 1500);
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <StartModal open={open} onClose={() => setOpen(false)} score={score} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grow in={true}>
              <Box marginBottom={6} marginTop={3}>
                <Typography variant="h5" color="initial">
                  Phrasal Verbs Quiz
                </Typography>
              </Box>
            </Grow>
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
                </Box>
              </>
            )}
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
                {buttonTex}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );

  function Header() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "transparent" }}>
          <Toolbar>
            <Grid container>
              <Score score={score} />
              <Timer time={time} isRunning={isRunning} />
              <Lifes lifes={lifes} />
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
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
      <Box display="flex" justifyContent="flex-start">
        <Typography variant="h6" color="initial">
          {score}
        </Typography>
      </Box>
    </Grid>
  );
}

function Timer({ time, isRunning }: { time: number; isRunning: boolean }) {
  const points = Math.floor(MAX_SCORE / time);

  return (
    <Grid item xs={4}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h6" color="initial">
          {isFinite(points) ? points : 0}
        </Typography>
      </Box>
    </Grid>
  );
}
