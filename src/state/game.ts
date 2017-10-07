export type Size = "tiny" | "small" | "medium" | "large" | "huge";
export type Role = "navigation" | "foraging" | "scouting" | "covering" | "tracking" | "mapping";
export type Pace = "fast" | "normal" | "slow";
export type Weather = "normal" | "hot";
export type Navigation = "path" | "map" | "normal" | "lost";
export type Terrain = "difficult" | "normal" | "easy";
export type FoodAvailability = "abundant" | "limited" | "scarce";

export interface Character {
    readonly id: number;
    readonly name: string;
    readonly size: Size;
    readonly skill_perception: number;
    readonly skill_survival: number;
    readonly skill_stealth: number;
    readonly mod_wisdom: number;
    readonly feat_wanderer: boolean;
    readonly role: Role;
}

export function defaultCharacter(id: number): Character {
    return {
        id: id,
        name: "Test character",
        size: "medium",
        skill_perception: 0,
        skill_survival: 0,
        skill_stealth: 0,
        mod_wisdom: 0,
        feat_wanderer: false,
        role: "foraging"
    };
}

export interface State {
    readonly characters: Character[];
    readonly pace: Pace;
    readonly weather: Weather;
    readonly navigation: Navigation;
    readonly terrain: Terrain;
    readonly foodAvailability: FoodAvailability;
    readonly nextId: number;
}

export function defaultState(): State {
    return {
        characters: [
            {
                id: 1,
                name: "Player 1",
                size: "medium",
                skill_perception: +4,
                skill_survival: +7,
                skill_stealth: +2,
                mod_wisdom: +4,
                feat_wanderer: true,
                role: "navigation"
            },
            {
                id: 2,
                name: "Player 2",
                size: "medium",
                skill_perception: +7,
                skill_survival: +4,
                skill_stealth: +9,
                mod_wisdom: +1,
                feat_wanderer: false,
                role: "scouting"
            },
            {
                id: 3,
                name: "Player 3",
                size: "medium",
                skill_perception: +1,
                skill_survival: +1,
                skill_stealth: +2,
                mod_wisdom: +1,
                feat_wanderer: false,
                role: "foraging"
            },
            {
                id: 4,
                name: "Player 4",
                size: "medium",
                skill_perception: +1,
                skill_survival: +1,
                skill_stealth: -1,
                mod_wisdom: +1,
                feat_wanderer: false,
                role: "foraging"
            },
            {
                id: 5,
                name: "Player 5",
                size: "medium",
                skill_perception: +3,
                skill_survival: +3,
                skill_stealth: +2,
                mod_wisdom: +0,
                feat_wanderer: true,
                role: "foraging"
            },
            {
                id: 6,
                name: "Stool",
                size: "small",
                skill_perception: +0,
                skill_survival: +0,
                skill_stealth: +0,
                mod_wisdom: +0,
                feat_wanderer: false,
                role: "foraging"
            }
        ],
        pace: "normal",
        weather: "normal",
        navigation: "normal",
        terrain: "normal",
        foodAvailability: "limited",
        nextId: 10
    };
}

// ----------------------------------------------------------------------------
// Changing settings
// ----------------------------------------------------------------------------
export function nextRole(role: Role): Role {
    switch (role) {
        case "navigation": return "foraging";
        case "foraging": return "scouting";
        case "scouting": return "covering";
        case "covering": return "tracking";
        case "tracking": return "mapping";
        case "mapping": return "navigation";
    }
}

export function nextPace(pace: Pace): Pace {
    switch (pace) {
        case "normal": return "fast";
        case "fast": return "slow";
        case "slow": return "normal";
    }
}

export function nextNavigation(nav: Navigation): Navigation {
    switch (nav) {
        case "path": return "map";
        case "map": return "normal";
        case "normal": return "lost";
        case "lost": return "path";
    }
}

export function nextTerrain(ter: Terrain): Terrain {
    switch (ter) {
        case "easy": return "normal";
        case "normal": return "difficult";
        case "difficult": return "easy";
    }
}

export function nextSize(size: Size): Size {
    switch (size) {
        case "tiny": return "small";
        case "small": return "medium";
        case "medium": return "large";
        case "large": return "huge";
        case "huge": return "tiny";
    }
}

export function nextFoodAvailability(food: FoodAvailability) {
    switch (food) {
        case "abundant": return "limited";
        case "limited": return "scarce";
        case "scarce": return "abundant";
    }
}

// ----------------------------------------------------------------------------
// Game rules
// ----------------------------------------------------------------------------

export function speed(pace: Pace): number {
    switch (pace) {
        case "fast": return 32;
        case "normal": return 24;
        case "slow": return 16;
    }
}

export function navigationMod(pace: Pace): number {
    switch (pace) {
        case "fast": return -5;
        case "normal": return 0;
        case "slow": return +5;
    }
}

export function perceptionMod(pace: Pace): number {
    switch (pace) {
        case "fast": return -5;
        case "normal": return 0;
        case "slow": return +5;
    }
}