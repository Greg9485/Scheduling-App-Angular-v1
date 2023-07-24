import { FirstLevelDivision } from "./first-level-division";

export class Country {
    id: number;
    country: string;
    createdDate: Date;
    createdTime: string;
    lastUpdated: Date;
    lastUpdatedBy: number; //userID
    division: FirstLevelDivision[];
}
