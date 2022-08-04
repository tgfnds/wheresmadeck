export interface GetMyDeckData {
  officialInfo: OfficialInfo;
  personalInfo: PersonalInfo;
}

export interface OfficialInfo {
  reservationsStartedAt: string;
  lastDataUpdate: string;
  lastDataUpdateDate: string;
  lastShipments: LastShipments;
}

export interface LastShipments {
  EU: Storage;
  UK: Storage;
  US: Storage;
}

export interface Storage {
  "64": string;
  "256": string;
  "512": string;
}

export interface PersonalInfo {
  reservedAt: string;
  region: string;
  version: string;
  durationReservedAfterStart: string;
  durationReservedAfterStartHumanReadable: string;
  elapsedTimePercentage: number;
  prettyText: string;
  htmlText: string;
  latestOrderSeconds: number;
  latestOrder: string;
  historicData: HistoricDatum[];
}

export interface HistoricDatum {
  date: string;
  elapsedTimePercentage: number;
}
