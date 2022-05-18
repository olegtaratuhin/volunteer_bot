import { getSheet } from "./utils";

export const REQUESTS_SHEET = "Requests"
export const LOGS_SHEET = "Logs"
export const CONFIG_SHEET = "Config"
export const FORM_SHEET = "Requests from form"

export class PersonContact {
    constructor(
        readonly telegramID: string,
        readonly firstName?: string,
        readonly lastName?: string,
        readonly phone?: string,
        readonly lang: string = "RU",
    ) {}
}

export class VolunteerContact {
    constructor(readonly telegramID: string) {}
}

export enum RequestStatus {
    Open = "Open",
    InProgress = "In progress",
    Closed = "Closed",
}

interface Record {
    asRecord(): any[]
    save(): void
}


/**
 * Collect name -> index mapping from header.
 * 
 * Note that this function doesn't use Map as it doesn't seem to be supported
 * well in app script.
 * 
 * @param header list of string names for columns
 * @returns object with properties for each name and corresponding column index
 */
export function getHeaderMap(header: Array<string>): object {
    let entry = {}
    for (let i = 0; i < header.length; i++) {
        entry[header[i]] =  i
    }
    return entry
}


export const LIST_SEP = "|"

export class HelpRequest implements Record {
    date: Date
    id: string

    constructor(
        readonly reporter: VolunteerContact,
        readonly contacts: string,
        readonly shortDescription: string,
        readonly fullDescription: string,
        readonly personalStory?: string,
        readonly language: string = "RU",
        readonly categories: Array<string> = [],
        public status: RequestStatus = RequestStatus.Open,
        public assignees: Array<PersonContact> = [],
    ) {
        this.date = new Date()
        this.id = Utilities.getUuid()
    }

    public static header(): Array<string> {
        return [
            "ID",
            "Date",
            "Reporter",
            "Contacts",
            "Short description",
            "Full description",
            "Personal story",
            "Language",
            "Categories",
            "Status",
            "Assignee (s)"
        ]
    }

    public static headerMap(): object{
        return getHeaderMap(HelpRequest.header())
    }

    public asRecord(): any[] {
        return [
            this.id,
            this.date,
            this.reporter,
            this.contacts,
            this.shortDescription,
            this.fullDescription,
            this.personalStory,
            this.language,
            this.categories.join(LIST_SEP),
            this.status,
            this.assignees.map(v => v.telegramID).join(LIST_SEP),
        ]
    }

    public save(): void {
        const sheet = getSheet(REQUESTS_SHEET)
        sheet.appendRow(this.asRecord())
    }
}


export class LogEntry implements Record {
    readonly date: Date

    constructor(
        readonly uid: string,
        readonly input: string,
        readonly output: string,
        readonly name?: string,
    ) {
        this.date = new Date()
    }

    public static header(): Array<string> {
        return [
            "Date",
            "UID",
            "Name",
            "Input",
            "Output",
        ]
    }

    public static headerMap(): object {
        return getHeaderMap(LogEntry.header())
    }

    public asRecord(): any[] {
        return [
            this.date,
            this.uid,
            this.name,
            this.input,
            this.output,
        ]
    }

    public save(): void {
        const sheet = getSheet(LOGS_SHEET)
        sheet.appendRow(this.asRecord())
    }
}


export class Config {
    constructor(
        readonly donationRequisites: string,
        readonly listOfNeeds: string,
        readonly allInfo: string,
    ) {}

    public static header(): Array<string> {
        return ["Donation Requisistes", "List of needs", "All info"]
    }

    public static headerMap(): object {
        return getHeaderMap(Config.header())
    }
}
