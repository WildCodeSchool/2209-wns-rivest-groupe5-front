import { Selector, t } from 'testcafe'


class CreateActivityPage {
    title = Selector('input[name="title"]')
    description = Selector('input[name="description"]')
    activityType = Selector('div[id="type"]')
    activityDropDownList = Selector('ul[role="listbox"]')
    energyActivityType = Selector('li[data-value="4"]')
    carbonQtity = Selector('input[name="carbonQtity"]')
    calendarDropDownButton = Selector('[aria-label="Choose date"]')
    calendarFirstDate = Selector('button[role="gridcell"]')
    modalSuccess  = Selector('div').withText(/Activité créée avec succès/)
    publishButton = Selector('button').withText(/Publier/i)

    async createActivity(title, description, carbonQtity, date) {
        await t.typeText(this.title, title, { replace: true })
            .typeText(this.description, description, { replace: true })
            .typeText(this.carbonQtity, carbonQtity, { replace: true })
            .click(this.calendarDropDownButton)
            .click(this.calendarFirstDate)
            .click(this.publishButton)
    }
}


export default new CreateActivityPage()