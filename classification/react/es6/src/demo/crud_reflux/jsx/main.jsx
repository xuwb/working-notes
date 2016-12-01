"use strict";
define(function(require, exports, module){

    const React = require('react'),
          ReactDOM = require('reactDom'),
          DataTable = require('./dataTable'),
          InfoBox = require('./infoBox');

    ReactDOM.render(
        <div>
            <h3 style={{textAlign:'center'}}>React ES6 Demo</h3>
            <DataTable />
        </div>, 
        document.getElementById('main')
    )
});