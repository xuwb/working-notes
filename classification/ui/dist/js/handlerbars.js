'use strict';

define(function (require, exports, module) {

    //依赖
    var $ = require('$'),
        Handlebars = require('handlebars'),
        util = require('common/util'),
        limit = require('common/limit'),
        areaData = require('model/address/data');

    //重写compile方法;
    var compile = Handlebars.compile;
    //公用宏：转义URL
    var courts = {};

    Handlebars.registerHelper('countPosition', function (type, typeAgent) {
        var numberChinese = { "1": "一", "2": "二", "3": "三", "4": "四", "5": "五" };
        if (!courts[type]) courts[type] = 0;
        if (type + "Agent" == typeAgent) {
            return numberChinese[courts[type]];
        } else {
            return numberChinese[++courts[type]];
        }
    });

    Handlebars.registerHelper('countPositionNew', function (type, typeAgent) {
        var numberChinese = { "1": "一", "2": "二", "3": "三", "4": "四", "5": "五" };
        if (!courts[type]) courts[type] = 0;
        if (type == typeAgent) {
            return numberChinese[courts[type]];
        } else {
            return numberChinese[++courts[type]];
        }
    });

    //公用宏:upload序列化
    Handlebars.registerHelper('uploadSerialize', function (initData) {
        var newArray = [];
        $.each(initData, function (i, val) {
            var newObject = {};
            newObject["id"] = val.securityId;
            newObject["name"] = val.fileName;
            newObject["url"] = val.url;
            newArray.push(newObject);
        });
        return JSON.stringify(newArray);
    });

    //法定代表人职务
    Handlebars.registerHelper('legalRepresentJob', function (job) {
        switch (job) {
            case 'manager':
                return "经理";
                break;
            case 'chairman':
                return "董事长";
                break;
            case 'executiveChairman':
                return "执行董事长";
                break;
            default:
                return job;
        }
    });

    Handlebars.registerHelper('clearPosition', function () {
        courts = {};
    });
    Handlebars.compile = function (source, isElem) {
        //如果是一个节点，就用html
        if (isElem) {
            var elem = $(source);
            elem.length && (source = elem.html());
        } else {
            //格式化源码确保是字符串
            source += '';
        }
        //编译源码
        var fn = compile(source);
        fn.source = source;
        return fn;
    };

    //字体增加颜色
    Handlebars.registerHelper('fontSet', function (value, key) {
        var val = value.replace(new RegExp(key, "i"), '<span class="fn-color-e94e49">' + key + '</span>');
        return val;
    });
    //公用宏:日志
    Handlebars.registerHelper('log', function (msg) {
        console.log(msg);
    });

    //公用宏:set
    Handlebars.registerHelper('set', function (key, val) {
        this[key] = val;
    });

    //公用宏:set
    Handlebars.registerHelper('wrapWord', function (str, leg) {
        str = str === void 0 ? '' : str;
        var num = str.length;
        if (num > leg) {
            str = str.slice(0, leg) + '...';
            return str;
        } else {
            return str;
        };
    });

    //公用宏:格式化日期
    Handlebars.registerHelper('formatData', function (format, timestamp) {
        return util.formatData(format, timestamp);
    });
    //公用宏:比较
    Handlebars.registerHelper('isFalse', function (a, options) {
        if (!a) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    //公用宏:比较
    Handlebars.registerHelper('isEqual', function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 公用宏：包含
    Handlebars.registerHelper('contains', function () {
        var args = Array.prototype.slice.call(arguments),
            theKey = args.shift(),
            theOptions = args.pop();
        if (util.indexOfArr(args, theKey) !== -1) {
            return theOptions.fn(this);
        } else {
            return theOptions.inverse(this);
        };
    });

    //公用宏:比较 , 如果状态是不是已判决、管辖异议成立、原告已撤诉、调解、退回、被告无法送达、撤销申请，则页面可编辑
    Handlebars.registerHelper('caseNotEnd', function (a, type, options) {
        var endStatus = type == "paymentorder" ? ['not_accepted', 'execution_applied', 'lawsuit_transformed', 'payment_end', 'dropped'] : ['conciliate', 'sentenced', 'jurisediction_objection', 'not_accepted', 'return', 'dropped', 'not_be_served', 'cancel_apply', 'unpaid_dropped'];

        if ($.inArray(a, endStatus) < 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    //公用宏:比较假
    Handlebars.registerHelper('noEqual', function (a, b, options) {
        if (a !== b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 公用宏：不包含
    Handlebars.registerHelper('noContains', function () {
        var args = Array.prototype.slice.call(arguments),
            theKey = args.shift(),
            theOptions = args.pop();
        if (util.indexOfArr(args, theKey) === -1) {
            return theOptions.fn(this);
        } else {
            return theOptions.inverse(this);
        };
    });

    // 
    //公用宏:比较大于等于
    Handlebars.registerHelper('gtEqual', function (a, b, options) {
        if (a >= b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    //公用宏:比较小于等于
    Handlebars.registerHelper('ltEqual', function (a, b, options) {
        if (a <= b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 
    Handlebars.registerHelper('some', function () {
        var args = Array.prototype.slice.call(arguments),
            theOptions = args.pop();
        if (args.some(function (val) {
            return val;
        })) {
            return theOptions.fn(this);
        } else {
            return theOptions.inverse(this);
        };
    });

    //公用宏:正确的index
    Handlebars.registerHelper('rightIndex', function (index) {
        return ++index;
    });

    //公用宏:格式化金钱 40.0 => 40.00
    Handlebars.registerHelper('parseAmount', function (amount) {
        if (Number.isNaN(+amount)) {
            amount = 0;
        };
        return util.formatMoney(amount, 2);
    });
    //公用宏：转义URL
    Handlebars.registerHelper('escapeUrl', function (url) {
        return encodeURIComponent(url);
    });

    //公用宏：换行
    Handlebars.registerHelper('wrap', function (str) {
        return str ? str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />') : '';
    });

    //公用宏：字符替换
    Handlebars.registerHelper('replaceText', function (str, oldChar, newChar) {
        return str && str.replace(new RegExp(oldChar, 'g'), newChar);
    });

    //公用宏：对象
    Handlebars.registerHelper('dataMap', function (key, data) {
        return JSON.parse(data)[key];
    });

    //公用宏：对象
    Handlebars.registerHelper('dataMapDefault', function (key, data, defaultValue) {
        var map = data ? data : $("[data-role='roleMap']").val();
        var result = JSON.parse(map ? map : "{}")[key];
        return result ? result : defaultValue;
    });

    // 公用宏：千分位
    Handlebars.registerHelper('formatMoney', function (amount, num) {
        return util.formatMoney(amount, num);
    });

    //选择框
    Handlebars.registerHelper('select', function (value, options) {
        var $el = $('<select />').html(options.fn(this));
        $el.find('[value="' + value + '"]').attr({ 'selected': 'selected' });
        return $el.html();
    });

    // 质证业务：获取第一个事件
    Handlebars.registerHelper('getFirstTime', function (format, data) {
        return util.formatData(format, data[0].gmtModified);
    });

    // 疏松业务：获取第一个事件
    Handlebars.registerHelper('suitAddZeo', function (num) {
        return ('000000' + num).slice(-6);
    });

    // 质证业务：获取非最后一个值
    Handlebars.registerHelper('getNotLastNum', function (index, arr, options) {
        if (index !== arr.length - 1) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // 解决 前端显示空格的问题
    Handlebars.registerHelper('ShowWhitespace', function (str) {
        return str.replace(/\s/g, "&nbsp");
    });

    function checkRule(targetLsit, rule) {
        var flag = false,
            ruleList = rule.split(',');
        util.breakEachArr(ruleList, function (val) {
            if (util.indexOfArr(targetLsit, val) !== -1) {
                return flag = true;
            };
        });
        return flag;
    }

    // 过滤操作
    Handlebars.registerHelper('filterActions', function (list, rule, options) {
        if (rule && checkRule(list.roles, rule)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        };
    });

    function checkFilterDocking(action, status, isDocking, dockingStatus, values) {
        var arr = JSON.parse(values);
        if (action === arr.actionCode && status === arr.status && isDocking === arr.isDocking && dockingStatus === arr.dockingStatus) {
            return true;
        } else {
            false;
        }
    }

    // 过滤操作
    Handlebars.registerHelper('filterDocking', function (action, status, isDocking, dockingStatus, values, options) {
        if (checkFilterDocking(action, status, isDocking, dockingStatus, values)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 通过CODE查询城市
    Handlebars.registerHelper('getAreaByAreaCode', function (code) {
        // 格式化areaCode
        code = code.slice(0, 4) + '00';
        if (areaData[code] && areaData[code][0]) {
            return areaData[code][0];
        } else {

            return '';
        }
        return html;
    });

    Handlebars.registerHelper('for', function (a, b, options) {
        var result = '';
        for (var i = 0; i < a; i++) {
            if (i < b) result += options.fn(this);else result += options.inverse(this);
        }
        return result;
    });
    // add by zhangfengyang
    // 循环一定次数
    Handlebars.registerHelper('times', function (a) {
        var html = '';
        for (var i = 1; i <= a; i++) {
            html += '<li>' + i + '</li>';
        }
        return html;
    });
    // 角色：立案法官，审判法官，书记员 状态：已提交 的判断
    // Handlebars.registerHelper('recordSubmit', function(rule, status, options){
    //  if( rule && checkRule(['filing_court', 'trial_court', 'clerk'], rule) && status === 'submit' ){
    //      return options.fn(this);
    //  }else{
    //      return options.inverse(this);
    //  };
    // });

    //判断是否是.PDF文件
    Handlebars.registerHelper('judgePdf', function (a, b, options) {
        var reg = new RegExp(b, "gi");
        if (reg.test(a)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    //编译 Compile

    // 判断一个对象中是否value都为true
    Handlebars.registerHelper('deviceTestObj', function (a, options) {
        var isSuccess = true;
        for (var key in a) {
            a[key] || (isSuccess = false);
        }
        if (isSuccess) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    //返回
    return Handlebars;
});