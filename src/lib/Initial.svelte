<script lang="ts">
	import { ledger } from '$lib/stores';
	import NewPlayers from '$lib/NewPlayers.svelte'
	let startBuyin = 20;
	let allPlayers:string[] = []

	function startSession() {
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
		<NewPlayers bind:allPlayers={allPlayers} bind:startBuyin={startBuyin}/>
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
