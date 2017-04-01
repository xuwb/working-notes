// =========================
// 分页
// =========================
(function($) {
    function wrapPager(target) {
        var pagedata = $.data(target, "pagination");
        var opts = pagedata.options;
        var pageItem = pagedata.pageItem = {};
        var pagerbox = $(target).addClass("pagination").html("<ul class='clearfix'></ul>");
        var ul = pagerbox.find("ul");
        var layout = $.extend([], opts.layout);

        // 根据aa中的元素，创建相应的html，并添加到pagination表格中
        for (var n = 0; n < layout.length; n++) {
            var item = layout[n];
            if (item == "first") {
                pageItem.first = createbtn("first");
            } else if (item == "prev") {
                pageItem.prev = createbtn("prev");
            } else if (item == "next") {
                pageItem.next = createbtn("next");
            } else if (item == "last") {
                pageItem.last = createbtn("last");
            } else if (item == "links") {
                $("<li class=\"pagination-links\"></li>").appendTo(ul);
            } else if (item == "total") {
            	pageItem.total = $("<li class=\"total\"></li>").appendTo(ul);
            } else if (item == "manual") {
				pageItem.num = $("<input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\">").appendTo(ul).wrap("<li class='manual'></li>").before(opts.beforePageText + " ").after(" 页");
				pageItem.num.off(".pagination").on("keydown.pagination", function(e) {
					if (e.keyCode == 13) {
						manualToPage(target, $(this).val());
						e.stopPropagation();
					}
				});
            } else if (item == "submitButton") {
            	pageItem.submit = $("<button type=\"button\">确定</button>").appendTo(ul).wrap("<li class=\"btn\"></li>");
            	pageItem.submit.off(".pagination").on("click.pagination", function(e) {
            		var pageNum = pageItem.num.val();
            		manualToPage(target, pageNum);
            		// 点击确定按钮，回调函数
            		opts.onSubmitPage.call(target, pageNum);
            	})
            }
        }
        function manualToPage(target, pageNum) {
        	var pageNumber = parseInt(pageNum);
			if(!pageNumber) return false;

			selectPage(target, pageNumber);
        }
        // 创建按钮html及事件
        function createbtn(btnName) {
            // 通过opts.nav()包装所有按钮的图标及事件
            var btn = opts.nav[btnName];
            var btnText = opts.showButtonText? opts.btnText[btnName] : "";
            var a = $("<a href=\"javascript:void(0)\" class=\"li-page "+ btnName +"\"></a>").appendTo(ul);
            a.wrap("<li></li>");
            a.html(btnText).on("click.pagination", function() {
                btn.handler.call(target);
            });
            return a;
        };
    };
    function selectPage(target, pageNum) {
        var opts = $.data(target, "pagination").options;
        createPage(target, {
            pageNumber: pageNum
        });
        // 回调函数用于选择页面后，触发数据加载
        opts.onSelectPage.call(target, opts.pageNumber, opts.pageSize, opts.pageTarget);
    };
    function createPage(target, param) {
        var pagedata = $.data(target, "pagination");
        var opts = pagedata.options;
        var pageItem = pagedata.pageItem;
        $.extend(opts, param || {});

        var pageTotal = Math.ceil(opts.total / opts.pageSize) || 1;
        var sideLinks = opts.sideLinks;

        if (opts.pageNumber < 1) {
            opts.pageNumber = 1;
        }
        if (opts.pageNumber > pageTotal) {
            opts.pageNumber = pageTotal;
        }
        if (opts.total == 0) {
            opts.pageNumber = 0;
            pageTotal = 0;
            return;
        }
        // 在手动输入框的后面添加总共多少页
        if (pageItem.num) {
            pageItem.num.val(opts.pageNumber);
        }
        if (pageItem.total) {
            pageItem.total.html(opts.afterPageText.replace(/{pages}/, pageTotal));
        }
        // 如果显示以 1 2 3 4 ... 显示分页，创建分页及链接
        var li = $(target).find("li.pagination-links");
        if (li.length) {

            li.empty();
            var i = 0;

            if (pageTotal <= 2 * sideLinks + 2)
            {
                for (i = 0; i < pageTotal; i++)
                {
                    var a = $("<a class=\"pagination-link li-page num\" href=\"javascript:void(0)\"></a>").html(i + 1).appendTo(li);
                    a.attr("data-num", (i+1));
                    if (opts.pageNumber == i + 1) {
                        a.addClass("selected");
                    }
                }
            }
            else
            {
                //首页
                var a = $("<a class=\"pagination-link li-page num\" href=\"javascript:void(0)\"></a>").html(1).appendTo(li);
                a.attr("data-num", 1);
                if (opts.pageNumber == 1) a.addClass("selected");

                //前省略
                if (opts.pageNumber > sideLinks + 2) {
                    a = $("<a class=\"pagination-ellipsis\" href=\"javascript:void(0)\"></a>").html('...').appendTo(li);
                }

                //中间2*sideLinks+1个
                var Lpage = (opts.pageNumber - sideLinks) > 1 ? (opts.pageNumber - sideLinks) : 2;
                var Rpage = (opts.pageNumber + sideLinks) < pageTotal ? (opts.pageNumber + sideLinks) : pageTotal-1;
                if (opts.pageNumber <= sideLinks + 1) 
                    Rpage = Rpage + sideLinks - opts.pageNumber + 1;
                if (opts.pageNumber > pageTotal - sideLinks) 
                    Lpage = Lpage - (sideLinks - (pageTotal - opts.pageNumber));

                for (i = Lpage; i <= Rpage; i++)
                {
                    a = $("<a class=\"pagination-link li-page num\" href=\"javascript:void(0)\"></a>").html(i).appendTo(li);
                    a.attr("data-num", i);
                    if (opts.pageNumber == i) {
                        a.addClass("selected");
                    }
                }

                //后省略
                if (opts.pageNumber < pageTotal - sideLinks - 1)
                {
                    a = $("<a class=\"pagination-ellipsis\"  href=\"javascript:void(0)\"></a>").html('...').appendTo(li);
                }

                //最后页
                a = $("<a class=\"pagination-link li-page num\" href=\"javascript:void(0)\"></a>").html(pageTotal).appendTo(li);
                a.attr("data-num", pageTotal);
                if (opts.pageNumber == pageTotal) {
                    a.addClass("selected");
                }
            }

            //绑定点击事件
            var links = li.find("a");
            for (i = 0, len = links.length; i < len; i++)
            {
                var $link = $(links[i]);
                if(!$link.hasClass("selected") && !$link.hasClass("pagination-ellipsis")) 
                {
                    var curNum = parseInt($link.attr("data-num"));
                    $link.off(".pagination").on("click.pagination", {pageNumber: curNum}, function(e) {
                        selectPage(target, e.data.pageNumber);
                    });
                }
            }
        }
        // 判断按钮是否disabled
        var disabled = false;
        if (pageItem.first) {
            if((!opts.total) || opts.pageNumber == 1)  pageItem.first.addClass('pagination-disabled');
            else pageItem.first.removeClass('pagination-disabled');
        }
        if (pageItem.prev) {
            if((!opts.total) || opts.pageNumber == 1) pageItem.prev.addClass('pagination-disabled');
            else pageItem.prev.removeClass('pagination-disabled');
        }
        if (pageItem.next) {
            if(opts.pageNumber == pageTotal) pageItem.next.addClass('pagination-disabled');
            else pageItem.next.removeClass('pagination-disabled');
        }
        if (pageItem.last) {
            if(opts.pageNumber == pageTotal) pageItem.last.addClass('pagination-disabled');
            else pageItem.last.removeClass('pagination-disabled');
        }
        loadState(target, opts.loading);
    };
    function loadState(target, isloading) {
        var pagedata = $.data(target, "pagination");
        var opts = pagedata.options;
        opts.loading = isloading;
        if (opts.showRefresh) {
            
        }
    };
    $.fn.pagination = function(options, param) {
        if (typeof options == "string") {
            return $.fn.pagination.methods[options](this, param);
        }
        options = options || {};
        return this.each(function() {
            var opts;
            var data = $.data(this, "pagination");
            if (data) {
                opts = $.extend(data.options, options);
            } else {
                opts = $.extend({}, $.fn.pagination.defaults, options);
                $.data(this, "pagination", {
                    options: opts
                });
            }
            wrapPager(this);
            createPage(this);
        });
    };
    $.fn.pagination.methods = {
        options: function(jq) {
            return $.data(jq[0], "pagination").options;
        },
        loading: function(jq) {
            return jq.each(function() {
                loadState(this, true);
            });
        },
        loaded: function(jq) {
            return jq.each(function() {
                loadState(this, false);
            });
        },
        select: function(jq, pageNum) {
            return jq.each(function() {
                selectPage(this, pageNum);
            });
        }
    };
    $.fn.pagination.defaults = {
        total: 1,
        pageSize: 10,
        pageNumber: 1,
        pageTarget: null,   //调用分页的对象
        sideLinks: 2,
        loading: false,
        showRefresh: false,
        showButtonText: true,
        beforePageText: "到第",
        afterPageText: "共{pages}页",
        btnText: {
            first: "首页",
            prev: "上一页",
            next: "下一页",
            last: "尾页"
        },
        layout: ["first", "prev", "links", "next", "last"],
        onSelectPage: function(pageNum, pageSize) {
        },
        onBeforeRefresh: function(pageNum, pageSize) {
        },
        onRefresh: function(pageNum, pageSize) {
        },
        onChangePageSize: function(pageSize) {
        },
        onSubmitPage: function(pageNum) {
        },
        nav: {
            first: {
                iconCls: "pagination-first",
                handler: function() {
                    var opts = $(this).pagination("options");
                    if (opts.pageNumber > 1) {
                        $(this).pagination("select", 1);
                    }
                }
            },
            prev: {
                iconCls: "pagination-prev",
                handler: function() {
                    var opts = $(this).pagination("options");
                    if (opts.pageNumber > 1) {
                        $(this).pagination("select", opts.pageNumber - 1);
                    }
                }
            },
            next: {
                iconCls: "pagination-next",
                handler: function() {
                    var opts = $(this).pagination("options");
                    var pageTotal = Math.ceil(opts.total / opts.pageSize);
                    if (opts.pageNumber < pageTotal) {
                        $(this).pagination("select", opts.pageNumber + 1);
                    }
                }
            },
            last: {
                iconCls: "pagination-last",
                handler: function() {
                    var opts = $(this).pagination("options");
                    var pageTotal = Math.ceil(opts.total / opts.pageSize);
                    if (opts.pageNumber < pageTotal) {
                        $(this).pagination("select", pageTotal);
                    }
                }
            }
        }
    };
})(jQuery);