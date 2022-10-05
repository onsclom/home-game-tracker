<script lang="ts">
	import { ledger } from './stores';
	import type { Entry } from './types';

	$: totalOnTable = computeTableAmount($ledger);

	function computeTableAmount(ledger: Entry[]) {
		let sum = 0;
		ledger.forEach((entry) => {
			sum += entry.amount * (entry.type == 'buy in' ? 1 : -1);
		});
		return sum;
	}
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
