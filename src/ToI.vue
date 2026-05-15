<script setup lang="ts">
import { esquariumcheater } from './esquared_ultimatecheater';
import ToI1 from './images/ToI-images/ToI1.png'
import ToI2 from './images/ToI-images/ToI2.png'
import ToI3 from './images/ToI-images/ToI3.png'
import ToI4 from './images/ToI-images/ToI4.png'
import ToI5 from './images/ToI-images/ToI5.png'
import { gameData } from './main';
import { proving, proofs } from './ToI';
import { ref } from 'vue'
const activeTab = ref('Rejuvenation')
</script>

<template>
<div id="tabs">

    <button id="Proofs"
    :class="{ active: activeTab === 'Proofs'}"
    @click="activeTab = 'Proofs'"
    v-if="gameData.rejunlock">
    Proofs
  </button>
  <button id="ProofRewards"
    :class="{ active: activeTab === 'ProofRewards'}"
    @click="activeTab = 'ProofRewards'"
    v-if="gameData.rejunlock">
    Proof rewards
  </button>
</div>
<div v-if="activeTab === 'Proofs'" class="proofs">


<section class="text" v-if="!proofs[0].proofed">
<h2>You stumble upon a strange piece of paper which seems like it tries to tell about some system...?</h2>
<img :src="ToI1" alt="ToI1" class="theory-images" />
<p>Welcome to the implication system. You will be seeing a bunch of unique structures which "implies" certain variables</p>
<p>The structure presented here says that x will imply and y will imply z which further means x implies z.</p>
<button id="Prove" @click="proving(0)">Unlock the next page (Cost: {{ proofs[0].cost.toFixed(2) }} time)</button>
</section>

<section class="text" v-if="proofs[0].proofed && !proofs[1].proofed"">
<h2>It is a very eye-catching paper though.....</h2>
<img :src="ToI2" alt="ToI2" class="theory-images" />
<p>The structures of the implication system is very unique, as there are many symbols which can denote different things</p>
<p>As an example, the "dot" represents 3-way implications. "x" implies y, z, and w.</p>
<button id="Prove" @click="proving(1)">Unlock the next page (Cost: {{ proofs[1].cost.toFixed(2) }} time)</button>
</section>

<section class="text" v-if="proofs[1].proofed && !proofs[2].proofed">
<h2>What a nice structure!</h2>
<img :src="ToI3" alt="ToI3" class="theory-images" />
<p>We can form a square out of these, the notation for such sides of a square are X=>Y, Y=>W, W=>Z, Z=>X.</p>
<p>The dot in this case is used as a sort of intersection. If there were no implication symbols inbetween, we could consider the "dot" supporting x => z and y => w</p>
<button id="Prove" @click="proving(2)">Unlock the next page (Cost: {{ proofs[2].cost }} time)</button>
</section>

<section class="text" v-if="proofs[2].proofed && !proofs[3].proofed">
<h2>???</h2>
<img :src="ToI4" alt="ToI4" class="theory-images" />
<p>You might be wondering what's the use of such system?</p>
<p>I mean, the structures look nice and all, but what is its real purpose? Is it really there to just look nice?</p>
<button id="Prove" @click="proving(3)">Unlock the next page (Cost: {{ proofs[3].cost }} time)</button>
</section>

<section class="text" v-if="proofs[3].proofed && !proofs[4].proofed">
<h2>???</h2>
<img :src="ToI5" alt="ToI5" class="theory-images" />
<p>It was used to find the truth</p>
<p>You've finally unlocked the truth. It took you long enough, reveal the past memories you've been hiding from yourself, you deserve them........</p>
<button id="Prove" @click="proving(4)">?????? (Cost: {{ proofs[4].cost }} time)</button>
</section>

<section class="text" v-if="proofs[4].proofed && !proofs[5].proofed">
<h3>Reveal who you truely are.</h3>
</section>
</div>

<div v-if="activeTab === 'ProofRewards'" class="ProofRewards">
<div class="text">

    <p v-if="proofs[0].proofed">Proof 1: ^1.1 more time</p>
    <p v-if="proofs[1].proofed">Proof 2: Increase the power of psi's boost by 1.5, entropy boosts time (Currenctly: x{{ gameData.entropy.pow(0.5).add(1).toFixed(2) }}) and x5 and ^1.5 more void gain</p>
    <p v-if="proofs[2].proofed">Proof 3: ^2 void, ^1.5 time. ^1.1 entropy. You dont want to know the truth</p>
    <p v-if="proofs[3].proofed">Proof 4: Unlock the ascended alpha.</p>
    <p v-if="proofs[4].proofed">Proof 5: Unlock the truth</p>
    </div>
</div>
</template>

<style>
.theory-images {
  display: block;
  margin: auto;
  height: auto;
  width: 350px;
}
.text {
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: aqua;
}
#Prove {
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: rgb(7, 16, 70);
    background-color: rgb(124, 139, 139);
    height: 100px;
    width: 300px;
    font-size: 15px;
}
#ProofRewards {
    color: #f8f8f8;
    outline: auto;
    background-color: rgb(113, 59, 138);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 150px;
    padding: 20px;
}
#Proofs{
    color: #f8f8f8;
    outline: auto;
    background-color: rgb(35, 119, 187);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 150px;
    padding: 20px;
}
</style>