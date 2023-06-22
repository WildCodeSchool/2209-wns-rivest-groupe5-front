import { Selector } from 'testcafe';
import registerPage from './pages/registerPage';

function generateRandomString() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let name = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    name += characters[randomIndex];
  }
  return name;
}

function generateRandomEmail() {
  const username = generateRandomString()
  return `${username}@email.com`;
}

fixture('Test different registration scenarios')
  .page('http://localhost:3000/register')


test('Submitting form with missing required input', async t => {
  const missingInputAlert = registerPage.messages.missingRequiredInputs
  await registerPage.submitForm()
  await t.expect(missingInputAlert.visible).ok('Missing required inputs alert should be visible')
})

test('Submitting invalid email', async t => {
  const randomString = generateRandomString()
  await registerPage.fillAllForm(randomString, randomString, randomString, randomString, randomString)
  await registerPage.submitForm()
  await t.expect(registerPage.messages.invalidEmail.visible).ok('Invalid email alert should be visible')
})

test('Submitting invalid password', async t => {
  const randomString = generateRandomString()
  const validEmail = generateRandomEmail()
  const invalidPassword = "azerty"
  await registerPage.fillAllForm(randomString, randomString, validEmail, invalidPassword, invalidPassword)
  await registerPage.submitForm()
  await t.expect(registerPage.messages.invalidPassword.visible).ok('Invalid password alert should be visible')
})


test('Submitting existing email', async t => {
  const randomString = generateRandomString()
  const validEmail = generateRandomEmail()
  const validPassword = "Azerty123!"
  // register not existing email account 
  await registerPage.fillAllForm(randomString, randomString, validEmail, validPassword, validPassword)
  await registerPage.submitForm()
  // register again the same email account
  await registerPage.fillAllForm(randomString, randomString, validEmail, validPassword, validPassword)
  await registerPage.submitForm()
  await t.expect(registerPage.messages.existingEmailAccount.visible).ok('Existing email account alert should be visible')
})

