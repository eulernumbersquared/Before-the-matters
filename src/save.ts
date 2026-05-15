import Decimal from "break_eternity.js"
import { gameData, upgrades } from "./main"
import { relics } from "./relics"
import { Eupgrades } from "./entropy"
import { memchallenges } from "./memchall"
import { proofs } from "./ToI"
import { destruction } from "./degen"

export function saveGame() {
  const saveData = {
    gameData: {
      Time: gameData.Time.toString(),
      baseTimeGain: gameData.baseTimeGain.toString(),
      rejunlock: gameData.rejunlock,
      memchallunlock: gameData.memchallunlock,
      derejuvenationunl: gameData.derejuvenationunl,
      heavenlysigils: gameData.heavenlysigils.toString(),
      totalSigilsEarned: gameData.totalSigilsEarned.toString(),
      entropy: gameData.entropy.toString(),
      bestentropy: gameData.bestentropy.toString(),
      entropiesdone: gameData.entropiesdone.toString(),
      void: gameData.void.toString(),
      truthreveal: gameData.truthreveal,
    },
    upgrades: upgrades.map(u => ({
      id: u.id,
      cost: u.cost.toString(),
      basecost: u.basecost.toString(),
      costscaling: u.costscaling.toString(),
      amount: u.amount.toString(),
      boost: u.boost.toString(),
    })),
    Eupgrades: Eupgrades.map(u => ({
      id: u.id,
      cost: u.cost.toString(),
      bought: u.bought,
    })),
    relics: relics.map(r => ({
    name: r.name,
    invested: r.invested.toString(),
    boost: r.boost.toString(),
    })),
    memchallenges: memchallenges.map(c => ({
    completion: c.completion,
    inChal: c.inChal,
    goal: c.goal.toString(),
    })),
    proofs: proofs.map(c => ({
      proofed: c.proofed,
    })),
    destruction: destruction.map(c => ({
      destruction: c.degen
    }))
  }
  localStorage.setItem("incrementalSave", JSON.stringify(saveData))
}

export function loadGame() {
  const saved = localStorage.getItem("incrementalSave")
  if (!saved) return
  const parsed = JSON.parse(saved)

  gameData.Time = new Decimal(parsed.gameData.Time)
  gameData.baseTimeGain = new Decimal(parsed.gameData.baseTimeGain)
  gameData.rejunlock = parsed.gameData.rejunlock
  gameData.memchallunlock = parsed.gameData.memchallunlock
  gameData.heavenlysigils = new Decimal(parsed.gameData.heavenlysigils)
  gameData.derejuvenationunl = parsed.gameData.derejuvenationunl
  gameData.totalSigilsEarned = new Decimal(parsed.gameData.totalSigilsEarned)
  gameData.entropy = new Decimal(parsed.gameData.entropy)
  gameData.bestentropy = new Decimal(parsed.gameData.bestentropy)
  gameData.entropiesdone = new Decimal(parsed.gameData.entropiesdone)
  gameData.void = new Decimal(parsed.gameData.void)
  gameData.truthreveal = parsed.truthreveal
  if (parsed.upgrades) {
    parsed.upgrades.forEach((u: any, i: number) => {
      upgrades[i].id = u.id
      upgrades[i].cost = new Decimal(u.cost)
      upgrades[i].basecost = new Decimal(u.basecost)
      upgrades[i].costscaling = new Decimal(u.costscaling)
      upgrades[i].amount = new Decimal(u.amount)
      upgrades[i].boost = new Decimal(u.boost)
    })
  }

  if (parsed.Eupgrades) {
    parsed.Eupgrades.forEach((u: any, i: number) => {
      Eupgrades[i].id = u.id
      Eupgrades[i].bought = u.bought
    })
  }

  if (parsed.relics) {
    parsed.relics.forEach((r: any, i: number) => {
      relics[i].name = r.name
      relics[i].invested = new Decimal(r.invested)
      relics[i].boost = new Decimal(r.boost)
    })
  }

  if (parsed.memchallenges) {
    parsed.memchallenges.forEach((c: any, i: number) => {
      memchallenges[i].completion = c.completion
      memchallenges[i].inChal = c.inChal
      memchallenges[i].goal = new Decimal(c.goal)
    })
  }
  if (parsed.proofs) {
    parsed.proofs.forEach((c: any, i: number) => {
      proofs[i].proofed = c.proofed
    });
  }
  if (parsed.destruction) {
    parsed.destruction.forEach((c: any, i: number) => {
      destruction[i].degen = c.degen
    })
  }
}


export function hardReset() {

  gameData.Time = new Decimal(1)
  gameData.baseTimeGain = new Decimal(1)
  gameData.rejunlock = false
  gameData.memchallunlock = false
  gameData.heavenlysigils = new Decimal(0)
  gameData.totalSigilsEarned = new Decimal(0)
  gameData.entropy = new Decimal(0)
  gameData.bestentropy = new Decimal(0)
  gameData.entropiesdone = new Decimal(0)
  gameData.void = new Decimal(0)
  gameData.derejuvenationunl = false
  gameData.truthreveal = false
  upgrades.forEach(u => {
    u.amount = new Decimal(0)
    u.cost = new Decimal(u.basecost)
  })

  Eupgrades.forEach(u => {
    u.bought = false
  })

  relics.forEach(r => {
    r.invested = new Decimal(0)
    r.boost = new Decimal(1)
  })


  memchallenges.forEach(c => {
    c.completion = false
    c.inChal = false
    c.goal = new Decimal(c.goal)
  })
  proofs.forEach(u => {
    u.proofed = false
  })

  localStorage.removeItem("incrementalSave")
  location.reload()
}