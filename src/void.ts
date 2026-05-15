import Decimal from "break_eternity.js";
import { gameData } from "./main";
import { Eupgrades } from "./entropy";
import { proofs } from "./ToI";
import { destruction } from "./degen";

export function calculatevoidgain() {
    let gain = new Decimal(0)
    if (Eupgrades[0].bought) {
        gain = gain.add(1)
    }
    if (proofs[1].proofed) {
        gain = gain.mul(5)
    }
    if (proofs[1].proofed) {
        gain = gain.pow(1.5)
    }
    if (Eupgrades[5].bought) {
  gain = gain.pow(1.5)
}
    if (proofs[2].proofed) {
        gain = gain.pow(2)
    }
    if (Eupgrades[6].bought) {
        gain = gain.pow(2)
    }
    if (destruction[2].degen) {
        gain = gain.mul(0)
    }
    return gain
}

export function calculatevoidboost() {
    let v = gameData.void.add(1);

    let boost = (
        v.pow(0.1)
            .add(Decimal.div(2, v.mul(v.add(1))))
            .add(
                (
                    (
                        v.pow(0.14)
                            .add(Decimal.sqrt(15).mul(
                                v.pow(0.45)
                                    .add(Decimal.div(1, v.pow(0.1)))
                                    .add(1)
                            ))
                            .add(1)
                    )
                    .div(
                        v.pow(0.5)
                            .add(v.sqrt())
                            .add(1)
                    )
                    .mul(v.pow(0.01).add(v))
                ).pow(0.5)
                .add(1)
                .add(
                    v.pow(0.2)
                        .add(1)
                        .add(
                            v.sqrt().div(5).add(1).log(10).pow(0.5)
                        )
                        .add(1.2)
                        .add(
                            Decimal.pow(
                                Decimal.div(
                                    Decimal.pow(6.283, 3.14),
                                    2.718
                                ),
                                0.15
                            )
                            .mul(
                                Decimal.pow(1.618, v.log(10).add(1))
                                    .mul(v.log(10).add(1))
                            )
                        )
                )
            )
            .add(
                v.pow(0.05).div(2).add(1)
            )
            .mul(
                v.pow(0.2)
                    .add(Decimal.pow(6.283, 3.14).mul(2.718))
                    .pow(0.2)
                    .add(1)
            )
    ).pow(0.25).div(2).add(1);

    return boost;
}


setInterval(() => {
    if (Eupgrades[0].bought) {gameData.void = gameData.void.add(calculatevoidgain())}
}, 100);