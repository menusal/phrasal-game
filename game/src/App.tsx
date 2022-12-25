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
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

function App() {
  const [response, setResponse] = useState<string>("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [animate, setAnimate] = useState<boolean>(false);

  const { getQuiz } = useQuestion();

  const fetchQuiz = async () => {
    const quiz = await getQuiz();
    console.log(quiz);
    setQuiz(quiz);
  };

  useEffect(() => {
    fetchQuiz();
    setAnimate(true);
  }, []);

  const handleResponse = (response: string) => {
    setResponse(response);
    if (response === quiz?.question.description) {
      jsConfetti.addConfetti();
    }
  };

  const handleNext = () => {
    setAnimate(false);
    setResponse("");
    setTimeout(() => {
      fetchQuiz();
      setAnimate(true);
    }, 1500);
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grow in={true}>
            <Box marginBottom={6}>
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
