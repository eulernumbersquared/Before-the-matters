import Decimal from "break_eternity.js";
import { gameData } from "./main";
import { reactive } from "vue";

export function checkMilestones() {
  const sigilsEarned = gameData.Time.log(1e5).floor()
  if (sigilsEarned.gt(gameData.totalSigilsEarned)) {
    const newSigils = sigilsEarned.sub(gameData.totalSigilsEarned)
    gameData.heavenlysigils = gameData.heavenlysigils.add(newSigils)
    gameData.totalSigilsEarned = sigilsEarned
  }
}


export function nextMilestoneInfo() {
  const currentSigils = gameData.totalSigilsEarned
  const nextMilestone = Decimal.pow(1e5, currentSigils.add(1))
  return `Next sigil at ${nextMilestone.toExponential(2)} Time`
}

export interface relic {
    name: string,
    invested: Decimal,
    boost: Decimal,
}

export const relics: relic[] = reactive([
    {
        name: "Phi",
        invested: new Decimal(0),
        boost: new Decimal(1)
    }
])

export function invest(u: number) {
    if (gameData.heavenlysigils.gte(1)) {
        gameData.heavenlysigils = gameData.heavenlysigils.sub(1)
        relics[u].invested = relics[u].invested.add(1)
    }
}

export function phiboost() {
    const phi = relics[0]
    let effect = gameData.Time.add(1).log(5).pow(1/2).pow(phi.invested.div(2))
    return effect.toFixed(2)
}