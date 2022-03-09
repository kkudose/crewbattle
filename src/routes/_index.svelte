<script lang="ts">
	import _ from 'lodash'
	import 'carbon-components-svelte/css/g100.css'
	import {
		Button,
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

	import DragDrop from '../shared/DragDrop.svelte'
	import Hr from '../shared/Hr.svelte'

	interface Player {
		id: number
		name: string
	}

	let numRandomize = 0
	let randomizeText = 'randomize'
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

	const randomizeTexts = [
		'randomize',
		'more random',
		'rig crews',
		'really rig crews',
		'truly RNG',
		'just one more click',
		'crew battles postponed until clicking ends',
		'you might have a problem'
	]
	const handleRandomize = () => {
		const newGroups = [...Array(numGroups)].map(() => [])

		const allPlayers = _.shuffle(groups.flat())
		let groupIndex = 0
		for (const p of allPlayers) {
			newGroups[groupIndex].push(p)
			groupIndex = groupIndex === numGroups - 1 ? 0 : groupIndex + 1
		}

		groups = newGroups
		numRandomize = numRandomize === randomizeTexts.length - 1 ? 0 : numRandomize + 1
		randomizeText = randomizeTexts[numRandomize]
	}
</script>

<svelte:head>
	<title>crew battle</title>
</svelte:head>

<Grid>
	<Hr />
	<Row>
		<Column>
			<h1>crew battle</h1>
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
				labelText="how many crews?"
				max={6}
				min={2}
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
			<Button kind="tertiary" on:click={handleRandomize} size="xl">{randomizeText}</Button>
			<Button icon={Locked16} kind="danger" on:click={handleRandomize} size="xl"
				>lock in crews</Button
			>
		</Column>
		<Column />
	</Row>
</Grid>
<CopyButton feedback="Copied to clipboard" text="Carbon svelte" />

<style>
	:global(#addPlayerBtn) {
		margin-top: 24px;
	}
</style>
