import * as React from "react";
import * as MaterialUI from "material-ui";

type TableData = string | number | null;

interface Props {
    header: string[];
    rows: TableData[][];
    footer?: string[];
}

const hstyle = {
    height: "24px"
};

function colSpan(data: TableData[], index: number): number {
    if (index >= data.length) {
        return 0;
    }
    else if (data[index + 1] === null) {
        return 1 + colSpan(data, index + 1);
    }
    else {
        return 1;
    }
}

export default class Table extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
      return (
        <MaterialUI.Table>
            <MaterialUI.TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <MaterialUI.TableRow style={hstyle}>
                    {this.props.header.map((val, col) => (<MaterialUI.TableHeaderColumn key={"" + col} style={hstyle}>{val}</MaterialUI.TableHeaderColumn>))}
                </MaterialUI.TableRow>
            </MaterialUI.TableHeader>

            <MaterialUI.TableBody displayRowCheckbox={false}>
                {this.props.rows.map((row, index) => (
                <MaterialUI.TableRow key={index} style={hstyle}>
                    {row.map((val, col) => val ? (<MaterialUI.TableRowColumn key={"" + col} style={hstyle} colSpan={colSpan(row, col)}>{val}</MaterialUI.TableRowColumn>) : null)}
                </MaterialUI.TableRow>)
                )}
            </MaterialUI.TableBody>

            {this.props.footer ?
            <MaterialUI.TableFooter adjustForCheckbox={false}>
                <MaterialUI.TableRow style={hstyle}>
                    {this.props.footer.map((val, col) => (<MaterialUI.TableRowColumn key={"" + col} style={hstyle}>{val}</MaterialUI.TableRowColumn>))}
                </MaterialUI.TableRow>
            </MaterialUI.TableFooter> : null
            }
        </MaterialUI.Table>
    );
  }
}