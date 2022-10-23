<script lang="ts">
	import { playerNets, playerBuyIns, playerCashOuts } from '$lib/stores';

	export let player = '';
</script>

<div class='italic text-slate-400 flex flex-row'>
	${$playerCashOuts[player] ? $playerCashOuts[player] : 0} - ${$playerBuyIns[player]} = {$playerNets[
		player
	] >= 0
		? '$'
		: '-$'}
		<p class={`${$playerNets[player] > 0? 'text-emerald-500' : 'text-red-500'}`}>
			{Math.abs($playerNets[player])}
		</p>
		
		
</div>
