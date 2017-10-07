import { State, defaultState as defaultGameState } from "./game";
import { Auth, defaultState as defaultAuthState } from "./auth";


export interface AppState {
    readonly data: State;
    readonly auth: Auth;
}

export function defaultAppState(): AppState {
    return {
        data: defaultGameState(),
        auth: defaultAuthState()
    }
}
