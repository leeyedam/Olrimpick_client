import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import axios from "axios";
import styled from "styled-components";
import { createTheme, LinearProgress, ThemeProvider } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";

const Container = styled.div`
  body {
    background: #0e101c;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
  }

  form {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 500px;
    padding: 0 60px;
    margin: auto;
    height: 420px;
  }

  h1 {
    font-weight: 900;
    font-size: 2.8em;
    color: white;
    text-align: center;
    padding-bottom: 5px;
    margin-top: 0;
  }

  .form {
    background: #0e101c;
    max-width: 400px;
    margin: 0 auto;
  }

  p {
    color: #bf1650;
  }

  p::before {
    display: inline;
    content: "⚠ ";
  }

  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 8px;
    padding: 15px 15px;
    margin-bottom: 30px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
  }

  input:focus {
    outline: none;
  }

  label {
    line-height: 2;
    text-align: left;
    display: block;
    margin-bottom: 9px;
    margin-top: 15px;
    color: white;
    font-size: 14px;
    font-weight: 400;
  }

  button[type="submit"],
  input[type="submit"] {
    background: linear-gradient(
      198deg,
      rgba(234, 110, 110, 1) 7%,
      rgba(147, 117, 254, 1) 98%
    );
    color: white;
    text-transform: uppercase;
    border: none;
    margin-top: 40px;
    padding: 15px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 7px;
  }

  button[type="submit"]:hover,
  input[type="submit"]:hover {
    background: #9375fe;
    color: #233a4e;
    cursor: pointer;
  }

  button[type="submit"]:active,
  input[type="button"]:active,
  input[type="submit"]:active {
    transition: 0.3s all;
    transform: translateY(3px);
    border: 1px solid transparent;
    opacity: 0.8;
  }

  input:disabled {
    opacity: 0.4;
  }

  input[type="button"]:hover {
    transition: 0.3s all;
  }

  button[type="submit"],
  input[type="button"],
  input[type="submit"] {
    -webkit-appearance: none;
  }

  .App {
    max-width: 600px;
    margin: 0 auto;
  }

  button[type="button"] {
    display: block;
    appearance: none;
    background: #333;
    color: white;
    border: none;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 4px;
  }

  hr {
    margin-top: 30px;
  }

  button {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 45px;
    border: 1px solid white;
    padding: 10px 15px;
    margin-bottom: 10px;
    font-size: 14px;
  }
  span {
    margin-left: 4px;
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: "#9375fe",
    },
    secondary: {
      main: "#233a4e",
    },
  },
});

const cookies = new Cookies();

export default function Auth() {
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
    },
  });

  const handleChange = (e, name) => {
    setValue(name, e.target.value);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    const URL = "https://olrimpick.herokuapp.com/auth";
    // const URL = 'https://medical-pager.herokuapp.com/auth';

    const {
      data: { token, userId, hashedPassword },
    } = await axios
      .post(`${URL}/${isSignup ? "signup" : "login"}`, {
        username,
        password,
      })
      .catch((err) => alert(err.response.data.message));

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("userId", userId);

    if (isSignup) {
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  useEffect(() => {
    register("username");
  }, [register]);

  const { username, password } = watch();

  return (
    <>
      <div
        className="auth-bg"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      ></div>
      <Container>
        {loading ? (
          <form>
            <ThemeProvider theme={theme}>
              <div style={{ marginTop: "180px", padding: "20px" }}>
                <LinearProgress sx={{ height: "8px", borderRadius: "20px" }} />
                <h3 style={{ color: "#fff", textAlign: "center" }}>
                  Loading...
                </h3>
              </div>
            </ThemeProvider>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>
              Olrim Pick
              <TelegramIcon
                fontSize="medium"
                sx={{
                  verticalAlign: "top",
                  marginLeft: "3px",
                  marginTop: "-6px",
                }}
              />
            </h1>
            <input
              name="username"
              type="text"
              placeholder="name"
              value={username}
              onChange={(e) => handleChange(e, "username")}
              {...register("username", {
                required: true,
                maxLength: 20,
                minLength: 4,
              })}
            />
            {errors.username?.type === "required" && (
              <p style={{ fontSize: "14px" }}>필수 항목입니다.</p>
            )}
            {errors.username?.type === "minLength" && (
              <p style={{ fontSize: "14px" }}>4글자 이상 입력해 주세요.</p>
            )}
            <input
              name="password"
              type="password"
              placeholder="password"
              {...register("password", {
                required: true,
                maxLength: 12,
                minLength: 6,
              })}
            />
            {errors.password?.type === "required" && (
              <p style={{ fontSize: "14px" }}>필수 항목입니다.</p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={{ fontSize: "14px" }}>6글자 이상 입력해 주세요.</p>
            )}
            <input
              type="password"
              placeholder="passwordCheck"
              {...register("passwordCheck", {
                validate: (value) => value === password,
              })}
            />
            {errors.passwordCheck?.type === "validate" && (
              <p style={{ fontSize: "14px" }}>패스워드와 일치하지 않습니다.</p>
            )}
            <button type="submit" disabled={isSubmitting}>
              {isSignup ? "Sign Up" : "Login"}
            </button>
            <div className="auth__form-container_fields-account">
              <p style={{ fontSize: "14px", color: "#fff" }}>
                {isSignup
                  ? "혹시 이미 가입된 아이디가 있으신가요? "
                  : "아직 회원이 아니신가요?"}
                <span onClick={switchMode}>
                  {isSignup ? "Login" : "Sign Up"}
                </span>
              </p>
            </div>
          </form>
        )}
      </Container>
    </>
  );
}
