var App = {
    _isWithTooltips: !1, init: function () {
        App._tableSorters(), App._tooltips(), App._navDoc(), $(window).on("resize", App._tooltips), $(document).on("shown.bs.tab", function () {
            $(document).trigger("redraw.bs.charts")
        }), $(".docs-top").length && (App._backToTopButton(), $(window).on("scroll", App._backToTopButton))
    }, _navDoc: function () {
        function t() {
            n.width() > 768 ? o() : a()
        }

        function a() {
            n.off("resize.theme.nav"), n.off("scroll.theme.nav"), e.css({position: "", left: "", top: ""})
        }

        function o() {
            function t() {
                o.containerTop = $(".docs-content").offset().top - 40, o.containerRight = $(".docs-content").offset().left + $(".docs-content").width() + 45, a()
            }

            function a() {
                var t = n.scrollTop();
                if (!Math.max(t - o.containerTop, 0)) return $(e.find("li a")[1]).addClass("active"), e.css({
                    position: "",
                    left: "",
                    top: ""
                });
                e.css({position: "fixed", left: o.containerRight, top: 40})
            }

            var o = {};
            t(), $(window).on("resize.theme.nav", t).on("scroll.theme.nav", a), $("body").scrollspy({target: "#markdown-toc"}), setTimeout(function () {
                $("body").scrollspy("refresh")
            }, 1e3)
        }

        var e = $("#markdown-toc"), n = $(window);
        e[0] && ($("#markdown-toc li").addClass("nav-item"), $("#markdown-toc li > a").addClass("nav-link"), $("#markdown-toc li > ul").addClass("nav"), t(), n.on("resize", t))
    }, _backToTopButton: function () {
        $(window).scrollTop() > $(window).height() ? $(".docs-top").fadeIn() : $(".docs-top").fadeOut()
    }, _tooltips: function () {
        if ($(window).width() > 768) {
            if (App._isWithTooltips) return;
            App._isWithTooltips = !0, $('[data-toggle="tooltip"]').tooltip()
        } else {
            if (!App._isWithTooltips) return;
            App._isWithTooltips = !1, $('[data-toggle="tooltip"]').tooltip("destroy")
        }
    }, _tableSorters: function () {
        $('[data-sort="table"]').tablesorter({sortList: [[1, 0]]})
    }
};
App.init(), $(function () {
    var Charts = {
        _HYPHY_REGEX: /-([a-z])/g, _cleanAttr: function (t) {
            delete t.chart, delete t.datasets, delete t.datasetsOptions, delete t.labels, delete t.options
        }, doughnut: function (element) {
            var attrData = $.extend({}, $(element).data()), data = attrData.dataset ? eval(attrData.dataset) : {},
                dataOptions = attrData.datasetOptions ? eval("(" + attrData.datasetOptions + ")") : {},
                labels = attrData.labels ? eval(attrData.labels) : {},
                options = attrData.options ? eval("(" + attrData.options + ")") : {};
            Charts._cleanAttr(attrData);
            var datasets = $.extend({data: data, borderWidth: 2, hoverBorderColor: "transparent"}, dataOptions),
                options = $.extend({
                    cutoutPercentage: 80,
                    legend: {display: !1},
                    animation: {animateRotate: !1, duration: 0}
                }, options);
            new Chart(element.getContext("2d"), {
                type: "doughnut",
                data: {datasets: [datasets], labels: labels},
                options: options
            })
        }, "spark-line": function (element) {
            var attrData = $.extend({}, $(element).data()), data = attrData.dataset ? eval(attrData.dataset) : [],
                datasetOptions = attrData.datasetOptions ? eval(attrData.datasetOptions) : [],
                labels = attrData.labels ? eval(attrData.labels) : {},
                options = attrData.options ? eval("(" + attrData.options + ")") : {}, data = {
                    labels: labels, datasets: data.map(function (t, a) {
                        return $.extend({
                            data: t,
                            fill: !0,
                            backgroundColor: "rgba(255,255,255,.3)",
                            borderColor: "#fff",
                            pointBorderColor: "#fff",
                            lineTension: .25,
                            pointRadius: 0
                        }, datasetOptions[a])
                    })
                };
            Charts._cleanAttr(attrData);
            var options = $.extend({
                animation: {duration: 0},
                legend: {display: !1},
                scales: {xAxes: [{display: !1}], yAxes: [{display: !1}]},
                tooltips: {enabled: !1}
            }, options);
            new Chart(element.getContext("2d"), {type: "line", data: data, options: options})
        }, line: function (element) {
            var attrData = $.extend({}, $(element).data()), data = attrData.dataset ? eval(attrData.dataset) : [],
                datasetOptions = attrData.datasetOptions ? eval(attrData.datasetOptions) : [],
                labels = attrData.labels ? eval(attrData.labels) : {},
                options = attrData.options ? eval("(" + attrData.options + ")") : {}, isDark = !!attrData.dark, data = {
                    labels: labels, datasets: data.map(function (t, a) {
                        return $.extend({
                            data: t,
                            fill: !0,
                            backgroundColor: isDark ? "rgba(28,168,221,.03)" : "rgba(66,165,245,.2)",
                            borderColor: "#42a5f5",
                            pointBorderColor: "#fff",
                            lineTension: .25,
                            pointRadius: 0,
                            pointHoverRadius: 0,
                            pointHitRadius: 20
                        }, datasetOptions[a])
                    })
                };
            Charts._cleanAttr(attrData);
            var options = $.extend({
                maintainAspectRatio: !1,
                animation: {duration: 0},
                legend: {display: !1},
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)",
                            zeroLineColor: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)",
                            drawBorder: !1
                        },
                        ticks: {
                            beginAtZero: !1,
                            fixedStepSize: 1e3,
                            fontColor: isDark ? "#a2a2a2" : "rgba(0,0,0,.4)",
                            fontSize: 14
                        }
                    }],
                    xAxes: [{
                        gridLines: {display: !1},
                        ticks: {fontColor: isDark ? "#a2a2a2" : "rgba(0,0,0,.4)", fontSize: 14}
                    }]
                },
                tooltips: {
                    enabled: !0, bodyFontSize: 14, callbacks: {
                        title: function () {
                            return ""
                        }, labelColor: function () {
                            return {backgroundColor: "#42a5f5", borderColor: "#42a5f5"}
                        }
                    }
                }
            }, options);
            new Chart(element.getContext("2d"), {type: "line", data: data, options: options})
        }, bar: function (element) {
            var attrData = $.extend({}, $(element).data()), data = attrData.dataset ? eval(attrData.dataset) : [],
                datasetOptions = attrData.datasetOptions ? eval(attrData.datasetOptions) : [],
                labels = attrData.labels ? eval(attrData.labels) : {},
                options = attrData.options ? eval("(" + attrData.options + ")") : {}, isDark = !!attrData.dark, data = {
                    labels: labels, datasets: data.map(function (t, a) {
                        return $.extend({
                            data: t,
                            fill: !0,
                            backgroundColor: a % 2 ? "#42a5f5" : "#1bc98e",
                            borderColor: "transparent"
                        }, datasetOptions[a])
                    })
                };
            Charts._cleanAttr(attrData);
            var options = $.extend({
                maintainAspectRatio: !1,
                animation: {duration: 0},
                legend: {display: !1},
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)",
                            zeroLineColor: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)",
                            drawBorder: !1
                        }, ticks: {fixedStepSize: 25, fontColor: isDark ? "#a2a2a2" : "rgba(0,0,0,.4)", fontSize: 14}
                    }],
                    xAxes: [{
                        gridLines: {display: !1},
                        ticks: {fontColor: isDark ? "#a2a2a2" : "rgba(0,0,0,.4)", fontSize: 14}
                    }]
                },
                tooltips: {enabled: !0, bodyFontSize: 14}
            }, options);
            new Chart(element.getContext("2d"), {type: "bar", data: data, options: options})
        }
    };
    $(document).on("redraw.bs.charts", function () {
        $("[data-chart]").each(function () {
            $(this).is(":visible") && !$(this).hasClass("js-chart-drawn") && (Charts[$(this).attr("data-chart")](this), $(this).addClass("js-chart-drawn"))
        })
    }).trigger("redraw.bs.charts")
});