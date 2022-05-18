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


/**
 * Collect name -> index mapping from header.
 * 
 * Note that this function doesn't use Map as it doesn't seem to be supported
 * well in app script.
 * 
 * @param header list of string names for columns
 * @returns object with properties for each name and corresponding column index
 */
function getHeaderMap(header: Array<string>): object {
    let entry = {}
    for (let i = 0; i < header.length; i++) {
        entry[header[i]] =  i
    }
    return entry
}


export class HelpRequest {
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
        this.id = Crypto.prototype.randomUUID()
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
            "Category",
            "Status",
            "Assignee (s)"
        ]
    }

    public static headerMap(): object{
        return getHeaderMap(HelpRequest.header())
    }
}


export class LogEntry {
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
