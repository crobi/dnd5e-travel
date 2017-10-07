import * as React from "react";
import { connect } from "react-redux";

import Card from "./card";
import * as Icons from "./icons";
import { State, Navigation } from "../state/game";
import { AppState } from "../state/app";
import { changeNavigation } from "../actions";

interface Props extends State {
}

export class SettingNavigation extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
        <Card
            title="Navigation"
            subtitle={"Type: " + this.props.navigation}
            icon={Icons.treasure_map}
            action={changeNavigation()}
        >
            {examples(this.props.navigation)}
            <br />
            <strong>Navigation:</strong> {effect(this.props.navigation)}
        </Card>
    );
  }
}

function examples(nav: Navigation): string {
    switch (nav) {
        case "path": return "Following a path or road";
        case "map": return "Using an accurate map, clear view of the sun or stars";
        case "normal": return "Navigating in a wilderness";
        case "lost": return "Lost in an alien land";
    }
}

function effect(nav: Navigation): string {
    switch (nav) {
        case "path": return "Automatic success";
        case "map": return "Roll with advantage";
        case "normal": return "Normal roll";
        case "lost": return "Automatic failure";
    }
}

function mapStateToProps(state: AppState) {
    return state.data;
}

export default connect(mapStateToProps)(SettingNavigation);
