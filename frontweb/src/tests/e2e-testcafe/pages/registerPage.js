import { Selector, t } from 'testcafe'
import { textList } from '../../../textList'
class RegisterPage {
  // firstname
  firstnameInput = Selector('#firstname')
  // lastname
  lastNameInput = Selector('#lastname')
  // email
  emailInput = Selector('#email')
  // password
  passwordInput = Selector('#password')
  // password confirm
  passwordConfirmInput = Selector('#passwordconfirm')
  // pictureUpload button
  uploadPictureButton = Selector('label').withText(new RegExp(textList.choosePicture, 'i'))
  // uploadPictureInput =  Selector('label').withText("Choisir une photo")
  uploadPictureInput = Selector('input[type="file"]')
  // submit button
  submitFormButton = Selector('button[type="submit"]')

  messages = {
    missingRequiredInputs: Selector('div[class*="MuiAlert-message"]').withText(
      textList.missingRequiredInputs
    ),
    invalidEmail: Selector('div[class*="MuiAlert-message"]').withText(
      textList.invalidEmail
    ),
    existingEmailAccount: Selector('div[class*="MuiAlert-message"]').withText(textList.existingEmailAccount),
    invalidPassword: Selector('div[class*="MuiAlert-message"]').withText(textList.invalidPassword),
    passwordsMismatch: Selector('div[class*="MuiAlert-message"]').withText(
      textList.passwordMismatch
    ),
  }
  modals = {
    success: {
      container: Selector('[id="modal-success"]'),
      text: Selector('[id="modal-success"]').withText(
        textList.registrationSuccess
      ),
      loginRedirectbutton: Selector('[id="modal-success"] button'),
    },
    failure: {
      container: Selector('[role="presentation"]'),
      text: Selector('[role="presentation"]').withText(
        textList.registrationFailure
      ),
      registerButton: Selector('[role="presentation"] button'),
    },
  }

  async fillInput(targetInput, inputValue) {
    await t.typeText(targetInput, inputValue, { replace: true })
  }

  // updload picture
  async uploadPicture() {
    await t.setFilesToUpload(this.uploadPictureInput, [
      '../../../public/logo192.png',
    ])
  }
  // fill form 
  async fillAllForm(firstname, lastname, email, password, passwordConfirm) {
    //fill firstname
    await this.fillInput(this.firstnameInput, firstname)
    //fill lastname
    await this.fillInput(this.lastNameInput, lastname)
    //fill email
    await this.fillInput(this.emailInput, email)
    //fill password
    await this.fillInput(this.passwordInput, password)
    //fill password confirm
    await this.fillInput(this.passwordConfirmInput, passwordConfirm)
    //upload picture
    await this.uploadPicture()
  }

  // submit form
  async submitForm() {
    await t.click(this.submitFormButton)
  }
}

export default new RegisterPage()
