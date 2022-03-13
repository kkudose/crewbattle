# Crew Battle

 An easy way to organize a crew battle, i.e. team-based tournament with a shared pool of life/stock. I think it originated from the [Super Smash Bros.](https://www.ssbwiki.com/Crew_battle) scene, but I was introduced to the concept from a tiny indie game, [SpyParty](http://www.spyparty.com/). 

 Crew Battle does the following:
 - Add crewmates
 - Form crews (manually assign and randomize)
 - (TODO) Keep track of lives
 - (TODO) Export the state of the battle into text
 - Provide options for the number of crews and number of lives per crewmate

There's another helper tool at [/wildcards](https://crewbattle.pages.dev/wildcards) that's specific to SpyParty. Wildcards is a way to "randomly" select and keep track of a set of rules for two teams. Quotes on random because duplicate rules are guaranteed not to appear and removing a rule ensures it won't show up until every other rule has appeared.

-----

## But actually:

I enjoyed using [Svelte](https://svelte.dev/), [SvelteKit](https://kit.svelte.dev/), and [Cloudflare Pages](https://pages.cloudflare.com/) with [my other project](https://github.com/kkudose/hades), so 
I wanted to continue exploring these. This time, I added [Carbon Components Svelte](https://github.com/carbon-design-system/carbon-components-svelte) instead of writing completely custom CSS.

To run locally, install dependencies:
```
npm install
```

Then run:
```bash
npm run dev
```
