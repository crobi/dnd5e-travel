import * as React from "react";
import { connect } from "react-redux";

import * as Icons from "./icons";
import Card from "./card";
import Table from "./table";
import { State } from "../state/game";
import { AppState } from "../state/app";
import { navigationResult, forceSignFixed, pursuitFromPace, coveringResult } from "../utils";

interface Props extends State {
}

export class ResultPursuit extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const nav = 1 - navigationResult(this.props).totalChance;
    const pace = pursuitFromPace(this.props.pace);
    const cover = -coveringResult(this.props).totalChance;
    const total = nav + pace + cover;

    let rows: string[][] = [];
    if (pace !== 0) rows.push(["Travel pace", "Pace: " + this.props.pace, forceSignFixed(pace, 1)]);
    if (nav !== 0) rows.push(["Navigation", "Getting lost", forceSignFixed(nav, 1)]);
    if (cover !== 0) rows.push(["Covering", "Covering tracks", forceSignFixed(cover, 1)]);

    return (
        <Card
            title="Pursuit"
            subtitle={"Escaping the enemy"}
            icon={Icons.spyglass}
        >
            <Table
                header={["Source", "Details", "Effect"]}
                rows={rows}
                footer={["Total", "", forceSignFixed(total, 1)]}
            />
        </Card>
    );
  }
}

function mapStateToProps(state: AppState) {
    return state.data;
}

export default connect(mapStateToProps)(ResultPursuit);
