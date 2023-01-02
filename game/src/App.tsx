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
  LinearProgress,
} from "@mui/material";
import { Quiz } from "./types";
import useQuestion from "./hooks/useQuestion";
import useTimer from "./hooks/useTimer";
import useLifes from "./hooks/useLifes";
import useScore from "./hooks/useScore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import JSConfetti from "js-confetti";
import { MAX_SCORE, MAX_TIME } from "./config";
import StartModal from "./components/StartModal";
import Counter from "./components/Counter";
import { Opacity } from "@mui/icons-material";

const jsConfetti = new JSConfetti();

function App() {
  const [response, setResponse] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [animate, setAnimate] = useState<boolean>(false);
  const [buttonTex, setButtonText] = useState<string>("Start");
  const [progress, setProgress] = useState(0);

  const { getQuiz } = useQuestion();

  const { time, timeFrom, isRunning, start, stop, reset } = useTimer();

  const { lifes, removeLife, resetLifes } = useLifes();

  const { score, addPoint, resetScore, scoreFrom } = useScore();

  const resetGame = () => {
    resetLifes();
    reset();
    stop();
    score > 0 && setOpen(true);
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

  useEffect(() => {
    console.log("isRunning", isRunning);
  }, [isRunning]);


  useEffect(() => {
    console.log("time", time, progress);
    // set proggress based in MAX_TIME and time
    setProgress((time / MAX_TIME) * 100);

    if (time === MAX_TIME) {
      handleNext();
    }

  }, [time]);

  const setUpGame = () => {
    setOpen(false);
    setAnimate(true);
  };

  const handleResponse = (response: string) => {
    setResponse(response);
    stop();
    reset();
    if (response === quiz?.question.description) {
      jsConfetti.addConfetti();
      addPoint(time > 0 ? time : 1);
    } else {
      removeLife();
    }
  };

  const handleNext = () => {
    setAnimate(false);
    setResponse("");
    setButtonText("Next");
    setProgress(0);
    reset();

    setTimeout(() => {
      fetchQuiz();
      setAnimate(true);
      start();
    }, 1500);
  };

  const handleClose = () => {
    setOpen(false);
    resetScore();
  };

  return (
    <>
      <Header
        score={score}
        scoreFrom={scoreFrom}
        time={time}
        timeFrom={timeFrom}
        lifes={lifes}
        isRunning={isRunning}
      />
      <Container maxWidth="sm">
        <StartModal open={open} onClose={handleClose} score={score} />
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
                <Zoom in={animate && isRunning}>
                  <Box sx={{ width: "100%"}}>
                    <Typography variant="h5" color="initial">
                      Play for{" "}
                      <Timer
                        time={time}
                        isRunning={isRunning}
                        timeFrom={timeFrom}
                      />{" "}
                      points
                    </Typography>
                  </Box>
                </Zoom>
                <Zoom in={animate && isRunning}>
                  <Box sx={{ width: "100%", padding: "20px 0" }}>
                    <LinearProgress
                      variant="determinate"
                      // color={
                      //   time > 5 ? "warning" : time > 15 ? "error" : "success"
                      // }
                      sx={{
                        backgroundColor: "transparent",
                        height: "6px",
                        "& > .MuiLinearProgress-bar": {
                          backgroundColor:
                          progress > 70 ? "red" : progress > 25 ? "yellow" : "green",
                        },
                      }}
                      value={progress}
                    />
                  </Box>
                </Zoom>
                <Zoom in={animate}>
                  <Typography variant="h4" color="initial">
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
}

export default App;

function Header({
  score,
  scoreFrom,
  time,
  timeFrom,
  isRunning,
  lifes,
}: {
  score: number;
  scoreFrom: number;
  time: number;
  timeFrom: number;
  isRunning: boolean;
  lifes: number;
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "transparent" }}>
        <Toolbar>
          <Grid container>
            <Score score={score} scoreFrom={scoreFrom} />
            <Lifes lifes={lifes} />
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function Lifes({ lifes }: { lifes: number }) {
  return (
    <Grid item xs={6}>
      <Box display="flex" justifyContent="flex-end">
        {Array.from({ length: lifes }, (_, index) => (
          <FavoriteIcon color="error" key={index} />
        ))}
      </Box>
    </Grid>
  );
}

function Score({ score, scoreFrom }: { score: number; scoreFrom: number }) {
  return (
    <Grid item xs={6}>
      <Box display="flex" justifyContent="flex-start">
        <Counter from={scoreFrom} to={score} duration={2} variant="h6" />
      </Box>
    </Grid>
  );
}

function Timer({
  time,
  timeFrom,
  isRunning,
}: {
  time: number;
  timeFrom: number;
  isRunning: boolean;
}) {
  const points = Math.floor(MAX_SCORE / time) || 0;
  const pointsFrom = Math.floor(MAX_SCORE / timeFrom) || 0;

  return (
    <Counter
      from={isFinite(pointsFrom) ? pointsFrom : 0}
      to={isFinite(points) ? points : 0}
      duration={1}
      variant="h5"
    />
  );
}
