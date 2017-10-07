import * as React from "react";
import * as MaterialUI from "material-ui";
import { connect } from "react-redux";
import { Action } from "../actions";

interface OwnProps {
    title: string;
    subtitle: string;
    icon?: JSX.Element;
    action?: Action;
}

interface Props extends OwnProps {
    doAction: () => any;
}

const cardStyle = {
  margin: "8px",
  paddingLeft: "16px",
  paddingRight: "16px"
};

const iconStyle = {
  display: "inline-block",
  padding: "0px",
  width: "64px",
  height: "64px",
  paddingTop: "16px",
  float: "right"
};

const titleStyle = {
  fontSize: "24px",
  lineHeight: "36px",
  color: "rgba(0, 0, 0, 0.870588)",
  paddingTop: "16px",
  display: "block"
};

const subtitleStyle = {
  fontSize: "14px",
  color: "rgba(0, 0, 0, 0.541176)",
  paddingTop: "0px",
  paddingBottom: "24px",
  display: "block"
};

const textBlockStyle = {
  paddingBottom: "8px",
  display: "block",
  fontSize: "14px",
  lineHeight: "1.5",
  color: "rgba(0, 0, 0, 0.870588)"
};


export class Card extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    console.log(this.context.dispatch);
    const icon = this.props.icon ?
        <MaterialUI.IconButton
          style={iconStyle}
          tooltip="Click to change"
          onClick={this.props.doAction}
        >
          {this.props.icon}
        </MaterialUI.IconButton>
    : null;
    return (
      <MaterialUI.Paper style={cardStyle}>
        {icon}
        <div style={titleStyle}>{this.props.title}</div>
        <div style={subtitleStyle}>{this.props.subtitle}</div>
        <div style={textBlockStyle}>
          {this.props.children}
        </div>
      </MaterialUI.Paper>
    );
  }
}

function mapStateToProps(_: any, ownProps: OwnProps) {
    return ownProps;
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>, ownProps: OwnProps) {
    return {
      doAction: () => ownProps.action ? dispatch(ownProps.action) : null
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
