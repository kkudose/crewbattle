<script lang="ts">
	import { Button, ButtonSet } from 'carbon-components-svelte'
	import Add16 from 'carbon-icons-svelte/lib/Add16'

	import type { Role } from './Role'

	export let handleAddRule: (crewId: number, role: Role) => void
	export let crewId: number

	const buttonKind = crewId ? 'primary' : 'danger'
</script>

<ButtonSet>
	<Button kind={buttonKind} on:click={(_e) => handleAddRule(crewId, 'sniper')} icon={Add16}
		>add sniper rule</Button
	>
	<Button kind={buttonKind} on:click={(_e) => handleAddRule(crewId, 'spy')} icon={Add16}
		>add spy rule</Button
	>
</ButtonSet>
