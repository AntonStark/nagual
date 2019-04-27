import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import { Variables } from '/imports/api/variables'

export class Table extends Component {
    render() {
        const style = {};
        return (
            <div style={style}>
                <table>
                    <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Налево</td>
                        <td>Лес</td>
                    </tr>
                    <tr>
                        <td>Направо</td>
                        <td>Много леса</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export const TableVariables = withTracker(() => ({
    variables: Variables.find({}).fetch()
}))(Table);
