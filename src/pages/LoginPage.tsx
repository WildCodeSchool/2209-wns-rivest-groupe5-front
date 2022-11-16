import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    console.log("email typed >>>>", email);
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    console.log("password type >>>>", password);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userInfos = {
        email: email,
        password: password
    }
    console.log("user infos >>>>", userInfos);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email</label>
      <input id="email" type="text" required onChange={handleEmail} />
      <label htmlFor="password">password</label>
      <input id="password" type="password"  required onChange={handlePassword} />
      <button>Login</button>
    </form>
  );
};

export default LoginPage;
