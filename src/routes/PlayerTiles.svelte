<script lang="ts">
	import { Button, Tile } from 'carbon-components-svelte'
	import { dndzone } from 'svelte-dnd-action'

	import type { Player } from './Player'
	import Heart from './Heart.svelte'

	export let players: Player[] = []
	export let onDrop

	const handleFinalize = (e) => {
		onDrop(e.detail.items)
	}

	const HEART = '❤️'
	const BROKEN_HEART = '💔'

	const dropTargetStyle = { outline: '#0f62fe dashed 2px' }
</script>

<section
	use:dndzone={{ items: players, dropTargetStyle }}
	on:consider={handleFinalize}
	on:finalize={handleFinalize}
>
	{#each players as { id, name, livesTakenBy } (id)}
		<Tile class="tile">
			<span>
				{name}
			</span>
			<!-- <span class="hearts">
				{#each { length: livesTakenBy.length } as _}
					{BROKEN_HEART}
				{/each}
				{#each { length: numLives - livesTakenBy.length } as _}
					<Heart {handleOnClick} />
				{/each}
			</span> -->
		</Tile>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		padding: 16px;
	}

	:global(.tile) {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}

	:global(.hearts) {
		font-size: 24px;
	}
</style>
