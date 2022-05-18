import { setupTelegramIntegration } from "./telegram/init";
import { setupSpreadSheet, readConfig } from "./spreadsheet/init";

function main(): void {
    const botInitialized = setupTelegramIntegration()
    if (!botInitialized) {
        Logger.log("Telegram bot is not initialized, aborting");
        return
    }

    setupSpreadSheet()

    const config = readConfig()
    Logger.log(config.donationRequisites)
    Logger.log(config.listOfNeeds)
    Logger.log(config.allInfo)
}
