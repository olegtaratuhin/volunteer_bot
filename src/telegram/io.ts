import { getBotUrl } from "./init";

export function sendRawText(
    id: string,
    text: string,
): GoogleAppsScript.URL_Fetch.HTTPResponse {
    const url = (
        `${getBotUrl()}/sendMessage?chat_id=${id}` +
        `&text=${encodeURIComponent(text)}`
    )
    const response = UrlFetchApp.fetch(url);
    return response;
}