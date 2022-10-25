<script>
	import '../app.css';
</script>

<div class="main-bg">
	<slot />
</div>

<style>
	.main-bg {
		min-height: 100%;
		min-width: 100%;
		background-color: #0f172a;
		background: radial-gradient(at 50% bottom, #334155 #0f172a);
		color: #e2e8f0;
		margin: 0;
		padding-inline: 10%;
		padding-top: 3rem;
	}
</style>
