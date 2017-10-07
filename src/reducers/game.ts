import { Action } from "../actions";
import {
    State, defaultState, defaultCharacter,
    nextRole, nextPace, nextNavigation, nextTerrain, nextFoodAvailability
} from "../state/game";

export function reduce(state: State, action: Action): State {
    switch (action.type) {
        case "INIT": return defaultState();
        case "ADD_CHARACTER": return addCharacter(state);
        case "REMOVE_CHARACTER": return removeCharacter(state, action.id);
        case "CHANGE_ROLE": return changeRole(state, action.id);
        case "CHANGE_PACE": return changePace(state);
        case "CHANGE_NAVIGATION": return changeNavigation(state);
        case "CHANGE_TERRAIN": return changeTerrain(state);
        case "CHANGE_FOOD_AVAILABILITY": return changeFoodAvailability(state);
    }
}

function addCharacter(state: State): State {
    return {
        ...state,
        characters: state.characters.concat([defaultCharacter(state.nextId)]),
        nextId: state.nextId + 1
    };
}

function removeCharacter(state: State, id: number): State {
    return {
        ...state,
        characters: state.characters.filter(c => c.id !== id)
    };
}

function changeRole(state: State, id: number): State {
    return {
        ...state,
        characters: state.characters.map(c => {
            if (c.id === id) {
                return {...c, role: nextRole(c.role)};
            }
            else {
                return c;
            }
        })
    };
}

function changePace(state: State): State {
    return {
        ...state,
        pace: nextPace(state.pace)
    };
}

function changeNavigation(state: State): State {
    return {
        ...state,
        navigation: nextNavigation(state.navigation)
    };
}

function changeTerrain(state: State): State {
    return {
        ...state,
        terrain: nextTerrain(state.terrain)
    };
}

function changeFoodAvailability(state: State): State {
    return {
        ...state,
        foodAvailability: nextFoodAvailability(state.foodAvailability)
    };
}