import { HelpRequest, LogEntry, Config } from "./model";
import { SPREADSHEET } from "../secrets";

export const REQUESTS_SHEET = "Requests"
export const LOGS_SHEET = "Logs"
export const CONFIG_SHEET = "Config"

function getOrCreateSheet_(name: string): GoogleAppsScript.Spreadsheet.Sheet {
    const app = SpreadsheetApp.getActive()
    let sheet = app.getSheetByName(name)
    if (sheet == null) {
        sheet = app.insertSheet(name)
    }
    return sheet
}

export function getSheet(name: string): GoogleAppsScript.Spreadsheet.Sheet {
    const app = SpreadsheetApp.openById(SPREADSHEET)
    const sheet = app.getSheetByName(name)
    if (sheet == null) {
        throw new Error(`Sheet with name ${name} not found`);
    }
    return sheet
}

function getHeader_(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
): Array<string> | null {
    const ranges = sheet.getDataRange()
    const values = ranges.getValues()
    if (values.length == 0) {
        return null
    }
    return values[0]
}

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

export function getRawValuesForHeaderMap(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    headerMap: object,
): Array<object> {
    const ranges = sheet.getDataRange()
    const values = ranges.getValues()
    values.shift()

    let entries: Array<object> = []
    for (var i = 0; i < values.length; ++i) {
        let item = {}
        for (const [key, offset] of Object.entries(headerMap)) {
            item[key] = values[i][offset]
        }
        entries.push(item)
    }

    return entries
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