<script lang="ts">
	import { sessionData } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { tick } from 'svelte';

	let historyHolder: HTMLElement;
	async function scrollToBottom() {
		await tick();
		if (historyHolder != undefined) {
			historyHolder.scrollTo(0, historyHolder.scrollHeight);
		}
	}

	$: {
		$sessionData;
		scrollToBottom();
	}
</script>

<div class="bg-slate-800 pr-10 pl-3 overflow-auto h-full md:fade-out" bind:this={historyHolder}>
	{#each $sessionData.ledger as event, i (event)}
		<div class="entry" animate:flip={{ duration: 300 }} in:fly={{ x: -200, duration: 400 }}>
			{#if event.type == 'buy in' || event.type == 'cash out'}
				<b>{event.name}</b>
				<b class={event.type.split(' ')[0]}>{event.type == 'buy in' ? 'bought in' : 'cashed out'}</b
				>
				for
				<b>${event.amount.toFixed(2)} </b>
				<span><i>({new Date(event.timestamp).toLocaleTimeString()}</i>)</span>
			{:else if event.type == 'stand up' || event.type == 'sit down'}
				<b>{event.name}</b> <b>{event.type == 'stand up' ? '🧍' : '🪑'}</b>
				<span
					><i class="whitespace-nowrap">({new Date(event.timestamp).toLocaleTimeString()}</i>)</span
				>
			{/if}
		</div>
	{/each}
</div>

<style>
	@tailwind utilities;
	.buy {
		@apply text-red-500;
	}

	.cash {
		@apply text-emerald-500;
	}
	.entry {
		margin: 0.25rem;
	}
</style>
