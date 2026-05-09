import { gameData, upgrades } from "./main";
import Decimal from "break_eternity.js";
import { reactive } from "vue";

export interface challenge {
    completion: boolean,
    inChal: boolean,
    goal: Decimal,
}

export const memchallenges: challenge[] = reactive([
    {
        completion: false,
        inChal: false,
        goal: new Decimal(1e5),
    }

])

export function reset() {
    gameData.Time = new Decimal(1e50)
    upgrades.forEach(u => {
    u.amount = new Decimal(0)
    u.cost = new Decimal(u.basecost)
  })
}

export function challenge(u: number) {
  memchallenges[u].inChal = !memchallenges[u].inChal
  reset()
  if (gameData.Time.gte(memchallenges[u].goal)) {
    memchallenges[u].completion = true
  }
}


