import { readConfig } from "../spreadsheet/init";
import { getBotUrl } from "./init";

export function sendRawText(
    id: string,
    text: string,
): GoogleAppsScript.URL_Fetch.HTTPResponse {
    const url = (
        `${getBotUrl()}/sendMessage?chat_id=${id}` +
        `&text=${encodeURIComponent(text)}`
    )
    return UrlFetchApp.fetch(url)
}

function debug() {
    const config = readConfig()
    sendMarkdownText("365247855", config.allInfo) 
}

export function sendMarkdownText(
    id: string,
    md: string,
): GoogleAppsScript.URL_Fetch.HTTPResponse {
    const msg = (
        md
        .replace(/\_/g, '\\_')
        .replace(/\*/g, '\\*')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\~/g, '\\~')
        .replace(/\`/g, '\\`')
        .replace(/\>/g, '\\>')
        .replace(/\#/g, '\\#')
        .replace(/\+/g, '\\+')
        .replace(/\-/g, '\\-')
        .replace(/\=/g, '\\=')
        .replace(/\|/g, '\\|')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\./g, '\\.')
        .replace(/\!/g, '\\!')
    )

    const url = (
        `${getBotUrl()}/sendMessage?chat_id=${id}` +
        `&text=${encodeURIComponent(msg)}&parse_mode=MarkdownV2`
    )
    return UrlFetchApp.fetch(url)
}