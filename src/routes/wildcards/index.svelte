<script lang="ts">
	import { slide } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import _ from 'lodash'
	import 'carbon-components-svelte/css/g100.css'
	import { Column, Grid, Row } from 'carbon-components-svelte'

	import Hr from '../../shared/Hr.svelte'
	import { sniperRules, spyRules, generalRules, Rule } from './rules'
	import RuleTile from './RuleTile.svelte'
	import RuleActionIcons from './RuleActionIcons.svelte'
	import AddRuleButtonSet from './AddRuleButtonSet.svelte'

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
			<AddRuleButtonSet crewId={0} {handleAddRule} />
		</Column>
		<Column>
			<AddRuleButtonSet crewId={1} {handleAddRule} />
		</Column>
	</Row>
	<Hr />
	<Row>
		<Column>
			{#each rulesByCrew[0] as r (r.id)}
				<div animate:flip={{ duration: 800 }} in:slide>
					<RuleActionIcons rule={r} crewId={0} {handleRemoveRule} />
					<RuleTile rule={r} />
					<Hr />
				</div>
			{/each}
		</Column>
		<Column>
			{#each rulesByCrew[1] as r (r.id)}
				<div animate:flip={{ duration: 800 }} in:slide>
					<RuleActionIcons rule={r} crewId={1} {handleRemoveRule} />
					<RuleTile rule={r} />
					<Hr />
				</div>
			{/each}
		</Column>
	</Row>
</Grid>

<style>
</style>
