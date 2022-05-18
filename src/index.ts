import { setupTelegramIntegration } from "./telegram/init";
import { sendMarkdownText, sendRawText } from "./telegram/io";
import { setupSpreadSheet, readConfig } from "./spreadsheet/init";
import { logRequest } from "./spreadsheet/init";

function main(): void {
    const botInitialized = setupTelegramIntegration()
    if (!botInitialized) {
        Logger.log("Telegram bot is not initialized, aborting");
        return
    }

    setupSpreadSheet()
}

function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.HTML.HtmlOutput {
    return HtmlService.createHtmlOutput("Hi there");
}

function doPost(e: GoogleAppsScript.Events.DoPost) {
    try {
        var data = JSON.parse(e.postData.contents);
        Logger.log("Data: %s", e.postData.contents);

        var text = data.message.text;
        var id = data.message.chat.id;
        var name = data.message.chat.first_name;

        const config = readConfig()
        let answer = ""
        if (text.includes("/start")) {
            answer = `Привіт!, ${name}`
        } else if (text.includes("/donations")) {
            answer = config.donationRequisites
        } else if (text.includes("/needs")) {
            answer = config.listOfNeeds
        } else if (text.includes("/info")) {
            answer = config.allInfo
        } else {
            Logger.log("Unknown command - %s", text);
        }

        logRequest(id, text, answer, name)
        sendRawText(id, answer)
    } catch (e) {
        Logger.log(e)
    }
}
