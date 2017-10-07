import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import CharacterCard from "./characterCard";
import { State } from "../state/game";
import { AppState } from "../state/app";

import { addCharacter, removeCharacter } from "../actions";

interface Props extends State {
    add: () => any;
    remove: (id: number) => any;
}

export class CharacterList extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
    <div>
        {this.props.characters.map((c, i) => <CharacterCard index={i} id={c.id} key={i}/>)}
    </div>
    );
  }
}

function mapStateToProps(state: AppState) {
    return state.data;
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AppState>) {
    return {
        add: () => dispatch(addCharacter()),
        remove: (id: number) => dispatch(removeCharacter(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
