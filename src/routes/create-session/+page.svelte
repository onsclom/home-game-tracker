<script lang="ts">
	import { goto } from '$app/navigation';
	import { sessionData, sessionNames } from '$lib/stores';
	let nameText = '';
	let startBuyin = 0;
	let sessionNameInput = '';

	function startSession() {
		let players = nameText.split('\n');
		$sessionData = {
			name: sessionNameInput,
			ledger: players.map((playerName) => ({
				type: 'buy in',
				name: playerName,
				amount: startBuyin,
				timestamp: new Date()
			})),
			tags: []
		};

		$sessionNames = [...$sessionNames, sessionNameInput];
		goto(`/session/${encodeURIComponent(sessionNameInput)}`);
	}
</script>

<form on:submit|preventDefault={startSession}>
	<div>
		<label for="player-names-textarea">player names (seperated by new lines):</label>
		<textarea bind:value={nameText} id="player-names-textarea" />
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
	<div>
		<label for="session-name">session name:</label>
		<input bind:value={sessionNameInput} id="session-name" />
	</div>
	<input type="submit" value="start session" />
</form>

<style>
</style>
