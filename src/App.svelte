<script lang="ts">
  import data from './assets/questionnaire.json'
  import type { CardEntry } from "./types";
  import Card from "./card.svelte";

  console.log(data);

  function shuffleArray(arr : CardEntry[]) : CardEntry[] {
      return arr.sort(function (a, b) {
        return Math.random() - 0.5;
      });
  }

  let failed = $state(false);
  let progression = $state(2)
  let shuffledEntries = $state(shuffleArray(data.entries));
  let shownEntries = $derived(shuffledEntries.slice(0, progression));
  let secondToLastEntry = $derived(shuffledEntries[progression - 2]);
  let lastEntry = $derived(shuffledEntries[progression - 1]);

  function higher() {
    if (secondToLastEntry.count > lastEntry.count) {
      failed = true;
    } else {
      progression += 1;
    }
  }

  function lower() {
    if (secondToLastEntry.count < lastEntry.count) {
      failed = true;
    } else {
      progression += 1;
    }
  }

  function reset() {
    progression = 2;
    shuffledEntries = shuffleArray(data.entries);
    failed = false;
  }
</script>

<main>
  <div class="background">
    {#each shownEntries as e}
      <div>
        <Card card={e} hide_number={e == lastEntry && !failed} />
      </div>
    {/each}
  </div>

  <div class="header">
    <h1>{data.question}</h1>
  </div>

  <div class="controls">
    {#if failed}
      <h1 style="margin-bottom: 0;">That's not correct!</h1>
      <h1>Score: {progression - 2}</h1>
      <button onclick={reset}>Try again?</button>
    {:else}
      <h1>Score: {progression - 2}</h1>
      <div class="buttons">
        <button onclick={higher}>Higher</button>
        <button onclick={lower}>Lower</button>
      </div>
    {/if}
  </div>
</main>

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10em;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .background > * {
    top: 0;
    transition:left 1s linear;
    width: 50%;
    height: 100%;
  }

  .background > *:not(:last-child) {
    position: absolute;
    left: 0;
  }

  .background > *:last-child {
    position: absolute;
    left: 50%;
    animation: 1.2s fadeIn;
    animation-fill-mode: forwards;
    opacity: 0;
  }

  .background:not(:has(> :nth-child(3))) > *:last-child
  {
    animation: none;
    opacity: 1;
    transition: none;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .buttons {
    display: flex;
    gap: 1em;
    flex-direction: column;
  }

  .buttons > button {
    flex-grow: 1;
  }

@keyframes fadeIn {
  80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
