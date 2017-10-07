export type Action = SignIn
    | SignOut
    | Awaiting
    ;

// ----------------------------------------------------------------------------
export interface SignIn {
    readonly type: "AUTH_SIGN_IN";
    readonly user: string;
    readonly image: string;
}
export function authSignIn(user: string, image: string): SignIn {
    return {
        type: "AUTH_SIGN_IN",
        user,
        image
    };
}

// ----------------------------------------------------------------------------
export interface SignOut {
    readonly type: "AUTH_SIGN_OUT";
}
export function authSignOut(): SignOut {
    return {
        type: "AUTH_SIGN_OUT"
    };
}

// ----------------------------------------------------------------------------
export interface Awaiting {
    readonly type: "AUTH_AWAITING";
}
export function authAwaiting(): Awaiting {
    return {
        type: "AUTH_AWAITING"
    };
}