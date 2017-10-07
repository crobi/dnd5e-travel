import * as React from "react";
import { connect } from "react-redux";

import * as Icons from "./icons";
import Card from "./card";
import Table from "./table";
import { State } from "../state/game";
import { AppState } from "../state/app";
import { coveringResult } from "../utils";

interface Props extends State {
}

export class ResultCovering extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const result = coveringResult(this.props);

    return (
        <Card
            title="Covering"
            subtitle={"Covering tracks"}
            icon={Icons.high_grass}
        >
            <Table
                header={["Name", `Roll (DC ${result.dc})`, ""]}
                rows={result.coverers.map(s => [s.character.name, s.rollSummary, null])}
                footer={["Total", (100 * result.totalChance).toFixed(1) + "%", ""]}
            />
        </Card>
    );
  }
}

function mapStateToProps(state: AppState) {
    return state.data;
}

export default connect(mapStateToProps)(ResultCovering);
