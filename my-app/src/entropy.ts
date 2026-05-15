import Decimal from "break_eternity.js";
import { gameData } from "./main";
import { respec } from "./relics";
import { reset, memchallenges } from "./memchall";
import { reactive } from "vue";
import { eternityboost } from "./relics";
import { proofs } from "./ToI";


export function calculateEntropygain() {
    let gain = Decimal.max(0, gameData.Time.div(1e53).root(50))
    gain = gain.mul(eternityboost())
    if (proofs[2].proofed) {
            gain = gain.pow(1.1)
        }
    if (gain.gte('1e10000')) {
      gain = gain.mul(0)
    }
    return gain
}

export function entropyreset() {
    if (gameData.Time.gte(1e53)) {
      let onentropy = calculateEntropygain()
        gameData.entropy = gameData.entropy.add(onentropy)
        gameData.entropiesdone = gameData.entropiesdone.add(1)
        gameData.Time = new Decimal(1)
        gameData.baseTimeGain = new Decimal(1),
        gameData.rejunlock = false,
        gameData.memchallunlock = false,
        gameData.heavenlysigils = new Decimal(0),
        gameData.milestones = [new Decimal(1e6), new Decimal(1e9), new Decimal(1e12)],
        gameData.nextMilestoneIndex = 0,
        gameData.totalSigilsEarned = new Decimal(0)
        reset()
        memchallenges[0].completion = false
        respec()
        gameData.heavenlysigils = new Decimal(0)
        gameData.totalSigilsEarned = new Decimal(0)
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
  {
    id: 2,
    cost: new Decimal(1),
    bought: false,
  },
  {
    id: 3,
    cost: new Decimal(2),
    bought: false,
  },
  {
    id: 4,
    cost: new Decimal(5),
    bought: false,
  },
  {
    id: 5,
    cost: new Decimal(20),
    bought: false
  },
  {
    id: 6,
    cost: new Decimal('1000'),
    bought: false,
  },
  {
    id: 7,
    cost: new Decimal('9000000'),
    bought: false,
  }
])

export function buyEUpgrade(u: number) {
  console.log("Entropy:", gameData.entropy.toString())
console.log("Cost:", Eupgrades[4].cost.toString())
console.log("Bought:", Eupgrades[4].bought)

  if (gameData.entropy.gte(Eupgrades[u].cost) && !Eupgrades[u].bought) {
    gameData.entropy = gameData.entropy.sub(Eupgrades[u].cost)
    Eupgrades[u].bought = true
    console.log("Entropy after:", gameData.entropy.toString())
  }
}
