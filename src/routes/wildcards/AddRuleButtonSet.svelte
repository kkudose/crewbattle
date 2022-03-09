<script lang="ts">
	import { Button, ButtonSet } from 'carbon-components-svelte'
	import Add16 from 'carbon-icons-svelte/lib/Add16'

	export let handleAddRule: Function
	export let crewId: number

	const buttonKind = crewId ? 'primary' : 'danger'
</script>

<ButtonSet>
	<Button kind={buttonKind} on:click={(_e) => handleAddRule(crewId, true)} icon={Add16}
		>add sniper rule</Button
	>
	<Button kind={buttonKind} on:click={(_e) => handleAddRule(crewId, false)} icon={Add16}
		>add spy rule</Button
	>
</ButtonSet>
