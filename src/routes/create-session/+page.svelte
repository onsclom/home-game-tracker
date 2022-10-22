<script lang="ts">
	import { goto } from '$app/navigation';
	import { sessionData, sessionNames } from '$lib/stores';
	import NewPlayers from '$lib/NewPlayers.svelte';
	import RightArrow from '$lib/RightArrow.svelte';
	import { fade } from 'svelte/transition';
	let allPlayers: string[] = [];
	let startBuyin = 20;
	let sessionNameInput = '';
	console.log();

	function startSession() {
		if (sessionNameInput.trim() == '' || allPlayers.length < 2 || startBuyin === 0) {
			return;
		}
		$sessionData = {
			name: sessionNameInput,
			ledger: allPlayers.map((playerName) => ({
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

<div
	in:fade={{ delay: 250, duration: 250 }}
	out:fade={{ duration: 250 }}
	class="grid grid-flow-row sm:grid-flow-col justify-between max-w-full min-w-fit"
>
	<form
		class="p-5"
		on:submit|preventDefault={startSession}
		on:keypress={(e) => {
			if (e.code === 'Enter') {
				e.preventDefault();
				e.currentTarget.value;
				return false;
			}
		}}
	>
		<div class="input-wrapper">
			<input
				placeholder=" "
				id="new-name"
				class="input"
				on:submit|preventDefault
				on:keydown={(e) => {
					if (e.code === 'Enter' && e.currentTarget.value.replace(/\s/g, '') !== '') {
						allPlayers = [...new Set([...allPlayers, e.currentTarget.value])];
						e.currentTarget.value = '';
					}
				}}
			/>
			<label class="input-label" for="new-name">New Player</label>
		</div>
		<div class="input-wrapper">
			<input
				placeholder=" "
				class="input"
				type="number"
				bind:value={startBuyin}
				step=".01"
				id="starting-buyin-input"
				inputmode="decimal"
			/>
			<label class="input-label" for="starting-buyin-input">Starting Buy In</label>
		</div>
		<div class="input-wrapper">
			<input placeholder=" " class="input" bind:value={sessionNameInput} id="session-name" />
			<label class="input-label" for="session-name">Session Name</label>
		</div>
		<button
			class="bg-transparent hover:bg-slate-300/20 transition-colors text-slate-100 font-semibold  py-3 px-6  hover:border-transparent rounded flex flex-row max-w-fit"
		>
			Start Session
			<RightArrow class="ml-3" />
		</button>
	</form>
	<div class="display-container pr-2 mr-3">
		<h1 class="title">
			{#each sessionNameInput.split(' ') as word, i (i)}
				<div class="flex flex-row pl-6 overflow-hidden">
					{#each [...word] as char, j (j)}
						<div class="title-char">
							{char}
						</div>
					{/each}
				</div>
			{/each}
		</h1>
		<div class="flex flex-col content-end">
			<h2 class="player-title">Current Players</h2>
			<NewPlayers bind:allPlayers bind:startBuyin />
		</div>
	</div>
</div>

<style>
	.title {
		@apply border-slate-300 border-b-2;
		min-width: 0;
		min-height: 8rem;
		font-size: 5rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.title-char {
		opacity: 1;
		transition: opacity 0;
		transition-duration: 50ms;
	}

	.player-title {
		@apply text-slate-300;
		padding-top: 4rem;
		font-style: italic;
		text-align: end;
		font-size: 3rem;
	}

	.display-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		overflow: hidden;
	}
</style>
