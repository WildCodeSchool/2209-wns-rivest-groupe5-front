import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../interfaces/user";

const CREATE_USER = gql`
  mutation CreateUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      userId
      firstname
      lastname
      email
    }
  }
`;

const RegisterPage = () => {
  const [passwordsMatching, setPasswordsMatching] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserInterface>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordconfirm: "",
  });

  const navigate = useNavigate();
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordsMatching(true);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { password, passwordconfirm } = userData;
    if (password !== passwordconfirm) {
      setPasswordsMatching(false);
    } else {
      createUser({
        variables: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          password: userData.password,
        },
        onCompleted(data) {
          alert("Account created with success");
          navigate("/login");
        },
        onError(error) {
          alert(`Registration failed: ${error.message}`);
        },
      });
    }
  }

  if (loading) return <h1>Loading....</h1>;
  if (error) return <h1>{`Submission error! ${error.message}`}</h1>;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "25%",
          margin: "auto",
        }}
      >
        {/* firstName */}
        <label htmlFor="firstname">First name</label>
        <input
          type="text"
          name="firstname"
          value={userData.firstname}
          onChange={handleChange}
        />

        {/* lastName */}
        <label htmlFor="lastname">Last name</label>
        <input
          type="text"
          name="lastname"
          value={userData.lastname}
          onChange={handleChange}
        />

        {/* email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />

        {/* password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />

        {/* password confirm */}
        {!passwordsMatching && <h1>Passwords don't match</h1>}
        <label>Confirm password</label>
        <input
          type="password"
          name="passwordconfirm"
          value={userData.passwordconfirm}
          onChange={handleChange}
        />

        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
