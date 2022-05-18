import { SPREADSHEET } from "../secrets";

export function getOrCreateSheet_(name: string): GoogleAppsScript.Spreadsheet.Sheet {
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

export function getHeader_(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
): Array<string> | null {
    const ranges = sheet.getDataRange()
    const values = ranges.getValues()
    if (values.length == 0) {
        return null
    }
    return values[0]
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