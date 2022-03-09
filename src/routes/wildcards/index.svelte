<script lang="ts">
	import { slide } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import _ from 'lodash'
	import 'carbon-components-svelte/css/g100.css'
	import { Button, ButtonSet, Column, Grid, Row, Tile } from 'carbon-components-svelte'
	import Add16 from 'carbon-icons-svelte/lib/Add16'
	import Copy16 from 'carbon-icons-svelte/lib/Copy16'
	import TrashCan16 from 'carbon-icons-svelte/lib/TrashCan16'

	import Hr from '../../shared/Hr.svelte'
	import { sniperRules, spyRules, generalRules, Rule } from './rules'

	let rulesByCrew: Rule[][] = [[], []]
	let possibleRulesByCrew = [
		{
			sniper: _.shuffle(sniperRules.concat(generalRules)),
			spy: _.shuffle(spyRules).concat(generalRules)
		},
		{
			sniper: _.shuffle(sniperRules.concat(generalRules)),
			spy: _.shuffle(spyRules).concat(generalRules)
		}
	]

	const handleAddRule = (crewId: number, isSniper: boolean) => {
		let rules = possibleRulesByCrew[crewId][isSniper ? 'sniper' : 'spy']
		if (rules.length === 0) {
			rules = _.shuffle((isSniper ? sniperRules : spyRules).concat(generalRules))
		}

		rulesByCrew[crewId].push(rules.pop())
		rulesByCrew = rulesByCrew
	}

	const handleRemoveRule = (crewId: number, ruleId: number) => {
		rulesByCrew[crewId] = rulesByCrew[crewId].filter((r) => r.id !== ruleId)
		rulesByCrew = rulesByCrew

		// re-add rule to queue of possible rules
		if (ruleId >= 1000) {
			// ignore general rule
		} else if (ruleId >= 500) {
			const rule = spyRules.find((r) => r.id === ruleId)
			possibleRulesByCrew[crewId].spy.push(rule)
		} else {
			const rule = sniperRules.find((r) => r.id === ruleId)
			possibleRulesByCrew[crewId].sniper.push(rule)
		}
	}

	const handleCopy = (textToCopy: string) => {
		navigator.clipboard.writeText(textToCopy)
	}
</script>

<svelte:head>
	<title>crew battle</title>
</svelte:head>

<Grid>
	<Hr />
	<Row>
		<Column>
			<h1>spyparty wildcards</h1>
			rules by mintyrug
		</Column>
	</Row>
	<Hr />
	<Row>
		<Column>
			<h2>crew {_.sample(['one', 'uno', 'un', 'ein', '1'])}</h2>
		</Column>
		<Column>
			<h2>crew {_.sample(['two', 'dos', 'due', 'zwei', 'deux', '2'])}</h2>
		</Column>
	</Row>
	<Hr />
	<Row>
		<Column>
			<ButtonSet>
				<Button kind="danger" on:click={(_e) => handleAddRule(0, true)} icon={Add16}
					>add sniper rule</Button
				>
				<Button kind="danger" on:click={(_e) => handleAddRule(0, false)} icon={Add16}
					>add spy rule</Button
				>
			</ButtonSet>
		</Column>
		<Column>
			<ButtonSet>
				<Button on:click={(_e) => handleAddRule(1, true)} icon={Add16}>add sniper rule</Button>
				<Button on:click={(_e) => handleAddRule(1, false)} icon={Add16}>add spy rule</Button>
			</ButtonSet>
		</Column>
	</Row>
	<Hr />
	<Row>
		<Column>
			{#each rulesByCrew[0] as r (r.id)}
				<div animate:flip={{ duration: 800 }} in:slide>
					<div class="icons">
						<Button
							on:click={(_e) => handleCopy(`${r.name}: ${r.description}`)}
							kind="secondary"
							icon={Copy16}
							iconDescription="copy rule to clipboard"
						/>
						<Button
							on:click={(_e) => handleRemoveRule(0, r.id)}
							kind="danger"
							icon={TrashCan16}
							iconDescription="remove rule"
						/>
					</div>
					<Tile>
						<h3>{r.name}</h3>
						<Hr />
						{r.description}
					</Tile>
					<Hr />
				</div>
			{/each}
		</Column>
		<Column>
			{#each rulesByCrew[1] as r (r.id)}
				<div animate:flip={{ duration: 800 }} in:slide>
					<div class="icons">
						<Button
							on:click={(_e) => handleCopy(`${r.name}: ${r.description}`)}
							kind="secondary"
							icon={Copy16}
							iconDescription="copy rule"
						/>
						<Button
							on:click={(_e) => handleRemoveRule(1, r.id)}
							kind="danger"
							icon={TrashCan16}
							iconDescription="remove rule"
						/>
					</div>
					<Tile>
						<h3>{r.name}</h3>
						<Hr />
						{r.description}
					</Tile>
					<Hr />
				</div>
			{/each}
		</Column>
	</Row>
</Grid>

<style>
	.icons {
		display: flex;
		justify-content: flex-end;
		margin-bottom: -24px;
	}
</style>
