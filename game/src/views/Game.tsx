import { useEffect, useState, createContext, useMemo } from "react";
import "../App.css";
import {
  Container,
  Grid,
  Grow,
  Typography,
  Button,
  Box,
  Zoom,
  LinearProgress,
} from "@mui/material";
import { Quiz } from "../types";
import useQuestion from "../hooks/useQuestion";
import useTimer from "../hooks/useTimer";
import useLifes from "../hooks/useLifes";
import useScore from "../hooks/useScore";
import JSConfetti from "js-confetti";
import { MAX_TIME } from "../config";
import StartModal from "../components/StartModal";
import Header from "../components/Header";
import Timer from "../components/Timer";
import { useTranslation } from "react-i18next";
import useScoreHystoryFromLocalStorage from "../hooks/useScoreHystoryFromLocalStorage";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../routes";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const jsConfetti = new JSConfetti();

export default function Game() {
  const [response, setResponse] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [animate, setAnimate] = useState<boolean>(false);
  const [startGame, setStartGame] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);

  const { t, i18n } = useTranslation();

  const { getQuiz } = useQuestion();

  const { addScore } = useScoreHystoryFromLocalStorage();

  const { time, timeFrom, isRunning, start, stop, reset } = useTimer();

  const { lifes, removeLife, resetLifes } = useLifes();

  const { score, addPoint, resetScore, scoreFrom } = useScore();

  const isNewGame = useMemo(() => {
    return lifes === 3 && !startGame;
  }, [lifes, startGame]);

  const resetGame = () => {
    resetLifes();
    reset();
    stop();
    if (score > 0) {
      setOpen(true);
      score > 0 && addScore(score);
    }
    setStartGame(false);
  };

  const fetchQuiz = async () => {setQuiz(null);
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
    setQuiz(null);
    setAnimate(false);
    setResponse("");
    setStartGame(true);
    setProgress(0);
    reset();

    // setTimeout(() => {
      fetchQuiz();
      setAnimate(true);
      start();
    // }, 100);
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
        lifes={lifes}
        isNewGame={isNewGame}
        top={true}
      />
      <Container maxWidth="sm">
        <StartModal open={open} onClose={handleClose} score={score} />
        <Grid container spacing={2} marginTop={8}>
          <Grid item xs={12}>
            {quiz && (
              <>
                <Box display={startGame ? "-moz-initial" : "none"}>
                  <Zoom in={animate && isRunning}>
                    <Box sx={{ width: "100%" }} marginTop={1}>
                      <Typography variant="h5">
                        {t("Play for")}{" "}
                        <Timer time={time} timeFrom={timeFrom} /> {t("points")}
                      </Typography>
                    </Box>
                  </Zoom>
                  <Zoom in={animate && isRunning}>
                    <Box sx={{ width: "100%", padding: "20px 0" }}>
                      <LinearProgress
                        variant="determinate"
                        sx={{
                          border: "2px solid #ff9600",
                          borderRadius: "5px",
                          backgroundColor: "transparent",
                          height: "16px",
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
                </Box>
                <Zoom in={animate}>
                  <Typography variant="h4">{quiz.question.name}</Typography>
                </Zoom>

                <Box>
                  {quiz.responses.map((option, index) => (
                    <Grow in={animate} timeout={500 * index} key={index}>
                      <Box
                        marginTop={3}
                        display={
                          response !== "" &&
                          option !== quiz.question.description &&
                          response !== option
                            ? "none"
                            : "-moz-initial"
                        }
                      >
                        <Button
                          fullWidth
                          disableFocusRipple={response !== ""}
                          disableRipple={response !== ""}
                          disableTouchRipple={response !== ""}
                          variant="contained"
                          sx={{ color: "white", fontWeight: "bold" }}
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
                </Box>
              </>
            )}
            <Box
              marginTop={8}
              display={response === "" ? "none" : "-moz-initial"}
            >
              <Button
                color="secondary"
                sx={{ color: "white", fontWeight: "bold" }}
                variant="contained"
                size="large"
                fullWidth
                onClick={handleNext}
              >
                {startGame ? t("Next") : t("Start")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
