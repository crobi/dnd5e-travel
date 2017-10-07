import * as React from "react";
import { connect } from "react-redux";

import * as Icons from "./icons";
import Card from "./card";
import Table from "./table";
import { State } from "../state/game";
import { AppState } from "../state/app";
import { foragingResult } from "../utils";

interface Props extends State {
}

export class ResultForaging extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const result = foragingResult(this.props);

    return (
        <Card
            title="Foraging"
            subtitle={"Gathering food"}
            icon={Icons.fruit_bowl}
        >
            <Table
                header={["Name", `Roll (DC ${result.dc})`, "Yield (Average)"]}
                rows={result.foragers.map(fs => [fs.character.name, fs.rollSummary, fs.yieldSummary])}
                footer={["Total", "", result.netFoodYield.toFixed(1)]}
            />
        </Card>
    );
  }
}


function mapStateToProps(state: AppState) {
    return state.data;
}

export default connect(mapStateToProps)(ResultForaging);
