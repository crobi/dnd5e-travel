import * as React from "react";
import { connect } from "react-redux";

import * as Icons from "./icons";
import Card from "./card";
import Table from "./table";
import { State } from "../state/game";
import { AppState } from "../state/app";
import { scoutStats, compare } from "../utils";

interface Props extends State {
}

export class ResultScouting extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const chars = this.props.characters;
    const scouts = chars
        .filter(c => c.role === "scouting")
        .sort((a, b) => compare(a.skill_perception, b.skill_perception))
        .map(c => scoutStats(c, this.props));

    return (
        <Card
            title="Scouting"
            subtitle={"Noticing threats"}
            icon={Icons.spyglass}
        >
            <Table
                header={["Name", "Perception", "Stealth"]}
                rows={scouts.map(s => [s.character.name, s.perception, s.stealth])}
            />
        </Card>
    );
  }
}

function mapStateToProps(state: AppState) {
    return state.data;
}

export default connect(mapStateToProps)(ResultScouting);
