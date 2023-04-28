import { fireEvent, render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { RecoilRoot } from 'recoil'
import LoginPage from '../pages/LoginPage'
import { BrowserRouter } from 'react-router-dom'

describe('login page', () => {
  it('should render user email and password after typing these inputs', async () => {
    const userEmail = 'bibi@email.com'
    const userPassword = 'azerty'
    const { container } = render(
      <MockedProvider addTypename={false}>
        <RecoilRoot>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </RecoilRoot>
      </MockedProvider>
    )

    const emailInputElement = screen.getByRole('textbox', { name: /E-mail/i })

    // eslint-disable-next-line
    const passwordInputElement = container.querySelector('input[id="password"]')

    //type email
    fireEvent.change(emailInputElement, { target: { value: userEmail } })

    //type password
    if (passwordInputElement) {
      fireEvent.change(passwordInputElement, {
        target: { value: userPassword },
      })
    }

    //check email value and password value
    expect(emailInputElement).toHaveValue(userEmail)
    expect(passwordInputElement).toHaveValue(userPassword)
  })
})
