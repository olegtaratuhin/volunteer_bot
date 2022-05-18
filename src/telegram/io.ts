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

export function sendMarkdownText(
    id: string,
    md: string,
): GoogleAppsScript.URL_Fetch.HTTPResponse {
    const url = (
        `${getBotUrl()}/sendMessage?chat_id=${id}` +
        `&text=${encodeURIComponent(md)}&parse_mode=MarkdownV2`
    )
    return UrlFetchApp.fetch(url)
}