import { getSheet } from "../spreadsheet/utils";
import { FORM_SHEET, HelpRequest, LIST_SEP } from "../spreadsheet/model";
import { FORM } from "../secrets";

export function setUpTriggers() {
    Logger.log("Setting up trigger: %s", appendWithFormatting)
    ScriptApp.newTrigger("appendWithFormatting")
        .forForm(FormApp.openById(FORM))
        .onFormSubmit()
        .create();
}

function appendWithFormatting(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
    Logger.log(e)
    const response = e.response.getItemResponses();
    const formattedResponse: Array<string> = [new Date().toDateString()];

    for (const x of response) {
        Logger.log("Parsing response item: %s", x)
        if (typeof x.getResponse() == "CheckboxItem") {
            formattedResponse.push(x.getResponse().getChoices().join(LIST_SEP))
        } else {
            formattedResponse.push(x.getResponse())
        }
    }
    
    getSheet(FORM_SHEET).appendRow(formattedResponse);

    copyRequestOnFormSubmited(formattedResponse)
}


const FORM_MAPPING = {
    "Volunteer (tg login or other)": "Reporter",
    "Contacts of the person requested help": "Contacts",
    "Short description of the item (to be displayed in bot menu)": "Short description",
    "Full description (to be displayed in bot messages)": "Full description",
    "Personal story": "Personal story",
    "Language": "Language",
    "Categories": "Categories",
}
export const FORM_REQUESTS = "Requests from form"

export function copyRequestOnFormSubmited(entries: string[]) {
    Logger.log(entries)

    // todo: fix this
    const newRequest = new HelpRequest(
        entries[1],
        entries[2],
        entries[3],
        entries[4],
        entries[5],
        entries[6],
        entries[7],
    )
    newRequest.save()
}