import React, { Component } from 'react'

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
