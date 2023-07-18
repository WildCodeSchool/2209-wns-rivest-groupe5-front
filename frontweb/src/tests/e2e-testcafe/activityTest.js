import { sampleUser } from "./roles/sampleUser"
import CreateActivityPage from "./pages/createActivityPage"

fixture('create activity')
    .page('http://localhost:3000/login')
test('create valid activity', async t => {
    await t.useRole(sampleUser)
        .navigateTo('http://localhost:3000/create-activity')
    // create valid activity
    await CreateActivityPage.createActivity('test', 'test', '10', '05/05/2024')
    // check modal confirming activity creation is displayed
    await t.expect(CreateActivityPage.modalSuccess.visible).ok('Modal confirming activity creation to be visible')
})


