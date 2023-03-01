import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { RecoilRoot } from "recoil";
import LoginPage from "../pages/LoginPage";
import { BrowserRouter } from "react-router-dom";

const GET_TOKEN_LOGIN = gql`
  query GetToken($email: String!, $password: String!) {
    getToken(email: $email, password: $password) {
      token
      userFromDB {
        userId
        email
        firstname
        lastname
      }
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_TOKEN_LOGIN,
      variables: {
        userId: 1,
      },
    },
    result: {
      data: {
        user: {
          id: 1,
          name: "John Doe",
          email: "johndoe@example.com",
        },
      },
    },
  },
];

describe("login page", () => {
  it("should render user email and password after typing these inputs", async () => {
    const userEmail = "bibi@email.com";
    const userPassword = "azerty";
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RecoilRoot>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </RecoilRoot>
      </MockedProvider>
    );
    const emailInputElement = screen.getByRole(/Email/);
    const passwordInputElement = screen.getByLabelText(/Pass/);

    //type email and password
    fireEvent.change(emailInputElement, { target: { value: userEmail } });
    fireEvent.change(passwordInputElement, { target: { value: userPassword } });

    //click on icon to show password

    const emailElement = screen.getAllByText(userEmail);
    const passwordElement = screen.getByText(userPassword);
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
  });
});
