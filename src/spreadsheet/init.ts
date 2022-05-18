import { HelpRequest, LogEntry, Config } from "./model";
import { LOGS_SHEET, REQUESTS_SHEET, CONFIG_SHEET } from "./model";
import { getOrCreateSheet_, getHeader_, getRawValuesForHeaderMap, getSheet } from "./utils";

function arraysEqual_<T>(a: Array<T>, b: Array<T>): boolean {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
    }
    return true
}

function setupSheet(name: string, defaultHeader: Array<string>): void {
    let sheet = getOrCreateSheet_(name)
    const header = getHeader_(sheet)
    if (header != null && arraysEqual_(header, defaultHeader)) {
        Logger.log("Sheet %s is ready", name)
        return
    }
    if (Array.isArray(header) && header.length > 0) {
        Logger.log(
            "Remove content of sheet %s with unexpected header %s",
            name,
            header,
        )
        // sheet.clearContents()
    }
    sheet.appendRow(defaultHeader)
}

export function setupSpreadSheet(): void {
    setupSheet(REQUESTS_SHEET, HelpRequest.header())
    setupSheet(LOGS_SHEET, LogEntry.header())
    setupSheet(CONFIG_SHEET, Config.header())
}

export function readConfig(): Config {
    const data = getRawValuesForHeaderMap(
        getSheet(CONFIG_SHEET),
        Config.headerMap(),
    )
    const config = data[0]
    return new Config(
        config["Donation Requisistes"] as string,
        config["List of needs"] as string,
        config["All info"] as string,
    )
}

export function logRequest(
    uid: string,
    request: string,
    response: string,
    name?: string,
): void {
    const entry = new LogEntry(uid, request, response, name)
    let sheet = getSheet(LOGS_SHEET)
    sheet.appendRow(entry.asRecord())
}