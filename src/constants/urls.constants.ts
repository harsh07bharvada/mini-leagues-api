export const URLS = {
  GET_USER_DETAILS: 'https://fantasy.premierleague.com/api/entry/',
  GET_CURRENT_EVENT_STATUS:
    'https://fantasy.premierleague.com/api/event-status/',
  GET_CURRENT_EVENT_DETAILS:
    'https://fantasy.premierleague.com/api/fixtures/?event=',
  GET_BOOTSTRAP_DATA: 'https://fantasy.premierleague.com/api/bootstrap-static/',
  GET_LIVE_DATA_FOR_GAMEWEEK: (gameweekID: String) =>
    `https://fantasy.premierleague.com/api/event/${gameweekID}/live/`,
  GET_TVT_LEAGUE_DATA: (leagueID: String) =>
    `https://fantasy.premierleague.com/api/leagues-classic/${leagueID}/standings/?page_new_entries=1&page_standings=1&phase=1`,
}

export const LEAGUES = {
  TVT_LEAGUE_ID: 271632,
}
