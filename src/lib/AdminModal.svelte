<script lang="ts">
	import { sessionData } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	export let visible = false;
	let adminJSON = JSON.stringify($sessionData.ledger, null, 2);
	sessionData.subscribe((session) => {
		adminJSON = JSON.stringify(session.ledger, null, 2);
	});

	function updateFromAdmin() {
		navigator.clipboard.writeText(adminJSON);
		$sessionData.ledger = JSON.parse(adminJSON);
		$sessionData = $sessionData;
		visible = false;
	}
</script>

<Modal bind:visible>
	<form on:submit|preventDefault={updateFromAdmin}>
		<textarea class="bg-slate-900 border-none outline-none" bind:value={adminJSON} />
		<div>
			<button
			class="bg-transparent hover:bg-slate-300/20 transition-colors text-slate-100 font-semibold  py-3 px-6  hover:border-transparent rounded flex flex-row max-w-fit"
			>
				Update
			</button>
		</div>
		<form />
	</form>
</Modal>

<style>
	textarea {
		width: 100%;
		height: 10rem;
		resize: both;
	}

	div {
		margin: 1rem 0;
	}
</style>
