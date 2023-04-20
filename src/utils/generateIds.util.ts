import { v4 } from "uuid";

const prefixMap: any = {
  "userDetail": "u",
  "league": "l",
  "gameweek": "g",
  "table": "t",
  "chip": "c",
  "chipEvent": "ce",
  "pointsTable": "pt",
  "teamDetail": "t",
  "fixture": "f",
  "fixtureEvent": "fe",
};
export const generateId = (schemaName: string): string => {
  return `${prefixMap[schemaName]}-${v4()}`;
};
