<script setup lang="ts">
import { ref } from 'vue'
import { gameData } from './main'

const revealed = ref(false)
const currentMessage = ref('')

let flashInterval: number | null = null

function revealTruth() {
  revealed.value = true
  const scriptLines = [
    "You see the oldest memories. The one that you yearned to find for so long",
    "You see what it was and....",
    "Oh.... god.....",
    "You forgot these for a reason",
    "Why did you force yourself to remember?",
    "Did the obsession really get you?",
    "You must destroy it all",
    "You must activate the degeneration machine....."
  ]

  scriptLines.forEach((line, i) => {
    setTimeout(() => {
      currentMessage.value = line

      if (line === "You see what it was and....") {
        setTimeout(() => {
          startFlashing()
        }, 1000)
      }

      if (i === scriptLines.length - 1) {
        setTimeout(() => {
          fadeBack()
        }, 4000)
      }
    }, i * 4000)
  })
}

function startFlashing() {
  const colors = ['red','blue','green','purple','yellow','maroon','purple']
  let i = 0
  flashInterval = window.setInterval(() => {
    const overlay = document.getElementById('overlay')
    if (overlay) {
      overlay.style.backgroundColor = colors[i % colors.length]
    }
    i++
  }, 1000)
}

function fadeBack() {
  const overlay = document.getElementById('overlay')
  if (overlay) {
    overlay.classList.add('fade-out')
    setTimeout(() => {
      resetTruth()
      overlay.classList.remove('fade-out')
      gameData.derejuvenationunl = true
      gameData.truthreveal = true 
    }, 2000)
  }
}



function resetTruth() {
  revealed.value = false
  currentMessage.value = ''
  const overlay = document.getElementById('overlay')
  if (overlay) overlay.style.backgroundColor = 'black'
  if (flashInterval !== null) {
    clearInterval(flashInterval)
    flashInterval = null
  }
}
</script>

<template>
  <div v-if="!revealed" id="app-content">
    <button v-if="!gameData.derejuvenationunl && !gameData.truthreveal"
        id="truth" @click="revealTruth">REVEAL THE TRUTH</button>
<h2 v-else class="final-text">You know what you have to do....</h2>
  </div>

  <div v-else id="overlay">
    <transition name="fade" mode="out-in">
      <h1 :key="currentMessage">{{ currentMessage }}</h1>
    </transition>
  </div>
</template>

<style>
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: background-color 1s ease;
}

#overlay h1 {
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  font-family: retro, monospace;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-out {
  animation: overlayFadeOut 2s forwards;
}
@keyframes overlayFadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

#truth {
  display: block;
  margin: 20px auto;
  text-align: center;
  height: 200px;
  width: 400px;
  background-color: maroon;
  outline-color: red;
  outline-style: auto;
  font-size: 30px;
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
}

.final-text {
  text-align: center;
  font-size: 2rem;
  color: maroon;
  font-family: 'Orbitron', sans-serif;
  margin-top: 40px;
}
</style>
