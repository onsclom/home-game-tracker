<script lang="ts">
	import { sessionData } from '$lib/stores';
</script>

<div class="">
	{#each $sessionData.ledger as event}
		<div class="entry">
			{#if event.type == 'buy in' || event.type == 'cash out'}
				<b>{event.name}</b>
				<b class={event.type.split(' ')[0]}>{event.type == 'buy in' ? 'bought in' : 'cashed out'}</b
				>
				for
				<b>${event.amount.toFixed(2)} </b>
				<span><i>({new Date(event.timestamp).toLocaleTimeString()}</i>)</span>
			{:else if event.type == 'stand up' || event.type == 'sit down'}
				<b>{event.name}</b> <b>{event.type == 'stand up' ? '🧍' : '🪑'}</b>
				<span><i>({new Date(event.timestamp).toLocaleTimeString()}</i>)</span>
			{/if}
		</div>
	{/each}
</div>

<style>


	.buy {
		@apply text-red-500
	}

	.cash {
		@apply text-emerald-500
	}

	.entry {
		margin: 0.25rem;
	}
</style>