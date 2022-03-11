<script lang="ts">
	import { Tag, Tile } from 'carbon-components-svelte'
	import Timer16 from 'carbon-icons-svelte/lib/Timer16'

	import Hr from '../../shared/Hr.svelte'
	import type { Rule } from './rules'

	export let rule: Rule
</script>

<Tile>
	<h3>
		{rule.name}
		{#if rule.description.includes('Only lasts a single round')}
			<Tag class="tag" type="purple">temporary <Timer16 class="timer" /></Tag>
		{/if}
	</h3>
	<Hr size="sm" />
	<p>{rule.description}</p>
</Tile>

<style>
	:global(.tag) {
		border-radius: 0;
		margin-left: 16px;
		vertical-align: text-bottom;
	}

	:global(.timer) {
		vertical-align: bottom;
	}
</style>
