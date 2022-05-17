import { HelpRequest, LogEntry } from "./model";

export const REQUESTS_SHEET = "Requests"
export const LOGS_SHEET = "Logs"

function getOrCreateSheet(name: string): GoogleAppsScript.Spreadsheet.Sheet {
    const app = SpreadsheetApp.getActive()
    let sheet = app.getSheetByName(name)
    if (sheet == null) {
        sheet = app.insertSheet(name)
    }
    return sheet
}

function getHeader(sheet: GoogleAppsScript.Spreadsheet.Sheet): Array<string> | null {
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
    let sheet = getOrCreateSheet(name)
    const header = getHeader(sheet)
    if (header != null && arraysEqual_(header, defaultHeader)) {
        Logger.log("Sheet %s is ready", name)
        return
    }
    if (Array.isArray(header) && header.length > 0) {
        Logger.log("Remove content of sheet %s with unexpected header %s", name, header)
        sheet.clearContents()
    }
    sheet.appendRow(defaultHeader)
}

export function setupSpreadSheet(): void {
    setupSheet(REQUESTS_SHEET, HelpRequest.header())
    setupSheet(LOGS_SHEET, LogEntry.header())
}