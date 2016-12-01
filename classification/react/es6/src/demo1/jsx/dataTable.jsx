"use strict";

define(function(require, exports, module) {

    const React = require('react'),
          Reflux = require('reflux'),
          Store =require('demo1/stores/tableStore'),
          Hoc = require('./hoc'),
          InfoBox = require('./infoBox');

    // var actions = Reflux.createActions([
    //   'hello',
    //   'greet',
    //   'say'
    //   ]);

    // var store = Reflux.createStore({
    //   listenables: [actions],
    //   init: function () {
    //     this.joinTrailing(actions.hello, actions.greet, actions.say, this.trigger);
    //   },
    //   onGreet: function() {
    //     console.log(arguments[0] + 11)
    //   }
    // });

    // store.listen(function() {
    //   console.log('triggering with', arguments[0]);
    // });


    // actions.hello('bubu');
    // actions.greet('chacha');
    // actions.say('dockers');
    // actions.hello(1,2,3);
    // actions.greet('miku');
    // actions.say('dockers');

    class DataTable extends React.Component {
        constructor(props) {
            super(props);
        }
        modifyClick(e) {
            var id = e.target.getAttribute('data-id');
        }
        render() {
            let list = this.props.data.map((val, index) => {
                return (
                    <tr key={val.id}>
                        <td>{val.name}</td>
                        <td>
                            <button className='JS_delBtn btn btn-primary' data-id={val.id}>删除</button>
                            <button className='JS_modBtn btn btn-info' data-id={val.id} onClick={this.modifyClick.bind(this)}>修改</button>
                        </td>
                    </tr>
                )
            });
            return (
                <table>
                    <thead>
                        <tr>
                            <th width="150">姓名</th>
                            <th width="120">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                    <InfoBox />
                </table>
            )
        }
    }
    return Hoc(DataTable, Store);
});