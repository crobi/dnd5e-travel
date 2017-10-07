import { Action as ActionGame } from "./game";
import { Action as ActionAuth } from "./auth";

// ----------------------------------------------------------------------------
export interface Init {
    readonly type: "INIT";
}
export function init(): Init {
    return {
        type: "INIT"
    };
}

// ----------------------------------------------------------------------------
export interface Game {
    readonly type: "GAME";
    readonly action: ActionGame;
}
export function game(action: ActionGame): Game {
    return {
        type: "GAME",
        action
    };
}

// ----------------------------------------------------------------------------
export interface Auth {
    readonly type: "AUTH";
    readonly action: ActionAuth;
}
export function auth(action: ActionAuth): Auth {
    return {
        type: "AUTH",
        action
    };
}