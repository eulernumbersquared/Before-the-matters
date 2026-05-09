<script setup lang="ts">
import { gameData, buyUpgrade, upgrades, calculateTimeGain } from './main';
import { challenge, memchallenges } from './memchall';
import { ref, computed } from 'vue'
import fork from './images/fork.png'
import { invest, nextMilestoneInfo, phiboost, relics } from './relics';
import { calculateEntropygain, entropyreset, Eupgrades, buyEUpgrade } from './entropy';
const currentGain = computed(() => calculateTimeGain().toFixed(2))
const activeTab = ref('Rejuvenation')
</script>

<template>


<div id="time">
  <h1>Time: {{ gameData.Time.toFixed(2) }} ({{ currentGain }}/s)</h1>
</div>
<div id="entropy">
  <h1 v-if="gameData.entropiesdone.gte(1)">There is {{ gameData.entropy }} entropy</h1>
</div>

<div id="next_feature" v-if="!gameData.rejunlock"> 
  <h2>Unlock next feature at 50 "Time"</h2>
</div>

<p id="cs" v-if="memchallenges[0].inChal">You are in Challenge 1: Deception!</p>

<button id="entropybutton" v-if="gameData.Time.gte(1e50)" @click="entropyreset">Enter the choas and gain {{ calculateEntropygain() }} entropy</button>
<div id="next_feature" v-if="gameData.Time.lte(1e6) && gameData.rejunlock">
  <h2>Unlock the next feature at 1e6 "Time"</h2>
</div>
<div id="next_feature" v-if="gameData.Time.lte(1e50) && gameData.entropiesdone.lte(0)">
  <h2>Unlock the next feature at 1e50 "Time"</h2>
</div>

<div id="softcap" v-if="gameData.Time.gte(1e50)">
  <h3>Time gain has been reduced by ^0.5!</h3>
</div>

<div id="tabs">
  <button id="Rejuvenation"
    :class="{ active: activeTab === 'Rejuvenation'}"
    @click="activeTab = 'Rejuvenation'"
    v-if="gameData.rejunlock">
    Rejuvenation
  </button>

  <button id="MemoryChalls"
    :class="{ active: activeTab === 'MemoryChalls'}"
    @click="activeTab = 'MemoryChalls'"
    v-if="gameData.rejunlock">
    Memory Challenges
  </button>
  <button id="Relics"
:class="{ active: activeTab === 'Relics'}"
v-if="memchallenges[0].completion"
@click="activeTab = 'Relics'">

Relics
</button>
<button id="Entropy"
:class="{ active: activeTab === 'Entropy'}"
v-if="gameData.entropiesdone.gte(1)"
@click="activeTab = 'Entropy'">

Entropy Upgrades
</button>
<button id="Void"
:class="{ active: activeTab === 'Void'}"
v-if="Eupgrades[0].bought"
@click="activeTab = 'Void'">

Void extraction
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
        <p>(At 5 re-collection, unlock the next upgrade!)</p>
        <p>Amount: {{ upgrades[0].amount.toFixed(2) }}</p>
        <p>Gain 1.25x more time</p>
        <p>Total boost: {{ upgrades[0].boost.pow(upgrades[0].amount).toFixed(2) }}x</p>
        <p>Cost: {{ upgrades[0].cost.toFixed(2) }}</p>
      </button>

      <button id="rej2"
        @click="buyUpgrade(upgrades[1])"
        v-if="upgrades[0].amount.gte(5)"> 
        <h1>Memory empowerment</h1>
        <p>You start to have a much more clearer mind than before....</p>
        <p>Amount: {{ upgrades[1].amount.toFixed(2) }}</p>
        <p>Gain 2x more time</p>
        <p>Total boost: {{ upgrades[1].boost.pow(upgrades[1].amount).toFixed(2) }}x</p>
        <p>Cost: {{ upgrades[1].cost.toFixed(2) }}</p>
      </button>
    </div>
  </div>
  <p id="rej_tab" v-if="gameData.entropiesdone.gte(1)">Is it really worth it?</p>
</div>


<div v-if="activeTab === 'MemoryChalls'" class="memoryc">
  <!--Memory challenges tab-->
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

  </div>

<div v-if="activeTab === 'Relics'" class="Relics">
  <h2 class="relic-title">HEAVENLY RELICS</h2>
  <h2 class="relic-title">You currently have {{ gameData.heavenlysigils }}, {{ nextMilestoneInfo() }} (Total amount: {{ gameData.totalSigilsEarned }})</h2>
  <p v-if="gameData.entropiesdone.gte(1)" class="relic-title">How are you so sure that the memories and "time" aren't gonna destroy you?</p>
<div id="phi" class="relic-block">
    <img :src="fork" alt="Relic" class="relic-img" />
    <h3 class="relic-subtitle">The psi-cotic fork (Currently invested)</h3>
    <h3 class="relic-subtitle">You have {{ gameData.heavenlysigils }} (Currently invested {{ relics[0].invested }})</h3>
    <p class="relic-desc">
      Time boosts itself, and investing more "heavenly" sigils into phi will increase the buff (Current boost: x{{ phiboost() }})
    </p>
    <button @click="invest(0)" class="relic-button">Invest!</button>
  </div>
</div>

<div v-if="activeTab === 'Entropy'" class="Entropy">
  <div id="entropy_upgrades">
  <button :class="{ bought: Eupgrades[0].bought }" @click="buyEUpgrade(0)">
    <h2>Void extraction</h2>
    <h3>Start generating "void" per second</h3>
    <p>Cost: 1 entropy</p>
  </button>
</div>
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
  text-align: center;
  margin: 20px auto;
  padding: 20px;
  background-color: rgb(10, 10, 10);
  border: 2px solid rgb(255, 124, 124);
  border-radius: 8px;
  max-width: 400px;
}

.relic-title {
  font-family: retro, monospace;
  color: rgb(230, 194, 36);
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  width: 340px;
  height: auto;
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
  margin: 0;
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

</style>
