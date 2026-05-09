import Decimal from "break_eternity.js";
import { gameData } from "./main";
import { relics } from "./relics";
import { reset, memchallenges } from "./memchall";
import { reactive } from "vue";

export function calculateEntropygain() {
    let gain = new Decimal(0)
    gain = Decimal.max(0, gameData.Time.div(1e50).log10()).pow(0.5).add(1)
    return gain
}

export function entropyreset() {
    if (gameData.Time.gte(1e50)) {
        gameData.Time = new Decimal(1e50)
        gameData.baseTimeGain = new Decimal(1),
        gameData.rejunlock = false,
        gameData.memchallunlock = false,
        gameData.heavenlysigils = new Decimal(0),
        gameData.milestones = [new Decimal(1e6), new Decimal(1e9), new Decimal(1e12)],
        gameData.nextMilestoneIndex = 0,
        gameData.totalSigilsEarned = new Decimal(0)
        reset()
        memchallenges[0].completion = false
        relics[0].invested = new Decimal(0)
        gameData.heavenlysigils = new Decimal(0)
        gameData.totalSigilsEarned = new Decimal(0)

        let onentropy = calculateEntropygain()
        gameData.entropy = gameData.entropy.add(onentropy)
        gameData.entropiesdone = gameData.entropiesdone.add(1)
    }
}

export interface Entropyupgrade {
  id: number,
  cost: Decimal,
  bought: boolean
}

export const Eupgrades: Entropyupgrade[] = reactive([
  {
    id: 1,
    cost: new Decimal(1),
    bought: false,
  },
])

export function buyEUpgrade(u: number) {
    if (gameData.entropy.gte(Eupgrades[u].cost) && !Eupgrades[u].bought) {
        gameData.entropy = gameData.entropy.sub(Eupgrades[u].cost)
        Eupgrades[u].bought = true
    }
}

