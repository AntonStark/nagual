import React, { Component } from 'react'
// noinspection NpmUsedModulesInstalled
import { ReactTabulator } from 'react-tabulator';

import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";

export class DataTable extends Component {
    render() {
        const tableData = [
            {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
            {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
            {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
        ];
        const columns = [ //Define Table Columns
            {title:"Name", field:"name", width:150},
            {title:"Age", field:"age", align:"left", formatter:"progress"},
            {title:"Favourite Color", field:"col"},
            {title:"Date Of Birth", field:"dob", sorter:"date", align:"center"},
        ];

        return (
            <ReactTabulator data={tableData} columns={columns} options={{}}/>
        );
    }
}
