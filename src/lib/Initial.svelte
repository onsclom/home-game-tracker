<script lang="ts">
  import { players, ledger, state } from "$lib/stores"

  let nameText = ""
  let startBuyin = 0
  let names: string[] = []
  let states = []

  function startSession() {
    $players = nameText.split("\n")
    startBuyin = +startBuyin
    $players.forEach( player => {
      $ledger = [...$ledger, {type: "buy in", name: player, amount: startBuyin}]
    })
    $state += 1
  }
</script>

<form on:submit|preventDefault="{startSession}">
<label for="player-names-textarea">player names (seperated by new lines):</label>
<textarea bind:value={nameText} id="player-names-textarea"></textarea>
<label for="starting-buyin-input">starting buy in:</label>
<input bind:value={startBuyin} id="starting-buyin-input" type="decimal">
<input type="submit" value="start session">
</form>

<style>

</style>