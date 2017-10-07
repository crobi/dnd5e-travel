import * as React from "react";
import { connect } from "react-redux";

import Card from "./card";
import * as Icons from "./icons";
import { State, Terrain } from "../state/game";
import { AppState } from "../state/app";
import { changeTerrain } from "../actions";
import { navigationDc } from "../utils";

interface Props extends State {
}

export class SettingTerrain extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
        <Card
            title="Terrain"
            subtitle={"Type: " + this.props.terrain}
            icon={icon(this.props.terrain)}
            action={changeTerrain()}
        >
            {examples(this.props.terrain)}
            <br />
            <strong>Navigation:</strong> DC {navigationDc(this.props)}
        </Card>
    );
  }
}

function examples(ter: Terrain): string {
    switch (ter) {
        case "difficult": return "Forest, jungle, swamp, mountains, open sea with overcast skies";
        case "normal": return "Arctic, desert, hills, open sea with clear skies";
        case "easy": return "Grassland, meadow, farmland";
    }
}

function icon(ter: Terrain): JSX.Element {
    switch (ter) {
        case "difficult": return Icons.forest;
        case "normal": return Icons.hills;
        case "easy": return Icons.grass;
    }
}

function mapStateToProps(state: AppState) {
    return state.data;
}

export default connect(mapStateToProps)(SettingTerrain);
