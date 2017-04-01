define((require, exports, module) => {
    const React = require('react'),
          Reflux = require('reflux');
    const TableStore = require('../stores/tableStore');


    return (Wrapper, Store) => {
        Store = Reflux.connect(Store, "data");
        let state = Store.getInitialState();
        // 以免覆盖 Hoc 中的 getInitialState 方法，不删除也能执行，会出现警告提示
        delete Store.getInitialState;    

        class Hoc extends React.Component {
            constructor(props) {
                super(props);
                this.state = state;
            }
            render() {
                // console.log(this.state);
                return <Wrapper {...this.props} {...this.state} />
            }
        }
        // 将Store的属性合并到Hoc.prototype。trigger方法才能生效
        $.extend(Hoc.prototype, Store);
        // console.log(Hoc.prototype);
        return Hoc;
    }
})