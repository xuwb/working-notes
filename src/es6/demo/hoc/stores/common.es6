"use strict";
define((require, exports, module) => {
    const Reflux = require('reflux');

    const Rex = /on([A-Z])(\w*)$/;

    return (config) => {
        let Actions = Reflux.createActions(Object.keys(config).filter(function(val){
            return Rex.test(val);
        }).map(function(val) {
            return val.replace(Rex, function(a0, a1, a2) {
                return a1.toLowerCase() + a2;
            })})
        );

        config.listenables = [Actions];

        // 获取component及其子组件中所有refs组件
        config.getRefsByName = (component, callback) => {
            if(!component) return null;

            let refList = [];

            for(var key in component.refs) {
                refList.push({key: key, value: component.refs[key]});
            }
            while(refList.length) {
                // console.log(refList.slice());
                let curItem = refList.shift();
                if(callback(curItem) == false) return;
                // if(curItem.key == ref) {
                //     finalRef = curItem.value;
                //     break;
                // }
                if(curItem.value.refs) {
                    for(var ikey in curItem.value.refs) {
                        refList.unshift({key: ikey, value: curItem.value.refs[ikey]});
                    }
                }
            }

            // while(component && component.refs) {
            //     if(component.refs[ref]) {
            //         finalRef = component.refs[ref];
            //         break;
            //     }
            //     component = component.refs[Object.keys(component.refs)[0]];
            // }
        }
        // config.update = () => {
        //     return this.getInitialState();
        // };

        let Store = Reflux.createStore(config);

        return {Actions, Store};
    }
})