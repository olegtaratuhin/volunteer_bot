import { setupTelegramIntegration } from "./telegram/init";
import { setupSpreadSheet } from "./spreadsheet/init";

function main(): void {
    const botInitialized = setupTelegramIntegration()
    if (!botInitialized) {
        Logger.log("Telegram bot is not initialized, aborting");
        return
    }

    setupSpreadSheet()
}
