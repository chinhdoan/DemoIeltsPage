function hideConfirm() {
    alert("a");
    $("#divConfirm").hide();
    console.log("hide")
}

function checkShortcut() {
    return !1
}

function setAll(n) {
    for (i = 1; i <= n; i++) $("#txtq" + i).val("A")
}

function storeAnswer(n, t, r, u) {
    if (typeof Storage != "undefined") {
        var s = {
                q: n,
                val: t,
                t: r,
                qs: u
            },
            e = localStorage.getItem(testid + "data"),
            o = !1,
            f;
        if (e && e != "") {
            f = JSON.parse(e);
            for (i in f.qs)
                if (f.qs[i].q == n) {
                    o = !0;
                    f.qs[i].val = t;
                    break
                }
        } else f = {
            qs: []
        }, f = JSON.parse(JSON.stringify(f));
        o || f.qs.push(s);
        localStorage.setItem(testid + "data", JSON.stringify(f))
    }
}

function toggleNav(n, t) {
    t != "" ? $("#nav" + n).addClass("checked") : $("#nav" + n).removeClass("checked")
}

function gtb(n) {
    var t = $(n).val();
    $("#txt" + n.id).val(t);
    toggleNav(n.id, t);
    storeAnswer(n.id, t, 1)
}

function gdd(n) {
    var t = $(n).val();
    $("#txt" + n.id).val(t);
    toggleNav(n.id, t);
    storeAnswer(n.id, t, 2)
}

function grd(n) {
    var t = $(n).val();
    $("#txt" + $(n).attr("name")).val(t);
    toggleNav(n.name, t);
    storeAnswer(n.name, t, 3)
}

function gcb(n, t, i) {
    var c = $(n).closest("div").find("input:checked[name^=" + $(n).attr("name") + "]").length,
        s, a, h, r, o;
    if (c > t) {
        n.checked = !1;
        return
    }
    var e = $("#txt" + $(n).attr("name")),
        l = e.attr("id"),
        f = parseInt(l.substring(l.indexOf("q") + 1)),
        u = $(n).val();
    if (n.checked)
        if (i == 7) s = e.val() + u + " ", e.val(s), toggleNav($(n).attr("name"), s), storeAnswer($(n).attr("name"), s, 7);
        else if (c > 1) {
        for (r = 0; r < t; r++)
            if (o = $("#txtq" + (f + r)).val(), o == "") {
                $("#txtq" + (f + r)).val(u);
                toggleNav("q" + (f + r), u);
                storeAnswer("q" + (f + r), u, 4, $(n).attr("name") + "_" + u);
                break
            }
    } else e.val(u), toggleNav($(n).attr("name"), u), storeAnswer($(n).attr("name"), u, 4, $(n).attr("name") + "_" + u);
    else if (i == 7) a = $(n).val(), h = e.val().replace(a + " ", ""), e.val(h), toggleNav($(n).attr("name"), h), storeAnswer($(n).attr("name"), h, 7);
    else if (c > 0) {
        for (r = 0; r < t; r++)
            if (o = $("#txtq" + (f + r)).val(), o == u) {
                $("#txtq" + (f + r)).val("");
                toggleNav("q" + (f + r), "");
                storeAnswer("q" + (f + r), "", 4, $(n).attr("name") + "_" + u);
                break
            }
    } else toggleNav($(n).attr("name"), ""), e.val(""), storeAnswer($(n).attr("name"), "", 4, $(n).attr("name") + "_" + u)
}

function jump(n) {
    $("#" + n).exists() ? $("#" + n).focus() : $('[name="' + n + '"]').get(0).focus()
}

function removeSavedAnswers() {
    localStorage.removeItem(testid + "data")
}

function ytSeekTo(n) {
    player.getPlayerState() == 2 || player.getPlayerState() == 5 ? (player.playVideo(), setTimeout(function() {
        player.seekTo(n, !0)
    }, 1e3)) : player.seekTo(n, !0)
}

function closePopover(n) {
    $(n).parents(".popover").popover("hide")
}

function getDefinition(n) {
    var t = $(n).text();
    t != "" && (t = t.replace(/[^a-zA-Z0-9-]/g, ""), $.getJSON("http://dict.ieltsonlinetests.com/api/Dict?word=" + t, function(i) {
        var u = "No definition found!",
            f, r;
        i != "" && (f = jQuery.parseJSON(i), r = $("#defTemplate").html(), Mustache.parse(r), u = Mustache.render(r, f));
        $(n).popover({
            title: 'Definition for "' + t + '" <a href="#" class="close" data-dismiss="alert" onclick="closePopover(this)">×<\/a>',
            content: u,
            placement: "right",
            html: !0,
            trigger: "click",
            template: '<div class="popover custom-popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content content-custom"><\/div><\/div>'
        });
        lastSpan && lastSpan != n && $(lastSpan).removeClass("highlight-yellow");
        lastSpan = n;
        $(n).popover("toggle");
        $(n).addClass("highlight-yellow")
    }))
}

function getSelectedText() {
    var n = "";
    return window.getSelection ? n = window.getSelection() : document.getSelection ? n = document.getSelection() : document.selection && (n = document.selection.createRange().text), n
}

function highlightText(n) {
    var r = getSelectedText(),
        u = r.toString(),
        t, i;
    u !== "" && (t = document.createElement("SPAN"), t.className = n, t.textContent = u, i = r.getRangeAt(0), i.deleteContents(), i.insertNode(t), lastHighlight = t, $(".formatbar").hide(), document.getSelection().removeAllRanges())
}

function unHighlightText() {
    lastHighlight && lastHighlight.tagName === "SPAN" && lastHighlight.className.includes("highlight") && ($(lastHighlight).contents().unwrap(), $(".formatbar").hide(), document.getSelection().removeAllRanges())
}

function closePopover(n) {
    $(n).parents(".popover").popover("hide")
}

function getDefinition2() {
    var f = getSelectedText(),
        r = f.toString(),
        n, t, u, i;
    r !== "" && (n = Math.random().toString().replace(".", ""), t = document.createElement("SPAN"), t.className = "highlight", t.textContent = r, t.setAttribute("rel", "def"), t.id = n, u = f.getRangeAt(0), u.deleteContents(), u.insertNode(t), lastSpan = n);
    i = r;
    i !== "" && (word = i.replace(/[^a-zA-Z0-9-]/g, ""), $("#" + n).attr("data-original-title", 'Definition for "' + i + '" <a href="#" class="close" data-dismiss="alert" onclick="closePopover(this)">×<\/a>'), $("#" + n).attr("data-content", "<p>Loading...<\/p>"), $("#" + n).click(), word !== "" ? $.ajax({
        url: "http://dict.ieltsonlinetests.com/api/Dict?word=" + word,
        dataType: "json",
        success: function(n) {
            var i = "No definition found!",
                r, t;
            n !== "" && (r = jQuery.parseJSON(n), t = $("#defTemplate").html(), Mustache.parse(t), i = Mustache.render(t, r));
            $(".popover-content").html(i);
            sw = 1
        },
        error: function() {
            $(".popover-content").html("No definition found!")
        }
    }) : $(".popover-content").html("No definition found!"), $(".formatbar").hide(), document.getSelection().removeAllRanges())
}
var markSelection, sw, lastHighlight, lastSpan;
(function(n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : typeof module == "object" && typeof module.exports == "object" ? module.exports = n(require("jquery")) : n(jQuery)
})(function(n) {
    function t(t, i) {
        return t && t.trim()[0] === ">" ? (t = t.trim().replace(/^>\s*/, ""), i.find(t)) : t ? n(t) : i
    }
    n.fn.resizable || (n.fn.resizable = function(i) {
        var r = {
            handleSelector: null,
            resizeWidth: !0,
            resizeHeight: !0,
            resizeWidthFrom: "right",
            resizeHeightFrom: "bottom",
            onDragStart: null,
            onDragEnd: null,
            onDrag: null,
            touchActionNone: !0
        };
        return typeof i == "object" && (r = n.extend(r, i)), this.each(function() {
            function s(n) {
                n.stopPropagation();
                n.preventDefault()
            }

            function c(t) {
                (t.preventDefault && t.preventDefault(), u = h(t), u.width = parseInt(i.width(), 10), u.height = parseInt(i.height(), 10), e = i.css("transition"), i.css("transition", "none"), r.onDragStart && r.onDragStart(t, i, r) === !1) || (r.dragFunc = l, n(document).bind("mousemove.rsz", r.dragFunc), n(document).bind("mouseup.rsz", f), (window.Touch || navigator.maxTouchPoints) && (n(document).bind("touchmove.rsz", r.dragFunc), n(document).bind("touchend.rsz", f)), n(document).bind("selectstart.rsz", s))
            }

            function l(n) {
                var t = h(n),
                    f, e;
                f = r.resizeWidthFrom === "left" ? u.width - t.x + u.x : u.width + t.x - u.x;
                e = r.resizeHeightFrom === "top" ? u.height - t.y + u.y : u.height + t.y - u.y;
                r.onDrag && r.onDrag(n, i, f, e, r) === !1 || (r.resizeHeight && i.height(e), r.resizeWidth && i.width(f))
            }

            function f(t) {
                if (t.stopPropagation(), t.preventDefault(), n(document).unbind("mousemove.rsz", r.dragFunc), n(document).unbind("mouseup.rsz", f), (window.Touch || navigator.maxTouchPoints) && (n(document).unbind("touchmove.rsz", r.dragFunc), n(document).unbind("touchend.rsz", f)), n(document).unbind("selectstart.rsz", s), i.css("transition", e), r.onDragEnd) r.onDragEnd(t, i, r);
                return !1
            }

            function h(n) {
                var t = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                if (typeof n.clientX == "number") t.x = n.clientX, t.y = n.clientY;
                else if (n.originalEvent.touches) t.x = n.originalEvent.touches[0].clientX, t.y = n.originalEvent.touches[0].clientY;
                else return null;
                return t
            }
            var u, e, i = n(this),
                o = t(r.handleSelector, i);
            r.touchActionNone && o.css("touch-action", "none");
            i.addClass("resizable");
            o.bind("mousedown.rsz touchstart.rsz", c)
        })
    })
});
$(document).ready(function() {
    function e() {
        n++;
        n >= 60 && (n = 0, t++);
        r.textContent = (t ? t > 9 ? t : "0" + t : "00") + ":" + (n > 9 ? n : "0" + n);
        $("input[name=t]").val(r.innerText);
        u()
    }

    function u() {
        f = setTimeout(e, 1e3)
    }

    function o() {
        var t = localStorage.getItem(testid + "data"),
            n, r;
        if (t != null && t !== "") {
            n = JSON.parse(t);
            for (i in n.qs) n.qs[i].t == 1 ? $("#" + n.qs[i].q).val(n.qs[i].val) : n.qs[i].t == 2 ? $("#" + n.qs[i].q + " option").filter(function() {
                return $(this).text() == n.qs[i].val
            }).prop("selected", !0) : n.qs[i].t == 3 ? $('input[type=radio][name="' + n.qs[i].q + '"]').each(function() {
                $(this).val() == n.qs[i].val && $(this).prop("checked", !0)
            }) : n.qs[i].t == 4 ? (r = n.qs[i].sq.split("_"), $('input[type=checkbox][name="' + r[0] + '"]').each(function() {
                $(this).val() == n.qs[i].val && $(this).prop("checked", !0)
            })) : n.qs[i].t == 7, toggleNav(n.qs[i].q, n.qs[i].val), $("#txt" + n.qs[i].q).val(n.qs[i].val)
        }
    }
    $(".seek-listening").click(function() {
        var n = $(this).attr("data-time");
        playerType == 1 ? (document.getElementById("player1").api_play(), setTimeout(function() {
            document.getElementById("player1").api_seek_to(n)
        }, 100)) : ytSeekTo(n)
    });
    typeof playerType != "undefined" && playerType == 1 && setTimeout(function() {
        document.getElementById("player1") && (document.getElementById("player1").api_play(), setTimeout(function() {
            document.getElementById("player1").api_pause_media()
        }, 100))
    }, 500);
    $(".btnRetake").click(function() {
        $("input[name=a]").val(" ");
        location.reload()
    });
    $('[data-toggle="tooltip"]').tooltip();
    $.fn.exists = function() {
        return this.length !== 0
    };
    $(".btnSubmit").click(function() {
        var n = $("input[name=a]").filter(function() {
                return $(this).val() == ""
            }),
            t;
        n.length == 0 ? (window.onbeforeunload = null, $("#btnSubmitReal").click(), $(".btnSubmit").prop("disabled", "disabled"), $(".btnSubmit").html("Calculating score...")) : (t = "question", n.length > 1 && (t = "questions"), confirm("You still have " + n.length + " unanswered " + t + ", are you sure to submit your answer?") && (window.onbeforeunload = null, $("#btnSubmitReal").click(), $(".btnSubmit").prop("disabled", "disabled"), $(".btnSubmit").html('<i class="fa fa-spinner fa-pulse fa-lg fa-fw"><\/i>&nbsp;Calculating score...')))
    });
    var r = document.getElementById("stopwatch"),
        n = 0,
        t = 0,
        f;
    u();
    o()
});
$(document).ready(function() {
        $("body").on("click", function(n) {
            $(".def").each(function() {
                $(this).is(n.target) || $(this).has(n.target).length !== 0 || $(".popover").has(n.target).length !== 0 || ($(this).popover("hide"), lastSpan && $(lastSpan).removeClass("highlight-yellow"))
            })
        });
        $(".def").click(function() {
            getDefinition(this)
        });
        $("#readingPanel").affix({
            offset: {
                top: 80,
                bottom: function() {
                    return $("#fbComment").outerHeight(!0) + 30
                }
            }
        });
        $(".tooltip-info").tooltip({
            title: "<h4>What is the Academic Word List?<\/h4><p>The AWL is a list of words which appear with high frequency in English-language academic texts<\/p><h4>Why should I learn it?<\/h4><p>You will need to know this academic vocabulary if you want to study in an English-speaking college or university. In fact, because these words are so common, they are even useful to those who do not plan to go on to post-secondary study in English. These are words that you will frequently see in newspapers, magazines, and novels, and hear on television, movies or in conversation.<\/p>",
            html: !0,
            placement: "bottom"
        });
        $("#chkAw").click(function() {
            this.checked ? $(".awl1").css({
                color: "#1e1e1e",
                background: "#fff5e3",
                "border-bottom": "solid 3px #ffbe40"
            }) : $(".awl1").removeAttr("style")
        });
        $("#chkNw").click(function() {
            this.checked ? $(".awl4").css({
                color: "#1e1e1e",
                background: "#ebf4e2",
                "border-bottom": "solid 3px #77b83e"
            }) : $(".awl4").removeAttr("style")
        })
    }),
    function(n, t) {
        if (typeof exports == "object" && exports) t(exports);
        else {
            var i = {};
            t(i);
            typeof define == "function" && define.amd ? define(i) : n.Mustache = i
        }
    }(this, function(n) {
        function w(n, t) {
            return p.call(n, t)
        }

        function b(n) {
            return !w(a, n)
        }

        function e(n) {
            return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }

        function g(n) {
            return String(n).replace(/[&<>"'\/]/g, function(n) {
                return d[n]
            })
        }

        function u(n) {
            this.string = n;
            this.tail = n;
            this.pos = 0
        }

        function t(n, t) {
            this.view = n || {};
            this.parent = t;
            this._cache = {}
        }

        function i() {
            this.clearCache()
        }

        function f(t, i, r, u) {
            for (var o = "", s, c, e, a, y, p, l = 0, v = t.length; l < v; ++l) {
                s = t[l];
                c = s[1];
                switch (s[0]) {
                    case "#":
                        if (e = r.lookup(c), typeof e == "object")
                            if (h(e))
                                for (a = 0, y = e.length; a < y; ++a) o += f(s[4], i, r.push(e[a]), u);
                            else e && (o += f(s[4], i, r.push(e), u));
                        else typeof e == "function" ? (p = u == null ? null : u.slice(s[3], s[5]), e = e.call(r.view, p, function(n) {
                            return i.render(n, r)
                        }), e != null && (o += e)) : e && (o += f(s[4], i, r, u));
                        break;
                    case "^":
                        e = r.lookup(c);
                        (!e || h(e) && e.length === 0) && (o += f(s[4], i, r, u));
                        break;
                    case ">":
                        e = i.getPartial(c);
                        typeof e == "function" && (o += e(r));
                        break;
                    case "&":
                        e = r.lookup(c);
                        e != null && (o += e);
                        break;
                    case "name":
                        e = r.lookup(c);
                        e != null && (o += n.escape(e));
                        break;
                    case "text":
                        o += c
                }
            }
            return o
        }

        function nt(n) {
            for (var f = [], r = f, i = [], t, o, u = 0, e = n.length; u < e; ++u) {
                t = n[u];
                switch (t[0]) {
                    case "#":
                    case "^":
                        i.push(t);
                        r.push(t);
                        r = t[4] = [];
                        break;
                    case "/":
                        o = i.pop();
                        o[5] = t[2];
                        r = i.length > 0 ? i[i.length - 1][4] : f;
                        break;
                    default:
                        r.push(t)
                }
            }
            return f
        }

        function tt(n) {
            for (var u = [], t, i, r = 0, f = n.length; r < f; ++r) t = n[r], t && (t[0] === "text" && i && i[0] === "text" ? (i[1] += t[1], i[3] = t[3]) : (i = t, u.push(t)));
            return u
        }

        function c(n) {
            return [new RegExp(e(n[0]) + "\\s*"), new RegExp("\\s*" + e(n[1]))]
        }

        function it(t, i) {
            function st() {
                if (ft && !it)
                    while (g.length) delete w[g.pop()];
                else g = [];
                ft = !1;
                it = !1
            }
            var a, f, h, rt, et, ut, ot, k;
            if (t = t || "", i = i || n.tags, typeof i == "string" && (i = i.split(o)), i.length !== 2) throw new Error("Invalid tags: " + i.join(", "));
            for (var p = c(i), r = new u(t), d = [], w = [], g = [], ft = !1, it = !1; !r.eos();) {
                if (a = r.pos, h = r.scanUntil(p[0]), h)
                    for (ut = 0, ot = h.length; ut < ot; ++ut) rt = h.charAt(ut), b(rt) ? g.push(w.length) : it = !0, w.push(["text", rt, a, a + 1]), a += 1, rt == "\n" && st();
                if (!r.scan(p[0])) break;
                if (ft = !0, f = r.scan(y) || "name", r.scan(l), f === "=" ? (h = r.scanUntil(s), r.scan(s), r.scanUntil(p[1])) : f === "{" ? (h = r.scanUntil(new RegExp("\\s*" + e("}" + i[1]))), r.scan(v), r.scanUntil(p[1]), f = "&") : h = r.scanUntil(p[1]), !r.scan(p[1])) throw new Error("Unclosed tag at " + r.pos);
                if (et = [f, h, a, r.pos], w.push(et), f === "#" || f === "^") d.push(et);
                else if (f === "/") {
                    if (d.length === 0) throw new Error('Unopened section "' + h + '" at ' + a);
                    if (k = d.pop(), k[1] !== h) throw new Error('Unclosed section "' + k[1] + '" at ' + a);
                } else if (f === "name" || f === "{" || f === "&") it = !0;
                else if (f === "=") {
                    if (i = h.split(o), i.length !== 2) throw new Error("Invalid tags at " + a + ": " + i.join(", "));
                    p = c(i)
                }
            }
            if (k = d.pop(), k) throw new Error('Unclosed section "' + k[1] + '" at ' + r.pos);
            return w = tt(w), nt(w)
        }
        var l = /\s*/,
            o = /\s+/,
            a = /\S/,
            s = /\s*=/,
            v = /\s*\}/,
            y = /#|\^|\/|>|\{|&|=|!/,
            p = RegExp.prototype.test,
            k = Object.prototype.toString,
            h = Array.isArray || function(n) {
                return k.call(n) === "[object Array]"
            },
            d = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;"
            },
            r;
        u.prototype.eos = function() {
            return this.tail === ""
        };
        u.prototype.scan = function(n) {
            var t = this.tail.match(n);
            return t && t.index === 0 ? (this.tail = this.tail.substring(t[0].length), this.pos += t[0].length, t[0]) : ""
        };
        u.prototype.scanUntil = function(n) {
            var t, i = this.tail.search(n);
            switch (i) {
                case -1:
                    t = this.tail;
                    this.pos += this.tail.length;
                    this.tail = "";
                    break;
                case 0:
                    t = "";
                    break;
                default:
                    t = this.tail.substring(0, i);
                    this.tail = this.tail.substring(i);
                    this.pos += i
            }
            return t
        };
        t.make = function(n) {
            return n instanceof t ? n : new t(n)
        };
        t.prototype.push = function(n) {
            return new t(n, this)
        };
        t.prototype.lookup = function(n) {
            var t = this._cache[n],
                i, r, u;
            if (!t) {
                if (n == ".") t = this.view;
                else
                    for (i = this; i;) {
                        if (n.indexOf(".") > 0)
                            for (t = i.view, r = n.split("."), u = 0; t && u < r.length;) t = t[r[u++]];
                        else t = i.view[n];
                        if (t != null) break;
                        i = i.parent
                    }
                this._cache[n] = t
            }
            return typeof t == "function" && (t = t.call(this.view)), t
        };
        i.prototype.clearCache = function() {
            this._cache = {};
            this._partialCache = {}
        };
        i.prototype.compile = function(t, i) {
            var r = this._cache[t],
                u;
            return r || (u = n.parse(t, i), r = this._cache[t] = this.compileTokens(u, t)), r
        };
        i.prototype.compilePartial = function(n, t, i) {
            var r = this.compile(t, i);
            return this._partialCache[n] = r, r
        };
        i.prototype.getPartial = function(n) {
            return n in this._partialCache || !this._loadPartial || this.compilePartial(n, this._loadPartial(n)), this._partialCache[n]
        };
        i.prototype.compileTokens = function(n, i) {
            var r = this;
            return function(u, e) {
                if (e)
                    if (typeof e == "function") r._loadPartial = e;
                    else
                        for (var o in e) r.compilePartial(o, e[o]);
                return f(n, r, t.make(u), i)
            }
        };
        i.prototype.render = function(n, t, i) {
            return this.compile(n)(t, i)
        };
        n.name = "mustache.js";
        n.version = "0.7.2";
        n.tags = ["{{", "}}"];
        n.Scanner = u;
        n.Context = t;
        n.Writer = i;
        n.parse = it;
        n.escape = g;
        r = new i;
        n.clearCache = function() {
            return r.clearCache()
        };
        n.compile = function(n, t) {
            return r.compile(n, t)
        };
        n.compilePartial = function(n, t, i) {
            return r.compilePartial(n, t, i)
        };
        n.compileTokens = function(n, t) {
            return r.compileTokens(n, t)
        };
        n.render = function(n, t, i) {
            return r.render(n, t, i)
        };
        n.to_html = function(t, i, r, u) {
            var f = n.render(t, i, r);
            if (typeof u == "function") u(f);
            else return f
        }
    });
markSelection = function() {
    var i = "﻿",
        r = "&#xfeff;",
        n, t = "sel_" + (new Date).getTime() + "_" + Math.random().toString().substr(2);
    return function() {
        var u, f;
        if (document.selection && document.selection.createRange ? (f = document.selection.createRange().duplicate(), f.collapse(!1), f.pasteHTML('<span id="' + t + '" style="position: relative;">' + r + "<\/span>"), n = document.getElementById(t)) : window.getSelection && (u = window.getSelection(), u.getRangeAt ? u.rangeCount > 0 && (f = u.getRangeAt(0).cloneRange()) : (f.setStart(u.anchorNode, u.anchorOffset), f.setEnd(u.focusNode, u.focusOffset), f.collapsed !== u.isCollapsed && (f.setStart(u.focusNode, u.focusOffset), f.setEnd(u.anchorNode, u.anchorOffset))), u.toString() !== "" && u.toString() !== " " && (f.collapse(!0), n = document.createElement("span"), n.id = t, n.appendChild(document.createTextNode(i)), f.insertNode(n))), n) {
            u.toString() !== "" && $(".formatbar").show();
            var s = n,
                o = 0,
                e = 0;
            typeof viewAnswerMode == "undefined" ? (o += s.offsetLeft, e += s.offsetTop) : (o += $(s).offset().left - $(".interactive-panel").offset().left, e += $(s).offset().top - $(".interactive-panel").offset().top);
            e = e - 98;
            typeof extraHeightCom != "undefined" && (e = e + extraHeightCom);
            o = o - 7;
            $(".formatbar").css("top", e).css("left", o);
            n.parentNode && n.parentNode.removeChild(n)
        }
    }
}();
sw = 0;
$(document).ready(function() {
    $("body").on("click", function(n) {
        $('[rel="def"]').each(function() {
            $(this).is(n.target) || $(this).has(n.target).length !== 0 || $(".popover").has(n.target).length !== 0 || (sw === 1 ? ($(this).popover("hide"), lastSpan !== "" && $("#" + lastSpan).contents().unwrap(), sw = 0) : sw = 1)
        })
    });
    $("body").on("mouseup", function() {
        var n = getSelectedText();
        n.toString() === "" && $(".formatbar").hide()
    });
    $(".interactive-panel").on("mouseup", function(n) {
        markSelection();
        n.target.tagName === "SPAN" && n.target.className.includes("highlight") && (lastHighlight = n.target)
    });
    $("#chkAw").click(function() {
        this.checked ? $(".awl1").css({
            color: "#1e1e1e",
            background: "#fff5e3",
            "border-bottom": "solid 3px #ffbe40"
        }) : $(".awl1").removeAttr("style")
    });
    $("#chkNw").click(function() {
        this.checked ? $(".awl4").css({
            color: "#1e1e1e",
            background: "#ebf4e2",
            "border-bottom": "solid 3px #77b83e"
        }) : $(".awl4").removeAttr("style")
    });
    $(".panel-left").resizable({
        handleSelector: ".splitter",
        resizeHeight: !1
    });
    $(".panel-top").resizable({
        handleSelector: ".splitter-horizontal",
        resizeWidth: !1
    })
});
$(function() {
    $(".readingPassage").popover({
        placement: "right",
        container: ".readingPassage",
        selector: '[rel="def"]',
        html: !0,
        trigger: "click",
        template: '<div class="popover custom-popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content content-custom"><\/div><\/div>'
    })
})