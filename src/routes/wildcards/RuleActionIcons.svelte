<script lang="ts">
	import { Button } from 'carbon-components-svelte'
	import Copy16 from 'carbon-icons-svelte/lib/Copy16'
	import TrashCan16 from 'carbon-icons-svelte/lib/TrashCan16'
	import type { Rule } from './rules'

	export let rule: Rule
	export let crewId: number
	export let handleRemoveRule: (crewId: number, rulewId: number) => void

	const handleCopy = (textToCopy: string) => {
		navigator.clipboard.writeText(textToCopy)
	}
</script>

<div class="icons">
	<Button
		class="btn"
		on:click={(_e) => handleCopy(`${rule.name}: ${rule.description}`)}
		kind="tertiary"
		icon={Copy16}
		iconDescription="copy rule"
	/>
	<Button
		class="btn"
		on:click={(_e) => handleRemoveRule(crewId, rule.id)}
		kind="danger-tertiary"
		icon={TrashCan16}
		iconDescription="remove rule"
	/>
</div>

<style>
	.icons {
		display: flex;
		justify-content: flex-end;
		margin-bottom: -24px;
	}

	:global(.btn) {
		background-color: #262626;
	}
</style>
