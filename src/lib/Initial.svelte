<script lang="ts">
	import { ledger } from '$lib/stores';
	import NewPlayers from '$lib/NewPlayers.svelte'
	let nameText = '';
	let startBuyin = 0;
	let allPlayers:string[] = []

	function startSession() {
		// let players = nameText.split('\n');
		$ledger = allPlayers.map((player) => ({
			type: 'buy in',
			name: player,
			amount: startBuyin,
			timestamp: new Date()
		}));
	}


</script>

<form on:submit|preventDefault={startSession} on:keypress={(e) => {
	if(e.code === 'Enter')
	{
		e.preventDefault()
		e.currentTarget.value
		return false
	}
}}>
	<div>
		<label for="player-names-textarea">player names (seperated by new lines):</label>
		<textarea bind:value={nameText} id="player-names-textarea" />
		<NewPlayers bind:allPlayers={allPlayers}/>
	</div>
	<div>
		<label for="starting-buyin-input">starting buy in:</label>
		<input
			type="number"
			bind:value={startBuyin}
			step=".01"
			id="starting-buyin-input"
			inputmode="decimal"
		/>
	</div>
	<input type="submit" value="start session" />
</form>

<style>
</style>
