<script lang="ts">
	import { playerNets, playerBuyIns, playerCashOuts } from '$lib/stores';

	export let player = '';
</script>

${$playerCashOuts[player] ? $playerCashOuts[player] : 0} - ${$playerBuyIns[player]} = ${$playerNets[
	player
]}
