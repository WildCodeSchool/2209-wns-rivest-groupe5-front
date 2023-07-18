import { Role } from "testcafe"

const loginUrl = 'http://localhost:3000/login'

export const sampleUser = Role(loginUrl, async t => {
    await t
        .typeText('[name="email"]', 'sample.demo@dev.com')
        .typeText('[name="password"]', 'ABcd1234*')
        .click('button[type="submit"]')
})