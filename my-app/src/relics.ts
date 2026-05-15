import Decimal from "break_eternity.js";
import { gameData } from "./main";
import { reactive } from "vue";
import { proofs } from "./ToI";

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
    },
    {
        name: "Eternity",
        invested: new Decimal(0),
        boost: new Decimal(1)
    },
    {
        name: "Alpha",
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

export function alphainvest(u: number) {
    let cost = relics[2].invested.pow(100)
    if (gameData.heavenlysigils.gte(cost)) {
        gameData.heavenlysigils = gameData.heavenlysigils.sub(cost)
        relics[u].invested = relics[u].invested.add(1)
    }
}
export function respec() {
    relics.forEach(r => {
        r.invested = new Decimal(0)
        r.boost = new Decimal(1)
        gameData.heavenlysigils = gameData.totalSigilsEarned
    })
}

export function phiboost() {
    const phi = relics[0]
    let effect = gameData.Time.add(1)
        .log(5)
        .pow(new Decimal(0.5))
        .pow(phi.invested.div(2))
        .add(1)
    return effect.toFixed(2)
}


export function eternityboost() {
    const eternity = relics[1]
    let effect = new Decimal(1).add(eternity.invested.mul(0.1))
    return effect.toFixed(2)
}

export function alphaboost() {
    const alpha = relics[2]
    let effect = new Decimal(1).add(alpha.invested.mul(0.1))
    return effect.toFixed(2)
}