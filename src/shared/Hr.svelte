<!-- 
	svelte carbon components don't implement layout for some strange reason
	simpler to add spacing with this than override the theming
-->
<script lang="ts">
	type Size = 'sm' | 'md' | 'lg'

	export let isVisible = false
	export let size: Size = 'md'

	const styles = `${!isVisible && 'no-border'} ${size}`
</script>

<hr class={styles} />

<style>
	.sm {
		margin: 24px;
	}

	.md {
		margin: 32px;
	}

	.lg {
		margin: 48px;
	}

	.no-border {
		border: 0;
	}
</style>
