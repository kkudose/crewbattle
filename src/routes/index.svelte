<script lang="ts">
	import _ from 'lodash'
	import 'carbon-components-svelte/css/g100.css'
	import {
		Button,
		ButtonSet,
		Column,
		CopyButton,
		Grid,
		Row,
		Slider,
		TextInput,
		Tile
	} from 'carbon-components-svelte'
	import UserFollow16 from 'carbon-icons-svelte/lib/UserFollow16'
	import Locked16 from 'carbon-icons-svelte/lib/Locked16'
	import DragDrop from './DragDrop.svelte'
	import Hr from './Hr.svelte'

	interface Player {
		id: number
		name: string
	}

	let isRandom = true
	let numGroups = 2
	let numPlayers = 0
	let groups: Player[][] = [...Array(numGroups)].map(() => [])
	let playerName = ''
	let isPlayerNameInvalid = false

	const handleAddPlayer = () => {
		isPlayerNameInvalid = Boolean(!playerName)
		if (isPlayerNameInvalid) {
			return
		}

		numPlayers += 1
		const defaultGroup = groups[0]
		defaultGroup.push({ name: playerName, id: numPlayers })
		playerName = ''

		// re-render
		groups = groups
		console.log(groups)
	}

	const handleAddPlayerEnter = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleAddPlayer()
		}
	}

	const handleNumGroupChange = (e) => {
		const sliderVal = e.detail
		if (numGroups !== sliderVal) {
			numGroups = sliderVal
			const allPlayers = groups.flat()
			groups = [...Array(e.detail)].map(() => [])
			groups[0] = allPlayers
		}
	}

	const handleRandomize = () => {
		const newGroups = [...Array(numGroups)].map(() => [])

		const allPlayers = _.shuffle(groups.flat())
		let groupIndex = 0
		for (const p of allPlayers) {
			newGroups[groupIndex].push(p)
			groupIndex = groupIndex === numGroups - 1 ? 0 : groupIndex + 1
		}

		groups = newGroups
		isRandom = false
	}
</script>

<svelte:head>
	<title>a crew battle</title>
</svelte:head>

<Grid>
	<Hr />
	<Row>
		<Column>
			<h1>a crew battle</h1>
		</Column>
	</Row>
	<Hr />
	<Row>
		<Column>
			<TextInput
				autofocus
				bind:value={playerName}
				invalid={isPlayerNameInvalid}
				invalidText="name is required"
				labelText="player name"
				on:keyup={handleAddPlayerEnter}
				placeholder="enter name..."
				size="xl"
			/>
		</Column>
		<Column>
			<Button id="addPlayerBtn" on:click={handleAddPlayer} icon={UserFollow16}>add player</Button>
		</Column>
		<Column
			><Slider
				max={6}
				min={2}
				labelText="how many crews?"
				on:change={handleNumGroupChange}
				step={2}
				value={numGroups}
			/></Column
		>
	</Row>
	<Hr />
	<Row>
		{#each groups as g, index}
			<Column>
				<Tile>
					crew {index}
					<DragDrop items={g} onDrop={(items) => (g = items)} />
				</Tile>
			</Column>
		{/each}
	</Row>
	<Hr />
	<Row>
		<Column>
			<ButtonSet>
				<Button on:click={handleRandomize} kind="danger" size="xl"
					>{isRandom ? 'randomize' : '"randomize" (again)'}</Button
				>
				<Button on:click={handleRandomize} icon={Locked16} kind="tertiary" size="xl"
					>lock in crews</Button
				>
			</ButtonSet>
		</Column>
	</Row>
</Grid>
<CopyButton text="Carbon svelte" feedback="Copied to clipboard" />

<style>
	:global(#addPlayerBtn) {
		margin-top: 24px;
	}
</style>
