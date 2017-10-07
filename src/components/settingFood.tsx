import * as React from "react";
import { connect } from "react-redux";

import Card from "./card";
import * as Icons from "./icons";
import { State, FoodAvailability } from "../state/game";
import { AppState } from "../state/app";
import { changeFoodAvailability } from "../actions";
import { foragingDc } from "../utils";

interface Props extends State {
}

export class SettingFood extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
        <Card
            title="Food"
            subtitle={"Availability: " + this.props.foodAvailability}
            icon={icon(this.props.foodAvailability)}
            action={changeFoodAvailability()}
        >
            {examples(this.props.foodAvailability)}
            <br />
            <strong>Foraging:</strong> DC {foragingDc(this.props)}
        </Card>
    );
  }
}

function examples(food: FoodAvailability): string {
    switch (food) {
        case "abundant": return "Abundant food and water sources";
        case "limited": return "Limited food and water sources";
        case "scarce": return "Very little, if any, food and water sources";
    }
}

function icon(food: FoodAvailability): JSX.Element {
    switch (food) {
        case "abundant": return Icons.holy_oak;
        case "limited": return Icons.oak;
        case "scarce": return Icons.dead_wood;
    }
}

function mapStateToProps(state: AppState) {
    return state.data;
}

export default connect(mapStateToProps)(SettingFood);
