import { createApp, reactive } from 'vue'
import App from './App.vue'
import Decimal from 'break_eternity.js'
import { memchallenges } from './memchall'
import { checkMilestones, phiboost } from './relics'

export const gameData = reactive({
  Time: new Decimal(1e50),
  baseTimeGain: new Decimal(1),
  rejunlock: false,
  memchallunlock: false,
  heavenlysigils: new Decimal(0),
  milestones: [new Decimal(1e6), new Decimal(1e9), new Decimal(1e12)],
  nextMilestoneIndex: 0,
  totalSigilsEarned: new Decimal(0),
  entropy: new Decimal(0),
  bestentropy: new Decimal(0),
  entropiesdone: new Decimal(0),
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
    boost: new Decimal(1.25)
  },
  {
    id: 2,
    cost: new Decimal(300),
    basecost: new Decimal(300),
    costscaling: new Decimal(3.5),
    amount: new Decimal(0),
    boost: new Decimal(2)
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
  return gain
}

export function checkChallenges() {
  memchallenges.forEach((chal) => {
    if (chal.inChal && gameData.Time.gte(chal.goal)) {
      chal.completion = true
      chal.inChal = false
    }
  })
}

// heyo, main game loop here
setInterval(() => {
  const currentGain = calculateTimeGain()
  gameData.Time = gameData.Time.add(currentGain)
  check()
  checkChallenges()
  checkMilestones()
}, 100)


createApp(App).mount('#app')



/* export function saveGame() {
  const saveData = {
    gameData: {
      Time: gameData.Time.toString(),
      TimeGain: gameData.TimeGain.toString(),
      rejunlock: gameData.rejunlock,
    },
    upgrades: upgrades.map(u => ({
      id: u.id?.toString(),
      cost: u.cost.toString(),
      basecost: u.basecost.toString(),
      costscaling: u.costscaling.toString(),
      amount: u.amount.toString(),
      boost: u.boost.toString(),
    }))
  }
  localStorage.setItem("incrementalSave", JSON.stringify(saveData))
}

export function loadGame() {
  const saved = localStorage.getItem("incrementalSave")
  if (saved) {
    const parsed = JSON.parse(saved)

    gameData.Time = new Decimal(parsed.gameData.Time)
    gameData.TimeGain = new Decimal(parsed.gameData.TimeGain)
    gameData.rejunlock = parsed.gameData.rejunlock

    parsed.upgrades.forEach((u: any, i: number) => {
      upgrades[i].id = u.id ? new Decimal(u.id) : undefined
      upgrades[i].cost = new Decimal(u.cost)
      upgrades[i].basecost = new Decimal(u.basecost)
      upgrades[i].costscaling = new Decimal(u.costscaling)
      upgrades[i].amount = new Decimal(u.amount)
      upgrades[i].boost = new Decimal(u.boost)
    })
  }
}

setInterval(saveGame, 1000)

export function hardReset() {
  gameData.Time = new Decimal(1000)
  gameData.TimeGain = new Decimal(1)
  gameData.rejunlock = false
  upgrades.forEach(u => {
    u.amount = new Decimal(0)
    u.cost = new Decimal(u.basecost)
  })
  localStorage.removeItem("incrementalSave")
}

loadGame()
*/