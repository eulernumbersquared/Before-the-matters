<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { destruction } from './degen'

const gofDialogue = ref([
  "You destroyed everything.... for what..?",
  "The obsession of all the old memories got to you...",
  "Dont you realize it now?",
  "Remember how you got to this point..",
  "Rejuvenation, unlocked with time. Entropy, unlocked with time....",
  "And now look at how you destroyed everything......",
  "You used time to destroy it....",
  "The signs were there from the start....",
  "It seemed like you didn't care but...",
  "Now it is too late....",
  "Time, the destroyer of all things, has made you a useless empty vessel....",
  "The mania shall now consume you......"
])

const currentLine = ref(0)
const maniaTriggered = ref(false)
const creditsTriggered = ref(false)
let intervalId: number | null = null
let maniaTimeout: number | null = null
let creditsTimeout: number | null = null

onMounted(() => {
  intervalId = setInterval(() => {
    if (currentLine.value < gofDialogue.value.length - 1) {
      currentLine.value++
    } else {
      clearInterval(intervalId!)
      
      maniaTimeout = setTimeout(() => {
        maniaTriggered.value = true
        
        creditsTimeout = setTimeout(() => {
          creditsTriggered.value = true
        }, 7000) 
      }, 5000)
    }
  }, 2500) 
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
  if (maniaTimeout) clearTimeout(maniaTimeout)
  if (creditsTimeout) clearTimeout(creditsTimeout)
})
</script>

<template>
  
  <section id="RejDialogue" v-if="destruction[4].degen && !maniaTriggered">
    <h1 id="GoF">{{ gofDialogue[currentLine] }}</h1>
  </section>

  
  <section v-if="maniaTriggered && !creditsTriggered" id="ManiaEnding">
    <h1>The mania has consumed you...</h1>
  </section>

  
  <section v-if="creditsTriggered" id="Credits">
    <h1>Thanks for playing "Before the matters"!</h1>
    <p>By e^2, for "Suki's game jam" held in "Infinistal's server"</p>
    <p>Sadly i worked alone so all the text, HTML and styling was made by me. But shoutout to mrredshark for the softcap and ddwd0779 for the void-time formula!</p>
    <p>If you wanna go back to the start of degeneration, you can reload to the page.</p>
    <p>Join my server for future projects</p>
    <p>See you in Beyond the limits!!!!!!!!!</p>
  </section>
</template>

<style scoped>
#GoF {
  font-size: 2rem;
  text-align: center;
  background: linear-gradient(to right, #ffffff, #6d6d6d, #4e4e4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: retro, monospace;
}

#ManiaEnding {
  position: fixed;
  inset: 0;
  background-color: black;
  color: white;
  font-family: retro, monospace;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeToBlack 8s forwards;
}

@keyframes fadeToBlack {
  0% { background-color: rgba(0,0,0,0); color: white; }
  100% { background-color: black; color: white; }
}

#Credits {
  position: fixed;
  inset: 0;
  background-color: black;
  color: rgb(255, 255, 255);
  font-family: retro, monospace;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
