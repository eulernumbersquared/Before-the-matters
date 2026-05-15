<script setup lang="ts">
import { destroyEntropy, destroyMemchallsandToI, destroyrej, destroyRelics, destruction, destryVoid } from './degen';

</script>

<template>
  <div class="gradient">
    <h1>Destroy all the things you had with time.</h1>
  </div>
  <section id="entropy" v-if="!destruction[0].degen">
    <h1>Degenerate the entropy</h1>
    <h3>Remember when you did your 1st reset? It was a bit painful right? But now you believe it had a meaning, it was telling you something... you should've believed it. Now, you must destroy it and gain ^2 more time</h3>
    <button @click="destroyEntropy()" id="entropybutton">Cost to destroy: {{destruction[0].cost}} time</button>
  </section>

  <section id="Destroyrelics" v-if="destruction[0].degen && !destruction[1].degen">
    <h1>Degenerate the relics</h1>
    <h3>Remember when you 1st unlocked the relics? They were so nice weren't they? Well, except psi after the softcap. But still, it was nice. You must destroy them and gain ^2.5 time aswell as DESTROY the softcap</h3>
    <button @click="destroyRelics()" class="relic-button">Cost to destroy: {{destruction[1].cost}} time</button>
  </section>

  <section id="Destroyvoid" v-if="destruction[1].degen && !destruction[2].degen">
    <h1>Degenerate the void</h1>
    <h3>Remember when you unlocked void? Well, you probably forogt. But you might've remembered when its boost got changed to an exponent. The void shall fall now. Sacrifice it for a ^^1.05 boost to time</h3>
    <button @click="destryVoid()" class="Destroyvoidbut">Cost to destroy: {{destruction[2].cost}} time</button>
  </section>

  <section id="DestroyMT" v-if="destruction[2].degen && !destruction[3].degen">
    <h1>Degenerate the memory challenges AND theory of implication</h1>
    <h3>Remember when you unlocked memory challenges and theory of implication? They unlocked some very nice stuff right? Now you must sacrifice them for ^^1.5 more time. You are so close to resisting the mania.</h3>
    <button @click="destroyMemchallsandToI()" id="Destroythingie">Cost to destroy: {{destruction[3].cost}} time</button>
  </section>

  <section id="Rejdes" v-if="destruction[3].degen && !destruction[4].degen">
    <h1>Degenerate the... rejuvenation.</h1>
    <h3>You really fell for the tricks of the god of fundamentals. They tried to tell you to resist, but that was the plan. They knew that you weren't going to listen. You must let it in. Let the mania consume you.</h3>
    <button @click="destroyrej()" id="Rejdestruction">Cost to destroy: {{destruction[4].cost}} time</button>
  </section>
</template>

<style scoped>
#Rejdes {
  text-align: center;
  font-family: retro, monospace;
  margin: 0 auto;
}

#Rejdes h1 {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(to right, #00ff00, #32cd32, #006400);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

#Rejdes h3 {
  font-size: 1.2rem;
  background: linear-gradient(to right, #adff2f, #00fa9a, #006400);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

#Rejdestruction {
  display: block;
  margin: 20px auto;
  width: 280px;
  height: 100px;
  font-family: retro, monospace;
  font-size: 24px;
  color: #dd6060;
  background: linear-gradient(to right, #006400, #00a000, #32cd32);
  border: 3px solid #00ff00;
  border-radius: 8px;
  box-shadow: 0 0 15px #00ff00;
  cursor: pointer;
  transition: all 0.3s ease;
}

#Rejdestruction:hover {
  background: linear-gradient(to right, #00ff00, #7fff00, #006400);
  box-shadow: 0 0 25px #00ff00;
}

#Destroyrelics {
  color: rgb(207, 164, 22);
  font-family: retro, monospace;
  margin: 0 auto;
  text-align: center;
}
#DestroyMT h1, #DestroyMT h3 {
  background: linear-gradient(to right, rgb(19, 162, 228), rgb(255, 0, 234));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  font-family: retro, monospace;
}

#Destroythingie {
  width: 250px;
  height: 100px;
  font-family: retro, monospace;
  font-size: 25px;
  color: #f8f8f8;
  background-color: rgb(38, 25, 107);
  border: 2px solid rgb(15, 105, 179);
  display: block;
  margin: 20px auto;
  text-align: center;
}

#Destroyvoid {
  color: rgb(117, 117, 117);
  font-family: retro, monospace;
  margin: 0 auto;
  text-align: center;
}
.Destroyvoidbut {
    color: rgb(0, 0, 0);
    height: 100px;
    width: auto;
    background: linear-gradient(to right, grey, rgb(255, 255, 255));
    font-family: retro, monospace;
}
.gradient h1 {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(to right, black, rgb(175, 94, 94), red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-family: retro, monospace;
}
</style>
