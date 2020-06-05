define(["jquery", "knockout", "inbizsdk"], function ($, ko, inbizsdk) {
    //资源状态枚举
    function isNullOrEmpty(text) {
        return text === "" || text === null || text === undefined;
    }
    var vm = {
    };

    var vf = {

    };


    function initData() {
        var $this = $(".notice-list");
        var scrollTimer;
        $this.hover(function () {
            clearInterval(scrollTimer);
        }, function () {
            scrollTimer = setInterval(function () {
                scrollNews($this);
            }, 2000);
        }).trigger("mouseleave");

        function scrollNews(obj) {
            var $self = obj.find("ul");
            var lineHeight = $self.find("li:first").height();
            $self.animate({
                "marginTop": -lineHeight + "px"
            }, 500, function () {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        }
    }

    function getArea() {
        var area = "";
        var hash = location.hash;
        if (hash === "#gspp" || hash === "") {
          area = "gspp";
        } else {
          area = hash.substr(hash.indexOf("area=") + 5);
        }
        return area;
      }
    function loadResourceData() {
        var areaStr = getArea();
        var channelStr="%公司品牌%";
        switch (areaStr) {
            case "dcxm":
                channelStr="%C1项目%";
                break;
            case "syxm":
                channelStr="%C2项目%";
                break;
            case "gyxm":
                channelStr="%C3项目%";
                break;
            case "zhfwxm":
                channelStr="%C4项目%";
                break;
            case "cxxm":
                channelStr="%创新项目%";
                break;
            case "tyqxm":
                channelStr="%体验区项目%";
                break;
        }
        var param = { channel: channelStr};
        inbizsdk.$dataset(
            "selectNoticeTop3List",
            param,
            function (reqResult) {
                if (reqResult.ResultCode !== 0) {
                    return;
                }
                console.log(reqResult.Data[0].length);
                for (i = 0; i < reqResult.Data[0].length; i++) {

                    $("#notice-list").append('<li>' + reqResult.Data[0][i].content + '</li>');
                }

            },
            false,
        );
    }

    return {
        vm: vm,
        vf: vf,
        //加载到父级dom后执行
        attached: function (child, parent, settings) {
            loadResourceData();
        },
        //全部组装完成后执行
        compositionComplete: function () {
            initData();
        },
    };
});