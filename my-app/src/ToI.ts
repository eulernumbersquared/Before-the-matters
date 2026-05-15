import Decimal from "break_eternity.js"
import { reactive } from "vue"
import { gameData } from "./main"

export interface proof {
  cost: Decimal,
  proofed: boolean,
}

export const proofs: proof[] = reactive([ 
    {
        cost: new Decimal('5e59'),
        proofed: false,
    },
    {
        cost: new Decimal('5e83'),
        proofed: false,
    },
    {
        cost: new Decimal('1e92'),
        proofed: false,
    },
    {
        cost: new Decimal('5e196'),
        proofed: false,
    },
    {
        cost: new Decimal('1e397'),
        proofed: false,
    },
    {
        cost: new Decimal('1'),
        proofed: false,
    }
])

export function proving(u: number) {
    if (gameData.Time.gte(proofs[u].cost ) && !proofs[u].proofed) {
        gameData.Time = gameData.Time.sub(proofs[u].cost)
        proofs[u].proofed = true
    }
}