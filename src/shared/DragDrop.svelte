<script>
	import { Button } from 'carbon-components-svelte'
	import { dndzone } from 'svelte-dnd-action'

	export let items = []
	export let onDrop

	const handleFinalize = (e) => {
		onDrop(e.detail.items)
	}
</script>

<section use:dndzone={{ items }} on:consider={handleFinalize} on:finalize={handleFinalize}>
	{#each items as item (item.id)}
		<Button kind="secondary">
			{item.name}
		</Button>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		padding: 16px;
	}
</style>
