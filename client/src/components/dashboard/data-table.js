import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.description}
                </td>
                <td>
                    {this.props.obj.amount}
                </td>
                <td>
                    {this.props.obj.date}
                </td>
            </tr>
        );
    }
}

export default DataTable;