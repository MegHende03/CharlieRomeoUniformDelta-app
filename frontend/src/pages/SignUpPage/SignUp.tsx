import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../LogInPage/shared-theme/AppTheme";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";
import logo from "../../assets/noteLogo.svg";
import { signUp } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",

  backgroundColor: "hsl(0, 11%, 9%)",
  border: "1px solid #33cc9966",

  color: "white",

  boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",

  backdropFilter: "blur(8px)",

  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(circle at top, hsl(0, 9%, 15%), hsl(0, 18%, 3%))",
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useAuth();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const data = await signUp({
        fullname,
        email,
        password,
      });

      loginUser(data);

      console.log("Signup successful:", data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  }

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  return (
    <div className=".mode-dark">
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <SignUpContainer
          direction="column"
          sx={{ justifyContent: "space-between" }}
        >
          <div className="logo-title">
            <img className="logo-img" src={logo} alt="Logo" />
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <h1>notekeeper</h1>
            </a>
          </div>

          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel
                  htmlFor="name"
                  sx={{
                    color: "#33cc99",

                    "&.Mui-focused": {
                      color: "#ce7a1a",
                    },
                  }}
                >
                  Full name
                </FormLabel>
                <TextField
                  onChange={(e) => setFullname(e.target.value)}
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Jon Snow"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? "error" : "primary"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",

                      "& fieldset": {
                        borderColor: "#33cc9966",
                      },

                      "&:hover fieldset": {
                        borderColor: "#33cc99",
                      },

                      "&.Mui-focused fieldset": {
                        borderColor: "#ce7a1a",
                        borderWidth: "2px",
                      },
                    },

                    "& .MuiInputBase-input::placeholder": {
                      color: "rgba(255,255,255,0.5)",
                      opacity: 1,
                    },
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  htmlFor="email"
                  sx={{
                    color: "#33cc99",

                    "&.Mui-focused": {
                      color: "#ce7a1a",
                    },
                  }}
                >
                  Email
                </FormLabel>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={passwordError ? "error" : "primary"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",

                      "& fieldset": {
                        borderColor: "#33cc9966",
                      },

                      "&:hover fieldset": {
                        borderColor: "#33cc99",
                      },

                      "&.Mui-focused fieldset": {
                        borderColor: "#ce7a1a",
                        borderWidth: "2px",
                      },
                    },

                    "& .MuiOutlinedInput-root.Mui-focused": {
                      boxShadow: "0 0 0 3px rgba(206, 122, 26, 0.35)",
                    },
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  htmlFor="password"
                  sx={{
                    color: "#33cc99",

                    "&.Mui-focused": {
                      color: "#ce7a1a",
                    },
                  }}
                >
                  Password
                </FormLabel>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? "error" : "primary"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",

                      "& fieldset": {
                        borderColor: "#33cc9966",
                      },

                      "&:hover fieldset": {
                        borderColor: "#33cc99",
                      },

                      "&.Mui-focused fieldset": {
                        borderColor: "#ce7a1a",
                        borderWidth: "2px",
                      },
                    },

                    "& .MuiInputBase-input::placeholder": {
                      color: "rgba(255,255,255,0.5)",
                      opacity: 1,
                    },
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
                sx={{
                  backgroundColor: "#ce7a1a",

                  color: "white",

                  fontWeight: 600,
                }}
              >
                Sign up
              </Button>
            </Box>
            <Divider>
              <Typography sx={{ color: "text.secondary" }}>or</Typography>
            </Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert("Sign up with Google")}
                startIcon={<GoogleIcon />}
                sx={{
                  borderColor: "#33cc9966",
                  color: "white",

                  "&:hover": {
                    borderColor: "#33cc99",
                    backgroundColor: "rgba(51,204,153,0.08)",
                  },
                }}
              >
                Sign up with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert("Sign up with Facebook")}
                startIcon={<FacebookIcon />}
                sx={{
                  borderColor: "#33cc9966",
                  color: "white",

                  "&:hover": {
                    borderColor: "#33cc99",
                    backgroundColor: "rgba(51,204,153,0.08)",
                  },
                }}
              >
                Sign up with Facebook
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Log in
                </Link>
              </Typography>
            </Box>
          </Card>
        </SignUpContainer>
      </AppTheme>
    </div>
  );
}
