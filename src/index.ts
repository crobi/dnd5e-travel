import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import * as injectTapEventPlugin from "react-tap-event-plugin";

import { App } from "./components/app";
import { main } from "./reducers/app";
import { AppState, defaultAppState } from "./state/app";
import { init } from "./actions";
// import * as Firebase from "./firebase";

function id<T>(x: T) { return x; }

// Configure redux
const enhancer = () => {
    const devTools: Function = (window as any).devToolsExtension;
    return Redux.compose(
        devTools ? devTools({}) : id
    );
};

// Container for the redux store.
const app = {
    store: Redux.createStore<AppState>(main, defaultAppState(), enhancer())
};

export default function bootstrap() {
    // Firebase.initFirebase();

    // Install tools on 'window' to make them easily accessible
    (window as any).app = app;

    // Needed for materialUI
    injectTapEventPlugin();

    // Initial state
    app.store.dispatch(init());

    // Render ReactDOM once
    render();
}

function render() {
    const root = document.getElementById("app");
    ReactDOM.render(
        React.createElement(ReactRedux.Provider, app,
            React.createElement(App)
        ),
        root
    );
}

bootstrap();