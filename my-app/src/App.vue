<script setup lang="ts">
import { gameData, buyUpgrade, upgrades, calculateTimeGain } from './main';
import { challenge, memchallenges } from './memchall';
import { ref, computed } from 'vue'
import fork from './images/fork.png'
import therealsigma from './images/therealsigma.png'
import alpha from './images/alphaboy.png'
import { alphaboost, alphainvest, eternityboost, invest, nextMilestoneInfo, phiboost, relics, respec } from './relics';
import { calculateEntropygain, entropyreset, Eupgrades, buyEUpgrade } from './entropy';
import { calculatevoidboost, calculatevoidgain } from './void';

import ToI from './ToI.vue';
import { proofs } from './ToI';
import Truth from './truth.vue';
import Degeneration from './degeneration.vue';
import { destruction } from './degen';
import Endingseq from './endingseq.vue';
const currentGain = computed(() => calculateTimeGain().toFixed(2))
const activeTab = ref('Rejuvenation')
</script>

<template>
 <Endingseq v-if="destruction[4].degen" />

<div id="time">
  <h1 v-if="!destruction[4].degen">Time: {{ gameData.Time.toFixed(2) }} ({{ currentGain }}/s)</h1>
</div>
<div id="entropy">
  <h1 v-if="gameData.entropiesdone.gte(1) && !destruction[0].degen">
    There is {{ gameData.entropy.toFixed(2) }} entropy
  </h1>
  <h1 v-else-if="gameData.entropiesdone.gte(1) && destruction[0].degen">
    No more entropy..
  </h1>
</div>

<div id="next_feature" v-if="!gameData.rejunlock"> 
  <h2>Unlock next feature at 50 "Time"</h2>
</div>

<p id="cs" v-if="memchallenges[0].inChal">You are in Challenge 1: Deception!</p>
<button 
  id="entropybutton" 
  v-if="gameData.Time.gte(1e53) && !destruction[0].degen" 
  @click="entropyreset"
>
  Enter the chaos and gain {{ calculateEntropygain().toFixed(2) }} entropy
</button>

<button 
  id="entropybutton" 
  v-else-if="destruction[0].degen"
>
  Entropy has been degenerated.
</button>

<div id="GoF" v-if="gameData.derejuvenationunl && !destruction[0].degen">You really fell for the mania? Look at you, so weak, against me, the god of fundamentals.....</div>
<div id="GoF" v-if="destruction[0].degen && !destruction[1].degen">Wow, your so desperate aren't you? Sacrificing your entropy, your past actions to those people did a toll on you now....</div>
<div id="GoF" v-if="destruction[1].degen && !destruction[2].degen">Why dont you forget about the past? It's all over now. Those people forgot what you did, and yet your still so scared......</div>
<div id="GoF" v-if="destruction[2].degen && !destruction[3].degen">You think you can resist the obsession like this?</div>
<div id="GoF" v-if="destruction[3].degen && !destruction[4].degen">You only have 1 thing left to sacrifice. You know you want to do it. Let the mania consume you. You cant resist it.</div>
<div id="next_feature" v-if="gameData.Time.lte(1e6) && gameData.memchallunlock">
  <h2>Unlock the next feature at 1e6 "Time"</h2>
</div>
<div id="next_feature" v-if="gameData.Time.lte(1e53) && gameData.entropiesdone.lte(0) && memchallenges[0].completion">
  <h2>Unlock the next feature at 1e53 "Time"</h2>
</div>

<div id="softcap" v-if="gameData.Time.gte(1e53)">
  <h3>Past 1e53 time, its gain is reduced!</h3>
</div>

<div id="softcap" v-if="gameData.entropy.gte('1e10000') && !destruction[0].degen">
  <h3>Past 1e10k entropy, entropy gain is hardcapped!</h3>

</div>

<div id="tabs">
  <button id="Rejuvenation"
    :class="{ active: activeTab === 'Rejuvenation'}"
    @click="activeTab = 'Rejuvenation'"
    v-if="gameData.rejunlock && !destruction[4].degen">
    Rejuvenation
  </button>

  <button id="MemoryChalls"
    :class="{ active: activeTab === 'MemoryChalls'}"
    @click="activeTab = 'MemoryChalls'"
    v-if="gameData.memchallunlock && !destruction[3].degen">
    Memory Challenges
  </button>
  <button id="Relics"
:class="{ active: activeTab === 'Relics'}"
v-if="memchallenges[0].completion && !destruction[1].degen"
@click="activeTab = 'Relics'">

Relics
</button>
<button id="Entropy"
:class="{ active: activeTab === 'Entropy'}"
v-if="gameData.entropiesdone.gte(1) && !destruction[0].degen"
@click="activeTab = 'Entropy'">

Entropy Upgrades
</button>
<button id="Void"
:class="{ active: activeTab === 'Void'}"
v-if="Eupgrades[0].bought && !destruction[2].degen"
@click="activeTab = 'Void'">

Void extraction
</button>
<button id="TOI"
:class="{ active: activeTab === 'TOI'}"
v-if="Eupgrades[3].bought && !destruction[3].degen"
@click="activeTab = 'TOI'">
THEORY OF IMPLICATION
</button>
<button id="Truth"
:class="{ active: activeTab === 'Truth'}"
v-if="proofs[4].proofed"
@click="activeTab = 'Truth'">
The Truth
</button>
<button id="Degen"
:class="{ active: activeTab === 'Degen'}"
v-if="gameData.derejuvenationunl == true"
@click="activeTab = 'Degen'">
Degeneration
</button>
</div>



<div v-if="activeTab === 'Rejuvenation' && gameData.rejunlock">
  <div id="rej_tab">
    <h2>Rejuvenation</h2>
    <p>Recover the old memories that were lost....</p>
    <div class="row">
      <button id="rej1" @click="buyUpgrade(upgrades[0])"> 
        <h1>Re-collection</h1>
        <p>Time seems to go faster as you think more......?</p>
        <p v-if="gameData.entropiesdone.gte(2)">Why are you falling for the obsession...?</p>
        <p>(At 5 re-collection, unlock the next upgrade!)</p>
        <p>Amount: {{ upgrades[0].amount.toFixed(2) }}</p>
        <p>Gain 1.5x more time</p>
        <p>Total boost: {{ upgrades[0].boost.pow(upgrades[0].amount).toFixed(2) }}x</p>
        <p>Cost: {{ upgrades[0].cost.toFixed(2) }}</p>
      </button>

      <button id="rej2"
        @click="buyUpgrade(upgrades[1])"
        v-if="upgrades[0].amount.gte(5)"> 
        <h1>Memory empowerment</h1>
        <p>You start to have a much more clearer mind than before....</p>
        <p v-if="gameData.entropiesdone.gte(2)">Can't you resist the mania?</p>
        <p>Amount: {{ upgrades[1].amount.toFixed(2) }}</p>
        <p>Gain 2x more time</p>
        <p>Total boost: {{ upgrades[1].boost.pow(upgrades[1].amount).toFixed(2) }}x</p>
        <p>Cost: {{ upgrades[1].cost.toFixed(2) }}</p>
      </button>
      <button id="rej3"
        @click="buyUpgrade(upgrades[2])"
        v-if="Eupgrades[1].bought"> 
        <h1>Fundamental re-grasping</h1>
        <p>Why dont you resist the memories....?</p>
        <p>Amount: {{ upgrades[2].amount.toFixed(2) }}</p>
        <p>Gain x10 more time.......</p>
        <p>Total boost: {{ upgrades[2].boost.pow(upgrades[2].amount).toFixed(2) }}x</p>
        <p>Cost: {{ upgrades[2].cost.toFixed(2) }}</p>
      </button>
    </div>
  </div>
  <p id="rej_tab" v-if="gameData.entropiesdone.gte(1)">Is it really worth it?</p>
</div>


<div v-if="activeTab === 'MemoryChalls'" class="memoryc">
    <h1>Memory Challenges</h1>
    <span id="warn">Entering a memory challenge causes time and rejuvenation to reset!</span>
    <p v-if="gameData.entropiesdone.gte(1)">Are you going to fall for the mania?</p>
    <div class="challenge-box"
     :class="{ completed: memchallenges[0].completion }">
  <h2>Challenge 1: Deception</h2>
  <p>Time is divided by 3</p>
  <p>Goal: Reach 100,000 "Time"</p>
  <button id="entermemchall" @click="challenge(0)">Start challenge</button>
  <p>Reward: Unlock the relics! Boost time by x10</p>
</div>
<p v-if="gameData.entropiesdone.gte(2)">Dont you see the signs?</p>
  </div>

<div v-if="activeTab === 'Relics'" class="Relics">
  <h2 class="relic-title">HEAVENLY RELICS</h2>
  <h2 class="relic-title">You currently have {{ gameData.heavenlysigils }} heavenly sigils, {{ nextMilestoneInfo() }} (Total amount: {{ gameData.totalSigilsEarned }})</h2>
  <p v-if="gameData.entropiesdone.gte(1)" class="relic-title">How are you so sure that the memories and "time" aren't gonna destroy you?</p>
  <button @click="respec" id="respec">Respec relics</button>
<div id="phi" class="relic-block relic-phi">
    <img :src="fork" alt="Relic" class="relic-img" />
    <h3 class="relic-subtitle">The psi-cotic fork</h3>
    <h3 class="relic-subtitle">You have {{ gameData.heavenlysigils }} heavenly sigils (Currently invested {{ relics[0].invested }})</h3>
    <p class="relic-desc">
      Time boosts itself, and investing more "heavenly" sigils into phi will increase the buff (Current boost: x{{ phiboost() }})
    </p>
    <button @click="invest(0)" class="relic-button">Invest!</button>
  </div>

<div id="sigma" class="relic-block relic-sigma" v-if="Eupgrades[2].bought">
<img :src="therealsigma" alt="Relic" class="relic-img" />
<h3 class="beta-subtitle">The Graceful Eternity</h3>
    <h3 class="beta-subtitle">You have {{ gameData.heavenlysigils }} heavenly sigils (Currently invested {{ relics[1].invested }})</h3>
    <p class="beta-desc">A simple boost of +1.1x to entropy per invest (Currenly x{{ eternityboost() }})</p>
    <button @click="invest(1)" class="beta-button">Invest!</button>
</div>

<div id="alpha" class="relic-block relic-alpha" v-if="proofs[3].proofed">
<img :src="alpha" alt="Relic" class="relic-img" />
<h3 class="alpha-subtitle">The Proven Alpha</h3>
    <h3 class="alpha-subtitle">You have {{ gameData.heavenlysigils }} heavenly sigils (Currently invested {{ relics[2].invested }})</h3>
    <p class="alpha-desc">+^0.1 time. Increases based on amount invested into such (Currenly ^{{ alphaboost() }})</p>
    <button @click="alphainvest(2)" class="beta-button">Invest! (The cost for investing into alpha is {{ relics[2].invested.pow(100) }})</button>
</div>


</div>

<div v-if="activeTab === 'Entropy'" class="Entropy">
  <div id="entropy_upgrades">
  <button :class="{ bought: Eupgrades[0].bought }" @click="buyEUpgrade(0)">
    <h2>Void extraction</h2>
    <h3>Start generating "void" per second</h3>
    <p>Cost: 1 entropy</p>
  </button>
  <button :class="{ bought: Eupgrades[1].bought }" @click="buyEUpgrade(1)" v-if="Eupgrades[0].bought">
    <h2>Exceptional memory</h2>
    <h3>x10 time, unlock the 3rd memory upgrade</h3>
    <p>Cost: 1 entropy</p>
  </button>
   <button :class="{ bought: Eupgrades[2].bought }" @click="buyEUpgrade(2)" v-if="Eupgrades[1].bought">
    <h2>Choatic relic</h2>
    <h3>Unlock the 2nd relic.</h3>
    <p>Cost: 2 entropy</p>
  </button>
  <button :class="{ bought: Eupgrades[3].bought }" @click="buyEUpgrade(3)" v-if="Eupgrades[2].bought">
    <h2>THEORY OF IMPLICATION</h2>
    <h3>UNLOCK THE THEORY OF IMPLICATION</h3>
    <p>Cost: 5 entropy</p>
  </button>
  <button :class="{ bought: Eupgrades[4].bought }" @click="buyEUpgrade(4)" v-if="Eupgrades[3].bought">
    <h2>Resist</h2>
    <h3>^1.05 time's gain</h3>
    <p>Cost: 20 entropy</p>
  </button>
  <button :class="{ bought: Eupgrades[5].bought }" @click="buyEUpgrade(5)" v-if="Eupgrades[4].bought">
    <h2>The memories....</h2>
    <h3>^1.1 time, ^1.5 void, and autobuy rejuvenation upgrades. Resist the obsession.</h3>
    <p>Cost: {{Eupgrades[5].cost}} entropy</p>
  </button>
  <button :class="{ bought: Eupgrades[6].bought }" @click="buyEUpgrade(6)" v-if="Eupgrades[5].bought">
    <h2>The mania will consume</h2>
    <h3>^2 void. You wont like the truth.</h3>
    <p>Cost: {{Eupgrades[6].cost}} entropy</p>
  </button>
</div>
</div>

<div v-if="activeTab === 'Void'" class="Void">

    <h3 id="void-description">
  You have {{ gameData.void.toFixed(2) }} void ({{ calculatevoidgain().toFixed(2) }}/s) which translates to x{{ calculatevoidboost().toFixed(2) }}
</h3>

</div>

<div v-if="activeTab === 'TOI'" class="TOI">
<ToI />
</div>
<div v-if="activeTab === 'Truth'" class="Truth">
<Truth />
</div>
<div v-if="activeTab === 'Degen'" class="Degen">
<Degeneration />
</div>
</template>


<style>
html{
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
}
#cs{
  text-align: center;
  font-family: retro, monospace;
  font-size: 20px;
  color: rgb(114, 207, 161);
}
#tabs {
  display: flex;
  justify-content: center; 
  gap: 10px;               
  margin: 20px 0;
}
#time{
  text-align: center;
  font-family: retro, monospace;

}
#next_feature{
  font-family: retro, monospace;
  text-align: center;
}
#softcap{
  font-family: retro, monospace;
  text-align: center;
  color: rgb(197, 204, 95);
}
#Rejuvenation{
  color: rgb(0, 255, 13);
  outline: auto;
  background-color: rgb(2, 61, 5);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 150px;
  padding: 20px;
}
#rej_tab{
  font-family: retro, monospace;
  text-align: center;
  color: chartreuse;
}
.row{
  gap: 30px;
  display: flex;
  justify-content: center;

}
#rej1{
  display: -webkit-inline-box;
  color: chartreuse;
  background-color: rgb(36, 109, 17);
  outline: auto;
  outline-color: rgb(0, 255, 55);
  font-family: retro, monospace;
}
#rej2{
  display: -webkit-inline-box;
  color: rgb(0, 119, 255);
  background-color: rgb(0, 48, 70);
  outline: auto;
  outline-color: rgb(0, 119, 255);
  font-family: retro, monospace;
}
#GoF {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(to right, #ffffff, #6d6d6d, #4e4e4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: retro, monospace;
  text-shadow: 0 0 15px rgba(255,255,255,0.7);
}

#rej3{
  display: -webkit-inline-box;
  color: rgb(255, 255, 255);
  background-color: rgb(115, 163, 185);
  outline: auto;
  outline-color: rgb(0, 119, 255);
  font-family: retro, monospace;
}
#MemoryChalls{
  color: rgb(32, 185, 255);
  outline: auto;
  background-color: rgb(42, 26, 51);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 150px;
  padding: 20px;
}
.memoryc{
  font-family:Arial, Helvetica, sans-serif;
  text-align: center;
}
#warn {
  color: red;
  font-weight: bold;
  text-shadow: 0 0 5px red, 0 0 10px red, 0 0 20px red;
}
#memhead{
  color: rgb(17, 83, 83);
}
.challenge-box {
  border: 2px solid rgb(15, 105, 179);   
  padding: 15px;                  
  margin: 20px auto;              
  width: 300px;
  height: 300px;     
  text-align: center;
  font-family: retro, monospace;  
  box-shadow: 0 0 10px rgb(6, 78, 212); 
  justify-content: center;
  align-items: center;
  text-align: center;
}
#entermemchall{
  width: 250px;
  height: 100px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 25px;
  color: rgb(248, 248, 248);
  background-color: rgb(38, 25, 107);
  border: 2px solid rgb(15, 105, 179);   
}
.challenge-box.completed {
  border: 2px solid limegreen;
  box-shadow: 0 0 15px limegreen;
  background-color: rgba(0, 255, 0, 0.1);
  color: chartreuse;
}
#Relics {
  color: rgb(255, 149, 10);
  outline: auto;
  background-color: rgb(53, 42, 5);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 150px;
  padding: 20px;
}
.relic-block {
  display: inline-block;
  vertical-align: top;
  margin: 20px;
  padding: 20px;
  background-color: rgb(10, 10, 10);
  border: 2px solid rgb(255, 124, 124);
  border-radius: 10px;
  width: 400px;
  height: 400px;
  text-align: center;
}

.relic-phi {
  background-color: rgb(10, 10, 10);
  border: 2px solid rgb(255, 124, 124);
}
.relic-beta {
  background-color: rgb(10, 10, 10);
  border: 2px solid rgb(255, 124, 124);
}
.relic-title {
  font-family: retro, monospace;
  color: rgb(230, 194, 36);
  text-align: center;
}
.beta-subtitle {
  font-family: retro, monospace;
  color: rgb(143, 212, 224);
  text-align: center;
}
.beta-desc {
  font-family: retro, monospace;
  color: rgb(143, 212, 224);
  text-align: center;
}
.alpha-subtitle {
  font-family: retro, monospace;
  color: rgb(141, 34, 173);
  text-align: center;
}
.alpha-desc {
  font-family: retro, monospace;
  color: rgb(143, 212, 224);
  text-align: center;
}
.relic-img {
  width: 120px;
  height: auto;
  margin: 10px 0;
}

.relic-subtitle {
  font-family: retro, monospace;
  color: rgb(172, 55, 55);
}

.relic-desc {
  font-family: retro, monospace;
  color: rgb(233, 124, 109);
}
.relic-button {
  color: rgb(233, 124, 109);
  width: 220px;
  height: 50px;
  font-family: retro, monospace;
  background-color: rgb(48, 24, 24);
  border: 2px solid rgb(255, 124, 124);
}
.beta-button {
  color: rgb(69, 153, 209);
  width: 220px;
  height: 50px;
  font-family: retro, monospace;
  background-color: rgb(49, 42, 151);
  border: 2px solid rgb(0, 140, 255);
}


#entropybutton {
  display: block;
  margin: 30px auto;
  text-align: center;
  width: 300px;
  height: 100px;

  background: rgb(117, 180, 177);
  border: 2px solid rgb(27, 197, 183);

  font-family: retro, monospace;
  font-size: 20px;
  font-weight: bold;
  color: rgb(255, 255, 255);
  text-shadow: 0 0 8px rgb(27, 197, 183);

  box-shadow: 0 0 20px rgb(27, 197, 183), inset 0 0 10px rgba(27, 197, 183, 0.5);
}

#entropy {
  text-align: center;
  font-family: retro, monospace;
  font-weight: bold;
  color: rgb(144, 213, 223);
}

#Entropy {
  color: rgb(255, 255, 255);
  outline: auto;
  background-color: rgb(127, 177, 218);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 150px;
  padding: 20px;
}
#entropy_upgrades {
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  width: 340px;
  height: auto;
  gap: 12px;
}


#entropy_upgrades button {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, rgb(117, 180, 177), rgb(80, 140, 135));
  border: 2px solid rgb(27, 197, 183);
  border-radius: 12px;

  font-family: retro, monospace;
  color: #fff;
  text-align: center;

  box-shadow: 
    0 0 20px rgb(27, 197, 183),
    inset 0 0 10px rgba(27, 197, 183, 0.5);

  transition: all 0.25s ease-in-out;
  cursor: pointer;
}
#entropy_upgrades h2 {
  font-size: 22px;
  margin: 0;
  text-shadow: 0 0 8px rgb(27, 197, 183);
}

#entropy_upgrades h3 {
  font-size: 16px;
  margin: 6px 0;
  font-weight: normal;
  color: #dff;
  text-shadow: 0 0 6px rgba(27, 197, 183, 0.8);
}

#entropy_upgrades p {
  font-size: 14px;
  margin: 0px;
  color: #bff;
  text-shadow: 0 0 4px rgba(27, 197, 183, 0.6);
  
}

#entropy_upgrades button.bought {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  border: 2px solid #2ecc71;
  color: #fff;
  text-shadow: 0 0 8px #2ecc71;
  box-shadow: 
    0 0 25px #2ecc71,
    inset 0 0 12px rgba(46, 204, 113, 0.6);
}

#Void {
  color: rgb(0, 0, 0);
  text-shadow: 2px 0px 5px black;
  outline: auto;
  background-color: rgb(124, 124, 124);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 150px;
  padding: 20px;
}

#void-title{
  color: rgb(0, 0, 0);
  text-shadow: 0px 0px 10px rgb(255, 255, 255);
  text-align: center;
  font-family: retro, monospace;
}
#void-description{
  color: rgb(70, 68, 68);
  text-shadow: 0px 2px 10px rgb(224, 112, 112);
  text-align: center;
  font-family: retro, monospace;
  font-size: 25px;
}
#respec {
  display: block;
  color: rgb(233, 124, 109);
  width: 220px;
  height: 50px;
  font-family: retro, monospace;
  background-color: rgb(48, 24, 24);
  border: 2px solid rgb(255, 124, 124);
  text-align: center;
  margin: 20px auto;
}
#TOI{
  color: rgb(210, 32, 255);
  outline: auto;
  background-color: rgb(42, 26, 51);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 150px;
  padding: 20px;
}
#Truth {
  color: rgb(255, 255, 255);
  outline: auto;
  background-color: rgb(255, 0, 0);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 150px;
  padding: 20px;
}
#Degen{
  color: rgb(255, 0, 55);
  outline: auto;
  background: linear-gradient(to right, black, maroon);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 150px;
  padding: 20px;
}
</style>
