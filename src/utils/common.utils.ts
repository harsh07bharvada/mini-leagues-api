import { KEYS } from '../constants/keys.constants'

export const removeKeysFromObject = (
  obj: Object,
  ...keysToRemove: Array<String>
): Object => {
  let sanitizedObj: any = {},
    keysRemovalSet = new Set(keysToRemove)
  for (let [key, value] of Object.entries(obj)) {
    if (!keysRemovalSet.has(key)) {
      sanitizedObj[key] = value
    }
  }
  return sanitizedObj
}

export const calculatePlayerPointsWithMultiplier = (
  playerPoints: any,
  multiplier: number
): number => {
  const pointsForGames: number = playerPoints.reduce(
    (eachGamePointsAcc: number, eachGamePoints: any) => {
      return (
        eachGamePointsAcc +
        eachGamePoints[KEYS.STATS].reduce(
          (eachPointCategoryAcc: number, pointStats: any) =>
            eachPointCategoryAcc + pointStats[KEYS.POINTS],
          0
        )
      )
    },
    0
  )
  return pointsForGames * multiplier
}
