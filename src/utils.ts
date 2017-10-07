import { State, Character, Pace } from "./state/game";

export const advantageChances = [1, 0.9975, 0.99, 0.9775, 0.96, 0.9375, 0.91, 0.8775, 0.84, 0.7975, 0.75, 0.6975, 0.64, 0.5775, 0.51, 0.4375, 0.36, 0.2775, 0.19, 0.0975];
export const disadvantageChanges = [1, 0.9025, 0.81, 0.7225, 0.64, 0.5625, 0.49, 0.4225, 0.36, 0.3025, 0.25, 0.2025, 0.16, 0.1215, 0.09, 0.0625, 0.04, 0.0225, 0.01, 0.0025];

export function forceSign(x: number): string {
    if (x >= 0) {
        return "+" + x;
    }
    else return "" + x;
}

export function forceSignFixed(x: number, fixed: number): string {
    if (x >= 0) {
        return "+" + x.toFixed(fixed);
    }
    else return "" + x.toFixed(fixed);
}

export function compare(a: number, b: number): number {
    if (a < b) {
        return 1;
    }
    else if (a > b) {
        return -1;
    }
    else return 0;
}

export function skillRollString(bonus: number, advantage: boolean, disadvantage: boolean) {
    if (advantage && !disadvantage) {
        return "2d20H" + forceSign(bonus);
    }
    else if (disadvantage && !advantage) {
        return "2d20L" + forceSign(bonus);
    }
    else {
        return "1d20" + forceSign(bonus);
    }
}

export function skillRollChance(bonus: number, advantage: boolean, disadvantage: boolean, dc: number) {
    const delta = dc - bonus - 1;
    if (delta <= 0) {
        return 1;
    }
    else if (delta >= 21) {
        return 0;
    }
    else {
        if (advantage && !disadvantage) {
            return advantageChances[delta];
        }
        else if (disadvantage && !advantage) {
            return disadvantageChanges[delta];
        }
        else {
            return 1 - delta * 0.05;
        }
    }
}

export function genericRollString(n: number, d: number, bonus: number) {
    return "" + n + "d" + d + forceSign(bonus);
}

export function genericRollAverage(n: number, d: number, bonus: number) {
    return n * (d + 1) / 2 + bonus;
}

export function scoutStats(char: Character, state: State) {
    switch (state.pace) {
        case "slow": return {
            character: char,
            perception: "" + (10 + char.skill_perception + 5),
            stealth: skillRollString(char.skill_stealth, false, false)
        };
        case "normal": return {
            character: char,
            perception: "" + (10 + char.skill_perception),
            stealth: "N/A"
        };
        case "fast": return {
            character: char,
            perception: "" + (10 + char.skill_perception - 5),
            stealth: "N/A"
        };
    }
}

export function foragingDc(state: State) {
    switch (state.foodAvailability) {
        case "abundant": return 10;
        case "limited": return 15;
        case "scarce": return 20;
    }
}

export function navigationDc(state: State) {
    switch (state.terrain) {
        case "easy": return 5;
        case "normal": return 10;
        case "difficult": return 15;
    }
}

export function coveringDc(_: State) {
    return 16;
}

export function navigationBonus(state: State) {
    switch (state.pace) {
        case "slow": return +5;
        case "normal": return +0;
        case "fast": return -5;
    }
}

export function pursuitFromPace(pace: Pace) {
    switch (pace) {
        case "slow": return +1;
        case "normal": return 0;
        case "fast": return -1;
    }
}

export function foodRequired(char: Character, _: State): number {
    switch (char.size) {
        case "tiny": return 0.25;
        case "small": return 1;
        case "medium": return 1;
        case "large": return 4;
        case "huge": return 16;
    }
}

export function waterRequired(char: Character, state: State): number {
    switch (state.weather) {
        case "hot": return 2 * foodRequired(char, state);
        case "normal": return foodRequired(char, state);
    }
}

export function foragingResult(state: State) {
    const dc = foragingDc(state);
    const foodReq = state.characters.reduce((p, char) => p + foodRequired(char, state), 0);
    const waterReq = state.characters.reduce((p, char) => p + waterRequired(char, state), 0);
    const foragers = state.characters
        .filter(c => c.role === "foraging")
        .map(c => foragerStats(c, state))
        .sort((a, b) => compare(a.rollChance * a.yieldAverage, b.rollChance * b.yieldAverage));
    const meanYield = foragers.reduce((p, fs) => p + fs.rollChance * fs.yieldAverage, 0);
    const netFoodYield = meanYield - foodReq;
    const netWaterYield = meanYield - waterReq;

    return {
        dc: dc,
        foragers: foragers,
        netFoodYield: netFoodYield,
        netWaterYield: netWaterYield
    };
}

export function foragerStats(char: Character, state: State) {
    const dc = foragingDc(state);
    const advantage = char.feat_wanderer;

    const rollString = skillRollString(char.skill_survival, advantage, false);
    const rollChance = skillRollChance(char.skill_survival, advantage, false, dc);
    const rollSummary = `${rollString} (${Math.round(rollChance * 100)}%)`;
    const yieldString = genericRollString(1, 6, char.mod_wisdom);
    const yieldAverage = genericRollAverage(1, 6, char.mod_wisdom);
    const yieldSummary = `${yieldString} (${(rollChance * yieldAverage).toFixed(1)})`;

    switch (state.pace) {
        case "slow":
        case "normal": return {
            character: char,
            rollString: rollString,
            rollChance: rollChance,
            rollSummary: rollSummary,
            yieldString: yieldString,
            yieldAverage: yieldAverage,
            yieldSummary: yieldSummary
        };
        case "fast": return {
            character: char,
            rollString: "N/A",
            rollChance: 0,
            rollSummary: "N/A (can't forage at fast pace)",
            yieldString: "0",
            yieldAverage: 0,
            yieldSummary: null
        };
    }
}

export function navigationResult(state: State) {
    const navigatorChars = state.characters
        .filter(c => c.role === "navigation")
        .sort((a, b) => compare(a.skill_survival, b.skill_survival));
    const navigators = navigatorChars
        .map((c, i) => navigatorStats(c, i, navigatorChars.length, state));
    const total = 1 - navigators.reduce((p, c) => p * (1 - c.rollChance), 1);
    let totalSummary: string;
    switch (state.navigation) {
        case "map": totalSummary = "(auto success)"; break;
        case "lost": totalSummary = "(auto failure)"; break;
        default: totalSummary = `${Math.round(total)}%`;
    }

    return {
        dc: navigationDc(state),
        navigators: navigators,
        totalChance: total,
        totalSummary: totalSummary
    };
}

export function navigatorStats(char: Character, index: number, total: number, state: State) {
    const dc = navigationDc(state);
    const bonus = char.skill_survival + navigationBonus(state);

    const rollString = skillRollString(bonus, false, false);
    const rollStringAdv = skillRollString(bonus, true, false);
    const rollChance = skillRollChance(bonus, false, false, dc);
    const rollChanceAdv = skillRollChance(bonus, true, false, dc);
    const rollSummary = `${rollString} (${Math.round(rollChance * 100)}%)`;
    const rollSummaryAdv = `${rollStringAdv} (${Math.round(rollChanceAdv * 100)}%)`;

    switch (state.navigation) {
        case "path": return {
            character: char,
            role: "None",
            rollString: "N/A",
            rollChance: 1,
            rollSummary: "(auto success)"
        };
        case "map":
            if (index === 0) {
                return {
                    role: "Navigating",
                    character: char,
                    rollString: rollStringAdv,
                    rollChance: rollChanceAdv,
                    rollSummary: rollSummaryAdv
                };
            }
            else {
                return {
                    character: char,
                    role: "None",
                    rollString: "N/A",
                    rollChance: 0,
                    rollSummary: ""
                };
            }
        case "normal":
            if (index === 0) {
                return {
                    character: char,
                    role: "Navigating",
                    rollString: total > 1 ? rollStringAdv : rollString,
                    rollChance: total > 1 ? rollChanceAdv : rollChance,
                    rollSummary: total > 1 ? rollSummaryAdv : rollSummary
                };
            }
            else if (index === 1) {
                return {
                    character: char,
                    role: "Providing advantage",
                    rollString: "N/A",
                    rollChance: 0,
                    rollSummary: ""
                };
            }
            else {
                return {
                    character: char,
                    role: "None",
                    rollString: "N/A",
                    rollChance: 0,
                    rollSummary: ""
                };
            }
        case "lost": return {
            character: char,
            role: "None",
            rollString: "N/A",
            rollChance: 0,
            rollSummary: ""
        };
    }
}

export function coveringResult(state: State) {
    const dc = coveringDc(state);
    const coveringChars = state.characters
        .filter(c => c.role === "covering");
    const coverers = coveringChars
        .map((c, i) => covererStats(c, i, coveringChars.length, state))
        .sort((a, b) => compare(a.rollChance, b.rollChance));
    const totalChance = 1 - coverers.reduce((p, s) => p * (1 - s.rollChance), 1);

    return {
        dc: dc,
        coverers: coverers,
        totalChance: totalChance
    };
}

export function covererStats(char: Character, index: number, total: number, state: State) {
    const dc = coveringDc(state);
    const disadvantage = state.pace === "fast";
    const advantage = total > 1;

    if (index === 0) {
        const rollString = skillRollString(char.skill_survival, advantage, disadvantage);
        const rollChance = skillRollChance(char.skill_survival, advantage, disadvantage, dc);
        const rollSummary = `${rollString} (${Math.round(rollChance * 100)}%)`;
        return {
            character: char,
            rollString: rollString,
            rollChance: rollChance,
            rollSummary: rollSummary
        };
    }
    else if (index === 1) {
        return {
            character: char,
            rollString: "N/A",
            rollChance: 0,
            rollSummary: "N/A (providing advantage)"
        };
    }
    else {
        return {
            character: char,
            rollString: "N/A",
            rollChance: 0,
            rollSummary: "N/A (already have advantage)"
        };
    }
}