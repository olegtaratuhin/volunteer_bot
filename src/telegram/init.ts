import { TOKEN, WEB_APP } from "../secrets";

export function getBotUrl(): string {
    return `https://api.telegram.org/bot${TOKEN}`
}

export function getBotInfo(): GoogleAppsScript.URL_Fetch.HTTPResponse {
    const response = UrlFetchApp.fetch(getBotUrl() + "/getMe")
    return response
}
  
export function setWebhook(): GoogleAppsScript.URL_Fetch.HTTPResponse {
    const url = getBotUrl() + "/setWebhook?url=" + WEB_APP
    const response = UrlFetchApp.fetch(url)
    return response
}

export function setupTelegramIntegration(): boolean {
    const tokenValidationReponse = getBotInfo()
    Logger.log("Token validation returned: %s", tokenValidationReponse);
    if (tokenValidationReponse.getResponseCode() != 200) {
        return false
    }
    const setWebHookResponse = setWebhook()
    Logger.log("Webhook initialized: %s", setWebHookResponse)
    if (setWebHookResponse.getResponseCode() != 200) {
        return false
    }
    return true
}