import { createApp, reactive } from 'vue'
import App from './App.vue'
import Decimal from 'break_eternity.js'
import { memchallenges } from './memchall'
import { alphaboost, checkMilestones, phiboost } from './relics'
import { Eupgrades } from './entropy'
import {calculatevoidboost } from './void'
import { saveGame, loadGame } from './save'
import { proofs } from './ToI'
import { destruction } from './degen'


export const gameData = reactive({
  Time: new Decimal("1"),
  baseTimeGain: new Decimal("1"),
  rejunlock: false,
  memchallunlock: false,
  derejuvenationunl: false,
  heavenlysigils: new Decimal("0"),
  milestones: [new Decimal("1e6"), new Decimal("1e9"), new Decimal("1e12")],
  nextMilestoneIndex: 0,
  totalSigilsEarned: new Decimal("0"),
  entropy: new Decimal("0"),
  bestentropy: new Decimal("0"),
  entropiesdone: new Decimal("0"),
  void: new Decimal("0"),
  truthreveal: false,
})

export interface Upgrade {
  id: number,
  cost: Decimal,
  basecost: Decimal,
  costscaling: Decimal,
  amount: Decimal,
  boost: Decimal
}

export const upgrades: Upgrade[] = reactive([
  {
    id: 1,
    cost: new Decimal(50),
    basecost: new Decimal(50),
    costscaling: new Decimal(1.8),
    amount: new Decimal(0),
    boost: new Decimal(1.5)
  },
  {
    id: 2,
    cost: new Decimal(300),
    basecost: new Decimal(300),
    costscaling: new Decimal(3.25),
    amount: new Decimal(0),
    boost: new Decimal(2)
  },
  {
    id: 3,
    cost: new Decimal(10000),
    basecost: new Decimal(10000),
    costscaling: new Decimal(1e5),
    amount: new Decimal(0),
    boost: new Decimal(10),
  }
])

export function check() {
  if (gameData.Time.gte(50) && !gameData.rejunlock) {
    gameData.rejunlock = true
  }
}

export function memchallcheck() {
  if (gameData.Time.gte(1e6) && !gameData.memchallunlock) {
    gameData.memchallunlock = true
  }
}

export function buyUpgrade(upgrade: Upgrade) {
  if (gameData.Time.gte(upgrade.cost)) {
    upgrade.amount = upgrade.amount.add(1)
    gameData.Time = gameData.Time.sub(upgrade.cost)
    upgrade.cost = upgrade.cost.mul(upgrade.costscaling)
  }
}

export function calculateTimeGain(): Decimal {
  let gain = gameData.baseTimeGain
  let softcapwhen = new Decimal("1e53")
  let softcapPower = 0.05

  gain = gain.mul(phiboost())
  upgrades.forEach(u => {
    if (u.amount.gt(0)) {
      gain = gain.mul(u.boost.pow(u.amount))
    }
  })
  if (memchallenges[0].inChal) {
    gain = gain.div(3)
  }
  if (memchallenges[0].completion) {
    gain = gain.mul(10)
  }
  if (Eupgrades[0].bought) {
    gain = gain.mul(calculatevoidboost())
  }
  if (Eupgrades[1].bought) {
    gain = gain.mul(10) 
  }

if (gameData.Time.gte(softcapwhen) && !destruction[1].degen) {
  const excess = gameData.Time.div(softcapwhen)
  gain = gain.mul(excess.pow(softcapPower)).div(excess)
}

if (proofs[0].proofed) {
  gain = gain.pow(1.1)
}
if (Eupgrades[4].bought) {
  gain = gain.pow(1.05)
}
if (proofs[1].proofed) {
  let Eboost = gameData.entropy.pow(0.5).add(1)
  gain = gain.mul(Eboost)
}
if (Eupgrades[5].bought) {
  gain = gain.pow(1.05)
}
if (proofs[2].proofed) {
        gain = gain.pow(1.5)
    }
if (proofs[3].proofed) {
  gain = gain.pow(alphaboost())
}
if (destruction[0].degen) {
  gain = gain.pow(2)
}
if (destruction[2].degen) {
  gain = gain.tetrate(1.1)
}
if (destruction[3].degen) {
  gain = gain.tetrate(1.5)
}
  return gain
}

export function runRejuAutobuyer() {
  if (!Eupgrades[5].bought) return

  upgrades.forEach(u => {
    if (gameData.Time.gte(u.cost)) {
      buyUpgrade(u)
    }
  })
}
export function checkChallenges() {
  memchallenges.forEach((chal) => {
    if (chal.inChal && gameData.Time.gte(chal.goal)) {
      chal.completion = true
      chal.inChal = false
    }
  })
}
loadGame()
// heyo, main game loop here
setInterval(() => {
  const currentGain = calculateTimeGain()
  gameData.Time = gameData.Time.add(currentGain)
  check()
  memchallcheck()
  checkChallenges()
  checkMilestones()

}, 75)
// save
setInterval(() => {
  saveGame()
}, 3);
createApp(App).mount('#app')

// autobuyer
setInterval(() => {
  runRejuAutobuyer()
}, 1)