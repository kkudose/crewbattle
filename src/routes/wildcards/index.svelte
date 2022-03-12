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
	import type { Role } from './Role'

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

	const handleAddRule = (crewId: number, role: Role) => {
		let rules = possibleRulesByCrew[crewId][role]
		if (rules.length === 0) {
			rules = _.shuffle((role === 'sniper' ? sniperRules : spyRules).concat(generalRules))
		}

		rulesByCrew[crewId].push(rules.pop())
		rulesByCrew = rulesByCrew
	}

	const handleRemoveRule = (crewId: number, ruleId: number) => {
		rulesByCrew[crewId] = rulesByCrew[crewId].filter((r) => r.id !== ruleId)
		rulesByCrew = rulesByCrew

		// re-add rule to end of queue of possible rules
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
			<h1>spyparty <span>wildcards</span></h1>
			<p>rules by mintyrug</p>
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
	<Hr size="sm" />
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
	span {
		background: linear-gradient(
			45deg,
			#5461c8 12.5%,
			#c724b1 0 25%,
			#e4002b 0 37.5%,
			#ff6900 0 50%,
			#f6be00 0 62.5%,
			#97d700 0 75%,
			#00ab84 0 87.5%,
			#00a3e0 0
		);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
