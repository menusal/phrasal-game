import { useEffect, useState, createContext, useMemo } from "react";
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
  LinearProgress,
} from "@mui/material";
import { Quiz } from "./types";
import useQuestion from "./hooks/useQuestion";
import useTimer from "./hooks/useTimer";
import useLifes from "./hooks/useLifes";
import useScore from "./hooks/useScore";
import JSConfetti from "js-confetti";
import { MAX_TIME } from "./config";
import StartModal from "./components/StartModal";
import Header from "./components/Header";
import Timer from "./components/Timer";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./components/LanguageSelect";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { green, purple } from '@mui/material/colors';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const jsConfetti = new JSConfetti();

function App() {
  const [response, setResponse] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [animate, setAnimate] = useState<boolean>(false);
  const [startGame, setStartGame] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);

  const { t, i18n } = useTranslation();

  const { getQuiz } = useQuestion();

  const { time, timeFrom, isRunning, start, stop, reset } = useTimer();

  const { lifes, removeLife, resetLifes } = useLifes();

  const { score, addPoint, resetScore, scoreFrom } = useScore();

  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#155a4a',
          },
          secondary: {
            main: '#ffda79',
          },
        },
        
      }),
    [mode]
  );

  const resetGame = () => {
    resetLifes();
    reset();
    stop();
    score > 0 && setOpen(true);
    setStartGame(false);
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
    setStartGame(true);
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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
              { lifes === 3 && !startGame && (
              <Grow in={true}>
                <Box marginBottom={3} marginTop={3}>
                  <Typography variant="h5">
                    Phrasal Verbs Quiz
                  </Typography>
                </Box>
              </Grow>
              )}
              {quiz && (
                <>
                  <Zoom in={animate && isRunning}>
                    <Box sx={{ width: "100%" }} marginTop={3}>
                      <Typography variant="h5">
                        Play for <Timer time={time} timeFrom={timeFrom} />{" "}
                        points
                      </Typography>
                    </Box>
                  </Zoom>
                  <Zoom in={animate && isRunning}>
                    <Box sx={{ width: "100%", padding: "20px 0" }}>
                      <LinearProgress
                        variant="determinate"
                        sx={{
                          backgroundColor: "transparent",
                          height: "6px",
                          "& > .MuiLinearProgress-bar": {
                            backgroundColor:
                              progress > 70
                                ? "red"
                                : progress > 25
                                ? "yellow"
                                : "green",
                          },
                        }}
                        value={progress}
                      />
                    </Box>
                  </Zoom>
                  <Zoom in={animate}>
                    <Typography variant="h4">
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
                  color="secondary"
                  variant="contained"
                  fullWidth
                  onClick={handleNext}
                >
                  {startGame ? t("Next") : t("Start new game")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
