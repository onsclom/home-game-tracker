<script lang="ts">
	import { ledger, state } from '$lib/stores';
	let nameText = '';
	let startBuyin = 0;

	function startSession() {
		let players = nameText.split('\n');
		$ledger = players.map((player) => ({
			type: 'buy in',
			name: player,
			amount: startBuyin,
			timestamp: new Date()
		}));
		$state += 1;
	}
</script>

<form on:submit|preventDefault={startSession}>
	<div>
		<label for="player-names-textarea">player names (seperated by new lines):</label>
		<textarea bind:value={nameText} id="player-names-textarea" />
	</div>
	<div>
		<label for="starting-buyin-input">starting buy in:</label>
		<input type="number" bind:value={startBuyin} id="starting-buyin-input" inputmode="decimal" />
	</div>
	<input type="submit" value="start session" />
</form>

<style>
</style>
