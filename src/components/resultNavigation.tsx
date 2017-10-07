import * as React from "react";
import { connect } from "react-redux";

import * as Icons from "./icons";
import Card from "./card";
import Table from "./table";
import { State } from "../state/game";
import { AppState } from "../state/app";
import { navigationResult } from "../utils";

interface Props extends State {
}

export class ResultNavigation extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const result = navigationResult(this.props);

    return (
        <Card
            title="Navigation"
            subtitle={"Leading the way"}
            icon={Icons.compass}
        >
            <Table
                header={["Name", "Role", `Roll (DC ${result.dc})`]}
                rows={result.navigators.map(s => [s.character.name, s.role, s.rollSummary])}
            />
        </Card>
    );
  }
}

function mapStateToProps(state: AppState) {
    return state.data;
}

export default connect(mapStateToProps)(ResultNavigation);
