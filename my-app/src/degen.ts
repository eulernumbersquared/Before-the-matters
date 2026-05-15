import Decimal from "break_eternity.js";
import { reactive } from "vue";
import { gameData, memchallcheck } from "./main";
import { relics } from "./relics";
import { memchallenges } from "./memchall";
import { proofs } from "./ToI";



export interface destruction{
  cost: Decimal,
  degen: boolean
}

export const destruction: destruction[] = reactive([ 
    {
        cost: new Decimal('1e400'),
        degen: false
    },
    {
        cost: new Decimal('1e3000'),
        degen: false,
    },
    {
        cost: new Decimal('1e10000'),
        degen: false
    },
    {
        cost: new Decimal('1ee35000'),
        degen: false,
    },
    {
        cost: new Decimal('e1.79e308'),
        degen: false,
    }
])

export function destroyEntropy() {
    if (gameData.Time.gte('1e400')) {
        gameData.entropy = new Decimal('1')
        destruction[0].degen = true
    }
}

export function destroyRelics() {
    if (gameData.Time.gte('1e3000')) {
        gameData.heavenlysigils = new Decimal('1')
        gameData.totalSigilsEarned = new Decimal('1')
        relics.forEach(r => {
            r.invested = new Decimal('1')
        })
        destruction[1].degen = true
    }
}

export function destryVoid() {
    if (gameData.Time.gte('1e10000')) {
        gameData.void = new Decimal('10')
        destruction[2].degen = true
    }
}

export function destroyMemchallsandToI() {
    if (gameData.Time.gte('1ee36100')) {
        memchallenges[0].completion = false
        proofs.forEach(r => {
            r.proofed = false
        })
        destruction[3].degen = true
    }
}

export function destroyrej() {
    if (gameData.Time.gte('e1.79e308')) {
        destruction[4].degen = true
    }
}