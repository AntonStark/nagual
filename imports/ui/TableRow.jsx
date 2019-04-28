import React, { Component } from 'react'

import { Variables } from '../api/variables'

export class TableRow extends Component {
    render() {
        const _var = this.props.entry;
        return (
            <tr>
                <td>{Variables.findOne(_var.var_id).name}</td>
                <td>{_var.value}</td>
            </tr>
        )
    }
}
