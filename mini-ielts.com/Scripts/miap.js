function htmlEncode(c) {
    return jQuery("<div/>").text(c).html()
}

function htmlDecode(c) {
    return jQuery("<div/>").html(arg).text()
}
var dzsap_list = [],
    dzsap_ytapiloaded = !1,
    dzsap_globalidind = 20,
    dzsap_list_for_sync_players = [],
    dzsap_list_for_sync_sw_build = !1,
    dzsap_list_for_sync_inter_build = 0;
window.dzsap_audio_ctx = null;
window.dzsap_self_options = {};
window.dzsap_generating_pcm = !1;
window.dzsap_player_index = 0;
(function(c) {
    function n(a, c) {
        var n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a),
            y = "";
        n && (n = {
            r: parseInt(n[1], 16),
            g: parseInt(n[2], 16),
            b: parseInt(n[3], 16)
        }, y = 1, c && (y = c), y = "rgba(" + n.r + "," + n.g + "," + n.b + "," + y + ")");
        return y
    }
    window.dzsap_list_for_sync_build = function() {};
    c.fn.prependOnce = function(a, n) {
        var x = c(this);
        if ("undefined" == typeof n) {
            var y = /class="(.*?)"/.exec(a);
            "undefined" != typeof y[1] && (n = "." + y[1])
        }
        return 1 > x.children(n).length ? (x.prepend(a), !0) : !1
    };
    c.fn.appendOnce = function(a, n) {
        var x = c(this);
        if ("undefined" == typeof n) {
            var y = /class="(.*?)"/.exec(a);
            "undefined" != typeof y[1] && (n = "." + y[1])
        }
        return 1 > x.children(n).length ? (x.append(a), !0) : !1
    };
    c.fn.audioplayer = function(a) {
        if ("undefined" == typeof a && "undefined" != typeof c(this).attr("data-options") && "" != c(this).attr("data-options")) {
            var u = c(this).attr("data-options"),
                u = "window.dzsap_self_options  = " + u;
            try {
                eval(u)
            } catch (x) {
                console.warn("eval error", x)
            }
            a = c.extend({}, window.dzsap_self_options);
            window.window.dzsap_self_options = c.extend({}, {})
        }
        a = c.extend({
            design_skin: "skin-default",
            autoplay: "off",
            cue: "on",
            preload_method: "metadata",
            loop: "off",
            swf_location: "ap.swf",
            swffull_location: "apfull.swf",
            settings_backup_type: "light",
            settings_extrahtml: "",
            settings_extrahtml_in_float_left: "",
            settings_extrahtml_in_float_right: "",
            settings_extrahtml_before_play_pause: "",
            settings_extrahtml_after_play_pause: "",
            settings_trigger_resize: "0",
            design_thumbh: "default",
            design_thumbw: "200",
            disable_volume: "default",
            disable_scrub: "default",
            disable_player_navigation: "off",
            disable_timer: "default",
            type: "audio",
            enable_embed_button: "off",
            embed_code: "",
            skinwave_dynamicwaves: "off",
            soundcloud_apikey: "",
            parentgallery: null,
            skinwave_enableSpectrum: "off",
            skinwave_enableReflect: "on",
            skinwave_place_thumb_after_volume: "off",
            skinwave_place_metaartist_after_volume: "off",
            settings_useflashplayer: "auto",
            skinwave_spectrummultiplier: "1",
            settings_php_handler: "",
            php_retriever: "soundcloudretriever.php",
            skinwave_mode: "normal",
            skinwave_wave_mode: "normal",
            skinwave_wave_mode_canvas_waves_number: "250",
            skinwave_wave_mode_canvas_waves_padding: "1",
            skinwave_wave_mode_canvas_reflection_size: "0.25",
            change_media_animate_skinwave_mode_small: "off",
            pcm_data_try_to_generate: "off",
            skinwave_comments_links_to: "",
            skinwave_comments_enable: "off",
            skinwave_comments_playerid: "",
            skinwave_comments_account: "none",
            skinwave_comments_process_in_php: "on",
            skinwave_comments_retrievefromajax: "off",
            skinwave_preloader_code: "default",
            skinwave_comments_displayontime: "on",
            skinwave_comments_avatar: "http://www.gravatar.com/avatar/00000000000000000000000000000000?s=20",
            skinwave_comments_allow_post_if_not_logged_in: "on",
            skinwave_timer_static: "off",
            skinwave_spectrum_wavesbg: "4f4949",
            skinwave_spectrum_wavesprog: "ae1919",
            default_volume: "1",
            volume_from_gallery: "",
            design_menu_show_player_state_button: "off",
            playfrom: "off",
            scrubbar_tweak_overflow_hidden: "off",
            design_animateplaypause: "default",
            embedded: "off",
            embedded_iframe_id: "",
            sample_time_start: "0",
            sample_time_end: "0",
            sample_time_total: "0",
            google_analytics_send_play_event: "off",
            fakeplayer: null,
            type_for_fake_feed: "",
            failsafe_repair_media_element: "",
            action_audio_play: null,
            action_audio_play2: null,
            action_audio_end: null,
            action_audio_comment: null,
            action_audio_loaded_metadata: null,
            type_audio_stop_buffer_on_unfocus: "off",
            construct_player_list_for_sync: "off",
            settings_exclude_from_list: "off",
            design_color_bg: "222222",
            design_color_highlight: "ea8c52"
        }, a);
        this.each(function() {
            function x() {
                var d = parseFloat(a.skinwave_wave_mode_canvas_reflection_size),
                    d = 1 - d;
                E && (0 == d ? E.css("top", m.offset().top - b.offset().top + m.height() * d - E.height()) : (console.info(m.offset().top, b.offset().top, m.offset().top -
                    b.offset().top, d, m.height(), L.outerHeight()), E.css("top", m.offset().top - b.offset().top + m.height() * d)));
                L.css("top", m.height() * d - L.outerHeight());
                O.css("top", m.height() * d - O.outerHeight())
            }

            function y(a, b) {
                var h = {};
                b && c.extend(h, b);
                A = a;
                pa && A && A.get(0) && A.get(0).api_play_media_visual && A.get(0).api_play_media_visual()
            }

            function Ca(d) {
                a.design_color_highlight = d;
                "canvas" == a.skinwave_wave_mode && (qa(Ja.get(0), b.attr("data-pcm"), "#" + a.design_color_bg), qa(Va.get(0), b.attr("data-pcm"), "#" + a.design_color_highlight))
            }

            function p(d, f) {
                var h = {
                    type: "",
                    fakeplayer_is_feeder: "off",
                    call_from: "default",
                    source: "default",
                    pcm: "",
                    artist: "",
                    song_name: "",
                    thumb: "",
                    thumb_link: "",
                    autoplay: "on",
                    cue: "on"
                };
                W = "on";
                var D = 500;
                f && (h = c.extend(h, f));
                A && A.get(0).api_pause_media_visual();
                "on" == h.fakeplayer_is_feeder ? (A = d, h.source = A.attr("data-source"), A.attr("data-pcm") && (h.pcm = A.attr("data-pcm")), 0 < A.find(".meta-artist").length && (h.artist = d.find(".the-artist").eq(0).html(), h.song_name = d.find(".the-name").eq(0).html()), A.attr("data-thumb") &&
                    (h.thumb = d.attr("data-thumb")), A.attr("data-thumb_link") && (h.thumb_link = d.attr("data-thumb_link")), A.attr("data-scrubbg") && (h.scrubbg = d.attr("data-scrubbg")), A.attr("data-scrubprog") && (h.scrubprog = d.attr("data-scrubprog"))) : (A = null, Wa = d);
                if (A) {
                    if (b.attr("data-source") == d.attr("data-source")) return !1
                } else if (b.attr("data-source") == d) return !1;
                b.removeClass("meta-loaded");
                b.parent().hasClass("audioplayer-was-loaded") && (b.parent().addClass("audioplayer-loaded"), b.parent().removeClass("audioplayer-was-loaded"));
                b.removeClass("errored-out");
                X();
                A ? b.attr("data-source", d.attr("data-source")) : b.attr("data-source", d);
                h.type && ("soundcloud" == h.type && (h.type = "audio"), "album_part" == h.type && (h.type = "audio"), b.attr("data-type", h.type), t = h.type, a.type = h.type);
                ib = !1;
                if ("skin-wave" == a.design_skin && "small" == a.skinwave_mode && "on" == a.change_media_animate_skinwave_mode_small) {
                    b.addClass("transitioning-change-media");
                    if (h.artist || h.song_name) D = 0, C && C.offset() && (D = C.offset().left - b.offset().left - 13), C.css({
                        position: "absolute",
                        top: "16px",
                        left: D + "px"
                    }), C.animate({
                        top: "-50px",
                        opacity: "0"
                    }, {
                        duration: 300
                    }), 0 < b.find(".the-thumb-con").length && b.find(".the-thumb-con").addClass("transitioning-out"), P.append('<div class="meta-artist-con transitioning" style="top:55px;"><div class="meta-artist"><div class="meta-artist"><span class="the-artist">' + h.artist + '</span>&nbsp;<span class="the-name">' + h.song_name + "</span></div></div></div>"), b.find(".meta-artist-con.transitioning").eq(0).animate({
                        top: "18px"
                    }, {
                        duration: 300,
                        complete: function() {
                            c(this).css("top",
                                "");
                            c(this).removeClass("transitioning");
                            C = c(this)
                        }
                    });
                    h.thumb ? (0 < b.find(".the-thumb-con").length && b.find(".the-thumb-con").addClass("transitioning-out"), b.addClass("has-thumb"), b.find(".the-thumb-con.transitioning-out").css({
                            position: "absolute",
                            top: "0px",
                            left: "0px"
                        }), b.find(".the-thumb-con.transitioning-out").animate({
                            top: "-80px"
                        }, {
                            duration: 500
                        }), D = "", D = h.thumb_link ? D + ('<a href="' + h.thumb_link + '"') : D + "<div", D += ' class="the-thumb-con" style="top: 80px;"><div class="the-thumb" style="  background-image:url(' +
                        h.thumb + ')"></div>', D = h.thumb_link ? D + "</a>" : D + "</div>", P.prepend(D), b.find(".the-thumb-con").eq(0).animate({
                            top: "0"
                        }, {
                            duration: 700
                        })) : b.removeClass("has-thumb");
                    "canvas" == a.skinwave_wave_mode ? (xa = d.attr("data-source"), h.pcm ? (ya(d.attr("data-pcm")), b.attr("data-pcm", d.attr("data-pcm"))) : Ka({
                        call_from: "regenerate_canvas_from_change_media"
                    })) : 0 < b.find(".scrub-bg").length && h.scrubbg && (b.find(".scrub-bg,.scrub-prog,.scrub-bg-reflect,.scrub-prog-reflect").animate({
                            opacity: 0
                        }, {
                            duration: 500
                        }), D = '<div class="scrub-bg is-new" style="opacity: 0;"></div><div class="scrub-buffer"></div><div class="scrub-prog is-new"  style="opacity: 0;"></div>',
                        "skin-wave" == a.design_skin && "on" == a.skinwave_enableReflect && (D += '<div class="scrub-bg-reflect is-new" style="opacity: 0;"></div><div class="scrub-prog-reflect is-new" style="opacity: 0;"></div>'), jb && (D += '<div class="sample-block-start is-new" style="width: ' + 100 * jb + '%"></div>'), La && (D += '<div class="sample-block-end is-new" style="left: ' + 100 * La + "%; width: " + (100 - 100 * La) + '%"></div>'), m.children(".total-time").before(D), h.scrubbg && m.children(".scrub-bg.is-new").append('<img class="scrub-bg-img" src="' +
                            h.scrubbg + '"/>'), h.scrubprog && m.children(".scrub-prog.is-new").eq(0).append('<img class="scrub-prog-img" src="' + h.scrubprog + '"/>'), m.find(".scrub-bg-img").css({}), m.find(".scrub-prog-img").css({
                            width: m.children(".scrub-bg.is-new").width()
                        }), "on" == a.skinwave_enableReflect && (m.children(".scrub-bg-reflect.is-new").eq(0).append('<img class="scrub-bg-img-reflect" src="' + h.scrubbg + '"/>'), void 0 != b.attr("data-scrubprog") && m.children(".scrub-prog-reflect.is-new").eq(0).append('<img class="scrub-prog-img-reflect" src="' +
                            h.scrubprog + '"/>'), m.find(".scrub-bg-img").css({
                            "transform-origin": "100% 100%"
                        }), m.find(".scrub-prog-img").css({
                            "transform-origin": "100% 100%"
                        }), m.find(".scrub-prog-img-reflect").css({
                            width: m.children(".scrub-bg.is-new").width()
                        })), setTimeout(function() {
                            b.find(".scrub-bg.is-new,.scrub-prog.is-new").animate({
                                opacity: 1
                            }, {
                                duration: 500,
                                queue: !1
                            });
                            b.find(".scrub-bg-reflect.is-new,.scrub-prog-reflect.is-new").animate({
                                opacity: .5
                            }, {
                                duration: 500,
                                queue: !1
                            })
                        }, 100));
                    setTimeout(function() {
                        1 < b.find(".meta-artist-con").length &&
                            (b.find(".meta-artist-con").eq(0).remove(), C = b.find(".meta-artist-con").eq(0));
                        1 < b.find(".the-thumb-con").length && (b.find(".the-thumb-con").eq(1).remove(), Ob = b.find(".the-thumb-con").eq(0));
                        "canvas" != a.skinwave_wave_mode && (m.find(".scrub-bg:not(.is-new)").remove(), m.find(".scrub-prog:not(.is-new)").remove());
                        m.find(".scrub-bg-reflect:not(.is-new)").remove();
                        m.find(".scrub-prog-reflect:not(.is-new)").remove();
                        m.find(".is-new").removeClass("is-new");
                        b.removeClass("transitioning-change-media")
                    }, 900)
                } else "skin-wave" ==
                    a.design_skin && ("canvas" == a.skinwave_wave_mode && (xa = A ? d.attr("data-source") : d, "" != h.pcm ? (ya(h.pcm), b.attr("data-pcm", h.pcm)) : (m.addClass("fast-animate-scrubbar"), b.removeClass("scrubbar-loaded"), setTimeout(function() {}, 10), setTimeout(function() {
                        b.removeClass("fast-animate-scrubbar");
                        Xa = !1;
                        b.attr("data-pcm", "");
                        ra = "";
                        wb();
                        Ka({
                            call_from: "regenerate_canvas_from_change_media"
                        })
                    }, 120))), h.artist && b.find(".the-artist").html(h.artist), h.song_name && b.find(".the-name").html(h.song_name), h.thumb && b.find(".the-thumb").css("background-image",
                        "url(" + h.thumb + ")"));
                if ("skin-silver" == a.design_skin) {
                    D = 0;
                    C && 0 < C.length ? (D = C.offset().left - b.offset().left - 13, C.css({
                        position: "absolute",
                        top: "0px",
                        left: D + "px"
                    }), C.animate({
                        top: "-50px",
                        opacity: "0"
                    }, {
                        duration: 300
                    })) : D = 0;
                    d.find(".meta-artist");
                    var g = "",
                        k = "";
                    d.find(".meta-artist").eq(0).html() && (g = d.find(".meta-artist").eq(0).html());
                    d.attr("data-thumb") ? (b.addClass("has-thumb"), 0 < b.find(".the-thumb-con").length && b.find(".the-thumb-con").addClass("transitioning-out"), k += '<div class="the-thumb-con" style=""><div class="the-thumb" style="  background-image:url(' +
                        d.attr("data-thumb") + ')"></div></div>') : b.removeClass("has-thumb");
                    b.addClass("transitioning-change-media");
                    ga.append('<div class="meta-artist-con transitioning" style="top:55px;">' + k + '<div class="meta-artist">' + g + "</div></div>");
                    0 == D && (D = b.width() - ga.find(".meta-artist-con.transitioning").last().width());
                    b.find(".meta-artist-con").last().css({
                        top: "50px",
                        position: "relative"
                    });
                    b.find(".meta-artist-con").last().animate({
                        top: "0px"
                    }, {
                        duration: 500
                    });
                    setTimeout(function() {
                        1 < b.find(".meta-artist-con").length &&
                            b.find(".meta-artist-con").eq(0).remove();
                        C = b.find(".meta-artist-con").eq(0);
                        C.css({
                            position: "relative",
                            left: "0"
                        });
                        b.removeClass("transitioning-change-media")
                    }, 900)
                }
                D = 100;
                A && d.find(".meta-artist").eq(0).html();
                Q();
                kb && Da(kb, {
                    call_from: "change_media"
                });
                if ("fake" == t) return !1;
                "on" == h.autoplay && (Pb(), setTimeout(function() {
                    ia()
                }, 500));
                setTimeout(function() {
                    sa()
                }, D)
            }

            function Ma() {
                for (Y = 0; Y < lb.length; Y++) E && null != lb[Y] && E.append(lb[Y])
            }

            function Ya() {
                if (mb) return !1;
                dc = !0
            }

            function Na() {
                if (mb) return !1;
                pa &&
                    Oa();
                b.remove();
                b = null;
                mb = !0
            }

            function ta(a, f) {
                var h = {
                    do_not_autoplay: !1
                };
                f && (h = c.extend(h, f));
                b.find(".playbtn").unbind("click", ta);
                b.find(".scrubbar").unbind("click", ta);
                Q(h);
                (is_android() || is_ios()) && ia()
            }

            function k(b) {
                a.parentgallery && "undefined" != typeof a.parentgallery.get(0) && a.parentgallery.get(0).api_toggle_menu_state()
            }

            function e(d) {
                var f = c(this),
                    h = parseInt(d.clientX, 10) - f.offset().left;
                nb = h / f.width() * 100 + "%";
                htmlEncode("");
                if (!a.skinwave_comments_links_to) {
                    if ("off" == a.skinwave_comments_allow_post_if_not_logged_in &&
                        "none" == a.skinwave_comments_account) return !1;
                    var D = !0;
                    E.children().each(function() {
                        var a = c(this);
                        if (!a.hasClass("placeholder") && !a.hasClass("the-bg") && (a = a.offset().left - f.offset().left, 20 > Math.abs(a - h))) return E.find(".dzstooltip-con.placeholder").remove(), D = !1
                    });
                    if (!D) return !1;
                    d = E.offset().left - b.offset().left;
                    var m = h + d - Z.width() / 2 + 7,
                        g = -1;
                    m < d ? (g = m + 32, m = d, b.append('<style class="comments-writter-temp-css">.audioplayer.skin-wave .comments-writer .comments-writer-inner:before{ left:' + g + "px  }</style>")) :
                        m > M - d - Z.width() / 2 ? (g = h - (Z.offset().left - b.offset().left) + Z.width() / 3, m = M - d - Z.width() / 2, b.append('<style class="comments-writter-temp-css">.audioplayer.skin-wave .comments-writer .comments-writer-inner:before{ left:' + g + "px  }</style>")) : b.find(".comments-writter-temp-css").remove();
                    Z.css("left", m + "px");
                    0 == Z.hasClass("active") && (Z.css({
                            height: Z.find(".comments-writer-inner").eq(0).outerHeight() + 20
                        }), Z.addClass("active"), b.addClass("comments-writer-active"), a.parentgallery && void 0 != c(a.parentgallery).get(0) &&
                        void 0 != c(a.parentgallery).get(0).api_handleResize && c(a.parentgallery).get(0).api_handleResize());
                    "none" != a.skinwave_comments_account && b.find("input[name=comment-email]").remove();
                    E.find(".dzstooltip-con.placeholder").remove();
                    E.append('<span class="dzstooltip-con placeholder" style="left:' + nb + ';"><div class="the-avatar" style="background-image: url(' + a.skinwave_comments_avatar + ')"></div></span>')
                }
            }

            function l(a) {
                xb()
            }

            function g(d) {
                if (0 < b.find("input[name=comment-email]").length) {
                    if (0 == /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(b.find("input[name=comment-email]").eq(0).val())) return alert("please insert email, your email is just used for gravatar. it will not be sent or stored anywhere"),
                        !1;
                    d = String(b.find("input[name=comment-email]").eq(0).val()).split("@")[0];
                    a.skinwave_comments_account = d;
                    a.skinwave_comments_avatar = "https://secure.gravatar.com/avatar/" + MD5(String(b.find("input[name=comment-email]").eq(0).val()).toLowerCase()) + "?s=20"
                }
                d = a.skinwave_comments_account;
                var f = "";
                "on" != a.skinwave_comments_process_in_php ? (f += '<span class="dzstooltip-con" style="left:' + nb + '"><span class="dzstooltip arrow-from-start transition-slidein arrow-bottom skin-black" style="width: 250px;"><span class="the-comment-author">@' +
                    d + "</span> says:<br>", f += htmlEncode(b.find("*[name=comment-text]").eq(0).val()), f += '</span><div class="the-avatar" style="background-image: url(' + a.skinwave_comments_avatar + ')"></div></span>') : f += b.find("*[name=comment-text]").eq(0).val();
                b.find("*[name=comment-text]").eq(0).val("");
                S(f);
                xb();
                a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_player_commentSubmitted && c(a.parentgallery).get(0).api_player_commentSubmitted();
                return !1
            }

            function xb() {
                b.removeClass("comments-writer-active");
                E.find(".dzstooltip-con.placeholder").remove();
                Z.removeClass("active");
                Z.css({
                    height: 0
                });
                a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_handleResize && c(a.parentgallery).get(0).api_handleResize();
                setTimeout(function() {
                    b.find(".comments-writter-temp-css").remove()
                }, 300)
            }

            function aa() {
                1 != ib && (q = new YT.Player("ytplayer_" + T + "", {
                    height: "200",
                    width: "200",
                    videoId: b.attr("data-source"),
                    playerVars: {
                        origin: ""
                    },
                    events: {
                        onReady: Qb,
                        onStateChange: Pa
                    }
                }))
            }

            function Qb(a) {
                ua()
            }

            function Pa(a) {}

            function ob() {
                setTimeout(function() {
                    b.addClass("scrubbar-loaded")
                }, 1E3)
            }

            function wb(d) {
                var f = {};
                d && (f = c.extend(f, d));
                b.attr("data-pcm") || (d = {
                    action: "dzsap_get_pcm",
                    postdata: "1",
                    source: b.attr("data-source"),
                    playerid: ra
                }, a.settings_php_handler && (c.ajax({
                    type: "POST",
                    url: a.settings_php_handler,
                    data: d,
                    success: function(a) {
                        a ? "0" != a ? (b.attr("data-pcm", a), Xa = !0, m.css("opacity"), setTimeout(function() {
                            b.addClass("scrubbar-loaded");
                            x();
                            setTimeout(function() {}, 100)
                        }, 100)) : yb = !0 : yb = !0
                    },
                    error: function(a) {
                        "undefined" !=
                        typeof window.console && console.log("Got this from the server: " + a, a)
                    }
                }), yb = !1))
            }

            function Ka(a) {
                var f = {
                    call_from: "default"
                };
                a && (f = c.extend(f, a));
                if (Xa) return !1;
                if (!yb) return setTimeout(function() {
                    Ka(f)
                }, 1E3), !1;
                if (window.WaveSurfer) console.info("wavesurfer already loaded"), Za({
                    call_from: "wavesurfer already loaded"
                });
                else {
                    var h = document.getElementsByTagName("script");
                    a = "";
                    for (var m in h)
                        if (-1 < h[m].src.indexOf("audioplayer.js")) break;
                    m = String(h[m].src).split("/");
                    for (h = 0; h < m.length - 1; h++) a += m[h] + "/";
                    a += "wavesurfer.js";
                    b.addClass("errored-out");
                    b.append('<div class="feedback-text pcm-notice">please wait while pcm data is generated.. </div>');
                    c.ajax({
                        url: a,
                        dataType: "script",
                        success: function(a) {
                            Za({
                                call_from: "load_script"
                            })
                        }
                    })
                }
            }

            function Za(d) {
                var f = {
                    call_from: "default"
                };
                d && c.extend(f, d);
                console.info("generate_wave_data margs - ", f);
                if ("fake" == xa) return !1;
                if (window.dzsap_generating_pcm) return setTimeout(function() {
                    Za(f)
                }, 1E3), !1;
                window.dzsap_generating_pcm = !0;
                console.info("generate_wave_data margs - ",
                    f);
                console.info(" generate_wave_data()", xa);
                d = "wavesurfer" + Math.ceil(1E3 * Math.random());
                b.append('<div id="' + d + '" class="hidden"></div>');
                var h = WaveSurfer.create({
                    container: "#" + d,
                    normalize: !0
                });
                if (0 != String(b.attr("data-source")).indexOf("https://soundcloud.com") && "fake" != b.attr("data-source")) {
                    String(b.attr("data-source")).indexOf("https://api.soundcloud.com");
                    console.info("src_real_mp3 - " + xa);
                    try {
                        h.load(xa)
                    } catch (m) {
                        console.warn("WAVE SURFER NO LOAD")
                    }
                    h.on("ready", function() {
                        var d = h.exportPCM(512,
                            1E3, !0);
                        b.attr("data-pcm", d);
                        Wa && Wa.attr && Wa.attr("data-pcm", d);
                        b.find(".pcm-notice").fadeOut("fast");
                        b.removeClass("errored-out");
                        "" == ra && (ra = b.attr("data-source"), Rb && (ra = Rb));
                        console.info(" pcm_identifier- ", ra);
                        d = {
                            action: "dzsap_submit_pcm",
                            postdata: d,
                            playerid: ra
                        };
                        window.dzsap_generating_pcm = !1;
                        a.settings_php_handler && c.ajax({
                            type: "POST",
                            url: a.settings_php_handler,
                            data: d,
                            success: function(a) {}
                        })
                    });
                    h.on("error", function() {
                        console.info("WAVE SURFER ERROR !!!");
                        for (var a = [], d = 0; 1E3 > d; d++) a[d] = Math.random();
                        a = JSON.stringify(a);
                        b.attr("data-pcm", a)
                    });
                    ya(b.attr("data-pcm"))
                }
            }

            function ya(b) {
                m.find(".scrub-bg-img,.scrub-prog-img").addClass("transitioning-out");
                m.find(".scrub-bg-img,.scrub-prog-img").animate({
                    opacity: 0
                }, {
                    queue: !1,
                    duration: 300
                });
                v({
                    prepare_for_transition_in: !0
                });
                qa(Ja.get(0), b, "#" + a.design_color_bg);
                qa(Va.get(0), b, "#" + a.design_color_highlight);
                m.find(".scrub-bg-img.transitioning-in,.scrub-prog-img.transitioning-in").animate({
                    opacity: 1
                }, {
                    queue: !1,
                    duration: 300,
                    complete: function() {
                        var a = c(this).parent();
                        a.children(".transitioning-out").remove();
                        a.children(".transitioning-in").removeClass("transitioning-in")
                    }
                });
                Xa = !0;
                ob()
            }

            function r() {
                b.append('<div class="audioplayer-inner"></div>');
                K = b.children(".audioplayer-inner");
                K.append('<div class="the-media"></div>');
                "skin-customcontrols" != a.design_skin && K.append('<div class="ap-controls"></div>');
                ea = K.children(".the-media").eq(0);
                ha = K.children(".ap-controls").eq(0);
                var d, f = "";
                d = '<div class="scrubbar"><div class="scrub-bg"></div><div class="scrub-buffer"></div><div class="scrub-prog"></div><div class="scrubBox"></div><div class="scrubBox-prog"></div><div class="scrubBox-hover"></div>';
                "skin-wave" == a.design_skin && "on" == a.skinwave_enableReflect && (d += '<div class="scrub-bg-reflect"></div><div class="scrub-prog-reflect"></div>');
                "skin-wave" == a.design_skin && "on" != a.disable_timer && (d += '<div class="total-time">00:00</div><div class="curr-time">00:00</div>');
                jb && (d += '<div class="sample-block-start" style="width: ' + 100 * jb + '%"></div>');
                La && (d += '<div class="sample-block-end" style="left: ' + 100 * La + "%; width: " + (100 - 100 * La) + '%"></div>');
                d += "</div>";
                var h = "";
                a.settings_extrahtml_before_play_pause &&
                    (h += a.settings_extrahtml_before_play_pause);
                b.find(".feed-dzsap-before-playpause").length && (h += b.find(".feed-dzsap-before-playpause").eq(0).html(), b.find(".feed-dzsap-before-playpause").remove());
                h += '<div class="con-playpause"><div class="playbtn"><div class="the-icon-bg"></div><div class="play-icon">';
                b.hasClass("button-aspect-noir") && (h += '<svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11.161px" height="12.817px" viewBox="0 0 11.161 12.817" enable-background="new 0 0 11.161 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M8.233,4.589c1.401,0.871,2.662,1.77,2.801,1.998c0.139,0.228-1.456,1.371-2.896,2.177l-4.408,2.465 c-1.44,0.805-2.835,1.474-3.101,1.484c-0.266,0.012-0.483-1.938-0.483-3.588V3.666c0-1.65,0.095-3.19,0.212-3.422 c0.116-0.232,1.875,0.613,3.276,1.484L8.233,4.589z"/> </g> </g> </g> </svg>  ');
                h += '</div></div><div class="pausebtn" style="display:none"><div class="the-icon-bg"></div><div class="pause-icon"><div class="pause-part-1"></div><div class="pause-part-2"></div>';
                b.hasClass("button-aspect-noir") && (h += ' <svg class="svg-icon" version="1.1" id="Layer_3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="13px" viewBox="0 0 13.415 16.333" enable-background="new 0 0 13.415 16.333" xml:space="preserve"> <path fill="#D2D6DB" d="M4.868,14.59c0,0.549-0.591,0.997-1.322,0.997H2.2c-0.731,0-1.322-0.448-1.322-0.997V1.618 c0-0.55,0.592-0.997,1.322-0.997h1.346c0.731,0,1.322,0.447,1.322,0.997V14.59z"/> <path fill="#D2D6DB" d="M12.118,14.59c0,0.549-0.593,0.997-1.324,0.997H9.448c-0.729,0-1.322-0.448-1.322-0.997V1.619 c0-0.55,0.593-0.997,1.322-0.997h1.346c0.731,0,1.324,0.447,1.324,0.997V14.59z"/> </svg>  ');
                h += "</div></div>";
                "skin-wave" == a.design_skin && (h += a.skinwave_preloader_code);
                h += "</div>";
                b.find(".feed-dzsap-after-playpause").length && (h += b.find(".feed-dzsap-after-playpause").eq(0).html(), b.find(".feed-dzsap-after-playpause").remove());
                f += '<div class="con-controls"><div class="the-bg"></div>' + h;
                a.settings_extrahtml_in_float_left && (f += a.settings_extrahtml_in_float_left);
                "skin-wave" != a.design_skin && "on" != a.disable_timer && (f += '<div class="curr-time">00:00</div><div class="total-time">00:00</div>');
                if ("skin-default" == a.design_skin || "skin-wave" == a.design_skin) f += '<div class="ap-controls-right">', "on" != a.disable_volume && (f += '<div class="controls-volume"><div class="volumeicon"></div><div class="volume_static"></div><div class="volume_active"></div><div class="volume_cut"></div></div>'), a.settings_extrahtml_in_float_right && (f += a.settings_extrahtml_in_float_right), f += '</div><div class="clear"></div>';
                f += "</div>";
                if ("skin-wave" == a.design_skin && "small" == a.skinwave_mode) ha.append('<div class="the-bg"></div><div class="ap-controls-left">' +
                    h + "</div>" + d + '<div class="ap-controls-right"><div class="controls-volume"><div class="volumeicon"></div><div class="volume_static"></div><div class="volume_active"></div><div class="volume_cut"></div></div></div>');
                else if ("skin-aria" == a.design_skin || "skin-silver" == a.design_skin || "skin-redlights" == a.design_skin || "skin-steel" == a.design_skin) {
                    h = f = '<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="30px" viewBox="0 0 25 30" xml:space="preserve"> <path d="M24.156,13.195L2.406,0.25C2.141,0.094,1.867,0,1.555,0C0.703,0,0.008,0.703,0.008,1.562H0v26.875h0.008 C0.008,29.297,0.703,30,1.555,30c0.32,0,0.586-0.109,0.875-0.266l21.727-12.93C24.672,16.375,25,15.727,25,15 S24.672,13.633,24.156,13.195z"/> </svg>';
                    "skin-silver" == a.design_skin && (f = '<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="30px" viewBox="0 0 25 30" xml:space="preserve"> <path d="M24.156,13.195L2.406,0.25C2.141,0.094,1.867,0,1.555,0C0.703,0,0.008,0.703,0.008,1.562H0v26.875h0.008 C0.008,29.297,0.703,30,1.555,30c0.32,0,0.586-0.109,0.875-0.266l21.727-12.93C24.672,16.375,25,15.727,25,15 S24.672,13.633,24.156,13.195z"/> </svg>',
                        h = '<svg version="1.2" baseProfile="tiny" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="30px" viewBox="0 0 25 30" xml:space="preserve"> <path d="M9.812,29.7c0,0.166-0.178,0.3-0.398,0.3H2.461c-0.22,0-0.398-0.134-0.398-0.3V0.3c0-0.166,0.178-0.3,0.398-0.3h6.953 c0.22,0,0.398,0.134,0.398,0.3V29.7z"/> <path d="M23.188,29.7c0,0.166-0.178,0.3-0.398,0.3h-6.953c-0.22,0-0.398-0.134-0.398-0.3V0.3c0-0.166,0.178-0.3,0.398-0.3h6.953 c0.22,0,0.398,0.134,0.398,0.3V29.7z"/> </svg>');
                    if ("skin-redlights" == a.design_skin || "skin-steel" == a.design_skin) h = f = "";
                    f = '<div class="the-bg"></div><div class="ap-controls-left"><div class="con-playpause"><div class="playbtn"><div class="play-icon">' + f + '</div><div class="play-icon-hover"></div></div><div class="pausebtn" style="display:none"><div class="pause-icon">' + h + '</div><div class="pause-icon-hover"></div></div></div>';
                    "skin-silver" == a.design_skin && (f += '<div class="curr-time">00:00</div>');
                    f += "</div>";
                    a.settings_extrahtml_in_float_right &&
                        (f += '<div class="controls-right">' + a.settings_extrahtml_in_float_right + "</div>", "skin-redlights" == a.design_skin && a.parentgallery && a.parentgallery.get(0).api_skin_redlights_give_controls_right_to_all && a.parentgallery.get(0).api_skin_redlights_give_controls_right_to_all());
                    f += '<div class="ap-controls-right">';
                    "skin-silver" == a.design_skin ? (f += '<div class="controls-volume controls-volume-vertical"><div class="volumeicon"></div><div class="volume-holder"><div class="volume_static"></div><div class="volume_active"></div><div class="volume_cut"></div></div></div>',
                        "on" != a.disable_timer && (f += '<div class="total-time">00:00</div>'), f += "</div>" + d) : ("skin-redlights" == a.design_skin && ("on" != a.disable_volume && (f += '<div class="controls-volume"><div class="volumeicon"></div><div class="volume_static"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="57px" height="12px" viewBox="0 0 57 12" enable-background="new 0 0 57 12" xml:space="preserve"> <rect y="9" fill="#414042" width="3" height="3"/> <rect x="6" y="8" fill="#414042" width="3" height="4"/> <rect x="12" y="7" fill="#414042" width="3" height="5"/> <rect x="18" y="5.958" fill="#414042" width="3" height="6"/> <rect x="24" y="4.958" fill="#414042" width="3" height="7"/> <rect x="30" y="4" fill="#414042" width="3" height="8"/> <rect x="36" y="3" fill="#414042" width="3" height="9"/> <rect x="42" y="2" fill="#414042" width="3" height="10"/> <rect x="48" y="1" fill="#414042" width="3" height="11"/> <rect x="54" fill="#414042" width="3" height="12"/> </svg></div><div class="volume_active"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="57px" height="12px" viewBox="0 0 57 12" enable-background="new 0 0 57 12" xml:space="preserve"> <rect y="9" fill="#414042" width="3" height="3"/> <rect x="6" y="8" fill="#414042" width="3" height="4"/> <rect x="12" y="7" fill="#414042" width="3" height="5"/> <rect x="18" y="5.958" fill="#414042" width="3" height="6"/> <rect x="24" y="4.958" fill="#414042" width="3" height="7"/> <rect x="30" y="4" fill="#414042" width="3" height="8"/> <rect x="36" y="3" fill="#414042" width="3" height="9"/> <rect x="42" y="2" fill="#414042" width="3" height="10"/> <rect x="48" y="1" fill="#414042" width="3" height="11"/> <rect x="54" fill="#414042" width="3" height="12"/> </svg></div><div class="volume_cut"></div></div>'),
                        f += '<div class="clear"></div>'), f += d, "on" != a.disable_timer && (f += '<div class="total-time">00:00</div>'));
                    "skin-silver" != a.design_skin && (f += "</div>");
                    ha.append(f)
                } else b.hasClass("alternate-layout") ? ha.append(f + d) : ha.append(d + f);
                0 < ha.find(".ap-controls-left").length && (P = ha.find(".ap-controls-left").eq(0));
                0 < ha.find(".ap-controls-right").length && (ga = ha.find(".ap-controls-right").eq(0));
                "on" != a.disable_timer && (L = b.find(".curr-time").eq(0), O = b.find(".total-time").eq(0), "skin-steel" == a.design_skin && 0 ==
                    L.length && (O.before('<div class="curr-time">00:00</div> <span class="separator-slash">/</span> '), L = O.prev().prev()));
                0 < Number(a.sample_time_total) && (I = Number(a.sample_time_total), O && O.html(zb(I)));
                m = ha.find(".scrubbar").eq(0);
                Ea = ha.children(".con-controls");
                z = b.find(".con-playpause").eq(0);
                w = b.find(".controls-volume").eq(0);
                if (!C) {
                    0 < b.children(".meta-artist").length && (b.hasClass("alternate-layout") ? (Ea.children().last().hasClass("clear") && Ea.children().last().remove(), Ea.append(b.children(".meta-artist"))) :
                        K.append(b.children(".meta-artist")));
                    K.find(".meta-artist").eq(0).wrap('<div class="meta-artist-con"></div>');
                    C = K.children(".meta-artist-con").eq(0);
                    "skin-wave" == a.design_skin && (b.find(".dzsap-repeat-button").length ? b.find(".dzsap-repeat-button").after(C) : b.find(".dzsap-loop-button").length ? b.find(".dzsap-loop-button").after(C) : z.after(C));
                    "skin-aria" == a.design_skin && ga.prepend(C);
                    if ("skin-redlights" == a.design_skin || "skin-steel" == a.design_skin) ga.prepend('<div class="clear"></div>'), ga.prepend(C);
                    "skin-silver" == a.design_skin && ga.append(C);
                    "skin-default" == a.design_skin && ga.before(C)
                }
                d = "";
                "" != pb && (d = " height:" + a.design_thumbh + "px;");
                void 0 != b.attr("data-thumb") && "" != b.attr("data-thumb") ? (b.addClass("has-thumb"), f = "", f = b.attr("data-thumb_link") ? f + ('<a href="' + b.attr("data-thumb_link") + '"') : f + "<div", f += ' class="the-thumb-con"><div class="the-thumb" style="' + d + " background-image:url(" + b.attr("data-thumb") + ')"></div>', f = b.attr("data-thumb_link") ? f + "</a>" : f + "</div>", "skin-customcontrols" != a.design_skin &&
                    ("skin-wave" == a.design_skin && "small" == a.skinwave_mode ? P.prepend(f) : "skin-steel" == a.design_skin ? P.append(f) : K.prepend(f)), Ob = K.children(".the-thumb-con").eq(0)) : b.removeClass("has-thumb");
                "on" == a.disable_volume && w.hide();
                "off" == a.disable_volume && w.show();
                "on" == a.disable_scrub && m.hide();
                "skin-wave" == a.design_skin && a.parentgallery && "undefined" != typeof a.parentgallery && "on" == a.design_menu_show_player_state_button && ("skin-wave" == a.design_skin ? ga.appendOnce('<div class="btn-menu-state"> <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.25px" height="13.915px" viewBox="0 0 13.25 13.915" enable-background="new 0 0 13.25 13.915" xml:space="preserve"> <path d="M1.327,4.346c-0.058,0-0.104-0.052-0.104-0.115V2.222c0-0.063,0.046-0.115,0.104-0.115H11.58 c0.059,0,0.105,0.052,0.105,0.115v2.009c0,0.063-0.046,0.115-0.105,0.115H1.327z"/> <path d="M1.351,8.177c-0.058,0-0.104-0.051-0.104-0.115V6.054c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.063-0.047,0.115-0.105,0.115H1.351z"/> <path d="M1.351,12.182c-0.058,0-0.104-0.05-0.104-0.115v-2.009c0-0.064,0.046-0.115,0.104-0.115h10.252 c0.058,0,0.105,0.051,0.105,0.115v2.009c0,0.064-0.047,0.115-0.105,0.115H1.351z"/> </svg>    </div></div>') :
                    K.appendOnce('<div class="btn-menu-state"></div>'));
                "on" == a.skinwave_place_metaartist_after_volume && w.before(C);
                "on" == a.skinwave_place_thumb_after_volume && w.before(b.find(".the-thumb-con"));
                "skin-wave" == a.design_skin && "" != a.embed_code && ("skin-wave" == a.design_skin ? "on" == a.enable_embed_button && ga.appendOnce('<div class="btn-embed-code-con dzstooltip-con "><div class="btn-embed-code"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10.975px" height="14.479px" viewBox="0 0 10.975 14.479" enable-background="new 0 0 10.975 14.479" xml:space="preserve"> <g> <path d="M2.579,1.907c0.524-0.524,1.375-0.524,1.899,0l4.803,4.804c0.236-0.895,0.015-1.886-0.687-2.587L5.428,0.959 c-1.049-1.05-2.75-1.05-3.799,0L0.917,1.671c-1.049,1.05-1.049,2.751,0,3.801l3.167,3.166c0.7,0.702,1.691,0.922,2.587,0.686 L1.867,4.52c-0.524-0.524-0.524-1.376,0-1.899L2.579,1.907z M5.498,13.553c1.05,1.05,2.75,1.05,3.801,0l0.712-0.713 c1.05-1.05,1.05-2.75,0-3.8L6.843,5.876c-0.701-0.7-1.691-0.922-2.586-0.686l4.802,4.803c0.524,0.525,0.524,1.376,0,1.897 l-0.713,0.715c-0.523,0.522-1.375,0.522-1.898,0L1.646,7.802c-0.237,0.895-0.014,1.886,0.686,2.586L5.498,13.553z"/> </g> </svg></div><span class="dzstooltip transition-slidein arrow-bottom align-right skin-black " style="width: 350px; "><span style="max-height: 150px; overflow:hidden; display: block;">' +
                    a.embed_code + "</span></span></div>") : "on" == a.enable_embed_button && K.appendOnce('<div class="btn-embed-code-con dzstooltip-con "><div class="btn-embed-code"><svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15 15" xml:space="preserve"> <g id="Layer_1"> <polygon fill="#E6E7E8" points="1.221,7.067 0.494,5.422 4.963,1.12 5.69,2.767 "/> <polygon fill="#E6E7E8" points="0.5,5.358 1.657,4.263 3.944,10.578 2.787,11.676 "/> <polygon fill="#E6E7E8" points="13.588,9.597 14.887,8.34 12.268,2.672 10.969,3.93 "/> <polygon fill="#E6E7E8" points="14.903,8.278 14.22,6.829 9.714,11.837 10.397,13.287 "/> </g> <g id="Layer_2"> <rect x="6.416" y="1.713" transform="matrix(0.9663 0.2575 -0.2575 0.9663 2.1699 -1.6329)" fill="#E6E7E8" width="1.805" height="11.509"/> </g> </svg></div><span class="dzstooltip transition-slidein arrow-bottom align-right skin-black " style="width: 350px; "><span style="max-height: 150px; overflow:hidden; display: block;">' +
                    a.embed_code + "</span></span></div>"), b.find(".btn-embed-code-con").bind("click", function() {
                    var a = c(this).find(".dzstooltip").get(0);
                    if ("undefined" != typeof window.getSelection && "undefined" != typeof document.createRange) {
                        var b = document.createRange();
                        b.selectNodeContents(a);
                        a = window.getSelection();
                        a.removeAllRanges();
                        a.addRange(b)
                    } else "undefined" != typeof document.selection && "undefined" != typeof document.body.createTextRange && (b = document.body.createTextRange(), b.moveToElementText(a), b.select())
                }));
                if ("skin-wave" ==
                    a.design_skin) {
                    if ("on" != a.skinwave_enableSpectrum)
                        if ("canvas" == a.skinwave_wave_mode)
                            if (b.attr("data-pcm")) Xa = !0, v();
                            else {
                                d = [];
                                for (f = 0; 1E3 > f; f++) d[f] = Math.random();
                                d = JSON.stringify(d);
                                b.attr("data-pcm", d);
                                v();
                                "on" == a.pcm_data_try_to_generate && Ka()
                            }
                    else void 0 != b.attr("data-scrubbg") && m.children(".scrub-bg").eq(0).append('<img class="scrub-bg-img" src="' + b.attr("data-scrubbg") + '"/>'), void 0 != b.attr("data-scrubprog") && m.children(".scrub-prog").eq(0).append('<img class="scrub-prog-img" src="' + b.attr("data-scrubprog") +
                        '"/>'), m.find(".scrub-bg-img").eq(0).css({}), m.find(".scrub-prog-img").eq(0).css({
                        width: m.children(".scrub-bg").width()
                    }), "on" == a.skinwave_enableReflect && (m.children(".scrub-bg-reflect").eq(0).append('<img class="scrub-bg-img-reflect" src="' + b.attr("data-scrubbg") + '"/>'), void 0 != b.attr("data-scrubprog") && m.children(".scrub-prog-reflect").eq(0).append('<img class="scrub-prog-img-reflect" src="' + b.attr("data-scrubprog") + '"/>'), m.find(".scrub-bg-img").eq(0).css({
                        "transform-origin": "100% 100%"
                    }), m.find(".scrub-prog-img").eq(0).css({
                        "transform-origin": "100% 100%"
                    }));
                    else m.children(".scrub-bg").eq(0).append('<canvas class="scrub-bg-canvas" style="width: 100%; height: 100%;"></canvas><div class="wave-separator"></div>'), U = b.find(".scrub-bg-canvas").eq(0), qb = U.get(0).getContext("2d"), "audio" == t && (m.children(".scrub-prog").eq(0).append('<canvas class="scrub-prog-canvas" style="width: 100%; height: 100%;"></canvas>'), $a = b.find(".scrub-prog-canvas").eq(0), ab = $a.get(0).getContext("2d")), "on" == a.skinwave_enableReflect && (m.children(".scrub-bg-reflect").eq(0).append('<canvas class="scrub-bg-canvas-reflect" style="width: 100%; height: 100%;"></canvas>'),
                        Ab = m.find(".scrub-bg-canvas-reflect").eq(0), Sb = Ab.get(0).getContext("2d"), "audio" == t && (m.children(".scrub-prog-reflect").eq(0).append('<canvas class="scrub-prog-canvas-reflect" style="width: 100%; height: 100%;"></canvas>'), bb = m.find(".scrub-prog-canvas-reflect").eq(0), Tb = bb.get(0).getContext("2d")));
                    "on" == a.skinwave_timer_static && (L && L.addClass("static"), O && O.addClass("static"));
                    ha.css({});
                    "canvas" == a.skinwave_wave_mode ? setTimeout(function() {
                        b.addClass("scrubbar-loaded")
                    }, 700) : (d = new Image, d.onload =
                        function(a) {
                            b.addClass("scrubbar-loaded");
                            sa()
                        }, d.src = b.attr("data-scrubbg"), setTimeout(function() {
                            b.addClass("scrubbar-loaded")
                        }, 2500))
                }
                b.hasClass("skin-minimal") && (z.children(".playbtn").append('<canvas width="100" height="100" class="playbtn-canvas"/>'), Bb = z.find(".playbtn-canvas").eq(0).get(0), z.children(".pausebtn").append('<canvas width="100" height="100" class="pausebtn-canvas"/>'), Cb = z.find(".pausebtn-canvas").eq(0).get(0));
                b.hasClass("skin-minion") && 0 < b.find(".menu-description").length &&
                    (z.addClass("with-tooltip"), z.prepend('<span class="dzstooltip" style="left:-7px;">' + b.find(".menu-description").html() + "</span>"), z.children("span").eq(0).css("width", z.children("span").eq(0).textWidth() + 10));
                a.parentgallery && "undefined" != typeof a.parentgallery && "on" != a.disable_player_navigation && (d = '<div class="prev-btn"><div class="the-icon-bg"></div><svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 12.5 12.817" enable-background="new 0 0 12.5 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M2.581,7.375c-0.744-0.462-1.413-0.94-1.486-1.061C1.021,6.194,1.867,5.586,2.632,5.158l2.35-1.313 c0.765-0.427,1.505-0.782,1.646-0.789s0.257,1.03,0.257,1.905V7.87c0,0.876-0.051,1.692-0.112,1.817 C6.711,9.81,5.776,9.361,5.032,8.898L2.581,7.375z"/> </g> </g> </g> <g> <g> <g> <path fill="#D2D6DB" d="M6.307,7.57C5.413,7.014,4.61,6.441,4.521,6.295C4.432,6.15,5.447,5.42,6.366,4.906l2.82-1.577 c0.919-0.513,1.809-0.939,1.979-0.947s0.309,1.236,0.309,2.288v3.493c0,1.053-0.061,2.033-0.135,2.182S10.144,9.955,9.25,9.4 L6.307,7.57z"/> </g> </g> </g> </svg> </div>',
                    f = '<div class="next-btn"><div class="the-icon-bg"></div><svg class="svg-icon" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 12.5 12.817" enable-background="new 0 0 12.5 12.817" xml:space="preserve"> <g> <g> <g> <path fill="#D2D6DB" d="M9.874,5.443c0.744,0.462,1.414,0.939,1.486,1.06c0.074,0.121-0.771,0.729-1.535,1.156L7.482,8.967 C6.719,9.394,5.978,9.75,5.837,9.756C5.696,9.761,5.581,8.726,5.581,7.851V4.952c0-0.875,0.05-1.693,0.112-1.816 c0.062-0.124,0.995,0.326,1.739,0.788L9.874,5.443z"/> </g> </g> </g> <g> <g> <g> <path fill="#D2D6DB" d="M6.155,5.248c0.893,0.556,1.696,1.129,1.786,1.274c0.088,0.145-0.928,0.875-1.847,1.389l-2.811,1.57 c-0.918,0.514-1.808,0.939-1.978,0.947c-0.169,0.008-0.308-1.234-0.308-2.287V4.66c0-1.052,0.061-2.034,0.135-2.182 s1.195,0.391,2.089,0.947L6.155,5.248z"/> </g> </g> </g> </svg>  </div>',
                    "skin-steel" == a.design_skin && (d = '<div class="prev-btn"><svg class="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="3.208,7.674 5.208,9.104 5.208,5.062 3.208,5.652 "/> </g> <g id="Layer_1"> <rect x="0.306" y="3.074" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.4203 4.7299)" fill="#E6E7E8" width="9.386" height="2.012"/> <rect x="0.307" y="8.29" transform="matrix(0.7072 0.707 -0.707 0.7072 8.0362 -0.8139)" fill="#E6E7E8" width="9.387" height="2.012"/> </g> </svg> <svg class="svg2"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="3.208,7.674 5.208,9.104 5.208,5.062 3.208,5.652 "/> </g> <g id="Layer_1"> <rect x="0.306" y="3.074" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.4203 4.7299)" fill="#E6E7E8" width="9.386" height="2.012"/> <rect x="0.307" y="8.29" transform="matrix(0.7072 0.707 -0.707 0.7072 8.0362 -0.8139)" fill="#E6E7E8" width="9.387" height="2.012"/> </g> </svg></div>',
                        f = '<div class="next-btn"><svg class="svg1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="7.035,5.695 5.074,4.292 5.074,8.257 7.035,7.678 "/> </g> <g id="Layer_1"> <rect x="0.677" y="8.234" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 15.532 12.0075)" fill="#E6E7E8" width="9.204" height="1.973"/> <rect x="0.674" y="3.118" transform="matrix(-0.7072 -0.707 0.707 -0.7072 6.1069 10.7384)" fill="#E6E7E8" width="9.206" height="1.974"/> </g> </svg><svg class="svg2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="13.325px" viewBox="0 0 10 13.325" enable-background="new 0 0 10 13.325" xml:space="preserve"> <g id="Layer_2"> <polygon opacity="0.5" fill="#E6E7E8" points="7.035,5.695 5.074,4.292 5.074,8.257 7.035,7.678 "/> </g> <g id="Layer_1"> <rect x="0.677" y="8.234" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 15.532 12.0075)" fill="#E6E7E8" width="9.204" height="1.973"/> <rect x="0.674" y="3.118" transform="matrix(-0.7072 -0.707 0.707 -0.7072 6.1069 10.7384)" fill="#E6E7E8" width="9.206" height="1.974"/> </g> </svg></div>'),
                    h = d + f, 0 == a.parentgallery.hasClass("mode-showall") && ("skin-wave" == a.design_skin && "small" == a.skinwave_mode ? P.appendOnce(h, ".prev-btn") : "skin-wave" == a.design_skin ? z.after(h) : "skin-steel" == a.design_skin ? (P.prependOnce(d, ".prev-btn"), 0 < P.children(".the-thumb-con").length ? 0 < P.children(".the-thumb-con").eq(0).length && 0 == P.children(".the-thumb-con").eq(0).prev().hasClass("next-btn") && P.children(".the-thumb-con").eq(0).before(f) : P.appendOnce(f, ".next-btn")) : K.appendOnce(h, ".prev-btn")));
                0 < b.children(".afterplayer").length &&
                    b.append(b.children(".afterplayer"));
                "" != a.settings_extrahtml && (-1 < String(a.settings_extrahtml).indexOf("{{get_likes}}") && 0 == is_ie8() && (V++, Db()), -1 < String(a.settings_extrahtml).indexOf("{{get_plays}}") && 0 == is_ie8() ? (V++, za()) : (console.info("increment_views", ma), 1 === ma && (ja(), ma = 2)), -1 < String(a.settings_extrahtml).indexOf("{{get_rates}}") && (V++, fa()), a.settings_extrahtml = String(a.settings_extrahtml).replace("{{heart_svg}}", pc), a.settings_extrahtml = String(a.settings_extrahtml).replace("{{embed_code}}",
                    a.embed_code), 0 == V && b.find(".extra-html").addClass("active"), setTimeout(function() {
                    b.find(".extra-html").addClass("active")
                }, 2E3));
                b.addClass("structure-setuped")
            }

            function v(a) {
                var b = {
                    prepare_for_transition_in: !1
                };
                a && (b = c.extend(b, a));
                a = '<canvas class="scrub-bg-img';
                b.prepare_for_transition_in && (a += " transitioning-in");
                a += '" ></canvas>';
                m.children(".scrub-bg").eq(0).append(a);
                a = ".scrub-bg-img";
                b.prepare_for_transition_in && (a += ".transitioning-in");
                Ja = m.find(a).eq(0);
                a = '<canvas class="scrub-prog-img';
                b.prepare_for_transition_in && (a += " transitioning-in");
                a += '" ></canvas>';
                m.children(".scrub-prog").eq(0).append(a);
                a = ".scrub-prog-img";
                b.prepare_for_transition_in && (a += ".transitioning-in");
                Va = m.find(a).eq(0)
            }

            function qa(b, f, h) {
                var g = c(b),
                    k = g.get(0).getContext("2d"),
                    e = [];
                Va.width(m.width());
                Va.attr("width", m.width());
                if (!f) return setTimeout(function() {}, 1E3), !1;
                try {
                    e = JSON.parse(f)
                } catch (l) {
                    console.error("parse error - ", f, "" != f)
                }
                var q = 1,
                    p = f = 0;
                for (f = q = 0; f < e.length; f++) e[f] > p && (p = e[f]);
                q = 1 / p;
                for (f = 0; f <
                    e.length; f++) e[f] *= q;
                g.width();
                g.height();
                f = b.width;
                g = b.height;
                b.width = m.width();
                f = b.width;
                g = b.height;
                b = parseInt(a.skinwave_wave_mode_canvas_waves_number);
                q = parseFloat(a.skinwave_wave_mode_canvas_waves_padding);
                1 == b && (b = f / b);
                2 == b && (b = f / 2);
                3 == b && (b = f / 3);
                p = parseFloat(a.skinwave_wave_mode_canvas_reflection_size);
                1 > f / b && (b = Math.ceil(b / 3));
                var u = Math.ceil(f / b),
                    r = 1 - p;
                0 == u && (u = 1, q = 0);
                1 == u && (q /= 2);
                var aa = 0;
                f = h.replace("#", "");
                var t = []; - 1 < f.indexOf(",") && (t = f.split(","));
                for (f = 0; f < b; f++) {
                    var J = Math.ceil(e.length /
                        b * f);
                    f < b / 5 && .1 > e[J] && (e[J] = .1);
                    J = Math.abs(e[J] * g * r);
                    aa = J = J / 1.5 + aa / 2.5;
                    k.lineWidth = 0;
                    k.beginPath();
                    k.rect(f * u, g * r - J, u - q, J);
                    k.fillStyle = h;
                    t.length && (J = k.createLinearGradient(0, 0, 0, g), J.addColorStop(0, "#" + t[0]), J.addColorStop(1, "#" + t[1]), k.fillStyle = J);
                    k.fill()
                }
                if (0 < p)
                    for (f = 0; f < b; f++) J = Math.ceil(e.length / b * f), aa = Math.abs(e[J] * g * p), k.beginPath(), k.rect(f * u, g * r, u - q, aa), k.fillStyle = n(h, .25), t.length && (J = k.createLinearGradient(0, 0, 0, g), aa = n("#" + t[1], .25), J.addColorStop(0, aa), aa = n("#" + t[0], .25), J.addColorStop(1,
                        aa), k.fillStyle = J), k.fill();
                setTimeout(function() {
                    ob()
                }, 100)
            }

            function Db(d) {
                d = {
                    action: "dzsap_get_likes",
                    postdata: d,
                    playerid: F
                };
                a.settings_php_handler && c.ajax({
                    type: "POST",
                    url: a.settings_php_handler,
                    data: d,
                    success: function(a) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + a);
                        var d = !1; - 1 < a.indexOf("likesubmitted") && (a = a.replace("likesubmitted", ""), d = !0);
                        "" == a && (a = 0);
                        var c = b.find(".extra-html").eq(0).html(),
                            c = c.replace("{{get_likes}}", a);
                        b.find(".extra-html").eq(0).html(c);
                        V--;
                        d && b.find(".extra-html").find(".btn-like").addClass("active");
                        0 == V && b.find(".extra-html").addClass("active")
                    },
                    error: function(a) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + a, a);
                        V--;
                        0 == V && b.find(".extra-html").addClass("active")
                    }
                })
            }

            function fa(d) {
                d = {
                    action: "dzsap_get_rate",
                    postdata: d,
                    playerid: F
                };
                a.settings_php_handler && c.ajax({
                    type: "POST",
                    url: a.settings_php_handler,
                    data: d,
                    success: function(d) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " +
                            d); - 1 < d.indexOf("likesubmitted") && (d = d.replace("likesubmitted", ""));
                        "" == d && (d = "0|0");
                        d = d.split("|");
                        ec = d[1];
                        b.find(".extra-html .counter-rates .the-number").eq(0).html(ec);
                        V--;
                        b.find(".star-rating-set-clip").width(d[0] * (parseInt(b.find(".star-rating-bg").width(), 10) / 5));
                        "undefined" != typeof d[2] && (Fa = d[2], a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_player_rateSubmitted && c(a.parentgallery).get(0).api_player_rateSubmitted());
                        0 >= V && b.find(".extra-html").addClass("active")
                    },
                    error: function(a) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + a, a);
                        V--;
                        0 >= V && b.find(".extra-html").addClass("active")
                    }
                })
            }

            function za(d) {
                d = {
                    action: "dzsap_get_views",
                    postdata: d,
                    playerid: F
                };
                a.settings_php_handler && c.ajax({
                    type: "POST",
                    url: a.settings_php_handler,
                    data: d,
                    success: function(a) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + a); - 1 < a.indexOf("viewsubmitted") && (a = a.replace("viewsubmitted", ""), W = "on", ma = 0);
                        "" == a && (a = 0);
                        if (-1 < String(a).indexOf("{{theip")) {
                            var d =
                                /{\{theip-(.*?)}}/g.exec(a);
                            d[1] && (fc = d[1]);
                            a = a.replace(/{\{theip-(.*?)}}/g, "")
                        }
                        console.info("increment_views", ma);
                        1 == ma && (ja(), a = Number(a) + ma, ma = 2);
                        d = b.find(".extra-html").eq(0).html();
                        d = d.replace("{{get_plays}}", a);
                        b.find(".extra-html").eq(0).html(d);
                        V--;
                        0 == V && b.find(".extra-html").addClass("active")
                    },
                    error: function(a) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + a, a);
                        V--;
                        0 == V && b.find(".extra-html").addClass("active")
                    }
                })
            }

            function na(d) {
                d = {
                    action: "dzsap_submit_rate",
                    postdata: d,
                    playerid: F
                }; - 1 < Fa || a.settings_php_handler && c.ajax({
                    type: "POST",
                    url: a.settings_php_handler,
                    data: d,
                    success: function(d) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + d);
                        var h = b.find(".star-rating-set-clip").outerWidth() / b.find(".star-rating-bg").outerWidth();
                        d = parseInt(b.find(".counter-rates .the-number").html(), 10);
                        d++;
                        h = (5 * (d - 1) * h + Ga) / d;
                        b.find(".star-rating-set-clip").width(h * (parseInt(b.find(".star-rating-bg").width(), 10) / 5));
                        b.find(".counter-rates .the-number").html(d);
                        a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_player_rateSubmitted && c(a.parentgallery).get(0).api_player_rateSubmitted()
                    },
                    error: function(d) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + d, d);
                        var h = b.find(".star-rating-set-clip").outerWidth() / b.find(".star-rating-bg").outerWidth();
                        d = parseInt(b.find(".counter-rates .the-number").html(), 10);
                        d++;
                        h = (5 * (d - 1) * h + Ga) / d;
                        b.find(".star-rating-set-clip").width(h * (parseInt(b.find(".star-rating-bg").width(),
                            10) / 5));
                        b.find(".counter-rates .the-number").html(d);
                        a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_player_rateSubmitted && c(a.parentgallery).get(0).api_player_rateSubmitted()
                    }
                })
            }

            function oa(b) {
                b = {
                    action: "dzsap_submit_download",
                    postdata: b,
                    playerid: F
                }; - 1 < Fa || a.settings_php_handler && c.ajax({
                    type: "POST",
                    url: a.settings_php_handler,
                    data: b,
                    success: function(a) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + a)
                    },
                    error: function(a) {
                        "undefined" !=
                        typeof window.console && console.log("Got this from the server: " + a, a)
                    }
                })
            }

            function ja(d) {
                d = {
                    action: "dzsap_submit_views",
                    postdata: 1,
                    playerid: F,
                    currip: fc
                };
                b.attr("data-playerid-for-views") && (d.playerid = b.attr("data-playerid-for-views"));
                a.settings_php_handler && (c.ajax({
                    type: "POST",
                    url: a.settings_php_handler,
                    data: d,
                    success: function(a) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + a);
                        a = b.find(".counter-hits .the-number").html();
                        a = parseInt(a, 10);
                        2 != ma && a++;
                        b.find(".counter-hits .the-number").html(a);
                        W = "on"
                    },
                    error: function(a) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + a, a);
                        a = b.find(".counter-hits .the-number").html();
                        a = parseInt(a, 10);
                        a++;
                        b.find(".counter-hits .the-number").html(a);
                        W = "on"
                    }
                }), W = "on")
            }

            function rb(d) {
                d = {
                    action: "dzsap_submit_like",
                    postdata: d,
                    playerid: F
                };
                (a.settings_php_handler || b.hasClass("is-preview")) && c.ajax({
                    type: "POST",
                    url: a.settings_php_handler,
                    data: d,
                    success: function(a) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " +
                            a);
                        b.find(".btn-like").addClass("active");
                        a = b.find(".counter-likes .the-number").html();
                        a = parseInt(a, 10);
                        a++;
                        b.find(".counter-likes .the-number").html(a)
                    },
                    error: function(a) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + a, a);
                        b.find(".btn-like").addClass("active");
                        a = b.find(".counter-likes .the-number").html();
                        a = parseInt(a, 10);
                        a++;
                        b.find(".counter-likes .the-number").html(a)
                    }
                })
            }

            function B(d) {
                d = {
                    action: "dzsap_retract_like",
                    postdata: d,
                    playerid: F
                };
                a.settings_php_handler &&
                    c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: d,
                        success: function(a) {
                            "undefined" != typeof window.console && console.log("Got this from the server: " + a);
                            b.find(".btn-like").removeClass("active");
                            a = b.find(".counter-likes .the-number").html();
                            a = parseInt(a, 10);
                            a--;
                            b.find(".counter-likes .the-number").html(a)
                        },
                        error: function(a) {
                            "undefined" != typeof window.console && console.log("Got this from the server: " + a, a);
                            b.find(".btn-like").removeClass("active");
                            a = b.find(".counter-likes .the-number").html();
                            a = parseInt(a,
                                10);
                            a--;
                            b.find(".counter-likes .the-number").html(a)
                        }
                    })
            }

            function S(d) {
                var f = {
                    action: "dzsap_front_submitcomment",
                    postdata: d,
                    playerid: F,
                    comm_position: nb,
                    skinwave_comments_process_in_php: a.skinwave_comments_process_in_php,
                    skinwave_comments_avatar: a.skinwave_comments_avatar,
                    skinwave_comments_account: a.skinwave_comments_account
                };
                0 < b.find("*[name=comment-email]").length && (f.email = b.find("*[name=comment-email]").eq(0).val());
                a.settings_php_handler && c.ajax({
                    type: "POST",
                    url: a.settings_php_handler,
                    data: f,
                    success: function(d) {
                        "0" ==
                        d.charAt(d.length - 1) && (d = d.slice(0, d.length - 1));
                        "undefined" != typeof window.console && console.log("Got this from the server: " + d);
                        d = "";
                        "on" != a.skinwave_comments_process_in_php ? d = f.postdata : (d = "" + ('<span class="dzstooltip-con" style="left:' + nb + '"><span class="dzstooltip arrow-from-start transition-slidein arrow-bottom skin-black" style="width: 250px;"><span class="the-comment-author">@' + a.skinwave_comments_account + "</span> says:<br>"), d += htmlEncode(f.postdata), d += '</span><div class="the-avatar" style="background-image: url(' +
                            a.skinwave_comments_avatar + ')"></div></span>');
                        console.info(d);
                        E.children().each(function() {
                            var a = c(this);
                            0 == a.hasClass("dzstooltip-con") && a.addClass("dzstooltip-con")
                        });
                        Ub && Ub(b, d)
                    },
                    error: function(a) {
                        "undefined" != typeof window.console && console.log("Got this from the server: " + a, a);
                        E.append(f.postdata)
                    }
                })
            }

            function Q(d) {
                var f = {
                    do_not_autoplay: !1
                };
                d && (f = c.extend(f, d));
                "off" == a.cue && "auto" == W && (ma = 1, W = -1 < String(a.settings_extrahtml).indexOf("{{get_plays}}") ? "on" : "off");
                if (1 != ib)
                    if ("youtube" == t) is_ie() &&
                        ea.css({
                            left: "-478em"
                        });
                    else {
                        d = "<audio" + (' preload="' + a.preload_method + '"');
                        is_ios() || is_android();
                        d += ">";
                        void 0 != b.attr("data-source") && (sb = b.attr("data-source"), d += '<source src="' + sb + '" type="audio/mpeg">', void 0 != b.attr("data-sourceogg") && (d += '<source src="' + b.attr("data-sourceogg") + '" type="audio/ogg">'));
                        d += "</audio>";
                        is_ie8() && dzsap_list && 0 < dzsap_list.length && (cb = "&isie8=on");
                        if (R)
                            if ("light" == a.settings_backup_type) d = '<object type="application/x-shockwave-flash" data="' + a.swf_location + '" width="100" height="50" id="flashcontent_' +
                                T + '" allowscriptaccess="always" style="visibility: visible; "><param name="movie" value="ap.swf"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="media=' + b.attr("data-source") + "&fvid=" + T + cb + '"><embed src="' + a.swf_location + '" width="100" height="100" allowScriptAccess="always"></object>', b.addClass("lightflashbackup");
                            else {
                                var h =
                                    d = "",
                                    m = "";
                                a.parentgallery && "undefined" != typeof a.parentgallery && "on" != a.disable_player_navigation && (h = "&design_skip_buttons=on");
                                a.parentgallery && "undefined" != typeof a.parentgallery && "on" != a.design_menu_show_player_state_button && (m = "&design_menu_show_player_state_button=on");
                                "on" == a.disable_volume && (d += "&settings_enablevolume=off");
                                d = '<object class="the-full-flash-backup" type="application/x-shockwave-flash" data="' + a.swffull_location + '" width="100%" height="100%" style="height:50px" id="flashcontent_' +
                                    T + '" allowscriptaccess="always" style="visibility: visible; "><param name="movie" value="' + a.swffull_location + '"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="transparent"><param name="flashvars" value="media=' + b.attr("data-source") + "&fvid=" + T + cb + d + "&autoplay=" + a.autoplay + "&skinwave_mode" + a.skinwave_mode + h + m;
                                b.addClass("fullflashbackup");
                                "undefined" != typeof b.attr("data-scrubbg") &&
                                    (d += "&scrubbg=" + b.attr("data-scrubbg"));
                                "undefined" != typeof b.attr("data-scrubprog") && (d += "&scrubprog=" + b.attr("data-scrubprog"));
                                "undefined" != typeof b.attr("data-thumb") && "" != b.attr("data-thumb") && (d += "&thumb=" + b.attr("data-thumb"));
                                d += "&settings_enablespectrum=" + a.skinwave_enableSpectrum;
                                d += "&skinwave_enablereflect=" + a.skinwave_enableReflect;
                                d += "&skin=" + a.design_skin;
                                d += "&settings_multiplier=" + a.skinwave_spectrummultiplier;
                                d += '">You need Flash Player.</object>';
                                K.find(".the-thumb-con,.ap-controls,.the-media").remove();
                                K.prepend(d);
                                "skin-wave" == a.design_skin && K.find(".the-full-flash-backup").css("height", 200);
                                "undefined" != typeof b.attr("data-thumb") && "" != b.attr("data-thumb") && K.find(".the-full-flash-backup").css("height", 200);
                                d = ""
                            } gc = d;
                        ea.append(d);
                        (q = ea.children("audio").get(0)) && q.addEventListener && "fake" != b.attr("data-source") && (q.addEventListener("error", function(a) {
                            audioFailover();
                            console.info("errored out", this, this.audioElement, this.duration, a);
                            this.networkState === HTMLMediaElement.NETWORK_NO_SOURCE && (console.warn("could not load audio source - ",
                                b.attr("data-source")), b.addClass("errored-out"), b.append('<div class="feedback-text">error - file does not exist.. </div>'), setTimeout(function() {
                                console.info(q, q.src, b.attr("data-source"));
                                q.src = "";
                                setTimeout(function() {
                                    q.src = b.attr("data-source");
                                    q.load()
                                }, 1E3)
                            }, 1E3))
                        }, !0), q.addEventListener("loadedmetadata", function(a) {
                            b.addClass("meta-loaded")
                        }, !0));
                        R && "light" == a.settings_backup_type && setTimeout(function() {
                            q = ea.find("object").eq(0).get(0)
                        }, 500);
                        is_ios() || is_ie8() || 1 == R ? "full" == a.settings_backup_type ?
                            ua(f) : setTimeout(function() {
                                ua(f)
                            }, 1E3) : tb = setInterval(function() {
                                var d = {
                                    do_not_autoplay: !1
                                };
                                f && (d = c.extend(d, f));
                                "youtube" != t && "undefined" != typeof q && ("AUDIO" != q.nodeName || "shoutcast" == a.type ? ua(d) : is_safari() ? 1 <= q.readyState && (ua(d), clearInterval(tb), a.action_audio_loaded_metadata && a.action_audio_loaded_metadata(b)) : 2 <= q.readyState && (ua(d), clearInterval(tb), a.action_audio_loaded_metadata && a.action_audio_loaded_metadata(b)))
                            }, 50);
                        "none" == a.preload_method && setTimeout(function() {
                            q && c(q).attr("preload",
                                "metadata")
                        }, 12E3 * Number(window.dzsap_player_index));
                        z.off("click");
                        z.on("click", hc);
                        "skin-customcontrols" == a.design_skin && (b.find(".custom-play-btn,.custom-pause-btn").off("click"), b.find(".custom-play-btn,.custom-pause-btn").on("click", hc));
                        a.failsafe_repair_media_element && (setTimeout(function() {
                            if (ea.children().eq(0).get(0) && "AUDIO" == ea.children().eq(0).get(0).nodeName) return !1;
                            ea.html("");
                            ea.append(gc);
                            var b = pa;
                            Oa();
                            q = ea.children("audio").get(0);
                            R && "light" == a.settings_backup_type && setTimeout(function() {
                                q =
                                    ea.find("object").eq(0).get(0)
                            }, 10);
                            b && (b = !1, setTimeout(function() {
                                ia()
                            }, 20))
                        }, a.failsafe_repair_media_element), a.failsafe_repair_media_element = "");
                        b.addClass("media-setuped")
                    }
            }

            function X() {
                Oa();
                q && "audio" == a.type && (q.innerHTML = "", q.load());
                ea && (ea.children().remove(), ib = !1)
            }

            function ub() {
                console.info("setup_listeners()");
                m.bind("mousemove", Vb);
                m.bind("mouseleave", Vb);
                m.bind("click", Vb);
                w.find(".volumeicon").bind("click", qc);
                "skin-redlights" == a.design_skin ? (w.bind("mousemove", db), w.bind("mousedown",
                    db), c(document).undelegate(window, "mouseup", db), c(document).delegate(window, "mouseup", db)) : (w.find(".volume_active").bind("click", db), w.find(".volume_static").bind("click", db));
                b.find(".playbtn").unbind("click");
                setTimeout(sa, 300);
                setTimeout(sa, 2E3);
                0 < a.settings_trigger_resize && setInterval(sa, a.settings_trigger_resize);
                b.addClass("listeners-setuped");
                return !1
            }

            function Eb() {
                console.info("click_like()");
                var a = c(this);
                0 != b.has(a).length && (a.hasClass("active") ? B() : rb())
            }

            function Ha() {
                return kb
            }

            function ua(d) {
                b.attr("id");
                if (!b.hasClass("dzsap-loaded")) {
                    var f = {
                        do_not_autoplay: !1
                    };
                    d && (f = c.extend(f, d));
                    0 != R && "light" == a.settings_backup_type && "undefined" != typeof q && q.fn_getSoundDuration && eval("totalDuration = parseFloat(_cmedia.fn_getsoundduration" + T + "())");
                    "undefined" != typeof q && "AUDIO" == q.nodeName && q.addEventListener("ended", ic);
                    clearInterval(tb);
                    clearTimeout(tb);
                    ub();
                    is_ie8() && b.addClass("lte-ie8");
                    setTimeout(function() {
                        L && 0 < L.outerWidth() && (Wb = L.outerWidth())
                    }, 1E3);
                    is_ie8() && !Array.prototype.indexOf && (Array.prototype.indexOf =
                        function(a, b) {
                            var d = this.length >>> 0,
                                c = Number(b) || 0,
                                c = 0 > c ? Math.ceil(c) : Math.floor(c);
                            for (0 > c && (c += d); c < d; c++)
                                if (c in this && this[c] === a) return c;
                            return -1
                        });
                    "fake" != t && ("on" != a.settings_exclude_from_list && dzsap_list && -1 == dzsap_list.indexOf(b) && null == a.fakeplayer && dzsap_list.push(b), "on" == a.type_audio_stop_buffer_on_unfocus && (b.data("type_audio_stop_buffer_on_unfocus", "on"), b.get(0).api_destroy_for_rebuffer = function() {
                        "audio" == a.type && (ba = q.currentTime);
                        X();
                        Xb = !0
                    }));
                    if ("skin-wave" == a.design_skin && "on" ==
                        a.skinwave_enableSpectrum && (console.info("USED AUDIO CONTEXT"), null == window.dzsap_audio_ctx ? "undefined" !== typeof AudioContext ? (H = new AudioContext, window.dzsap_audio_ctx = H) : "undefined" !== typeof webkitAudioContext ? (H = new webkitAudioContext, window.dzsap_audio_ctx = H) : H = null : H = window.dzsap_audio_ctx, H)) {
                        var h = function() {
                            console.info("generateFakeArray()");
                            for (var a = [], b = 0; 256 > b; b++) a[b] = (256 - b) / 2 + 100 * Math.random();
                            return a
                        };
                        "undefined" != typeof H.createJavaScriptNode && (Qa = H.createJavaScriptNode(2048, 1,
                            1));
                        "undefined" != typeof H.createScriptProcessor && (Qa = H.createScriptProcessor(4096, 1, 1));
                        if (is_android()) ca = H.createAnalyser(), ca.smoothingTimeConstant = .3, ca.fftSize = 512, Qa.onaudioprocess = function(a) {
                            a = new Uint8Array(ca.frequencyBinCount);
                            ca.getByteFrequencyData(a);
                            eb = a;
                            pa && (eb = h())
                        }, va = H.createMediaElementSource(q), va.connect(ca), ca.connect(H.destination), Qa.connect(H.destination);
                        else if (Qa) {
                            ca = H.createAnalyser();
                            ca.smoothingTimeConstant = .3;
                            ca.fftSize = 512;
                            Qa.onaudioprocess = function() {
                                if (!m) {
                                    var a =
                                        new Uint8Array(ca.frequencyBinCount);
                                    ca.getByteFrequencyData(a);
                                    eb = a;
                                    pa && is_ios() && (eb = h())
                                }
                            };
                            "audio" == t && (is_chrome() || is_firefox() || is_safari() || is_ios()) && (va = H.createMediaElementSource(q), va.connect(ca), ca.connect(H.destination), Qa.connect(H.destination));
                            var m = !1;
                            setTimeout(function() {}, 3E3)
                        }
                    }
                    "auto" == W && setTimeout(function() {
                        "auto" == W && (W = "off")
                    }, 1E3);
                    ib = !0;
                    b.addClass("dzsap-loaded");
                    0 == isNaN(Number(a.default_volume)) ? (a.default_volume = Number(a.default_volume), Fb = a.default_volume) : "last" == a.default_volume &&
                        (Fb = null != localStorage && F ? localStorage.getItem("dzsap_last_volume_" + F) ? localStorage.getItem("dzsap_last_volume_" + F) : 1 : 1);
                    a.volume_from_gallery && (Fb = a.volume_from_gallery);
                    Da(Fb, {
                        call_from: "from_init_loaded"
                    });
                    "number" == typeof ba && 0 == Math.round(ba) % 1 && Aa(ba);
                    "last" == ba && "undefined" != typeof Storage && (setTimeout(function() {
                        Yb = !0
                    }), "undefined" != typeof localStorage["dzsap_" + F + "_lastpos"] && Aa(localStorage["dzsap_" + F + "_lastpos"], {
                        call_from: "last_pos"
                    }));
                    1 != f.do_not_autoplay && 0 == is_ie8() && "on" == a.autoplay &&
                        ia();
                    q && q.duration && b.addClass("meta-loaded");
                    Gb();
                    setTimeout(function() {
                        b.find(".wave-download").bind("click", Ra)
                    }, 500)
                }
            }

            function Sa(a) {
                return "undefined" != typeof a && "" != a
            }

            function Ra(a) {
                var f = c(this);
                "click" == a.type && (f.hasClass("wave-download") && oa(), f.hasClass("prev-btn") && J(), f.hasClass("next-btn") && J(), f.hasClass("dzsap-repeat-button") && Aa(0, {
                    call_from: "repeat"
                }), f.hasClass("dzsap-loop-button") && (f.hasClass("active") ? (f.removeClass("active"), Hb = !1) : (f.addClass("active"), Hb = !0), console.info("loop_active - ",
                    Hb, b)))
            }

            function Ta(a) {
                var f = c(this);
                if (0 != b.has(f).length) {
                    if ("mouseout" == a.type || "mouseleave" == a.type) b.find(".star-rating-prog-clip").css({
                        width: 0
                    }), b.find(".star-rating-set-clip").css({
                        opacity: 1
                    });
                    if ("mousemove" == a.type) {
                        var h = a.pageX - f.offset().left;
                        f.offset();
                        Ga = -1 < Fa ? Fa : h / (f.outerWidth() / 5);
                        Ga = 4 < Ga ? 5 : Math.round(Ga);
                        b.find(".star-rating-prog-clip").css({
                            width: f.outerWidth() / 5 * Ga
                        });
                        b.find(".star-rating-set-clip").css({
                            opacity: 0
                        })
                    }
                    "click" != a.type || -1 < Fa || na(Ga)
                }
            }

            function Ib(b) {
                U.get(0).width =
                    U.width();
                U.get(0).height = U.height();
                $a && ($a.get(0).width = U.width(), $a.get(0).height = U.height());
                "on" == a.skinwave_enableReflect && (Ab.get(0).width = U.width(), Ab.get(0).height = U.height(), bb && (bb.get(0).width = U.width(), bb.get(0).height = U.height()));
                qb.createLinearGradient(0, 0, wa, ka);
                qb.clearRect(0, 0, wa, ka);
                qb.fillStyle = "#" + a.skinwave_spectrum_wavesbg;
                ab && (ab.clearRect(0, 0, wa, ka), ab.fillStyle = "#" + a.skinwave_spectrum_wavesprog);
                for (var c = 0; c < b.length; c++) {
                    var h = b[c];
                    qb.fillRect(c / 256 * wa, ka - h / 256 * ka, wa /
                        b.length, ka);
                    ab && ab.fillRect(c / 256 * wa, ka - h / 256 * ka, wa / b.length, ka)
                }
                "on" == a.skinwave_enableReflect && (Sb.clearRect(0, 0, wa, ka), Sb.drawImage(U.get(0), 0, 0), bb && (Tb.clearRect(0, 0, wa, ka), Tb.drawImage($a.get(0), 0, 0)))
            }

            function J() {
                a.parentgallery && "undefined" != typeof a.parentgallery.get(0) && a.parentgallery.get(0).api_goto_prev()
            }

            function Gb(d) {
                var f = {
                    fire_only_once: !1
                };
                d && (f = c.extend(f, d));
                b.attr("id");
                if (mb) return !1;
                Zb && (Zb = !1);
                if (dc) return !1;
                "youtube" == t && (q && q.getDuration && (fb = q.getDuration(), Ua = q.getCurrentTime()),
                    "last" == ba && Yb && "undefined" != typeof Storage && (localStorage["dzsap_" + F + "_lastpos"] = da));
                if ("audio" == t)
                    if (1 == R) "light" == a.settings_backup_type && "" == cb && "undefined" != typeof q && (eval("if(typeof _cmedia.fn_getsoundduration" + T + " != 'undefined'){time_total = parseFloat(_cmedia.fn_getsoundduration" + T + "())};"), eval("if(typeof _cmedia.fn_getsoundcurrtime" + T + " != 'undefined'){time_curr = parseFloat(_cmedia.fn_getsoundcurrtime" + T + "())};"));
                    else if ("shoutcast" != a.type && (q && (fb = q.duration, 0 == $b && (Ua = q.currentTime)),
                        H && is_firefox(), "last" == ba && Yb && "undefined" != typeof Storage && (localStorage["dzsap_" + F + "_lastpos"] = da), "skin-wave" == a.design_skin && "on" == a.skinwave_comments_displayontime)) {
                    var h = Math.round(Ua / fb * 100) / 100;
                    E && E.children().each(function() {
                        var a = c(this);
                        if (a.hasClass("dzstooltip-con")) {
                            var b = Math.round(parseFloat(a.css("left")) / E.outerWidth() * 100) / 100;
                            b && (.02 > Math.abs(b - h) ? (E.find(".dzstooltip").removeClass("active"), a.find(".dzstooltip").addClass("active")) : a.find(".dzstooltip").removeClass("active"))
                        }
                    })
                }
                0 !=
                    b.hasClass("first-played") || b.attr("data-playfrom") && "0" != b.attr("data-playfrom") || (Ua = 0, c(q) && c(q).html() && -1 < c(q).html().indexOf("api.soundcloud.com") && 0 != q.currentTime && Aa(0, {
                        call_from: "first_played_false"
                    }));
                if ("fake" == t || a.fakeplayer) 0 == I && q && (I = q.duration, 0 == $b && (da = q.currentTime)), 5 == da && (da = 0), Ua = da, fb = I;
                da = Ua;
                I = fb;
                0 < gb && (da = gb + Ua);
                0 < vb && (I = vb);
                b.hasClass("is-playing");
                N = da / I * G;
                isNaN(N) && (N = 0);
                N > G && (N = G);
                null == Ba && (m.children(".scrub-prog").css({
                    width: N
                }), "on" == a.skinwave_enableReflect && m.children(".scrub-prog-reflect").css({
                    width: N
                }));
                A && A.get(0).api_seek_to_onlyvisual(da / I);
                if (b.hasClass("skin-minimal"))
                    if (is_ie8() || !can_canvas() || is_opera()) z.addClass("canvas-fallback");
                    else {
                        d = Bb.getContext("2d");
                        var g = c(Bb).width(),
                            k = c(Bb).height(),
                            e = g / 100,
                            l = k / 100;
                        N = da / I * Math.PI * 2;
                        isNaN(N) && (N = 0);
                        N > 2 * Math.PI && (N = 2 * Math.PI);
                        d.clearRect(0, 0, g, k);
                        var p = d.createLinearGradient(0, 0, 0, k),
                            g = parseInt(a.design_color_highlight, 16),
                            k = g + 40;
                        p.addColorStop("0", "#" + g.toString(16));
                        p.addColorStop("1.0", "#" + k.toString(16));
                        d.beginPath();
                        d.arc(50 * e, 50 * l, 40 * e,
                            0, 2 * Math.PI, !1);
                        d.fillStyle = "rgba(0,0,0,0.1)";
                        d.fill();
                        d.beginPath();
                        d.arc(50 * e, 50 * l, 30 * e, 0, 2 * Math.PI, !1);
                        d.fillStyle = p;
                        d.fill();
                        d.beginPath();
                        d.arc(50 * e, 50 * l, 34 * e, 0, N, !1);
                        d.lineWidth = 10 * e;
                        d.strokeStyle = "rgba(0,0,0,0.3)";
                        d.stroke();
                        d.beginPath();
                        d.strokeStyle = "red";
                        d.moveTo(44 * e, 40 * e);
                        d.lineTo(57 * e, 50 * e);
                        d.lineTo(44 * e, 60 * e);
                        d.lineTo(44 * e, 40 * e);
                        d.fillStyle = "#ddd";
                        d.fill();
                        d = Cb.getContext("2d");
                        g = c(Cb).width();
                        k = c(Cb).height();
                        e = g / 100;
                        l = k / 100;
                        d.clearRect(0, 0, g, k);
                        d.beginPath();
                        d.arc(50 * e, 50 * l, 40 * e,
                            0, 2 * Math.PI, !1);
                        d.fillStyle = "rgba(0,0,0,0.1)";
                        d.fill();
                        d.beginPath();
                        d.arc(50 * e, 50 * l, 30 * e, 0, 2 * Math.PI, !1);
                        d.fillStyle = p;
                        d.fill();
                        d.beginPath();
                        d.arc(50 * e, 50 * l, 34 * e, 0, N, !1);
                        d.lineWidth = 10 * e;
                        d.strokeStyle = "rgba(0,0,0,0.35)";
                        d.stroke();
                        d.fillStyle = "#ddd";
                        d.fillRect(43 * e, 40 * e, 6 * e, 20 * e);
                        d.fillRect(53 * e, 40 * e, 6 * e, 20 * e)
                    }
                "skin-wave" == a.design_skin && ("on" == a.skinwave_enableSpectrum && eb && Ib(eb), L && "on" != a.skinwave_timer_static && (L.css({
                        left: N
                    }), N > G - Wb && L.css({
                        left: G - Wb
                    }), N > G - 30 ? O.css({
                        opacity: 1 - (N - (G - 30)) / 30
                    }) :
                    "1" != O.css("opacity") && O.css({
                        opacity: ""
                    })));
                L && (L.html(zb(da)), O.html(zb(I)));
                0 < I && da >= I - .07 && ic();
                1 != f.fire_only_once && (1 == R || "youtube" == t ? setTimeout(Gb, 500) : requestAnimFrame(Gb))
            }

            function hc(d) {
                var f = c(this);
                if (!b.hasClass("listeners-setuped")) {
                    c(q).attr("preload", "auto");
                    ub();
                    ua();
                    var h = setInterval(function() {
                        q && q.duration && 0 == isNaN(q.duration) && (I = fb = q.duration, b.addClass("meta-loaded"), O && O.html(zb(I)), clearInterval(h))
                    }, 1E3)
                }
                if ("skin-minimal" == a.design_skin) {
                    var e = f.offset().left + 50,
                        f = f.offset().top +
                        50,
                        g = d.pageX;
                    d = d.pageY;
                    var m = Math.sqrt(Math.pow(g - e, 2) + Math.pow(d - f, 2)),
                        e = .005 * -(g - e - 50);
                    d < f && (e = .5 + (.5 - e));
                    if ((1 != R || !is_firefox()) && 20 < m) {
                        ac(e);
                        return
                    }
                }
                0 == pa ? ia() : Oa()
            }

            function ic() {
                Aa(0, {
                    call_from: "handle_end"
                });
                if (a.fakeplayer) return !1;
                if ("on" == a.loop || Hb) return ia(), !1;
                Oa();
                a.parentgallery && "undefined" != typeof a.parentgallery && a.parentgallery.get(0).api_handle_end();
                setTimeout(function() {
                    if (b.hasClass("is-single-player") && 0 < dzsap_list_for_sync_players.length)
                        for (var a in dzsap_list_for_sync_players)
                            if (dzsap_list_for_sync_players[a].get(0) ==
                                b.get(0) && a < dzsap_list_for_sync_players.length - 1) {
                                a = parseInt(a, 10);
                                var c = dzsap_list_for_sync_players[a + 1].get(0);
                                c && c.api_play_media && setTimeout(function() {
                                    c.api_play_media()
                                }, 200)
                            }
                }, 100);
                setTimeout(function() {
                    Jb && Jb(b)
                }, 200)
            }

            function sa(d, f) {
                var h = {};
                f && c.extend(h, f);
                c(window).width();
                M = b.width();
                b.height();
                U && (wa = U.width(), ka = U.height());
                720 >= M ? b.addClass("under-720") : b.removeClass("under-720");
                500 >= M ? b.addClass("under-500") : b.removeClass("under-500");
                G = M;
                "skin-default" == a.design_skin && (G = M);
                "skin-pro" ==
                a.design_skin && (G = M);
                "skin-silver" == a.design_skin && (G = M, G = m.width(), "on" == a.scrubbar_tweak_overflow_hidden && (G = M - P.width() - ga.outerWidth() - 15, m.css({
                    left: P.width(),
                    width: G
                }), "canvas" == a.skinwave_wave_mode && m.find(".scrub-prog-img").width(G)));
                "skin-justthumbandbutton" == a.design_skin && (G = M = b.children(".audioplayer-inner").outerWidth());
                if ("skin-redlights" == a.design_skin || "skin-steel" == a.design_skin) G = m.width();
                "skin-wave" == a.design_skin && (G = m.outerWidth(!1), E && (h = m.offset().left - b.offset().left, E.css({
                    width: G,
                    left: h + "px"
                }), E.addClass("active")), b.hasClass("fullflashbackup") && E && (E.css({
                    width: M - 212,
                    left: 212
                }), 480 >= M && E.css({
                    width: M - 112,
                    left: 112
                }), E.addClass("active")));
                1 == jc && ("skin-default" == a.design_skin && (void 0 != b.get(0) && "auto" == b.get(0).style.height && b.height(200), h = K.height(), "undefined" == typeof b.attr("data-initheight") && "" != b.attr("data-initheight") ? b.attr("data-initheight", K.height()) : h = Number(b.attr("data-initheight")), console.info("cthis_height - ", h, b.attr("data-initheight")), "default" == a.design_thumbh &&
                    (pb = h - 44)), K.find(".the-thumb").eq(0).css({}));
                "none" != b.css("display") && (m.find(".scrub-bg-img").eq(0).css({}), m.find(".scrub-prog-img").eq(0).css({
                    width: m.children(".scrub-bg").width()
                }), m.find(".scrub-prog-canvas").eq(0).css({
                    width: m.children(".scrub-bg").width()
                }), m.find(".scrub-prog-img-reflect").eq(0).css({
                    width: m.children(".scrub-bg").width()
                }), m.find(".scrub-prog-canvas-reflect").eq(0).css({
                    width: m.children(".scrub-bg").width()
                }));
                b.removeClass("under-240 under-400");
                240 >= M && b.addClass("under-240");
                400 >= M ? (b.addClass("under-400"), w && w.hide()) : "on" == a.disable_volume ? w.hide() : w.show();
                if ("skin-wave" == a.design_skin) {
                    la = 0;
                    0 < b.find(".the-thumb").length && (la += b.find(".the-thumb").width() + 20);
                    la += 70;
                    m.eq(0).height();
                    R && "full" == a.settings_backup_type && (la = 280, 480 >= M && (la = 180));
                    "small" == a.skinwave_mode && (la -= 80, la += 13, z.css({}), la += z.outerWidth() + 10);
                    "small" == a.skinwave_mode && R && "full" == a.settings_backup_type && (la = 140, b.find(".meta-artist-con").hide());
                    if (C && "none" != C.css("display")) {
                        "small" == a.skinwave_mode &&
                            (la += 10);
                        if ("skin-wave" != a.design_skin || "small" != a.skinwave_mode) C.css({}), "skin-wave" == a.design_skin && "small" != a.skinwave_mode && C.css({});
                        la += C.outerWidth()
                    }
                    Ia = 0;
                    w && "none" != w.css("display") && (Ia += 55);
                    "small" == a.skinwave_mode && (la += 10, m.css({}), b.find(".btn-menu-state").eq(0).css({
                            bottom: "auto",
                            top: 25
                        }), "on" == a.scrubbar_tweak_overflow_hidden && m.css({
                            left: P.width(),
                            width: M - P.width() - ga.outerWidth()
                        }), G = m.width(), "on" == a.scrubbar_tweak_overflow_hidden && (G = M - P.width() - ga.outerWidth()), Ia += 10, m.css({}),
                        m.find(".scrub-bg-img").eq(0).css({
                            width: G
                        }), m.find(".scrub-prog-img").eq(0).css({
                            width: G
                        }));
                    "canvas" == a.skinwave_wave_mode && b.attr("data-pcm") && (100 == Ja.width() && Ja.width(m.width()), Ja && Ob && ha.parent(), qa(Ja.get(0), b.attr("data-pcm"), "#" + a.design_color_bg), qa(Va.get(0), b.attr("data-pcm"), "#" + a.design_color_highlight))
                }
                "skin-pro" == a.design_skin && (Ia = 10, w && "none" != w.css("display") && (Ia += 60), O.css({
                    left: "auto",
                    right: Ia
                }), Ia += 50, L.css({
                    left: "auto",
                    right: Ia
                }));
                "skin-default" == a.design_skin && L && (h = parseInt(C.css("left"),
                    10), C.outerWidth(), C.css("display"), isNaN(h), L.css({}), O.css({}));
                "skin-minion" == a.design_skin && (h = parseInt(Ea.find(".con-playpause").eq(0).offset().left, 10) - parseInt(Ea.eq(0).offset().left, 10) - 18, Ea.find(".prev-btn").eq(0).css({
                    top: 0,
                    left: h
                }), h += 36, Ea.find(".next-btn").eq(0).css({
                    top: 0,
                    left: h
                }));
                "on" == a.embedded && window.frameElement && (h = {
                    height: b.outerHeight()
                }, a.embedded_iframe_id && (h.embedded_iframe_id = a.embedded_iframe_id), window.parent.postMessage({
                    name: "resizeIframe",
                    params: h
                }, "*"))
            }

            function db(d) {
                var f =
                    c(this);
                "mousemove" == d.type && bc && (u = (d.pageX - w.find(".volume_static").eq(0).offset().left) / w.find(".volume_static").eq(0).width(), f.parent().hasClass("volume-holder") && (u = 1 - (d.pageY - w.find(".volume_static").eq(0).offset().top) / w.find(".volume_static").eq(0).height()), "skin-redlights" == a.design_skin && (u *= 10, u = Math.round(u), u /= 10), Da(u, {
                    call_from: "set_by_mousemove"
                }), hb = !1);
                "click" == d.type && (u = (d.pageX - w.find(".volume_static").eq(0).offset().left) / w.find(".volume_static").eq(0).width(), f.parent().hasClass("volume-holder") &&
                    (u = 1 - (d.pageY - w.find(".volume_static").eq(0).offset().top) / w.find(".volume_static").eq(0).height()), Da(u, {
                        call_from: "set_by_mouseclick"
                    }), hb = !1);
                "mousedown" == d.type && (bc = !0, b.addClass("volume-dragging"), u = (d.pageX - w.find(".volume_static").eq(0).offset().left) / w.find(".volume_static").eq(0).width(), f.parent().hasClass("volume-holder") && (u = 1 - (d.pageY - w.find(".volume_static").eq(0).offset().top) / w.find(".volume_static").eq(0).height()), Da(u, {
                    call_from: "set_by_mousedown"
                }), hb = !1);
                "mouseup" == d.type && (bc = !1, b.removeClass("volume-dragging"))
            }

            function Vb(b) {
                var f = b.pageX;
                if (c(b.target).hasClass("sample-block-start") || c(b.target).hasClass("sample-block-end")) return !1;
                "mousemove" == b.type && m.children(".scrubBox-hover").css({
                    left: f - m.offset().left
                });
                if ("click" == b.type) {
                    Ba && (I = Ba.duration);
                    var h = (b.pageX - m.offset().left) / G * I;
                    1 == R && (h = (b.pageX - m.offset().left) / G);
                    0 < gb && (h -= gb);
                    a.fakeplayer && setTimeout(function() {
                        a.fakeplayer.get(0) && a.fakeplayer.get(0).api_pause_media && a.fakeplayer.get(0).api_seek_to_perc(h /
                            I, {
                                call_from: "from_feeder_to_feed"
                            })
                    }, 50);
                    Aa(h, {
                        call_from: "mouse_scrubbar"
                    });
                    0 == pa && ia()
                }
            }

            function ac(a, b) {
                Aa(a * I, b)
            }

            function Aa(b, f) {
                var h = {
                    call_from: "default"
                };
                f && (h = c.extend(h, f));
                if (a.fakeplayer) return setTimeout(function() {
                    a.fakeplayer.get(0) && a.fakeplayer.get(0).api_pause_media && a.fakeplayer.get(0).api_seek_to(b, {
                        call_from: "from_feeder_to_feed"
                    })
                }, 50), !1;
                "youtube" == t && q.seekTo(b);
                if ("audio" == t)
                    if (null != Ba) Kb = b, H.currentTime = Kb, 0 != $b && (da = b), Oa({
                        audioapi_setlasttime: !1
                    }), ia();
                    else if (1 == R) "light" ==
                    a.settings_backup_type && "" == cb && eval("_cmedia.fn_seek_to" + T + "(" + b + ")"), ia();
                else return q && q.currentTime && (q.currentTime = b), !1
            }

            function rc(a) {
                0 == I && q && q.duration && (I = q.duration);
                da = a * I
            }

            function sc(a) {
                "youtube" == t && q.setPlaybackRate(a);
                "audio" == t && 0 == R && (q.playbackRate = a)
            }

            function Da(b, f) {
                var h = {
                    call_from: "default"
                };
                f && (h = c.extend(h, f));
                "youtube" == t && q.setVolume(100 * b);
                "audio" == t && (1 == R ? "light" == a.settings_backup_type && "" == cb && eval("_cmedia.fn_volumeset" + T + "(arg)") : q ? q.volume = b : q && c(q).attr("preload",
                    "metadata"));
                kc(b, h);
                A && (h.call_from = "from_fake_player", A.get(0).api_visual_set_volume(b, h));
                a.fakeplayer && "from_fake_player" != h.call_from && (h.call_from = "from_fake_player_feeder", a.fakeplayer.get(0).api_set_volume(b, h))
            }

            function kc(d, c) {
                w.hasClass("controls-volume-vertical") ? w.find(".volume_active").eq(0).css({
                    height: w.find(".volume_static").eq(0).height() * d
                }) : w.find(".volume_active").eq(0).css({
                    width: w.find(".volume_static").eq(0).width() * d
                });
                "skin-wave" == a.design_skin && "on" == a.skinwave_dynamicwaves &&
                    (m.find(".scrub-bg-img").eq(0).css({
                        transform: "scaleY(" + d + ")"
                    }), m.find(".scrub-prog-img").eq(0).css({
                        transform: "scaleY(" + d + ")"
                    }), "on" == a.skinwave_enableReflect && (0 == d ? b.find(".scrub-bg-img-reflect").fadeOut("slow") : b.find(".scrub-bg-img-reflect").fadeIn("slow")));
                null != localStorage && F && localStorage.setItem("dzsap_last_volume_" + F, d);
                kb = d
            }

            function qc() {
                0 == hb ? (lc = kb, Da(0, {
                    call_from: "from_mute"
                }), hb = !0) : (Da(lc, {
                    call_from: "from_unmute"
                }), hb = !1)
            }

            function mc() {
                if ("on" != a.design_animateplaypause) z.children(".playbtn").css({
                        display: "block"
                    }),
                    z.children(".pausebtn").css({
                        display: "none"
                    });
                else {
                    if (0 == b.hasClass("is-playing")) return !1;
                    "skin-redlights" == a.design_skin || "skin-steel" == a.design_skin ? (z.children(".pausebtn").css("opacity", 1), z.children(".pausebtn").animate({
                        opacity: "0"
                    }, {
                        queue: !1,
                        duration: 300
                    }), z.children(".playbtn").css({
                        opacity: 0,
                        visibility: "visible",
                        display: "block"
                    }), z.children(".playbtn").animate({
                        opacity: "1"
                    }, {
                        queue: !1,
                        duration: 300
                    })) : (z.children(".playbtn").stop().fadeIn("fast"), z.children(".pausebtn").stop().fadeOut("fast"))
                }
                z.removeClass("playing");
                b.removeClass("is-playing");
                pa = !1
            }

            function Oa(d) {
                var f = {
                    audioapi_setlasttime: !0,
                    donot_change_media: !1
                };
                if (mb) return !1;
                d && (f = c.extend(f, d));
                mc();
                1 != f.donot_change_media && null != a.fakeplayer ? setTimeout(function() {
                    a.fakeplayer.get(0) && a.fakeplayer.get(0).api_pause_media && a.fakeplayer.get(0).api_pause_media()
                }, 100) : ("youtube" == t && q.pauseVideo(), "audio" == t && (null != Ba ? "placeholder" != Ba && (1 == f.audioapi_setlasttime && (Kb = H.currentTime), va.stop(0)) : 1 == R && "light" == a.settings_backup_type && "none" != b.css("display") ?
                    "light" == a.settings_backup_type && eval("_cmedia.fn_pausemedia" + T + "()") : q && void 0 != q.pause && q.pause()), A && A.get(0).api_pause_media_visual());
                pa = !1;
                b.removeClass("is-playing")
            }

            function Pb(d) {
                "on" != a.design_animateplaypause ? (z.children(".playbtn").css({
                    display: "none"
                }), z.children(".pausebtn").css({
                    display: "block"
                })) : "skin-redlights" == a.design_skin || "skin-steel" == a.design_skin ? (z.children(".playbtn").css("opacity", 1), z.children(".playbtn").animate({
                    opacity: "0"
                }, {
                    queue: !1,
                    duration: 600
                }), z.children(".pausebtn").css({
                    opacity: 0,
                    visibility: "visible",
                    display: "block"
                }), z.children(".pausebtn").animate({
                    opacity: "1"
                }, {
                    queue: !1,
                    duration: 600
                })) : (z.children(".playbtn").stop().fadeOut("fast"), z.children(".pausebtn").stop().fadeIn("fast"));
                pa = !0;
                b.addClass("is-playing");
                b.addClass("first-played");
                z.addClass("playing");
                Lb && Lb(b);
                cc && cc(b)
            }

            function ia(d) {
                var f = {
                    api_report_play_media: !0
                };
                d && (f = c.extend(f, d));
                0 == b.hasClass("media-setuped") && console.info("warning: media not setuped, there might be issues");
                for (Y = 0; Y < dzsap_list.length; Y++) is_ie8() ||
                    "undefined" == typeof dzsap_list[Y].get(0) || "undefined" == typeof dzsap_list[Y].get(0).api_pause_media || dzsap_list[Y].get(0) == b.get(0) || (dzsap_list[Y].data("type_audio_stop_buffer_on_unfocus") && "on" == dzsap_list[Y].data("type_audio_stop_buffer_on_unfocus") ? dzsap_list[Y].get(0).api_destroy_for_rebuffer() : dzsap_list[Y].get(0).api_pause_media({
                        audioapi_setlasttime: !1
                    }));
                Xb && (Q(), "number" == typeof ba && 0 == Math.round(ba) % 1 && Aa(ba), Xb = !1);
                "on" == a.google_analytics_send_play_event && window._gaq && 0 == Mb && (window._gaq.push(["_trackEvent",
                    "ZoomSounds Play", "Play", "zoomsounds play - " + b.attr("data-source")
                ]), Mb = !0);
                !window.ga && window.__gaTracker && (window.ga = window.__gaTracker);
                "on" == a.google_analytics_send_play_event && window.ga && 0 == Mb && (window.console && console.info("sent event"), Mb = !0, window.ga("send", {
                    hitType: "event",
                    eventCategory: "zoomsounds play - " + b.attr("data-source"),
                    eventAction: "play",
                    eventLabel: "zoomsounds play - " + b.attr("data-source")
                }));
                A && A.get(0).api_play_media_visual({
                    api_report_play_media: !1
                });
                if (null != a.fakeplayer) d = {
                    type: a.type_for_fake_feed,
                    fakeplayer_is_feeder: "on",
                    call_from: "play_media_audioplayer"
                }, a.fakeplayer.get(0).api_change_media(b, d), setTimeout(function() {
                    a.fakeplayer.get(0) && a.fakeplayer.get(0).api_play_media && a.fakeplayer.get(0).api_play_media()
                }, 100), "off" == W && ja();
                else {
                    "youtube" == t && q && q.playVideo && q.playVideo();
                    "normal" == t && (t = "audio");
                    if ("audio" == t)
                        if (null != Ba)
                            if ("placeholder" != Ba) va = H.createBufferSource(), va.buffer = Ba, va.connect(H.destination), va.connect(ca), va.start(0, Kb);
                            else return;
                    else 1 ==
                        R && "none" != b.css("display") ? "light" == a.settings_backup_type && eval("_cmedia.fn_playmedia" + T + "()") : q && "undefined" != typeof q.play && q.play();
                    Pb(f);
                    A ? A.get(0).api_try_to_submit_view() : nc()
                }
            }

            function nc() {
                "auto" == W && (W = "off");
                "off" == W && ja()
            }

            function zb(a) {
                a = Math.round(a);
                var b = 0;
                if (0 < a) {
                    for (; 59 < a && 3E6 > a && isFinite(a);) b++, a -= 60;
                    return String((10 > b ? "0" : "") + b + ":" + (10 > a ? "0" : "") + a)
                }
                return "00:00"
            }
            var b = c(this);
            b.children();
            var T = "ap1",
                Y = 0,
                M, G = 0,
                N = 0,
                K, ha = null,
                P = null,
                ga = null,
                Ea, z, w, m, Ja, Va, ea, q, Ob, C, Ab = null,
                Sb =
                null,
                bb = null,
                Tb = null,
                U = null,
                qb = null,
                $a = null,
                ab = null,
                E = null,
                Z = null,
                L = null,
                O = null,
                A = null,
                Wa = null,
                pa = !1,
                hb = !1,
                ib = !1,
                mb = !1,
                Mb = !1,
                Xb = !1,
                Hb = !1,
                I = 0,
                da = 0,
                Ua = 0,
                fb = 0,
                gb = 0,
                oc = 0,
                vb = 0,
                jb = 0,
                La = 0,
                Wb = 0,
                V = 0,
                kb = 1,
                lc = 1,
                F = "",
                ra = "",
                tb, $b = 0,
                Bb, Cb, R = !1,
                sb = "",
                xa = "",
                Rb = "",
                jc = !1,
                Zb = !1,
                bc = !1,
                Xa = !1,
                yb = !0,
                cb = "",
                Qa = null,
                H = null,
                Ba = null,
                ca = null,
                eb = null,
                va = null,
                wa = 100,
                ka = 100,
                pb, t = "",
                nb = 0,
                lb = [],
                gc = "",
                Kb = 0,
                la = 0,
                Ia = 0,
                W = "auto",
                ma = 0,
                Ga = 0,
                ec = 0,
                Fa = -1,
                ba = "off",
                Yb = !1,
                Fb = 1,
                fc = "127.0.0.1",
                Jb = null,
                Lb = null,
                cc = null,
                Ub = null,
                dc = !1;
            0 == isNaN(parseInt(a.design_thumbh,
                10)) && (a.design_thumbh = parseInt(a.design_thumbh, 10)); - 1 == String(a.design_thumbw).indexOf("%") && (a.design_thumbw = parseInt(a.design_thumbw, 10));
            window.dzsap_player_index++;
            0 < Number(a.sample_time_start) && (gb = Number(a.sample_time_start), 0 < Number(a.sample_time_end) && (oc = Number(a.sample_time_end), 0 < Number(a.sample_time_total) && (vb = Number(a.sample_time_total), jb = gb / vb, La = oc / vb)));
            "on" == a.autoplay && "on" == a.cue && (a.preload_method = "auto");
            if ("default" == a.skinwave_preloader_code) {
                a.skinwave_preloader_code = ' <svg class="loading-svg" width="30" height="30" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g fill="none" fill-rule="evenodd" stroke-width="2"> <circle cx="22" cy="22" r="1"> <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /> <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="1"> <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /> <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /> </circle> </g> </svg>';
                var pc = '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="15"  viewBox="0 0 645 700" id="svg2"> <defs id="defs4" /> <g id="layer1"> <path d="M 297.29747,550.86823 C 283.52243,535.43191 249.1268,505.33855 220.86277,483.99412 C 137.11867,420.75228 125.72108,411.5999 91.719238,380.29088 C 29.03471,322.57071 2.413622,264.58086 2.5048478,185.95124 C 2.5493594,147.56739 5.1656152,132.77929 15.914734,110.15398 C 34.151433,71.768267 61.014996,43.244667 95.360052,25.799457 C 119.68545,13.443675 131.6827,7.9542046 172.30448,7.7296236 C 214.79777,7.4947896 223.74311,12.449347 248.73919,26.181459 C 279.1637,42.895777 310.47909,78.617167 316.95242,103.99205 L 320.95052,119.66445 L 330.81015,98.079942 C 386.52632,-23.892986 564.40851,-22.06811 626.31244,101.11153 C 645.95011,140.18758 648.10608,223.6247 630.69256,270.6244 C 607.97729,331.93377 565.31255,378.67493 466.68622,450.30098 C 402.0054,497.27462 328.80148,568.34684 323.70555,578.32901 C 317.79007,589.91654 323.42339,580.14491 297.29747,550.86823 z" id="path2417" style="" /> <g transform="translate(129.28571,-64.285714)" id="g2221" /> </g> </svg> '
            }
            a.settings_trigger_resize =
                parseInt(a.settings_trigger_resize, 10);
            if (0 < b.children(".extra-html").length && "" == a.settings_extrahtml) {
                a.settings_extrahtml = b.children(".extra-html").eq(0).html();
                var Nb = /{\{ratesubmitted=(.?)}}/g;
                Nb.test(String(a.settings_extrahtml)) && (Nb.lastIndex = 0, Fa = Nb.exec(String(a.settings_extrahtml))[1], a.settings_extrahtml = String(a.settings_extrahtml).replace(Nb, ""), a.parentgallery && void 0 != c(a.parentgallery).get(0) && void 0 != c(a.parentgallery).get(0).api_player_rateSubmitted && c(a.parentgallery).get(0).api_player_rateSubmitted());
                b.children(".extra-html").remove()
            }
            0 < b.children(".extra-html-in-controls-right").length && "" == a.settings_extrahtml_in_float_right && (a.settings_extrahtml_in_float_right = b.children(".extra-html-in-controls-right").eq(0).html());
            0 < b.children(".extra-html-in-controls-left").length && "" == a.settings_extrahtml_in_float_left && (a.settings_extrahtml_in_float_left = b.children(".extra-html-in-controls-left").eq(0).html());
            (function() {
                "" == a.design_skin && (a.design_skin = "skin-default"); - 1 == b.attr("class").indexOf("skin-") &&
                    b.addClass(a.design_skin);
                b.hasClass("skin-default") && (a.design_skin = "skin-default");
                b.hasClass("skin-wave") && (a.design_skin = "skin-wave");
                b.hasClass("skin-justthumbandbutton") && (a.design_skin = "skin-justthumbandbutton");
                b.hasClass("skin-pro") && (a.design_skin = "skin-pro");
                b.hasClass("skin-aria") && (a.design_skin = "skin-aria");
                b.hasClass("skin-silver") && (a.design_skin = "skin-silver");
                b.hasClass("skin-redlights") && (a.design_skin = "skin-redlights");
                b.hasClass("skin-steel") && (a.design_skin = "skin-steel");
                b.hasClass("skin-customcontrols") &&
                    (a.design_skin = "skin-customcontrols");
                "on" == b.attr("data-viewsubmitted") && (W = "on");
                b.attr("data-userstarrating") && (Fa = Number(b.attr("data-userstarrating")));
                b.hasClass("skin-minimal") && (a.design_skin = "skin-minimal", "default" == a.disable_volume && (a.disable_volume = "on"), "default" == a.disable_scrub && (a.disable_scrub = "on"), a.disable_timer = "on");
                b.hasClass("skin-minion") && (a.design_skin = "skin-minion", "default" == a.disable_volume && (a.disable_volume = "on"), "default" == a.disable_scrub && (a.disable_scrub = "on"),
                    a.disable_timer = "on");
                "skin-default" == a.design_skin && "default" == a.design_thumbh && (pb = b.height() - 40, jc = !0);
                "skin-wave" == a.design_skin && (b.addClass("skin-wave-mode-" + a.skinwave_mode), "small" == a.skinwave_mode && "default" == a.design_thumbh && (pb = 80), b.addClass("skin-wave-wave-mode-" + a.skinwave_wave_mode));
                "skin-justthumbandbutton" == a.design_skin && ("default" == a.design_thumbh && (a.design_thumbh = ""), a.disable_timer = "on", a.disable_volume = "on", "default" == a.design_animateplaypause && (a.design_animateplaypause = "on"));
                "skin-redlights" == a.design_skin && (a.disable_timer = "on", a.disable_volume = "off", "default" == a.design_animateplaypause && (a.design_animateplaypause = "on"));
                "skin-steel" == a.design_skin && ("default" == a.disable_timer && (a.disable_timer = "off"), a.disable_volume = "on", "default" == a.design_animateplaypause && (a.design_animateplaypause = "on"), "default" == a.disable_scrub && (a.disable_scrub = "on"));
                "skin-customcontrols" == a.design_skin && ("default" == a.disable_timer && (a.disable_timer = "on"), a.disable_volume = "on", "default" == a.design_animateplaypause &&
                    (a.design_animateplaypause = "on"), "default" == a.disable_scrub && (a.disable_scrub = "on"));
                "canvas" == a.skinwave_wave_mode && (a.skinwave_enableReflect = "off", b.addClass("skin-wave-no-reflect"));
                "off" == a.skinwave_enableReflect && b.addClass("skin-wave-no-reflect");
                "default" == a.design_thumbh && (pb = 200);
                "" == a.embed_code && 0 < b.find("div.feed-embed-code").length && (a.embed_code = b.find("div.feed-embed-code").eq(0).html());
                "default" == a.design_animateplaypause && (a.design_animateplaypause = "off");
                "on" == a.design_animateplaypause &&
                    b.addClass("design-animateplaypause");
                "" == a.skinwave_comments_playerid ? ("undefined" != typeof b.attr("id") && (F = b.attr("id")), b.attr("data-playerid") && (F = b.attr("data-playerid"))) : (F = a.skinwave_comments_playerid, b.attr("id") || b.attr("id", F));
                "" == F && (a.skinwave_comments_enable = "off");
                b.attr("data-fakeplayer") && b.attr("data-type") && 0 == (is_android() || is_ios()) && (a.fakeplayer = c(b.attr("data-fakeplayer")).eq(0), a.type_for_fake_feed = b.attr("data-type"), b.attr("data-type", "fake"), t = a.type = "fake");
                "on" == a.construct_player_list_for_sync &&
                    0 == dzsap_list_for_sync_sw_build && (dzsap_list_for_sync_players = [], dzsap_list_for_sync_sw_build = !0, c(".audioplayer.is-single-player,.audioplayer-tobe.is-single-player").each(function() {
                        var a = c(this);
                        dzsap_list_for_sync_players.push(a)
                    }), clearTimeout(dzsap_list_for_sync_inter_build), dzsap_list_for_sync_inter_build = setTimeout(function() {
                        dzsap_list_for_sync_sw_build = !1
                    }, 500));
                ba = a.playfrom;
                Sa(b.attr("data-playfrom")) && (ba = b.attr("data-playfrom"));
                0 == isNaN(parseInt(ba, 10)) && (ba = parseInt(ba, 10));
                ra = F;
                var d =
                    null;
                (d = Wa ? Wa : A ? A : null) && (d.attr("data-playerid") ? ra = d.attr("data-playerid") : d.attr("data-source") && (ra = d.attr("data-source")));
                "youtube" == b.attr("data-type") && (t = a.type = "youtube");
                "soundcloud" == b.attr("data-type") && (t = a.type = "soundcloud");
                "shoutcast" == b.attr("data-type") && (a.type = "shoutcast", t = "audio", a.disable_timer = "on", "skin-default" == a.design_skin && (a.disable_scrub = "on"));
                "" == t && (t = "audio");
                xa = b.attr("data-source");
                "audio" == t && (xa = b.attr("data-source"));
                if (!b.hasClass("audioplayer")) {
                    T = void 0 !=
                        b.attr("id") ? b.attr("id") : "ap" + dzsap_globalidind++;
                    is_ie8() && "off" == a.cue && (a.cue = "on");
                    b.removeClass("audioplayer-tobe");
                    b.addClass("audioplayer");
                    0 < b.find(".the-comments").length && 0 < b.find(".the-comments").eq(0).children().length ? lb = b.find(".the-comments").eq(0).children() : "on" == a.skinwave_comments_retrievefromajax && (d = {
                        action: "dzsap_get_comments",
                        postdata: "1",
                        playerid: F
                    }, a.settings_php_handler && c.ajax({
                        type: "POST",
                        url: a.settings_php_handler,
                        data: d,
                        success: function(a) {
                            b.prependOnce('<div class="the-comments"></div>',
                                ".the-comments"); - 1 < a.indexOf("a-comment") && (a = a.replace(/a-comment/g, "a-comment dzstooltip-con"), a = a.replace(/dzstooltip arrow-bottom/g, "dzstooltip arrow-from-start transition-slidein arrow-bottom"));
                            b.find(".the-comments").eq(0).html(a);
                            lb = b.find(".the-comments").eq(0).children();
                            Ma()
                        },
                        error: function(a) {
                            "undefined" != typeof window.console && console.log("Got this from the server: " + a, a)
                        }
                    }));
                    "canvas" == a.skinwave_wave_mode && wb();
                    if (is_ios() || is_android()) a.autoplay = "off", a.disable_volume = "on", "off" ==
                        a.cue && (a.cue = "on"), a.cue = "on";
                    if ("youtube" == t && 0 == dzsap_ytapiloaded) {
                        d = document.createElement("script");
                        d.src = "https://www.youtube.com/iframe_api";
                        var f = document.getElementsByTagName("script")[0];
                        f.parentNode.insertBefore(d, f);
                        dzsap_ytapiloaded = !0
                    }
                    sb = b.attr("data-source");
                    void 0 != b.attr("data-source") && -1 < String(b.attr("data-source")).indexOf("https://soundcloud.com/") && (t = "soundcloud");
                    if ("soundcloud" == t) {
                        "" == a.soundcloud_apikey && alert("soundcloud api key not defined, read docs!");
                        d = "http://api.soundcloud.com/resolve?url=" +
                            sb + "&format=json&consumer_key=" + a.soundcloud_apikey;
                        if ("skin-wave" == a.design_skin && !b.attr("data-scrubbg") || is_ie8()) a.skinwave_enableReflect = "off";
                        d = encodeURIComponent(d);
                        c.getJSON(a.php_retriever + "?scurl=" + d, function(d) {
                            t = "audio";
                            "skin-wave" == a.design_skin && void 0 == b.attr("data-scrubbg") && "canvas" != a.skinwave_wave_mode && (b.attr("data-scrubbg", d.waveform_url), b.attr("data-scrubprog", d.waveform_url), m.find(".scrub-bg").eq(0).append('<div class="scrub-bg-div"></div>'), m.find(".scrub-bg").eq(0).append('<img src="' +
                                b.attr("data-scrubbg") + '" class="scrub-bg-img"/>'), m.children(".scrub-prog").eq(0).append('<div class="scrub-prog-div"></div>'), m.find(".scrub-bg").css({
                                top: 0
                            }));
                            Rb = b.attr("data-source");
                            b.attr("data-source", d.stream_url + "?consumer_key=" + a.soundcloud_apikey + "&origin=localhost");
                            xa = b.attr("data-source");
                            "canvas" == a.skinwave_wave_mode && 0 == Xa && Ka();
                            "on" == a.cue && Q()
                        })
                    }
                    if (0 == can_play_mp3() && void 0 == b.attr("data-sourceogg") || is_ie8() || "on" == a.settings_useflashplayer) R = !0;
                    r();
                    "on" == a.scrubbar_tweak_overflow_hidden ?
                        b.addClass("scrubbar-tweak-overflow-hidden-on") : b.removeClass("scrubbar-tweak-overflow-hidden-on");
                    "skin-wave" != a.design_skin || "audio" != t && "soundcloud" != t && "fake" != t || "on" != a.skinwave_comments_enable || (d = '<div class="comments-holder">', d = a.skinwave_comments_links_to ? d + ('<a href="' + a.skinwave_comments_links_to + '" target="_blank" class="the-bg"></a>') : d + '<div class="the-bg"></div>', b.appendOnce(d + '</div><div class="clear"></div><div class="comments-writer"><div class="comments-writer-inner"><div class="setting"><div class="setting-label"></div><textarea name="comment-text" placeholder="Your comment.." type="text" class="comment-input"></textarea><div class="float-right"><button class="submit-ap-comment dzs-button float-right">Submit</button><button class="cancel-ap-comment dzs-button float-right">Cancel</button></div><div class="overflow-it"><input placeholder="Your email.." name="comment-email" type="text" class="comment-input"/></div><div class="clear"></div></div></div></div>'),
                        E = b.find(".comments-holder").eq(0), Z = b.find(".comments-writer").eq(0), Ma(), E.find(".the-bg").bind("click", e), Z.find(".cancel-ap-comment").bind("click", l), Z.find(".submit-ap-comment").bind("click", g));
                    "" != a.settings_extrahtml && b.append('<div class="extra-html">' + a.settings_extrahtml + "</div>");
                    "youtube" == t && (dzsap_list && dzsap_list.push(b), ea.append('<div id="ytplayer_' + T + '"></div>'), b.get(0).fn_yt_ready = aa, window.YT && aa());
                    "on" == a.autoplay && "on" == a.cue && (ma = 1);
                    "youtube" == t && is_ios() ? (200 > b.height() &&
                        b.height(200), d = '<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + sb + '" frameborder="0" allowfullscreen></iframe>', b.html(d)) : ("on" == a.cue && "soundcloud" != t ? ((is_android() || is_ios()) && b.find(".playbtn").bind("click", ia), Q()) : (b.find(".playbtn").bind("click", ta), b.find(".scrubbar").bind("click", ta), sa()), setInterval(function() {
                            Zb = !0
                        }, 1E3), b.get(0).api_destroy = Na, b.get(0).api_play = ia, b.get(0).api_get_last_vol = Ha, b.get(0).api_click_for_setup_media = ta, b.get(0).api_handleResize = sa, b.get(0).api_set_playback_speed =
                        sc, b.get(0).api_change_media = p, b.get(0).api_seek_to_perc = ac, b.get(0).api_seek_to = Aa, b.get(0).api_seek_to_onlyvisual = rc, b.get(0).api_set_volume = Da, b.get(0).api_visual_set_volume = kc, b.get(0).api_destroy_listeners = Ya, b.get(0).api_pause_media = Oa, b.get(0).api_pause_media_visual = mc, b.get(0).api_play_media = ia, b.get(0).api_play_media_visual = Pb, b.get(0).api_change_visual_target = y, b.get(0).api_change_design_color_highlight = Ca, b.get(0).api_set_action_audio_play = function(a) {
                            Lb = a
                        }, b.get(0).api_set_action_audio_end =
                        function(a) {
                            Jb = a
                        }, b.get(0).api_set_action_audio_comment = function(a) {
                            Ub = a
                        }, b.get(0).api_try_to_submit_view = nc, a.action_audio_play && (Lb = a.action_audio_play), a.action_audio_play2 && (cc = a.action_audio_play2), a.action_audio_end && (Jb = a.action_audio_end), "skin-minimal" == a.design_skin && Gb({
                            fire_only_once: !0
                        }), b.on("click", ".dzsap-repeat-button,.dzsap-loop-button", Ra), c(window).bind("resize", sa), sa(), m.bind("touchstart", function(a) {
                            scrubbar_moving = !0
                        }), c(document).bind("touchmove", function(a) {
                            scrubbar_moving &&
                                (scrubbar_moving_x = a.originalEvent.touches[0].pageX, aux3 = scrubbar_moving_x - m.offset().left, 0 > aux3 && (aux3 = 0), aux3 > m.width() && (aux3 = m.width()), ac(aux3 / m.width()))
                        }), c(document).bind("touchend", function(a) {
                            scrubbar_moving = !1
                        }), b.off("click", ".btn-like"), b.on("click", ".btn-like", Eb), c(document).delegate(".star-rating-con", "mousemove", Ta), c(document).delegate(".star-rating-con", "mouseleave", Ta), c(document).delegate(".star-rating-con", "click", Ta), setTimeout(function() {
                            sa();
                            "canvas" == a.skinwave_wave_mode &&
                                (x(), setTimeout(function() {
                                    x()
                                }, 100))
                        }, 100), b.find(".btn-menu-state").eq(0).bind("click", k), b.on("click", ".prev-btn,.next-btn", Ra))
                }
            })();
            Math.easeOutQuart = function(a, b, c, e) {
                a /= e;
                a--;
                return -c * (a * a * a * a - 1) + b
            };
            Math.easeOutQuad = function(a, b, c, e) {
                return -c * a / e * (a / e - 2) + b
            };
            Math.easeOutQuad_rev = function(a, b, c, e) {
                return (c * e + e * Math.sqrt(c * (c + b - a))) / c
            };
            return this
        })
    };
    window.dzsap_init = function(a, n) {
        if ("undefined" != typeof n && "undefined" != typeof n.init_each && 1 == n.init_each) {
            var x = 0,
                y;
            for (y in n) x++;
            1 == x && (n = void 0);
            c(a).each(function() {
                c(this).audioplayer(n)
            })
        } else c(a).audioplayer(n)
    };
    c.fn.audiogallery = function(a) {
        if ("undefined" == typeof a && "undefined" != typeof c(this).attr("data-options") && "" != c(this).attr("data-options")) {
            var n = c(this).attr("data-options");
            eval("var aux_opts = " + n);
            a = aux_opts
        }
        Math.easeIn = function(a, c, n, p) {
            return -n * (a /= p) * (a - 2) + c
        };
        a = c.extend({
            design_skin: "skin-default",
            cueFirstMedia: "on",
            autoplay: "off",
            autoplayNext: "on",
            design_menu_position: "bottom",
            design_menu_state: "open",
            design_menu_show_player_state_button: "off",
            design_menu_width: "default",
            design_menu_height: "200",
            design_menu_space: "default",
            design_menuitem_width: "default",
            design_menuitem_height: "default",
            design_menuitem_space: "default",
            disable_menu_navigation: "off",
            enable_easing: "off",
            settings_ap: {},
            transition: "fade",
            embedded: "off",
            settings_mode: "mode-normal"
        }, a);
        this.each(function() {
            function n() {
                return Db
            }

            function u() {
                var a = r.find(".items").eq(0).children().length;
                Ha = [];
                console.info(r.find(".items").eq(0).children());
                for (na = 0; na < a; na++) {
                    var c = r.find(".items").children().eq(0);
                    Ha.push(c.find(".menu-description").html());
                    B.append(c)
                }
                for (na = 0; na < Ha.length; na++) a = "", Ha[na] && -1 == Ha[na].indexOf('<div class="menu-item-thumb-con"><div class="menu-item-thumb" style="') && (a += " no-thumb"), a = '<div class="menu-item' + a + '">', r.hasClass("skin-aura") && (a += '<div class="menu-item-number">' + ++Db + "</div>"), a += Ha[na] + "</div>", Q.append(a)
            }

            function Ca() {
                r.addClass("dzsag-loaded")
            }

            function p() {
                if (0 == c(this).hasClass("active")) return alert(ua), !1
            }

            function Ma() {
                "undefined" != typeof B.children().eq(v).get(0) &&
                    "undefined" != typeof B.children().eq(v).get(0).api_play_media && B.children().eq(v).get(0).api_play_media()
            }

            function Ya(c) {
                "mode-showall" == a.settings_mode && (v = c = B.children(".audioplayer,.audioplayer-tobe").index(c), r.get(0).currNr_2 = c)
            }

            function Na() {
                isNaN(Sa) && (Sa = 0);
                Ra = Sa;
                Ib = Ta - Ra;
                Sa = Number(Math.easeIn(1, Ra, Ib, 20).toFixed(4));
                0 == is_ios() && 0 == is_android() && Q.css({
                    transform: "translateY(" + Sa + "px)"
                });
                requestAnimFrame(Na)
            }

            function ta() {
                0 == S.height() ? S.css({
                    height: a.design_menu_height
                }) : S.css({
                    height: 0
                });
                setTimeout(function() {
                    Pa()
                }, 400)
            }

            function k() {
                "on" == a.autoplayNext && Za()
            }

            function e() {
                Q.children(".menu-item").eq(v).find(".download-after-rate").addClass("active")
            }

            function l() {
                Q.children(".menu-item").eq(v).find(".download-after-rate").addClass("active")
            }

            function g() {
                B.css("height", B.children().eq(v).height());
                oa = S.height();
                ja = Q.outerHeight();
                ja > oa && 0 < oa ? (S.unbind("mousemove", aa), S.bind("mousemove", aa)) : S.unbind("mousemove", aa);
                "on" == a.embedded && window.frameElement && (window.frameElement.height =
                    r.height())
            }

            function xb() {
                S && (ja = Q.outerHeight())
            }

            function aa(e) {
                var g = c(this);
                g.offset();
                e = e.pageY - g.offset().top;
                ja <= oa || (oa = S.outerHeight(), e = e / oa * -(ja - oa + 50) + 20, 0 < e && (e = 0), e < -(ja - oa + 10) && (e = -(ja - oa + 10)), Ta = e, 0 == is_ios() && 0 == is_android() && "on" != a.enable_easing && Q.css({
                    transform: "translateY(" + Ta + "px)"
                }))
            }

            function Qb(a) {
                a = c(this);
                a = a.parent().children().index(a);
                ya(a)
            }

            function Pa() {
                setTimeout(function() {
                    B.css("height", B.children().eq(v).height())
                }, 500);
                g()
            }

            function ob() {
                B.children().eq(qa).removeClass("transitioning-out");
                B.children().eq(qa).removeClass("active");
                B.children().eq(v).removeClass("transitioning-in");
                qa = v;
                za = !1
            }

            function wb() {
                r.parent().children(".the-bg").eq(0).remove();
                za = !1
            }

            function Ka() {
                fa = v;
                fa--;
                0 > fa && (fa = B.children().length - 1);
                ya(fa)
            }

            function Za() {
                fa = v;
                "mode-showall" == a.settings_mode && (fa = r.get(0).currNr_2);
                fa++;
                fa >= B.children().length && (fa = 0);
                ya(fa)
            }

            function ya(e) {
                if (1 != za)
                    if ("last" == e && (e = B.children().length - 1), v == e) B && B.children().eq(v).get(0) && B.children().eq(v).get(0).api_play_media && B.children().eq(v).get(0).api_play_media();
                    else {
                        X = B.children(".audioplayer,.audioplayer-tobe").eq(e);
                        var k = ""; - 1 < v && ("undefined" != typeof B.children().eq(v).get(0) && ("undefined" != typeof B.children().eq(v).get(0).api_pause_media && B.children().eq(v).get(0).api_pause_media(), "undefined" != typeof B.children().eq(v).get(0).api_get_last_vol && (k = B.children().eq(v).get(0).api_get_last_vol())), "mode-showall" != a.settings_mode && ("fade" == a.transition && (B.children().eq(v).removeClass("active"), Q.children().eq(v).removeClass("active"), B.children().eq(v).addClass("transitioning-out"),
                            B.children().eq(v).animate({}, {
                                queue: !1
                            }), setTimeout(ob, 300), za = !0), "direct" == a.transition && ob()));
                        "sameasgallery" == a.settings_ap.design_skin && (a.settings_ap.design_skin = a.design_skin); - 1 == v && "on" == a.autoplay && (a.settings_ap.autoplay = "on"); - 1 < v && "on" == a.autoplayNext && (a.settings_ap.autoplay = "on");
                        a.settings_ap.parentgallery = r;
                        a.settings_ap.design_menu_show_player_state_button = a.design_menu_show_player_state_button;
                        a.settings_ap.cue = "on";
                        1 == ub && ("off" == a.cueFirstMedia && (a.settings_ap.cue = "off"), ub = !1);
                        var l = c.extend(a.settings_ap);
                        l.volume_from_gallery = k;
                        X.hasClass("audioplayer-tobe") && X.audioplayer(l);
                        "on" == a.autoplayNext && ("mode-showall" == a.settings_mode && (v = r.get(0).currNr_2), -1 < v && X.get(0) && X.get(0).api_play && X.get(0).api_play());
                        "mode-showall" != a.settings_mode && ("fade" == a.transition && (X.css({}), X.animate({}, {
                            queue: !1
                        })), X.addClass("transitioning-in"));
                        X.addClass("active");
                        Q.children().eq(e).addClass("active");
                        void 0 != X.attr("data-bgimage") && r.parent().hasClass("ap-wrapper") && 0 < r.parent().children(".the-bg").length &&
                            (r.parent().children(".the-bg").eq(0).after('<div class="the-bg" style="background-image: url(' + X.attr("data-bgimage") + ');"></div>'), r.parent().children(".the-bg").eq(0).css({
                                opacity: 1
                            }), r.parent().children(".the-bg").eq(1).css({
                                opacity: 0
                            }), r.parent().children(".the-bg").eq(1).animate({
                                opacity: 1
                            }, {
                                queue: !1,
                                duration: 1E3,
                                complete: wb,
                                step: function() {
                                    za = !0
                                }
                            }), za = !0);
                        "mode-showall" != a.settings_mode && (v = e);
                        g()
                    }
            }
            var r = c(this);
            r.children();
            var v = -1,
                qa = 0,
                Db = 0,
                fa = 0,
                za = !0,
                na = 0,
                oa, ja, rb, B, S, Q, X, za = !1,
                ub = !0,
                Eb = !1,
                Ha = [],
                ua = "You need to comment or rate before downloading.",
                Sa = 0,
                Ra = 0,
                Ta = 0,
                Ib = 0;
            window.dzsap_settings && "undefined" != typeof window.dzsap_settings.str_alertBeforeRate && (ua = window.dzsap_settings.str_alertBeforeRate);
            r.get(0).currNr_2 = -1;
            (function() {
                "default" == a.design_menu_width && (a.design_menu_width = "100%");
                "default" == a.design_menu_height && (a.design_menu_height = "200");
                r.addClass(a.settings_mode);
                r.append('<div class="slider-main"><div class="slider-clipper"></div></div>');
                r.addClass("menu-position-" +
                    a.design_menu_position);
                rb = r.find(".slider-main").eq(0);
                var g = r.find(".items").children().length;
                if (0 == g || 1 == g) a.design_menu_position = "none", a.settings_ap.disable_player_navigation = "on";
                "top" == a.design_menu_position && rb.before('<div class="nav-main"><div class="nav-clipper"></div></div>');
                "bottom" == a.design_menu_position && rb.after('<div class="nav-main"><div class="nav-clipper"></div></div>');
                B = r.find(".slider-clipper").eq(0);
                S = r.find(".nav-main").eq(0);
                Q = r.find(".nav-clipper").eq(0);
                r.children(".extra-html").length &&
                    r.append(r.children(".extra-html"));
                u();
                "on" == a.disable_menu_navigation && S.hide();
                S.css({
                    height: a.design_menu_height
                });
                (is_ios() || is_android()) && S.css({
                    overflow: "auto"
                });
                "closed" == a.design_menu_state && S.css({
                    height: 0
                });
                0 == r.css("opacity") && r.animate({
                    opacity: 1
                }, 1E3);
                c(window).bind("resize", Pa);
                Pa();
                setTimeout(Pa, 1E3);
                r.get(0).api_skin_redlights_give_controls_right_to_all = function() {
                    Eb = !0
                };
                "mode-normal" == a.settings_mode ? ya(fa) : (B.children().each(function() {
                    var e = c(this),
                        g = e.parent().children(".audioplayer,.audioplayer-tobe").index(e);
                    e.hasClass("audioplayer-tobe") && (a.settings_ap.parentgallery = r, a.settings_ap.action_audio_play = Ya, e.audioplayer(a.settings_ap), g = String(g + 1), 2 > g.length && (g = "0" + g), e.before('<div class="number-wrapper"><span class="the-number">' + g + "</span></div>"), e.after('<div class="clear for-number-wrapper"></div>'))
                }), "mode-showall" == a.settings_mode && Eb && B.children(".audioplayer").each(function() {
                    var a = c(this);
                    0 == a.find(".ap-controls-right").eq(0).prev().hasClass("controls-right") && a.find(".ap-controls-right").eq(0).before('<div class="controls-right"> </div>')
                }));
                Q.on("click", ".menu-item", Qb);
                r.find(".download-after-rate").bind("click", p);
                r.get(0).api_goto_next = Za;
                r.get(0).api_goto_prev = Ka;
                r.get(0).api_goto_item = ya;
                r.get(0).api_handle_end = k;
                r.get(0).api_toggle_menu_state = ta;
                r.get(0).api_handleResize = Pa;
                r.get(0).api_player_commentSubmitted = e;
                r.get(0).api_player_rateSubmitted = l;
                r.get(0).api_reinit = u;
                r.get(0).api_play_curr_media = Ma;
                r.get(0).api_get_nr_children = n;
                setInterval(xb, 1E3);
                setTimeout(Ca, 700);
                "on" == a.enable_easing && Na();
                r.addClass("dzsag-inited");
                r.addClass("transition-" +
                    a.transition)
            })()
        })
    };
    window.dzsag_init = function(a, n) {
        if ("undefined" != typeof n && "undefined" != typeof n.init_each && 1 == n.init_each) {
            var x = 0,
                y;
            for (y in n) x++;
            1 == x && (n = void 0);
            c(a).each(function() {
                c(this).audiogallery(n)
            })
        } else c(a).audiogallery(n)
    }
})(jQuery);
jQuery(document).ready(function(c) {
    c("audio.zoomsounds-from-audio").each(function() {
        var n = c(this);
        n.after('<div class="audioplayer-tobe auto-init skin-silver" data-source="' + n.attr("src") + '"></div>');
        n.remove()
    });
    dzsap_init(".audioplayer-tobe.auto-init", {
        init_each: !0
    });
    dzsag_init(".audiogallery.auto-init", {
        init_each: !0
    });
    c(document).delegate(".audioplayer-song-changer", "click", function() {
        var n = c(this),
            a = c(n.attr("data-target")).eq(0);
        a && a.get(0) && a.get(0).api_change_media && a.get(0).api_change_media(n);
        return !1
    });
    c(document).delegate(".dzsap-sticktobottom .icon-hide", "click", function() {
        var n = c(this);
        c(".dzsap-sticktobottom .dzsap_footer").get(0).api_pause_media();
        n.parent().parent().removeClass("audioplayer-loaded");
        n.parent().parent().addClass("audioplayer-was-loaded");
        return !1
    });
    c(document).delegate(".dzsap-sticktobottom .icon-show", "click", function() {
        var n = c(this);
        n.parent().parent().addClass("audioplayer-loaded");
        n.parent().parent().removeClass("audioplayer-was-loaded");
        return !1
    });
    0 < c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-silver").length &&
        setInterval(function() {
            c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-silver  .audioplayer").eq(0).hasClass("dzsap-loaded") && (c(".dzsap-sticktobottom-placeholder").eq(0).addClass("active"), 0 == c(".dzsap-sticktobottom").hasClass("audioplayer-was-loaded") && c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-silver").addClass("audioplayer-loaded"))
        }, 1E3);
    0 < c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave").length && setInterval(function() {
        c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave  .audioplayer").eq(0).hasClass("dzsap-loaded") &&
            (c(".dzsap-sticktobottom-placeholder").eq(0).addClass("active"), 0 == c(".dzsap-sticktobottom").hasClass("audioplayer-was-loaded") && c(".dzsap-sticktobottom.dzsap-sticktobottom-for-skin-wave").addClass("audioplayer-loaded"))
    }, 1E3)
});

function is_ios() {
    return -1 != navigator.platform.indexOf("iPhone") || -1 != navigator.platform.indexOf("iPod") || -1 != navigator.platform.indexOf("iPad")
}

function is_android() {
    return -1 < navigator.userAgent.toLowerCase().indexOf("android")
}

function is_ie() {
    return -1 != navigator.appVersion.indexOf("MSIE") ? !0 : !1
}

function is_firefox() {
    return -1 != navigator.userAgent.indexOf("Firefox") ? !0 : !1
}

function is_opera() {
    return -1 != navigator.userAgent.indexOf("Opera") ? !0 : !1
}

function is_chrome() {
    return -1 < navigator.userAgent.toLowerCase().indexOf("chrome")
}

function is_safari() {
    return 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")
}

function version_ie() {
    return parseFloat(navigator.appVersion.split("MSIE")[1])
}

function version_firefox() {
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) return new Number(RegExp.$1)
}

function version_opera() {
    if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) return new Number(RegExp.$1)
}

function is_ie8() {
    return is_ie() && 9 > version_ie() ? !0 : !1
}

function is_ie9() {
    return is_ie() && 9 == version_ie() ? !0 : !1
}

function can_play_mp3() {
    var c = document.createElement("audio");
    return !(!c.canPlayType || !c.canPlayType("audio/mpeg;").replace(/no/, ""))
}

function can_canvas() {
    return document.createElement("canvas").getContext("2d") ? !0 : !1
}

function onYouTubeIframeAPIReady() {
    for (i = 0; i < dzsap_list.length; i++) void 0 != dzsap_list[i].get(0) && "undefined" != typeof dzsap_list[i].get(0).fn_yt_ready && dzsap_list[i].get(0).fn_yt_ready()
}
jQuery.fn.textWidth = function() {
    var c = jQuery(this),
        n = c.html();
    "INPUT" == c[0].nodeName && (n = c.val());
    n = '<span class="forcalc">' + n + "</span>";
    jQuery("body").append(n);
    n = jQuery("span.forcalc").last();
    n.css({
        "font-size": c.css("font-size"),
        "font-family": c.css("font-family")
    });
    c = n.width();
    n.remove();
    return c
};
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(c, n) {
        window.setTimeout(c, 1E3 / 60)
    }
}();
var MD5 = function(c) {
    function n(a, c) {
        var e, g, k, l, n;
        k = a & 2147483648;
        l = c & 2147483648;
        e = a & 1073741824;
        g = c & 1073741824;
        n = (a & 1073741823) + (c & 1073741823);
        return e & g ? n ^ 2147483648 ^ k ^ l : e | g ? n & 1073741824 ? n ^ 3221225472 ^ k ^ l : n ^ 1073741824 ^ k ^ l : n ^ k ^ l
    }

    function a(a, c, e, g, k, l, p) {
        a = n(a, n(n(c & e | ~c & g, k), p));
        return n(a << l | a >>> 32 - l, c)
    }

    function u(a, c, e, g, k, l, p) {
        a = n(a, n(n(c & g | e & ~g, k), p));
        return n(a << l | a >>> 32 - l, c)
    }

    function x(a, c, e, g, k, l, p) {
        a = n(a, n(n(c ^ e ^ g, k), p));
        return n(a << l | a >>> 32 - l, c)
    }

    function y(a, c, e, g, k, l, p) {
        a = n(a, n(n(e ^ (c | ~g),
            k), p));
        return n(a << l | a >>> 32 - l, c)
    }

    function Ca(a) {
        var c = "",
            e, g;
        for (g = 0; 3 >= g; g++) e = a >>> 8 * g & 255, e = "0" + e.toString(16), c += e.substr(e.length - 2, 2);
        return c
    }
    var p = [],
        Ma, Ya, Na, ta, k, e, l, g;
    c = function(a) {
        a = a.replace(/\r\n/g, "\n");
        for (var c = "", e = 0; e < a.length; e++) {
            var g = a.charCodeAt(e);
            128 > g ? c += String.fromCharCode(g) : (127 < g && 2048 > g ? c += String.fromCharCode(g >> 6 | 192) : (c += String.fromCharCode(g >> 12 | 224), c += String.fromCharCode(g >> 6 & 63 | 128)), c += String.fromCharCode(g & 63 | 128))
        }
        return c
    }(c);
    p = function(a) {
        var c, e = a.length;
        c = e + 8;
        for (var g = 16 * ((c - c % 64) / 64 + 1), k = Array(g - 1), l, n = 0; n < e;) c = (n - n % 4) / 4, l = n % 4 * 8, k[c] |= a.charCodeAt(n) << l, n++;
        c = (n - n % 4) / 4;
        k[c] |= 128 << n % 4 * 8;
        k[g - 2] = e << 3;
        k[g - 1] = e >>> 29;
        return k
    }(c);
    k = 1732584193;
    e = 4023233417;
    l = 2562383102;
    g = 271733878;
    for (c = 0; c < p.length; c += 16) Ma = k, Ya = e, Na = l, ta = g, k = a(k, e, l, g, p[c + 0], 7, 3614090360), g = a(g, k, e, l, p[c + 1], 12, 3905402710), l = a(l, g, k, e, p[c + 2], 17, 606105819), e = a(e, l, g, k, p[c + 3], 22, 3250441966), k = a(k, e, l, g, p[c + 4], 7, 4118548399), g = a(g, k, e, l, p[c + 5], 12, 1200080426), l = a(l, g, k, e, p[c + 6], 17, 2821735955),
        e = a(e, l, g, k, p[c + 7], 22, 4249261313), k = a(k, e, l, g, p[c + 8], 7, 1770035416), g = a(g, k, e, l, p[c + 9], 12, 2336552879), l = a(l, g, k, e, p[c + 10], 17, 4294925233), e = a(e, l, g, k, p[c + 11], 22, 2304563134), k = a(k, e, l, g, p[c + 12], 7, 1804603682), g = a(g, k, e, l, p[c + 13], 12, 4254626195), l = a(l, g, k, e, p[c + 14], 17, 2792965006), e = a(e, l, g, k, p[c + 15], 22, 1236535329), k = u(k, e, l, g, p[c + 1], 5, 4129170786), g = u(g, k, e, l, p[c + 6], 9, 3225465664), l = u(l, g, k, e, p[c + 11], 14, 643717713), e = u(e, l, g, k, p[c + 0], 20, 3921069994), k = u(k, e, l, g, p[c + 5], 5, 3593408605), g = u(g, k, e, l, p[c + 10], 9, 38016083),
        l = u(l, g, k, e, p[c + 15], 14, 3634488961), e = u(e, l, g, k, p[c + 4], 20, 3889429448), k = u(k, e, l, g, p[c + 9], 5, 568446438), g = u(g, k, e, l, p[c + 14], 9, 3275163606), l = u(l, g, k, e, p[c + 3], 14, 4107603335), e = u(e, l, g, k, p[c + 8], 20, 1163531501), k = u(k, e, l, g, p[c + 13], 5, 2850285829), g = u(g, k, e, l, p[c + 2], 9, 4243563512), l = u(l, g, k, e, p[c + 7], 14, 1735328473), e = u(e, l, g, k, p[c + 12], 20, 2368359562), k = x(k, e, l, g, p[c + 5], 4, 4294588738), g = x(g, k, e, l, p[c + 8], 11, 2272392833), l = x(l, g, k, e, p[c + 11], 16, 1839030562), e = x(e, l, g, k, p[c + 14], 23, 4259657740), k = x(k, e, l, g, p[c + 1], 4, 2763975236),
        g = x(g, k, e, l, p[c + 4], 11, 1272893353), l = x(l, g, k, e, p[c + 7], 16, 4139469664), e = x(e, l, g, k, p[c + 10], 23, 3200236656), k = x(k, e, l, g, p[c + 13], 4, 681279174), g = x(g, k, e, l, p[c + 0], 11, 3936430074), l = x(l, g, k, e, p[c + 3], 16, 3572445317), e = x(e, l, g, k, p[c + 6], 23, 76029189), k = x(k, e, l, g, p[c + 9], 4, 3654602809), g = x(g, k, e, l, p[c + 12], 11, 3873151461), l = x(l, g, k, e, p[c + 15], 16, 530742520), e = x(e, l, g, k, p[c + 2], 23, 3299628645), k = y(k, e, l, g, p[c + 0], 6, 4096336452), g = y(g, k, e, l, p[c + 7], 10, 1126891415), l = y(l, g, k, e, p[c + 14], 15, 2878612391), e = y(e, l, g, k, p[c + 5], 21, 4237533241),
        k = y(k, e, l, g, p[c + 12], 6, 1700485571), g = y(g, k, e, l, p[c + 3], 10, 2399980690), l = y(l, g, k, e, p[c + 10], 15, 4293915773), e = y(e, l, g, k, p[c + 1], 21, 2240044497), k = y(k, e, l, g, p[c + 8], 6, 1873313359), g = y(g, k, e, l, p[c + 15], 10, 4264355552), l = y(l, g, k, e, p[c + 6], 15, 2734768916), e = y(e, l, g, k, p[c + 13], 21, 1309151649), k = y(k, e, l, g, p[c + 4], 6, 4149444226), g = y(g, k, e, l, p[c + 11], 10, 3174756917), l = y(l, g, k, e, p[c + 2], 15, 718787259), e = y(e, l, g, k, p[c + 9], 21, 3951481745), k = n(k, Ma), e = n(e, Ya), l = n(l, Na), g = n(g, ta);
    return (Ca(k) + Ca(e) + Ca(l) + Ca(g)).toLowerCase()
};

function formatTime(c) {
    c = Math.round(c);
    var n = 0;
    if (0 < c) {
        for (; 59 < c;) n++, c -= 60;
        return String((10 > n ? "0" : "") + n + ":" + (10 > c ? "0" : "") + c)
    }
    return "00:00"
};