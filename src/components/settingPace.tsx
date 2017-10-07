import * as React from "react";
import { connect } from "react-redux";

import Card from "./card";
import * as Icons from "./icons";
import { State, Pace, speed, navigationMod, perceptionMod } from "../state/game";
import { AppState } from "../state/app";
import { changePace } from "../actions";
import { forceSign } from "../utils";

interface Props extends State {
}

export class SettingPace extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const miles = speed(this.props.pace);
    return (
        <Card
            title="Travel pace"
            subtitle={"Pace: " + this.props.pace}
            icon={icon(this.props.pace)}
            action={changePace()}
        >
            <strong>Miles per day:</strong> {miles} (normal) {miles / 2} (difficult) {miles / 4} (underdark)
            <br />
            <strong>Modifiers:</strong> {modifiers(this.props)}
        </Card>
    );
  }
}

function modifiers(state: State) {
    return [
        `Navigation ${forceSign(navigationMod(state.pace))}`,
        `Perception ${forceSign(perceptionMod(state.pace))}`
    ].join(", ");
}

function icon(pace: Pace): JSX.Element {
    switch (pace) {
        case "normal": return Icons.run;
        case "fast": return Icons.sprint;
        case "slow": return Icons.sensuousness;
    }
}

function mapStateToProps(state: AppState) {
    return state.data;
}

export default connect(mapStateToProps)(SettingPace);
