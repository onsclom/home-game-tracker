<script lang="ts">
	import type { Entry } from '$lib/types';
	import { ledger } from '$lib/stores';

	$: totalOnTable = computeTableSum($ledger);

	function computeTableSum(ledger: Entry[]) {
		return ledger.reduce(
			(sum, entry) => sum + (entry.type == 'buy in' ? entry.amount : -entry.amount),
			0
		);
	}
	let test: Test = 'test';
</script>

<p><b>${totalOnTable}</b> <span>currently on table</span></p>

<div>
	<button>add buy in</button>
	<button>add cash out</button>
</div>

<ul id="history">
	{#each $ledger as event}
		<li>{event.name} had a {event.type} for ${event.amount}</li>
	{/each}
</ul>
<button>see results</button>

<style>
</style>
