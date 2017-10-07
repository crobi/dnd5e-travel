import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import CharacterList from "./characterList";

import ResultPursuit from "./resultPursuit";
import ResultScouting from "./resultScouting";
import ResultForaging from "./resultForaging";
import ResultNavigation from "./resultNavigation";
import ResultCovering from "./resultCovering";

import SettingPace from "./settingPace";
import SettingNavigation from "./settingNavigation";
import SettingTerrain from "./settingTerrain";
import SettingFood from "./settingFood";

import { State } from "../state/game";
import { AppState } from "../state/app";
import { addCharacter, removeCharacter } from "../actions";

const style = {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
} as React.CSSProperties;

const styleRow = {
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingBottom: "16px",
    display: "flex",
    flexWrap: "wrap"
} as React.CSSProperties;

const styleCol = {
    boxSizing: "border-box",
    flex: "1",
    minWidth: "300px",
    paddingLeft: "4px",
    paddingRight: "4px"
} as React.CSSProperties;

const muiTheme = getMuiTheme({
});

interface Props extends State {
    add: () => any;
    remove: (id: number) => any;
}

export class App extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div style={style}>
            <div style={styleRow}>
                <div key="settings" style={styleCol}>
                    <SettingTerrain />
                    <SettingNavigation />
                    <SettingFood />
                </div>
                <div key="characters" style={styleCol}>
                    <SettingPace />
                    <CharacterList />
                </div>
                <div key="result" style={{...styleCol, minWidth: "480px"}}>
                    <ResultPursuit />
                    <ResultNavigation />
                    <ResultScouting />
                    <ResultForaging />
                    <ResultCovering />
                </div>
            </div>
        </div>
    </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state:  AppState) {
    return state.data;
}

function mapDispatchToProps(dispatch: Redux.Dispatch<State>) {
    return {
        add: () => dispatch(addCharacter()),
        remove: (id: number) => dispatch(removeCharacter(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
