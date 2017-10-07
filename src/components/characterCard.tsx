import * as React from "react";
import { connect } from "react-redux";

import { Character, Role } from "../state/game";
import { AppState } from "../state/app";
import { changeRole } from "../actions";

import * as GameIcons from "./icons";
import Card from "./card";
import { forceSign } from "../utils";

interface OwnProps {
    index: number;
    id: number;
}

interface Props extends Character {

}

export class CharacterCard extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const roleIcon = getRoleIcon(this.props.role);
    return (
      <Card
          title={this.props.name}
          subtitle={"Role: " + this.props.role}
          icon={roleIcon}
          action={changeRole(this.props.id)}
        >
          {/*<strong>Size:</strong> {this.props.size}<br />*/}
          <strong>Mods:</strong> {getSkills(this.props)}
          <br />
          <strong>Feats:</strong> {getFeats(this.props)}
      </Card>
    );
  }
}

function getRoleIcon(role: Role): JSX.Element {
  switch (role) {
      case "navigation": return GameIcons.compass;
      case "foraging": return GameIcons.fruit_bowl;
      case "scouting": return GameIcons.spyglass;
      case "covering": return GameIcons.high_grass;
      case "tracking": return GameIcons.footsteps;
      case "mapping": return GameIcons.treasure_map;
  }
}

function getSkills(char: Character): string {
  return [
    `Perception ${forceSign(char.skill_perception)}`,
    `Survival ${forceSign(char.skill_survival)}`,
    `Stealth ${forceSign(char.skill_stealth)}`,
    `Wisdom ${forceSign(char.mod_wisdom)}`
  ].join(", ");
}

function getFeats(char: Character): string {
  let feats = [];
  if (char.feat_wanderer) {
    feats.push("Wanderer");
  }

  if (feats.length > 0) {
    return feats.join(", ");
  }
  else {
    return "-";
  }
}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
    return state.data.characters[ownProps.index];
}

export default connect(mapStateToProps)(CharacterCard);
