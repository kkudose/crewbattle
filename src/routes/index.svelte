<script lang="ts">
	import { fly } from 'svelte/transition'
	import _ from 'lodash'
	import 'carbon-components-svelte/css/g100.css'
	import {
		Button,
		Column,
		Dropdown,
		Grid,
		InlineNotification,
		Row,
		Slider,
		TextInput,
		Tile,
		TooltipIcon
	} from 'carbon-components-svelte'
	import UserFollow16 from 'carbon-icons-svelte/lib/UserFollow16'
	import WarningAlt16 from 'carbon-icons-svelte/lib/WarningAlt16'
	import Share16 from 'carbon-icons-svelte/lib/Share16'

	import type { Player } from './Player'
	import PlayerTiles from './PlayerTiles.svelte'
	import Hr from '../shared/Hr.svelte'
	import { HEART, BROKEN_HEART } from './hearts'
	let isNotificationVisible = false
	let numRandomize = 0
	let randomizeText = 'randomize'
	let numCrews = 2
	// let numLives = 3
	let numPlayers = 0
	let crews: Player[][] = [...Array(numCrews)].map(() => [])
	let playerName = ''
	let isPlayerNameValid = true
	let crewNum = 0

	$: crewNumsDropdown = [...Array(numCrews).keys()].map((c) => {
		return { id: c, text: `${c}` }
	})

	const handleAddPlayer = () => {
		// anything besides an empty name is ok
		isPlayerNameValid = Boolean(playerName)
		if (!isPlayerNameValid) {
			return
		}

		numPlayers += 1
		crews[crewNum].push({ id: numPlayers, name: playerName, livesTakenBy: [] })
		playerName = ''

		// force re-render
		crews = crews
	}

	const handleAddPlayerEnter = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleAddPlayer()
		}
	}

	const handleNumCrewChange = () => {
		const allPlayers = crews.flat()
		crews = [...Array(numCrews)].map(() => [])
		crews[0] = allPlayers
		crewNum = 0
	}

	const randomizeTexts = [
		'randomize',
		'more random',
		'rig crews',
		'really rig crews',
		'truly RNG crews',
		'just one more click',
		'just... one... more... click...',
		'crew battles postponed while the worst version of cookie clicker continues',
		'continue clicking addiction',
		'row, row, row your boat',
		'gently down the stream',
		'merrily merrily, merrily, merrily',
		'life is but a meme',
		'you might have a problem'
	]
	const handleRandomize = () => {
		const newCrews = [...Array(numCrews)].map(() => [])

		const allPlayers = _.shuffle(crews.flat())
		let crewIndex = 0
		for (const p of allPlayers) {
			newCrews[crewIndex].push(p)
			crewIndex = crewIndex === numCrews - 1 ? 0 : crewIndex + 1
		}

		crews = newCrews
		numRandomize = numRandomize === randomizeTexts.length - 1 ? 0 : numRandomize + 1
		randomizeText = randomizeTexts[numRandomize]
	}

	const handleShare = () => {
		// show notification
		isNotificationVisible = true

		const result = []
		// let index = 0

		for (const [index, crew] of crews.entries()) {
			result.push(`crew ${index}: `)
			result.push(crew.map((c) => c.name).join(', ') + '\n')
		}

		navigator.clipboard.writeText(result.join('\n'))

		// TODO store, calc scores
		// const crewLeft = crews[0]
		// const crewRight = crews[1]
		// const biggerCrewLen = Math.max(crewLeft.length, crewRight.length)
		// for (let j = 0; j < biggerCrewLen; j += 1) {
		// 	const playerLeft = crewLeft[j]
		// 	const playerRight = crewRight[j]
		// 	for (let { name, livesTakenBy } of [playerLeft, playerRight]) {
		// 		result.push(`${name} `)
		// 		result.push(`${HEART.repeat(numLives - livesTakenBy.length)}`)
		// 		result.push(`${BROKEN_HEART.repeat(livesTakenBy.length)} `)
		// 		result.push('vs ')
		// 	}
		// 	result.pop()
		// }

		// Team Tabsies - Lavinuke, Wrestler, Martini
		// [Ballroom] :sniperScope:  Adafheyesh ❤️ 💔 vs Tabsies 💔  💔
		// [High-Rise] : Adafheyesh 💔 💔  vs Wrestler :sniperScope:  ❤️ ❤️

		// Tasbies ❤️💔💔💔 🤛 Tabsies
		// Tasbies 🤜 Tabsies ❤️💔💔💔
		// Tasbies 🤜 Tabsies ☠️
	}
</script>

<svelte:head>
	<title>crew battle</title>
</svelte:head>

{#if isNotificationVisible}
	<div id="notification" transition:fly={{ y: -100, duration: 1000 }}>
		<InlineNotification
			lowContrast
			kind="success"
			on:close={() => (isNotificationVisible = false)}
			timeout={3000}
			title="copied to clipboard:"
			subtitle="sharing is caring"
		/>
	</div>
{/if}

<Grid>
	<Hr />
	<Row>
		<Column>
			<h1>crew battle</h1>
		</Column>
		<Column id="shareBtn">
			<Button icon={Share16} on:click={handleShare} kind="tertiary">share</Button>
		</Column>
	</Row>
	<Hr />
	<Row>
		<Column class="flex-row">
			<Slider
				class="slider"
				labelText="how many crews?"
				max={10}
				min={2}
				on:change={handleNumCrewChange}
				step={2}
				bind:value={numCrews}
			/>
			{#if numRandomize}
				<TooltipIcon
					class="tooltip-icon"
					tooltipText="changing this will reset crew assignments"
					icon={WarningAlt16}
				/>
			{/if}
		</Column>
		<!-- <Column class="flex-row">
			<Slider
				class="slider"
				labelText="how many lives per crewmate?"
				max={10}
				min={1}
				step={1}
				bind:value={numLives}
			/>
		</Column> -->
	</Row>
	<Hr />
	<Row>
		<Column>
			<TextInput
				autofocus
				bind:value={playerName}
				invalid={!isPlayerNameValid}
				invalidText="name is required"
				labelText="crewmate name"
				on:keyup={handleAddPlayerEnter}
				placeholder="enter name..."
				size="xl"
			/>
		</Column>
		<Column class="no-grow">
			<Dropdown
				items={crewNumsDropdown}
				bind:selectedId={crewNum}
				size="xl"
				titleText="which crew?"
			/>
		</Column>
		<Column>
			<Button id="addPlayerBtn" on:click={handleAddPlayer} icon={UserFollow16}>add crewmate</Button>
		</Column>
	</Row>
	<Hr size="lg" />
	<div class="grid">
		{#each crews as c, index}
			<Tile>
				crew {index}
				<PlayerTiles players={c} onDrop={(p) => (c = p)} />
			</Tile>
		{/each}
	</div>
	<Hr size="lg" />
	<Button kind="danger-tertiary" on:click={handleRandomize} size="xl">{randomizeText}</Button>
</Grid>

<style>
	#notification {
		position: fixed;
		left: 50%;
		margin-left: -200px;
		top: 16px;
		width: 400px;
	}

	:global(#addPlayerBtn) {
		margin-top: 24px;
	}

	:global(#shareBtn) {
		align-items: baseline;
		display: flex;
		flex-grow: 0;
		justify-content: flex-end;
	}

	:global(.icon) {
		margin: 0 8px;
	}

	:global(.no-grow, .slider) {
		flex-grow: 0 !important;
	}

	:global(.flex-row) {
		display: flex;
		justify-content: normal;
	}

	:global(.tooltip-icon) {
		margin-left: 24px;
		margin-top: 24px;
	}

	.grid {
		display: grid;
		grid-gap: 32px;
		grid-template-columns: 1fr 1fr;
	}
</style>
