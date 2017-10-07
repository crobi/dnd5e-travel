import { Action } from "../actions";
import { AppState } from "../state/app";
import { reduce } from "./game";

export function main(state: AppState, action: Action): AppState {
    switch (action.type) {
        default: return {...state, data: reduce(state.data, action)};
    }
}
