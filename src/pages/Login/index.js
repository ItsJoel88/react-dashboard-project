import React, { useRef } from "react";

function Login() {
  const username = useRef("");
  const password = useRef("");
  return (
    <>
      <form
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          ref={username}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={password}
        />
        <button
          type="submit"
          onClick={(e) => {
            return e;
          }}
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
