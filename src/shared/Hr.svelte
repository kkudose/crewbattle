<!-- 
	svelte carbon components don't implement layout for some strange reason
	simpler to add spacing with this than override the theming
-->
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
