export type LoginState = "loggedIn" | "loggedOut" | "awaitingAuthResponse";

export interface Auth {
    readonly state: LoginState;
    readonly user: string;
    readonly image: string;
}

export function defaultState(): Auth {
    return {
        state: "loggedOut",
        user: "",
        image: ""
    };
}