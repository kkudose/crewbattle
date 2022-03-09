export interface Rule {
    name: string
    description: string
}

export const sniperRules: Rule[] = [
    {
        name: 'Sticky Lights',
        description: "Sniper can only change a guest's lighting once."
    },
    {
        name: 'Faulty Scope',
        description: 'Sniper must stay zoomed in one level. '
    },
    {
        name: 'Quicksand',
        description:
            'Sniper cannot move their camera after the first 10 seconds. They may still move their laser. * RE - ROLL IF "Motion Sickness" or "You Spin Me Right Round, Baby" are active.'
    },
    {
        name: 'Crooked Neck',
        description: 'Sniper must stay leaning (pressing Q or E). They may switch between them.'
    },
    {
        name: 'Loose Lips',
        description:
            'Sniper must announce all of the Suspected Double Agents at the start of each game. * IF the Sniper has another wildcard forcing them to do other inputs, (eg "Crooked Neck" or "Motion Sickness"),  they don\'t come into effect until the chat message has been sent. * IF "Quicksand" is active, Sniper may find the spot they freeze their camera at(in the first 10 seconds) before sending the message with the SDAs.'
    },
    {
        name: 'Motion Sickness',
        description:
            'Sniper cannot stop moving their camera during the game (pressing A or D).* REROLL IF "Quicksand" active.'
    },
    {
        name: 'Drunk Sniper',
        description:
            'Sniper must play with their camera inverted. (Controls -> Camera Invert Y on Mouse) Only lasts a single round.'
    },
    {
        name: 'Free Time',
        description:
            'Spy gets one free time add at the start of each game. The sniper should immediately zoom in on a piece of scenery, and cannot zoom out until 10 seconds have passed. The spy cannot complete * any * spy actions other than time add during the first 10 seconds of the game.'
    },
    {
        name: 'You Spin Me Right Round, Baby! (CY only)',
        description:
            'Venue must be changed to Courtyard. Sniper has to hold A or D continually for the entire round, and is only allowed to stop to shoot a guest.'
    }
]

export const spyRules: Rule[] = [
    {
        name: 'Clear Infatuation',
        description: 'Spy must announce their Seduction Target before starting the game.'
    },
    {
        name: 'Leaked Intel',
        description:
            "Before each game starts, spy must announce 1 mission they will complete and 1 they've left available but aren't completing. * IF ON BALCONY: Change venue; sniper's choice. They do not specify which is which.Spy may make partial mission progress on the non - completing mission. "
    },
    {
        name: 'Magnetic Implant',
        description: 'Spy cannot move their camera after the first 5 seconds of the game.'
    },
    {
        name: 'Methodical',
        description:
            "Spy must finish their missions in the order they're listed in the corner of the screen, starting from the top or bottom of the list.Spy may make progress, but NOT complete missions out of order. * IF another wildcard requires it, Spy may skip the relevant missions. Otherwise, changing directions or skipping missions forfeits the game."
    },
    {
        name: 'Will the Real DA Please Stand Up?',
        description:
            'Spy must announce the real Double Agent before the game. Only lasts one round. * IF ON TERRACE: Sniper may elect to play on another venue.'
    },
    {
        name: 'Single Minded',
        description:
            'Spy can only work on only one mission at a time. Any mission that requires an action test counts as progress. E.G.Spy starts seducing, and they may ONLY flirt until the mission is completed * TAKING OUT A BOOK: Spy may put back the book in the correct shelf instead of direct mf.'
    },
    {
        name: 'Security Patch',
        description:
            'The Sniper may select a mission of their choice which the Spy cannot complete. - If Methodical is active, the Spy may skip over the chosen mission. - Change the game format to prohibit the mission. Only lasts a single round.'
    },
    {
        name: 'DEFCON 2',
        description: 'Spy must complete x+1/ymissions to win. Only lasts a single round.'
    },
    {
        name: 'Hypeman Spyman',
        description:
            'Spy must send some sort of celebratory phrase in chat after they hit ANY Green action test. Eg.Spy hits green flirt "SpyMan2000: YAHOO!"'
    },
    {
        name: 'Sober',
        description:
            'Spy must reject all drinks offered by Toby during the game. Green purloins are considered valid, but if Spy hits a White test, the Wildcard is considered breached.'
    }
]

export const generalRules: Rule[] = [
    {
        name: 'Switcharoo',
        description:
            'Opponent may remove an active Wildcard from the other player (who drew this card), and switch it out for a Wildcard of their choice.'
    }
]
