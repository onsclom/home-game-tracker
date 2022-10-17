<script lang="ts">
	import { ledger } from '$lib/stores';
</script>

<div class="event-holder">
	{#each $ledger as event}
		<div class="entry">
			{#if event.type == 'buy in' || event.type == 'cash out'}
				<b>{event.name}</b> did a <b class={event.type.split(' ')[0]}>{event.type}</b> for
				<b>${event.amount.toFixed(2)} </b>
				<span><i>({new Date(event.timestamp).toLocaleTimeString()}</i>)</span>
			{:else if event.type == 'stand up' || event.type == 'sit down'}
				<b>{event.name}</b> <b>{event.type}</b>
				<span><i>({new Date(event.timestamp).toLocaleTimeString()}</i>)</span>
			{/if}
		</div>
	{/each}
</div>

<style>
	.buy {
		color: #a00;
	}

	.cash {
		color: #0a0;
	}

	.event-holder {
		display: flex;
		flex-direction: column;
		justify-content: end;
	}

	.playing-holder {
		display: flex;
	}

	.entry {
		margin: 0.25rem;
	}
</style>
