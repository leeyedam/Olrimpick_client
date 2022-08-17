import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import axios from "axios";
import styled from "styled-components";

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
    padding: 40px;
    margin: auto;
    height: 500px;
  }

  h1 {
    font-weight: 300;
    color: white;
    text-align: center;
    padding-bottom: 10px;
    margin-top: 0;
    border-bottom: 1px solid rgb(79, 98, 148);
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
    border-radius: 4px;
    border: 1px solid white;
    padding: 10px 15px;
    margin-bottom: 10px;
    font-size: 14px;
  }

  label {
    line-height: 2;
    text-align: left;
    display: block;
    margin-bottom: 9px;
    margin-top: 20px;
    color: white;
    font-size: 14px;
    font-weight: 300;
  }

  button[type="submit"],
  input[type="submit"] {
    background: #ec5990;
    color: white;
    text-transform: uppercase;
    border: none;
    margin-top: 40px;
    padding: 20px;
    font-size: 16px;
    font-weight: 200;
    letter-spacing: 10px;
  }

  button[type="submit"]:hover,
  input[type="submit"]:hover {
    background: #bf1650;
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
    border-radius: 4px;
    border: 1px solid white;
    padding: 10px 15px;
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

const cookies = new Cookies();

export default function Auth() {
  const [isSignup, setIsSignup] = useState(true);
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
    const URL = "https://olrim-pick-first.vercel.app/auth";
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
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Olrim Pick</h1>
        <label>Name</label>
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
        <label>Password</label>
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
        <label>Password Check</label>
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
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ backgroundColor: "#59b4ec" }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
        <div className="auth__form-container_fields-account">
          <p style={{ fontSize: "14px" }}>
            {isSignup
              ? "혹시 이미 가입된 아이디가 있으신가요? "
              : "아직 회원이 아니신가요?"}
            <span onClick={switchMode}>{isSignup ? "Login" : "Sign Up"}</span>
          </p>
        </div>
      </form>
    </Container>
  );
}
