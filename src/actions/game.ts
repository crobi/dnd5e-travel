export type Action = AddCharacter
    | RemoveCharacter
    | ChangeRole
    | ChangePace
    | ChangeNavigation
    | ChangeTerrain
    | ChangeFoodAvailability
    ;

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
export interface AddCharacter {
    readonly type: "ADD_CHARACTER";
}
export function addCharacter(): AddCharacter {
    return {
        type: "ADD_CHARACTER"
    };
}

// ----------------------------------------------------------------------------
export interface RemoveCharacter {
    readonly type: "REMOVE_CHARACTER";
    readonly id: number;
}
export function removeCharacter(id: number): RemoveCharacter {
    return {
        type: "REMOVE_CHARACTER",
        id: id
    };
}

// ----------------------------------------------------------------------------
export interface ChangeRole {
    readonly type: "CHANGE_ROLE";
    readonly id: number;
}
export function changeRole(id: number): ChangeRole {
    return {
        type: "CHANGE_ROLE",
        id: id
    };
}

// ----------------------------------------------------------------------------
export interface ChangePace {
    readonly type: "CHANGE_PACE";
}
export function changePace(): ChangePace {
    return {
        type: "CHANGE_PACE"
    };
}

// ----------------------------------------------------------------------------
export interface ChangeWeather {
    readonly type: "CHANGE_WEATHER";
}
export function changeWeather(): ChangeWeather {
    return {
        type: "CHANGE_WEATHER"
    };
}

// ----------------------------------------------------------------------------
export interface ChangeNavigation {
    readonly type: "CHANGE_NAVIGATION";
}
export function changeNavigation(): ChangeNavigation {
    return {
        type: "CHANGE_NAVIGATION"
    };
}

// ----------------------------------------------------------------------------
export interface ChangeTerrain {
    readonly type: "CHANGE_TERRAIN";
}
export function changeTerrain(): ChangeTerrain {
    return {
        type: "CHANGE_TERRAIN"
    };
}

// ----------------------------------------------------------------------------
export interface ChangeFoodAvailability {
    readonly type: "CHANGE_FOOD_AVAILABILITY";
}
export function changeFoodAvailability(): ChangeFoodAvailability {
    return {
        type: "CHANGE_FOOD_AVAILABILITY"
    };
}


