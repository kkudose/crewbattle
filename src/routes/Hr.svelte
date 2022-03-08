<script>
	export let isVisible = false
</script>

<hr class={isVisible ? 'spacer' : 'invisibleSpacer'} />

<style>
	.spacer,
	.invisibleSpacer {
		margin: 32px;
	}

	.invisibleSpacer {
		border: 0;
	}
</style>
