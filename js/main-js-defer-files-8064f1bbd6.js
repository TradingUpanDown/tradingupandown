!function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(a) {
    "use strict";
    var o, r = window.Slick || {};
    o = 0,
    (r = function(i, e) {
        var t = this;
        t.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: a(i),
            appendDots: a(i),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><span class="icon-chevron-left"></span></button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button"><span class="icon-chevron-right"></span></button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(i, e) {
                return a('<button type="button" />').text(e + 1)
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        },
        t.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        },
        a.extend(t, t.initials),
        t.activeBreakpoint = null,
        t.animType = null,
        t.animProp = null,
        t.breakpoints = [],
        t.breakpointSettings = [],
        t.cssTransitions = !1,
        t.focussed = !1,
        t.interrupted = !1,
        t.hidden = "hidden",
        t.paused = !0,
        t.positionProp = null,
        t.respondTo = null,
        t.rowCount = 1,
        t.shouldClick = !0,
        t.$slider = a(i),
        t.$slidesCache = null,
        t.transformType = null,
        t.transitionType = null,
        t.visibilityChange = "visibilitychange",
        t.windowWidth = 0,
        t.windowTimer = null,
        i = a(i).data("slick") || {},
        t.options = a.extend({}, t.defaults, e, i),
        t.currentSlide = t.options.initialSlide,
        t.originalSettings = t.options,
        void 0 !== document.mozHidden ? (t.hidden = "mozHidden",
        t.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (t.hidden = "webkitHidden",
        t.visibilityChange = "webkitvisibilitychange"),
        t.autoPlay = a.proxy(t.autoPlay, t),
        t.autoPlayClear = a.proxy(t.autoPlayClear, t),
        t.autoPlayIterator = a.proxy(t.autoPlayIterator, t),
        t.changeSlide = a.proxy(t.changeSlide, t),
        t.clickHandler = a.proxy(t.clickHandler, t),
        t.selectHandler = a.proxy(t.selectHandler, t),
        t.setPosition = a.proxy(t.setPosition, t),
        t.swipeHandler = a.proxy(t.swipeHandler, t),
        t.dragHandler = a.proxy(t.dragHandler, t),
        t.keyHandler = a.proxy(t.keyHandler, t),
        t.instanceUid = o++,
        t.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
        t.registerBreakpoints(),
        t.init(!0)
    }
    ).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    r.prototype.addSlide = r.prototype.slickAdd = function(i, e, t) {
        var o = this;
        if ("boolean" == typeof e)
            t = e,
            e = null;
        else if (e < 0 || e >= o.slideCount)
            return !1;
        o.unload(),
        "number" == typeof e ? 0 === e && 0 === o.$slides.length ? a(i).appendTo(o.$slideTrack) : t ? a(i).insertBefore(o.$slides.eq(e)) : a(i).insertAfter(o.$slides.eq(e)) : !0 === t ? a(i).prependTo(o.$slideTrack) : a(i).appendTo(o.$slideTrack),
        o.$slides = o.$slideTrack.children(this.options.slide),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        o.$slides.each(function(i, e) {
            a(e).attr("data-slick-index", i)
        }),
        o.$slidesCache = o.$slides,
        o.reinit()
    }
    ,
    r.prototype.animateHeight = function() {
        var i, e = this;
        1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical && (i = e.$slides.eq(e.currentSlide).outerHeight(!0),
        e.$list.animate({
            height: i
        }, e.options.speed))
    }
    ,
    r.prototype.animateSlide = function(i, e) {
        var t = {}
          , o = this;
        o.animateHeight(),
        !0 === o.options.rtl && !1 === o.options.vertical && (i = -i),
        !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: i
        }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
            top: i
        }, o.options.speed, o.options.easing, e) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
        a({
            animStart: o.currentLeft
        }).animate({
            animStart: i
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(i) {
                i = Math.ceil(i),
                !1 === o.options.vertical ? t[o.animType] = "translate(" + i + "px, 0px)" : t[o.animType] = "translate(0px," + i + "px)",
                o.$slideTrack.css(t)
            },
            complete: function() {
                e && e.call()
            }
        })) : (o.applyTransition(),
        i = Math.ceil(i),
        !1 === o.options.vertical ? t[o.animType] = "translate3d(" + i + "px, 0px, 0px)" : t[o.animType] = "translate3d(0px," + i + "px, 0px)",
        o.$slideTrack.css(t),
        e && setTimeout(function() {
            o.disableTransition(),
            e.call()
        }, o.options.speed))
    }
    ,
    r.prototype.getNavTarget = function() {
        var i = this.options.asNavFor;
        return i = i && null !== i ? a(i).not(this.$slider) : i
    }
    ,
    r.prototype.asNavFor = function(e) {
        var i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var i = a(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }
    ,
    r.prototype.applyTransition = function(i) {
        var e = this
          , t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
        (!1 === e.options.fade ? e.$slideTrack : e.$slides.eq(i)).css(t)
    }
    ,
    r.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }
    ,
    r.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }
    ,
    r.prototype.autoPlayIterator = function() {
        var i = this
          , e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll,
        i.currentSlide - 1 == 0) && (i.direction = 1)),
        i.slideHandler(e))
    }
    ,
    r.prototype.buildArrows = function() {
        var i = this;
        !0 === i.options.arrows && (i.$prevArrow = a(i.options.prevArrow).addClass("slick-arrow"),
        i.$nextArrow = a(i.options.nextArrow).addClass("slick-arrow"),
        i.slideCount > i.options.slidesToShow ? (i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.prependTo(i.options.appendArrows),
        i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.appendTo(i.options.appendArrows),
        !0 !== i.options.infinite && i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    r.prototype.buildDots = function() {
        var i, e, t = this;
        if (!0 === t.options.dots && t.slideCount > t.options.slidesToShow) {
            for (t.$slider.addClass("slick-dotted"),
            e = a("<ul />").addClass(t.options.dotsClass),
            i = 0; i <= t.getDotCount(); i += 1)
                e.append(a("<li />").append(t.options.customPaging.call(this, t, i)));
            t.$dots = e.appendTo(t.options.appendDots),
            t.$dots.find("li").first().addClass("slick-active")
        }
    }
    ,
    r.prototype.buildOut = function() {
        var i = this;
        i.$slides = i.$slider.children(i.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        i.slideCount = i.$slides.length,
        i.$slides.each(function(i, e) {
            a(e).attr("data-slick-index", i).data("originalStyling", a(e).attr("style") || "")
        }),
        i.$slider.addClass("slick-slider"),
        i.$slideTrack = 0 === i.slideCount ? a('<div class="slick-track"/>').appendTo(i.$slider) : i.$slides.wrapAll('<div class="slick-track"/>').parent(),
        i.$list = i.$slideTrack.wrap('<div class="slick-list"/>').parent(),
        i.$slideTrack.css("opacity", 0),
        !0 !== i.options.centerMode && !0 !== i.options.swipeToSlide || (i.options.slidesToScroll = 1),
        a("img[data-lazy]", i.$slider).not("[src]").addClass("slick-loading"),
        i.setupInfinite(),
        i.buildArrows(),
        i.buildDots(),
        i.updateDots(),
        i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0),
        !0 === i.options.draggable && i.$list.addClass("draggable")
    }
    ,
    r.prototype.buildRows = function() {
        var i, e, t, o = this, s = document.createDocumentFragment(), n = o.$slider.children();
        if (0 < o.options.rows) {
            for (t = o.options.slidesPerRow * o.options.rows,
            e = Math.ceil(n.length / t),
            i = 0; i < e; i++) {
                for (var r = document.createElement("div"), l = 0; l < o.options.rows; l++) {
                    for (var d = document.createElement("div"), a = 0; a < o.options.slidesPerRow; a++) {
                        var c = i * t + (l * o.options.slidesPerRow + a);
                        n.get(c) && d.appendChild(n.get(c))
                    }
                    r.appendChild(d)
                }
                s.appendChild(r)
            }
            o.$slider.empty().append(s),
            o.$slider.children().children().children().css({
                width: 100 / o.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    r.prototype.checkResponsive = function(i, e) {
        var t, o, s, n = this, r = !1, l = n.$slider.width(), d = window.innerWidth || a(window).width();
        if ("window" === n.respondTo ? s = d : "slider" === n.respondTo ? s = l : "min" === n.respondTo && (s = Math.min(d, l)),
        n.options.responsive && n.options.responsive.length && null !== n.options.responsive) {
            for (t in o = null,
            n.breakpoints)
                n.breakpoints.hasOwnProperty(t) && (!1 === n.originalSettings.mobileFirst ? s < n.breakpoints[t] && (o = n.breakpoints[t]) : s > n.breakpoints[t] && (o = n.breakpoints[t]));
            null !== o ? null !== n.activeBreakpoint && o === n.activeBreakpoint && !e || (n.activeBreakpoint = o,
            "unslick" === n.breakpointSettings[o] ? n.unslick(o) : (n.options = a.extend({}, n.originalSettings, n.breakpointSettings[o]),
            !0 === i && (n.currentSlide = n.options.initialSlide),
            n.refresh(i)),
            r = o) : null !== n.activeBreakpoint && (n.activeBreakpoint = null,
            n.options = n.originalSettings,
            !0 === i && (n.currentSlide = n.options.initialSlide),
            n.refresh(i),
            r = o),
            i || !1 === r || n.$slider.trigger("breakpoint", [n, r])
        }
    }
    ,
    r.prototype.changeSlide = function(i, e) {
        var t, o = this, s = a(i.currentTarget);
        switch (s.is("a") && i.preventDefault(),
        s.is("li") || (s = s.closest("li")),
        t = o.slideCount % o.options.slidesToScroll != 0 ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll,
        i.data.message) {
        case "previous":
            n = 0 == t ? o.options.slidesToScroll : o.options.slidesToShow - t,
            o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - n, !1, e);
            break;
        case "next":
            n = 0 == t ? o.options.slidesToScroll : t,
            o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + n, !1, e);
            break;
        case "index":
            var n = 0 === i.data.index ? 0 : i.data.index || s.index() * o.options.slidesToScroll;
            o.slideHandler(o.checkNavigable(n), !1, e),
            s.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    r.prototype.checkNavigable = function(i) {
        var e = this.getNavigableIndexes()
          , t = 0;
        if (i > e[e.length - 1])
            i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }
    ,
    r.prototype.cleanUpEvents = function() {
        var i = this;
        i.options.dots && null !== i.$dots && (a("li", i.$dots).off("click.slick", i.changeSlide).off("mouseenter.slick", a.proxy(i.interrupt, i, !0)).off("mouseleave.slick", a.proxy(i.interrupt, i, !1)),
        !0 === i.options.accessibility) && i.$dots.off("keydown.slick", i.keyHandler),
        i.$slider.off("focus.slick blur.slick"),
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide),
        i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide),
        !0 === i.options.accessibility) && (i.$prevArrow && i.$prevArrow.off("keydown.slick", i.keyHandler),
        i.$nextArrow) && i.$nextArrow.off("keydown.slick", i.keyHandler),
        i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler),
        i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler),
        i.$list.off("touchend.slick mouseup.slick", i.swipeHandler),
        i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler),
        i.$list.off("click.slick", i.clickHandler),
        a(document).off(i.visibilityChange, i.visibility),
        i.cleanUpSlideEvents(),
        !0 === i.options.accessibility && i.$list.off("keydown.slick", i.keyHandler),
        !0 === i.options.focusOnSelect && a(i.$slideTrack).children().off("click.slick", i.selectHandler),
        a(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange),
        a(window).off("resize.slick.slick-" + i.instanceUid, i.resize),
        a("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault),
        a(window).off("load.slick.slick-" + i.instanceUid, i.setPosition)
    }
    ,
    r.prototype.cleanUpSlideEvents = function() {
        var i = this;
        i.$list.off("mouseenter.slick", a.proxy(i.interrupt, i, !0)),
        i.$list.off("mouseleave.slick", a.proxy(i.interrupt, i, !1))
    }
    ,
    r.prototype.cleanUpRows = function() {
        var i;
        0 < this.options.rows && ((i = this.$slides.children().children()).removeAttr("style"),
        this.$slider.empty().append(i))
    }
    ,
    r.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(),
        i.stopPropagation(),
        i.preventDefault())
    }
    ,
    r.prototype.destroy = function(i) {
        var e = this;
        e.autoPlayClear(),
        e.touchObject = {},
        e.cleanUpEvents(),
        a(".slick-cloned", e.$slider).detach(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        e.htmlExpr.test(e.options.prevArrow)) && e.$prevArrow.remove(),
        e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        e.htmlExpr.test(e.options.nextArrow)) && e.$nextArrow.remove(),
        e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            a(this).attr("style", a(this).data("originalStyling"))
        }),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slideTrack.detach(),
        e.$list.detach(),
        e.$slider.append(e.$slides)),
        e.cleanUpRows(),
        e.$slider.removeClass("slick-slider"),
        e.$slider.removeClass("slick-initialized"),
        e.$slider.removeClass("slick-dotted"),
        e.unslicked = !0,
        i || e.$slider.trigger("destroy", [e])
    }
    ,
    r.prototype.disableTransition = function(i) {
        var e = {};
        e[this.transitionType] = "",
        (!1 === this.options.fade ? this.$slideTrack : this.$slides.eq(i)).css(e)
    }
    ,
    r.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }),
        t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i),
        t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }),
        e && setTimeout(function() {
            t.disableTransition(i),
            e.call()
        }, t.options.speed))
    }
    ,
    r.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i),
        e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }
    ,
    r.prototype.filterSlides = r.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides,
        e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.filter(i).appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    r.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(i) {
            var e = a(this);
            setTimeout(function() {
                t.options.pauseOnFocus && e.is(":focus") && (t.focussed = !0,
                t.autoPlay())
            }, 0)
        }).on("blur.slick", "*", function(i) {
            a(this);
            t.options.pauseOnFocus && (t.focussed = !1,
            t.autoPlay())
        })
    }
    ,
    r.prototype.getCurrent = r.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }
    ,
    r.prototype.getDotCount = function() {
        var i = this
          , e = 0
          , t = 0
          , o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow)
                ++o;
            else
                for (; e < i.slideCount; )
                    ++o,
                    e = t + i.options.slidesToScroll,
                    t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode)
            o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount; )
                ++o,
                e = t + i.options.slidesToScroll,
                t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else
            o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }
    ,
    r.prototype.getLeft = function(i) {
        var e, t, o = this, s = 0;
        return o.slideOffset = 0,
        e = o.$slides.first().outerHeight(!0),
        !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1,
        t = -1,
        !0 === o.options.vertical && !0 === o.options.centerMode && (2 === o.options.slidesToShow ? t = -1.5 : 1 === o.options.slidesToShow && (t = -2)),
        s = e * o.options.slidesToShow * t),
        o.slideCount % o.options.slidesToScroll != 0 && i + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (s = i > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (i - o.slideCount)) * o.slideWidth * -1,
        (o.options.slidesToShow - (i - o.slideCount)) * e * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1,
        o.slideCount % o.options.slidesToScroll * e * -1))) : i + o.options.slidesToShow > o.slideCount && (o.slideOffset = (i + o.options.slidesToShow - o.slideCount) * o.slideWidth,
        s = (i + o.options.slidesToShow - o.slideCount) * e),
        o.slideCount <= o.options.slidesToShow && (s = o.slideOffset = 0),
        !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow ? o.slideOffset = o.slideWidth * Math.floor(o.options.slidesToShow) / 2 - o.slideWidth * o.slideCount / 2 : !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0,
        o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)),
        t = !1 === o.options.vertical ? i * o.slideWidth * -1 + o.slideOffset : i * e * -1 + s,
        !0 === o.options.variableWidth && (e = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(i) : o.$slideTrack.children(".slick-slide").eq(i + o.options.slidesToShow),
        t = !0 === o.options.rtl ? e[0] ? -1 * (o.$slideTrack.width() - e[0].offsetLeft - e.width()) : 0 : e[0] ? -1 * e[0].offsetLeft : 0,
        !0 === o.options.centerMode) && (e = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(i) : o.$slideTrack.children(".slick-slide").eq(i + o.options.slidesToShow + 1),
        t = !0 === o.options.rtl ? e[0] ? -1 * (o.$slideTrack.width() - e[0].offsetLeft - e.width()) : 0 : e[0] ? -1 * e[0].offsetLeft : 0,
        t += (o.$list.width() - e.outerWidth()) / 2),
        t
    }
    ,
    r.prototype.getOption = r.prototype.slickGetOption = function(i) {
        return this.options[i]
    }
    ,
    r.prototype.getNavigableIndexes = function() {
        for (var i = this, e = 0, t = 0, o = [], s = !1 === i.options.infinite ? i.slideCount : (e = -1 * i.options.slidesToScroll,
        t = -1 * i.options.slidesToScroll,
        2 * i.slideCount); e < s; )
            o.push(e),
            e = t + i.options.slidesToScroll,
            t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        return o
    }
    ,
    r.prototype.getSlick = function() {
        return this
    }
    ,
    r.prototype.getSlideCount = function() {
        var s, n = this, i = !0 === n.options.centerMode ? Math.floor(n.$list.width() / 2) : 0, r = -1 * n.swipeLeft + i;
        return !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(i, e) {
            var t = a(e).outerWidth()
              , o = e.offsetLeft;
            if (!0 !== n.options.centerMode && (o += t / 2),
            r < o + t)
                return s = e,
                !1
        }),
        Math.abs(a(s).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }
    ,
    r.prototype.goTo = r.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }
    ,
    r.prototype.init = function(i) {
        var e = this;
        a(e.$slider).hasClass("slick-initialized") || (a(e.$slider).addClass("slick-initialized"),
        e.buildRows(),
        e.buildOut(),
        e.setProps(),
        e.startLoad(),
        e.loadSlider(),
        e.initializeEvents(),
        e.updateArrows(),
        e.updateDots(),
        e.checkResponsive(!0),
        e.focusHandler()),
        i && e.$slider.trigger("init", [e]),
        !0 === e.options.accessibility && e.initADA(),
        e.options.autoplay && (e.paused = !1,
        e.autoPlay())
    }
    ,
    r.prototype.initADA = function() {
        var t = this
          , o = Math.ceil(t.slideCount / t.options.slidesToShow)
          , s = t.getNavigableIndexes().filter(function(i) {
            return 0 <= i && i < t.slideCount
        });
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
            var e = s.indexOf(i);
            a(this).attr({
                role: "tabpanel",
                id: "slick-slide" + t.instanceUid + i,
                tabindex: -1
            }),
            -1 !== e && (i = "slick-slide-control" + t.instanceUid + e,
            a("#" + i).length) && a(this).attr({
                "aria-describedby": i
            })
        }),
        t.$dots.attr("role", "tablist").find("li").each(function(i) {
            var e = s[i];
            a(this).attr({
                role: "presentation"
            }),
            a(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + t.instanceUid + i,
                "aria-controls": "slick-slide" + t.instanceUid + e,
                "aria-label": i + 1 + " of " + o,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(t.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var i = t.currentSlide, e = i + t.options.slidesToShow; i < e; i++)
            t.options.focusOnChange ? t.$slides.eq(i).attr({
                tabindex: "0"
            }) : t.$slides.eq(i).removeAttr("tabindex");
        t.activateADA()
    }
    ,
    r.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide),
        i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide),
        !0 === i.options.accessibility) && (i.$prevArrow.on("keydown.slick", i.keyHandler),
        i.$nextArrow.on("keydown.slick", i.keyHandler))
    }
    ,
    r.prototype.initDotEvents = function() {
        var i = this;
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && (a("li", i.$dots).on("click.slick", {
            message: "index"
        }, i.changeSlide),
        !0 === i.options.accessibility) && i.$dots.on("keydown.slick", i.keyHandler),
        !0 === i.options.dots && !0 === i.options.pauseOnDotsHover && i.slideCount > i.options.slidesToShow && a("li", i.$dots).on("mouseenter.slick", a.proxy(i.interrupt, i, !0)).on("mouseleave.slick", a.proxy(i.interrupt, i, !1))
    }
    ,
    r.prototype.initSlideEvents = function() {
        var i = this;
        i.options.pauseOnHover && (i.$list.on("mouseenter.slick", a.proxy(i.interrupt, i, !0)),
        i.$list.on("mouseleave.slick", a.proxy(i.interrupt, i, !1)))
    }
    ,
    r.prototype.initializeEvents = function() {
        var i = this;
        i.initArrowEvents(),
        i.initDotEvents(),
        i.initSlideEvents(),
        i.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, i.swipeHandler),
        i.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, i.swipeHandler),
        i.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, i.swipeHandler),
        i.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, i.swipeHandler),
        i.$list.on("click.slick", i.clickHandler),
        a(document).on(i.visibilityChange, a.proxy(i.visibility, i)),
        !0 === i.options.accessibility && i.$list.on("keydown.slick", i.keyHandler),
        !0 === i.options.focusOnSelect && a(i.$slideTrack).children().on("click.slick", i.selectHandler),
        a(window).on("orientationchange.slick.slick-" + i.instanceUid, a.proxy(i.orientationChange, i)),
        a(window).on("resize.slick.slick-" + i.instanceUid, a.proxy(i.resize, i)),
        a("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault),
        a(window).on("load.slick.slick-" + i.instanceUid, i.setPosition),
        a(i.setPosition)
    }
    ,
    r.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(),
        i.$nextArrow.show()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }
    ,
    r.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }
    ,
    r.prototype.lazyLoad = function() {
        var i, e, t, n = this;
        function o(i) {
            a("img[data-lazy]", i).each(function() {
                var i = a(this)
                  , e = a(this).attr("data-lazy")
                  , t = a(this).attr("data-srcset")
                  , o = a(this).attr("data-sizes") || n.$slider.attr("data-sizes")
                  , s = document.createElement("img");
                s.onload = function() {
                    i.animate({
                        opacity: 0
                    }, 100, function() {
                        t && (i.attr("srcset", t),
                        o) && i.attr("sizes", o),
                        i.attr("src", e).animate({
                            opacity: 1
                        }, 200, function() {
                            i.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }),
                        n.$slider.trigger("lazyLoaded", [n, i, e])
                    })
                }
                ,
                s.onerror = function() {
                    i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    n.$slider.trigger("lazyLoadError", [n, i, e])
                }
                ,
                s.src = e
            })
        }
        if (!0 === n.options.centerMode ? t = !0 === n.options.infinite ? (e = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (e = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)),
        n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (e = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide,
        t = Math.ceil(e + n.options.slidesToShow),
        !0 === n.options.fade && (0 < e && e--,
        t <= n.slideCount) && t++),
        i = n.$slider.find(".slick-slide").slice(e, t),
        "anticipated" === n.options.lazyLoad)
            for (var s = e - 1, r = t, l = n.$slider.find(".slick-slide"), d = 0; d < n.options.slidesToScroll; d++)
                s < 0 && (s = n.slideCount - 1),
                i = (i = i.add(l.eq(s))).add(l.eq(r)),
                s--,
                r++;
        o(i),
        n.slideCount <= n.options.slidesToShow ? o(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? o(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && o(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }
    ,
    r.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(),
        i.$slideTrack.css({
            opacity: 1
        }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }
    ,
    r.prototype.next = r.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    r.prototype.orientationChange = function() {
        this.checkResponsive(),
        this.setPosition()
    }
    ,
    r.prototype.pause = r.prototype.slickPause = function() {
        this.autoPlayClear(),
        this.paused = !0
    }
    ,
    r.prototype.play = r.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(),
        i.options.autoplay = !0,
        i.paused = !1,
        i.focussed = !1,
        i.interrupted = !1
    }
    ,
    r.prototype.postSlide = function(i) {
        var e = this;
        e.unslicked || (e.$slider.trigger("afterChange", [e, i]),
        e.animating = !1,
        e.slideCount > e.options.slidesToShow && e.setPosition(),
        e.swipeLeft = null,
        e.options.autoplay && e.autoPlay(),
        !0 === e.options.accessibility && (e.initADA(),
        e.options.focusOnChange) && a(e.$slides.get(e.currentSlide)).attr("tabindex", 0).focus())
    }
    ,
    r.prototype.prev = r.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    r.prototype.preventDefault = function(i) {
        i.preventDefault()
    }
    ,
    r.prototype.progressiveLazyLoad = function(i) {
        i = i || 1;
        var e, t, o, s, n = this, r = a("img[data-lazy]", n.$slider);
        r.length ? (e = r.first(),
        t = e.attr("data-lazy"),
        o = e.attr("data-srcset"),
        s = e.attr("data-sizes") || n.$slider.attr("data-sizes"),
        (r = document.createElement("img")).onload = function() {
            o && (e.attr("srcset", o),
            s) && e.attr("sizes", s),
            e.attr("src", t).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
            !0 === n.options.adaptiveHeight && n.setPosition(),
            n.$slider.trigger("lazyLoaded", [n, e, t]),
            n.progressiveLazyLoad()
        }
        ,
        r.onerror = function() {
            i < 3 ? setTimeout(function() {
                n.progressiveLazyLoad(i + 1)
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            n.$slider.trigger("lazyLoadError", [n, e, t]),
            n.progressiveLazyLoad())
        }
        ,
        r.src = t) : n.$slider.trigger("allImagesLoaded", [n])
    }
    ,
    r.prototype.refresh = function(i) {
        var e = this
          , t = e.slideCount - e.options.slidesToShow;
        !e.options.infinite && e.currentSlide > t && (e.currentSlide = t),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        t = e.currentSlide,
        e.destroy(!0),
        a.extend(e, e.initials, {
            currentSlide: t
        }),
        e.init(),
        i || e.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }
    ,
    r.prototype.registerBreakpoints = function() {
        var i, e, t, o = this, s = o.options.responsive || null;
        if ("array" === a.type(s) && s.length) {
            for (i in o.respondTo = o.options.respondTo || "window",
            s)
                if (t = o.breakpoints.length - 1,
                s.hasOwnProperty(i)) {
                    for (e = s[i].breakpoint; 0 <= t; )
                        o.breakpoints[t] && o.breakpoints[t] === e && o.breakpoints.splice(t, 1),
                        t--;
                    o.breakpoints.push(e),
                    o.breakpointSettings[e] = s[i].settings
                }
            o.breakpoints.sort(function(i, e) {
                return o.options.mobileFirst ? i - e : e - i
            })
        }
    }
    ,
    r.prototype.reinit = function() {
        var i = this;
        i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide"),
        i.slideCount = i.$slides.length,
        i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll),
        i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0),
        i.registerBreakpoints(),
        i.setProps(),
        i.setupInfinite(),
        i.buildArrows(),
        i.updateArrows(),
        i.initArrowEvents(),
        i.buildDots(),
        i.updateDots(),
        i.initDotEvents(),
        i.cleanUpSlideEvents(),
        i.initSlideEvents(),
        i.checkResponsive(!1, !0),
        !0 === i.options.focusOnSelect && a(i.$slideTrack).children().on("click.slick", i.selectHandler),
        i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0),
        i.setPosition(),
        i.focusHandler(),
        i.paused = !i.options.autoplay,
        i.autoPlay(),
        i.$slider.trigger("reInit", [i])
    }
    ,
    r.prototype.resize = function() {
        var i = this;
        a(window).width() !== i.windowWidth && (clearTimeout(i.windowDelay),
        i.windowDelay = window.setTimeout(function() {
            i.windowWidth = a(window).width(),
            i.checkResponsive(),
            i.unslicked || i.setPosition()
        }, 50))
    }
    ,
    r.prototype.removeSlide = r.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i,
        o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
            return !1;
        o.unload(),
        (!0 === t ? o.$slideTrack.children() : o.$slideTrack.children(this.options.slide).eq(i)).remove(),
        o.$slides = o.$slideTrack.children(this.options.slide),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        o.$slidesCache = o.$slides,
        o.reinit()
    }
    ,
    r.prototype.setCSS = function(i) {
        var e, t, o = this, s = {};
        !0 === o.options.rtl && (i = -i),
        e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        s[o.positionProp] = i,
        !1 !== o.transformsEnabled && (!(s = {}) === o.cssTransitions ? s[o.animType] = "translate(" + e + ", " + t + ")" : s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
        o.$slideTrack.css(s)
    }
    ,
    r.prototype.setDimensions = function() {
        var i = this
          , e = (!1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow),
        !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })),
        i.listWidth = i.$list.width(),
        i.listHeight = i.$list.height(),
        !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow),
        i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth),
        i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length))),
        i.$slides.first().outerWidth(!0) - i.$slides.first().width());
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }
    ,
    r.prototype.setFade = function() {
        var t, o = this;
        o.$slides.each(function(i, e) {
            t = o.slideWidth * i * -1,
            !0 === o.options.rtl ? a(e).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            })
        }),
        o.$slides.eq(o.currentSlide).css({
            zIndex: o.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    r.prototype.setHeight = function() {
        var i, e = this;
        1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical && (i = e.$slides.eq(e.currentSlide).outerHeight(!0),
        e.$list.css("height", i))
    }
    ,
    r.prototype.setOption = r.prototype.slickSetOption = function() {
        var i, e, t, o, s, n = this, r = !1;
        if ("object" === a.type(arguments[0]) ? (t = arguments[0],
        r = arguments[1],
        s = "multiple") : "string" === a.type(arguments[0]) && (t = arguments[0],
        o = arguments[1],
        r = arguments[2],
        "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")),
        "single" === s)
            n.options[t] = o;
        else if ("multiple" === s)
            a.each(t, function(i, e) {
                n.options[i] = e
            });
        else if ("responsive" === s)
            for (e in o)
                if ("array" !== a.type(n.options.responsive))
                    n.options.responsive = [o[e]];
                else {
                    for (i = n.options.responsive.length - 1; 0 <= i; )
                        n.options.responsive[i].breakpoint === o[e].breakpoint && n.options.responsive.splice(i, 1),
                        i--;
                    n.options.responsive.push(o[e])
                }
        r && (n.unload(),
        n.reinit())
    }
    ,
    r.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(),
        i.$slider.trigger("setPosition", [i])
    }
    ,
    r.prototype.setProps = function() {
        var i = this
          , e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left",
        "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"),
        void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0),
        i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex),
        void 0 !== e.OTransform && (i.animType = "OTransform",
        i.transformType = "-o-transform",
        i.transitionType = "OTransition",
        void 0 === e.perspectiveProperty) && void 0 === e.webkitPerspective && (i.animType = !1),
        void 0 !== e.MozTransform && (i.animType = "MozTransform",
        i.transformType = "-moz-transform",
        i.transitionType = "MozTransition",
        void 0 === e.perspectiveProperty) && void 0 === e.MozPerspective && (i.animType = !1),
        void 0 !== e.webkitTransform && (i.animType = "webkitTransform",
        i.transformType = "-webkit-transform",
        i.transitionType = "webkitTransition",
        void 0 === e.perspectiveProperty) && void 0 === e.webkitPerspective && (i.animType = !1),
        void 0 !== e.msTransform && (i.animType = "msTransform",
        i.transformType = "-ms-transform",
        i.transitionType = "msTransition",
        void 0 === e.msTransform) && (i.animType = !1),
        void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform",
        i.transformType = "transform",
        i.transitionType = "transition"),
        i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }
    ,
    r.prototype.setSlideClasses = function(i) {
        var e, t, o, s = this, n = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
        s.$slides.eq(i).addClass("slick-current"),
        !0 === s.options.centerMode ? (t = s.options.slidesToShow % 2 == 0 ? 1 : 0,
        o = Math.floor(s.options.slidesToShow / 2),
        !0 === s.options.infinite && ((o <= i && i <= s.slideCount - 1 - o ? s.$slides.slice(i - o + t, i + o + 1) : (e = s.options.slidesToShow + i,
        n.slice(e - o + 1 + t, e + o + 2))).addClass("slick-active").attr("aria-hidden", "false"),
        0 === i ? n.eq(s.options.slidesToShow + s.slideCount + 1).addClass("slick-center") : i === s.slideCount - 1 && n.eq(s.options.slidesToShow).addClass("slick-center")),
        s.$slides.eq(i).addClass("slick-center")) : (0 <= i && i <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(i, i + s.options.slidesToShow) : n.length <= s.options.slidesToShow ? n : (t = s.slideCount % s.options.slidesToShow,
        e = !0 === s.options.infinite ? s.options.slidesToShow + i : i,
        s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - i < s.options.slidesToShow ? n.slice(e - (s.options.slidesToShow - t), e + t) : n.slice(e, e + s.options.slidesToShow))).addClass("slick-active").attr("aria-hidden", "false"),
        "ondemand" !== s.options.lazyLoad && "anticipated" !== s.options.lazyLoad || s.lazyLoad()
    }
    ,
    r.prototype.setupInfinite = function() {
        var i, e, t, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1),
        !0 === o.options.infinite && !1 === o.options.fade && (e = null,
        o.slideCount > o.options.slidesToShow)) {
            for (t = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow,
            i = o.slideCount; i > o.slideCount - t; --i)
                a(o.$slides[e = i - 1]).clone(!0).attr("id", "").attr("data-slick-index", e - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (i = 0; i < t + o.slideCount; i += 1)
                e = i,
                a(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                a(this).attr("id", "")
            })
        }
    }
    ,
    r.prototype.interrupt = function(i) {
        i || this.autoPlay(),
        this.interrupted = i
    }
    ,
    r.prototype.selectHandler = function(i) {
        i = a(i.target).is(".slick-slide") ? a(i.target) : a(i.target).parents(".slick-slide"),
        i = (i = parseInt(i.attr("data-slick-index"))) || 0;
        this.slideCount <= this.options.slidesToShow ? this.slideHandler(i, !1, !0) : this.slideHandler(i)
    }
    ,
    r.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r = this;
        e = e || !1,
        !0 === r.animating && !0 === r.options.waitForAnimate || !0 === r.options.fade && r.currentSlide === i || (!1 === e && r.asNavFor(i),
        o = i,
        e = r.getLeft(o),
        n = r.getLeft(r.currentSlide),
        r.currentLeft = null === r.swipeLeft ? n : r.swipeLeft,
        !1 === r.options.infinite && !1 === r.options.centerMode && (i < 0 || i > r.getDotCount() * r.options.slidesToScroll) || !1 === r.options.infinite && !0 === r.options.centerMode && (i < 0 || i > r.slideCount - r.options.slidesToScroll) ? !1 === r.options.fade && (o = r.currentSlide,
        !0 !== t && r.slideCount > r.options.slidesToShow ? r.animateSlide(n, function() {
            r.postSlide(o)
        }) : r.postSlide(o)) : (r.options.autoplay && clearInterval(r.autoPlayTimer),
        s = o < 0 ? r.slideCount % r.options.slidesToScroll != 0 ? r.slideCount - r.slideCount % r.options.slidesToScroll : r.slideCount + o : o >= r.slideCount ? r.slideCount % r.options.slidesToScroll != 0 ? 0 : o - r.slideCount : o,
        r.animating = !0,
        r.$slider.trigger("beforeChange", [r, r.currentSlide, s]),
        i = r.currentSlide,
        r.currentSlide = s,
        r.setSlideClasses(r.currentSlide),
        r.options.asNavFor && (n = (n = r.getNavTarget()).slick("getSlick")).slideCount <= n.options.slidesToShow && n.setSlideClasses(r.currentSlide),
        r.updateDots(),
        r.updateArrows(),
        !0 === r.options.fade ? (!0 !== t ? (r.fadeSlideOut(i),
        r.fadeSlide(s, function() {
            r.postSlide(s)
        })) : r.postSlide(s),
        r.animateHeight()) : !0 !== t && r.slideCount > r.options.slidesToShow ? r.animateSlide(e, function() {
            r.postSlide(s)
        }) : r.postSlide(s)))
    }
    ,
    r.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(),
        i.$nextArrow.hide()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(),
        i.$slider.addClass("slick-loading")
    }
    ,
    r.prototype.swipeDirection = function() {
        var i = this
          , e = i.touchObject.startX - i.touchObject.curX
          , t = i.touchObject.startY - i.touchObject.curY
          , t = Math.atan2(t, e)
          , e = Math.round(180 * t / Math.PI);
        return (e = e < 0 ? 360 - Math.abs(e) : e) <= 45 && 0 <= e || e <= 360 && 315 <= e ? !1 === i.options.rtl ? "left" : "right" : 135 <= e && e <= 225 ? !1 === i.options.rtl ? "right" : "left" : !0 === i.options.verticalSwiping ? 35 <= e && e <= 135 ? "down" : "up" : "vertical"
    }
    ,
    r.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1,
        o.swiping = !1,
        o.scrolling)
            return o.scrolling = !1;
        if (o.interrupted = !1,
        o.shouldClick = !(10 < o.touchObject.swipeLength),
        void 0 === o.touchObject.curX)
            return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
            case "left":
            case "down":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(),
                o.currentDirection = 0;
                break;
            case "right":
            case "up":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(),
                o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e),
            o.touchObject = {},
            o.$slider.trigger("swipe", [o, t]))
        } else
            o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide),
            o.touchObject = {})
    }
    ,
    r.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend"in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse")))
            switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1,
            e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold,
            !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
            i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
            }
    }
    ,
    r.prototype.swipeMove = function(i) {
        var e, t, o = this, s = void 0 !== i.originalEvent ? i.originalEvent.touches : null;
        return !(!o.dragging || o.scrolling || s && 1 !== s.length) && (e = o.getLeft(o.currentSlide),
        o.touchObject.curX = void 0 !== s ? s[0].pageX : i.clientX,
        o.touchObject.curY = void 0 !== s ? s[0].pageY : i.clientY,
        o.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(o.touchObject.curX - o.touchObject.startX, 2))),
        s = Math.round(Math.sqrt(Math.pow(o.touchObject.curY - o.touchObject.startY, 2))),
        !o.options.verticalSwiping && !o.swiping && 4 < s ? !(o.scrolling = !0) : (!0 === o.options.verticalSwiping && (o.touchObject.swipeLength = s),
        s = o.swipeDirection(),
        void 0 !== i.originalEvent && 4 < o.touchObject.swipeLength && (o.swiping = !0,
        i.preventDefault()),
        i = (!1 === o.options.rtl ? 1 : -1) * (o.touchObject.curX > o.touchObject.startX ? 1 : -1),
        !0 === o.options.verticalSwiping && (i = o.touchObject.curY > o.touchObject.startY ? 1 : -1),
        t = o.touchObject.swipeLength,
        (o.touchObject.edgeHit = !1) === o.options.infinite && (0 === o.currentSlide && "right" === s || o.currentSlide >= o.getDotCount() && "left" === s) && (t = o.touchObject.swipeLength * o.options.edgeFriction,
        o.touchObject.edgeHit = !0),
        !1 === o.options.vertical ? o.swipeLeft = e + t * i : o.swipeLeft = e + t * (o.$list.height() / o.listWidth) * i,
        !0 === o.options.verticalSwiping && (o.swipeLeft = e + t * i),
        !0 !== o.options.fade && !1 !== o.options.touchMove && (!0 === o.animating ? (o.swipeLeft = null,
        !1) : void o.setCSS(o.swipeLeft))))
    }
    ,
    r.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0,
        1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow)
            return !(t.touchObject = {});
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]),
        t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX,
        t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY,
        t.dragging = !0
    }
    ,
    r.prototype.unfilterSlides = r.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slidesCache.appendTo(i.$slideTrack),
        i.reinit())
    }
    ,
    r.prototype.unload = function() {
        var i = this;
        a(".slick-cloned", i.$slider).remove(),
        i.$dots && i.$dots.remove(),
        i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(),
        i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(),
        i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    r.prototype.unslick = function(i) {
        this.$slider.trigger("unslick", [this, i]),
        this.destroy()
    }
    ,
    r.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2);
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode || i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode) && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    r.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }
    ,
    r.prototype.visibility = function() {
        this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
    }
    ,
    a.fn.slick = function() {
        for (var i, e = this, t = arguments[0], o = Array.prototype.slice.call(arguments, 1), s = e.length, n = 0; n < s; n++)
            if ("object" == typeof t || void 0 === t ? e[n].slick = new r(e[n],t) : i = e[n].slick[t].apply(e[n].slick, o),
            void 0 !== i)
                return i;
        return e
    }
});
!function(n) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return n(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, e) {
        return t = t || window,
        e = e || ("undefined" != typeof window ? require("jquery") : require("jquery")(t)),
        n(e, t, t.document)
    }
    : window.DataTable = n(jQuery, window, document)
}(function(P, j, y, N) {
    "use strict";
    function d(t) {
        var e = parseInt(t, 10);
        return !isNaN(e) && isFinite(t) ? e : null
    }
    function l(t, e, n) {
        var a = "string" == typeof t;
        return !!h(t) || (e && a && (t = $(t, e)),
        n && a && (t = t.replace(q, "")),
        !isNaN(parseFloat(t)) && isFinite(t))
    }
    function n(t, e, n) {
        var a;
        return !!h(t) || (h(a = t) || "string" == typeof a) && !!l(t.replace(X, ""), e, n) || null
    }
    function m(t, e, n, a) {
        var r = []
          , o = 0
          , i = e.length;
        if (a !== N)
            for (; o < i; o++)
                t[e[o]][n] && r.push(t[e[o]][n][a]);
        else
            for (; o < i; o++)
                r.push(t[e[o]][n]);
        return r
    }
    function f(t, e) {
        var n, a = [];
        e === N ? (e = 0,
        n = t) : (n = e,
        e = t);
        for (var r = e; r < n; r++)
            a.push(r);
        return a
    }
    function _(t) {
        for (var e = [], n = 0, a = t.length; n < a; n++)
            t[n] && e.push(t[n]);
        return e
    }
    function a(t, e) {
        return -1 !== this.indexOf(t, e = e === N ? 0 : e)
    }
    var p, e, t, w = function(t, v) {
        if (this instanceof w)
            return P(t).DataTable(v);
        v = t,
        this.$ = function(t, e) {
            return this.api(!0).$(t, e)
        }
        ,
        this._ = function(t, e) {
            return this.api(!0).rows(t, e).data()
        }
        ,
        this.api = function(t) {
            return new U(t ? pe(this[p.iApiIndex]) : this)
        }
        ,
        this.fnAddData = function(t, e) {
            var n = this.api(!0)
              , t = (Array.isArray(t) && (Array.isArray(t[0]) || P.isPlainObject(t[0])) ? n.rows : n.row).add(t);
            return e !== N && !e || n.draw(),
            t.flatten().toArray()
        }
        ,
        this.fnAdjustColumnSizing = function(t) {
            var e = this.api(!0).columns.adjust()
              , n = e.settings()[0]
              , a = n.oScroll;
            t === N || t ? e.draw(!1) : "" === a.sX && "" === a.sY || Kt(n)
        }
        ,
        this.fnClearTable = function(t) {
            var e = this.api(!0).clear();
            t !== N && !t || e.draw()
        }
        ,
        this.fnClose = function(t) {
            this.api(!0).row(t).child.hide()
        }
        ,
        this.fnDeleteRow = function(t, e, n) {
            var a = this.api(!0)
              , t = a.rows(t)
              , r = t.settings()[0]
              , o = r.aoData[t[0][0]];
            return t.remove(),
            e && e.call(this, r, o),
            n !== N && !n || a.draw(),
            o
        }
        ,
        this.fnDestroy = function(t) {
            this.api(!0).destroy(t)
        }
        ,
        this.fnDraw = function(t) {
            this.api(!0).draw(t)
        }
        ,
        this.fnFilter = function(t, e, n, a, r, o) {
            var i = this.api(!0);
            (null === e || e === N ? i : i.column(e)).search(t, n, a, o),
            i.draw()
        }
        ,
        this.fnGetData = function(t, e) {
            var n, a = this.api(!0);
            return t !== N ? (n = t.nodeName ? t.nodeName.toLowerCase() : "",
            e !== N || "td" == n || "th" == n ? a.cell(t, e).data() : a.row(t).data() || null) : a.data().toArray()
        }
        ,
        this.fnGetNodes = function(t) {
            var e = this.api(!0);
            return t !== N ? e.row(t).node() : e.rows().nodes().flatten().toArray()
        }
        ,
        this.fnGetPosition = function(t) {
            var e = this.api(!0)
              , n = t.nodeName.toUpperCase();
            return "TR" == n ? e.row(t).index() : "TD" == n || "TH" == n ? [(n = e.cell(t).index()).row, n.columnVisible, n.column] : null
        }
        ,
        this.fnIsOpen = function(t) {
            return this.api(!0).row(t).child.isShown()
        }
        ,
        this.fnOpen = function(t, e, n) {
            return this.api(!0).row(t).child(e, n).show().child()[0]
        }
        ,
        this.fnPageChange = function(t, e) {
            t = this.api(!0).page(t);
            e !== N && !e || t.draw(!1)
        }
        ,
        this.fnSetColumnVis = function(t, e, n) {
            t = this.api(!0).column(t).visible(e);
            n !== N && !n || t.columns.adjust().draw()
        }
        ,
        this.fnSettings = function() {
            return pe(this[p.iApiIndex])
        }
        ,
        this.fnSort = function(t) {
            this.api(!0).order(t).draw()
        }
        ,
        this.fnSortListener = function(t, e, n) {
            this.api(!0).order.listener(t, e, n)
        }
        ,
        this.fnUpdate = function(t, e, n, a, r) {
            var o = this.api(!0);
            return (n === N || null === n ? o.row(e) : o.cell(e, n)).data(t),
            r !== N && !r || o.columns.adjust(),
            a !== N && !a || o.draw(),
            0
        }
        ,
        this.fnVersionCheck = p.fnVersionCheck;
        var e, y = this, D = v === N, _ = this.length;
        for (e in D && (v = {}),
        this.oApi = this.internal = p.internal,
        w.ext.internal)
            e && (this[e] = Me(e));
        return this.each(function() {
            var r = 1 < _ ? ge({}, v, !0) : v
              , o = 0
              , t = this.getAttribute("id")
              , i = !1
              , e = w.defaults
              , l = P(this);
            if ("table" != this.nodeName.toLowerCase())
                W(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
            else {
                Q(e),
                K(e.column),
                C(e, e, !0),
                C(e.column, e.column, !0),
                C(e, P.extend(r, l.data()), !0);
                for (var n = w.settings, o = 0, s = n.length; o < s; o++) {
                    var a = n[o];
                    if (a.nTable == this || a.nTHead && a.nTHead.parentNode == this || a.nTFoot && a.nTFoot.parentNode == this) {
                        var u = (r.bRetrieve !== N ? r : e).bRetrieve
                          , c = (r.bDestroy !== N ? r : e).bDestroy;
                        if (D || u)
                            return a.oInstance;
                        if (c) {
                            a.oInstance.fnDestroy();
                            break
                        }
                        return void W(a, 0, "Cannot reinitialise DataTable", 3)
                    }
                    if (a.sTableId == this.id) {
                        n.splice(o, 1);
                        break
                    }
                }
                null !== t && "" !== t || (t = "DataTables_Table_" + w.ext._unique++,
                this.id = t);
                var f, d, h = P.extend(!0, {}, w.models.oSettings, {
                    sDestroyWidth: l[0].style.width,
                    sInstance: t,
                    sTableId: t
                }), p = (h.nTable = this,
                h.oApi = y.internal,
                h.oInit = r,
                n.push(h),
                h.oInstance = 1 === y.length ? y : l.dataTable(),
                Q(r),
                Z(r.oLanguage),
                r.aLengthMenu && !r.iDisplayLength && (r.iDisplayLength = (Array.isArray(r.aLengthMenu[0]) ? r.aLengthMenu[0] : r.aLengthMenu)[0]),
                r = ge(P.extend(!0, {}, e), r),
                L(h.oFeatures, r, ["bPaginate", "bLengthChange", "bFilter", "bSort", "bSortMulti", "bInfo", "bProcessing", "bAutoWidth", "bSortClasses", "bServerSide", "bDeferRender"]),
                L(h, r, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"], ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength", "_iDisplayLength"]]),
                L(h.oScroll, r, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], ["bScrollCollapse", "bCollapse"]]),
                L(h.oLanguage, r, "fnInfoCallback"),
                R(h, "aoDrawCallback", r.fnDrawCallback, "user"),
                R(h, "aoServerParams", r.fnServerParams, "user"),
                R(h, "aoStateSaveParams", r.fnStateSaveParams, "user"),
                R(h, "aoStateLoadParams", r.fnStateLoadParams, "user"),
                R(h, "aoStateLoaded", r.fnStateLoaded, "user"),
                R(h, "aoRowCallback", r.fnRowCallback, "user"),
                R(h, "aoRowCreatedCallback", r.fnCreatedRow, "user"),
                R(h, "aoHeaderCallback", r.fnHeaderCallback, "user"),
                R(h, "aoFooterCallback", r.fnFooterCallback, "user"),
                R(h, "aoInitComplete", r.fnInitComplete, "user"),
                R(h, "aoPreDrawCallback", r.fnPreDrawCallback, "user"),
                h.rowIdFn = A(r.rowId),
                tt(h),
                h.oClasses), g = (P.extend(p, w.ext.classes, r.oClasses),
                l.addClass(p.sTable),
                h.iInitDisplayStart === N && (h.iInitDisplayStart = r.iDisplayStart,
                h._iDisplayStart = r.iDisplayStart),
                null !== r.iDeferLoading && (h.bDeferLoading = !0,
                t = Array.isArray(r.iDeferLoading),
                h._iRecordsDisplay = t ? r.iDeferLoading[0] : r.iDeferLoading,
                h._iRecordsTotal = t ? r.iDeferLoading[1] : r.iDeferLoading),
                h.oLanguage), t = (P.extend(!0, g, r.oLanguage),
                g.sUrl ? (P.ajax({
                    dataType: "json",
                    url: g.sUrl,
                    success: function(t) {
                        C(e.oLanguage, t),
                        Z(t),
                        P.extend(!0, g, t),
                        E(h, null, "i18n", [h]),
                        Jt(h)
                    },
                    error: function(t) {
                        Jt(h)
                    }
                }),
                i = !0) : E(h, null, "i18n", [h]),
                null === r.asStripeClasses && (h.asStripeClasses = [p.sStripeOdd, p.sStripeEven]),
                h.asStripeClasses), b = l.children("tbody").find("tr").eq(0), m = (-1 !== P.inArray(!0, P.map(t, function(t, e) {
                    return b.hasClass(t)
                })) && (P("tbody tr", this).removeClass(t.join(" ")),
                h.asDestroyStripes = t.slice()),
                []), t = this.getElementsByTagName("thead");
                if (0 !== t.length && (wt(h.aoHeader, t[0]),
                m = Ct(h)),
                null === r.aoColumns)
                    for (f = [],
                    o = 0,
                    s = m.length; o < s; o++)
                        f.push(null);
                else
                    f = r.aoColumns;
                for (o = 0,
                s = f.length; o < s; o++)
                    nt(h, m ? m[o] : null);
                st(h, r.aoColumnDefs, f, function(t, e) {
                    at(h, t, e)
                }),
                b.length && (d = function(t, e) {
                    return null !== t.getAttribute("data-" + e) ? e : null
                }
                ,
                P(b[0]).children("th, td").each(function(t, e) {
                    var n, a = h.aoColumns[t];
                    a.mData === t && (n = d(e, "sort") || d(e, "order"),
                    e = d(e, "filter") || d(e, "search"),
                    null === n && null === e || (a.mData = {
                        _: t + ".display",
                        sort: null !== n ? t + ".@data-" + n : N,
                        type: null !== n ? t + ".@data-" + n : N,
                        filter: null !== e ? t + ".@data-" + e : N
                    },
                    at(h, t)))
                }));
                var S = h.oFeatures
                  , t = function() {
                    if (r.aaSorting === N) {
                        var t = h.aaSorting;
                        for (o = 0,
                        s = t.length; o < s; o++)
                            t[o][1] = h.aoColumns[o].asSorting[0]
                    }
                    ce(h),
                    S.bSort && R(h, "aoDrawCallback", function() {
                        var t, n;
                        h.bSorted && (t = I(h),
                        n = {},
                        P.each(t, function(t, e) {
                            n[e.src] = e.dir
                        }),
                        E(h, null, "order", [h, t, n]),
                        le(h))
                    }),
                    R(h, "aoDrawCallback", function() {
                        (h.bSorted || "ssp" === B(h) || S.bDeferRender) && ce(h)
                    }, "sc");
                    var e = l.children("caption").each(function() {
                        this._captionSide = P(this).css("caption-side")
                    })
                      , n = l.children("thead")
                      , a = (0 === n.length && (n = P("<thead/>").appendTo(l)),
                    h.nTHead = n[0],
                    l.children("tbody"))
                      , n = (0 === a.length && (a = P("<tbody/>").insertAfter(n)),
                    h.nTBody = a[0],
                    l.children("tfoot"));
                    if (0 === (n = 0 === n.length && 0 < e.length && ("" !== h.oScroll.sX || "" !== h.oScroll.sY) ? P("<tfoot/>").appendTo(l) : n).length || 0 === n.children().length ? l.addClass(p.sNoFooter) : 0 < n.length && (h.nTFoot = n[0],
                    wt(h.aoFooter, h.nTFoot)),
                    r.aaData)
                        for (o = 0; o < r.aaData.length; o++)
                            x(h, r.aaData[o]);
                    else
                        !h.bDeferLoading && "dom" != B(h) || ut(h, P(h.nTBody).children("tr"));
                    h.aiDisplay = h.aiDisplayMaster.slice(),
                    !(h.bInitialised = !0) === i && Jt(h)
                };
                R(h, "aoDrawCallback", F, "state_save"),
                r.bStateSave ? (S.bStateSave = !0,
                de(h, 0, t)) : t()
            }
        }),
        y = null,
        this
    }, s = {}, c = /[\r\n\u2028]/g, X = /<.*?>/g, V = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/, J = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^", "-"].join("|\\") + ")","g"), q = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi, h = function(t) {
        return !t || !0 === t || "-" === t
    }, $ = function(t, e) {
        return s[e] || (s[e] = new RegExp(kt(e),"g")),
        "string" == typeof t && "." !== e ? t.replace(/\./g, "").replace(s[e], ".") : t
    }, H = function(t, e, n) {
        var a = []
          , r = 0
          , o = t.length;
        if (n !== N)
            for (; r < o; r++)
                t[r] && t[r][e] && a.push(t[r][e][n]);
        else
            for (; r < o; r++)
                t[r] && a.push(t[r][e]);
        return a
    }, G = function(t) {
        if (!(t.length < 2))
            for (var e = t.slice().sort(), n = e[0], a = 1, r = e.length; a < r; a++) {
                if (e[a] === n)
                    return !1;
                n = e[a]
            }
        return !0
    }, z = function(t) {
        if (G(t))
            return t.slice();
        var e, n, a, r = [], o = t.length, i = 0;
        t: for (n = 0; n < o; n++) {
            for (e = t[n],
            a = 0; a < i; a++)
                if (r[a] === e)
                    continue t;
            r.push(e),
            i++
        }
        return r
    }, Y = function(t, e) {
        if (Array.isArray(e))
            for (var n = 0; n < e.length; n++)
                Y(t, e[n]);
        else
            t.push(e);
        return t
    };
    function i(n) {
        var a, r, o = {};
        P.each(n, function(t, e) {
            (a = t.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(a[1] + " ") && (r = t.replace(a[0], a[2].toLowerCase()),
            o[r] = t,
            "o" === a[1]) && i(n[t])
        }),
        n._hungarianMap = o
    }
    function C(n, a, r) {
        var o;
        n._hungarianMap || i(n),
        P.each(a, function(t, e) {
            (o = n._hungarianMap[t]) === N || !r && a[o] !== N || ("o" === o.charAt(0) ? (a[o] || (a[o] = {}),
            P.extend(!0, a[o], a[t]),
            C(n[o], a[o], r)) : a[o] = a[t])
        })
    }
    function Z(t) {
        var e, n = w.defaults.oLanguage, a = n.sDecimal;
        a && ke(a),
        t && (e = t.sZeroRecords,
        !t.sEmptyTable && e && "No data available in table" === n.sEmptyTable && L(t, t, "sZeroRecords", "sEmptyTable"),
        !t.sLoadingRecords && e && "Loading..." === n.sLoadingRecords && L(t, t, "sZeroRecords", "sLoadingRecords"),
        t.sInfoThousands && (t.sThousands = t.sInfoThousands),
        e = t.sDecimal) && a !== e && ke(e)
    }
    Array.isArray || (Array.isArray = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    ),
    Array.prototype.includes || (Array.prototype.includes = a),
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }
    ),
    String.prototype.includes || (String.prototype.includes = a),
    w.util = {
        throttle: function(a, t) {
            var r, o, i = t !== N ? t : 200;
            return function() {
                var t = this
                  , e = +new Date
                  , n = arguments;
                r && e < r + i ? (clearTimeout(o),
                o = setTimeout(function() {
                    r = N,
                    a.apply(t, n)
                }, i)) : (r = e,
                a.apply(t, n))
            }
        },
        escapeRegex: function(t) {
            return t.replace(J, "\\$1")
        },
        set: function(a) {
            var d;
            return P.isPlainObject(a) ? w.util.set(a._) : null === a ? function() {}
            : "function" == typeof a ? function(t, e, n) {
                a(t, "set", e, n)
            }
            : "string" != typeof a || -1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("(") ? function(t, e) {
                t[a] = e
            }
            : (d = function(t, e, n) {
                for (var a, r, o, i, l = dt(n), n = l[l.length - 1], s = 0, u = l.length - 1; s < u; s++) {
                    if ("__proto__" === l[s] || "constructor" === l[s])
                        throw new Error("Cannot set prototype values");
                    if (a = l[s].match(ft),
                    r = l[s].match(g),
                    a) {
                        if (l[s] = l[s].replace(ft, ""),
                        t[l[s]] = [],
                        (a = l.slice()).splice(0, s + 1),
                        i = a.join("."),
                        Array.isArray(e))
                            for (var c = 0, f = e.length; c < f; c++)
                                d(o = {}, e[c], i),
                                t[l[s]].push(o);
                        else
                            t[l[s]] = e;
                        return
                    }
                    r && (l[s] = l[s].replace(g, ""),
                    t = t[l[s]](e)),
                    null !== t[l[s]] && t[l[s]] !== N || (t[l[s]] = {}),
                    t = t[l[s]]
                }
                n.match(g) ? t[n.replace(g, "")](e) : t[n.replace(ft, "")] = e
            }
            ,
            function(t, e) {
                return d(t, e, a)
            }
            )
        },
        get: function(r) {
            var o, d;
            return P.isPlainObject(r) ? (o = {},
            P.each(r, function(t, e) {
                e && (o[t] = w.util.get(e))
            }),
            function(t, e, n, a) {
                var r = o[e] || o._;
                return r !== N ? r(t, e, n, a) : t
            }
            ) : null === r ? function(t) {
                return t
            }
            : "function" == typeof r ? function(t, e, n, a) {
                return r(t, e, n, a)
            }
            : "string" != typeof r || -1 === r.indexOf(".") && -1 === r.indexOf("[") && -1 === r.indexOf("(") ? function(t, e) {
                return t[r]
            }
            : (d = function(t, e, n) {
                var a, r, o;
                if ("" !== n)
                    for (var i = dt(n), l = 0, s = i.length; l < s; l++) {
                        if (f = i[l].match(ft),
                        a = i[l].match(g),
                        f) {
                            if (i[l] = i[l].replace(ft, ""),
                            "" !== i[l] && (t = t[i[l]]),
                            r = [],
                            i.splice(0, l + 1),
                            o = i.join("."),
                            Array.isArray(t))
                                for (var u = 0, c = t.length; u < c; u++)
                                    r.push(d(t[u], e, o));
                            var f = f[0].substring(1, f[0].length - 1);
                            t = "" === f ? r : r.join(f);
                            break
                        }
                        if (a)
                            i[l] = i[l].replace(g, ""),
                            t = t[i[l]]();
                        else {
                            if (null === t || t[i[l]] === N)
                                return N;
                            t = t[i[l]]
                        }
                    }
                return t
            }
            ,
            function(t, e) {
                return d(t, e, r)
            }
            )
        }
    };
    var r = function(t, e, n) {
        t[e] !== N && (t[n] = t[e])
    };
    function Q(t) {
        r(t, "ordering", "bSort"),
        r(t, "orderMulti", "bSortMulti"),
        r(t, "orderClasses", "bSortClasses"),
        r(t, "orderCellsTop", "bSortCellsTop"),
        r(t, "order", "aaSorting"),
        r(t, "orderFixed", "aaSortingFixed"),
        r(t, "paging", "bPaginate"),
        r(t, "pagingType", "sPaginationType"),
        r(t, "pageLength", "iDisplayLength"),
        r(t, "searching", "bFilter"),
        "boolean" == typeof t.sScrollX && (t.sScrollX = t.sScrollX ? "100%" : ""),
        "boolean" == typeof t.scrollX && (t.scrollX = t.scrollX ? "100%" : "");
        var e = t.aoSearchCols;
        if (e)
            for (var n = 0, a = e.length; n < a; n++)
                e[n] && C(w.models.oSearch, e[n])
    }
    function K(t) {
        r(t, "orderable", "bSortable"),
        r(t, "orderData", "aDataSort"),
        r(t, "orderSequence", "asSorting"),
        r(t, "orderDataType", "sortDataType");
        var e = t.aDataSort;
        "number" != typeof e || Array.isArray(e) || (t.aDataSort = [e])
    }
    function tt(t) {
        var e, n, a, r;
        w.__browser || (w.__browser = e = {},
        r = (a = (n = P("<div/>").css({
            position: "fixed",
            top: 0,
            left: -1 * P(j).scrollLeft(),
            height: 1,
            width: 1,
            overflow: "hidden"
        }).append(P("<div/>").css({
            position: "absolute",
            top: 1,
            left: 1,
            width: 100,
            overflow: "scroll"
        }).append(P("<div/>").css({
            width: "100%",
            height: 10
        }))).appendTo("body")).children()).children(),
        e.barWidth = a[0].offsetWidth - a[0].clientWidth,
        e.bScrollOversize = 100 === r[0].offsetWidth && 100 !== a[0].clientWidth,
        e.bScrollbarLeft = 1 !== Math.round(r.offset().left),
        e.bBounding = !!n[0].getBoundingClientRect().width,
        n.remove()),
        P.extend(t.oBrowser, w.__browser),
        t.oScroll.iBarWidth = w.__browser.barWidth
    }
    function et(t, e, n, a, r, o) {
        var i, l = a, s = !1;
        for (n !== N && (i = n,
        s = !0); l !== r; )
            t.hasOwnProperty(l) && (i = s ? e(i, t[l], l, t) : t[l],
            s = !0,
            l += o);
        return i
    }
    function nt(t, e) {
        var n = w.defaults.column
          , a = t.aoColumns.length
          , n = P.extend({}, w.models.oColumn, n, {
            nTh: e || y.createElement("th"),
            sTitle: n.sTitle || (e ? e.innerHTML : ""),
            aDataSort: n.aDataSort || [a],
            mData: n.mData || a,
            idx: a
        })
          , n = (t.aoColumns.push(n),
        t.aoPreSearchCols);
        n[a] = P.extend({}, w.models.oSearch, n[a]),
        at(t, a, P(e).data())
    }
    function at(t, e, n) {
        function a(t) {
            return "string" == typeof t && -1 !== t.indexOf("@")
        }
        var e = t.aoColumns[e]
          , r = t.oClasses
          , o = P(e.nTh)
          , i = (!e.sWidthOrig && (e.sWidthOrig = o.attr("width") || null,
        u = (o.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/)) && (e.sWidthOrig = u[1]),
        n !== N && null !== n && (K(n),
        C(w.defaults.column, n, !0),
        n.mDataProp === N || n.mData || (n.mData = n.mDataProp),
        n.sType && (e._sManualType = n.sType),
        n.className && !n.sClass && (n.sClass = n.className),
        n.sClass && o.addClass(n.sClass),
        P.extend(e, n),
        L(e, n, "sWidth", "sWidthOrig"),
        n.iDataSort !== N && (e.aDataSort = [n.iDataSort]),
        L(e, n, "aDataSort")),
        e.mData)
          , l = A(i)
          , s = e.mRender ? A(e.mRender) : null
          , u = (e._bAttrSrc = P.isPlainObject(i) && (a(i.sort) || a(i.type) || a(i.filter)),
        e._setter = null,
        e.fnGetData = function(t, e, n) {
            var a = l(t, e, N, n);
            return s && e ? s(a, e, t, n) : a
        }
        ,
        e.fnSetData = function(t, e, n) {
            return b(i)(t, e, n)
        }
        ,
        "number" != typeof i && (t._rowReadObject = !0),
        t.oFeatures.bSort || (e.bSortable = !1,
        o.addClass(r.sSortableNone)),
        -1 !== P.inArray("asc", e.asSorting))
          , n = -1 !== P.inArray("desc", e.asSorting);
        e.bSortable && (u || n) ? u && !n ? (e.sSortingClass = r.sSortableAsc,
        e.sSortingClassJUI = r.sSortJUIAscAllowed) : !u && n ? (e.sSortingClass = r.sSortableDesc,
        e.sSortingClassJUI = r.sSortJUIDescAllowed) : (e.sSortingClass = r.sSortable,
        e.sSortingClassJUI = r.sSortJUI) : (e.sSortingClass = r.sSortableNone,
        e.sSortingClassJUI = "")
    }
    function k(t) {
        if (!1 !== t.oFeatures.bAutoWidth) {
            var e = t.aoColumns;
            ee(t);
            for (var n = 0, a = e.length; n < a; n++)
                e[n].nTh.style.width = e[n].sWidth
        }
        var r = t.oScroll;
        "" === r.sY && "" === r.sX || Kt(t),
        E(t, null, "column-sizing", [t])
    }
    function rt(t, e) {
        t = it(t, "bVisible");
        return "number" == typeof t[e] ? t[e] : null
    }
    function ot(t, e) {
        t = it(t, "bVisible"),
        e = P.inArray(e, t);
        return -1 !== e ? e : null
    }
    function T(t) {
        var n = 0;
        return P.each(t.aoColumns, function(t, e) {
            e.bVisible && "none" !== P(e.nTh).css("display") && n++
        }),
        n
    }
    function it(t, n) {
        var a = [];
        return P.map(t.aoColumns, function(t, e) {
            t[n] && a.push(e)
        }),
        a
    }
    function lt(t) {
        for (var e, n, a, r, o, i, l, s = t.aoColumns, u = t.aoData, c = w.ext.type.detect, f = 0, d = s.length; f < d; f++)
            if (l = [],
            !(o = s[f]).sType && o._sManualType)
                o.sType = o._sManualType;
            else if (!o.sType) {
                for (e = 0,
                n = c.length; e < n; e++) {
                    for (a = 0,
                    r = u.length; a < r && (l[a] === N && (l[a] = S(t, a, f, "type")),
                    (i = c[e](l[a], t)) || e === c.length - 1) && ("html" !== i || h(l[a])); a++)
                        ;
                    if (i) {
                        o.sType = i;
                        break
                    }
                }
                o.sType || (o.sType = "string")
            }
    }
    function st(t, e, n, a) {
        var r, o, i, l, s = t.aoColumns;
        if (e)
            for (r = e.length - 1; 0 <= r; r--)
                for (var u, c = (u = e[r]).targets !== N ? u.targets : u.aTargets, f = 0, d = (c = Array.isArray(c) ? c : [c]).length; f < d; f++)
                    if ("number" == typeof c[f] && 0 <= c[f]) {
                        for (; s.length <= c[f]; )
                            nt(t);
                        a(c[f], u)
                    } else if ("number" == typeof c[f] && c[f] < 0)
                        a(s.length + c[f], u);
                    else if ("string" == typeof c[f])
                        for (i = 0,
                        l = s.length; i < l; i++)
                            "_all" != c[f] && !P(s[i].nTh).hasClass(c[f]) || a(i, u);
        if (n)
            for (r = 0,
            o = n.length; r < o; r++)
                a(r, n[r])
    }
    function x(t, e, n, a) {
        for (var r = t.aoData.length, o = P.extend(!0, {}, w.models.oRow, {
            src: n ? "dom" : "data",
            idx: r
        }), i = (o._aData = e,
        t.aoData.push(o),
        t.aoColumns), l = 0, s = i.length; l < s; l++)
            i[l].sType = null;
        t.aiDisplayMaster.push(r);
        e = t.rowIdFn(e);
        return e !== N && (t.aIds[e] = o),
        !n && t.oFeatures.bDeferRender || St(t, r, n, a),
        r
    }
    function ut(n, t) {
        var a;
        return (t = t instanceof P ? t : P(t)).map(function(t, e) {
            return a = mt(n, e),
            x(n, a.data, e, a.cells)
        })
    }
    function S(t, e, n, a) {
        "search" === a ? a = "filter" : "order" === a && (a = "sort");
        var r = t.iDraw
          , o = t.aoColumns[n]
          , i = t.aoData[e]._aData
          , l = o.sDefaultContent
          , s = o.fnGetData(i, a, {
            settings: t,
            row: e,
            col: n
        });
        if (s === N)
            return t.iDrawError != r && null === l && (W(t, 0, "Requested unknown parameter " + ("function" == typeof o.mData ? "{function}" : "'" + o.mData + "'") + " for row " + e + ", column " + n, 4),
            t.iDrawError = r),
            l;
        if (s !== i && null !== s || null === l || a === N) {
            if ("function" == typeof s)
                return s.call(i)
        } else
            s = l;
        return null === s && "display" === a ? "" : "filter" === a && (e = w.ext.type.search)[o.sType] ? e[o.sType](s) : s
    }
    function ct(t, e, n, a) {
        var r = t.aoColumns[n]
          , o = t.aoData[e]._aData;
        r.fnSetData(o, a, {
            settings: t,
            row: e,
            col: n
        })
    }
    var ft = /\[.*?\]$/
      , g = /\(\)$/;
    function dt(t) {
        return P.map(t.match(/(\\.|[^\.])+/g) || [""], function(t) {
            return t.replace(/\\\./g, ".")
        })
    }
    var A = w.util.get
      , b = w.util.set;
    function ht(t) {
        return H(t.aoData, "_aData")
    }
    function pt(t) {
        t.aoData.length = 0,
        t.aiDisplayMaster.length = 0,
        t.aiDisplay.length = 0,
        t.aIds = {}
    }
    function gt(t, e, n) {
        for (var a = -1, r = 0, o = t.length; r < o; r++)
            t[r] == e ? a = r : t[r] > e && t[r]--;
        -1 != a && n === N && t.splice(a, 1)
    }
    function bt(n, a, t, e) {
        function r(t, e) {
            for (; t.childNodes.length; )
                t.removeChild(t.firstChild);
            t.innerHTML = S(n, a, e, "display")
        }
        var o, i, l = n.aoData[a];
        if ("dom" !== t && (t && "auto" !== t || "dom" !== l.src)) {
            var s = l.anCells;
            if (s)
                if (e !== N)
                    r(s[e], e);
                else
                    for (o = 0,
                    i = s.length; o < i; o++)
                        r(s[o], o)
        } else
            l._aData = mt(n, l, e, e === N ? N : l._aData).data;
        l._aSortData = null,
        l._aFilterData = null;
        var u = n.aoColumns;
        if (e !== N)
            u[e].sType = null;
        else {
            for (o = 0,
            i = u.length; o < i; o++)
                u[o].sType = null;
            vt(n, l)
        }
    }
    function mt(t, e, n, a) {
        function r(t, e) {
            var n;
            "string" == typeof t && -1 !== (n = t.indexOf("@")) && (n = t.substring(n + 1),
            b(t)(a, e.getAttribute(n)))
        }
        function o(t) {
            n !== N && n !== f || (l = d[f],
            s = t.innerHTML.trim(),
            l && l._bAttrSrc ? (b(l.mData._)(a, s),
            r(l.mData.sort, t),
            r(l.mData.type, t),
            r(l.mData.filter, t)) : h ? (l._setter || (l._setter = b(l.mData)),
            l._setter(a, s)) : a[f] = s),
            f++
        }
        var i, l, s, u = [], c = e.firstChild, f = 0, d = t.aoColumns, h = t._rowReadObject;
        a = a !== N ? a : h ? {} : [];
        if (c)
            for (; c; )
                "TD" != (i = c.nodeName.toUpperCase()) && "TH" != i || (o(c),
                u.push(c)),
                c = c.nextSibling;
        else
            for (var p = 0, g = (u = e.anCells).length; p < g; p++)
                o(u[p]);
        var e = e.firstChild ? e : e.nTr;
        return e && (e = e.getAttribute("id")) && b(t.rowId)(a, e),
        {
            data: a,
            cells: u
        }
    }
    function St(t, e, n, a) {
        var r, o, i, l, s, u, c = t.aoData[e], f = c._aData, d = [];
        if (null === c.nTr) {
            for (r = n || y.createElement("tr"),
            c.nTr = r,
            c.anCells = d,
            r._DT_RowIndex = e,
            vt(t, c),
            l = 0,
            s = t.aoColumns.length; l < s; l++)
                i = t.aoColumns[l],
                (o = (u = !n) ? y.createElement(i.sCellType) : a[l])._DT_CellIndex = {
                    row: e,
                    column: l
                },
                d.push(o),
                !u && (!i.mRender && i.mData === l || P.isPlainObject(i.mData) && i.mData._ === l + ".display") || (o.innerHTML = S(t, e, l, "display")),
                i.sClass && (o.className += " " + i.sClass),
                i.bVisible && !n ? r.appendChild(o) : !i.bVisible && n && o.parentNode.removeChild(o),
                i.fnCreatedCell && i.fnCreatedCell.call(t.oInstance, o, S(t, e, l), f, e, l);
            E(t, "aoRowCreatedCallback", null, [r, f, e, d])
        }
    }
    function vt(t, e) {
        var n = e.nTr
          , a = e._aData;
        n && ((t = t.rowIdFn(a)) && (n.id = t),
        a.DT_RowClass && (t = a.DT_RowClass.split(" "),
        e.__rowc = e.__rowc ? z(e.__rowc.concat(t)) : t,
        P(n).removeClass(e.__rowc.join(" ")).addClass(a.DT_RowClass)),
        a.DT_RowAttr && P(n).attr(a.DT_RowAttr),
        a.DT_RowData) && P(n).data(a.DT_RowData)
    }
    function yt(t) {
        var e, n, a, r = t.nTHead, o = t.nTFoot, i = 0 === P("th, td", r).length, l = t.oClasses, s = t.aoColumns;
        for (i && (n = P("<tr/>").appendTo(r)),
        c = 0,
        f = s.length; c < f; c++)
            a = s[c],
            e = P(a.nTh).addClass(a.sClass),
            i && e.appendTo(n),
            t.oFeatures.bSort && (e.addClass(a.sSortingClass),
            !1 !== a.bSortable) && (e.attr("tabindex", t.iTabIndex).attr("aria-controls", t.sTableId),
            ue(t, a.nTh, c)),
            a.sTitle != e[0].innerHTML && e.html(a.sTitle),
            Se(t, "header")(t, e, a, l);
        if (i && wt(t.aoHeader, r),
        P(r).children("tr").children("th, td").addClass(l.sHeaderTH),
        P(o).children("tr").children("th, td").addClass(l.sFooterTH),
        null !== o)
            for (var u = t.aoFooter[0], c = 0, f = u.length; c < f; c++)
                (a = s[c]).nTf = u[c].cell,
                a.sClass && P(a.nTf).addClass(a.sClass)
    }
    function Dt(t, e, n) {
        var a, r, o, i, l, s, u, c, f, d = [], h = [], p = t.aoColumns.length;
        if (e) {
            for (n === N && (n = !1),
            a = 0,
            r = e.length; a < r; a++) {
                for (d[a] = e[a].slice(),
                d[a].nTr = e[a].nTr,
                o = p - 1; 0 <= o; o--)
                    t.aoColumns[o].bVisible || n || d[a].splice(o, 1);
                h.push([])
            }
            for (a = 0,
            r = d.length; a < r; a++) {
                if (u = d[a].nTr)
                    for (; s = u.firstChild; )
                        u.removeChild(s);
                for (o = 0,
                i = d[a].length; o < i; o++)
                    if (f = c = 1,
                    h[a][o] === N) {
                        for (u.appendChild(d[a][o].cell),
                        h[a][o] = 1; d[a + c] !== N && d[a][o].cell == d[a + c][o].cell; )
                            h[a + c][o] = 1,
                            c++;
                        for (; d[a][o + f] !== N && d[a][o].cell == d[a][o + f].cell; ) {
                            for (l = 0; l < c; l++)
                                h[a + l][o + f] = 1;
                            f++
                        }
                        P(d[a][o].cell).attr("rowspan", c).attr("colspan", f)
                    }
            }
        }
    }
    function v(t, e) {
        n = "ssp" == B(s = t),
        (l = s.iInitDisplayStart) !== N && -1 !== l && (s._iDisplayStart = !n && l >= s.fnRecordsDisplay() ? 0 : l,
        s.iInitDisplayStart = -1);
        var n = E(t, "aoPreDrawCallback", "preDraw", [t]);
        if (-1 !== P.inArray(!1, n))
            D(t, !1);
        else {
            var a = []
              , r = 0
              , o = t.asStripeClasses
              , i = o.length
              , l = t.oLanguage
              , s = "ssp" == B(t)
              , u = t.aiDisplay
              , n = t._iDisplayStart
              , c = t.fnDisplayEnd();
            if (t.bDrawing = !0,
            t.bDeferLoading)
                t.bDeferLoading = !1,
                t.iDraw++,
                D(t, !1);
            else if (s) {
                if (!t.bDestroying && !e)
                    return void xt(t)
            } else
                t.iDraw++;
            if (0 !== u.length)
                for (var f = s ? t.aoData.length : c, d = s ? 0 : n; d < f; d++) {
                    var h, p = u[d], g = t.aoData[p], b = (null === g.nTr && St(t, p),
                    g.nTr);
                    0 !== i && (h = o[r % i],
                    g._sRowStripe != h) && (P(b).removeClass(g._sRowStripe).addClass(h),
                    g._sRowStripe = h),
                    E(t, "aoRowCallback", null, [b, g._aData, r, d, p]),
                    a.push(b),
                    r++
                }
            else {
                e = l.sZeroRecords;
                1 == t.iDraw && "ajax" == B(t) ? e = l.sLoadingRecords : l.sEmptyTable && 0 === t.fnRecordsTotal() && (e = l.sEmptyTable),
                a[0] = P("<tr/>", {
                    class: i ? o[0] : ""
                }).append(P("<td />", {
                    valign: "top",
                    colSpan: T(t),
                    class: t.oClasses.sRowEmpty
                }).html(e))[0]
            }
            E(t, "aoHeaderCallback", "header", [P(t.nTHead).children("tr")[0], ht(t), n, c, u]),
            E(t, "aoFooterCallback", "footer", [P(t.nTFoot).children("tr")[0], ht(t), n, c, u]);
            s = P(t.nTBody);
            s.children().detach(),
            s.append(P(a)),
            E(t, "aoDrawCallback", "draw", [t]),
            t.bSorted = !1,
            t.bFiltered = !1,
            t.bDrawing = !1
        }
    }
    function u(t, e) {
        var n = t.oFeatures
          , a = n.bSort
          , n = n.bFilter;
        a && ie(t),
        n ? Rt(t, t.oPreviousSearch) : t.aiDisplay = t.aiDisplayMaster.slice(),
        !0 !== e && (t._iDisplayStart = 0),
        t._drawHold = e,
        v(t),
        t._drawHold = !1
    }
    function _t(t) {
        for (var e, n, a, r, o, i, l, s = t.oClasses, u = P(t.nTable), u = P("<div/>").insertBefore(u), c = t.oFeatures, f = P("<div/>", {
            id: t.sTableId + "_wrapper",
            class: s.sWrapper + (t.nTFoot ? "" : " " + s.sNoFooter)
        }), d = (t.nHolding = u[0],
        t.nTableWrapper = f[0],
        t.nTableReinsertBefore = t.nTable.nextSibling,
        t.sDom.split("")), h = 0; h < d.length; h++) {
            if (e = null,
            "<" == (n = d[h])) {
                if (a = P("<div/>")[0],
                "'" == (r = d[h + 1]) || '"' == r) {
                    for (o = "",
                    i = 2; d[h + i] != r; )
                        o += d[h + i],
                        i++;
                    "H" == o ? o = s.sJUIHeader : "F" == o && (o = s.sJUIFooter),
                    -1 != o.indexOf(".") ? (l = o.split("."),
                    a.id = l[0].substr(1, l[0].length - 1),
                    a.className = l[1]) : "#" == o.charAt(0) ? a.id = o.substr(1, o.length - 1) : a.className = o,
                    h += i
                }
                f.append(a),
                f = P(a)
            } else if (">" == n)
                f = f.parent();
            else if ("l" == n && c.bPaginate && c.bLengthChange)
                e = Gt(t);
            else if ("f" == n && c.bFilter)
                e = Lt(t);
            else if ("r" == n && c.bProcessing)
                e = Zt(t);
            else if ("t" == n)
                e = Qt(t);
            else if ("i" == n && c.bInfo)
                e = Ut(t);
            else if ("p" == n && c.bPaginate)
                e = zt(t);
            else if (0 !== w.ext.feature.length)
                for (var p = w.ext.feature, g = 0, b = p.length; g < b; g++)
                    if (n == p[g].cFeature) {
                        e = p[g].fnInit(t);
                        break
                    }
            e && ((l = t.aanFeatures)[n] || (l[n] = []),
            l[n].push(e),
            f.append(e))
        }
        u.replaceWith(f),
        t.nHolding = null
    }
    function wt(t, e) {
        var n, a, r, o, i, l, s, u, c, f, d = P(e).children("tr");
        for (t.splice(0, t.length),
        r = 0,
        l = d.length; r < l; r++)
            t.push([]);
        for (r = 0,
        l = d.length; r < l; r++)
            for (a = (n = d[r]).firstChild; a; ) {
                if ("TD" == a.nodeName.toUpperCase() || "TH" == a.nodeName.toUpperCase())
                    for (u = (u = +a.getAttribute("colspan")) && 0 != u && 1 != u ? u : 1,
                    c = (c = +a.getAttribute("rowspan")) && 0 != c && 1 != c ? c : 1,
                    s = function(t, e, n) {
                        for (var a = t[e]; a[n]; )
                            n++;
                        return n
                    }(t, r, 0),
                    f = 1 == u,
                    i = 0; i < u; i++)
                        for (o = 0; o < c; o++)
                            t[r + o][s + i] = {
                                cell: a,
                                unique: f
                            },
                            t[r + o].nTr = n;
                a = a.nextSibling
            }
    }
    function Ct(t, e, n) {
        var a = [];
        n || (n = t.aoHeader,
        e && wt(n = [], e));
        for (var r = 0, o = n.length; r < o; r++)
            for (var i = 0, l = n[r].length; i < l; i++)
                !n[r][i].unique || a[i] && t.bSortCellsTop || (a[i] = n[r][i].cell);
        return a
    }
    function Tt(r, t, n) {
        function e(t) {
            var e = r.jqXHR ? r.jqXHR.status : null;
            (null === t || "number" == typeof e && 204 == e) && Ft(r, t = {}, []),
            (e = t.error || t.sError) && W(r, 0, e),
            r.json = t,
            E(r, null, "xhr", [r, t, r.jqXHR]),
            n(t)
        }
        E(r, "aoServerParams", "serverParams", [t]),
        t && Array.isArray(t) && (a = {},
        o = /(.*?)\[\]$/,
        P.each(t, function(t, e) {
            var n = e.name.match(o);
            n ? (n = n[0],
            a[n] || (a[n] = []),
            a[n].push(e.value)) : a[e.name] = e.value
        }),
        t = a);
        var a, o, i, l = r.ajax, s = r.oInstance, u = (P.isPlainObject(l) && l.data && (u = "function" == typeof (i = l.data) ? i(t, r) : i,
        t = "function" == typeof i && u ? u : P.extend(!0, t, u),
        delete l.data),
        {
            data: t,
            success: e,
            dataType: "json",
            cache: !1,
            type: r.sServerMethod,
            error: function(t, e, n) {
                var a = E(r, null, "xhr", [r, null, r.jqXHR]);
                -1 === P.inArray(!0, a) && ("parsererror" == e ? W(r, 0, "Invalid JSON response", 1) : 4 === t.readyState && W(r, 0, "Ajax error", 7)),
                D(r, !1)
            }
        });
        r.oAjaxData = t,
        E(r, null, "preXhr", [r, t]),
        r.fnServerData ? r.fnServerData.call(s, r.sAjaxSource, P.map(t, function(t, e) {
            return {
                name: e,
                value: t
            }
        }), e, r) : r.sAjaxSource || "string" == typeof l ? r.jqXHR = P.ajax(P.extend(u, {
            url: l || r.sAjaxSource
        })) : "function" == typeof l ? r.jqXHR = l.call(s, t, e, r) : (r.jqXHR = P.ajax(P.extend(u, l)),
        l.data = i)
    }
    function xt(e) {
        e.iDraw++,
        D(e, !0),
        Tt(e, At(e), function(t) {
            It(e, t)
        })
    }
    function At(t) {
        for (var e, n, a, r = t.aoColumns, o = r.length, i = t.oFeatures, l = t.oPreviousSearch, s = t.aoPreSearchCols, u = [], c = I(t), f = t._iDisplayStart, d = !1 !== i.bPaginate ? t._iDisplayLength : -1, h = function(t, e) {
            u.push({
                name: t,
                value: e
            })
        }, p = (h("sEcho", t.iDraw),
        h("iColumns", o),
        h("sColumns", H(r, "sName").join(",")),
        h("iDisplayStart", f),
        h("iDisplayLength", d),
        {
            draw: t.iDraw,
            columns: [],
            order: [],
            start: f,
            length: d,
            search: {
                value: l.sSearch,
                regex: l.bRegex
            }
        }), g = 0; g < o; g++)
            n = r[g],
            a = s[g],
            e = "function" == typeof n.mData ? "function" : n.mData,
            p.columns.push({
                data: e,
                name: n.sName,
                searchable: n.bSearchable,
                orderable: n.bSortable,
                search: {
                    value: a.sSearch,
                    regex: a.bRegex
                }
            }),
            h("mDataProp_" + g, e),
            i.bFilter && (h("sSearch_" + g, a.sSearch),
            h("bRegex_" + g, a.bRegex),
            h("bSearchable_" + g, n.bSearchable)),
            i.bSort && h("bSortable_" + g, n.bSortable);
        i.bFilter && (h("sSearch", l.sSearch),
        h("bRegex", l.bRegex)),
        i.bSort && (P.each(c, function(t, e) {
            p.order.push({
                column: e.col,
                dir: e.dir
            }),
            h("iSortCol_" + t, e.col),
            h("sSortDir_" + t, e.dir)
        }),
        h("iSortingCols", c.length));
        f = w.ext.legacy.ajax;
        return null === f ? t.sAjaxSource ? u : p : f ? u : p
    }
    function It(t, n) {
        function e(t, e) {
            return n[t] !== N ? n[t] : n[e]
        }
        var a = Ft(t, n)
          , r = e("sEcho", "draw")
          , o = e("iTotalRecords", "recordsTotal")
          , i = e("iTotalDisplayRecords", "recordsFiltered");
        if (r !== N) {
            if (+r < t.iDraw)
                return;
            t.iDraw = +r
        }
        a = a || [],
        pt(t),
        t._iRecordsTotal = parseInt(o, 10),
        t._iRecordsDisplay = parseInt(i, 10);
        for (var l = 0, s = a.length; l < s; l++)
            x(t, a[l]);
        t.aiDisplay = t.aiDisplayMaster.slice(),
        v(t, !0),
        t._bInitComplete || qt(t, n),
        D(t, !1)
    }
    function Ft(t, e, n) {
        t = P.isPlainObject(t.ajax) && t.ajax.dataSrc !== N ? t.ajax.dataSrc : t.sAjaxDataProp;
        if (!n)
            return "data" === t ? e.aaData || e[t] : "" !== t ? A(t)(e) : e;
        b(t)(e, n)
    }
    function Lt(n) {
        function e(t) {
            i.f;
            var e = this.value || "";
            o.return && "Enter" !== t.key || e != o.sSearch && (Rt(n, {
                sSearch: e,
                bRegex: o.bRegex,
                bSmart: o.bSmart,
                bCaseInsensitive: o.bCaseInsensitive,
                return: o.return
            }),
            n._iDisplayStart = 0,
            v(n))
        }
        var t = n.oClasses
          , a = n.sTableId
          , r = n.oLanguage
          , o = n.oPreviousSearch
          , i = n.aanFeatures
          , l = '<input type="search" class="' + t.sFilterInput + '"/>'
          , t = P("<div/>", {
            id: i.f ? null : a + "_filter",
            class: t.sFilter + " col"
        }).append(l)
          , l = null !== n.searchDelay ? n.searchDelay : "ssp" === B(n) ? 400 : 0
          , s = P("input", t).val(o.sSearch).attr("placeholder", r.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", l ? ne(e, l) : e).on("mouseup", function(t) {
            setTimeout(function() {
                e.call(s[0], t)
            }, 10)
        }).on("keypress.DT", function(t) {
            if (13 == t.keyCode)
                return !1
        }).attr("aria-controls", a);
        return P(n.nTable).on("search.dt.DT", function(t, e) {
            if (n === e)
                try {
                    s[0] !== y.activeElement && s.val(o.sSearch)
                } catch (t) {}
        }),
        t[0]
    }
    function Rt(t, e, n) {
        function a(t) {
            o.sSearch = t.sSearch,
            o.bRegex = t.bRegex,
            o.bSmart = t.bSmart,
            o.bCaseInsensitive = t.bCaseInsensitive,
            o.return = t.return
        }
        function r(t) {
            return t.bEscapeRegex !== N ? !t.bEscapeRegex : t.bRegex
        }
        var o = t.oPreviousSearch
          , i = t.aoPreSearchCols;
        if (lt(t),
        "ssp" != B(t)) {
            Nt(t, e.sSearch, n, r(e), e.bSmart, e.bCaseInsensitive, e.return),
            a(e);
            for (var l = 0; l < i.length; l++)
                jt(t, i[l].sSearch, l, r(i[l]), i[l].bSmart, i[l].bCaseInsensitive);
            Pt(t)
        } else
            a(e);
        t.bFiltered = !0,
        E(t, null, "search", [t])
    }
    function Pt(t) {
        for (var e, n, a = w.ext.search, r = t.aiDisplay, o = 0, i = a.length; o < i; o++) {
            for (var l = [], s = 0, u = r.length; s < u; s++)
                n = r[s],
                e = t.aoData[n],
                a[o](t, e._aFilterData, n, e._aData, s) && l.push(n);
            r.length = 0,
            P.merge(r, l)
        }
    }
    function jt(t, e, n, a, r, o) {
        if ("" !== e) {
            for (var i, l = [], s = t.aiDisplay, u = Ht(e, a, r, o), c = 0; c < s.length; c++)
                i = t.aoData[s[c]]._aFilterData[n],
                u.test(i) && l.push(s[c]);
            t.aiDisplay = l
        }
    }
    function Nt(t, e, n, a, r, o) {
        var i, l, s, u = Ht(e, a, r, o), r = t.oPreviousSearch.sSearch, o = t.aiDisplayMaster, c = [];
        if (0 !== w.ext.search.length && (n = !0),
        l = Wt(t),
        e.length <= 0)
            t.aiDisplay = o.slice();
        else {
            for ((l || n || a || r.length > e.length || 0 !== e.indexOf(r) || t.bSorted) && (t.aiDisplay = o.slice()),
            i = t.aiDisplay,
            s = 0; s < i.length; s++)
                u.test(t.aoData[i[s]]._sFilterRow) && c.push(i[s]);
            t.aiDisplay = c
        }
    }
    function Ht(t, e, n, a) {
        return t = e ? t : kt(t),
        n && (t = "^(?=.*?" + P.map(t.match(/"[^"]+"|[^ ]+/g) || [""], function(t) {
            var e;
            return (t = '"' === t.charAt(0) ? (e = t.match(/^"(.*)"$/)) ? e[1] : t : t).replace('"', "")
        }).join(")(?=.*?") + ").*$"),
        new RegExp(t,a ? "i" : "")
    }
    var kt = w.util.escapeRegex
      , Ot = P("<div>")[0]
      , Mt = Ot.textContent !== N;
    function Wt(t) {
        for (var e, n, a, r, o, i = t.aoColumns, l = !1, s = 0, u = t.aoData.length; s < u; s++)
            if (!(o = t.aoData[s])._aFilterData) {
                for (a = [],
                e = 0,
                n = i.length; e < n; e++)
                    i[e].bSearchable ? "string" != typeof (r = null === (r = S(t, s, e, "filter")) ? "" : r) && r.toString && (r = r.toString()) : r = "",
                    r.indexOf && -1 !== r.indexOf("&") && (Ot.innerHTML = r,
                    r = Mt ? Ot.textContent : Ot.innerText),
                    r.replace && (r = r.replace(/[\r\n\u2028]/g, "")),
                    a.push(r);
                o._aFilterData = a,
                o._sFilterRow = a.join("  "),
                l = !0
            }
        return l
    }
    function Et(t) {
        return {
            search: t.sSearch,
            smart: t.bSmart,
            regex: t.bRegex,
            caseInsensitive: t.bCaseInsensitive
        }
    }
    function Bt(t) {
        return {
            sSearch: t.search,
            bSmart: t.smart,
            bRegex: t.regex,
            bCaseInsensitive: t.caseInsensitive
        }
    }
    function Ut(t) {
        var e = t.sTableId
          , n = t.aanFeatures.i
          , a = P("<div/>", {
            class: t.oClasses.sInfo,
            id: n ? null : e + "_info"
        });
        return n || (t.aoDrawCallback.push({
            fn: Xt,
            sName: "information"
        }),
        a.attr("role", "status").attr("aria-live", "polite"),
        P(t.nTable).attr("aria-describedby", e + "_info")),
        a[0]
    }
    function Xt(t) {
        var e, n, a, r, o, i, l = t.aanFeatures.i;
        0 !== l.length && (i = t.oLanguage,
        e = t._iDisplayStart + 1,
        n = t.fnDisplayEnd(),
        a = t.fnRecordsTotal(),
        o = (r = t.fnRecordsDisplay()) ? i.sInfo : i.sInfoEmpty,
        r !== a && (o += " " + i.sInfoFiltered),
        o = Vt(t, o += i.sInfoPostFix),
        null !== (i = i.fnInfoCallback) && (o = i.call(t.oInstance, t, e, n, a, r, o)),
        P(l).html(o))
    }
    function Vt(t, e) {
        var n = t.fnFormatNumber
          , a = t._iDisplayStart + 1
          , r = t._iDisplayLength
          , o = t.fnRecordsDisplay()
          , i = -1 === r;
        return e.replace(/_START_/g, n.call(t, a)).replace(/_END_/g, n.call(t, t.fnDisplayEnd())).replace(/_MAX_/g, n.call(t, t.fnRecordsTotal())).replace(/_TOTAL_/g, n.call(t, o)).replace(/_PAGE_/g, n.call(t, i ? 1 : Math.ceil(a / r))).replace(/_PAGES_/g, n.call(t, i ? 1 : Math.ceil(o / r)))
    }
    function Jt(n) {
        var a, t, e, r = n.iInitDisplayStart, o = n.aoColumns, i = n.oFeatures, l = n.bDeferLoading;
        if (n.bInitialised) {
            for (_t(n),
            yt(n),
            Dt(n, n.aoHeader),
            Dt(n, n.aoFooter),
            D(n, !0),
            i.bAutoWidth && ee(n),
            a = 0,
            t = o.length; a < t; a++)
                (e = o[a]).sWidth && (e.nTh.style.width = M(e.sWidth));
            E(n, null, "preInit", [n]),
            u(n);
            i = B(n);
            "ssp" == i && !l || ("ajax" == i ? Tt(n, [], function(t) {
                var e = Ft(n, t);
                for (a = 0; a < e.length; a++)
                    x(n, e[a]);
                n.iInitDisplayStart = r,
                u(n),
                D(n, !1),
                qt(n, t)
            }) : (D(n, !1),
            qt(n)))
        } else
            setTimeout(function() {
                Jt(n)
            }, 200)
    }
    function qt(t, e) {
        t._bInitComplete = !0,
        (e || t.oInit.aaData) && k(t),
        E(t, null, "plugin-init", [t, e]),
        E(t, "aoInitComplete", "init", [t, e])
    }
    function $t(t, e) {
        e = parseInt(e, 10);
        t._iDisplayLength = e,
        me(t),
        E(t, null, "length", [t, e])
    }
    function Gt(a) {
        for (var t = a.oClasses, e = a.sTableId, n = a.aLengthMenu, r = Array.isArray(n[0]), o = r ? n[0] : n, i = r ? n[1] : n, l = P("<select/>", {
            name: e + "_length",
            "aria-controls": e,
            class: t.sLengthSelect
        }), s = 0, u = o.length; s < u; s++)
            l[0][s] = new Option("number" == typeof i[s] ? a.fnFormatNumber(i[s]) : i[s],o[s]);
        var c = P("<div><label/></div>").addClass(t.sLength);
        return a.aanFeatures.l || (c[0].id = e + "_length"),
        c.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", l[0].outerHTML)),
        P("select", c).val(a._iDisplayLength).on("change.DT", function(t) {
            $t(a, P(this).val()),
            v(a)
        }),
        P(a.nTable).on("length.dt.DT", function(t, e, n) {
            a === e && P("select", c).val(n)
        }),
        c[0]
    }
    function zt(t) {
        function c(t) {
            v(t)
        }
        var e = t.sPaginationType
          , f = w.ext.pager[e]
          , d = "function" == typeof f
          , e = P("<div/>").addClass(t.oClasses.sPaging + e)[0]
          , h = t.aanFeatures;
        return d || f.fnInit(t, e, c),
        h.p || (e.id = t.sTableId + "_paginate",
        t.aoDrawCallback.push({
            fn: function(t) {
                if (d)
                    for (var e = t._iDisplayStart, n = t._iDisplayLength, a = t.fnRecordsDisplay(), r = -1 === n, o = r ? 0 : Math.ceil(e / n), i = r ? 1 : Math.ceil(a / n), l = f(o, i), s = 0, u = h.p.length; s < u; s++)
                        Se(t, "pageButton")(t, h.p[s], s, l, o, i);
                else
                    f.fnUpdate(t, c)
            },
            sName: "pagination"
        })),
        e
    }
    function Yt(t, e, n) {
        var a = t._iDisplayStart
          , r = t._iDisplayLength
          , o = t.fnRecordsDisplay()
          , o = (0 === o || -1 === r ? a = 0 : "number" == typeof e ? o < (a = e * r) && (a = 0) : "first" == e ? a = 0 : "previous" == e ? (a = 0 <= r ? a - r : 0) < 0 && (a = 0) : "next" == e ? a + r < o && (a += r) : "last" == e ? a = Math.floor((o - 1) / r) * r : W(t, 0, "Unknown paging action: " + e, 5),
        t._iDisplayStart !== a);
        return t._iDisplayStart = a,
        o && (E(t, null, "page", [t]),
        n) && v(t),
        o
    }
    function Zt(t) {
        return P("<div/>", {
            id: t.aanFeatures.r ? null : t.sTableId + "_processing",
            class: t.oClasses.sProcessing
        }).html(t.oLanguage.sProcessing).insertBefore(t.nTable)[0]
    }
    function D(t, e) {
        t.oFeatures.bProcessing && P(t.aanFeatures.r).css("display", e ? "block" : "none"),
        E(t, null, "processing", [t, e])
    }
    function Qt(t) {
        var e, n, a, r, o, i, l, s, u, c, f, d, h = P(t.nTable), p = t.oScroll;
        return "" === p.sX && "" === p.sY ? t.nTable : (e = p.sX,
        n = p.sY,
        a = t.oClasses,
        o = (r = h.children("caption")).length ? r[0]._captionSide : null,
        s = P(h[0].cloneNode(!1)),
        i = P(h[0].cloneNode(!1)),
        u = function(t) {
            return t ? M(t) : null
        }
        ,
        (l = h.children("tfoot")).length || (l = null),
        s = P(f = "<div/>", {
            class: a.sScrollWrapper
        }).append(P(f, {
            class: a.sScrollHead
        }).css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: e ? u(e) : "100%"
        }).append(P(f, {
            class: a.sScrollHeadInner
        }).css({
            "box-sizing": "content-box",
            width: p.sXInner || "100%"
        }).append(s.removeAttr("id").css("margin-left", 0).append("top" === o ? r : null).append(h.children("thead"))))).append(P(f, {
            class: a.sScrollBody
        }).css({
            position: "relative",
            overflow: "auto",
            width: u(e)
        }).append(h)),
        l && s.append(P(f, {
            class: a.sScrollFoot
        }).css({
            overflow: "hidden",
            border: 0,
            width: e ? u(e) : "100%"
        }).append(P(f, {
            class: a.sScrollFootInner
        }).append(i.removeAttr("id").css("margin-left", 0).append("bottom" === o ? r : null).append(h.children("tfoot"))))),
        u = s.children(),
        c = u[0],
        f = u[1],
        d = l ? u[2] : null,
        e && P(f).on("scroll.DT", function(t) {
            var e = this.scrollLeft;
            c.scrollLeft = e,
            l && (d.scrollLeft = e)
        }),
        P(f).css("max-height", n),
        p.bCollapse || P(f).css("height", n),
        t.nScrollHead = c,
        t.nScrollBody = f,
        t.nScrollFoot = d,
        t.aoDrawCallback.push({
            fn: Kt,
            sName: "scrolling"
        }),
        s[0])
    }
    function Kt(n) {
        function t(t) {
            (t = t.style).paddingTop = "0",
            t.paddingBottom = "0",
            t.borderTopWidth = "0",
            t.borderBottomWidth = "0",
            t.height = 0
        }
        var e, a, r, o, i, l = n.oScroll, s = l.sX, u = l.sXInner, c = l.sY, l = l.iBarWidth, f = P(n.nScrollHead), d = f[0].style, h = f.children("div"), p = h[0].style, h = h.children("table"), g = n.nScrollBody, b = P(g), m = g.style, S = P(n.nScrollFoot).children("div"), v = S.children("table"), y = P(n.nTHead), D = P(n.nTable), _ = D[0], w = _.style, C = n.nTFoot ? P(n.nTFoot) : null, T = n.oBrowser, x = T.bScrollOversize, A = (H(n.aoColumns, "nTh"),
        []), I = [], F = [], L = [], R = g.scrollHeight > g.clientHeight;
        n.scrollBarVis !== R && n.scrollBarVis !== N ? (n.scrollBarVis = R,
        k(n)) : (n.scrollBarVis = R,
        D.children("thead, tfoot").remove(),
        C && (R = C.clone().prependTo(D),
        i = C.find("tr"),
        a = R.find("tr")),
        R = y.clone().prependTo(D),
        y = y.find("tr"),
        e = R.find("tr"),
        R.find("th, td").removeAttr("tabindex"),
        s || (m.width = "100%",
        f[0].style.width = "100%"),
        P.each(Ct(n, R), function(t, e) {
            r = rt(n, t),
            e.style.width = n.aoColumns[r].sWidth
        }),
        C && O(function(t) {
            t.style.width = ""
        }, a),
        f = D.outerWidth(),
        "" === s ? (w.width = "100%",
        x && (D.find("tbody").height() > g.offsetHeight || "scroll" == b.css("overflow-y")) && (w.width = M(D.outerWidth() - l)),
        f = D.outerWidth()) : "" !== u && (w.width = M(u),
        f = D.outerWidth()),
        O(t, e),
        O(function(t) {
            var e = j.getComputedStyle ? j.getComputedStyle(t).width : M(P(t).width());
            F.push(t.innerHTML),
            A.push(e)
        }, e),
        O(function(t, e) {
            t.style.width = A[e]
        }, y),
        P(e).height(0),
        C && (O(t, a),
        O(function(t) {
            L.push(t.innerHTML),
            I.push(M(P(t).css("width")))
        }, a),
        O(function(t, e) {
            t.style.width = I[e]
        }, i),
        P(a).height(0)),
        O(function(t, e) {
            t.innerHTML = '<div class="dataTables_sizing">' + F[e] + "</div>",
            t.childNodes[0].style.height = "0",
            t.childNodes[0].style.overflow = "hidden",
            t.style.width = A[e]
        }, e),
        C && O(function(t, e) {
            t.innerHTML = '<div class="dataTables_sizing">' + L[e] + "</div>",
            t.childNodes[0].style.height = "0",
            t.childNodes[0].style.overflow = "hidden",
            t.style.width = I[e]
        }, a),
        Math.round(D.outerWidth()) < Math.round(f) ? (o = g.scrollHeight > g.offsetHeight || "scroll" == b.css("overflow-y") ? f + l : f,
        x && (g.scrollHeight > g.offsetHeight || "scroll" == b.css("overflow-y")) && (w.width = M(o - l)),
        "" !== s && "" === u || W(n, 1, "Possible column misalignment", 6)) : o = "100%",
        m.width = M(o),
        d.width = M(o),
        C && (n.nScrollFoot.style.width = M(o)),
        c || x && (m.height = M(_.offsetHeight + l)),
        R = D.outerWidth(),
        h[0].style.width = M(R),
        p.width = M(R),
        y = D.height() > g.clientHeight || "scroll" == b.css("overflow-y"),
        p[i = "padding" + (T.bScrollbarLeft ? "Left" : "Right")] = y ? l + "px" : "0px",
        C && (v[0].style.width = M(R),
        S[0].style.width = M(R),
        S[0].style[i] = y ? l + "px" : "0px"),
        D.children("colgroup").insertBefore(D.children("thead")),
        b.trigger("scroll"),
        !n.bSorted && !n.bFiltered || n._drawHold || (g.scrollTop = 0))
    }
    function O(t, e, n) {
        for (var a, r, o = 0, i = 0, l = e.length; i < l; ) {
            for (a = e[i].firstChild,
            r = n ? n[i].firstChild : null; a; )
                1 === a.nodeType && (n ? t(a, r, o) : t(a, o),
                o++),
                a = a.nextSibling,
                r = n ? r.nextSibling : null;
            i++
        }
    }
    var te = /<.*?>/g;
    function ee(t) {
        var e, n, a = t.nTable, r = t.aoColumns, o = t.oScroll, i = o.sY, l = o.sX, o = o.sXInner, s = r.length, u = it(t, "bVisible"), c = P("th", t.nTHead), f = a.getAttribute("width"), d = a.parentNode, h = !1, p = t.oBrowser, g = p.bScrollOversize, b = a.style.width;
        for (b && -1 !== b.indexOf("%") && (f = b),
        D = 0; D < u.length; D++)
            null !== (e = r[u[D]]).sWidth && (e.sWidth = ae(e.sWidthOrig, d),
            h = !0);
        if (g || !h && !l && !i && s == T(t) && s == c.length)
            for (D = 0; D < s; D++) {
                var m = rt(t, D);
                null !== m && (r[m].sWidth = M(c.eq(D).width()))
            }
        else {
            var b = P(a).clone().css("visibility", "hidden").removeAttr("id")
              , S = (b.find("tbody tr").remove(),
            P("<tr/>").appendTo(b.find("tbody")));
            for (b.find("thead, tfoot").remove(),
            b.append(P(t.nTHead).clone()).append(P(t.nTFoot).clone()),
            b.find("tfoot th, tfoot td").css("width", ""),
            c = Ct(t, b.find("thead")[0]),
            D = 0; D < u.length; D++)
                e = r[u[D]],
                c[D].style.width = null !== e.sWidthOrig && "" !== e.sWidthOrig ? M(e.sWidthOrig) : "",
                e.sWidthOrig && l && P(c[D]).append(P("<div/>").css({
                    width: e.sWidthOrig,
                    margin: 0,
                    padding: 0,
                    border: 0,
                    height: 1
                }));
            if (t.aoData.length)
                for (D = 0; D < u.length; D++)
                    e = r[n = u[D]],
                    P(re(t, n)).clone(!1).append(e.sContentPadding).appendTo(S);
            P("[name]", b).removeAttr("name");
            for (var v = P("<div/>").css(l || i ? {
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                right: 0,
                overflow: "hidden"
            } : {}).append(b).appendTo(d), y = (l && o ? b.width(o) : l ? (b.css("width", "auto"),
            b.removeAttr("width"),
            b.width() < d.clientWidth && f && b.width(d.clientWidth)) : i ? b.width(d.clientWidth) : f && b.width(f),
            0), D = 0; D < u.length; D++) {
                var _ = P(c[D])
                  , w = _.outerWidth() - _.width()
                  , _ = p.bBounding ? Math.ceil(c[D].getBoundingClientRect().width) : _.outerWidth();
                y += _,
                r[u[D]].sWidth = M(_ - w)
            }
            a.style.width = M(y),
            v.remove()
        }
        f && (a.style.width = M(f)),
        !f && !l || t._reszEvt || (o = function() {
            P(j).on("resize.DT-" + t.sInstance, ne(function() {
                k(t)
            }))
        }
        ,
        g ? setTimeout(o, 1e3) : o(),
        t._reszEvt = !0)
    }
    var ne = w.util.throttle;
    function ae(t, e) {
        return t ? (e = (t = P("<div/>").css("width", M(t)).appendTo(e || y.body))[0].offsetWidth,
        t.remove(),
        e) : 0
    }
    function re(t, e) {
        var n, a = oe(t, e);
        return a < 0 ? null : (n = t.aoData[a]).nTr ? n.anCells[e] : P("<td/>").html(S(t, a, e, "display"))[0]
    }
    function oe(t, e) {
        for (var n, a = -1, r = -1, o = 0, i = t.aoData.length; o < i; o++)
            (n = (n = (n = S(t, o, e, "display") + "").replace(te, "")).replace(/&nbsp;/g, " ")).length > a && (a = n.length,
            r = o);
        return r
    }
    function M(t) {
        return null === t ? "0px" : "number" == typeof t ? t < 0 ? "0px" : t + "px" : t.match(/\d$/) ? t + "px" : t
    }
    function I(t) {
        function e(t) {
            t.length && !Array.isArray(t[0]) ? h.push(t) : P.merge(h, t)
        }
        var n, a, r, o, i, l, s, u = [], c = t.aoColumns, f = t.aaSortingFixed, d = P.isPlainObject(f), h = [];
        for (Array.isArray(f) && e(f),
        d && f.pre && e(f.pre),
        e(t.aaSorting),
        d && f.post && e(f.post),
        n = 0; n < h.length; n++)
            for (r = (o = c[s = h[n][a = 0]].aDataSort).length; a < r; a++)
                l = c[i = o[a]].sType || "string",
                h[n]._idx === N && (h[n]._idx = P.inArray(h[n][1], c[i].asSorting)),
                u.push({
                    src: s,
                    col: i,
                    dir: h[n][1],
                    index: h[n]._idx,
                    type: l,
                    formatter: w.ext.type.order[l + "-pre"]
                });
        return u
    }
    function ie(t) {
        var e, n, a, r, c, f = [], u = w.ext.type.order, d = t.aoData, o = (t.aoColumns,
        0), i = t.aiDisplayMaster;
        for (lt(t),
        e = 0,
        n = (c = I(t)).length; e < n; e++)
            (r = c[e]).formatter && o++,
            fe(t, r.col);
        if ("ssp" != B(t) && 0 !== c.length) {
            for (e = 0,
            a = i.length; e < a; e++)
                f[i[e]] = e;
            o === c.length ? i.sort(function(t, e) {
                for (var n, a, r, o, i = c.length, l = d[t]._aSortData, s = d[e]._aSortData, u = 0; u < i; u++)
                    if (0 != (r = (n = l[(o = c[u]).col]) < (a = s[o.col]) ? -1 : a < n ? 1 : 0))
                        return "asc" === o.dir ? r : -r;
                return (n = f[t]) < (a = f[e]) ? -1 : a < n ? 1 : 0
            }) : i.sort(function(t, e) {
                for (var n, a, r, o = c.length, i = d[t]._aSortData, l = d[e]._aSortData, s = 0; s < o; s++)
                    if (n = i[(r = c[s]).col],
                    a = l[r.col],
                    0 !== (r = (u[r.type + "-" + r.dir] || u["string-" + r.dir])(n, a)))
                        return r;
                return (n = f[t]) < (a = f[e]) ? -1 : a < n ? 1 : 0
            })
        }
        t.bSorted = !0
    }
    function le(t) {
        for (var e = t.aoColumns, n = I(t), a = t.oLanguage.oAria, r = 0, o = e.length; r < o; r++) {
            var i = e[r]
              , l = i.asSorting
              , s = i.ariaTitle || i.sTitle.replace(/<.*?>/g, "")
              , u = i.nTh;
            u.removeAttribute("aria-sort"),
            i = i.bSortable ? s + ("asc" === (0 < n.length && n[0].col == r && (u.setAttribute("aria-sort", "asc" == n[0].dir ? "ascending" : "descending"),
            l[n[0].index + 1]) || l[0]) ? a.sSortAscending : a.sSortDescending) : s,
            u.setAttribute("aria-label", i)
        }
    }
    function se(t, e, n, a) {
        function r(t, e) {
            var n = t._idx;
            return (n = n === N ? P.inArray(t[1], s) : n) + 1 < s.length ? n + 1 : e ? null : 0
        }
        var o, i = t.aoColumns[e], l = t.aaSorting, s = i.asSorting;
        "number" == typeof l[0] && (l = t.aaSorting = [l]),
        n && t.oFeatures.bSortMulti ? -1 !== (i = P.inArray(e, H(l, "0"))) ? null === (o = null === (o = r(l[i], !0)) && 1 === l.length ? 0 : o) ? l.splice(i, 1) : (l[i][1] = s[o],
        l[i]._idx = o) : (l.push([e, s[0], 0]),
        l[l.length - 1]._idx = 0) : l.length && l[0][0] == e ? (o = r(l[0]),
        l.length = 1,
        l[0][1] = s[o],
        l[0]._idx = o) : (l.length = 0,
        l.push([e, s[0]]),
        l[0]._idx = 0),
        u(t),
        "function" == typeof a && a(t)
    }
    function ue(e, t, n, a) {
        var r = e.aoColumns[n];
        be(t, {}, function(t) {
            !1 !== r.bSortable && (e.oFeatures.bProcessing ? (D(e, !0),
            setTimeout(function() {
                se(e, n, t.shiftKey, a),
                "ssp" !== B(e) && D(e, !1)
            }, 0)) : se(e, n, t.shiftKey, a))
        })
    }
    function ce(t) {
        var e, n, a, r = t.aLastSort, o = t.oClasses.sSortColumn, i = I(t), l = t.oFeatures;
        if (l.bSort && l.bSortClasses) {
            for (e = 0,
            n = r.length; e < n; e++)
                a = r[e].src,
                P(H(t.aoData, "anCells", a)).removeClass(o + (e < 2 ? e + 1 : 3));
            for (e = 0,
            n = i.length; e < n; e++)
                a = i[e].src,
                P(H(t.aoData, "anCells", a)).addClass(o + (e < 2 ? e + 1 : 3))
        }
        t.aLastSort = i
    }
    function fe(t, e) {
        for (var n, a, r, o = t.aoColumns[e], i = w.ext.order[o.sSortDataType], l = (i && (n = i.call(t.oInstance, t, e, ot(t, e))),
        w.ext.type.order[o.sType + "-pre"]), s = 0, u = t.aoData.length; s < u; s++)
            (a = t.aoData[s])._aSortData || (a._aSortData = []),
            a._aSortData[e] && !i || (r = i ? n[s] : S(t, s, e, "sort"),
            a._aSortData[e] = l ? l(r) : r)
    }
    function F(n) {
        var t;
        n._bLoadingState || (t = {
            time: +new Date,
            start: n._iDisplayStart,
            length: n._iDisplayLength,
            order: P.extend(!0, [], n.aaSorting),
            search: Et(n.oPreviousSearch),
            columns: P.map(n.aoColumns, function(t, e) {
                return {
                    visible: t.bVisible,
                    search: Et(n.aoPreSearchCols[e])
                }
            })
        },
        n.oSavedState = t,
        E(n, "aoStateSaveParams", "stateSaveParams", [n, t]),
        n.oFeatures.bStateSave && !n.bDestroying && n.fnStateSaveCallback.call(n.oInstance, n, t))
    }
    function de(e, t, n) {
        var a;
        if (e.oFeatures.bStateSave)
            return (a = e.fnStateLoadCallback.call(e.oInstance, e, function(t) {
                he(e, t, n)
            })) !== N && he(e, a, n),
            !0;
        n()
    }
    function he(n, t, e) {
        var a, r, o = n.aoColumns, i = (n._bLoadingState = !0,
        n._bInitComplete ? new w.Api(n) : null);
        if (t && t.time) {
            var l = E(n, "aoStateLoadParams", "stateLoadParams", [n, t]);
            if (-1 !== P.inArray(!1, l))
                n._bLoadingState = !1;
            else {
                l = n.iStateDuration;
                if (0 < l && t.time < +new Date - 1e3 * l)
                    n._bLoadingState = !1;
                else if (t.columns && o.length !== t.columns.length)
                    n._bLoadingState = !1;
                else {
                    if (n.oLoadedState = P.extend(!0, {}, t),
                    t.start !== N && (null === i ? (n._iDisplayStart = t.start,
                    n.iInitDisplayStart = t.start) : Yt(n, t.start / t.length)),
                    t.length !== N && (n._iDisplayLength = t.length),
                    t.order !== N && (n.aaSorting = [],
                    P.each(t.order, function(t, e) {
                        n.aaSorting.push(e[0] >= o.length ? [0, e[1]] : e)
                    })),
                    t.search !== N && P.extend(n.oPreviousSearch, Bt(t.search)),
                    t.columns) {
                        for (a = 0,
                        r = t.columns.length; a < r; a++) {
                            var s = t.columns[a];
                            s.visible !== N && (i ? i.column(a).visible(s.visible, !1) : o[a].bVisible = s.visible),
                            s.search !== N && P.extend(n.aoPreSearchCols[a], Bt(s.search))
                        }
                        i && i.columns.adjust()
                    }
                    n._bLoadingState = !1,
                    E(n, "aoStateLoaded", "stateLoaded", [n, t])
                }
            }
        } else
            n._bLoadingState = !1;
        e()
    }
    function pe(t) {
        var e = w.settings
          , t = P.inArray(t, H(e, "nTable"));
        return -1 !== t ? e[t] : null
    }
    function W(t, e, n, a) {
        if (n = "DataTables warning: " + (t ? "table id=" + t.sTableId + " - " : "") + n,
        a && (n += ". For more information about this error, please see http://datatables.net/tn/" + a),
        e)
            j.console && console.log && console.log(n);
        else {
            e = w.ext,
            e = e.sErrMode || e.errMode;
            if (t && E(t, null, "error", [t, a, n]),
            "alert" == e)
                alert(n);
            else {
                if ("throw" == e)
                    throw new Error(n);
                "function" == typeof e && e(t, a, n)
            }
        }
    }
    function L(n, a, t, e) {
        Array.isArray(t) ? P.each(t, function(t, e) {
            Array.isArray(e) ? L(n, a, e[0], e[1]) : L(n, a, e)
        }) : (e === N && (e = t),
        a[t] !== N && (n[e] = a[t]))
    }
    function ge(t, e, n) {
        var a, r;
        for (r in e)
            e.hasOwnProperty(r) && (a = e[r],
            P.isPlainObject(a) ? (P.isPlainObject(t[r]) || (t[r] = {}),
            P.extend(!0, t[r], a)) : n && "data" !== r && "aaData" !== r && Array.isArray(a) ? t[r] = a.slice() : t[r] = a);
        return t
    }
    function be(e, t, n) {
        P(e).on("click.DT", t, function(t) {
            P(e).trigger("blur"),
            n(t)
        }).on("keypress.DT", t, function(t) {
            13 === t.which && (t.preventDefault(),
            n(t))
        }).on("selectstart.DT", function() {
            return !1
        })
    }
    function R(t, e, n, a) {
        n && t[e].push({
            fn: n,
            sName: a
        })
    }
    function E(n, t, e, a) {
        var r = [];
        return t && (r = P.map(n[t].slice().reverse(), function(t, e) {
            return t.fn.apply(n.oInstance, a)
        })),
        null !== e && (t = P.Event(e + ".dt"),
        P(n.nTable).trigger(t, a),
        r.push(t.result)),
        r
    }
    function me(t) {
        var e = t._iDisplayStart
          , n = t.fnDisplayEnd()
          , a = t._iDisplayLength;
        n <= e && (e = n - a),
        e -= e % a,
        t._iDisplayStart = e = -1 === a || e < 0 ? 0 : e
    }
    function Se(t, e) {
        var t = t.renderer
          , n = w.ext.renderer[e];
        return P.isPlainObject(t) && t[e] ? n[t[e]] || n._ : "string" == typeof t && n[t] || n._
    }
    function B(t) {
        return t.oFeatures.bServerSide ? "ssp" : t.ajax || t.sAjaxSource ? "ajax" : "dom"
    }
    function ve(t, n) {
        var a;
        return Array.isArray(t) ? P.map(t, function(t) {
            return ve(t, n)
        }) : "number" == typeof t ? [n[t]] : (a = P.map(n, function(t, e) {
            return t.nTable
        }),
        P(a).filter(t).map(function(t) {
            var e = P.inArray(this, a);
            return n[e]
        }).toArray())
    }
    function ye(r, o, t) {
        var e, n;
        t && (e = new U(r)).one("draw", function() {
            t(e.ajax.json())
        }),
        "ssp" == B(r) ? u(r, o) : (D(r, !0),
        (n = r.jqXHR) && 4 !== n.readyState && n.abort(),
        Tt(r, [], function(t) {
            pt(r);
            for (var e = Ft(r, t), n = 0, a = e.length; n < a; n++)
                x(r, e[n]);
            u(r, o),
            D(r, !1)
        }))
    }
    function De(t, e, n, a, r) {
        for (var o, i, l, s, u = [], c = typeof e, f = 0, d = (e = e && "string" != c && "function" != c && e.length !== N ? e : [e]).length; f < d; f++)
            for (l = 0,
            s = (i = e[f] && e[f].split && !e[f].match(/[\[\(:]/) ? e[f].split(",") : [e[f]]).length; l < s; l++)
                (o = n("string" == typeof i[l] ? i[l].trim() : i[l])) && o.length && (u = u.concat(o));
        var h = p.selector[t];
        if (h.length)
            for (f = 0,
            d = h.length; f < d; f++)
                u = h[f](a, r, u);
        return z(u)
    }
    function _e(t) {
        return (t = t || {}).filter && t.search === N && (t.search = t.filter),
        P.extend({
            search: "none",
            order: "current",
            page: "all"
        }, t)
    }
    function we(t) {
        for (var e = 0, n = t.length; e < n; e++)
            if (0 < t[e].length)
                return t[0] = t[e],
                t[0].length = 1,
                t.length = 1,
                t.context = [t.context[e]],
                t;
        return t.length = 0,
        t
    }
    function Ce(o, t, e, n) {
        function i(t, e) {
            var n;
            if (Array.isArray(t) || t instanceof P)
                for (var a = 0, r = t.length; a < r; a++)
                    i(t[a], e);
            else
                t.nodeName && "tr" === t.nodeName.toLowerCase() ? l.push(t) : (n = P("<tr><td></td></tr>").addClass(e),
                P("td", n).addClass(e).html(t)[0].colSpan = T(o),
                l.push(n[0]))
        }
        var l = [];
        i(e, n),
        t._details && t._details.detach(),
        t._details = P(l),
        t._detailsShow && t._details.insertAfter(t.nTr)
    }
    function Te(t, e) {
        var n = t.context;
        if (n.length && t.length) {
            var a = n[0].aoData[t[0]];
            if (a._details) {
                (a._detailsShow = e) ? (a._details.insertAfter(a.nTr),
                P(a.nTr).addClass("dt-hasChild")) : (a._details.detach(),
                P(a.nTr).removeClass("dt-hasChild")),
                E(n[0], null, "childRow", [e, t.row(t[0])]);
                var s = n[0]
                  , r = new U(s)
                  , a = ".dt.DT_details"
                  , e = "draw" + a
                  , t = "column-visibility" + a
                  , a = "destroy" + a
                  , u = s.aoData;
                if (r.off(e + " " + t + " " + a),
                H(u, "_details").length > 0) {
                    r.on(e, function(t, e) {
                        if (s !== e)
                            return;
                        r.rows({
                            page: "current"
                        }).eq(0).each(function(t) {
                            var e = u[t];
                            if (e._detailsShow)
                                e._details.insertAfter(e.nTr)
                        })
                    });
                    r.on(t, function(t, e, n, a) {
                        if (s !== e)
                            return;
                        var r, o = T(e);
                        for (var i = 0, l = u.length; i < l; i++) {
                            r = u[i];
                            if (r._details)
                                r._details.children("td[colspan]").attr("colspan", o)
                        }
                    });
                    r.on(a, function(t, e) {
                        if (s !== e)
                            return;
                        for (var n = 0, a = u.length; n < a; n++)
                            if (u[n]._details)
                                Fe(r, n)
                    })
                }
                F(n[0])
            }
        }
    }
    function xe(t, e, n, a, r) {
        for (var o = [], i = 0, l = r.length; i < l; i++)
            o.push(S(t, r[i], e));
        return o
    }
    var Ae = []
      , o = Array.prototype
      , U = function(t, e) {
        if (!(this instanceof U))
            return new U(t,e);
        function n(t) {
            var e, n, a, r;
            t = t,
            a = w.settings,
            r = P.map(a, function(t, e) {
                return t.nTable
            }),
            (t = t ? t.nTable && t.oApi ? [t] : t.nodeName && "table" === t.nodeName.toLowerCase() ? -1 !== (e = P.inArray(t, r)) ? [a[e]] : null : t && "function" == typeof t.settings ? t.settings().toArray() : ("string" == typeof t ? n = P(t) : t instanceof P && (n = t),
            n ? n.map(function(t) {
                return -1 !== (e = P.inArray(this, r)) ? a[e] : null
            }).toArray() : void 0) : []) && o.push.apply(o, t)
        }
        var o = [];
        if (Array.isArray(t))
            for (var a = 0, r = t.length; a < r; a++)
                n(t[a]);
        else
            n(t);
        this.context = z(o),
        e && P.merge(this, e),
        this.selector = {
            rows: null,
            cols: null,
            opts: null
        },
        U.extend(this, this, Ae)
    }
      , Ie = (w.Api = U,
    P.extend(U.prototype, {
        any: function() {
            return 0 !== this.count()
        },
        concat: o.concat,
        context: [],
        count: function() {
            return this.flatten().length
        },
        each: function(t) {
            for (var e = 0, n = this.length; e < n; e++)
                t.call(this, this[e], e, this);
            return this
        },
        eq: function(t) {
            var e = this.context;
            return e.length > t ? new U(e[t],this[t]) : null
        },
        filter: function(t) {
            var e = [];
            if (o.filter)
                e = o.filter.call(this, t, this);
            else
                for (var n = 0, a = this.length; n < a; n++)
                    t.call(this, this[n], n, this) && e.push(this[n]);
            return new U(this.context,e)
        },
        flatten: function() {
            var t = [];
            return new U(this.context,t.concat.apply(t, this.toArray()))
        },
        join: o.join,
        indexOf: o.indexOf || function(t, e) {
            for (var n = e || 0, a = this.length; n < a; n++)
                if (this[n] === t)
                    return n;
            return -1
        }
        ,
        iterator: function(t, e, n, a) {
            var r, o, i, l, s, u, c, f, d = [], h = this.context, p = this.selector;
            for ("string" == typeof t && (a = n,
            n = e,
            e = t,
            t = !1),
            o = 0,
            i = h.length; o < i; o++) {
                var g = new U(h[o]);
                if ("table" === e)
                    (r = n.call(g, h[o], o)) !== N && d.push(r);
                else if ("columns" === e || "rows" === e)
                    (r = n.call(g, h[o], this[o], o)) !== N && d.push(r);
                else if ("column" === e || "column-rows" === e || "row" === e || "cell" === e)
                    for (c = this[o],
                    "column-rows" === e && (u = Ie(h[o], p.opts)),
                    l = 0,
                    s = c.length; l < s; l++)
                        f = c[l],
                        (r = "cell" === e ? n.call(g, h[o], f.row, f.column, o, l) : n.call(g, h[o], f, o, l, u)) !== N && d.push(r)
            }
            return d.length || a ? ((t = (a = new U(h,t ? d.concat.apply([], d) : d)).selector).rows = p.rows,
            t.cols = p.cols,
            t.opts = p.opts,
            a) : this
        },
        lastIndexOf: o.lastIndexOf || function(t, e) {
            return this.indexOf.apply(this.toArray.reverse(), arguments)
        }
        ,
        length: 0,
        map: function(t) {
            var e = [];
            if (o.map)
                e = o.map.call(this, t, this);
            else
                for (var n = 0, a = this.length; n < a; n++)
                    e.push(t.call(this, this[n], n));
            return new U(this.context,e)
        },
        pluck: function(e) {
            return this.map(function(t) {
                return t[e]
            })
        },
        pop: o.pop,
        push: o.push,
        reduce: o.reduce || function(t, e) {
            return et(this, t, e, 0, this.length, 1)
        }
        ,
        reduceRight: o.reduceRight || function(t, e) {
            return et(this, t, e, this.length - 1, -1, -1)
        }
        ,
        reverse: o.reverse,
        selector: null,
        shift: o.shift,
        slice: function() {
            return new U(this.context,this)
        },
        sort: o.sort,
        splice: o.splice,
        toArray: function() {
            return o.slice.call(this)
        },
        to$: function() {
            return P(this)
        },
        toJQuery: function() {
            return P(this)
        },
        unique: function() {
            return new U(this.context,z(this))
        },
        unshift: o.unshift
    }),
    U.extend = function(t, e, n) {
        if (n.length && e && (e instanceof U || e.__dt_wrapper))
            for (var a, r = 0, o = n.length; r < o; r++)
                e[(a = n[r]).name] = "function" === a.type ? function(e, n, a) {
                    return function() {
                        var t = n.apply(e, arguments);
                        return U.extend(t, t, a.methodExt),
                        t
                    }
                }(t, a.val, a) : "object" === a.type ? {} : a.val,
                e[a.name].__dt_wrapper = !0,
                U.extend(t, e[a.name], a.propExt)
    }
    ,
    U.register = e = function(t, e) {
        if (Array.isArray(t))
            for (var n = 0, a = t.length; n < a; n++)
                U.register(t[n], e);
        else
            for (var r = t.split("."), o = Ae, i = 0, l = r.length; i < l; i++) {
                var s, u, c = function(t, e) {
                    for (var n = 0, a = t.length; n < a; n++)
                        if (t[n].name === e)
                            return t[n];
                    return null
                }(o, u = (s = -1 !== r[i].indexOf("()")) ? r[i].replace("()", "") : r[i]);
                c || o.push(c = {
                    name: u,
                    val: {},
                    methodExt: [],
                    propExt: [],
                    type: "object"
                }),
                i === l - 1 ? (c.val = e,
                c.type = "function" == typeof e ? "function" : P.isPlainObject(e) ? "object" : "other") : o = s ? c.methodExt : c.propExt
            }
    }
    ,
    U.registerPlural = t = function(t, e, n) {
        U.register(t, n),
        U.register(e, function() {
            var t = n.apply(this, arguments);
            return t === this ? this : t instanceof U ? t.length ? Array.isArray(t[0]) ? new U(t.context,t[0]) : t[0] : N : t
        })
    }
    ,
    e("tables()", function(t) {
        return t !== N && null !== t ? new U(ve(t, this.context)) : this
    }),
    e("table()", function(t) {
        var t = this.tables(t)
          , e = t.context;
        return e.length ? new U(e[0]) : t
    }),
    t("tables().nodes()", "table().node()", function() {
        return this.iterator("table", function(t) {
            return t.nTable
        }, 1)
    }),
    t("tables().body()", "table().body()", function() {
        return this.iterator("table", function(t) {
            return t.nTBody
        }, 1)
    }),
    t("tables().header()", "table().header()", function() {
        return this.iterator("table", function(t) {
            return t.nTHead
        }, 1)
    }),
    t("tables().footer()", "table().footer()", function() {
        return this.iterator("table", function(t) {
            return t.nTFoot
        }, 1)
    }),
    t("tables().containers()", "table().container()", function() {
        return this.iterator("table", function(t) {
            return t.nTableWrapper
        }, 1)
    }),
    e("draw()", function(e) {
        return this.iterator("table", function(t) {
            "page" === e ? v(t) : u(t, !1 === (e = "string" == typeof e ? "full-hold" !== e : e))
        })
    }),
    e("page()", function(e) {
        return e === N ? this.page.info().page : this.iterator("table", function(t) {
            Yt(t, e)
        })
    }),
    e("page.info()", function(t) {
        var e, n, a, r, o;
        return 0 === this.context.length ? N : (n = (e = this.context[0])._iDisplayStart,
        a = e.oFeatures.bPaginate ? e._iDisplayLength : -1,
        r = e.fnRecordsDisplay(),
        {
            page: (o = -1 === a) ? 0 : Math.floor(n / a),
            pages: o ? 1 : Math.ceil(r / a),
            start: n,
            end: e.fnDisplayEnd(),
            length: a,
            recordsTotal: e.fnRecordsTotal(),
            recordsDisplay: r,
            serverSide: "ssp" === B(e)
        })
    }),
    e("page.len()", function(e) {
        return e === N ? 0 !== this.context.length ? this.context[0]._iDisplayLength : N : this.iterator("table", function(t) {
            $t(t, e)
        })
    }),
    e("ajax.json()", function() {
        var t = this.context;
        if (0 < t.length)
            return t[0].json
    }),
    e("ajax.params()", function() {
        var t = this.context;
        if (0 < t.length)
            return t[0].oAjaxData
    }),
    e("ajax.reload()", function(e, n) {
        return this.iterator("table", function(t) {
            ye(t, !1 === n, e)
        })
    }),
    e("ajax.url()", function(e) {
        var t = this.context;
        return e === N ? 0 === t.length ? N : (t = t[0]).ajax ? P.isPlainObject(t.ajax) ? t.ajax.url : t.ajax : t.sAjaxSource : this.iterator("table", function(t) {
            P.isPlainObject(t.ajax) ? t.ajax.url = e : t.ajax = e
        })
    }),
    e("ajax.url().load()", function(e, n) {
        return this.iterator("table", function(t) {
            ye(t, !1 === n, e)
        })
    }),
    function(t, e) {
        var n, a = [], r = t.aiDisplay, o = t.aiDisplayMaster, i = e.search, l = e.order, e = e.page;
        if ("ssp" == B(t))
            return "removed" === i ? [] : f(0, o.length);
        if ("current" == e)
            for (u = t._iDisplayStart,
            c = t.fnDisplayEnd(); u < c; u++)
                a.push(r[u]);
        else if ("current" == l || "applied" == l) {
            if ("none" == i)
                a = o.slice();
            else if ("applied" == i)
                a = r.slice();
            else if ("removed" == i) {
                for (var s = {}, u = 0, c = r.length; u < c; u++)
                    s[r[u]] = null;
                a = P.map(o, function(t) {
                    return s.hasOwnProperty(t) ? null : t
                })
            }
        } else if ("index" == l || "original" == l)
            for (u = 0,
            c = t.aoData.length; u < c; u++)
                ("none" == i || -1 === (n = P.inArray(u, r)) && "removed" == i || 0 <= n && "applied" == i) && a.push(u);
        return a
    }
    )
      , Fe = (e("rows()", function(e, n) {
        e === N ? e = "" : P.isPlainObject(e) && (n = e,
        e = ""),
        n = _e(n);
        var t = this.iterator("table", function(t) {
            return De("row", e, function(n) {
                var t = d(n)
                  , a = r.aoData;
                if (null !== t && !o)
                    return [t];
                if (i = i || Ie(r, o),
                null !== t && -1 !== P.inArray(t, i))
                    return [t];
                if (null === n || n === N || "" === n)
                    return i;
                if ("function" == typeof n)
                    return P.map(i, function(t) {
                        var e = a[t];
                        return n(t, e._aData, e.nTr) ? t : null
                    });
                if (n.nodeName)
                    return t = n._DT_RowIndex,
                    e = n._DT_CellIndex,
                    t !== N ? a[t] && a[t].nTr === n ? [t] : [] : e ? a[e.row] && a[e.row].nTr === n.parentNode ? [e.row] : [] : (t = P(n).closest("*[data-dt-row]")).length ? [t.data("dt-row")] : [];
                if ("string" == typeof n && "#" === n.charAt(0)) {
                    var e = r.aIds[n.replace(/^#/, "")];
                    if (e !== N)
                        return [e.idx]
                }
                t = _(m(r.aoData, i, "nTr"));
                return P(t).filter(n).map(function() {
                    return this._DT_RowIndex
                }).toArray()
            }, r = t, o = n);
            var r, o, i
        }, 1);
        return t.selector.rows = e,
        t.selector.opts = n,
        t
    }),
    e("rows().nodes()", function() {
        return this.iterator("row", function(t, e) {
            return t.aoData[e].nTr || N
        }, 1)
    }),
    e("rows().data()", function() {
        return this.iterator(!0, "rows", function(t, e) {
            return m(t.aoData, e, "_aData")
        }, 1)
    }),
    t("rows().cache()", "row().cache()", function(n) {
        return this.iterator("row", function(t, e) {
            t = t.aoData[e];
            return "search" === n ? t._aFilterData : t._aSortData
        }, 1)
    }),
    t("rows().invalidate()", "row().invalidate()", function(n) {
        return this.iterator("row", function(t, e) {
            bt(t, e, n)
        })
    }),
    t("rows().indexes()", "row().index()", function() {
        return this.iterator("row", function(t, e) {
            return e
        }, 1)
    }),
    t("rows().ids()", "row().id()", function(t) {
        for (var e = [], n = this.context, a = 0, r = n.length; a < r; a++)
            for (var o = 0, i = this[a].length; o < i; o++) {
                var l = n[a].rowIdFn(n[a].aoData[this[a][o]]._aData);
                e.push((!0 === t ? "#" : "") + l)
            }
        return new U(n,e)
    }),
    t("rows().remove()", "row().remove()", function() {
        var f = this;
        return this.iterator("row", function(t, e, n) {
            var a, r, o, i, l, s, u = t.aoData, c = u[e];
            for (u.splice(e, 1),
            a = 0,
            r = u.length; a < r; a++)
                if (s = (l = u[a]).anCells,
                null !== l.nTr && (l.nTr._DT_RowIndex = a),
                null !== s)
                    for (o = 0,
                    i = s.length; o < i; o++)
                        s[o]._DT_CellIndex.row = a;
            gt(t.aiDisplayMaster, e),
            gt(t.aiDisplay, e),
            gt(f[n], e, !1),
            0 < t._iRecordsDisplay && t._iRecordsDisplay--,
            me(t);
            n = t.rowIdFn(c._aData);
            n !== N && delete t.aIds[n]
        }),
        this.iterator("table", function(t) {
            for (var e = 0, n = t.aoData.length; e < n; e++)
                t.aoData[e].idx = e
        }),
        this
    }),
    e("rows.add()", function(o) {
        var t = this.iterator("table", function(t) {
            for (var e, n = [], a = 0, r = o.length; a < r; a++)
                (e = o[a]).nodeName && "TR" === e.nodeName.toUpperCase() ? n.push(ut(t, e)[0]) : n.push(x(t, e));
            return n
        }, 1)
          , e = this.rows(-1);
        return e.pop(),
        P.merge(e, t),
        e
    }),
    e("row()", function(t, e) {
        return we(this.rows(t, e))
    }),
    e("row().data()", function(t) {
        var e, n = this.context;
        return t === N ? n.length && this.length ? n[0].aoData[this[0]]._aData : N : ((e = n[0].aoData[this[0]])._aData = t,
        Array.isArray(t) && e.nTr && e.nTr.id && b(n[0].rowId)(t, e.nTr.id),
        bt(n[0], this[0], "data"),
        this)
    }),
    e("row().node()", function() {
        var t = this.context;
        return t.length && this.length && t[0].aoData[this[0]].nTr || null
    }),
    e("row.add()", function(e) {
        e instanceof P && e.length && (e = e[0]);
        var t = this.iterator("table", function(t) {
            return e.nodeName && "TR" === e.nodeName.toUpperCase() ? ut(t, e)[0] : x(t, e)
        });
        return this.row(t[0])
    }),
    P(y).on("plugin-init.dt", function(t, e) {
        var r = new U(e)
          , n = (r.on("stateSaveParams", function(t, e, n) {
            var a = r.rows().iterator("row", function(t, e) {
                return t.aoData[e]._detailsShow ? e : N
            });
            n.childRows = r.rows(a).ids(!0).toArray()
        }),
        r.state.loaded());
        n && n.childRows && r.rows(n.childRows).every(function() {
            E(e, null, "requestChild", [this])
        })
    }),
    function(t, e) {
        var n = t.context;
        n.length && (e = n[0].aoData[e !== N ? e : t[0]]) && e._details && (e._details.remove(),
        e._detailsShow = N,
        e._details = N,
        P(e.nTr).removeClass("dt-hasChild"),
        F(n[0]))
    }
    )
      , Le = "row().child"
      , Re = Le + "()"
      , Pe = (e(Re, function(t, e) {
        var n = this.context;
        return t === N ? n.length && this.length ? n[0].aoData[this[0]]._details : N : (!0 === t ? this.child.show() : !1 === t ? Fe(this) : n.length && this.length && Ce(n[0], n[0].aoData[this[0]], t, e),
        this)
    }),
    e([Le + ".show()", Re + ".show()"], function(t) {
        return Te(this, !0),
        this
    }),
    e([Le + ".hide()", Re + ".hide()"], function() {
        return Te(this, !1),
        this
    }),
    e([Le + ".remove()", Re + ".remove()"], function() {
        return Fe(this),
        this
    }),
    e(Le + ".isShown()", function() {
        var t = this.context;
        return t.length && this.length && t[0].aoData[this[0]]._detailsShow || !1
    }),
    /^([^:]+):(name|visIdx|visible)$/)
      , je = (e("columns()", function(n, a) {
        n === N ? n = "" : P.isPlainObject(n) && (a = n,
        n = ""),
        a = _e(a);
        var t = this.iterator("table", function(t) {
            return e = n,
            l = a,
            s = (i = t).aoColumns,
            u = H(s, "sName"),
            c = H(s, "nTh"),
            De("column", e, function(n) {
                var a, t = d(n);
                if ("" === n)
                    return f(s.length);
                if (null !== t)
                    return [0 <= t ? t : s.length + t];
                if ("function" == typeof n)
                    return a = Ie(i, l),
                    P.map(s, function(t, e) {
                        return n(e, xe(i, e, 0, 0, a), c[e]) ? e : null
                    });
                var r = "string" == typeof n ? n.match(Pe) : "";
                if (r)
                    switch (r[2]) {
                    case "visIdx":
                    case "visible":
                        var e, o = parseInt(r[1], 10);
                        return o < 0 ? [(e = P.map(s, function(t, e) {
                            return t.bVisible ? e : null
                        }))[e.length + o]] : [rt(i, o)];
                    case "name":
                        return P.map(u, function(t, e) {
                            return t === r[1] ? e : null
                        });
                    default:
                        return []
                    }
                return n.nodeName && n._DT_CellIndex ? [n._DT_CellIndex.column] : (t = P(c).filter(n).map(function() {
                    return P.inArray(this, c)
                }).toArray()).length || !n.nodeName ? t : (t = P(n).closest("*[data-dt-column]")).length ? [t.data("dt-column")] : []
            }, i, l);
            var i, e, l, s, u, c
        }, 1);
        return t.selector.cols = n,
        t.selector.opts = a,
        t
    }),
    t("columns().header()", "column().header()", function(t, e) {
        return this.iterator("column", function(t, e) {
            return t.aoColumns[e].nTh
        }, 1)
    }),
    t("columns().footer()", "column().footer()", function(t, e) {
        return this.iterator("column", function(t, e) {
            return t.aoColumns[e].nTf
        }, 1)
    }),
    t("columns().data()", "column().data()", function() {
        return this.iterator("column-rows", xe, 1)
    }),
    t("columns().dataSrc()", "column().dataSrc()", function() {
        return this.iterator("column", function(t, e) {
            return t.aoColumns[e].mData
        }, 1)
    }),
    t("columns().cache()", "column().cache()", function(o) {
        return this.iterator("column-rows", function(t, e, n, a, r) {
            return m(t.aoData, r, "search" === o ? "_aFilterData" : "_aSortData", e)
        }, 1)
    }),
    t("columns().nodes()", "column().nodes()", function() {
        return this.iterator("column-rows", function(t, e, n, a, r) {
            return m(t.aoData, r, "anCells", e)
        }, 1)
    }),
    t("columns().visible()", "column().visible()", function(f, n) {
        var e = this
          , t = this.iterator("column", function(t, e) {
            if (f === N)
                return t.aoColumns[e].bVisible;
            var n, a, r = e, e = f, o = t.aoColumns, i = o[r], l = t.aoData;
            if (e === N)
                i.bVisible;
            else if (i.bVisible !== e) {
                if (e)
                    for (var s = P.inArray(!0, H(o, "bVisible"), r + 1), u = 0, c = l.length; u < c; u++)
                        a = l[u].nTr,
                        n = l[u].anCells,
                        a && a.insertBefore(n[r], n[s] || null);
                else
                    P(H(t.aoData, "anCells", r)).detach();
                i.bVisible = e
            }
        });
        return f !== N && this.iterator("table", function(t) {
            Dt(t, t.aoHeader),
            Dt(t, t.aoFooter),
            t.aiDisplay.length || P(t.nTBody).find("td[colspan]").attr("colspan", T(t)),
            F(t),
            e.iterator("column", function(t, e) {
                E(t, null, "column-visibility", [t, e, f, n])
            }),
            n !== N && !n || e.columns.adjust()
        }),
        t
    }),
    t("columns().indexes()", "column().index()", function(n) {
        return this.iterator("column", function(t, e) {
            return "visible" === n ? ot(t, e) : e
        }, 1)
    }),
    e("columns.adjust()", function() {
        return this.iterator("table", function(t) {
            k(t)
        }, 1)
    }),
    e("column.index()", function(t, e) {
        var n;
        if (0 !== this.context.length)
            return n = this.context[0],
            "fromVisible" === t || "toData" === t ? rt(n, e) : "fromData" === t || "toVisible" === t ? ot(n, e) : void 0
    }),
    e("column()", function(t, e) {
        return we(this.columns(t, e))
    }),
    e("cells()", function(g, t, b) {
        var a, r, o, i, l, s, e;
        return P.isPlainObject(g) && (g.row === N ? (b = g,
        g = null) : (b = t,
        t = null)),
        P.isPlainObject(t) && (b = t,
        t = null),
        null === t || t === N ? this.iterator("table", function(t) {
            return a = t,
            t = g,
            e = _e(b),
            f = a.aoData,
            d = Ie(a, e),
            n = _(m(f, d, "anCells")),
            h = P(Y([], n)),
            p = a.aoColumns.length,
            De("cell", t, function(t) {
                var e, n = "function" == typeof t;
                if (null === t || t === N || n) {
                    for (o = [],
                    i = 0,
                    l = d.length; i < l; i++)
                        for (r = d[i],
                        s = 0; s < p; s++)
                            u = {
                                row: r,
                                column: s
                            },
                            (!n || (c = f[r],
                            t(u, S(a, r, s), c.anCells ? c.anCells[s] : null))) && o.push(u);
                    return o
                }
                return P.isPlainObject(t) ? t.column !== N && t.row !== N && -1 !== P.inArray(t.row, d) ? [t] : [] : (e = h.filter(t).map(function(t, e) {
                    return {
                        row: e._DT_CellIndex.row,
                        column: e._DT_CellIndex.column
                    }
                }).toArray()).length || !t.nodeName ? e : (c = P(t).closest("*[data-dt-row]")).length ? [{
                    row: c.data("dt-row"),
                    column: c.data("dt-column")
                }] : []
            }, a, e);
            var a, e, r, o, i, l, s, u, c, f, d, n, h, p
        }) : (e = b ? {
            page: b.page,
            order: b.order,
            search: b.search
        } : {},
        a = this.columns(t, e),
        r = this.rows(g, e),
        e = this.iterator("table", function(t, e) {
            var n = [];
            for (o = 0,
            i = r[e].length; o < i; o++)
                for (l = 0,
                s = a[e].length; l < s; l++)
                    n.push({
                        row: r[e][o],
                        column: a[e][l]
                    });
            return n
        }, 1),
        e = b && b.selected ? this.cells(e, b) : e,
        P.extend(e.selector, {
            cols: t,
            rows: g,
            opts: b
        }),
        e)
    }),
    t("cells().nodes()", "cell().node()", function() {
        return this.iterator("cell", function(t, e, n) {
            t = t.aoData[e];
            return t && t.anCells ? t.anCells[n] : N
        }, 1)
    }),
    e("cells().data()", function() {
        return this.iterator("cell", function(t, e, n) {
            return S(t, e, n)
        }, 1)
    }),
    t("cells().cache()", "cell().cache()", function(a) {
        return a = "search" === a ? "_aFilterData" : "_aSortData",
        this.iterator("cell", function(t, e, n) {
            return t.aoData[e][a][n]
        }, 1)
    }),
    t("cells().render()", "cell().render()", function(a) {
        return this.iterator("cell", function(t, e, n) {
            return S(t, e, n, a)
        }, 1)
    }),
    t("cells().indexes()", "cell().index()", function() {
        return this.iterator("cell", function(t, e, n) {
            return {
                row: e,
                column: n,
                columnVisible: ot(t, n)
            }
        }, 1)
    }),
    t("cells().invalidate()", "cell().invalidate()", function(a) {
        return this.iterator("cell", function(t, e, n) {
            bt(t, e, a, n)
        })
    }),
    e("cell()", function(t, e, n) {
        return we(this.cells(t, e, n))
    }),
    e("cell().data()", function(t) {
        var e = this.context
          , n = this[0];
        return t === N ? e.length && n.length ? S(e[0], n[0].row, n[0].column) : N : (ct(e[0], n[0].row, n[0].column, t),
        bt(e[0], n[0].row, "data", n[0].column),
        this)
    }),
    e("order()", function(e, t) {
        var n = this.context;
        return e === N ? 0 !== n.length ? n[0].aaSorting : N : ("number" == typeof e ? e = [[e, t]] : e.length && !Array.isArray(e[0]) && (e = Array.prototype.slice.call(arguments)),
        this.iterator("table", function(t) {
            t.aaSorting = e.slice()
        }))
    }),
    e("order.listener()", function(e, n, a) {
        return this.iterator("table", function(t) {
            ue(t, e, n, a)
        })
    }),
    e("order.fixed()", function(e) {
        var t;
        return e ? this.iterator("table", function(t) {
            t.aaSortingFixed = P.extend(!0, {}, e)
        }) : (t = (t = this.context).length ? t[0].aaSortingFixed : N,
        Array.isArray(t) ? {
            pre: t
        } : t)
    }),
    e(["columns().order()", "column().order()"], function(a) {
        var r = this;
        return this.iterator("table", function(t, e) {
            var n = [];
            P.each(r[e], function(t, e) {
                n.push([e, a])
            }),
            t.aaSorting = n
        })
    }),
    e("search()", function(e, n, a, r) {
        var t = this.context;
        return e === N ? 0 !== t.length ? t[0].oPreviousSearch.sSearch : N : this.iterator("table", function(t) {
            t.oFeatures.bFilter && Rt(t, P.extend({}, t.oPreviousSearch, {
                sSearch: e + "",
                bRegex: null !== n && n,
                bSmart: null === a || a,
                bCaseInsensitive: null === r || r
            }), 1)
        })
    }),
    t("columns().search()", "column().search()", function(a, r, o, i) {
        return this.iterator("column", function(t, e) {
            var n = t.aoPreSearchCols;
            if (a === N)
                return n[e].sSearch;
            t.oFeatures.bFilter && (P.extend(n[e], {
                sSearch: a + "",
                bRegex: null !== r && r,
                bSmart: null === o || o,
                bCaseInsensitive: null === i || i
            }),
            Rt(t, t.oPreviousSearch, 1))
        })
    }),
    e("state()", function() {
        return this.context.length ? this.context[0].oSavedState : null
    }),
    e("state.clear()", function() {
        return this.iterator("table", function(t) {
            t.fnStateSaveCallback.call(t.oInstance, t, {})
        })
    }),
    e("state.loaded()", function() {
        return this.context.length ? this.context[0].oLoadedState : null
    }),
    e("state.save()", function() {
        return this.iterator("table", function(t) {
            F(t)
        })
    }),
    w.versionCheck = w.fnVersionCheck = function(t) {
        for (var e, n, a = w.version.split("."), r = t.split("."), o = 0, i = r.length; o < i; o++)
            if ((e = parseInt(a[o], 10) || 0) !== (n = parseInt(r[o], 10) || 0))
                return n < e;
        return !0
    }
    ,
    w.isDataTable = w.fnIsDataTable = function(t) {
        var r = P(t).get(0)
          , o = !1;
        return t instanceof w.Api || (P.each(w.settings, function(t, e) {
            var n = e.nScrollHead ? P("table", e.nScrollHead)[0] : null
              , a = e.nScrollFoot ? P("table", e.nScrollFoot)[0] : null;
            e.nTable !== r && n !== r && a !== r || (o = !0)
        }),
        o)
    }
    ,
    w.tables = w.fnTables = function(e) {
        var t = !1
          , n = (P.isPlainObject(e) && (t = e.api,
        e = e.visible),
        P.map(w.settings, function(t) {
            if (!e || P(t.nTable).is(":visible"))
                return t.nTable
        }));
        return t ? new U(n) : n
    }
    ,
    w.camelToHungarian = C,
    e("$()", function(t, e) {
        e = this.rows(e).nodes(),
        e = P(e);
        return P([].concat(e.filter(t).toArray(), e.find(t).toArray()))
    }),
    P.each(["on", "one", "off"], function(t, n) {
        e(n + "()", function() {
            var t = Array.prototype.slice.call(arguments)
              , e = (t[0] = P.map(t[0].split(/\s/), function(t) {
                return t.match(/\.dt\b/) ? t : t + ".dt"
            }).join(" "),
            P(this.tables().nodes()));
            return e[n].apply(e, t),
            this
        })
    }),
    e("clear()", function() {
        return this.iterator("table", function(t) {
            pt(t)
        })
    }),
    e("settings()", function() {
        return new U(this.context,this.context)
    }),
    e("init()", function() {
        var t = this.context;
        return t.length ? t[0].oInit : null
    }),
    e("data()", function() {
        return this.iterator("table", function(t) {
            return H(t.aoData, "_aData")
        }).flatten()
    }),
    e("destroy()", function(f) {
        return f = f || !1,
        this.iterator("table", function(e) {
            var n, t = e.nTableWrapper?.parentNode, a = e.oClasses, r = e.nTable, o = e.nTBody, i = e.nTHead, l = e.nTFoot, s = P(r), o = P(o), u = P(e.nTableWrapper), c = P.map(e.aoData, function(t) {
                return t.nTr
            }), l = (e.bDestroying = !0,
            E(e, "aoDestroyCallback", "destroy", [e]),
            f || new U(e).columns().visible(!0),
            u.off(".DT").find(":not(tbody *)").off(".DT"),
            P(j).off(".DT-" + e.sInstance),
            r != i.parentNode && (s.children("thead").detach(),
            s.append(i)),
            l && r != l.parentNode && (s.children("tfoot").detach(),
            s.append(l)),
            e.aaSorting = [],
            e.aaSortingFixed = [],
            ce(e),
            P(c).removeClass(e.asStripeClasses.join(" ")),
            P("th, td", i).removeClass(a.sSortable + " " + a.sSortableAsc + " " + a.sSortableDesc + " " + a.sSortableNone),
            o.children().detach(),
            o.append(c),
            f ? "remove" : "detach"), i = (s[l](),
            u[l](),
            !f && t && (t.insertBefore(r, e.nTableReinsertBefore),
            s.css("width", e.sDestroyWidth).removeClass(a.sTable),
            n = e.asDestroyStripes.length) && o.children().each(function(t) {
                P(this).addClass(e.asDestroyStripes[t % n])
            }),
            P.inArray(e, w.settings));
            -1 !== i && w.settings.splice(i, 1)
        })
    }),
    P.each(["column", "row", "cell"], function(t, s) {
        e(s + "s().every()", function(o) {
            var i = this.selector.opts
              , l = this;
            return this.iterator(s, function(t, e, n, a, r) {
                o.call(l[s](e, "cell" === s ? n : i, "cell" === s ? i : N), e, n, a, r)
            })
        })
    }),
    e("i18n()", function(t, e, n) {
        var a = this.context[0]
          , t = A(t)(a.oLanguage);
        return t === N && (t = e),
        (t = n !== N && P.isPlainObject(t) ? t[n] !== N ? t[n] : t._ : t).replace("%d", n)
    }),
    w.version = "1.11.4",
    w.settings = [],
    w.models = {},
    w.models.oSearch = {
        bCaseInsensitive: !0,
        sSearch: "",
        bRegex: !1,
        bSmart: !0,
        return: !1
    },
    w.models.oRow = {
        nTr: null,
        anCells: null,
        _aData: [],
        _aSortData: null,
        _aFilterData: null,
        _sFilterRow: null,
        _sRowStripe: "",
        src: null,
        idx: -1
    },
    w.models.oColumn = {
        idx: null,
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bVisible: null,
        _sManualType: null,
        _bAttrSrc: !1,
        fnCreatedCell: null,
        fnGetData: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        nTh: null,
        nTf: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: "std",
        sSortingClass: null,
        sSortingClassJUI: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null
    },
    w.defaults = {
        aaData: null,
        aaSorting: [[0, "asc"]],
        aaSortingFixed: [],
        ajax: null,
        aLengthMenu: [10, 20, 30, 50, 100],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        asStripeClasses: null,
        bAutoWidth: !0,
        bDeferRender: !1,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollCollapse: !1,
        bServerSide: !1,
        bSort: !0,
        bSortMulti: !0,
        bSortCellsTop: !1,
        bSortClasses: !0,
        bStateSave: !1,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function(t) {
            return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnServerData: null,
        fnServerParams: null,
        fnStateLoadCallback: function(t) {
            try {
                return JSON.parse((-1 === t.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + t.sInstance + "_" + location.pathname))
            } catch (t) {
                return {}
            }
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSaveCallback: function(t, e) {
            try {
                (-1 === t.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + t.sInstance + "_" + location.pathname, JSON.stringify(e))
            } catch (t) {}
        },
        fnStateSaveParams: null,
        iStateDuration: 7200,
        iDeferLoading: null,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iTabIndex: 0,
        oClasses: {},
        oLanguage: {
            oAria: {
                sSortAscending: ": activate to sort column ascending",
                sSortDescending: ": activate to sort column descending"
            },
            oPaginate: {
                sFirst: "First",
                sLast: "Last",
                sNext: "Next",
                sPrevious: "Previous"
            },
            sEmptyTable: "No data available in table",
            sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
            sInfoEmpty: "Showing 0 to 0 of 0 entries",
            sInfoFiltered: "(filtered from _MAX_ total entries)",
            sInfoPostFix: "",
            sDecimal: "",
            sThousands: ",",
            sLengthMenu: "Rows _MENU_",
            sLoadingRecords: "Loading...",
            sProcessing: "Processing...",
            sSearch: "Search:",
            sSearchPlaceholder: "Search table...",
            sUrl: "",
            sZeroRecords: "No matching records found"
        },
        oSearch: P.extend({}, w.models.oSearch),
        sAjaxDataProp: "data",
        sAjaxSource: null,
        sDom: "lfrtip",
        searchDelay: null,
        sPaginationType: "simple_numbers",
        sScrollX: "",
        sScrollXInner: "",
        sScrollY: "",
        sServerMethod: "GET",
        renderer: null,
        rowId: "DT_RowId"
    },
    i(w.defaults),
    w.defaults.column = {
        aDataSort: null,
        iDataSort: -1,
        asSorting: ["asc", "desc"],
        bSearchable: !0,
        bSortable: !0,
        bVisible: !0,
        fnCreatedCell: null,
        mData: null,
        mRender: null,
        sCellType: "td",
        sClass: "",
        sContentPadding: "",
        sDefaultContent: null,
        sName: "",
        sSortDataType: "std",
        sTitle: null,
        sType: null,
        sWidth: null
    },
    i(w.defaults.column),
    w.models.oSettings = {
        oFeatures: {
            bAutoWidth: null,
            bDeferRender: null,
            bFilter: null,
            bInfo: null,
            bLengthChange: null,
            bPaginate: null,
            bProcessing: null,
            bServerSide: null,
            bSort: null,
            bSortMulti: null,
            bSortClasses: null,
            bStateSave: null
        },
        oScroll: {
            bCollapse: null,
            iBarWidth: 0,
            sX: null,
            sXInner: null,
            sY: null
        },
        oLanguage: {
            fnInfoCallback: null
        },
        oBrowser: {
            bScrollOversize: !1,
            bScrollbarLeft: !1,
            bBounding: !1,
            barWidth: 0
        },
        ajax: null,
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aIds: {},
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        oPreviousSearch: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: [],
        asStripeClasses: null,
        asDestroyStripes: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: "",
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bDeferLoading: !1,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        searchDelay: null,
        sPaginationType: "two_button",
        iStateDuration: 0,
        aoStateSave: [],
        aoStateLoad: [],
        oSavedState: null,
        oLoadedState: null,
        sAjaxSource: null,
        sAjaxDataProp: null,
        jqXHR: null,
        json: N,
        oAjaxData: N,
        fnServerData: null,
        aoServerParams: [],
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function() {
            return "ssp" == B(this) ? +this._iRecordsTotal : this.aiDisplayMaster.length
        },
        fnRecordsDisplay: function() {
            return "ssp" == B(this) ? +this._iRecordsDisplay : this.aiDisplay.length
        },
        fnDisplayEnd: function() {
            var t = this._iDisplayLength
              , e = this._iDisplayStart
              , n = e + t
              , a = this.aiDisplay.length
              , r = this.oFeatures
              , o = r.bPaginate;
            return r.bServerSide ? !1 === o || -1 === t ? e + a : Math.min(e + t, this._iRecordsDisplay) : !o || a < n || -1 === t ? a : n
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null,
        aLastSort: [],
        oPlugins: {},
        rowIdFn: null,
        rowId: null
    },
    w.ext = p = {
        buttons: {},
        classes: {},
        builder: "bs5/dt-1.11.4",
        errMode: "alert",
        feature: [],
        search: [],
        selector: {
            cell: [],
            column: [],
            row: []
        },
        internal: {},
        legacy: {
            ajax: null
        },
        pager: {},
        renderer: {
            pageButton: {},
            header: {}
        },
        order: {},
        type: {
            detect: [],
            search: {},
            order: {}
        },
        _unique: 0,
        fnVersionCheck: w.fnVersionCheck,
        iApiIndex: 0,
        oJUIClasses: {},
        sVersion: w.version
    },
    P.extend(p, {
        afnFiltering: p.search,
        aTypes: p.type.detect,
        ofnSearch: p.type.search,
        oSort: p.type.order,
        afnSortData: p.order,
        aoFeatures: p.feature,
        oApi: p.internal,
        oStdClasses: p.classes,
        oPagination: p.pager
    }),
    P.extend(w.ext.classes, {
        sTable: "dataTable",
        sNoFooter: "no-footer",
        sPageButton: "paginate_button",
        sPageButtonActive: "current",
        sPageButtonDisabled: "disabled",
        sStripeOdd: "odd",
        sStripeEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_desc_disabled",
        sSortableDesc: "sorting_asc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sFilterInput: "",
        sLengthSelect: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sHeaderTH: "",
        sFooterTH: "",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sJUIHeader: "",
        sJUIFooter: ""
    }),
    w.ext.pager);
    function Ne(t, e) {
        var n = []
          , a = je.numbers_length
          , r = Math.floor(a / 2);
        return e <= a ? n = f(0, e) : t <= r ? ((n = f(0, a - 2)).push("ellipsis"),
        n.push(e - 1)) : ((e - 1 - r <= t ? n = f(e - (a - 2), e) : ((n = f(t - r + 2, t + r - 1)).push("ellipsis"),
        n.push(e - 1),
        n)).splice(0, 0, "ellipsis"),
        n.splice(0, 0, 0)),
        n.DT_el = "span",
        n
    }
    P.extend(je, {
        simple: function(t, e) {
            return ["previous", "next"]
        },
        full: function(t, e) {
            return ["first", "previous", "next", "last"]
        },
        numbers: function(t, e) {
            return [Ne(t, e)]
        },
        simple_numbers: function(t, e) {
            return [Ne(t, e), "previous", "next"]
        },
        full_numbers: function(t, e) {
            return ["first", "previous", Ne(t, e), "next", "last"]
        },
        first_last_numbers: function(t, e) {
            return ["first", Ne(t, e), "last"]
        },
        _numbers: Ne,
        numbers_length: 7
    }),
    P.extend(!0, w.ext.renderer, {
        pageButton: {
            _: function(u, t, c, e, f, d) {
                function h(t, e) {
                    for (var n, a, r = b.sPageButtonDisabled, o = function(t) {
                        Yt(u, t.data.action, !0)
                    }, i = 0, l = e.length; i < l; i++)
                        if (n = e[i],
                        Array.isArray(n)) {
                            var s = P("<" + (n.DT_el || "div") + "/>").appendTo(t);
                            h(s, n)
                        } else {
                            switch (p = null,
                            g = n,
                            a = u.iTabIndex,
                            n) {
                            case "ellipsis":
                                t.append('<span class="ellipsis">&#x2026;</span>');
                                break;
                            case "first":
                                p = m.sFirst,
                                0 === f && (a = -1,
                                g += " " + r);
                                break;
                            case "previous":
                                p = m.sPrevious,
                                0 === f && (a = -1,
                                g += " " + r);
                                break;
                            case "next":
                                p = m.sNext,
                                0 !== d && f !== d - 1 || (a = -1,
                                g += " " + r);
                                break;
                            case "last":
                                p = m.sLast,
                                0 !== d && f !== d - 1 || (a = -1,
                                g += " " + r);
                                break;
                            default:
                                p = u.fnFormatNumber(n + 1),
                                g = f === n ? b.sPageButtonActive : ""
                            }
                            null !== p && (be(P("<a>", {
                                class: b.sPageButton + " " + g,
                                "aria-controls": u.sTableId,
                                "aria-label": S[n],
                                "data-dt-idx": v,
                                tabindex: a,
                                id: 0 === c && "string" == typeof n ? u.sTableId + "_" + n : null
                            }).html(p).appendTo(t), {
                                action: n
                            }, o),
                            v++)
                        }
                }
                var p, g, n, b = u.oClasses, m = u.oLanguage.oPaginate, S = u.oLanguage.oAria.paginate || {}, v = 0;
                try {
                    n = P(t).find(y.activeElement).data("dt-idx")
                } catch (t) {}
                h(P(t).empty(), e),
                n !== N && P(t).find("[data-dt-idx=" + n + "]").trigger("focus")
            }
        }
    }),
    P.extend(w.ext.type.detect, [function(t, e) {
        e = e.oLanguage.sDecimal;
        return l(t, e) ? "num" + e : null
    }
    , function(t, e) {
        var n;
        return (!t || t instanceof Date || V.test(t)) && (null !== (n = Date.parse(t)) && !isNaN(n) || h(t)) ? "date" : null
    }
    , function(t, e) {
        e = e.oLanguage.sDecimal;
        return l(t, e, !0) ? "num-fmt" + e : null
    }
    , function(t, e) {
        e = e.oLanguage.sDecimal;
        return n(t, e) ? "html-num" + e : null
    }
    , function(t, e) {
        e = e.oLanguage.sDecimal;
        return n(t, e, !0) ? "html-num-fmt" + e : null
    }
    , function(t, e) {
        return h(t) || "string" == typeof t && -1 !== t.indexOf("<") ? "html" : null
    }
    ]),
    P.extend(w.ext.type.search, {
        html: function(t) {
            return h(t) ? t : "string" == typeof t ? t.replace(c, " ").replace(X, "") : ""
        },
        string: function(t) {
            return !h(t) && "string" == typeof t ? t.replace(c, " ") : t
        }
    });
    function He(t, e, n, a) {
        return 0 === t || t && "-" !== t ? +(t = (t = e ? $(t, e) : t).replace && (n && (t = t.replace(n, "")),
        a) ? t.replace(a, "") : t) : -1 / 0
    }
    function ke(n) {
        P.each({
            num: function(t) {
                return He(t, n)
            },
            "num-fmt": function(t) {
                return He(t, n, q)
            },
            "html-num": function(t) {
                return He(t, n, X)
            },
            "html-num-fmt": function(t) {
                return He(t, n, X, q)
            }
        }, function(t, e) {
            p.type.order[t + n + "-pre"] = e,
            t.match(/^html\-/) && (p.type.search[t + n] = p.type.search.html)
        })
    }
    P.extend(p.type.order, {
        "date-pre": function(t) {
            t = Date.parse(t);
            return isNaN(t) ? -1 / 0 : t
        },
        "html-pre": function(t) {
            return h(t) ? "" : t.replace ? t.replace(/<.*?>/g, "").toLowerCase() : t + ""
        },
        "string-pre": function(t) {
            return h(t) ? "" : "string" == typeof t ? t.toLowerCase() : t.toString ? t.toString() : ""
        },
        "string-asc": function(t, e) {
            return t < e ? -1 : e < t ? 1 : 0
        },
        "string-desc": function(t, e) {
            return t < e ? 1 : e < t ? -1 : 0
        }
    }),
    ke(""),
    P.extend(!0, w.ext.renderer, {
        header: {
            _: function(r, o, i, l) {
                P(r.nTable).on("order.dt.DT", function(t, e, n, a) {
                    r === e && (e = i.idx,
                    o.removeClass(l.sSortAsc + " " + l.sSortDesc).addClass("asc" == a[e] ? l.sSortAsc : "desc" == a[e] ? l.sSortDesc : i.sSortingClass))
                })
            },
            jqueryui: function(r, o, i, l) {
                P("<div/>").addClass(l.sSortJUIWrapper).append(o.contents()).append(P("<span/>").addClass(l.sSortIcon + " " + i.sSortingClassJUI)).appendTo(o),
                P(r.nTable).on("order.dt.DT", function(t, e, n, a) {
                    r === e && (e = i.idx,
                    o.removeClass(l.sSortAsc + " " + l.sSortDesc).addClass("asc" == a[e] ? l.sSortAsc : "desc" == a[e] ? l.sSortDesc : i.sSortingClass),
                    o.find("span." + l.sSortIcon).removeClass(l.sSortJUIAsc + " " + l.sSortJUIDesc + " " + l.sSortJUI + " " + l.sSortJUIAscAllowed + " " + l.sSortJUIDescAllowed).addClass("asc" == a[e] ? l.sSortJUIAsc : "desc" == a[e] ? l.sSortJUIDesc : i.sSortingClassJUI))
                })
            }
        }
    });
    function Oe(t) {
        return "string" == typeof (t = Array.isArray(t) ? t.join(",") : t) ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t
    }
    function Me(e) {
        return function() {
            var t = [pe(this[w.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
            return w.ext.internal[e].apply(this, t)
        }
    }
    return w.render = {
        number: function(a, r, o, i, l) {
            return {
                display: function(t) {
                    if ("number" != typeof t && "string" != typeof t)
                        return t;
                    var e = t < 0 ? "-" : ""
                      , n = parseFloat(t);
                    if (isNaN(n))
                        return Oe(t);
                    n = n.toFixed(o),
                    t = Math.abs(n);
                    n = parseInt(t, 10),
                    t = o ? r + (t - n).toFixed(o).substring(2) : "";
                    return (e = 0 === n && 0 === parseFloat(t) ? "" : e) + (i || "") + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + t + (l || "")
                }
            }
        },
        text: function() {
            return {
                display: Oe,
                filter: Oe
            }
        }
    },
    P.extend(w.ext.internal, {
        _fnExternApiFunc: Me,
        _fnBuildAjax: Tt,
        _fnAjaxUpdate: xt,
        _fnAjaxParameters: At,
        _fnAjaxUpdateDraw: It,
        _fnAjaxDataSrc: Ft,
        _fnAddColumn: nt,
        _fnColumnOptions: at,
        _fnAdjustColumnSizing: k,
        _fnVisibleToColumnIndex: rt,
        _fnColumnIndexToVisible: ot,
        _fnVisbleColumns: T,
        _fnGetColumns: it,
        _fnColumnTypes: lt,
        _fnApplyColumnDefs: st,
        _fnHungarianMap: i,
        _fnCamelToHungarian: C,
        _fnLanguageCompat: Z,
        _fnBrowserDetect: tt,
        _fnAddData: x,
        _fnAddTr: ut,
        _fnNodeToDataIndex: function(t, e) {
            return e._DT_RowIndex !== N ? e._DT_RowIndex : null
        },
        _fnNodeToColumnIndex: function(t, e, n) {
            return P.inArray(n, t.aoData[e].anCells)
        },
        _fnGetCellData: S,
        _fnSetCellData: ct,
        _fnSplitObjNotation: dt,
        _fnGetObjectDataFn: A,
        _fnSetObjectDataFn: b,
        _fnGetDataMaster: ht,
        _fnClearTable: pt,
        _fnDeleteIndex: gt,
        _fnInvalidate: bt,
        _fnGetRowElements: mt,
        _fnCreateTr: St,
        _fnBuildHead: yt,
        _fnDrawHead: Dt,
        _fnDraw: v,
        _fnReDraw: u,
        _fnAddOptionsHtml: _t,
        _fnDetectHeader: wt,
        _fnGetUniqueThs: Ct,
        _fnFeatureHtmlFilter: Lt,
        _fnFilterComplete: Rt,
        _fnFilterCustom: Pt,
        _fnFilterColumn: jt,
        _fnFilter: Nt,
        _fnFilterCreateSearch: Ht,
        _fnEscapeRegex: kt,
        _fnFilterData: Wt,
        _fnFeatureHtmlInfo: Ut,
        _fnUpdateInfo: Xt,
        _fnInfoMacros: Vt,
        _fnInitialise: Jt,
        _fnInitComplete: qt,
        _fnLengthChange: $t,
        _fnFeatureHtmlLength: Gt,
        _fnFeatureHtmlPaginate: zt,
        _fnPageChange: Yt,
        _fnFeatureHtmlProcessing: Zt,
        _fnProcessingDisplay: D,
        _fnFeatureHtmlTable: Qt,
        _fnScrollDraw: Kt,
        _fnApplyToChildren: O,
        _fnCalculateColumnWidths: ee,
        _fnThrottle: ne,
        _fnConvertToWidth: ae,
        _fnGetWidestNode: re,
        _fnGetMaxLenString: oe,
        _fnStringToCss: M,
        _fnSortFlatten: I,
        _fnSort: ie,
        _fnSortAria: le,
        _fnSortListener: se,
        _fnSortAttachListener: ue,
        _fnSortingClasses: ce,
        _fnSortData: fe,
        _fnSaveState: F,
        _fnLoadState: de,
        _fnImplementState: he,
        _fnSettingsFromNode: pe,
        _fnLog: W,
        _fnMap: L,
        _fnBindAction: be,
        _fnCallbackReg: R,
        _fnCallbackFire: E,
        _fnLengthOverflow: me,
        _fnRenderer: Se,
        _fnDataSource: B,
        _fnRowAttributes: vt,
        _fnExtend: ge,
        _fnCalculateEnd: function() {}
    }),
    ((P.fn.dataTable = w).$ = P).fn.dataTableSettings = w.settings,
    P.fn.dataTableExt = w.ext,
    P.fn.DataTable = function(t) {
        return P(this).dataTable(t).api()
    }
    ,
    P.each(w, function(t, e) {
        P.fn.DataTable[t] = e
    }),
    w
}),
function(n) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return n(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, e) {
        return t = t || window,
        e && e.fn.dataTable || (e = require("datatables.net")(t, e).$),
        n(e, 0, t.document)
    }
    : n(jQuery, window, document)
}(function(v, t, a, r) {
    "use strict";
    var o = v.fn.dataTable;
    return v.extend(!0, o.defaults, {
        dom: "<'row'<'col-12'f>><'row'<'col-12'tr>><'row'<'col-12'i>><'row'<'col-12'<'d-flex' <'col-auto lengthMenu'l><'col'p>>>>",
        renderer: "bootstrap"
    }),
    v.extend(o.ext.classes, {
        sWrapper: "dataTables_wrapper dt-bootstrap5",
        sFilterInput: "form-control form-control-sm",
        sLengthSelect: "form-select form-select-sm",
        sProcessing: "dataTables_processing card",
        sPageButton: "paginate_button page-item"
    }),
    o.ext.renderer.pageButton.bootstrap = function(l, t, s, e, u, c) {
        function f(t, e) {
            for (var n, a, r = function(t) {
                t.preventDefault(),
                v(t.currentTarget).hasClass("disabled") || p.page() == t.data.action || p.page(t.data.action).draw("page")
            }, o = 0, i = e.length; o < i; o++)
                if (a = e[o],
                Array.isArray(a))
                    f(t, a);
                else {
                    switch (h = d = "",
                    a) {
                    case "ellipsis":
                        d = "&#x2026;",
                        h = "disabled";
                        break;
                    case "first":
                        d = b.sFirst,
                        h = a + (0 < u ? "" : " disabled");
                        break;
                    case "previous":
                        d = b.sPrevious,
                        h = a + (0 < u ? "" : " disabled");
                        break;
                    case "next":
                        d = b.sNext,
                        h = a + (u < c - 1 ? "" : " disabled");
                        break;
                    case "last":
                        d = b.sLast,
                        h = a + (u < c - 1 ? "" : " disabled");
                        break;
                    default:
                        d = a + 1,
                        h = u === a ? "active" : ""
                    }
                    d && (n = v("<li>", {
                        class: g.sPageButton + " " + h,
                        id: 0 === s && "string" == typeof a ? l.sTableId + "_" + a : null
                    }).append(v("<a>", {
                        href: "#",
                        "aria-controls": l.sTableId,
                        "aria-label": m[a],
                        "data-dt-idx": S,
                        tabindex: l.iTabIndex,
                        class: "page-link"
                    }).html(d)).appendTo(t),
                    l.oApi._fnBindAction(n, {
                        action: a
                    }, r),
                    S++)
                }
        }
        var d, h, n, p = new o.Api(l), g = l.oClasses, b = l.oLanguage.oPaginate, m = l.oLanguage.oAria.paginate || {}, S = 0;
        try {
            n = v(t).find(a.activeElement).data("dt-idx")
        } catch (t) {}
        f(v(t).empty().html('<ul class="pagination"/>').children("ul"), e),
        n !== r && v(t).find("[data-dt-idx=" + n + "]").trigger("focus")
    }
    ,
    o
});
!function(n) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? module.exports = function(e, t) {
        return e = e || window,
        t && t.fn.dataTable || (t = require("datatables.net")(e, t).$),
        n(t, e, e.document)
    }
    : n(jQuery, window, document)
}(function(f, m, o, p) {
    "use strict";
    function i(e, t) {
        if (!r.versionCheck || !r.versionCheck("1.10.10"))
            throw "DataTables Responsive requires DataTables 1.10.10 or newer";
        this.s = {
            dt: new r.Api(e),
            columns: [],
            current: []
        },
        this.s.dt.settings()[0].responsive || (t && "string" == typeof t.details ? t.details = {
            type: t.details
        } : t && !1 === t.details ? t.details = {
            type: !1
        } : t && !0 === t.details && (t.details = {
            type: "inline"
        }),
        this.c = f.extend(!0, {}, i.defaults, r.defaults.responsive, t),
        (e.responsive = this)._constructor())
    }
    var r = f.fn.dataTable
      , u = (f.extend(i.prototype, {
        _constructor: function() {
            var i = this
              , s = this.s.dt
              , e = s.settings()[0]
              , t = f(m).innerWidth()
              , e = (s.settings()[0]._responsive = this,
            f(m).on("resize.dtr orientationchange.dtr", r.util.throttle(function() {
                var e = f(m).innerWidth();
                e !== t && (i._resize(),
                t = e)
            })),
            e.oApi._fnCallbackReg(e, "aoRowCreatedCallback", function(e, t, n) {
                -1 !== f.inArray(!1, i.s.current) && f(">td, >th", e).each(function(e) {
                    e = s.column.index("toData", e);
                    !1 === i.s.current[e] && f(this).css("display", "none")
                })
            }),
            s.on("destroy.dtr", function() {
                s.off(".dtr"),
                f(s.table().body()).off(".dtr"),
                f(m).off("resize.dtr orientationchange.dtr"),
                s.cells(".dtr-control").nodes().to$().removeClass("dtr-control"),
                f.each(i.s.current, function(e, t) {
                    !1 === t && i._setColumnVis(e, !0)
                })
            }),
            this.c.breakpoints.sort(function(e, t) {
                return e.width < t.width ? 1 : e.width > t.width ? -1 : 0
            }),
            this._classLogic(),
            this._resizeAuto(),
            this.c.details);
            !1 !== e.type && (i._detailsInit(),
            s.on("column-visibility.dtr", function() {
                i._timer && clearTimeout(i._timer),
                i._timer = setTimeout(function() {
                    i._timer = null,
                    i._classLogic(),
                    i._resizeAuto(),
                    i._resize(!0),
                    i._redrawChildren()
                }, 100)
            }),
            s.on("draw.dtr", function() {
                i._redrawChildren()
            }),
            f(s.table().node()).addClass("dtr-" + e.type)),
            s.on("column-reorder.dtr", function(e, t, n) {
                i._classLogic(),
                i._resizeAuto(),
                i._resize(!0)
            }),
            s.on("column-sizing.dtr", function() {
                i._resizeAuto(),
                i._resize()
            }),
            s.on("preXhr.dtr", function() {
                var e = [];
                s.rows().every(function() {
                    this.child.isShown() && e.push(this.id(!0))
                }),
                s.one("draw.dtr", function() {
                    i._resizeAuto(),
                    i._resize(),
                    s.rows(e).every(function() {
                        i._detailsDisplay(this, !1)
                    })
                })
            }),
            s.on("draw.dtr", function() {
                i._controlClass()
            }).on("init.dtr", function(e, t, n) {
                "dt" === e.namespace && (i._resizeAuto(),
                i._resize(),
                f.inArray(!1, i.s.current)) && s.columns.adjust()
            }),
            this._resize()
        },
        _columnsVisiblity: function(n) {
            for (var i = this.s.dt, e = this.s.columns, t = e.map(function(e, t) {
                return {
                    columnIdx: t,
                    priority: e.priority
                }
            }).sort(function(e, t) {
                return e.priority !== t.priority ? e.priority - t.priority : e.columnIdx - t.columnIdx
            }), s = f.map(e, function(e, t) {
                return !1 === i.column(t).visible() ? "not-visible" : (!e.auto || null !== e.minWidth) && (!0 === e.auto ? "-" : -1 !== f.inArray(n, e.includeIn))
            }), r = 0, o = 0, a = s.length; o < a; o++)
                !0 === s[o] && (r += e[o].minWidth);
            var d = i.settings()[0].oScroll
              , d = d.sY || d.sX ? d.iBarWidth : 0
              , l = i.table().container().offsetWidth - d - r;
            for (o = 0,
            a = s.length; o < a; o++)
                e[o].control && (l -= e[o].minWidth);
            var c = !1;
            for (o = 0,
            a = t.length; o < a; o++) {
                var u = t[o].columnIdx;
                "-" === s[u] && !e[u].control && e[u].minWidth && (c || l - e[u].minWidth < 0 ? s[u] = !(c = !0) : s[u] = !0,
                l -= e[u].minWidth)
            }
            var p = !1;
            for (o = 0,
            a = e.length; o < a; o++)
                if (!e[o].control && !e[o].never && !1 === s[o]) {
                    p = !0;
                    break
                }
            for (o = 0,
            a = e.length; o < a; o++)
                e[o].control && (s[o] = p),
                "not-visible" === s[o] && (s[o] = !1);
            return -1 === f.inArray(!0, s) && (s[0] = !0),
            s
        },
        _classLogic: function() {
            function a(e, t, n, i) {
                var s, r, o;
                if (n) {
                    if ("max-" === n)
                        for (s = d._find(t).width,
                        r = 0,
                        o = l.length; r < o; r++)
                            l[r].width <= s && u(e, l[r].name);
                    else if ("min-" === n)
                        for (s = d._find(t).width,
                        r = 0,
                        o = l.length; r < o; r++)
                            l[r].width >= s && u(e, l[r].name);
                    else if ("not-" === n)
                        for (r = 0,
                        o = l.length; r < o; r++)
                            -1 === l[r].name.indexOf(i) && u(e, l[r].name)
                } else
                    c[e].includeIn.push(t)
            }
            var d = this
              , l = this.c.breakpoints
              , i = this.s.dt
              , c = i.columns().eq(0).map(function(e) {
                var t = this.column(e)
                  , n = t.header().className
                  , e = i.settings()[0].aoColumns[e].responsivePriority
                  , t = t.header().getAttribute("data-priority");
                return e === p && (e = t === p || null === t ? 1e4 : +t),
                {
                    className: n,
                    includeIn: [],
                    auto: !1,
                    control: !1,
                    never: !!n.match(/\bnever\b/),
                    priority: e
                }
            })
              , u = function(e, t) {
                e = c[e].includeIn;
                -1 === f.inArray(t, e) && e.push(t)
            };
            c.each(function(e, s) {
                for (var t = e.className.split(" "), r = !1, n = 0, i = t.length; n < i; n++) {
                    var o = t[n].trim();
                    if ("all" === o)
                        return r = !0,
                        void (e.includeIn = f.map(l, function(e) {
                            return e.name
                        }));
                    if ("none" === o || e.never)
                        return void (r = !0);
                    if ("control" === o || "dtr-control" === o)
                        return r = !0,
                        void (e.control = !0);
                    f.each(l, function(e, t) {
                        var n = t.name.split("-")
                          , i = new RegExp("(min\\-|max\\-|not\\-)?(" + n[0] + ")(\\-[_a-zA-Z0-9])?")
                          , i = o.match(i);
                        i && (r = !0,
                        i[2] === n[0] && i[3] === "-" + n[1] ? a(s, t.name, i[1], i[2] + i[3]) : i[2] !== n[0] || i[3] || a(s, t.name, i[1], i[2]))
                    })
                }
                r || (e.auto = !0)
            }),
            this.s.columns = c
        },
        _controlClass: function() {
            var e, t, n;
            "inline" === this.c.details.type && (e = this.s.dt,
            t = this.s.current,
            n = f.inArray(!0, t),
            e.cells(null, function(e) {
                return e !== n
            }, {
                page: "current"
            }).nodes().to$().filter(".dtr-control").removeClass("dtr-control"),
            e.cells(null, n, {
                page: "current"
            }).nodes().to$().addClass("dtr-control"))
        },
        _detailsDisplay: function(e, t) {
            var n, i = this, s = this.s.dt, r = this.c.details;
            !r || !1 === r.type || !0 !== (n = r.display(e, t, function() {
                return r.renderer(s, e[0], i._detailsObj(e[0]))
            })) && !1 !== n || f(s.table().node()).triggerHandler("responsive-display.dt", [s, e, n, t])
        },
        _detailsInit: function() {
            var n = this
              , i = this.s.dt
              , e = this.c.details
              , s = ("inline" === e.type && (e.target = "td.dtr-control, th.dtr-control"),
            i.on("draw.dtr", function() {
                n._tabIndexes()
            }),
            n._tabIndexes(),
            f(i.table().body()).on("keyup.dtr", "td, th", function(e) {
                13 === e.keyCode && f(this).data("dtr-keyboard") && f(this).click()
            }),
            e.target)
              , e = "string" == typeof s ? s : "td, th";
            s === p && null === s || f(i.table().body()).on("click.dtr mousedown.dtr mouseup.dtr", e, function(e) {
                if (f(i.table().node()).hasClass("collapsed") && -1 !== f.inArray(f(this).closest("tr").get(0), i.rows().nodes().toArray())) {
                    if ("number" == typeof s) {
                        var t = s < 0 ? i.columns().eq(0).length + s : s;
                        if (i.cell(this).index().column !== t)
                            return
                    }
                    t = i.row(f(this).closest("tr"));
                    "click" === e.type ? n._detailsDisplay(t, !1) : "mousedown" === e.type ? f(this).css("outline", "none") : "mouseup" === e.type && f(this).trigger("blur").css("outline", "")
                }
            })
        },
        _detailsObj: function(n) {
            var i = this
              , s = this.s.dt;
            return f.map(this.s.columns, function(e, t) {
                if (!e.never && !e.control)
                    return {
                        className: (e = s.settings()[0].aoColumns[t]).sClass,
                        columnIndex: t,
                        data: s.cell(n, t).render(i.c.orthogonal),
                        hidden: s.column(t).visible() && !i.s.current[t],
                        rowIndex: n,
                        title: null !== e.sTitle ? e.sTitle : f(s.column(t).header()).text()
                    }
            })
        },
        _find: function(e) {
            for (var t = this.c.breakpoints, n = 0, i = t.length; n < i; n++)
                if (t[n].name === e)
                    return t[n]
        },
        _redrawChildren: function() {
            var n = this
              , i = this.s.dt;
            i.rows({
                page: "current"
            }).iterator("row", function(e, t) {
                i.row(t);
                n._detailsDisplay(i.row(t), !0)
            })
        },
        _resize: function(n) {
            for (var e, i = this, t = this.s.dt, s = f(m).innerWidth(), r = this.c.breakpoints, o = r[0].name, a = this.s.columns, d = this.s.current.slice(), l = r.length - 1; 0 <= l; l--)
                if (s <= r[l].width) {
                    o = r[l].name;
                    break
                }
            var c = this._columnsVisiblity(o)
              , u = (this.s.current = c,
            !1);
            for (l = 0,
            e = a.length; l < e; l++)
                if (!1 === c[l] && !a[l].never && !a[l].control && !1 == !t.column(l).visible()) {
                    u = !0;
                    break
                }
            f(t.table().node()).toggleClass("collapsed", u);
            var p = !1
              , h = 0;
            t.columns().eq(0).each(function(e, t) {
                !0 === c[t] && h++,
                !n && c[t] === d[t] || (p = !0,
                i._setColumnVis(e, c[t]))
            }),
            p && (this._redrawChildren(),
            f(t.table().node()).trigger("responsive-resize.dt", [t, this.s.current]),
            0 === t.page.info().recordsDisplay) && f("td", t.table().body()).eq(0).attr("colspan", h),
            i._controlClass()
        },
        _resizeAuto: function() {
            var e, t, n, i, s, r = this.s.dt, o = this.s.columns;
            this.c.auto && -1 !== f.inArray(!0, f.map(o, function(e) {
                return e.auto
            })) && (f.isEmptyObject(u) || f.each(u, function(e) {
                e = e.split("-");
                a(r, +e[0], +e[1])
            }),
            r.table().node().offsetWidth,
            r.columns,
            e = r.table().node().cloneNode(!1),
            t = f(r.table().header().cloneNode(!1)).appendTo(e),
            i = f(r.table().body()).clone(!1, !1).empty().appendTo(e),
            e.style.width = "auto",
            n = r.columns().header().filter(function(e) {
                return r.column(e).visible()
            }).to$().clone(!1).css("display", "table-cell").css("width", "auto").css("min-width", 0),
            f(i).append(f(r.rows({
                page: "current"
            }).nodes()).clone(!1)).find("th, td").css("display", ""),
            (i = r.table().footer()) && (i = f(i.cloneNode(!1)).appendTo(e),
            s = r.columns().footer().filter(function(e) {
                return r.column(e).visible()
            }).to$().clone(!1).css("display", "table-cell"),
            f("<tr/>").append(s).appendTo(i)),
            f("<tr/>").append(n).appendTo(t),
            "inline" === this.c.details.type && f(e).addClass("dtr-inline collapsed"),
            f(e).find("[name]").removeAttr("name"),
            f(e).css("position", "relative"),
            (s = f("<div/>").css({
                width: 1,
                height: 1,
                overflow: "hidden",
                clear: "both"
            }).append(e)).insertBefore(r.table().node()),
            n.each(function(e) {
                e = r.column.index("fromVisible", e);
                o[e].minWidth = this.offsetWidth || 0
            }),
            s.remove())
        },
        _responsiveOnlyHidden: function() {
            var n = this.s.dt;
            return f.map(this.s.current, function(e, t) {
                return !1 === n.column(t).visible() || e
            })
        },
        _setColumnVis: function(e, t) {
            var n = this.s.dt
              , t = t ? "" : "none";
            f(n.column(e).header()).css("display", t),
            f(n.column(e).footer()).css("display", t),
            n.column(e).nodes().to$().css("display", t),
            f.isEmptyObject(u) || n.cells(null, e).indexes().each(function(e) {
                a(n, e.row, e.column)
            })
        },
        _tabIndexes: function() {
            var e = this.s.dt
              , t = e.cells({
                page: "current"
            }).nodes().to$()
              , n = e.settings()[0]
              , i = this.c.details.target;
            t.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]"),
            ("number" == typeof i ? e.cells(null, i, {
                page: "current"
            }).nodes().to$() : f(i = "td:first-child, th:first-child" === i ? ">td:first-child, >th:first-child" : i, e.rows({
                page: "current"
            }).nodes())).attr("tabIndex", n.iTabIndex).data("dtr-keyboard", 1)
        }
    }),
    {});
    function a(e, t, n) {
        var i = t + "-" + n;
        if (u[i]) {
            for (var s = e.cell(t, n).node(), r = u[i][0].parentNode.childNodes, o = [], a = 0, d = r.length; a < d; a++)
                o.push(r[a]);
            for (var l = 0, c = o.length; l < c; l++)
                s.appendChild(o[l]);
            u[i] = p
        }
    }
    i.defaults = {
        breakpoints: i.breakpoints = [{
            name: "desktop",
            width: 1 / 0
        }, {
            name: "tablet-l",
            width: 1024
        }, {
            name: "tablet-p",
            width: 768
        }, {
            name: "mobile-l",
            width: 480
        }, {
            name: "mobile-p",
            width: 320
        }],
        auto: !0,
        details: {
            display: (i.display = {
                childRow: function(e, t, n) {
                    return t ? f(e.node()).hasClass("parent") ? (e.child(n(), "child").show(),
                    !0) : void 0 : e.child.isShown() ? (e.child(!1),
                    f(e.node()).removeClass("parent"),
                    !1) : (e.child(n(), "child").show(),
                    f(e.node()).addClass("parent"),
                    !0)
                },
                childRowImmediate: function(e, t, n) {
                    return !t && e.child.isShown() || !e.responsive.hasHidden() ? (e.child(!1),
                    f(e.node()).removeClass("parent"),
                    !1) : (e.child(n(), "child").show(),
                    f(e.node()).addClass("parent"),
                    !0)
                },
                modal: function(r) {
                    return function(e, t, n) {
                        var i, s;
                        t ? f("div.dtr-modal-content").empty().append(n()) : (i = function() {
                            s.remove(),
                            f(o).off("keypress.dtr")
                        }
                        ,
                        s = f('<div class="dtr-modal"/>').append(f('<div class="dtr-modal-display"/>').append(f('<div class="dtr-modal-content"/>').append(n())).append(f('<div class="dtr-modal-close">&times;</div>').click(function() {
                            i()
                        }))).append(f('<div class="dtr-modal-background"/>').click(function() {
                            i()
                        })).appendTo("body"),
                        f(o).on("keyup.dtr", function(e) {
                            27 === e.keyCode && (e.stopPropagation(),
                            i())
                        })),
                        r && r.header && f("div.dtr-modal-content").prepend("<h2>" + r.header(e) + "</h2>")
                    }
                }
            }).childRow,
            renderer: (i.renderer = {
                listHiddenNodes: function() {
                    return function(i, e, t) {
                        var s = f('<ul data-dtr-index="' + e + '" class="dtr-details"/>')
                          , r = !1;
                        f.each(t, function(e, t) {
                            var n;
                            t.hidden && (n = t.className ? 'class="' + t.className + '"' : "",
                            f("<li " + n + ' data-dtr-index="' + t.columnIndex + '" data-dt-row="' + t.rowIndex + '" data-dt-column="' + t.columnIndex + '"><span class="dtr-title">' + t.title + "</span> </li>").append(f('<span class="dtr-data"/>').append(function(e, t, n) {
                                var i = t + "-" + n;
                                if (u[i])
                                    return u[i];
                                for (var s = [], r = e.cell(t, n).node().childNodes, o = 0, a = r.length; o < a; o++)
                                    s.push(r[o]);
                                return u[i] = s
                            }(i, t.rowIndex, t.columnIndex))).appendTo(s),
                            r = !0)
                        });
                        return !!r && s
                    }
                },
                listHidden: function() {
                    return function(e, t, n) {
                        n = f.map(n, function(e) {
                            var t = e.className ? 'class="' + e.className + '"' : "";
                            return e.hidden ? "<li " + t + ' data-dtr-index="' + e.columnIndex + '" data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><span class="dtr-title">' + e.title + '</span> <span class="dtr-data">' + e.data + "</span></li>" : ""
                        }).join("");
                        return !!n && f('<ul data-dtr-index="' + t + '" class="dtr-details"/>').append(n)
                    }
                },
                tableAll: function(i) {
                    return i = f.extend({
                        tableClass: ""
                    }, i),
                    function(e, t, n) {
                        n = f.map(n, function(e) {
                            return "<tr " + (e.className ? 'class="' + e.className + '"' : "") + ' data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td>' + e.title + ":</td> <td>" + e.data + "</td></tr>"
                        }).join("");
                        return f('<table class="' + i.tableClass + ' dtr-details" width="100%"/>').append(n)
                    }
                }
            }).listHidden(),
            target: 0,
            type: "inline"
        },
        orthogonal: "display"
    };
    var e = f.fn.dataTable.Api;
    return e.register("responsive()", function() {
        return this
    }),
    e.register("responsive.index()", function(e) {
        return {
            column: (e = f(e)).data("dtr-index"),
            row: e.parent().data("dtr-index")
        }
    }),
    e.register("responsive.rebuild()", function() {
        return this.iterator("table", function(e) {
            e._responsive && e._responsive._classLogic()
        })
    }),
    e.register("responsive.recalc()", function() {
        return this.iterator("table", function(e) {
            e._responsive && (e._responsive._resizeAuto(),
            e._responsive._resize())
        })
    }),
    e.register("responsive.hasHidden()", function() {
        var e = this.context[0];
        return !!e._responsive && -1 !== f.inArray(!1, e._responsive._responsiveOnlyHidden())
    }),
    e.registerPlural("columns().responsiveHidden()", "column().responsiveHidden()", function() {
        return this.iterator("column", function(e, t) {
            return !!e._responsive && e._responsive._responsiveOnlyHidden()[t]
        }, 1)
    }),
    i.version = "2.2.9",
    f.fn.dataTable.Responsive = i,
    f.fn.DataTable.Responsive = i,
    f(o).on("preInit.dt.dtr", function(e, t, n) {
        "dt" === e.namespace && (f(t.nTable).hasClass("responsive") || f(t.nTable).hasClass("dt-responsive") || t.oInit.responsive || r.defaults.responsive) && !1 !== (e = t.oInit.responsive) && new i(t,f.isPlainObject(e) ? e : {})
    }),
    i
}),
function(n) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-responsive"], function(e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? module.exports = function(e, t) {
        return e = e || window,
        (t = t && t.fn.dataTable ? t : require("datatables.net-bs5")(e, t).$).fn.dataTable.Responsive || require("datatables.net-responsive")(e, t),
        n(t, 0, e.document)
    }
    : n(jQuery, window, document)
}(function(o, e, t, n) {
    "use strict";
    var a, i = o.fn.dataTable, s = i.Responsive.display, d = s.modal, l = o('<div class="modal fade dtr-bs-modal" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"/></div></div></div>');
    return o(function() {
        a = new bootstrap.Modal(l[0])
    }),
    s.modal = function(r) {
        return function(e, t, n) {
            var i, s;
            o.fn.modal ? t || (r && r.header && (s = (i = l.find("div.modal-header")).find("button").detach(),
            i.empty().append('<h4 class="modal-title">' + r.header(e) + "</h4>").append(s)),
            l.find("div.modal-body").empty().append(n()),
            l.appendTo("body").modal(),
            a.show()) : d(e, t, n)
        }
    }
    ,
    i.Responsive
});
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return e(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, n) {
        return t = t || window,
        n && n.fn.dataTable || (n = require("datatables.net")(t, n).$),
        e(n, t, t.document)
    }
    : e(jQuery, window, document)
}(function(v, m, y, x) {
    "use strict";
    var e = v.fn.dataTable
      , o = 0
      , w = 0
      , C = e.ext.buttons;
    function A(t, n, e) {
        v.fn.animate ? t.stop().fadeIn(n, e) : (t.css("display", "block"),
        e && e.call(t))
    }
    function _(t, n, e) {
        v.fn.animate ? t.stop().fadeOut(n, e) : (t.css("display", "none"),
        e && e.call(t))
    }
    function T(n, t) {
        if (!(this instanceof T))
            return function(t) {
                return new T(t,n).container()
            }
            ;
        !0 === (t = void 0 === t ? {} : t) && (t = {}),
        Array.isArray(t) && (t = {
            buttons: t
        }),
        this.c = v.extend(!0, {}, T.defaults, t),
        t.buttons && (this.c.buttons = t.buttons),
        this.s = {
            dt: new e.Api(n),
            buttons: [],
            listenKeys: "",
            namespace: "dtb" + o++
        },
        this.dom = {
            container: v("<" + this.c.dom.container.tag + "/>").addClass(this.c.dom.container.className)
        },
        this._constructor()
    }
    v.extend(T.prototype, {
        action: function(t, n) {
            t = this._nodeToButton(t);
            return n === x ? t.conf.action : (t.conf.action = n,
            this)
        },
        active: function(t, n) {
            var t = this._nodeToButton(t)
              , e = this.c.dom.button.active
              , t = v(t.node);
            return n === x ? t.hasClass(e) : (t.toggleClass(e, n === x || n),
            this)
        },
        add: function(t, n, e) {
            var o = this.s.buttons;
            if ("string" == typeof n) {
                for (var i = n.split("-"), s = this.s, r = 0, a = i.length - 1; r < a; r++)
                    s = s.buttons[+i[r]];
                o = s.buttons,
                n = +i[i.length - 1]
            }
            return this._expandButton(o, t, t !== x ? t.split : x, (t === x || t.split === x || 0 === t.split.length) && s !== x, !1, n),
            e !== x && !0 !== e || this._draw(),
            this
        },
        collectionRebuild: function(t, n) {
            var e = this._nodeToButton(t);
            if (n !== x) {
                for (var o = e.buttons.length - 1; 0 <= o; o--)
                    this.remove(e.buttons[o].node);
                for (o = 0; o < n.length; o++) {
                    var i = n[o];
                    this._expandButton(e.buttons, i, i !== x && i.config !== x && i.config.split !== x, !0, i.parentConf !== x && i.parentConf.split !== x, o, i.parentConf)
                }
            }
            this._draw(e.collection, e.buttons)
        },
        container: function() {
            return this.dom.container
        },
        disable: function(t) {
            t = this._nodeToButton(t);
            return v(t.node).addClass(this.c.dom.button.disabled).attr("disabled", !0),
            this
        },
        destroy: function() {
            v("body").off("keyup." + this.s.namespace);
            for (var t = this.s.buttons.slice(), n = 0, e = t.length; n < e; n++)
                this.remove(t[n].node);
            this.dom.container.remove();
            var o = this.s.dt.settings()[0];
            for (n = 0,
            e = o.length; n < e; n++)
                if (o.inst === this) {
                    o.splice(n, 1);
                    break
                }
            return this
        },
        enable: function(t, n) {
            return !1 === n ? this.disable(t) : (n = this._nodeToButton(t),
            v(n.node).removeClass(this.c.dom.button.disabled).removeAttr("disabled"),
            this)
        },
        index: function(t, n, e) {
            n || (n = "",
            e = this.s.buttons);
            for (var o = 0, i = e.length; o < i; o++) {
                var s = e[o].buttons;
                if (e[o].node === t)
                    return n + o;
                if (s && s.length) {
                    s = this.index(t, o + "-", s);
                    if (null !== s)
                        return s
                }
            }
            return null
        },
        name: function() {
            return this.c.name
        },
        node: function(t) {
            return t ? (t = this._nodeToButton(t),
            v(t.node)) : this.dom.container
        },
        processing: function(t, n) {
            var e = this.s.dt
              , o = this._nodeToButton(t);
            return n === x ? v(o.node).hasClass("processing") : (v(o.node).toggleClass("processing", n),
            v(e.table().node()).triggerHandler("buttons-processing.dt", [n, e.button(t), e, v(t), o.conf]),
            this)
        },
        remove: function(t) {
            var n = this._nodeToButton(t)
              , e = this._nodeToHost(t)
              , o = this.s.dt;
            if (n.buttons.length)
                for (var i = n.buttons.length - 1; 0 <= i; i--)
                    this.remove(n.buttons[i].node);
            n.conf.destroying = !0,
            n.conf.destroy && n.conf.destroy.call(o.button(t), o, v(t), n.conf),
            this._removeKey(n.conf),
            v(n.node).remove();
            o = v.inArray(n, e);
            return e.splice(o, 1),
            this
        },
        text: function(t, n) {
            function e(t) {
                return "function" == typeof t ? t(i, s, o.conf) : t
            }
            var o = this._nodeToButton(t)
              , t = this.c.dom.collection.buttonLiner
              , t = (o.inCollection && t && t.tag ? t : this.c.dom.buttonLiner).tag
              , i = this.s.dt
              , s = v(o.node);
            return n === x ? e(o.conf.text) : (o.conf.text = n,
            (t ? s.children(t).eq(0).filter(":not(.dt-down-arrow)") : s).html(e(n)),
            this)
        },
        _constructor: function() {
            var e = this
              , t = this.s.dt
              , o = t.settings()[0]
              , n = this.c.buttons;
            o._buttons || (o._buttons = []),
            o._buttons.push({
                inst: this,
                name: this.c.name
            });
            for (var i = 0, s = n.length; i < s; i++)
                this.add(n[i]);
            t.on("destroy", function(t, n) {
                n === o && e.destroy()
            }),
            v("body").on("keyup." + this.s.namespace, function(t) {
                var n;
                y.activeElement && y.activeElement !== y.body || (n = String.fromCharCode(t.keyCode).toLowerCase(),
                -1 !== e.s.listenKeys.toLowerCase().indexOf(n) && e._keypress(n, t))
            })
        },
        _addKey: function(t) {
            t.key && (this.s.listenKeys += (v.isPlainObject(t.key) ? t.key : t).key)
        },
        _draw: function(t, n) {
            t || (t = this.dom.container,
            n = this.s.buttons),
            t.children().detach();
            for (var e = 0, o = n.length; e < o; e++)
                t.append(n[e].inserter),
                t.append(" "),
                n[e].buttons && n[e].buttons.length && this._draw(n[e].collection, n[e].buttons)
        },
        _expandButton: function(t, n, e, o, i, s, r) {
            var a = this.s.dt
              , l = !1
              , u = Array.isArray(n) ? n : [n];
            n === x && (u = Array.isArray(e) ? e : [e]),
            n !== x && n.split !== x && (l = !0);
            for (var c = 0, d = u.length; c < d; c++) {
                var f = this._resolveExtends(u[c]);
                if (f)
                    if (l = !(f.config === x || !f.config.split),
                    Array.isArray(f))
                        this._expandButton(t, f, p !== x && p.conf !== x ? p.conf.split : x, o, r !== x && r.split !== x, s, r);
                    else {
                        var p = this._buildButton(f, o, f.split !== x || f.config !== x && f.config.split !== x, i);
                        if (p) {
                            if (s !== x && null !== s ? (t.splice(s, 0, p),
                            s++) : t.push(p),
                            p.conf.buttons || p.conf.split) {
                                if (p.collection = v("<" + (l ? this.c.dom.splitCollection : this.c.dom.collection).tag + "/>"),
                                p.conf._collection = p.collection,
                                p.conf.split)
                                    for (var b = 0; b < p.conf.split.length; b++)
                                        "object" == typeof p.conf.split[b] && (p.conf.split[b].parent = r,
                                        p.conf.split[b].collectionLayout === x && (p.conf.split[b].collectionLayout = p.conf.collectionLayout),
                                        p.conf.split[b].dropup === x && (p.conf.split[b].dropup = p.conf.dropup),
                                        p.conf.split[b].fade === x) && (p.conf.split[b].fade = p.conf.fade);
                                else
                                    v(p.node).append(v('<span class="dt-down-arrow">' + this.c.dom.splitDropdown.text + "</span>"));
                                this._expandButton(p.buttons, p.conf.buttons, p.conf.split, !l, l, s, p.conf)
                            }
                            p.conf.parent = r,
                            f.init && f.init.call(a.button(p.node), a, v(p.node), f),
                            0
                        }
                    }
            }
        },
        _buildButton: function(n, t, e, o) {
            function i(t) {
                return "function" == typeof t ? t(b, l, n) : t
            }
            var s, r, a, l, u = this.c.dom.button, c = this.c.dom.buttonLiner, d = this.c.dom.collection, f = (this.c.dom.split,
            this.c.dom.splitCollection), p = this.c.dom.splitDropdownButton, b = this.s.dt;
            if (n.spacer)
                return r = v("<span></span>").addClass("dt-button-spacer " + n.style + " " + u.spacerClass).html(i(n.text)),
                {
                    conf: n,
                    node: r,
                    inserter: r,
                    buttons: [],
                    inCollection: t,
                    isSplit: e,
                    inSplit: o,
                    collection: null
                };
            if (!e && o && f ? u = p : !e && t && d.button && (u = d.button),
            !e && o && f.buttonLiner ? c = f.buttonLiner : !e && t && d.buttonLiner && (c = d.buttonLiner),
            n.available && !n.available(b, n) && !n.hasOwnProperty("html"))
                return !1;
            n.hasOwnProperty("html") ? l = v(n.html) : (s = function(t, n, e, o) {
                o.action.call(n.button(e), t, n, e, o),
                v(n.table().node()).triggerHandler("buttons-action.dt", [n.button(e), n, e, o])
            }
            ,
            r = n.tag || u.tag,
            a = n.clickBlurs === x || n.clickBlurs,
            l = v("<" + r + "/>").addClass(u.className).addClass(o ? this.c.dom.splitDropdownButton.className : "").attr("tabindex", this.s.dt.settings()[0].iTabIndex).attr("aria-controls", this.s.dt.table().node().id).attr("aria-label", "print_" + this.s.dt.table().node().id).on("click.dtb", function(t) {
                t.preventDefault(),
                !l.hasClass(u.disabled) && n.action && s(t, b, l, n),
                a && l.trigger("blur")
            }).on("keypress.dtb", function(t) {
                13 === t.keyCode && (t.preventDefault(),
                !l.hasClass(u.disabled)) && n.action && s(t, b, l, n)
            }),
            "a" === r.toLowerCase() && l.attr("href", "#"),
            "button" === r.toLowerCase() && l.attr("type", "button"),
            c.tag ? (p = v("<" + c.tag + "/>").html(i(n.text)).addClass(c.className),
            "a" === c.tag.toLowerCase() && p.attr("href", "#"),
            l.append(p)) : l.html(i(n.text)),
            !1 === n.enabled && l.addClass(u.disabled),
            n.className && l.addClass(n.className),
            n.titleAttr && l.attr("title", i(n.titleAttr)),
            n.attr && l.attr(n.attr),
            n.namespace || (n.namespace = ".dt-button-" + w++),
            n.config !== x && n.config.split && (n.split = n.config.split));
            var h, g, m, y, f = this.c.dom.buttonContainer, d = f && f.tag ? v("<" + f.tag + "/>").addClass(f.className).append(l) : l;
            return this._addKey(n),
            this.c.buttonCreated && (d = this.c.buttonCreated(n, d)),
            e && ((h = v("<div/>").addClass(this.c.dom.splitWrapper.className)).append(l),
            g = v.extend(n, {
                text: this.c.dom.splitDropdown.text,
                className: this.c.dom.splitDropdown.className,
                closeButton: !1,
                attr: {
                    "aria-haspopup": !0,
                    "aria-expanded": !1
                },
                align: this.c.dom.splitDropdown.align,
                splitAlignClass: this.c.dom.splitDropdown.splitAlignClass
            }),
            this._addKey(g),
            m = function(t, n, e, o) {
                C.split.action.call(n.button(v("div.dt-btn-split-wrapper")[0]), t, n, e, o),
                v(n.table().node()).triggerHandler("buttons-action.dt", [n.button(e), n, e, o]),
                e.attr("aria-expanded", !0)
            }
            ,
            y = v('<button class="' + this.c.dom.splitDropdown.className + ' dt-button"><span class="dt-btn-split-drop-arrow">' + this.c.dom.splitDropdown.text + "</span></button>").on("click.dtb", function(t) {
                t.preventDefault(),
                t.stopPropagation(),
                y.hasClass(u.disabled) || m(t, b, y, g),
                a && y.trigger("blur")
            }).on("keypress.dtb", function(t) {
                13 === t.keyCode && (t.preventDefault(),
                y.hasClass(u.disabled) || m(t, b, y, g))
            }),
            0 === n.split.length && y.addClass("dtb-hide-drop"),
            h.append(y).attr(g.attr)),
            {
                conf: n,
                node: (e ? h : l).get(0),
                inserter: e ? h : d,
                buttons: [],
                inCollection: t,
                isSplit: e,
                inSplit: o,
                collection: null
            }
        },
        _nodeToButton: function(t, n) {
            for (var e = 0, o = (n = n || this.s.buttons).length; e < o; e++) {
                if (n[e].node === t)
                    return n[e];
                if (n[e].buttons.length) {
                    var i = this._nodeToButton(t, n[e].buttons);
                    if (i)
                        return i
                }
            }
        },
        _nodeToHost: function(t, n) {
            for (var e = 0, o = (n = n || this.s.buttons).length; e < o; e++) {
                if (n[e].node === t)
                    return n;
                if (n[e].buttons.length) {
                    var i = this._nodeToHost(t, n[e].buttons);
                    if (i)
                        return i
                }
            }
        },
        _keypress: function(s, r) {
            var a;
            r._buttonsHandled || (a = function(t) {
                for (var n, e, o = 0, i = t.length; o < i; o++)
                    n = t[o].conf,
                    e = t[o].node,
                    !n.key || n.key !== s && (!v.isPlainObject(n.key) || n.key.key !== s || n.key.shiftKey && !r.shiftKey || n.key.altKey && !r.altKey || n.key.ctrlKey && !r.ctrlKey || n.key.metaKey && !r.metaKey) || (r._buttonsHandled = !0,
                    v(e).click()),
                    t[o].buttons.length && a(t[o].buttons)
            }
            )(this.s.buttons)
        },
        _removeKey: function(t) {
            var n;
            t.key && (t = (v.isPlainObject(t.key) ? t.key : t).key,
            n = this.s.listenKeys.split(""),
            t = v.inArray(t, n),
            n.splice(t, 1),
            this.s.listenKeys = n.join(""))
        },
        _resolveExtends: function(e) {
            function t(t) {
                for (var n = 0; !v.isPlainObject(t) && !Array.isArray(t); ) {
                    if (t === x)
                        return;
                    if ("function" == typeof t) {
                        if (!(t = t.call(i, s, e)))
                            return !1
                    } else if ("string" == typeof t) {
                        if (!C[t])
                            return {
                                html: t
                            };
                        t = C[t]
                    }
                    if (30 < ++n)
                        throw "Buttons: Too many iterations"
                }
                return Array.isArray(t) ? t : v.extend({}, t)
            }
            var n, o, i = this, s = this.s.dt;
            for (e = t(e); e && e.extend; ) {
                if (!C[e.extend])
                    throw "Cannot extend unknown button type: " + e.extend;
                var r = t(C[e.extend]);
                if (Array.isArray(r))
                    return r;
                if (!r)
                    return !1;
                var a = r.className
                  , l = (e.config !== x && r.config !== x && (e.config = v.extend({}, r.config, e.config)),
                e = v.extend({}, r, e),
                a && e.className !== a && (e.className = a + " " + e.className),
                e.postfixButtons);
                if (l) {
                    for (e.buttons || (e.buttons = []),
                    n = 0,
                    o = l.length; n < o; n++)
                        e.buttons.push(l[n]);
                    e.postfixButtons = null
                }
                var u = e.prefixButtons;
                if (u) {
                    for (e.buttons || (e.buttons = []),
                    n = 0,
                    o = u.length; n < o; n++)
                        e.buttons.splice(n, 0, u[n]);
                    e.prefixButtons = null
                }
                e.extend = r.extend
            }
            return e
        },
        _popover: function(o, t, n, e) {
            function i() {
                b = !0,
                _(v(".dt-button-collection"), h.fade, function() {
                    v(this).detach()
                }),
                v(f.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes()).attr("aria-expanded", "false"),
                v("div.dt-button-background").off("click.dtb-collection"),
                T.background(!1, h.backgroundClassName, h.fade, g),
                v(m).off("resize.resize.dtb-collection"),
                v("body").off(".dtb-collection"),
                f.off("buttons-action.b-internal"),
                f.off("destroy")
            }
            var s, r, a, l, u, c, d, f = t, p = this.c, b = !1, h = v.extend({
                align: "button-left",
                autoClose: !1,
                background: !0,
                backgroundClassName: "dt-button-background",
                closeButton: !0,
                contentClassName: p.dom.collection.className,
                collectionLayout: "",
                collectionTitle: "",
                dropup: !1,
                fade: 400,
                popoverTitle: "",
                rightAlignClassName: "dt-button-right",
                tag: p.dom.collection.tag
            }, n), g = t.node();
            !1 === o ? i() : ((p = v(f.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes())).length && (g.closest("div.dt-button-collection").length && (g = p.eq(0)),
            i()),
            n = v(".dt-button", o).length,
            p = "",
            3 === n ? p = "dtb-b3" : 2 === n ? p = "dtb-b2" : 1 === n && (p = "dtb-b1"),
            s = v("<div/>").addClass("dt-button-collection").addClass(h.collectionLayout).addClass(h.splitAlignClass).addClass(p).css("display", "none"),
            o = v(o).addClass(h.contentClassName).attr("role", "menu").appendTo(s),
            g.attr("aria-expanded", "true"),
            g.parents("body")[0] !== y.body && (g = y.body.lastChild),
            h.popoverTitle ? s.prepend('<div class="dt-button-collection-title">' + h.popoverTitle + "</div>") : h.collectionTitle && s.prepend('<div class="dt-button-collection-title">' + h.collectionTitle + "</div>"),
            h.closeButton && s.prepend('<div class="dtb-popover-close">x</div>').addClass("dtb-collection-closeable"),
            A(s.insertAfter(g), h.fade),
            n = v(t.table().container()),
            d = s.css("position"),
            "container" !== h.span && "dt-container" !== h.align || (g = g.parent(),
            s.css("width", n.width())),
            "absolute" === d ? (p = v(g[0].offsetParent),
            t = g.position(),
            n = g.offset(),
            r = p.offset(),
            a = p.position(),
            l = m.getComputedStyle(p[0]),
            r.height = p.outerHeight(),
            r.width = p.width() + parseFloat(l.paddingLeft),
            r.right = r.left + r.width,
            r.bottom = r.top + r.height,
            p = t.top + g.outerHeight(),
            u = t.left,
            s.css({
                top: p,
                left: u
            }),
            l = m.getComputedStyle(s[0]),
            (c = s.offset()).height = s.outerHeight(),
            c.width = s.outerWidth(),
            c.right = c.left + c.width,
            c.bottom = c.top + c.height,
            c.marginTop = parseFloat(l.marginTop),
            c.marginBottom = parseFloat(l.marginBottom),
            h.dropup && (p = t.top - c.height - c.marginTop - c.marginBottom),
            "button-right" !== h.align && !s.hasClass(h.rightAlignClassName) || (u = t.left - c.width + g.outerWidth()),
            "dt-container" !== h.align && "container" !== h.align || (u = u < t.left ? -t.left : u) + c.width > r.width && (u = r.width - c.width),
            a.left + u + c.width > v(m).width() && (u = v(m).width() - c.width - a.left),
            n.left + u < 0 && (u = -n.left),
            a.top + p + c.height > v(m).height() + v(m).scrollTop() && (p = t.top - c.height - c.marginTop - c.marginBottom),
            a.top + p < v(m).scrollTop() && (p = t.top + g.outerHeight()),
            s.css({
                top: p,
                left: u
            })) : ((d = function() {
                var t = v(m).height() / 2
                  , n = s.height() / 2;
                s.css("marginTop", -1 * (n = t < n ? t : n))
            }
            )(),
            v(m).on("resize.dtb-collection", function() {
                d()
            })),
            h.background && T.background(!0, h.backgroundClassName, h.fade, h.backgroundHost || g),
            v("div.dt-button-background").on("click.dtb-collection", function() {}),
            h.autoClose && setTimeout(function() {
                f.on("buttons-action.b-internal", function(t, n, e, o) {
                    o[0] !== g[0] && i()
                })
            }, 0),
            v(s).trigger("buttons-popover.dt"),
            f.on("destroy", i),
            setTimeout(function() {
                b = !1,
                v("body").on("click.dtb-collection", function(t) {
                    var n, e;
                    !b && (n = v.fn.addBack ? "addBack" : "andSelf",
                    e = v(t.target).parent()[0],
                    !v(t.target).parents()[n]().filter(o).length && !v(e).hasClass("dt-buttons") || v(t.target).hasClass("dt-button-background")) && i()
                }).on("keyup.dtb-collection", function(t) {
                    27 === t.keyCode && i()
                })
            }, 0))
        }
    }),
    T.background = function(t, n, e, o) {
        e === x && (e = 400),
        o = o || y.body,
        t ? A(v("<div/>").addClass(n).css("display", "none").insertAfter(o), e) : _(v("div." + n), e, function() {
            v(this).removeClass(n).remove()
        })
    }
    ,
    T.instanceSelector = function(t, i) {
        var s, r, a;
        return t === x || null === t ? v.map(i, function(t) {
            return t.inst
        }) : (s = [],
        r = v.map(i, function(t) {
            return t.name
        }),
        (a = function(t) {
            var n;
            if (Array.isArray(t))
                for (var e = 0, o = t.length; e < o; e++)
                    a(t[e]);
            else
                "string" == typeof t ? -1 !== t.indexOf(",") ? a(t.split(",")) : -1 !== (n = v.inArray(t.trim(), r)) && s.push(i[n].inst) : "number" == typeof t ? s.push(i[t].inst) : "object" == typeof t && s.push(t)
        }
        )(t),
        s)
    }
    ,
    T.buttonSelector = function(t, n) {
        for (var u = [], c = function(t, n, e) {
            for (var o, i, s = 0, r = n.length; s < r; s++)
                (o = n[s]) && (t.push({
                    node: o.node,
                    name: o.conf.name,
                    idx: i = e !== x ? e + s : s + ""
                }),
                o.buttons) && c(t, o.buttons, i + "-")
        }, d = function(t, n) {
            var e = []
              , o = (c(e, n.s.buttons),
            v.map(e, function(t) {
                return t.node
            }));
            if (Array.isArray(t) || t instanceof v)
                for (s = 0,
                r = t.length; s < r; s++)
                    d(t[s], n);
            else if (null === t || t === x || "*" === t)
                for (s = 0,
                r = e.length; s < r; s++)
                    u.push({
                        inst: n,
                        node: e[s].node
                    });
            else if ("number" == typeof t)
                n.s.buttons[t] && u.push({
                    inst: n,
                    node: n.s.buttons[t].node
                });
            else if ("string" == typeof t)
                if (-1 !== t.indexOf(","))
                    for (var i = t.split(","), s = 0, r = i.length; s < r; s++)
                        d(i[s].trim(), n);
                else if (t.match(/^\d+(\-\d+)*$/)) {
                    var a = v.map(e, function(t) {
                        return t.idx
                    });
                    u.push({
                        inst: n,
                        node: e[v.inArray(t, a)].node
                    })
                } else if (-1 !== t.indexOf(":name")) {
                    var l = t.replace(":name", "");
                    for (s = 0,
                    r = e.length; s < r; s++)
                        e[s].name === l && u.push({
                            inst: n,
                            node: e[s].node
                        })
                } else
                    v(o).filter(t).each(function() {
                        u.push({
                            inst: n,
                            node: this
                        })
                    });
            else
                "object" == typeof t && t.nodeName && -1 !== (a = v.inArray(t, o)) && u.push({
                    inst: n,
                    node: o[a]
                })
        }, e = 0, o = t.length; e < o; e++) {
            var i = t[e];
            d(n, i)
        }
        return u
    }
    ,
    T.stripData = function(t, n) {
        return "string" == typeof t && (t = (t = t.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")).replace(/<!\-\-.*?\-\->/g, ""),
        n && !n.stripHtml || (t = t.replace(/<[^>]*>/g, "")),
        n && !n.trim || (t = t.replace(/^\s+|\s+$/g, "")),
        n && !n.stripNewlines || (t = t.replace(/\n/g, " ")),
        !n || n.decodeEntities) && (l.innerHTML = t,
        t = l.value),
        t
    }
    ,
    T.defaults = {
        buttons: ["copy", "excel", "csv", "pdf", "print"],
        name: "main",
        tabIndex: 0,
        dom: {
            container: {
                tag: "div",
                className: "dt-buttons"
            },
            collection: {
                tag: "div",
                className: ""
            },
            button: {
                tag: "button",
                className: "dt-button",
                active: "active",
                disabled: "disabled",
                spacerClass: ""
            },
            buttonLiner: {
                tag: "span",
                className: ""
            },
            split: {
                tag: "div",
                className: "dt-button-split"
            },
            splitWrapper: {
                tag: "div",
                className: "dt-btn-split-wrapper"
            },
            splitDropdown: {
                tag: "button",
                text: "&#x25BC;",
                className: "dt-btn-split-drop",
                align: "split-right",
                splitAlignClass: "dt-button-split-left"
            },
            splitDropdownButton: {
                tag: "button",
                className: "dt-btn-split-drop-button dt-button"
            },
            splitCollection: {
                tag: "div",
                className: "dt-button-split-collection"
            }
        }
    },
    v.extend(C, {
        collection: {
            text: function(t) {
                return t.i18n("buttons.collection", "Collection")
            },
            className: "buttons-collection",
            closeButton: !(T.version = "2.2.2"),
            init: function(t, n, e) {
                n.attr("aria-expanded", !1)
            },
            action: function(t, n, e, o) {
                o._collection.parents("body").length ? this.popover(!1, o) : this.popover(o._collection, o)
            },
            attr: {
                "aria-haspopup": !0
            }
        },
        split: {
            text: function(t) {
                return t.i18n("buttons.split", "Split")
            },
            className: "buttons-split",
            closeButton: !1,
            init: function(t, n, e) {
                return n.attr("aria-expanded", !1)
            },
            action: function(t, n, e, o) {
                this.popover(o._collection, o)
            },
            attr: {
                "aria-haspopup": !0
            }
        },
        copy: function(t, n) {
            if (C.copyHtml5)
                return "copyHtml5"
        },
        csv: function(t, n) {
            if (C.csvHtml5 && C.csvHtml5.available(t, n))
                return "csvHtml5"
        },
        excel: function(t, n) {
            if (C.excelHtml5 && C.excelHtml5.available(t, n))
                return "excelHtml5"
        },
        pdf: function(t, n) {
            if (C.pdfHtml5 && C.pdfHtml5.available(t, n))
                return "pdfHtml5"
        },
        pageLength: function(t) {
            var n = t.settings()[0].aLengthMenu
              , e = []
              , o = [];
            if (Array.isArray(n[0]))
                e = n[0],
                o = n[1];
            else
                for (var i = 0; i < n.length; i++) {
                    var s = n[i];
                    v.isPlainObject(s) ? (e.push(s.value),
                    o.push(s.label)) : (e.push(s),
                    o.push(s))
                }
            return {
                extend: "collection",
                text: function(t) {
                    return t.i18n("buttons.pageLength", {
                        "-1": "Show all rows",
                        _: "Show %d rows"
                    }, t.page.len())
                },
                className: "buttons-page-length",
                autoClose: !0,
                buttons: v.map(e, function(s, t) {
                    return {
                        text: o[t],
                        className: "button-page-length",
                        action: function(t, n) {
                            n.page.len(s).draw()
                        },
                        init: function(t, n, e) {
                            function o() {
                                i.active(t.page.len() === s)
                            }
                            var i = this;
                            t.on("length.dt" + e.namespace, o),
                            o()
                        },
                        destroy: function(t, n, e) {
                            t.off("length.dt" + e.namespace)
                        }
                    }
                }),
                init: function(t, n, e) {
                    var o = this;
                    t.on("length.dt" + e.namespace, function() {
                        o.text(e.text)
                    })
                },
                destroy: function(t, n, e) {
                    t.off("length.dt" + e.namespace)
                }
            }
        },
        spacer: {
            style: "empty",
            spacer: !0,
            text: function(t) {
                return t.i18n("buttons.spacer", "")
            }
        }
    }),
    e.Api.register("buttons()", function(n, e) {
        e === x && (e = n,
        n = x),
        this.selector.buttonGroup = n;
        var t = this.iterator(!0, "table", function(t) {
            if (t._buttons)
                return T.buttonSelector(T.instanceSelector(n, t._buttons), e)
        }, !0);
        return t._groupSelector = n,
        t
    }),
    e.Api.register("button()", function(t, n) {
        t = this.buttons(t, n);
        return 1 < t.length && t.splice(1, t.length),
        t
    }),
    e.Api.registerPlural("buttons().active()", "button().active()", function(n) {
        return n === x ? this.map(function(t) {
            return t.inst.active(t.node)
        }) : this.each(function(t) {
            t.inst.active(t.node, n)
        })
    }),
    e.Api.registerPlural("buttons().action()", "button().action()", function(n) {
        return n === x ? this.map(function(t) {
            return t.inst.action(t.node)
        }) : this.each(function(t) {
            t.inst.action(t.node, n)
        })
    }),
    e.Api.registerPlural("buttons().collectionRebuild()", "button().collectionRebuild()", function(e) {
        return this.each(function(t) {
            for (var n = 0; n < e.length; n++)
                "object" == typeof e[n] && (e[n].parentConf = t);
            t.inst.collectionRebuild(t.node, e)
        })
    }),
    e.Api.register(["buttons().enable()", "button().enable()"], function(n) {
        return this.each(function(t) {
            t.inst.enable(t.node, n)
        })
    }),
    e.Api.register(["buttons().disable()", "button().disable()"], function() {
        return this.each(function(t) {
            t.inst.disable(t.node)
        })
    }),
    e.Api.register("button().index()", function() {
        var n = null;
        return this.each(function(t) {
            t = t.inst.index(t.node);
            null !== t && (n = t)
        }),
        n
    }),
    e.Api.registerPlural("buttons().nodes()", "button().node()", function() {
        var n = v();
        return v(this.each(function(t) {
            n = n.add(t.inst.node(t.node))
        })),
        n
    }),
    e.Api.registerPlural("buttons().processing()", "button().processing()", function(n) {
        return n === x ? this.map(function(t) {
            return t.inst.processing(t.node)
        }) : this.each(function(t) {
            t.inst.processing(t.node, n)
        })
    }),
    e.Api.registerPlural("buttons().text()", "button().text()", function(n) {
        return n === x ? this.map(function(t) {
            return t.inst.text(t.node)
        }) : this.each(function(t) {
            t.inst.text(t.node, n)
        })
    }),
    e.Api.registerPlural("buttons().trigger()", "button().trigger()", function() {
        return this.each(function(t) {
            t.inst.node(t.node).trigger("click")
        })
    }),
    e.Api.register("button().popover()", function(n, e) {
        return this.map(function(t) {
            return t.inst._popover(n, this.button(this[0].node), e)
        })
    }),
    e.Api.register("buttons().containers()", function() {
        var i = v()
          , s = this._groupSelector;
        return this.iterator(!0, "table", function(t) {
            if (t._buttons)
                for (var n = T.instanceSelector(s, t._buttons), e = 0, o = n.length; e < o; e++)
                    i = i.add(n[e].container())
        }),
        i
    }),
    e.Api.register("buttons().container()", function() {
        return this.containers().eq(0)
    }),
    e.Api.register("button().add()", function(t, n, e) {
        var o = this.context;
        return o.length && (o = T.instanceSelector(this._groupSelector, o[0]._buttons)).length && o[0].add(n, t, e),
        this.button(this._groupSelector, t)
    }),
    e.Api.register("buttons().destroy()", function() {
        return this.pluck("inst").unique().each(function(t) {
            t.destroy()
        }),
        this
    }),
    e.Api.registerPlural("buttons().remove()", "buttons().remove()", function() {
        return this.each(function(t) {
            t.inst.remove(t.node)
        }),
        this
    }),
    e.Api.register("buttons.info()", function(t, n, e) {
        var o = this;
        return !1 === t ? (this.off("destroy.btn-info"),
        _(v("#datatables_buttons_info"), 400, function() {
            v(this).remove()
        }),
        clearTimeout(i),
        i = null) : (i && clearTimeout(i),
        v("#datatables_buttons_info").length && v("#datatables_buttons_info").remove(),
        t = t ? "<h2>" + t + "</h2>" : "",
        A(v('<div id="datatables_buttons_info" class="dt-button-info"/>').html(t).append(v("<div/>")["string" == typeof n ? "html" : "append"](n)).css("display", "none").appendTo("body")),
        e !== x && 0 !== e && (i = setTimeout(function() {
            o.buttons.info(!1)
        }, e)),
        this.on("destroy.btn-info", function() {
            o.buttons.info(!1)
        })),
        this
    }),
    e.Api.register("buttons.exportData()", function(t) {
        if (this.context.length)
            return u(new e.Api(this.context[0]), t)
    }),
    e.Api.register("buttons.exportInfo()", function(t) {
        return {
            filename: n(t = t || {}),
            title: r(t),
            messageTop: a(this, t.message || t.messageTop, "top"),
            messageBottom: a(this, t.messageBottom, "bottom")
        }
    });
    var i, n = function(t) {
        var n;
        return (n = "function" == typeof (n = "*" === t.filename && "*" !== t.title && t.title !== x && null !== t.title && "" !== t.title ? t.title : t.filename) ? n() : n) === x || null === n ? null : (n = (n = -1 !== n.indexOf("*") ? n.replace("*", v("head > title").text()).trim() : n).replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "")) + (s(t.extension) || "")
    }, s = function(t) {
        return null === t || t === x ? null : "function" == typeof t ? t() : t
    }, r = function(t) {
        t = s(t.title);
        return null === t ? null : -1 !== t.indexOf("*") ? t.replace("*", v("head > title").text() || "Exported data") : t
    }, a = function(t, n, e) {
        n = s(n);
        return null === n ? null : (t = v("caption", t.table().container()).eq(0),
        "*" === n ? t.css("caption-side") !== e ? null : t.length ? t.text() : "" : n)
    }, l = v("<textarea/>")[0], u = function(e, t) {
        for (var o = v.extend(!0, {}, {
            rows: null,
            columns: "",
            modifier: {
                search: "applied",
                order: "applied"
            },
            orthogonal: "display",
            stripHtml: !0,
            stripNewlines: !0,
            decodeEntities: !0,
            trim: !0,
            format: {
                header: function(t) {
                    return T.stripData(t, o)
                },
                footer: function(t) {
                    return T.stripData(t, o)
                },
                body: function(t) {
                    return T.stripData(t, o)
                }
            },
            customizeData: null
        }, t), t = e.columns(o.columns).indexes().map(function(t) {
            var n = e.column(t).header();
            return o.format.header(n.innerHTML, t, n)
        }).toArray(), n = e.table().footer() ? e.columns(o.columns).indexes().map(function(t) {
            var n = e.column(t).footer();
            return o.format.footer(n ? n.innerHTML : "", t, n)
        }).toArray() : null, i = v.extend({}, o.modifier), i = (e.select && "function" == typeof e.select.info && i.selected === x && e.rows(o.rows, v.extend({
            selected: !0
        }, i)).any() && v.extend(i, {
            selected: !0
        }),
        e.rows(o.rows, i).indexes().toArray()), i = e.cells(i, o.columns), s = i.render(o.orthogonal).toArray(), r = i.nodes().toArray(), a = t.length, l = [], u = 0, c = 0, d = 0 < a ? s.length / a : 0; c < d; c++) {
            for (var f = [a], p = 0; p < a; p++)
                f[p] = o.format.body(s[u], c, p, r[u]),
                u++;
            l[c] = f
        }
        i = {
            header: t,
            footer: n,
            body: l
        };
        return o.customizeData && o.customizeData(i),
        i
    };
    function t(t, n) {
        t = new e.Api(t),
        n = n || t.init().buttons || e.defaults.buttons;
        return new T(t,n).container()
    }
    return v.fn.dataTable.Buttons = T,
    v.fn.DataTable.Buttons = T,
    v(y).on("init.dt plugin-init.dt", function(t, n) {
        "dt" === t.namespace && (t = n.oInit.buttons || e.defaults.buttons) && !n._buttons && new T(n,t).container()
    }),
    e.ext.feature.push({
        fnInit: t,
        cFeature: "B"
    }),
    e.ext.features && e.ext.features.register("buttons", t),
    T
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs5", "datatables.net-buttons"], function(t) {
        return e(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, n) {
        return t = t || window,
        (n = n && n.fn.dataTable ? n : require("datatables.net-bs5")(t, n).$).fn.dataTable.Buttons || require("datatables.net-buttons")(t, n),
        e(n, 0, t.document)
    }
    : e(jQuery, window, document)
}(function(e, t, n, o) {
    "use strict";
    var i = e.fn.dataTable;
    return e.extend(!0, i.Buttons.defaults, {
        dom: {
            container: {
                className: "dt-buttons btn-group flex-wrap"
            },
            button: {
                className: "btn btn-secondary"
            },
            collection: {
                tag: "div",
                className: "dropdown-menu",
                closeButton: !1,
                button: {
                    tag: "a",
                    className: "dt-button dropdown-item",
                    active: "active",
                    disabled: "disabled"
                }
            },
            splitWrapper: {
                tag: "div",
                className: "dt-btn-split-wrapper btn-group",
                closeButton: !1
            },
            splitDropdown: {
                tag: "button",
                text: "",
                className: "btn btn-secondary dt-btn-split-drop dropdown-toggle dropdown-toggle-split",
                closeButton: !1,
                align: "split-left",
                splitAlignClass: "dt-button-split-left"
            },
            splitDropdownButton: {
                tag: "button",
                className: "dt-btn-split-drop-button btn btn-secondary",
                closeButton: !1
            }
        },
        buttonCreated: function(t, n) {
            return t.buttons ? e('<div class="btn-group"/>').append(n) : n
        }
    }),
    i.ext.buttons.collection.className += " dropdown-toggle",
    i.ext.buttons.collection.rightAlignClassName = "dropdown-menu-right",
    i.Buttons
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net", "datatables.net-buttons"], function(t) {
        return e(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, n) {
        return t = t || window,
        (n = n && n.fn.dataTable ? n : require("datatables.net")(t, n).$).fn.dataTable.Buttons || require("datatables.net-buttons")(t, n),
        e(n, t, t.document)
    }
    : e(jQuery, window, document)
}(function(p, b, t, h) {
    "use strict";
    function g(t) {
        return e.href = t,
        -1 === (t = e.host).indexOf("/") && 0 !== e.pathname.indexOf("/") && (t += "/"),
        e.protocol + "//" + t + e.pathname + e.search
    }
    var n = p.fn.dataTable
      , e = t.createElement("a");
    return n.ext.buttons.print = {
        className: "buttons-print",
        text: function(t) {
            return t.i18n("buttons.print", "")
        },
        action: function(t, n, e, o) {
            function i(t, n) {
                for (var e = "<tr>", o = 0, i = t.length; o < i; o++) {
                    var s = null === t[o] || t[o] === h ? "" : t[o];
                    e += "<" + n + " " + (a[o] ? 'class="' + a[o] + '"' : "") + ">" + s + "</" + n + ">"
                }
                return e + "</tr>"
            }
            var s = n.buttons.exportData(p.extend({
                decodeEntities: !1
            }, o.exportOptions))
              , r = n.buttons.exportInfo(o)
              , a = n.columns(o.exportOptions.columns).flatten().map(function(t) {
                return n.settings()[0].aoColumns[n.column(t).index()].sClass
            }).toArray()
              , l = '<table class="' + n.table().node().className + '">';
            o.header && (l += "<thead>" + i(s.header, "th") + "</thead>"),
            l += "<tbody>";
            for (var u = 0, c = s.body.length; u < c; u++)
                l += i(s.body[u], "td");
            l += "</tbody>",
            o.footer && s.footer && (l += "<tfoot>" + i(s.footer, "th") + "</tfoot>"),
            l += "</table>";
            var d = b.open("", "");
            if (d) {
                d.document.close();
                var f = "<title>" + r.title + "</title>";
                p("style, link").each(function() {
                    f += function(t) {
                        t = p(t).clone()[0];
                        return "link" === t.nodeName.toLowerCase() && (t.href = g(t.href)),
                        t.outerHTML
                    }(this)
                });
                try {
                    d.document.head.innerHTML = f
                } catch (t) {
                    p(d.document.head).html(f)
                }
                d.document.body.innerHTML = "<h1>" + r.title + "</h1><div>" + (r.messageTop || "") + "</div>" + l + "<div>" + (r.messageBottom || "") + "</div>",
                p(d.document.body).addClass("dt-print-view"),
                p("img", d.document.body).each(function(t, n) {
                    n.setAttribute("src", g(n.getAttribute("src")))
                }),
                o.customize && o.customize(d, o, n);
                r = function() {
                    o.autoPrint && (d.print(),
                    d.close())
                }
                ;
                navigator.userAgent.match(/Trident\/\d.\d/) ? r() : d.setTimeout(r, 1e3)
            } else
                n.buttons.info(n.i18n("buttons.printErrorTitle", "Unable to open print view"), n.i18n("buttons.printErrorMsg", "Please allow popups in your browser for this site to be able to view the print view."), 5e3)
        },
        title: "*",
        messageTop: "*",
        messageBottom: "*",
        exportOptions: {},
        header: !0,
        footer: !1,
        autoPrint: !0,
        customize: null
    },
    n.Buttons
});
var paginateSelectClassName = "paginate_select"
  , paginateTotalClassName = "paginate_total";
$.fn.dataTableExt.oPagination.listbox = {
    fnInit: function(t, n, i) {
        var e = document.createElement("select")
          , a = document.createElement("span")
          , l = document.createElement("span")
          , s = t.oLanguage.oPaginate.info || "_INPUT_ of _TOTAL_";
        e.className = paginateSelectClassName,
        a.className = paginateTotalClassName,
        "" !== t.sTableId && n.setAttribute("id", t.sTableId + "_paginate"),
        e.style.display = "inline",
        s = (s = s.replace(/_INPUT_/g, "</span>" + e.outerHTML + "<span>")).replace(/_TOTAL_/g, "</span>" + a.outerHTML),
        l.innerHTML = "<span>" + s,
        $(l).children().each(function(e, a) {
            n.appendChild(a)
        }),
        $(n).find("." + paginateSelectClassName).change(function(e) {
            var a;
            "" === this.value || this.value.match(/[^0-9]/) || ((a = t._iDisplayLength * (this.value - 1)) > t.fnRecordsDisplay() ? t._iDisplayStart = (Math.ceil((t.fnRecordsDisplay() - 1) / t._iDisplayLength) - 1) * t._iDisplayLength : t._iDisplayStart = a,
            i(t))
        }),
        $("span", n).bind("mousedown", function() {
            return !1
        }),
        $("span", n).bind("selectstart", function() {
            return !1
        })
    },
    fnUpdate: function(e, a) {
        if (e.aanFeatures.p) {
            var t = Math.ceil(e.fnRecordsDisplay() / e._iDisplayLength)
              , n = Math.ceil(e._iDisplayStart / e._iDisplayLength) + 1
              , e = e.aanFeatures.p
              , i = $(e).find("." + paginateSelectClassName);
            if (i.children("option").length != t)
                for (var l = 0; l < t; l++) {
                    var s = document.createElement("option");
                    s.text = l + 1,
                    s.value = l + 1,
                    i.append(s)
                }
            i.val(n),
            $(e).find("." + paginateTotalClassName).html(t)
        }
    }
},
$.fn.dataTableExt.oPagination.listboxWithButtons = {
    fnInit: function(t, e, n) {
        var a = document.createElement("button")
          , i = document.createElement("button")
          , l = document.createElement("select")
          , s = document.createElement("span")
          , p = document.createElement("span")
          , o = document.createElement("span");
        a.className = "paginate_button previous px-2 px-lg-3",
        a.setAttribute("aria-label", "previous-button-table"),
        a.textContent = "",
        a.appendChild(o),
        i.className = "paginate_button next px-2 px-lg-3",
        i.setAttribute("aria-label", "next-button-table"),
        i.textContent = "",
        i.appendChild(o),
        p.className = "paginate_of px-2 px-lg-3",
        s.className = "paginate_page",
        "" !== t.sTableId && e.setAttribute("id", t.sTableId + "_paginate"),
        l.style.display = "inline",
        s.innerHTML = "",
        e.appendChild(s),
        e.appendChild(l),
        e.appendChild(p),
        e.appendChild(a),
        e.appendChild(i),
        $(a).click(function() {
            $(this).hasClass("disabled") || (t.oApi._fnPageChange(t, "previous"),
            n(t))
        }).bind("selectstart", function() {
            return !1
        }),
        $(i).click(function() {
            $(this).hasClass("disabled") || (t.oApi._fnPageChange(t, "next"),
            n(t))
        }).bind("selectstart", function() {
            return !1
        }),
        $(l).change(function(e) {
            var a;
            $("html, body").animate({
                scrollTop: $("#" + t.sTableId + "_wrapper").offset().top
            }),
            "" === this.value || this.value.match(/[^0-9]/) || ((a = t._iDisplayLength * (this.value - 1)) > t.fnRecordsDisplay() ? t._iDisplayStart = (Math.ceil((t.fnRecordsDisplay() - 1) / t._iDisplayLength) - 1) * t._iDisplayLength : t._iDisplayStart = a,
            n(t))
        }),
        $("span", e).bind("mousedown", function() {
            return !1
        }),
        $("span", e).bind("selectstart", function() {
            return !1
        })
    },
    fnUpdate: function(e, a) {
        if (e.aanFeatures.p)
            for (var t = Math.ceil(e.fnRecordsDisplay() / e._iDisplayLength), n = Math.ceil(e._iDisplayStart / e._iDisplayLength) + 1, i = e.aanFeatures.p, l = 0, s = i.length; l < s; l++) {
                var p = i[l].getElementsByTagName("span")
                  , o = i[l].getElementsByTagName("select")[0];
                if (o.options.length != t) {
                    for (var c = o.options.length = 0; c < t; c++) {
                        var r = document.createElement("option");
                        r.text = c + 1,
                        r.value = c + 1;
                        try {
                            o.add(r, null)
                        } catch (e) {
                            o.add(r)
                        }
                    }
                    p[1].innerHTML = "&nbsp;" + (null != e.oLanguage.oPaginate.of ? e.oLanguage.oPaginate.of : "of") + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + t
                }
                o.value = n
            }
    }
};
!function(d) {
    var y = {}
      , e = "doTimeout"
      , s = Array.prototype.slice;
    function i(t) {
        var n, e = this, i = {}, o = t ? d.fn : d, f = arguments, a = 4, r = f[1], c = f[2], u = f[3];
        function l() {
            t ? n.removeData(t) : r && delete y[r]
        }
        function p() {
            i.id = setTimeout(function() {
                i.fn()
            }, c)
        }
        if ("string" != typeof r && (a--,
        r = t = 0,
        c = f[1],
        u = f[2]),
        t ? (n = e.eq(0)).data(t, i = n.data(t) || {}) : r && (i = y[r] || (y[r] = {})),
        i.id && clearTimeout(i.id),
        delete i.id,
        u)
            i.fn = function(t) {
                (!0 !== (u = "string" == typeof u ? o[u] : u).apply(e, s.call(f, a)) || t ? l : p)()
            }
            ,
            p();
        else {
            if (i.fn)
                return void 0 === c ? l() : i.fn(!1 === c),
                !0;
            l()
        }
    }
    d[e] = function() {
        return i.apply(window, [0].concat(s.call(arguments)))
    }
    ,
    d.fn[e] = function() {
        var t = s.call(arguments)
          , n = i.apply(this, [e + t[0]].concat(t));
        return "number" == typeof t[0] || "number" == typeof t[1] ? this : n
    }
}(jQuery);
let PricingWidget = function() {
    "use strict";
    let d, l = "./externals", s = {}, r = {}, c = {}, h = {}, m = {}, u = (this.config = {
        reconnectTimeout: 3e3,
        pingTimeout: 1e4,
        quoteInterval: 300,
        socketUri: "wss://eqpricestream01z-prod.azurewebsites.net/PriceStreaming.axd"
    },
    this), i = {
        SUBSCRIBE: "SUBSCRIBE",
        GETQUOTES: "GETQUOTES",
        SUBSCRIBED: "SUBSCRIBED",
        QUOTES: "QUOTES",
        PING: "PING"
    }, n = {
        CONNECTED: 1,
        DISCONNECTED: 2,
        CONNECTING: 3
    };
    function f() {
        this.state = n.CONNECTING,
        this.clientMsgIdSeq = 1,
        this._pingTimer = void 0,
        this.symbolsData = {},
        this.socket = new WebSocket(u.config.socketUri),
        this.socket.onopen = this._onOpen.bind(this),
        this.socket.onmessage = this._onMessage.bind(this),
        this.socket.onclose = this._onClose.bind(this)
    }
    return f.prototype._onOpen = function() {
        this.state = n.CONNECTED,
        this._startPing(),
        this.sendCommand(i.SUBSCRIBE, u.config.symbols)
    }
    ,
    f.prototype._onMessage = function(t) {
        var t = t.data
          , e = t.substring(0, t.indexOf(":"))
          , t = t.substring(t.indexOf(":") + 1);
        this.processMessage(e, t)
    }
    ,
    f.prototype._onClose = function(t) {
        this.state = n.DISCONNECTED,
        this._stopPing(),
        this.resetData(),
        console.warn("Connection to the server was unexpectedly closed (" + t.code + "). Reconnect after " + u.config.reconnectTimeout / 1e3 + "s.."),
        setTimeout(function() {
            d = new f
        }, u.config.reconnectTimeout)
    }
    ,
    f.prototype._startPing = function() {
        clearInterval(this._pingTimer),
        this._pingTimer = setInterval(this._pingCallback.bind(this), u.config.pingTimeout)
    }
    ,
    f.prototype._stopPing = function() {
        clearInterval(this._pingTimer)
    }
    ,
    f.prototype._pingCallback = function() {
        this.sendCommand(i.PING, {
            timestamp: Date.now()
        })
    }
    ,
    f.prototype.sendCommand = function(t, e) {
        this.state === n.CONNECTED && this.socket.send(t + ":" + (e = void 0 === e ? "" : e))
    }
    ,
    f.prototype.processMessage = function(t, e) {
        let s = this;
        switch (t) {
        case i.SUBSCRIBED:
            s.sendCommand(i.GETQUOTES);
            break;
        case i.QUOTES:
            var n = JSON.parse(e);
            this.storeSymbolData(n),
            setTimeout(function() {
                s.sendCommand(i.GETQUOTES)
            }, u.config.quoteInterval)
        }
    }
    ,
    f.prototype.resetData = function() {
        this.symbolsData = {}
    }
    ,
    f.prototype.storeSymbolData = function(t) {
        for (var e in t)
            t.hasOwnProperty(e) && (this.symbolsData[e] = t[e],
            this.updateSpread(e))
    }
    ,
    f.prototype.updateSpread = function(n) {
        let i = this.symbolsData[n];
        var t = n.replace(".", "");
        let e = this
          , o = (s[n] || (s[n] = document.getElementsByClassName("S_" + t + "_spread")),
        r[n] || (r[n] = document.getElementsByClassName("S_" + t + "_bid")),
        c[n] || (c[n] = document.getElementsByClassName("S_" + t + "_ask")),
        h[n] || (h[n] = document.getElementsByClassName("S_" + t + "_change")),
        s[n] || (s[n] = document.getElementsByClassName("S_" + t + "_spread")),
        m[n] && (m[n].innerText = i.name),
        s[n] && (s[n].innerText = this.getSpread(n, i)),
        $(".S_" + t + "_spread").each(function(t) {
            isNaN(e.getSpread(n, i)) ? $(this).html("n/a") : $(this).html(e.getSpread(n, i))
        }),
        this.getDirection(i))
          , a = $(h[n]).attr("data-direction");
        if (r[n]) {
            let e = parseFloat(r[n].innerText)
              , s = this.getBid(n, i);
            r[n].innerText = s,
            $(".S_" + t + "_bid").each(function(t) {
                isNaN(s) && (s = e),
                e != s ? $(this).html(s) : $(this).html(e),
                o != a && ("down" === o ? $(this).removeClass("up").addClass("down flash") : "up" === o && $(this).removeClass("down").addClass("up flash"))
            })
        }
        if (c[n]) {
            let e = parseFloat(c[n].innerText)
              , s = this.getAsk(n, i);
            $(".S_" + t + "_ask").each(function(t) {
                isNaN(s) && (s = e),
                e != s && $(this).html(s),
                o != a && ("down" === o ? $(this).removeClass("up").addClass("down flash") : "up" === o && $(this).removeClass("down").addClass("up flash"))
            })
        }
    }
    ,
    f.prototype.getSpread = function(t, e) {
        var s;
        return (void 0 === e.Bid || void 0 === e.Ask ? 0 : (t = u.config.instruments[t].pipPosition,
        s = e.Bid * Math.pow(10, t),
        e.Ask * Math.pow(10, t) - s)).toFixed(1)
    }
    ,
    f.prototype.getBid = function(t, e) {
        t = u.config.instruments[t].decimals;
        return isNaN(e.Bid) || null == e.Bid ? NaN : e.Bid.toFixed(t)
    }
    ,
    f.prototype.getDirection = function(t) {
        return t.Direction
    }
    ,
    f.prototype.getAsk = function(t, e) {
        t = u.config.instruments[t].decimals;
        return isNaN(e.Ask) || null == e.Ask ? NaN : e.Ask.toFixed(t)
    }
    ,
    this.init = function(t, e) {
        u.config = $.extend(!0, {}, u.config, e),
        u.config.symbols = Object.keys(u.config.instruments).join(",");
        var s, n, i, e = t;
        if ($("#" + e).length) {
            let t = `<table id="+ id +"><thead>
            <tr>
                <th id="Instrument">Instrument</th>
                <th id="Bid" style='width:100px'>Bid</th>
                <th id="Ask" style='width:100px'>Ask</th>
            </tr>
            </thead><tbody>`;
            for (s in t = t.replace(/#([a-zA-Z]+)#/g, function(t, e) {
                return u.config.lang[e] || e
            }),
            u.config.instruments)
                u.config.instruments.hasOwnProperty(s) && (n = u.config.instruments[s],
                i = s.replace(".", ""),
                t += '<tr><td class="mobile_33 S_' + i + '_code" id="S_' + i + '_code">' + n.name + '</td><td class="mobile_33 "><div class="S_' + i + '_bid" id="S_' + i + '_bid"> <span id="S_' + i + '_change"></span></div></td><td class="mobile_33"><div class="S_' + i + '_ask" id="S_' + i + '_ask"> <span id="S_' + i + '_change_ask"></span></div></td></tr>');
            t += "</tbody></table>",
            e ? (e = "string" == typeof e ? document.getElementById(e) : e).innerHTML = t : document.write(t),
            $("#price-widget-skeleton-loader").remove()
        }
        function o() {
            d = new f
        }
        if (window.WebSocket || window.MozWebSocket)
            o();
        else {
            window.WEB_SOCKET_SWF_LOCATION = l + "/ws.swf";
            {
                var a = {
                    docRoot: l + "/",
                    files: ["swfobject.js", "web_socket.js"],
                    success: o
                };
                function r() {
                    ++t == e.length && a.success && a.success()
                }
                function c(t) {
                    a.error && a.error(t)
                }
                a = a || {};
                let t = 0
                  , e = [].concat(a.files).ma;
                p(function(t) {
                    return (a.docRoot || "") + t
                }),
                e.forEach(function(t) {
                    var e = document.createElement("script");
                    e.async = !!a.async,
                    e.src = t,
                    e.onload = r,
                    e.onerror = c,
                    document.body.appendChild(e)
                })
            }
        }
    }
    ,
    this
};
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.zChat = t() : e.zChat = t()
}(this, function() {
    return function(n) {
        function i(e) {
            var t;
            return (o[e] || (t = o[e] = {
                exports: {},
                id: e,
                loaded: !1
            },
            n[e].call(t.exports, t, t.exports, i),
            t.loaded = !0,
            t)).exports
        }
        var o = {};
        return i.c = o,
        i(0)
    }([function(n, e, i) {
        !function(e) {
            var t;
            n.exports = (t = i(2),
            e(t, "web_sdk"),
            t)
        }
        .call(e, i(1))
    }
    , function(e, t) {
        e.exports = function(e, t) {
            "function" == typeof e && e.prototype && !e.__jx__no_fqname && (e.prototype.__jx__fqname_chain = (e.prototype.__jx__fqname_chain || "") + " " + t,
            e.prototype.__jx__fqname = t)
        }
    }
    , function(ce, e, le) {
        !function(e, M, i, P, j, U) {
            function o() {
                return ie(b.$("livechat").$("profile").getValue())
            }
            function t(e) {
                if (!g([T.type("number")], [e], "getDepartment()"))
                    return r(e)
            }
            function r(e) {
                var t = b.$("livechat").$("departments").$(e).getValue();
                if (t)
                    return N(t, e)
            }
            function n(e, t, n, i) {
                g([T.type("string").regex(D).regex(/[^,]/), L], [t, i], n) || (i = i || I,
                (n = {})[e] = t.trim(),
                w.$("livechat").$("channel").$("tags").write(n, _(i)))
            }
            function F(e) {
                return R(b.$("livechat").$("agents").$(e).getValue(), e)
            }
            function l(e) {
                if (!e.type$string)
                    return null;
                if (!e.nick$string)
                    return null;
                var t, n = {
                    nick: 0 === (t = e.nick$string).indexOf("visitor:") ? "visitor" : t,
                    type: e.type$string
                }, i = e.msg$string;
                switch (e.type$string) {
                case "chat.msg":
                    return x.file_upload.test(i) ? !0 !== e.unverified$bool && (r = /uploaded: (.+)\nURL: (.+)\nType: (.+)\nSize: (.+)(\nThumb: (.+))?/i.exec(i)) ? (r = {
                        mime_type: r[3],
                        name: r[1],
                        size: parseInt(r[4], 10),
                        url: r[2]
                    },
                    $.extend(n, {
                        type: "chat.file",
                        display_name: e.display_name$string,
                        attachment: r
                    })) : null : $.extend(n, {
                        display_name: e.display_name$string,
                        msg: i,
                        options: e.options$string ? e.options$string.split("/") : []
                    });
                case "chat.rating":
                    return $.extend(n, {
                        display_name: e.display_name$string,
                        new_rating: e.new_rating$string,
                        rating: e.rating$string
                    });
                case "chat.comment":
                    return $.extend(n, {
                        display_name: e.display_name$string,
                        comment: e.comment$string,
                        new_comment: e.new_comment$string
                    });
                case "chat.memberjoin":
                case "chat.memberleave":
                case "chat.request.rating":
                    return $.extend(n, {
                        display_name: e.display_name$string
                    });
                case "chat.event":
                    return "agent:system" === e.nick$string && (r = /Please wait while our agents attend to you. There are currently (\d+) visitor\(s\) waiting to be served\./.exec(i)) ? {
                        type: "chat.wait_queue",
                        nick: "system.queue",
                        wait_queue: parseInt(r[1], 10)
                    } : null;
                case "chat.join":
                    var o, r = e.history;
                    return r && r[0] ? (o = (r = $.extend({}, r[0])).timestamp$int,
                    r.type$string = r.__type$string,
                    r.display_name$string = r.name$string,
                    r.timestamp$int = o *= 1e3,
                    l(r)) : null;
                default:
                    return null
                }
            }
            function s(s, a, c) {
                return function(e, t) {
                    if (null === e)
                        return {};
                    for (var n = {}, i = 0, o = s.length; i < o; i++) {
                        var r = s[i];
                        r in e && (n[p(r)] = e[r])
                    }
                    return P(a) && Object.keys(n).length && (n[a] = t),
                    j(c) ? null === (t = c(e, t)) ? {} : $.extend(n, t) : n
                }
            }
            function a(t, e, n) {
                b.descend(e).bindValue(function(e) {
                    n(e).forEach(function(e) {
                        c(t, e)
                    })
                })
            }
            function c(e, t) {
                if (t) {
                    if (t instanceof Error) {
                        if (!t.message)
                            return
                    } else if ("object" == typeof t && !Object.keys(t).length)
                        return;
                    O.fire("data", {
                        type: e,
                        detail: t
                    })
                }
            }
            function u(t) {
                return function(e) {
                    return void 0 === e ? [null] : [t[e] || null]
                }
            }
            function d(t) {
                return function(e) {
                    return h(e, t)
                }
            }
            function h(e, t) {
                var n, i = [];
                for (n in e)
                    e.hasOwnProperty(n) && i.push(t(e[n], n));
                return i
            }
            function f(o, r) {
                return function(e) {
                    var t, n, i = [];
                    for (t in e)
                        e.hasOwnProperty(t) && (n = e[t],
                        o.some(function(e) {
                            return n && e in n
                        })) && i.push(r(t));
                    return i
                }
            }
            function p(e) {
                return e.split("$")[0]
            }
            function m(e, t) {
                t = t ? t + ": " : "",
                e = new Error("Zendesk Chat Web SDK: Error: " + t + e.message),
                W || window.console && window.console.error && console.error(e.message),
                c("error", e)
            }
            function g(e, t, n) {
                for (var i = 0; i < e.length; i++) {
                    var o = (0,
                    e[i])(t[i]);
                    if (o)
                        return m(o, n),
                        1
                }
            }
            function V(e) {
                if ("[object File]" !== Object.prototype.toString.call(e))
                    return new Error("Expect a File object")
            }
            function z(e) {
                if (!t(e))
                    return new Error("Expect a valid department id")
            }
            function _(t) {
                return function(e) {
                    e = "ok" === e.raw.__status ? null : new window.Error("Failed");
                    t(e)
                }
            }
            function q(e) {
                var t, n, i, o;
                return e.length <= 1 ? e : (t = [],
                e.forEach(function(e) {
                    t[e.start] = void 0 !== t[e.start] ? t[e.start] + 1 : 1,
                    t[e.end] = void 0 !== t[e.end] ? t[e.end] - 1 : -1
                }),
                i = [],
                o = 0,
                t.forEach(function(e, t) {
                    0 < e && !n && (n = t),
                    e && 0 === (o += e) && (i.push({
                        start: n,
                        end: t
                    }),
                    n = void 0)
                }),
                i)
            }
            var v, w, b, y, W, $, E, B, k, H, S, G, K, x, A, X, Y, C, O, I, T, J, Z, D, L, Q, ee, te, ne, ie, N, R, oe, re, se, ae;
            ce.exports = ($ = le(10),
            E = le(11),
            B = le(12),
            k = le(14),
            H = le(64),
            S = le(46),
            G = le(65),
            K = le(21),
            x = le(62),
            A = le(15),
            X = le(45),
            Y = le(31),
            C = e.extend({
                init: function(e) {
                    var t, n;
                    w || b ? m(new Error("Zendesk Chat Web SDK has already been initialized. Please ensure that zChat.init() is only called once in your code")) : g([T.obj({
                        account_key: T.type("string").ok(),
                        suppress_console_error: T.type("boolean"),
                        override_proxy: T.type("string").ok()
                    }, {
                        requiredKeys: ["account_key"]
                    })], [e], "init()") || (t = new E("root"),
                    n = new E("root"),
                    Y() && t.$("livechat").$("ui").$("mobile$bool").update(!0),
                    e = e,
                    v = k,
                    w = t,
                    b = n,
                    a("connection_update", "connection.status$string", u(Q)),
                    a("account_status", "livechat.account.status$string", u(ee)),
                    a("visitor_update", "livechat.profile", function(e, n) {
                        return function(t) {
                            return e.some(function(e) {
                                return t && e in t
                            }) ? [n()] : [null]
                        }
                    }(["email$string", "phone$string", "display_name$string"], o)),
                    a("department_update", "livechat.departments", f(["name$string", "status$string"], r)),
                    a("agent_update", "livechat.agents", f(["avatar_path$string", "display_name$string", "title$string"], F)),
                    a("chat", "livechat.channel.log", d(se)),
                    a("chat", "livechat.agents", d(oe)),
                    a("chat", "livechat.triggers.agents", d(re)),
                    y = function(e) {
                        C.fire(e.type, e.detail)
                    }
                    ,
                    O.on("data", y),
                    y = function(e) {
                        (e.path ? b.descend(e.path) : b).update(e.update)
                    }
                    ,
                    v.on("message", y),
                    B.ACCOUNT_KEY = e.account_key,
                    W = e.suppress_console_error || !1,
                    A.init(),
                    v.init({
                        root: w,
                        overrideProxy: e.override_proxy,
                        isCookieDenied: function() {
                            return !1
                        },
                        source: "web_sdk",
                        lastHost: A.DOM.getVariable("web_sdk_last_host"),
                        source_ver: "1.1.3"
                    }),
                    w.$("connection").$("server$string").bindValue(function(e) {
                        e && A.DOM.saveVariable("web_sdk_last_host", e)
                    }),
                    S.init(w, v),
                    H.init(w))
                },
                reconnect: function() {
                    v.reconnect()
                },
                getFirehose: function() {
                    return O
                },
                setVisitorInfo: function(e, t) {
                    var n;
                    g([T.obj({
                        display_name: T.any([T.equal(""), T.type("string").regex(D)]),
                        email: T.any([T.equal(""), T.type("string").regex(x.email)]),
                        phone: T.any([T.equal(""), T.type("string").regex(J)])
                    }), L], [e, t], "setVisitorInfo()") || (n = {},
                    t = t || I,
                    "display_name"in e && (n.display_name$string = e.display_name),
                    "email"in e && (n.email$string = e.email),
                    "phone"in e && (n.phone$string = e.phone),
                    w.$("livechat").$("profile").write(n, _(t)))
                },
                getVisitorInfo: o,
                setVisitorDefaultDepartment: function(e, t) {
                    g([T.type("number").chain(z), L], [e, t], "setVisitorDefaultDepartment()") || (t = t || I,
                    w.$("livechat").$("profile").write({
                        department_id$int: e
                    }, _(t)))
                },
                getVisitorDefaultDepartment: function() {
                    var e = b.$("livechat").$("profile").$("department_id$int").getValue();
                    return M(e) ? e : void 0
                },
                getAllDepartments: function() {
                    return h(b.$("livechat").$("departments").getValue(), N)
                },
                getDepartment: t,
                clearVisitorDefaultDepartment: function(e) {
                    g([L], [e], "clearVisitorDefaultDepartment()") || (e = e || I,
                    w.$("livechat").$("profile").write({
                        department_id$int: null
                    }, _(e)))
                },
                addTag: function(e, t) {
                    n("added$string", e, "addTag()", t)
                },
                removeTag: function(e, t) {
                    n("removed$string", e, "removeTag()", t)
                },
                sendChatMsg: function(e, t) {
                    g([T.type("string").regex(D), L], [e, t], "sendChatMsg()") || (t = t || I,
                    S.sendChatMsg({
                        msg: e.trim()
                    }, null, _(t)))
                },
                sendFile: function(e, t) {
                    var n, i;
                    g([T.chain(V), L], [e, t], "sendFile()") || (n = e,
                    i = (i = t) || I,
                    k.reconnectIfServerRetired(function() {
                        S.sendFileWithCallback(n, i)
                    }))
                },
                sendVisitorPath: function(e, t) {
                    g([T.obj({
                        title: T.type("string").regex(D),
                        url: T.type("string").regex(Z)
                    }, {
                        requiredKeys: ["title", "url"]
                    }), L], [e, t], "sendVisitorPath()") || (t = t || I,
                    w.$("livechat").$("session").$("page_path").write({
                        url$string: e.url,
                        title$string: e.title
                    }, _(t)))
                },
                sendChatComment: function(e, t) {
                    g([T.type("string"), L], [e, t], "sendChatComment()") || (t = t || I,
                    w.$("livechat").$("channel").write({
                        comment$string: e
                    }, _(t)))
                },
                sendChatRating: function(e, t) {
                    g([T.any([T.equal(null), T.equal("good"), T.equal("bad")]), L], [e, t], "sendChatRating()") || (t = t || I,
                    w.$("livechat").$("channel").write({
                        rating$string: e
                    }, _(t)))
                },
                getChatInfo: function() {
                    var e = b.$("livechat").$("channel").$("rating$string").getValue()
                      , t = b.$("livechat").$("channel").$("comment$string").getValue()
                      , n = {};
                    return i(e) || (n.rating = e),
                    i(t) || (n.comment = t),
                    n
                },
                endChat: function(e) {
                    var t = w.$("livechat").$("channel");
                    g([L], [e], "endChat()") || t.write({
                        chatting$bool: !1
                    }, _(e = e || I))
                },
                isChatting: function() {
                    return b.$("livechat").$("channel").$("chatting$bool").getValue() || !1
                },
                getServingAgentsInfo: function() {
                    return h(b.$("livechat").$("agents").getValue(), R)
                },
                sendOfflineMsg: function(e, t) {
                    var n;
                    g([T.obj({
                        name: T.type("string").regex(D),
                        email: T.type("string").regex(x.email),
                        message: T.type("string").regex(D)
                    }, {
                        requiredKeys: ["name", "email", "message"]
                    }), L], [e, t], "sendOfflineMsg()") || (t = t || I,
                    n = {
                        name: {
                            name$string: "name",
                            value$string: e.name
                        },
                        email: {
                            name$string: "email",
                            value$string: e.email
                        },
                        message: {
                            name$string: "message",
                            value$string: e.message
                        }
                    },
                    "department"in e && (n.department = {
                        name$string: "department_id",
                        value$string: e.department
                    }),
                    w.$("livechat").$("settings").$("forms").$("offline_form").$("form_submitted").write(n, _(t)))
                },
                sendTyping: function(e, t) {
                    g([T.type("boolean"), L], [e, t], "sendTyping()") || (t = t || I,
                    w.$("livechat").$("channel").$("typing").write({
                        typing$bool: e
                    }, _(t)))
                },
                sendEmailTranscript: function(e, t) {
                    g([T.type("string").regex(x.email), L], [e, t], "sendEmailTranscript()") || (t = t || I,
                    w.$("livechat").$("channel").write({
                        email_transcript$string: e
                    }, _(t)))
                },
                getChatLog: function() {
                    var e, t, n, i, o = ["type$string", "timestamp$int"], r = b.$("livechat").$("channel").$("log").getValue(), s = [];
                    for (i in r)
                        if (r.hasOwnProperty(i)) {
                            if (r[i].type$string)
                                e = r[i];
                            else if ("chat.msg" === (e = w.$("livechat").$("channel").$("log").$(i).getValue()).type$string && (!0 === e.unverified$bool || !0 === e.failed$bool))
                                continue;
                            var a = l(e);
                            if (null === a)
                                continue;
                            for (var c = 0; c < o.length; c++)
                                (n = p(t = o[c]))in a || (a[n] = e[t]);
                            s.push(a)
                        }
                    return s
                },
                getConnectionStatus: function() {
                    var e = b.$("connection").$("status$string").getValue();
                    return te(e)[0]
                },
                getAccountStatus: function() {
                    var e = b.$("livechat").$("account").$("status$string").getValue();
                    return ne(e)[0]
                },
                getOperatingHours: function() {
                    var e, i, o, r, s, t = b.$("livechat"), n = t.$("settings"), a = n.$("operating_hours");
                    if (n.hasKey("operating_hours"))
                        return e = a.$("type$string").getValue(),
                        n = {
                            enabled: a.$("enabled$bool").getValue(),
                            type: e,
                            timezone: n.$("timezone$string").getValue() || "UTC"
                        },
                        "account" == e ? n.account_schedule = function(e) {
                            for (var t, n, i = {}, o = 0; o < 7; o++) {
                                var r = e[o] || {};
                                if (r.enabled$bool) {
                                    for (var s in t = [],
                                    n = r.periods)
                                        n.hasOwnProperty(s) && t.push({
                                            start: n[s].start$int,
                                            end: n[s].end$int
                                        });
                                    i[o] = q(t)
                                } else
                                    i[o] = []
                            }
                            return i
                        }(a.$("schedule").getValue() || {}) : "department" == e && (n.department_schedule = (e = a.$("schedules").getValue(),
                        a = t.$("departments").getKeys(),
                        o = {},
                        r = function(e) {
                            var t, n, i, o = {};
                            for (i in e)
                                if (e.hasOwnProperty(i)) {
                                    if ((n = e[i]).hasOwnProperty("deleted_ts$int"))
                                        continue;
                                    if (!n.departments)
                                        continue;
                                    if (!n.enabled$bool)
                                        continue;
                                    t = {};
                                    for (var r = 0; r < 7; r++) {
                                        var s = n[r]
                                          , a = [];
                                        if (s.enabled$bool && s.periods) {
                                            var c, l = s.periods;
                                            for (c in l)
                                                l.hasOwnProperty(c) && a.push({
                                                    start: l[c].start$int,
                                                    end: l[c].end$int
                                                });
                                            a.length && (t[r] = a)
                                        }
                                    }
                                    Object.keys(t).length && (o[i] = t)
                                }
                            return o
                        }(e),
                        s = function(e, t) {
                            var n, i, o = {};
                            for (i in t.forEach(function(e) {
                                o[e] = []
                            }),
                            e)
                                if (e.hasOwnProperty(i))
                                    for (var r in (n = e[i]).departments)
                                        if (n.departments.hasOwnProperty(r)) {
                                            if (!n.departments[r])
                                                continue;
                                            r = p(r);
                                            if (!o[r])
                                                continue;
                                            o[r].push(i)
                                        }
                            return o
                        }(e, a),
                        a.forEach(function(n) {
                            var e = s[n];
                            for (o[n] = {},
                            i = 0; i < 7; i++)
                                o[n][i] = [];
                            for (e.forEach(function(e) {
                                for (var t in r[e])
                                    r[e].hasOwnProperty(t) && Array.prototype.push.apply(o[n][t], r[e][t])
                            }),
                            i = 0; i < 7; i++) {
                                var t = o[n][i];
                                1 < t.length && (o[n][i] = q(t))
                            }
                        }),
                        o)),
                        n
                },
                _getAccountSettings: function() {
                    var e = b.$("livechat").$("settings").getValue()
                      , t = $.clone(X.livechat.settings)
                      , t = K.fullyExtend(t, e);
                    return function e(t) {
                        if (!t || "object" != typeof t)
                            return t;
                        var n, i, o, r = {};
                        for (n in t)
                            t.hasOwnProperty(n) && (i = p(n),
                            o = e(t[n]),
                            r[i] = o);
                        return r
                    }(ae(t))
                }
            }),
            O = e.extend({}),
            I = function() {}
            ,
            J = /[0-9]+/,
            Z = /^(https?|ftps?):\/\//i,
            D = /\S/,
            L = (T = G).any([T.equal(void 0), T.type("function")]),
            te = u(Q = {
                reattached: "connected",
                connected: "connecting",
                registered: null,
                idle_disconnect: "closed",
                shutdown: "closed",
                error: "closed"
            }),
            ne = u(ee = {
                online: "online",
                offline: "offline",
                away: "away",
                invalid_account_key: null,
                banned: null
            }),
            ie = s(["email$string", "phone$string", "display_name$string"]),
            N = s(["name$string", "status$string"], "id", function(e, t) {
                return {
                    id: parseInt(t, 10)
                }
            }),
            R = s(["avatar_path$string", "display_name$string", "title$string"], "nick"),
            oe = s(["typing$bool"], "nick", function(e) {
                return e.hasOwnProperty("typing$bool") ? {
                    type: "typing"
                } : null
            }),
            re = s(["typing$bool"], "display_name", function(e) {
                return e.hasOwnProperty("typing$bool") ? {
                    type: "typing",
                    nick: "agent:trigger"
                } : null
            }),
            se = s(["timestamp$int"], null, l),
            ae = s(["banner", "behavior", "bubble", "chat_button", "chat_window", "concierge", "file_sending", "forms", "greetings", "language", "login", "rating", "sound", "theme", "timezone$string"]),
            U(C, "meshim_widget_controllers_WebSDKAPI"),
            C)
        }
        .call(e, le(3), le(8), le(7), le(9), le(6), le(1))
    }
    , function(l, e, t) {
        !function(d, e) {
            function t(s, e) {
                function a(e) {
                    return !s.nodeType && s != window && s != document || ("FORM" != s.tagName || "submit" != e) && !d.isCustomEvents && (d.isFF && d.isFF < 9 ? !document.createEvent("event")[e.toUpperCase()] : void 0 === s["on" + e])
                }
                function r(e) {
                    var t = l[e];
                    t && (s.attachEvent ? s.detachEvent("on" + e, t) : s.addEventListener && s.removeEventListener(e, t, !1),
                    delete l[e],
                    delete c[e])
                }
                var t, c = {}, l = {}, u = function(e) {
                    e.preventDefault = u.preventDefault,
                    e.stopPropagation = u.stopPropagation,
                    e.target = e.srcElement
                }, n = (u.preventDefault = function() {
                    this.returnValue = !1
                }
                ,
                u.stopPropagation = function() {
                    this.cancelBubble = !0
                }
                ,
                {
                    fire: function(e, t) {
                        if (d.isCustomEvents && !a(e))
                            return s.dispatchEvent(new window.CustomEvent(e,{
                                bubbles: !1,
                                cancelable: !0,
                                detail: t
                            }));
                        var n, i, o = c[e], r = !0;
                        if (o && o.length) {
                            for (o._active = !0,
                            n = 0,
                            i = o.length; n < i; n++)
                                try {
                                    if (!o[n])
                                        continue;
                                    !1 === o[n].call(s, t) && (r = !1)
                                } catch (e) {
                                    h.fire("error", e)
                                }
                            if (o._active = !1,
                            o._dirty) {
                                for (n = 0; n < i; n++)
                                    o[n] || (n == i - 1 ? o.pop() : o[n--] = o.pop(),
                                    i--);
                                o._dirty = !1
                            }
                        }
                        return r
                    },
                    on: function(e, t, n) {
                        if (!e && "function" != typeof t)
                            throw "bad arguments to on / addEventListener";
                        if (!(e in c || (c[e] = [],
                        a(e)))) {
                            var r = e;
                            r in l || (l[r] = function(e) {
                                e && !e.stopPropagation && u(e);
                                var t, n = c[r], i = n.length, o = !0;
                                for (n._active = !0,
                                t = 0; t < i; t++)
                                    try {
                                        if (!n[t])
                                            continue;
                                        !1 === n[t].call(s, d.isCustomEvents && e instanceof window.CustomEvent ? e.detail : e) && (o = !1)
                                    } catch (e) {
                                        h.fire("error", e)
                                    }
                                if (n._active = !1,
                                n._dirty) {
                                    for (t = 0; t < i; t++)
                                        n[t] || (t == i - 1 ? n.pop() : n[t--] = n.pop(),
                                        i--);
                                    n._dirty = !1
                                }
                                if (!1 === o)
                                    return e && (e.preventDefault(),
                                    e.returnValue = !1),
                                    !1
                            }
                            ,
                            s.attachEvent ? s.attachEvent("on" + r, l[r]) : s.addEventListener && s.addEventListener(r, l[r], !1))
                        }
                        return c[e].push(t),
                        s
                    },
                    un: function(e, t) {
                        var n = c[e];
                        if (n) {
                            for (var i = 0, o = n.length; i < o; i++)
                                if (n[i] === t) {
                                    1 == n.length ? l[e] ? r(e) : delete c[e] : n._active ? (n[i] = null,
                                    n._dirty = !0) : i == o - 1 ? n.pop() : n[i] = n.pop();
                                    break
                                }
                            return s
                        }
                    },
                    unextendEvents: function() {
                        if (c && l) {
                            for (var e in l)
                                l.hasOwnProperty(e) && r(e);
                            c = l = null
                        }
                    }
                });
                if (e)
                    return n;
                for (t in n)
                    n.hasOwnProperty(t) && (s[t] = n[t]);
                return d.bugs.leaksMemory && d.bugs.leaksMemory(function() {
                    for (var e in n)
                        n.hasOwnProperty(e) && (s[e] = null)
                }),
                s
            }
            function n(e, t) {
                e <= a ? t() : c[e].push(t)
            }
            function i(e) {
                for (; a < e; ) {
                    a++;
                    for (var t = 0; t < c[a].length; t++)
                        c[a][t]();
                    c[a] = null
                }
            }
            function o() {
                i(2)
            }
            var r, s, h, a, c;
            l.exports = ((h = {
                extend: t,
                body: t(document.body, !0),
                window: t(window, !0),
                document: t(document, !0),
                runAfterScriptReady: function(e) {
                    n(0, e)
                },
                runAfterFirstChildReady: function(e) {
                    n(1, e)
                },
                runAfterDomReady: function(e) {
                    n(2, e)
                }
            }).extend(h),
            a = 0,
            c = [[], [], [], []],
            function e() {
                0 < a || (document.body && document.body.firstChild ? i(1) : window.setTimeout(e, 200))
            }(),
            d.isSafari ? s = window.setInterval(function() {
                /loaded|complete/i.test(document.readyState) && (window.clearInterval(s),
                o())
            }, 20) : document.addEventListener ? /loaded|complete/i.test(document.readyState) ? o() : document.addEventListener("DOMContentLoaded", o, !1) : d.isIE && (window.attachEvent("onload", o),
            r = document.createElement("document:ready"),
            s = window.setInterval(function() {
                if (!/loaded|complete/i.test(document.readyState))
                    try {
                        r.doScroll("left")
                    } catch (e) {
                        return
                    }
                r = null,
                window.clearInterval(s),
                o()
            }, 200)),
            e(h, "jx_core_Events"),
            h)
        }
        .call(e, t(4), t(1))
    }
    , function(module, exports, __webpack_require__) {
        !function(Assert, isUndefined, $jxml_extends) {
            module.exports = function() {
                function secureURL(e) {
                    return e.replace(/^http:/, isSecure ? "https:" : "http:")
                }
                function getWindowClientHeight() {
                    return void 0 !== window.innerHeight ? window.innerHeight : document.documentElement ? document.documentElement.offsetHeight : document.getElementsByTagName.body.length ? document.getElementsByTagName.body[0].clientHeight : 0
                }
                function getWindowClientWidth() {
                    return void 0 !== window.innerWidth ? window.innerWidth : document.documentElement ? document.documentElement.offsetWidth : document.getElementsByTagName.body.length ? document.getElementsByTagName.body[0].clientWidth : 0
                }
                function getFlashVersion() {
                    var e, t = nav.plugins && nav.plugins[FLASH];
                    if (t)
                        return (e = nav.mimeTypes && nav.mimeTypes[FLASH_MIME_TYPE]) && !e.enabledPlugin ? null : t.description;
                    if (window.ActiveXObject)
                        try {
                            return (t = new window.ActiveXObject(FLASH_AX)).AllowScriptAccess = "always",
                            t.GetVariable("$version")
                        } catch (e) {}
                }
                function getJavaVersion() {
                    var e = nav.mimeTypes;
                    return isIE ? !isWP7 && "javaEnabled"in nav && nav.javaEnabled() : (e = (e = e && e[JAVA_MIME_TYPE]) && e.enabledPlugin) ? e.name : void 0
                }
                function getScrollbarSize() {
                    var e, t, n, i;
                    return isUndefined(scrollbar_size) && (e = document.createElement("div"),
                    t = document.createElement("div"),
                    n = e.style,
                    i = t.style,
                    n.overflow = "auto",
                    n.width = n.height = "100px",
                    n.position = "absolute",
                    n.top = "-1000px",
                    i.width = "100%",
                    i.height = "200px",
                    e.appendChild(t),
                    document.body.appendChild(e),
                    scrollbar_size = e.offsetWidth - e.clientWidth,
                    document.body.removeChild(e)),
                    scrollbar_size
                }
                function detectCSP() {
                    try {
                        return eval("false")
                    } catch (e) {
                        return !0
                    }
                }
                function checkIE() {
                    for (var e = 3, t = document.createElement("div"), n = t.getElementsByTagName("i"); t.innerHTML = "\x3c!--[if gt IE " + ++e + "]><i></i><![endif]--\x3e",
                    n[0]; )
                        ;
                    return 4 < e ? e : document.documentMode
                }
                var nav = navigator, ua = nav.userAgent.toLowerCase(), isNewIE = +(/trident.*rv:? *([0-9]+)/.exec(ua) || [])[1] || !1, isIE = checkIE(), isIE8 = 8 == isIE, isIE7 = 7 == isIE, isIE6 = 6 == isIE, isOpera = window.opera && "[object Opera]" == Object.prototype.toString.call(window.opera), isChrome = "Google Inc." == navigator.vendor, isSafari = "Apple Computer, Inc." == navigator.vendor, isWebKit = !isIE && !isOpera && (isChrome || isSafari || /webkit|khtml/.test(ua)), isFF = +/\d+/.exec(/firefox\/\d+/i.exec(navigator.userAgent) || ""), isFF2 = -1 < ua.indexOf("firefox/2"), isFF3 = -1 < ua.indexOf("firefox/3"), isIPhone = -1 != ua.indexOf("iphone"), isIPod = -1 != ua.indexOf("ipod"), isIPad = -1 != ua.indexOf("ipad"), isIOS = isIPhone || isIPad || isIPod, isAndroid = -1 != ua.indexOf("android"), isWP7 = -1 != ua.indexOf("wp7"), isMobile = isIOS || isAndroid || isWP7, scrollbar_size, browser = (isIE ? "msie" : isFF && "firefox") || (isOpera ? "opera" : isChrome && "chrome") || isSafari && "safari", version, isBorderBox = isIE && !isStrict, isStrict = "CSS1Compat" == document.compatMode, isQuirks = !isStrict, isIE5Quirks = isIE && isQuirks && document.documentElement && !!document.documentElement.style.setExpression, engineIE = document.documentMode || isIE, isWindows = -1 != ua.indexOf("windows") || -1 != ua.indexOf("win32"), isMac = -1 != ua.indexOf("macintosh") || -1 != ua.indexOf("mac os x"), isSecure = "https:" == document.location.protocol, language = nav.language || nav.browserLanguage || nav.userLanguage || nav.systemLanguage, bugs = {
                    noBoxSizing: engineIE <= 7,
                    ie: {
                        cssBottomRight: isIE6,
                        cssFixed: isIE6 || isIE5Quirks,
                        buggyCSS: isIE6 || isIE5Quirks
                    }
                }, isTextContent = "textContent"in document.createElement("div"), isCustomEvents = !1, cleanupCallbacks, cleanup;
                try {
                    window.CustomEvent && /\[native code\]|\[object CustomEventConstructor\]/.test(window.CustomEvent.toString()) && (new window.CustomEvent("testevent",{
                        bubbles: !1,
                        cancelable: !0,
                        detail: !0
                    }),
                    isCustomEvents = !0)
                } catch (e) {}
                switch (browser) {
                case "msie":
                case "firefox":
                case "chrome":
                    version = +/\d+/.exec(new RegExp(browser + "[ /]\\d+").exec(ua) || "");
                    break;
                default:
                    version = +/\d+/.exec(/version[ \/]\d+/.exec(ua) || "")
                }
                isIE6 && (cleanupCallbacks = [],
                bugs.leaksMemory = function(e) {
                    Assert.isFunction(e),
                    cleanupCallbacks.push(e)
                }
                ,
                cleanup = function() {
                    for (var e = 0; e < cleanupCallbacks.length; e++)
                        cleanupCallbacks[e]()
                }
                ,
                bugs.leaksMemory.remove = function(e) {
                    for (var t = cleanupCallbacks.length - 1; 0 <= t; t--)
                        e == cleanupCallbacks[t] && cleanupCallbacks.splice(t, 1)
                }
                ,
                window.attachEvent("onunload", cleanup));
                var FLASH = "Shockwave Flash"
                  , FLASH_AX = "ShockwaveFlash.ShockwaveFlash"
                  , FLASH_MIME_TYPE = "application/x-shockwave-flash"
                  , JAVA_MIME_TYPE = "application/x-java-vm"
                  , Browser = {
                    browser: browser,
                    version: version,
                    isStrict: isStrict,
                    isQuirks: isQuirks,
                    isOpera: isOpera,
                    isSafari: isSafari,
                    isWebKit: isWebKit,
                    isChrome: isChrome,
                    isAndroid: isAndroid,
                    isIPhone: isIPhone,
                    isIPod: isIPod,
                    isIPad: isIPad,
                    isIOS: isIOS,
                    isWP7: isWP7,
                    isMobile: isMobile,
                    isNewIE: isNewIE,
                    isIE: isIE,
                    isIE6: isIE6,
                    isIE7: isIE7,
                    isIE8: isIE8,
                    isFF: isFF,
                    isFF2: isFF2,
                    isFF3: isFF3,
                    isBorderBox: isBorderBox,
                    isCustomEvents: isCustomEvents,
                    engineIE: engineIE,
                    bugs: bugs,
                    isWindows: isWindows,
                    isMac: isMac,
                    isSecure: isSecure,
                    secureURL: secureURL,
                    hasFlash: getFlashVersion(),
                    hasJava: getJavaVersion(),
                    language: language,
                    getScrollbarSize: getScrollbarSize,
                    getWindowClientHeight: getWindowClientHeight,
                    getWindowClientWidth: getWindowClientWidth,
                    isTextContent: isTextContent,
                    hasCSP: detectCSP()
                };
                return $jxml_extends(Browser, "jx_core_Browser"),
                Browser
            }()
        }
        .call(exports, __webpack_require__(5), __webpack_require__(7), __webpack_require__(1))
    }
    , function(t, e, n) {
        !function(n, e) {
            function i(e, t) {
                e || o.log(t)
            }
            var o;
            t.exports = (e(o = {
                ok: i,
                isFunction: function(e, t) {
                    i(n(e), t)
                },
                log: function() {}
            }, "jx_core_Assert"),
            o)
        }
        .call(e, n(6), n(1))
    }
    , function(n, e, t) {
        !function(e) {
            function t(e) {
                return "function" == typeof e
            }
            n.exports = (e(t, "jx_core_globals_isFunction"),
            t)
        }
        .call(e, t(1))
    }
    , function(n, e, t) {
        !function(e) {
            function t(e, t) {
                return t ? null == e : void 0 === e
            }
            n.exports = (e(t, "jx_core_globals_isUndefined"),
            t)
        }
        .call(e, t(1))
    }
    , function(n, e, t) {
        !function(e) {
            function t(e) {
                return "number" == typeof e
            }
            n.exports = (e(t, "jx_core_globals_isNumber"),
            t)
        }
        .call(e, t(1))
    }
    , function(n, e, t) {
        !function(e) {
            function t(e) {
                return "string" == typeof e
            }
            n.exports = (e(t, "jx_core_globals_isString"),
            t)
        }
        .call(e, t(1))
    }
    , function(t, e, n) {
        !function(e) {
            function i(e) {
                if ("object" != typeof e || !e)
                    return e;
                var t, n = {};
                for (t in e)
                    e.hasOwnProperty(t) && (n[t] = i(e[t]));
                return n
            }
            var o;
            t.exports = (e(e = {
                equal: o = function(e, t) {
                    return e === t || e && t && "object" == typeof e && "object" == typeof t && function(e, t) {
                        var n;
                        for (n in e)
                            if (!o(e[n], t[n]))
                                return !1;
                        for (n in t)
                            if (!o(e[n], t[n]))
                                return !1;
                        return !0
                    }(e, t)
                }
                ,
                clone: i,
                extend: function(e) {
                    if (e)
                        for (var t = 1, n = arguments.length; t < n; t++) {
                            var i = arguments[t];
                            if (i)
                                for (var o in i)
                                    i.hasOwnProperty(o) && (e[o] = i[o])
                        }
                    return e
                }
            }, "jx_core_ObjectUtil"),
            e)
        }
        .call(e, n(1))
    }
    , function(t, n, e) {
        !function(e) {
            function l(e, t) {
                this.name = e,
                this.leaf = /\$[a-z]+$/.test(e),
                this.parentNode = t,
                this.listeners_value = [],
                this.listeners_write = [],
                this.leaf || (this.deleted = !1,
                this.listeners_keys = [],
                this.childNodes = {},
                this.keys = {})
            }
            function u(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            t.exports = (l.prototype.fqname = function() {
                for (var e = this.path(), t = "", n = 0; n < e.length; n++)
                    t += /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(e[n]) ? "." + e[n] : "[" + JSON.stringify(e[n]) + "]";
                return t.substr(1)
            }
            ,
            l.prototype.path = function() {
                for (var e = this, t = [this.name]; e = e.parentNode; )
                    t.unshift(e.name);
                return t
            }
            ,
            l.prototype.$$ = l.prototype.descend = function(e) {
                for (var t, n = this, i = 0, o = (e = "string" == typeof e ? e.split(".") : e).length; i < o; i++)
                    t = e[i],
                    u(n.childNodes, t) || (n.childNodes[t] = new l(t,n)),
                    n = n.childNodes[t];
                return n
            }
            ,
            l.prototype.$ = function(e, t, n, i, o, r, s, a, c) {
                e = u(this.childNodes, e) ? this.childNodes[e] : this.childNodes[e] = new l(e,this);
                return t ? e.$(t, n, i, o, r, s, a, c) : e
            }
            ,
            l.prototype.update = function(e, t) {
                var n, i, o, r;
                if (null != e && this.undeleteParents(),
                this.leaf)
                    this.value !== e && (this.value = e,
                    o = !0,
                    this.notifyListeners(e, t));
                else if (null == e) {
                    if (!this.deleted) {
                        for (n in this.deleted = !(o = null),
                        this.childNodes)
                            this.childNodes.hasOwnProperty(n) && this.childNodes[n].update(null, !0);
                        this.notifyListeners(o, t)
                    }
                } else {
                    if (this.deleted)
                        for (n in this.deleted = !1,
                        o = e)
                            e.hasOwnProperty(n) && this.$(n).update(e[n], !0);
                    else
                        for (n in e)
                            e.hasOwnProperty(n) && (r = this.$(n),
                            i = e[n],
                            r.leaf ? r.update(i, !0) && ((o = o || {})[n] = i) : void 0 !== (r = r.update(i, !0)) && ((o = o || {})[n] = r));
                    o && this.notifyListeners(o, t)
                }
                return o
            }
            ,
            l.prototype.replace = function(e, t) {
                var n, i, o, r, s;
                if (null != e && this.undeleteParents(),
                this.leaf)
                    this.value !== e && (this.value = e,
                    r = !0,
                    this.notifyListeners(e, t));
                else if (null == e) {
                    if (!this.deleted) {
                        for (n in this.deleted = !(r = null),
                        this.childNodes)
                            this.childNodes.hasOwnProperty(n) && this.childNodes[n].replace(null, !0);
                        this.notifyListeners(r, t)
                    }
                } else {
                    if (this.deleted)
                        for (n in this.deleted = !1,
                        r = e)
                            e.hasOwnProperty(n) && this.$(n).replace(e[n], !0);
                    else {
                        for (n in this.childNodes)
                            if (this.childNodes.hasOwnProperty(n)) {
                                if (u(e, n))
                                    continue;
                                (o = this.childNodes[n]).leaf ? o.replace(null, !0) && ((r = r || {})[n] = null) : void 0 !== (s = o.replace(null, !0)) && ((r = r || {})[n] = null)
                            }
                        for (n in e)
                            e.hasOwnProperty(n) && (o = this.$(n),
                            i = e[n],
                            o.leaf ? o.replace(i, !0) && ((r = r || {})[n] = i) : void 0 !== (s = o.replace(i, !0)) && ((r = r || {})[n] = s))
                    }
                    r && this.notifyListeners(r, t)
                }
                return r
            }
            ,
            l.prototype.undeleteParents = function() {
                for (var e = this.parentNode; e && e.deleted; )
                    e.deleted = !1,
                    e = e.parentNode
            }
            ,
            l.prototype.write = function(e, t, n) {
                "function" == typeof t && (n = t,
                t = !1);
                var i = {
                    path: this.path(),
                    value: e
                };
                "function" == typeof n && (i.func = n),
                this.update(e, t || !1);
                for (var o = this; o.parentNode; )
                    o = o.parentNode;
                o.notifyWriteListeners(i)
            }
            ,
            l.prototype.bindWrite = function(e) {
                this.listeners_write.push(e)
            }
            ,
            l.prototype.bindValue = function(e) {
                this.listeners_value.push(e);
                try {
                    e.call(this, this.getValue())
                } catch (e) {}
            }
            ,
            l.prototype.bindKeys = function(e) {
                if (!this.leaf) {
                    this.listeners_keys.push(e);
                    try {
                        e.call(this, this.getKeys(), [])
                    } catch (e) {}
                }
            }
            ,
            l.prototype.unbindValue = function(e) {
                for (var t = 0; t < this.listeners_value.length; t++)
                    if (this.listeners_value[t] == e)
                        return void this.listeners_value.splice(t, 1)
            }
            ,
            l.prototype.unbindKeys = function(e) {
                if (!this.leaf)
                    for (var t = 0; t < this.listeners_keys.length; t++)
                        if (this.listeners_keys[t] == e)
                            return void this.listeners_keys.splice(t, 1)
            }
            ,
            l.prototype.on = function(e, t) {
                switch (e) {
                case "value":
                    this.bindValue(t);
                    break;
                case "keys":
                    this.bindKeys(t)
                }
            }
            ,
            l.prototype.un = function(e, t) {
                switch (e) {
                case "value":
                    this.unbindValue(t);
                    break;
                case "keys":
                    this.unbindKeys(t)
                }
            }
            ,
            l.prototype.addListener = function(e, t) {
                this.listeners[e].push(t)
            }
            ,
            l.prototype.removeListener = function(e, t) {
                for (var n = this.listeners[e], i = n.length; 0 < i--; )
                    n[i] == t && n.splice(i, 1)
            }
            ,
            l.prototype.notifyListeners = function(e, t) {
                var n, i, o;
                if (!this.leaf)
                    if (e)
                        for (n in e)
                            e.hasOwnProperty(n) && (null != e[n] ? u(this.keys, n) || (this.keys[n] = 1,
                            (i = i || []).push(n)) : u(this.keys, n) && (delete this.keys[n],
                            (o = o || []).push(n)));
                    else
                        for (n in this.keys)
                            this.keys.hasOwnProperty(n) && (delete this.keys[n],
                            (o = o || []).push(n));
                for (var r, s, a = 0, c = (r = this.listeners_value.concat()).length; a < c; a++)
                    try {
                        r[a](e)
                    } catch (e) {}
                if (!this.leaf) {
                    if (i || o)
                        for (a = 0,
                        c = (r = this.listeners_keys.concat()).length; a < c; a++)
                            try {
                                r[a](i || [], o || [])
                            } catch (e) {}
                    !t && this.parentNode && ((s = {})[this.name] = e,
                    this.parentNode.notifyListeners(s, t))
                }
            }
            ,
            l.prototype.notifyWriteListeners = function(e) {
                for (var t = this.listeners_write.concat(), n = 0; n < this.listeners_write.length; n++)
                    try {
                        t[n].call(this, e)
                    } catch (e) {}
            }
            ,
            l.prototype.getValue = function(e) {
                if (e)
                    return this.descend(e).getValue();
                if (this.leaf)
                    return this.value;
                if (this.deleted)
                    return null;
                var t, n, i, o = {};
                for (i in this.childNodes)
                    this.childNodes.hasOwnProperty(i) && null != (n = this.childNodes[i].getValue()) && (o[i] = n,
                    t = !0);
                return t ? o : null
            }
            ,
            l.prototype.hasKey = function(e) {
                return u(this.keys, e)
            }
            ,
            l.prototype.getKeys = function() {
                if (this.leaf)
                    return null;
                var e, t = [];
                for (e in this.keys)
                    this.keys.hasOwnProperty(e) && t.push(e);
                return t
            }
            ,
            l.prototype.gc = function() {
                if (this.leaf)
                    throw new TypeError("Leaf nodes cannot be collected");
                var e, t, n = !0;
                for (e in this.childNodes)
                    this.childNodes.hasOwnProperty(e) && (n = (t = this.childNodes[e]).leaf ? !t.listeners_value.length && null == t.value && (delete this.keys[e],
                    delete this.childNodes[e]) && n : t.gc() && (delete this.keys[e],
                    delete this.childNodes[e]) && n);
                return n && this.deleted && !this.listeners_keys.length && !this.listeners_value.length
            }
            ,
            n.DataNode = l,
            e(l, "jx_data_DataNode"),
            l)
        }
        .call(n, e(1))
    }
    , function(a, e, t) {
        !function(e, t, n, i) {
            var o, r, s;
            a.exports = (o = function() {
                for (var e = function() {
                    if (window.$zopim && window.$zopim.s)
                        return window.$zopim.s.src;
                    for (var e, t = document.getElementsByTagName("script"), n = /.*zopim.(com|net)\//, i = 0, o = t.length; i < o; i++)
                        if (e = t[i].src || "",
                        n.test(e))
                            return e;
                    return ""
                }(), t = [/\/?[?]/, /\/livechat\//], n = [], i = 0; i < t.length && !(n = e.split(t[i])).length; i++)
                    ;
                var o = n[1]
                  , r = n[0]
                  , s = /^(https?:)?\/\/[^\/]+/.exec(r)
                  , a = (r = r.replace(/^(https?:)?\/\//i, "").split("/")[0]).replace(/(.+\.)(?=.+\..+)/, "")
                  , c = n[0].split("/");
                return {
                    accountKey: o,
                    brandDomain: a,
                    baseURL: c = c.pop() == r ? n[0] : c.join("/"),
                    rootURL: s && "zopim.com" !== r ? s[0] : "https://v2.zopim.com"
                }
            }(),
            s = (r = "https://v2.zopim.com/widget") + "/images",
            e(t.baseURL, !0) && (t.baseURL = n.secureURL(o.baseURL)),
            s = {
                ASSETS_URL: r,
                IMAGES_URL: s,
                SOUNDS_URL: "https://v2.zopim.com/widget/sounds",
                FONTS_URL: "https://v2.zopim.com/widget/fonts",
                ASSETS_LEGACY: document.location.protocol + "//cdn.zopim.com/assets",
                BRANDING_URL: "https://www.zopim.com",
                AVATARS: {
                    CONCIERGE: s + "/avatar_simple_agent.png",
                    AGENT: s + "/avatar_simple_agent.png",
                    VISITOR: s + "/avatar_simple_visitor.png",
                    DEFAULT: s + "/avatar_simple_visitor.png"
                },
                ACCOUNT_KEY: o.accountKey,
                BRAND_DOMAIN: o.brandDomain,
                COUNTRY_CODE: r = "<" == (r = '\x3c!--# echo var="http_cf_ipcountry" default="geo" --\x3e'.toUpperCase()).charAt(0) ? "geo" : r,
                AUTH_URL: "https://www.zopim.com/auth/$NAME/$KEY-$MID",
                AUTH_LOGOUT_URL: "https://www.zopim.com/auth/logout/$KEY-$MID",
                IS_POPOUT: window.$zopim_popout,
                POPOUT_WINDOW_PREFIX: "zlivechatpopout_",
                POPOUT_URL: o.rootURL + "/widget/livechat.html",
                CALLBACK_FILE_UPLOAD_PATH: "/client/widget/upload",
                FILE_UPLOAD_PATH: "/client/widget/uploads",
                FILE_UPLOAD_MAX: 5242880,
                RESEND_MSG_TIMEOUT: 5e3,
                FILE_REPLACE_SOURCE: /^(\s*https?\:\/\/v2(?:assets|uploads)\.zopim\.)com(\/)/i,
                FILE_REPLACE_RESULT: "$1io$2",
                CHAT_LOG_REMEMBER_COUNT: 10
            },
            i(s, "meshim_widget_Config"),
            s)
        }
        .call(e, t(7), t(13), t(4), t(1))
    }
    , function(e, t) {
        e.exports = {
            build_number: "20170530.100619",
            git_commit: "e6874c4448d6b4e51e37eda803ba48c9ef16a6e9-dirty"
        }
    }
    , function(de, e, he) {
        !function(P, j, U, e, F) {
            function V(e) {
                var t, n, i;
                (O = "reattached" == e) && ee(),
                O && !1 === a && d && l.$("livechat").$("profile").write({
                    disconnect_timeout$int: te(d.rtt)
                }),
                "idle_disconnect" != e && "shutdown" != e && "error" != e || (i = l.$("livechat").$("account").$("status$string").getValue(),
                t = (n = l.$("connection").$("backoff")).$("active$int").getValue() || 0,
                n = n.$("max_seconds$int").getValue(),
                "invalid_account_key" == i ? S.warnBadEmbed() : "widget_v2" == y && "shutdown" == e && t && n && (i = n,
                window.clearTimeout(M.reconnectTimer),
                M.reconnectTimer = window.setTimeout(function() {
                    M.reconnect()
                }, 1e3 * i)),
                o()),
                s()
            }
            function z(e) {
                !e || w() || E.IS_POPOUT || e.mid$string && oe.setIdentity(e.mid$string)
            }
            function q(e) {
                m = !0 === e
            }
            function W(e) {
                if (_ = !1 !== e) {
                    D = !1;
                    for (var t = 0, n = T.length; t < n; t++) {
                        var i = T[t];
                        P(i) && i()
                    }
                    T = []
                }
            }
            function o(e) {
                d && d.close(),
                c = !e,
                d = null,
                C = ""
            }
            function B() {
                window.clearTimeout(M.reconnectTimer),
                o(!0),
                M.connect()
            }
            function H(e) {
                e && B()
            }
            function G(n) {
                var i = ie || new re(n,"W",null,ce);
                return i.on("open", function() {
                    var e, t;
                    e = n,
                    t = i,
                    h || (d ? t.close() : (u.update({
                        socket_status$string: null
                    }),
                    C = e,
                    k.increment("conn", ["tries:" + L]),
                    L = 0,
                    k.start("conn_open", t.starttime),
                    k.end("conn_open", .25, ["proxy:" + e]),
                    (d = t).on("break", X),
                    d.on("message", K),
                    d.on("reopen", J),
                    d.on("resume", Y),
                    d.on("error", function() {
                        var e = this.connect_attempts
                          , t = this.recv_messages;
                        3 < e && 0 == t && (o(!0),
                        r(le))
                    }),
                    Z()))
                }),
                i
            }
            function r(e) {
                function t() {
                    clearTimeout(o),
                    i.un("close", t),
                    r(e)
                }
                var n, i, o;
                d || c || (n = v.getNextHost()) && (L++,
                i = G(n),
                A.push(i),
                v.hasNext()) && (o = setTimeout(t, e),
                i.on("close", t))
            }
            function K(e) {
                var t, n;
                e && (e.raw && e.raw.__messageID in R && (t = R[e.raw.__messageID],
                delete R[e.raw.__messageID],
                t(e)),
                t = l,
                "update"in e) && (/^livechat.account/.test(e.path) && ((n = e.path.split(".")).splice(0, 2),
                ((n = n.join(".")) ? f.$("account").descend(n) : f.$("account")).update(e.update),
                S.fullyExtend(e.update, i.getValue("account"))),
                /^livechat/.test(e.path) && "account"in e.update && (f.$("account").update(e.update.account),
                S.fullyExtend(e.update.account, i.getValue("account"))),
                /^livechat.settings/.test(e.path) && ((n = e.path.split(".")).splice(0, 2),
                ((n = n.join(".")) ? f.$("settings").descend(n) : f.$("settings")).update(e.update),
                S.fullyExtend(e.update, i.getValue("settings"))),
                (t = e.path ? t.descend(e.path) : t).update(e.update),
                M.fire("message", e))
            }
            function X() {
                u.update({
                    socket_status$string: "break"
                })
            }
            function Y() {
                u.update({
                    socket_status$string: "resume"
                })
            }
            function J() {
                u.update({
                    socket_status$string: "reconnect"
                }),
                O = !1,
                Z()
            }
            function Z() {
                if (E.ACCOUNT_KEY) {
                    d || M.connect();
                    var e = oe.getIdentity()
                      , t = w()
                      , n = l.$("livechat").$("ui").getValue("mobile$bool") ? "mobile" : "desktop"
                      , i = l.$("livechat").$("settings").$("theme").getValue("name$string")
                      , o = {
                        __type: "http://tradingupandown.com/packages.html",
                        accountKey: E.ACCOUNT_KEY,
                        mID: e,
                        ua: window.navigator.userAgent,
                        dt: n,
                        theme: i,
                        cookie_law: t,
                        rev: j.git_commit,
                        source: y,
                        source_ver: ne
                    }
                      , r = (l.$("livechat").$("ui").$("popout$bool").getValue() ? o.popout = !0 : (o.title = document.title,
                    o.url = window.location.href,
                    o.ref = window.document.referrer),
                    M._register);
                    if (r)
                        for (var s in r)
                            r.hasOwnProperty(s) && (o[s] = r[s]);
                    d.send(o)
                }
            }
            function s() {
                var e = u.getValue("status$string")
                  , t = u.getValue("socket_status$string");
                window.clearTimeout(n.timer),
                "error" != e ? "break" == t ? "idle_disconnect" == e ? u.update({
                    message$string: "idle_disconnect"
                }) : (u.update({
                    message$string: "reconnecting"
                }),
                n.timer = window.setTimeout(n, 6e4)) : null === t && "registered" == e ? u.update({
                    message$string: "resuming"
                }) : U(e) && U(t) ? (e = p.getValue() ? "fast_init" : "first_init",
                u.update({
                    message$string: e
                })) : u.update({
                    message$string: null
                }) : n.timer = window.setTimeout(n, 5e3)
            }
            function n() {
                u.update({
                    message$string: "disconnected"
                })
            }
            function Q(e) {
                return R[N += 1] = e,
                N
            }
            function ee(e) {
                var t;
                if (e && ((t = {}).path = e.path,
                t.value = e.value,
                P(e.func) && (t.__messageID = Q(e.func)),
                I.push(t)),
                d && O)
                    for (; I.length; )
                        d.send(I.shift())
            }
            function te(e) {
                var t = 10 * x.SECOND
                  , n = +x.SECOND
                  , i = 120 * x.SECOND
                  , o = 20 * x.SECOND;
                return e = Math.round(e) || 0,
                e = Math.max(n, Math.min(e, t)),
                Math.floor((o + (e - n) / (t - n) * (i - o)) / 1e3)
            }
            var a, c, l, u, d, h, i, f, p, t, m, g, _, v, w, b, y, $, ne, ie, E, oe, k, S, re, se, ae, x, ce, le, ue, A, C, O, I, T, D, L, N, R, M;
            de.exports = (E = he(12),
            oe = he(15),
            k = he(28),
            S = he(21),
            re = he(53),
            se = he(58),
            ae = he(59),
            x = he(63),
            ce = {
                FLUSH_DELAY_MS: 0,
                RECONNECT_DELAY_MS: 1e4
            },
            le = 3e3,
            ue = new ae(se),
            C = "",
            O = !(A = []),
            I = [],
            D = !(T = []),
            N = L = 0,
            R = {},
            M = e.extend({
                init: function(e) {
                    w = e.isCookieDenied,
                    b = e.overrideProxy,
                    y = e.source,
                    $ = e.lastHost,
                    ne = e.source_ver,
                    l = e.root,
                    i = l.$("tmp").$("api_settings"),
                    f = l.$("tmp").$("server_settings"),
                    p = l.$("livechat").$("settings").$("cached$bool"),
                    u = l.$("connection"),
                    t = u.$("server_retired$bool"),
                    (g = u.$("server_ready$bool")).bindValue(W),
                    t.bindValue(q),
                    (h = l.$("livechat").$("ui").$("mockup$bool").getValue()) ? u.$("status$string").update("reattached") : (l.$("livechat").$("profile").bindValue(z),
                    u.$("status$string").bindValue(V),
                    u.$("socket_status$string").bindValue(s),
                    l.bindWrite(ee),
                    u.$("reconnect$bool").bindValue(H),
                    window.__z_sdk ? a = !0 : (a = !1,
                    "visibilityState"in document && "prerender" == document.visibilityState ? document.addEventListener("visibilitychange", function e() {
                        "prerender" != document.visibilityState && (document.removeEventListener("visibilitychange", e),
                        M.connect())
                    }) : M.connect()))
                },
                send: function(e) {
                    d && d.send(e)
                },
                connect: function() {
                    var e = $ || u.$("server$string").getValue() || "";
                    try {
                        v = ue.getGeoAccess(b, e, 3, 2)
                    } catch (e) {
                        return void (window.console && window.console.log("Unable to compute host list"))
                    }
                    r(le)
                },
                reconnect: B,
                disconnect: function() {
                    u.update({
                        status$string: "idle_disconnect"
                    })
                },
                getConnectionStats: function() {
                    var e = d;
                    return e ? {
                        connect_attempts: e.connect_attempts,
                        connections: e.connections,
                        disconnects: e.disconnects,
                        timeout_server: e.timeout_server,
                        timeout_response_soft: e.timeout_response_soft,
                        timeout_response_hard: e.timeout_response_hard,
                        sent_bytes: e.sent_bytes,
                        recv_bytes: e.recv_bytes,
                        sent_messages: e.sent_messages,
                        recv_messages: e.recv_messages,
                        sent_frames: e.sent_frames,
                        recv_frames: e.recv_frames,
                        lost_frames: e.lost_frames,
                        ooo_frames: e.ooo_frames,
                        bytes_at_connect: e.bytes_at_connect,
                        rtt: e.rtt,
                        clock_skew: e.clock_skew,
                        reconnect_delay: e.reconnect_delay,
                        quality: e.quality,
                        host: e.host,
                        status: e.status,
                        zone: window.__$__GEO,
                        last_frame_time: e.last_frame_time,
                        local_time: +new Date
                    } : {
                        status: "not connected"
                    }
                },
                getHost: function() {
                    return C
                },
                getServerTime: function() {
                    return +new Date - (d ? d.clock_skew : 0)
                },
                getServerSettings: function(e) {
                    return e ? f.getValue(e) : f.getValue()
                },
                reconnectIfServerRetired: function(e) {
                    !_ || m ? (u.update({
                        server_ready$bool: !1
                    }),
                    T.push(e),
                    D || (D = !0,
                    d.reconnect())) : e()
                },
                registerCallback: Q,
                getDCTimeoutValue: te,
                setSocket: function(e) {
                    ie = e
                },
                reset: function() {
                    g.unbindValue(W),
                    t.unbindValue(q),
                    l.$("livechat").$("profile").unbindValue(z),
                    u.$("status$string").unbindValue(V),
                    u.$("socket_status$string").unbindValue(s),
                    u.$("reconnect$bool").unbindValue(H),
                    o(),
                    A.forEach(function(e) {
                        e.close(),
                        e.fire("close")
                    }),
                    n.timer = clearTimeout(n.timer),
                    C = "",
                    O = !(A = []),
                    I = [],
                    D = !(T = []),
                    N = L = 0,
                    R = {},
                    a = c = l = u = d = h = i = f = p = t = m = g = _ = v = w = b = y = $ = ne = ie = null
                }
            }),
            F(M, "meshim_widget_controllers_ConnectionController"),
            M)
        }
        .call(e, he(6), he(13), he(7), he(3), he(1))
    }
    , function(p, e, m) {
        !function(t, e) {
            function n(e) {
                e = t(e),
                s.set(u, e = e ? 1 : 0, {
                    path: "/",
                    ttl: 365,
                    domain: h
                })
            }
            function r(e) {
                return s.getJSONCookie(e)[f]
            }
            var o, s, a, i, c, l, u, d, h, f;
            p.exports = (o = m(17),
            s = m(20),
            a = m(12),
            i = m(21),
            c = "__zlcstore",
            l = "__zlcmid",
            u = "__zlcprivacy",
            d = window.location.hostname,
            h = /\b(?:\d{1,3}\.){3}\d{1,3}/.test(d) ? d : i.getEffectiveTLD(d),
            f = a.ACCOUNT_KEY,
            e(i = {
                init: function() {
                    f = a.ACCOUNT_KEY
                },
                DOM: {
                    saveVariable: function(e, t) {
                        var n = o.get(c) || {}
                          , i = (n[f] || (n[f] = {}),
                        n[f]);
                        i[e] = t,
                        i.timestamp = +new Date,
                        o.set(c, n)
                    },
                    getVariable: function(e) {
                        var t = o.get(c) || {};
                        return t[f] ? (t = t[f]).timestamp ? 48e4 < +new Date - t.timestamp ? {} : t[e] : t[e] || {} : {}
                    }
                },
                Cookie: s,
                clearAll: function() {
                    s.remove(l, {
                        path: "/",
                        domain: h
                    }),
                    o.remove(c)
                },
                setIdentity: function(e) {
                    s.set(l, e, {
                        path: "/",
                        ttl: 365,
                        domain: h
                    })
                },
                getIdentity: function() {
                    var e;
                    if (a.IS_POPOUT) {
                        for (var t, n = "mid", i = window.location.search.slice(1).split("&"), o = 0; o < i.length; o++)
                            if ((t = i[o].split("="))[0] == n)
                                try {
                                    return window.decodeURIComponent(t[1] || "")
                                } catch (e) {
                                    return ""
                                }
                        return ""
                    }
                    return e = s.getJSONCookie("__zlcid"),
                    s.remove("__zlcid", {
                        path: "/"
                    }),
                    e.mID || (e = r("__zlcstore"),
                    s.remove("__zlcstore", {
                        path: "/",
                        domain: h
                    }),
                    e && e.mID ? e.mID : void 0) || s.get(l) || ""
                },
                clearAllowCookieLaw: function() {
                    s.remove(u, {
                        path: "/",
                        domain: h
                    })
                },
                getAllowCookieLaw: function() {
                    var e = function() {
                        var e, t = r("__zlcprivacy");
                        "boolean" == typeof t && n(e = t);
                        return e
                    }();
                    return "boolean" == typeof e ? e : (e = s.get(u),
                    0 !== (e = parseInt(e, 10)) && (1 === e || void 0))
                },
                setAllowCookieLaw: n
            }, "meshim_widget_controllers_StorageController"),
            i)
        }
        .call(e, m(16), m(1))
    }
    , function(n, e, t) {
        !function(e) {
            function t(e) {
                return !!e && "false" != e
            }
            n.exports = (e(t, "jx_core_globals_parseBoolean"),
            t)
        }
        .call(e, t(1))
    }
    , function(e, t, f) {
        !function(h) {
            e.exports = function() {
                function e(n) {
                    return function() {
                        try {
                            var e = Array.prototype.slice.call(arguments, 0)
                              , t = (e.unshift(i),
                            o.appendChild(i),
                            i.addBehavior("#default#userData"),
                            i.load(c),
                            n.apply(a, e));
                            return o.removeChild(i),
                            t
                        } catch (e) {}
                    }
                }
                function s(e) {
                    return e.replace(u, "___")
                }
                var i, o, n = f(18), a = {}, t = window, r = t.document, c = "localStorage", l = "__storejs__";
                if (a.disabled = !1,
                a.set = function() {}
                ,
                a.get = function() {}
                ,
                a.remove = function() {}
                ,
                a.clear = function() {}
                ,
                a.transact = function(e, t, n) {
                    var i = a.get(e);
                    null == n && (n = t,
                    t = null),
                    n(i = void 0 === i ? t || {} : i),
                    a.set(e, i)
                }
                ,
                a.getAll = function() {}
                ,
                a.serialize = function(e) {
                    return n.stringify(e)
                }
                ,
                a.deserialize = function(t) {
                    if ("string" == typeof t)
                        try {
                            return n.parse(t)
                        } catch (e) {
                            return t || void 0
                        }
                }
                ,
                function() {
                    try {
                        return c in t && t[c]
                    } catch (e) {}
                }())
                    i = t[c],
                    a.set = function(e, t) {
                        return void 0 === t ? a.remove(e) : (i.setItem(e, a.serialize(t)),
                        t)
                    }
                    ,
                    a.get = function(e) {
                        return a.deserialize(i.getItem(e))
                    }
                    ,
                    a.remove = function(e) {
                        i.removeItem(e)
                    }
                    ,
                    a.clear = function() {
                        i.clear()
                    }
                    ,
                    a.getAll = function() {
                        for (var e = {}, t = 0; t < i.length; ++t) {
                            var n = i.key(t);
                            e[n] = a.get(n)
                        }
                        return e
                    }
                    ;
                else if (r.documentElement.addBehavior) {
                    try {
                        (d = new window.ActiveXObject("htmlfile")).open(),
                        d.write('<script>document.w=window<\/script><iframe src="/favicon.ico"></frame>'),
                        d.close(),
                        o = d.w.frames[0].document,
                        i = o.createElement("div")
                    } catch (e) {
                        i = r.createElement("div"),
                        o = r.body
                    }
                    var u = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");
                    a.set = e(function(e, t, n) {
                        return t = s(t),
                        void 0 === n ? a.remove(t) : (e.setAttribute(t, a.serialize(n)),
                        e.save(c),
                        n)
                    }),
                    a.get = e(function(e, t) {
                        return t = s(t),
                        a.deserialize(e.getAttribute(t))
                    }),
                    a.remove = e(function(e, t) {
                        t = s(t),
                        e.removeAttribute(t),
                        e.save(c)
                    }),
                    a.clear = e(function(e) {
                        var t = e.XMLDocument.documentElement.attributes;
                        e.load(c);
                        for (var n, i = 0; n = t[i]; i++)
                            e.removeAttribute(n.name);
                        e.save(c)
                    }),
                    a.getAll = e(function(e) {
                        for (var t, n = e.XMLDocument.documentElement.attributes, i = {}, o = 0; t = n[o]; ++o) {
                            var r = s(t.name);
                            i[t.name] = a.deserialize(e.getAttribute(r))
                        }
                        return i
                    })
                }
                try {
                    a.set(l, l),
                    a.get(l) != l && (a.disabled = !0),
                    a.remove(l)
                } catch (e) {
                    a.disabled = !0
                }
                a.enabled = !a.disabled;
                var d = a;
                return h(d, "meshim_common_DOMStorage"),
                d
            }()
        }
        .call(t, f(1))
    }
    , function(s, e, t) {
        !function(e, c, t) {
            function l(e) {
                return '"' + e.replace(i, n) + '"'
            }
            function n(e) {
                return o[e] || "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }
            function u(e, t, n) {
                return t ? r[t] : String.fromCharCode(parseInt(n, 16))
            }
            var i, o, d, h, r, f, p;
            s.exports = (e = !e(window) && window.JSON || {
                parse: function(e) {
                    for (var t, n, i, o, r, s = e.match(d), a = (s.length,
                    s[0]), c = ("{" == a ? (t = {},
                    r = 1) : "[" == a ? (t = [],
                    r = 1) : (t = [],
                    n = !(r = 0)),
                    [t]), l = s.length; r < l; ++r)
                        switch ((a = s[r]).charCodeAt(0)) {
                        case 91:
                            o = c[0],
                            c.unshift(o[i || o.length] = []),
                            i = void 0;
                            break;
                        case 93:
                            c.shift();
                            break;
                        case 123:
                            o = c[0],
                            c.unshift(o[i || o.length] = {}),
                            i = void 0;
                            break;
                        case 125:
                            c.shift();
                            break;
                        case 102:
                            (o = c[0])[i || o.length] = !1,
                            i = void 0;
                            break;
                        case 110:
                            (o = c[0])[i || o.length] = null,
                            i = void 0;
                            break;
                        case 116:
                            (o = c[0])[i || o.length] = !0,
                            i = void 0;
                            break;
                        case 34:
                            if (-1 !== (a = a.substring(1, a.length - 1)).indexOf(p) && (a = a.replace(h, u)),
                            o = c[0],
                            null == i) {
                                if (!(o instanceof Array)) {
                                    i = a || f;
                                    break
                                }
                                i = o.length
                            }
                            o[i] = a,
                            i = void 0;
                            break;
                        default:
                            (o = c[0])[i || o.length] = +a,
                            i = void 0
                        }
                    if (n) {
                        if (1 == c.length)
                            return t[0]
                    } else if (!c.length)
                        return t;
                    throw "error"
                },
                stringify: function e(t) {
                    switch (typeof t) {
                    case "string":
                        return l(t);
                    case "number":
                        return isFinite(t) ? t.toString() : "null";
                    case "boolean":
                        return String(t);
                    case "object":
                        if (!t)
                            return "null";
                        var n, i, o = [];
                        if (c(t)) {
                            for (n = 0,
                            i = t.length; n < i; n++)
                                o[n] = e(t[n]) || "null";
                            return "[" + o.join(",") + "]"
                        }
                        var r, s, a = [];
                        for (r in t)
                            t.hasOwnProperty(r) && a.push(r);
                        for (a.sort(),
                        n = 0,
                        i = a.length; n < i; n++)
                            (s = e(t[r = a[n]])) && o.push(l(r) + ":" + s);
                        return o.length ? "{" + o.join(",") + "}" : void 0
                    }
                }
            },
            i = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            o = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                "\\": "\\\\",
                '"': '\\"'
            },
            d = new RegExp('(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|(?:"(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))*"))',"g"),
            h = new RegExp("\\\\(?:([^u])|u(.{4}))","g"),
            r = {
                '"': '"',
                "/": "/",
                "\\": "\\",
                b: "\b",
                f: "\f",
                n: "\n",
                r: "\r",
                t: "\t"
            },
            f = new String(""),
            p = "\\",
            t(e, "jx_data_JSON"),
            e)
        }
        .call(e, t(7), t(19), t(1))
    }
    , function(n, e, t) {
        !function(e) {
            function t(e) {
                return "[object Array]" == Object.prototype.toString.call(e)
            }
            n.exports = (e(t, "jx_core_globals_isArray"),
            t)
        }
        .call(e, t(1))
    }
    , function(a, e, c) {
        !function(e) {
            function n(e) {
                return "string" == typeof (t = e) && "" != t && function() {
                    var e, t, n, i, o = document.cookie, r = {};
                    if (!o || "string" != typeof o)
                        return {};
                    for (e = (o = o.split(/;\s/)).length; e--; )
                        try {
                            if (!(t = o[e].match(/^([^=]+)(=(.*))?$/)))
                                continue;
                            n = s(t[1]),
                            i = s(t[3] || ""),
                            r[n] = i
                        } catch (e) {}
                    return r
                }()[e] || null;
                var t
            }
            function i(e, t, n) {
                n = n || {};
                var i, e = r(e) + "=" + r(t);
                "ttl"in n && (t = new Date,
                i = 24 * n.ttl * 60 * 60 * 1e3,
                t.setTime(t.getTime() + i),
                e += "; expires=" + t.toGMTString()),
                "path"in n && (e += "; path=" + n.path),
                "domain"in n && (e += "; domain=" + n.domain),
                n.secure && (e += "; secure"),
                document.cookie = e
            }
            var o, t, r, s;
            a.exports = (o = c(18),
            t = {
                set: i,
                get: n,
                getJSONCookie: function(e) {
                    var e = n(e)
                      , t = {};
                    try {
                        t = o.parse(e)
                    } catch (e) {}
                    return t && "object" == typeof t ? t : {}
                },
                setJSONCookie: function(e, t, n) {
                    i(e, o.stringify(t = "object" != typeof t ? {} : t), n)
                },
                remove: function(e, t) {
                    (t = t || {}).ttl = -1,
                    i(e, "", t)
                }
            },
            r = window.encodeURIComponent,
            s = window.decodeURIComponent,
            e(t, "meshim_common_Cookie"),
            t)
        }
        .call(e, c(1))
    }
    , function(v, e, w) {
        !function(t, o, c, e) {
            function n(e, t) {
                for (var i, n = document.createElement("div"), o = 0, r = h.length; o < r; o++)
                    if (void 0 !== n.style[h[o]]) {
                        i = t[o];
                        break
                    }
                return i ? e ? function(e, t, n) {
                    e.autobind(t, i, n)
                }
                : function(e, t, n) {
                    e.autounbind(t, i, n)
                }
                : function() {}
            }
            var i, r, s, a, l, u, d, h, f, p, m, g, _;
            v.exports = (a = w(20),
            l = w(12),
            u = "-webkit- -moz- -o- -ms- ".split(" "),
            d = "webkit Moz O ms ".split(" "),
            h = ["transition", "MozTransition", "OTransition", "WebkitTransition"],
            f = ["transitionend", "transitionend", "otransitionend", "webkitTransitionEnd"],
            p = ["animationend", "animationend", "oanimationend", "webkitAnimationEnd"],
            m = {
                contains: (s = document.documentElement).compareDocumentPosition ? function(e, t) {
                    return e = e.dom || e,
                    t = t.dom || t,
                    !!(16 & e.compareDocumentPosition(t))
                }
                : s.contains ? function(e, t) {
                    e = e.dom || e,
                    t = t.dom || t;
                    var n = 9 === e.nodeType ? e.documentElement : e
                      , t = t.parentNode;
                    return e === t || !!(t && 1 === t.nodeType && n.contains && n.contains(t))
                }
                : function(e, t) {
                    for (e = e.dom || e,
                    t = t.dom || t; t = t.parentNode; )
                        if (t === e)
                            return !0;
                    return !1
                }
                ,
                onTransitionEnd: n(!0, f),
                unTransitionEnd: n(!1, f),
                onAnimationEnd: n(!0, p),
                unAnimationEnd: n(!1, p),
                css_prefixes: u,
                cssom_prefixes: d,
                isStyleSupported: (r = document.createElement("div").style,
                function(e) {
                    for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = (e + " " + d.join(t + " ") + t).split(" "), i = 0; i < n.length; i++)
                        if (void 0 !== r[n[i]])
                            return !0;
                    return !1
                }
                ),
                pick: function(e, t) {
                    for (var n = {}, i = 0, o = t.length; i < o; i++) {
                        var r = t[i];
                        r in e && (n[r] = e[r])
                    }
                    return n
                },
                shallowExtend: function() {
                    for (var e, t, n = arguments.length, i = 1, o = arguments[0] || {}; i < n; i++)
                        if (null != (e = arguments[i]))
                            for (t in e)
                                e.hasOwnProperty(t) && o !== e[t] && (o[t] = e[t]);
                    return o
                },
                fullyExtend: function e(t, n) {
                    for (var i in n)
                        n.hasOwnProperty(i) && (n[i] && n[i].constructor && n[i].constructor === Object ? (t[i] = t[i] || {},
                        e(t[i], n[i])) : t[i] = n[i]);
                    return t
                },
                fullyDelete: function e(t, n) {
                    for (var i in n)
                        if (n.hasOwnProperty(i)) {
                            if (!(i in t))
                                continue;
                            n[i] && n[i].constructor && n[i].constructor === Object ? e(t[i], n[i]) : delete t[i]
                        }
                    return t
                },
                computedHeightBoxSizingBug: function() {
                    if (void 0 === i)
                        try {
                            i = !!window.getComputedStyle && (e = document.createElement("div"),
                            t = "border-box",
                            document.body.appendChild(e),
                            e.style.height = "10px",
                            e.style.padding = "5px",
                            e.style.boxSizing = t,
                            e.style.webkitBoxSizing = t,
                            e.style.mozBoxSizing = t,
                            t = parseInt(window.getComputedStyle(e).height, 10),
                            document.body.removeChild(e),
                            10 != t)
                        } catch (e) {}
                    var e, t;
                    return i
                },
                getComputedHeight: function(e) {
                    var t = e.getComputedStyle();
                    return "auto" == t.height ? e.getHeight() : (e = parseInt(t.height, 10) || 0,
                    m.computedHeightBoxSizingBug() && (e += (parseInt(t.paddingTop, 10) || 0) + (parseInt(t.paddingBottom, 10) || 0) + (parseInt(t.borderTopWidth, 10) || 0) + (parseInt(t.borderBottomWidth, 10) || 0)),
                    e + "px")
                },
                hoverFix: function(e) {
                    t.bugs.noBoxSizing && (e.on("mouseover", function() {
                        this.addClass("hover")
                    }),
                    e.on("mouseout", function() {
                        this.removeClass("hover")
                    }))
                },
                getEffectiveTLD: function(e) {
                    for (var t = "zte2095", n = e.split("."), i = "." + n.splice(n.length - 2, 2).join("."); n.length; ) {
                        var o = {
                            domain: i,
                            path: "/"
                        };
                        if (a.set(t, "1", o),
                        "1" == a.get(t)) {
                            a.remove(t, o);
                            break
                        }
                        i = "." + n.pop() + i
                    }
                    return i
                },
                descendsObj: function(e, t) {
                    for (var n, i = t.split("."); i.length; )
                        n = i.shift(),
                        o(e[n], !0) && (e[n] = {}),
                        e = e[n];
                    return e
                },
                insertObj: function(e, t, n) {
                    var i = (e = e.split(".")).pop();
                    if (i) {
                        for (var o = 0, r = e.length; o < r; o++)
                            e[o]in n || (n[e[o]] = {}),
                            n = n[e[o]];
                        n[i] = t
                    }
                },
                isDefaultName: function(e) {
                    return g.test(e)
                },
                getKeys: function(e) {
                    if (e && "object" == typeof e) {
                        var t, n = [];
                        for (t in e)
                            e.hasOwnProperty(t) && n.push(t);
                        return n
                    }
                },
                supportsDataURI: function(t) {
                    if (window.Image)
                        try {
                            var e = new window.Image;
                            e.onload = e.onerror = function() {
                                t(!(1 != this.width || 1 != this.height))
                            }
                            ,
                            e.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                        } catch (e) {
                            t()
                        }
                    else
                        t()
                },
                isIE: t.isIE || /Trident\//.test(window.navigator.userAgent),
                pad: function(e, t) {
                    e = parseInt(e, 10);
                    var n = (e = isNaN(e) ? 0 : e) < 0;
                    e = Math.abs(e).toString().split("");
                    for (var i = Math.max(t - e.length, 0); i--; )
                        e.unshift("0");
                    return n && e.unshift("-"),
                    e.join("")
                },
                formatMinutesAsHours: function(e, t) {
                    function n(e, t, n) {
                        return n.replace("<hours>", e).replace("<minutes>", t)
                    }
                    var i = c("<hours>:<minutes>")
                      , o = c("<hours>:<minutes> am")
                      , r = c("<hours>:<minutes> pm")
                      , t = "24" === t ? 24 : 12
                      , s = (s = Math[0 < e ? "floor" : "ceil"](e / 60),
                    a = t,
                    s - Math[0 < s ? "floor" : "ceil"](s / a) * a)
                      , a = m.pad(Math.abs(e) % 60, 2);
                    return 24 == t ? n(m.pad(s, 2), a, i) : (t = 0 == s ? 12 : s,
                    Math.abs(e / 60) % 24 < 12 ? n(t, a, o) : n(t, a, r))
                },
                replaceFileHostname: function(e) {
                    return e && e.replace(l.FILE_REPLACE_SOURCE, l.FILE_REPLACE_RESULT)
                },
                getLastLogEntries: function(e, t) {
                    if (!(t = parseInt(t, 10)))
                        return e.getValue();
                    var n = (s = e.getKeys()).length
                      , i = {};
                    if (n <= t)
                        return e.getValue() || i;
                    for (var o = 0; o < n; o++)
                        s[o] = parseInt(s[o], 10);
                    var r, s = s.sort().slice(-t), a = e.getValue();
                    if (a)
                        for (o = 0,
                        n = s.length; o < n; o++)
                            i[r = s[o]] = a[r];
                    return i
                },
                writeNode: function(e, t) {
                    var n;
                    e.leaf && e.parentNode ? ((n = {})[e.name] = t,
                    e.parentNode.write(n)) : e.write(t)
                },
                isAgentNick: function(e) {
                    return _.test(e)
                },
                refocusActiveElement: function() {
                    if (t.isNewIE)
                        try {
                            "body" !== document.activeElement.nodeName.toLowerCase() && document.activeElement.focus()
                        } catch (e) {}
                },
                warnBadEmbed: function() {
                    console && console.warn && console.warn("The Zopim widget embed code is invalid. Please email chat@zendesk.com with your account key: " + l.ACCOUNT_KEY)
                }
            },
            g = /^Visitor [0-9]{3,}$/,
            _ = /^agent:[0-9]+/i,
            e(m, "meshim_widget_utils_Utils"),
            m)
        }
        .call(e, w(4), w(7), w(22), w(1))
    }
    , function(e, t, n) {
        !function(s, m, g, _, v) {
            e.exports = function() {
                function t(e, t) {
                    if (isNaN(e))
                        return e;
                    -1 == e && (e = l.length);
                    var n = l[e];
                    if (n || (l[e] = n = new a),
                    "string" == typeof t)
                        n.add("_", t);
                    else
                        for (var i in t)
                            t.hasOwnProperty(i) && n.add(i, t[i]);
                    return n
                }
                function a() {
                    function i(e) {
                        return s[e || u] || s._
                    }
                    function e(r) {
                        return function() {
                            var e, t, n = r, i = arguments, o = new a;
                            for (t in l[s._] = o,
                            s)
                                if (s.hasOwnProperty(t)) {
                                    if ("string" != typeof (e = s[t]))
                                        continue;
                                    e = e[n].apply(e, i),
                                    o.add(t, e)
                                }
                            return o
                        }
                    }
                    for (var s = {}, o = [], t = {
                        add: function(e, t) {
                            s[e] = t
                        },
                        bind: function(e) {
                            c(e, t)
                        },
                        onTranslate: function(e) {
                            o.push(e)
                        },
                        toJSON: function() {
                            return i()
                        },
                        toString: i,
                        update: function(e) {
                            for (var t = i(e), n = 0; n < o.length; n++)
                                o[n](t)
                        }
                    }, n = ["concat", "replace", "toLowerCase", "toUpperCase"], r = 0; r < n.length; r++)
                        t[n[r]] = e(n[r]);
                    return t
                }
                function c(e, t) {
                    for (var n = 0; n < d.length; n++)
                        if (d[n] == e)
                            return void (h[n] = t);
                    d.push(e),
                    h.push(t)
                }
                function n(e) {
                    var t = (e = e.split(/-|_/).slice(0, 2))[0] = e[0].toLowerCase();
                    return e[1] && (e[1] = e[1].toUpperCase()),
                    e = e.join("_"),
                    m.languages ? e in m.languages ? e : t in m.languages ? t : null : null
                }
                function i() {
                    return !(-1 == u.search(e))
                }
                var l = []
                  , u = "_"
                  , d = []
                  , h = []
                  , f = []
                  , p = s.isTextContent
                  , e = /^ar|^fa|^he|^ku|^ur/
                  , o = m.strings;
                if (o)
                    for (var r = 0; r < o.length; r++)
                        t(r, o[r]);
                return t.bind = c,
                t.flip = function(e) {
                    return i() ? e.replace(/left/, "%left%").replace(/right/, "left").replace(/%left%/, "right").replace(/ltr/, "%ltr%").replace(/rtl/, "ltr").replace(/%ltr%/, "rtl") : e
                }
                ,
                t.onLanguage = function(e) {
                    f.push(e)
                }
                ,
                t.unLanguage = function(e) {
                    for (var t = 0, n = f.length; t < n; t++)
                        if (f[t] == e) {
                            f._active ? (f[t] = null,
                            f._dirty = !0) : t == n - 1 ? f.pop() : f[t] = f.pop();
                            break
                        }
                }
                ,
                t.update = function(o) {
                    var r, s, a, c, e;
                    (o = n(o)) && m.languages[o] && (e = g[m.languages[o]]) && (t.language = u = o,
                    _.ensureLoaded(e, function(e) {
                        if (e) {
                            var t = o, n, i = g[m.languages[t]];
                            for (n = 0; n < i.length; n++)
                                0 !== i[n] && l[n].add(t, i[n])
                        }
                        if (o == u) {
                            for (r = 0,
                            s = l.length; r < s; r++)
                                l[r].update instanceof Function && l[r].update(o);
                            for (r = 0,
                            s = d.length; r < s; r++)
                                if (a = d[r],
                                c = h[r].toString(),
                                p)
                                    a.textContent = c;
                                else if ("string" == typeof a.innerText)
                                    a.innerText = c;
                                else if ("string" == typeof a.nodeValue)
                                    try {
                                        a.data = c
                                    } catch (e) {}
                            for (f._active = !0,
                            s = f.length,
                            r = 0; r < s; r++)
                                try {
                                    f[r] && f[r](o)
                                } catch (e) {}
                            if (f._active = !1,
                            f._dirty) {
                                for (r = 0; r < s; r++)
                                    f[r] || (r == s - 1 ? f.pop() : f[r--] = f.pop(),
                                    s--);
                                f._dirty = !1
                            }
                        }
                    }))
                }
                ,
                t.unbind = function(e) {
                    for (var t = 0; t < d.length; t++)
                        if (d[t] == e)
                            return d.splice(t, 1),
                            void h.splice(t, 1)
                }
                ,
                t.rtl = i,
                t.findClosestLanguage = n,
                v(t, "jx_core__"),
                t
            }()
        }
        .call(t, n(4), n(13), n(23), n(24), n(1))
    }
    , function(i, e, t) {
        !function(e, t) {
            var n = {};
            n.Module = e,
            n.$Data = t,
            i.exports = n
        }
        .call(e, t(24), t(13))
    }
    , function(t, e, i) {
        !function(a, o, e) {
            function n() {
                var e = Array.prototype.slice.call(arguments)
                  , t = e.shift();
                this.fqname = t,
                this.name = t.split(".").pop(),
                this.callbacks = [],
                this.dependencies = e,
                l.push(this)
            }
            function c(e) {
                e()
            }
            var r, l, s;
            t.exports = (r = i(25),
            l = [],
            s = /^function *\( *\) *{ *([\s\S]*) *}$/,
            n.ensureLoaded = function(e, t) {
                e instanceof n ? e.ensureLoaded(t) : t()
            }
            ,
            n.prototype.ensureLoaded = function(e) {
                this.ifLoaded(e),
                this.load()
            }
            ,
            n.prototype.ifLoaded = function(e) {
                this.callbacks.push(e)
            }
            ,
            n.prototype.load = function() {
                function e(e) {
                    var t;
                    t = e[0],
                    e = e[1],
                    (t = a[t]).module_function = new Function("$Modules",e.toString().replace(s, "$1")),
                    t.ready()
                }
                for (var t, n = this.getDependencies(), i = 0; i < n.length; i++)
                    (t = n[i]).loader || (t.loader = new r(o.baseURL + "/lib/" + o.build_number + "/" + t.fqname + ".js",a,e))
            }
            ,
            n.prototype.getDependencies = function() {
                for (var e = this.dependencies, t = [this], n = 0; n < e.length; n++)
                    var i = a[e[n]]
                      , t = t.concat(i.getDependencies());
                return t
            }
            ,
            n.prototype.ready = function() {
                if (!this.dependencies.length && this.module_function) {
                    for (e = l.length - 1; 0 <= e; e--)
                        if (l[e] == this) {
                            l.splice(e, 1);
                            break
                        }
                    this.module_function(a);
                    var e, t = a[this.fqname];
                    for (t.ifLoaded = t.ensureLoaded = c,
                    e = 0; e < this.callbacks.length; e++)
                        this.callbacks[e](t);
                    for (var n, i, o, r = this.fqname, s = l.length - 1; 0 <= s; s--) {
                        for (n = (o = (i = l[s]).dependencies).length - 1; 0 <= n; n--)
                            if (o[n] == r) {
                                o.splice(n, 1);
                                break
                            }
                        i.ready()
                    }
                    delete this.callbacks,
                    delete this.fqname,
                    delete this.name,
                    delete this.dependencies,
                    delete this.loader
                }
            }
            ,
            e(n, "jx_core_Module"),
            n)
        }
        .call(e, i(23), i(13), i(1))
    }
    , function(n, e, i) {
        !function(e) {
            function t(e, t, n) {
                var i = this
                  , o = (r.extend(i),
                new s);
                o.setScope(t = t || {}),
                o.on("success", n),
                o.on("error", function(e) {
                    i.onError(e)
                }),
                o.load(e)
            }
            var r, s;
            n.exports = (r = i(3),
            s = i(26),
            t.prototype.onError = function(e) {}
            ,
            e(t, "jx_io_ScriptLoader"),
            t)
        }
        .call(e, i(1))
    }
    , function(i, e, t) {
        !function(s, a, e) {
            function t(e) {
                var t, n, i = s.extend(this);
                try {
                    (t = new window.ActiveXObject("htmlfile")).open(),
                    t.write("<script>document.win = window<\/script>"),
                    t.close(),
                    n = t.win
                } catch (e) {}
                if (!n) {
                    var o = this.iframe = document.createElement("iframe")
                      , r = o.style;
                    i.allowTransparency = "true",
                    i.frameBorder = "0",
                    r.backgroundColor = "transparent",
                    r.position = "absolute",
                    r.width = r.height = "1px",
                    r.left = r.top = "-9999px",
                    r.border = 0,
                    document.body.appendChild(o);
                    try {
                        (t = (n = o.contentWindow).document).open(),
                        t.close()
                    } catch (e) {
                        return i.fire("error"),
                        void i.destroy()
                    }
                }
                i.doc = t,
                i.win = n,
                i.$Loader = {
                    cleanup: function() {
                        a(function() {
                            i.$Loader.payload ? i.fire("success", i.$Loader.payload) : i.fire("error"),
                            i.$Loader.payload = null,
                            e || i.destroy()
                        })
                    }
                },
                i.reusable = e
            }
            var n;
            i.exports = (t.prototype.setScope = function(e) {
                this.scope = e
            }
            ,
            n = /[&<>"']/g,
            t.prototype.load = function(e) {
                var t;
                if (/^(?:https?:)?\/\//i.test(e)) {
                    e = (t = e) && t.replace(n, function(e) {
                        return "&#" + e.charCodeAt(0) + ";"
                    });
                    try {
                        this.doc.open(),
                        this.win.$Loader = this.$Loader,
                        this.win.$Loader.scope = this.scope || {},
                        this.doc.write('<html><head><script src="' + e + '"><\/script></head><body onload="try { $Loader.cleanup() } catch(e) {}"></body></html>'),
                        this.doc.close()
                    } catch (e) {
                        this.$Loader.cleanup()
                    }
                } else
                    this.$Loader.cleanup()
            }
            ,
            t.prototype.destroy = function() {
                try {
                    this.iframe && document.body.removeChild(this.iframe),
                    this.doc = this.win = this.iframe = this.win.$Loader = null
                } catch (e) {}
            }
            ,
            e(t, "jx_io_DataIFrame"),
            t)
        }
        .call(e, t(3), t(27), t(1))
    }
    , function(n, e, t) {
        !function(o, r, e) {
            function t(e, t, n) {
                if (o.ok("function" == typeof e, "1st argument to nextTick must be a function"),
                n)
                    for (var i = l.length; 0 < i--; )
                        if (l[i][0] === e && l[i][1] === t)
                            return;
                l.push([e, t]),
                a = a || setTimeout(s, 0)
            }
            function s() {
                var e = +new Date + c
                  , t = l;
                l = [],
                a = a && clearTimeout(a);
                for (var n = 0, i = t.length; n < i; n++) {
                    try {
                        t[n][0].apply(t[n][1])
                    } catch (e) {
                        r.fire("error", e)
                    }
                    if (+new Date > e) {
                        n < i - 1 && (t.splice(0, n + 1),
                        l.length ? l = t.concat(l) : (l = t,
                        a = setTimeout(s, 0)));
                        break
                    }
                }
            }
            var a, c, l;
            n.exports = (c = 100,
            l = [],
            t.tick = s,
            e(t, "jx_core_globals_nextTick"),
            t)
        }
        .call(e, t(5), t(3), t(1))
    }
    , function(p, e, m) {
        !function(n, i, o, e) {
            function t(e) {
                e.bindValue(r)
            }
            function r(e) {
                "registered" == e || "reattached" == e || "cookie_law" == e ? (c = !0,
                a.flush()) : c = !1
            }
            function s() {
                if (c && this.queue.length) {
                    if (!d.root.$("livechat").$("ui").$("mockup$bool").getValue()) {
                        n(a.send) && a.send({
                            __type: "instrumentation",
                            metrics: this.queue
                        });
                        for (var e = f.length; e--; ) {
                            var t = f[e];
                            h.post(t.msg, t.data)
                        }
                    }
                    f = [],
                    this.queue = []
                }
            }
            var a, c, l, u, d, h, f;
            p.exports = (l = m(29),
            u = m(30),
            d = m(32),
            h = m(50),
            f = [],
            (a = new l).setTags(function() {
                var e, t, n = [];
                n.push("browser:" + i.browser),
                t = u.isMobileBrowser ? (e = u.isMobileTablet ? "tablet" : "mobile",
                u.isAndroid ? "android" : u.isIOS ? "ios" : u.isWP ? "wp" : "other") : (e = "desktop",
                i.isWindows ? "win" : i.isMac ? "mac" : "other");
                return n.push("device:" + e),
                n.push("platform:" + t),
                n.push("rev:" + o.git_commit),
                n
            }()),
            a.bindToConnectionStatus = t,
            a.flush = s,
            e(a, "meshim_widget_controllers_InstrumentationController"),
            a)
        }
        .call(e, m(6), m(4), m(13), m(1))
    }
    , function(d, e, t) {
        !function(o, r, s, e) {
            function a() {
                i = clearInterval(i),
                c = !1;
                for (var e = l.length; e--; ) {
                    for (var t = l[e], n = t.queue.length; n--; )
                        "histogram" === t.queue[n].method && t.queue.splice(n, 1);
                    t.start_ts = {}
                }
            }
            function t() {
                this.ref_ts = null,
                this.from_ref_ts = {},
                this.start_ts = {},
                this.tags = [],
                this.queue = [],
                l.push(this)
            }
            var c, n, i, l, u;
            d.exports = (c = !0,
            n = +new Date,
            i = setInterval(function() {
                var e = +new Date
                  , t = e - n;
                3e3 < Math.abs(t - 15e3) && a(),
                n = e
            }, 15e3),
            l = [],
            (u = t.prototype).flush = function() {}
            ,
            u.setTags = function(e) {
                o(e) && (this.tags = e.concat())
            }
            ,
            u.addTag = function(e) {
                r(e) && e && this.tags.push(e)
            }
            ,
            u.setRefTime = function(e) {
                !s(this.ref_ts) && s(e) && (this.ref_ts = e)
            }
            ,
            u.fromRefTime = function(e, t, n) {
                var i;
                c && s(this.ref_ts) && r(e) && e && (this.from_ref_ts[e] || (this.from_ref_ts[e] = !0,
                (i = +new Date) < this.ref_ts ? a() : this._queueHistogram(e, (i - this.ref_ts) / 1e3, t, n)))
            }
            ,
            u.start = function(e, t) {
                c && r(e) && e && !(e in this.start_ts) && (this.start_ts[e] = s(t) ? t : +new Date)
            }
            ,
            u.end = function(e, t, n) {
                var i;
                c && r(e) && e && e in this.start_ts && ((i = +new Date) < this.start_ts[e] ? a() : (this._queueHistogram(e, (i - this.start_ts[e]) / 1e3, t, n),
                delete this.start_ts[e]))
            }
            ,
            u.restart = function(e, t) {
                delete this.start_ts[e],
                this.start(e, t)
            }
            ,
            u.timing = function(e, t, n) {
                this._queue({
                    method: "timing",
                    name: e,
                    value: t,
                    tags: this.tags.concat(n || [])
                })
            }
            ,
            u.increment = function(e, t) {
                this._queue({
                    method: "increment",
                    name: e,
                    value: 1,
                    tags: this.tags.concat(t || [])
                })
            }
            ,
            u._queueHistogram = function(e, t, n, i) {
                o(n) && (i = n,
                n = void 0);
                e = {
                    method: "histogram",
                    name: e,
                    value: t,
                    tags: this.tags.concat(i || [])
                };
                s(n) && (e.sample_rate = n),
                this._queue(e)
            }
            ,
            u._queue = function(e) {
                this.queue.push(e),
                this.flush()
            }
            ,
            e(t, "meshim_common_Instrumentation"),
            t)
        }
        .call(e, t(19), t(9), t(8), t(1))
    }
    , function(_, e, v) {
        !function(o, r, e) {
            function t() {
                return window.document.documentElement.clientWidth > window.document.documentElement.clientHeight
            }
            function s() {
                return f && /(iemobile|windows phone)/i.test(d)
            }
            function a() {
                return f && i.test(h) && !c.test(d)
            }
            var n, i, c, l, u, d, h, f, p, m, g;
            _.exports = (n = v(31),
            i = /google inc\./i,
            c = /chrome/i,
            l = /apple computer, inc\./i,
            u = /crios/i,
            d = window.navigator.userAgent || "",
            h = window.navigator.vendor || "",
            f = n(),
            p = {
                isMobileBrowser: f,
                isMobileWhitelist: function() {
                    for (var e, t = [/(android [2-9])|(iemobile\/(?![5-9]))|(ucbrowser)|(Webkit.+Chrome)|(ipod|iphone|ipad).+applewebkit.+(CriOS|Version\/[5-9]|Mobile)/i], n = 0, i = t.length; n < i; n++)
                        if (t[n].test(d)) {
                            e = !0;
                            break
                        }
                    return e = /android.+ucbrowser/i.test(d) ? !1 : e
                }(),
                isMobileTablet: (n = window.document.documentElement.clientWidth,
                t() ? m < n : g < n),
                isAndroid: f && i.test(h),
                isIOS: f && l.test(h),
                isWP: s(),
                isIEMobile: s(),
                isChromeIOSMobile: f && l.test(h) && u.test(d),
                isSafariIOSMobile: f && l.test(h) && !u.test(d),
                isChromeAndroidMobile: f && i.test(h) && c.test(d),
                isOperaAndroidMobile: f && /(opera|opr).*android|android.*(opera|opr)/i.test(d),
                isNativeAndroidMobile: a(),
                isUCBrowserMobile: f && /ucbrowser/i.test(d),
                hideVirtualKeyboard: function(e) {},
                checkLandscape: t,
                getZoomLevel: function() {
                    var e = window.document.documentElement.clientWidth
                      , t = window.document.documentElement.clientHeight
                      , n = window.screen.width
                      , i = window.screen.height
                      , t = (1.45 < e / t && n < i && (n = window.screen.height,
                    window.screen.width),
                    window.innerWidth)
                      , i = e / n;
                    return window.devicePixelRatio && a() && !o.isIOS ? i *= window.devicePixelRatio : s() && (i *= 1.5),
                    (e / t / i / p.MOBILE_ZOOM_ADDITIONAL).toFixed(2)
                },
                getOffset: function() {
                    var e = window
                      , t = e.document.documentElement
                      , n = e.document.body
                      , i = null
                      , o = {
                        top: 0,
                        left: 0
                    };
                    return r(t.getBoundingClientRect) && (r(e.getComputedStyle) ? "relative" == e.getComputedStyle(n).position ? i = n : "relative" == e.getComputedStyle(t).position && (i = t) : n.currentStyle ? "relative" == n.currentStyle.position ? i = n : "relative" == t.currentStyle.position && (i = t) : "relative" == n.style.position ? i = n : "relative" == t.style.position && (i = t)),
                    i && (n = i.getBoundingClientRect(),
                    o.top = n.top + e.pageYOffset - t.clientTop,
                    o.left = n.left + e.pageXOffset - t.clientLeft),
                    o
                },
                MOBILE_ZOOM_ADDITIONAL: 1.2
            },
            m = 640,
            g = 320,
            e(p, "meshim_widget_utils_Mobile"),
            p)
        }
        .call(e, v(4), v(6), v(1))
    }
    , function(n, e, t) {
        !function(e) {
            function t() {
                var e = window.navigator.userAgent || ""
                  , t = window.navigator.vendor || ""
                  , e = e || t || window.opera;
                return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
            }
            n.exports = (e(t, "meshim_widget_utils_isMobileBrowser"),
            t)
        }
        .call(e, t(1))
    }
    , function(C, e, O) {
        !function(a, e, c, l, t, n, i) {
            function u() {
                var e = d.$("livechat").$("account").$("status$string").getValue();
                return -1 < n(e, r)
            }
            var d, h, f, p, m, g, _, o, v, w, r, b, y, $, E, k, s, S, x, A;
            C.exports = (p = O(11),
            m = O(12),
            g = O(45),
            _ = O(15),
            o = O(46),
            v = O(21),
            w = O(30),
            r = ["banned", "invalid_account_key"],
            b = {
                last_host: "connection.server$string",
                chatting: "livechat.channel.chatting$bool",
                account_status: "livechat.account.status$string",
                settings: "livechat.settings",
                ui: "livechat.ui",
                notification: "livechat.profile.notification",
                departments: "livechat.departments",
                log: "livechat.channel.log",
                read: "livechat.channel.read",
                features: "livechat.features"
            },
            $ = 0,
            E = !(y = ["livechat.settings.cached$bool", "livechat.ui.chat_window.menu_stack_name$string", "livechat.ui.chat_window.pre_chat_form.submitted$bool", "livechat.ui.post_chat_form.stack_index$int", "livechat.ui.offline_form.stack_index$int", "livechat.ui.theme_reload$bool", "livechat.ui.theme_loaded$bool", "livechat.ui.popout$bool", "livechat.ui.mobile$bool", "livechat.ui.mobile_overlay$bool", "livechat.ui.mobile_notifications$bool", "livechat.ui.chat_window.chat_panel.file_toast.error$string", "livechat.ui.departments.filter_enabled$bool"]),
            k = {
                sendChatMsg: function(e, t) {
                    o.sendChatMsg(e, t)
                },
                sendFile: function(e) {
                    var t = parseInt(f.getServerTime().toFixed(0), 10)
                      , n = t + "";
                    return d.$("livechat").$("channel").$("log").$(n).write({
                        timestamp$int: t,
                        nick$string: d.$("livechat").$("profile").$("nick$string").getValue() || "",
                        display_name$string: d.$("livechat").$("profile").$("display_name$string").getValue() || "",
                        type$string: "chat.file.upload",
                        file_name$string: e.file_name || "",
                        file_type$string: e.file_type || "",
                        file_size$int: e.file_size || 0,
                        unverified$bool: !0,
                        __client$bool: !0
                    }),
                    t
                },
                updateProfile: function(e) {
                    var t;
                    if (e)
                        return t = {},
                        "name"in e && (t.display_name$string = e.name + ""),
                        "email"in e && (t.email$string = e.email + ""),
                        "phone"in e && (t.phone$string = e.phone + ""),
                        "department_id"in e && (t.department_id$int = e.department_id),
                        d.$$("livechat.profile").write(t),
                        !0
                },
                clearAll: function() {
                    _.clearAll(),
                    d.$("livechat").$("ui").$("chat_button").$("unread_count$int").update(0),
                    d.$$("livechat.channel").update(null),
                    d.$$("profile").update(null)
                },
                reconnect: function() {
                    d.$$("connection").update({
                        reconnect$bool: !0
                    })
                },
                canStoreCookie: function() {
                    var e = d.$$("livechat.settings.cookie_law.enabled$bool").getValue()
                      , t = d.$$("livechat.profile.allow_cookies$bool").getValue();
                    return !e || !1 !== t
                },
                doExternalLogin: function(e) {
                    var t, n;
                    h || (t = d.$$("livechat.account.key$string").getValue(),
                    n = d.$$("livechat.profile.mid$string").getValue(),
                    e && t && n && window.open(m.AUTH_URL.replace("$NAME", e).replace("$KEY", t).replace("$MID", n), s + t, d.$$("livechat.ui.mobile$bool").getValue() ? "" : S))
                },
                doExternalLogout: function() {
                    d.$$("livechat.profile.auth.type$string").getValue() ? (d.$$("livechat.profile.auth").write({
                        type$string: null
                    }),
                    d.$$("livechat.profile").update({
                        display_name$string: "",
                        email$string: ""
                    })) : d.$$("livechat.profile").write({
                        display_name$string: "",
                        email$string: ""
                    })
                },
                endChat: function() {
                    d.$$("livechat.channel").write({
                        chatting$bool: !1
                    })
                },
                getLimit: function() {
                    return d.$$("livechat.ui.mockup$bool").getValue() ? 100 : $
                },
                isAccountError: u
            },
            s = "zlivechatexternallogin_",
            S = "width=500,height=500,menubar=no,toolbar=no,location=no,personalbar=no,status=no,resizable=yes,scrollbars=no",
            x = l.extend({
                init: function(e, t, n) {
                    if (E = !0,
                    x.root = d = e instanceof p ? e : new p("root"),
                    f = n,
                    m.ACCOUNT_KEY || t) {
                        t && (h = t,
                        d.$$("livechat.ui.mockup$bool").update(!0)),
                        w.isMobileBrowser && (d.$$("livechat.ui.mobile$bool").update(!0),
                        w.isMobileWhitelist && d.$$("livechat.ui.mobile_whitelist$bool").update(!0),
                        w.isMobileTablet) && d.$$("livechat.ui.tablet$bool").update(!0),
                        window.$zopim_popout ? d.$$("livechat.ui.popout$bool").update(!0) : t || a.setIFrameOnly(!0);
                        var i, o, r = function e(t) {
                            if ("object" != typeof t || !t)
                                return t;
                            var n = {};
                            for (var i in t)
                                t.hasOwnProperty(i) && (n[i] = e(t[i]));
                            t.hasOwnProperty(A) && (n[A] = e(t[A]));
                            return n
                        }(g);
                        if (!h)
                            for (var s in b)
                                b.hasOwnProperty(s) && (o = _.DOM.getVariable(s),
                                "log" == s && o && "object" == typeof o && d.$("livechat").$("temp").update({
                                    prev_log: o
                                }),
                                "settings" == s && o && v.getKeys(o).length && d.$("livechat").$("settings").update({
                                    cached$bool: !0
                                }),
                                "object" == typeof o ? (i = v.getKeys(o)) && i.length && v.fullyExtend(v.descendsObj(r, b[s]), o) : v.insertObj(b[s], o, r));
                        d.update(r),
                        h || u() || (e = c.isIOS ? "unload" : "beforeunload",
                        l.window.on(e, function() {
                            try {
                                if (k.canStoreCookie()) {
                                    var e = new p("root");
                                    e.update(d.getValue());
                                    for (var t, n, i = 0, o = y.length; i < o; i++)
                                        e.$$(y[i]).update(null);
                                    for (t in b)
                                        if (b.hasOwnProperty(t)) {
                                            switch (t) {
                                            case "settings":
                                                n = f.getServerSettings("settings");
                                                break;
                                            case "log":
                                                n = e.$("livechat").$("channel").$("chatting$bool").getValue() ? v.getLastLogEntries(d.$$(b[t]), m.CHAT_LOG_REMEMBER_COUNT) : null;
                                                break;
                                            default:
                                                n = e.$$(b[t]).getValue()
                                            }
                                            _.DOM.saveVariable(t, n)
                                        }
                                    e = null
                                }
                            } catch (e) {}
                        }));
                        n = _.getAllowCookieLaw();
                        "boolean" == typeof n && d.$$("livechat.profile").update({
                            allow_cookies$bool: n
                        }),
                        d.$$("livechat.settings.package").on("value", function(e) {
                            e && ("color_customization_enabled$int"in e && e.color_customization_enabled$int && ($ = 1),
                            "widget_customization_enabled$int"in e) && e.widget_customization_enabled$int && ($ = 2)
                        }),
                        x.fire("init")
                    }
                },
                root: d,
                livechat: k,
                afterInit: function(e) {
                    t(e) && (E ? e() : x.on("init", e))
                }
            }),
            A = "toString",
            i(x, "meshim_widget_controllers_DataController"),
            x)
        }
        .call(e, O(33), O(44), O(4), O(3), O(6), O(41), O(1))
    }
    , function(d, e, t) {
        !function(e, t, n, i, o, r, s, a, c) {
            var l, u;
            d.exports = (l = e.REGEX,
            u = {},
            t.extend(u),
            u.generateAll = n.generateAll,
            u.generate = n.generate,
            u.writeChanges = n.writeChanges,
            u.setPalette = i.setPalette,
            u.delPalette = i.delPalette,
            u.delPalettes = i.delPalettes,
            u.appendPalette = i.appendPalette,
            u.getPalette = i.getPalette,
            i.initDefaultPalette(),
            u.setIFrameOnly = o.setIFrameOnly,
            u.bindIFrame = o.bindIFrame,
            u.unbindIFrame = o.unbindIFrame,
            u.transform2CSS = r,
            u.getVariable = function(e) {
                for (var t = s.palettes, n = s.priorities, i = n.length - 1; 0 <= i; i--)
                    if (n[i] && t[n[i]] && (t[n[i]][e] || a(t[n[i]][e])))
                        return l.isVariable.test(t[n[i]][e]) ? u.getVariable(t[n[i]][e].toString().slice(2)) : t[n[i]][e]
            }
            ,
            u.reload = function() {
                u.writeChanges(!0)
            }
            ,
            c(u, "jx_core_JCSS"),
            u)
        }
        .call(e, t(34), t(3), t(35), t(43), t(36), t(42), t(37), t(8), t(1))
    }
    , function(t, e, n) {
        !function(e) {
            t.exports = (e(e = {
                REGEX: {
                    space: / /g,
                    repeatingLinearGradient: /^\s*repeating-linear-gradient/,
                    prependFQName: /^(\*\*self|)(?!.+?keyframes)/,
                    prePrependFQName: /^(?!\*\*self)/g,
                    replacePseudo: /\:\:\:([A-Za-z_\-.]+)/g,
                    replaceAppend: / +?&/g,
                    placeholder: /::placeholder$/,
                    replaceVariables: /(?:(?:([A-Za-z\-]+):)??(?:& *:)?\$\$([A-Za-z_\.]+))(?=;)/g,
                    replaceLeftovers: /(?:(?:[A-Za-z\-]+:)??(?:& *:)?(\$\$[A-Za-z_\.]*?)??)(?=;)/g,
                    replaceMedia: /(.*)(@media.*)@mediaend(.*)/,
                    commaStart: /^,/,
                    selectorCase: /([A-Z]+)/g,
                    removePrefix: /^\$\$/,
                    isVariable: /\$\$[A-Za-z_]+/
                },
                join: function(e) {
                    return e.join("")
                }
            }, "jx_core_jcss_modules_JCSSUtils"),
            e)
        }
        .call(e, n(1))
    }
    , function(n, e, t) {
        !function(e, l, i, u, d, h, f, o, p, s, t) {
            function r(e, t, n, i, o, r) {
                n && (e || o) && (t = t ? "." + t.trim().replace(_.space, ".") : "",
                n = n || {},
                i = "_" + (i || ""),
                n = function e(t) {
                    var n = t.prototype.__jx__fqname;
                    if (u.cached_fqname[n])
                        return u.cached_fqname[n];
                    u.cached_fqname[n] = {};
                    var i = []
                      , o = t.__jx__jcss || {}
                      , o = s(o, "", "**self", !0).join("\n");
                    t && t.prototype.__jx__super && i.push(e(t.prototype.__jx__super));
                    i.push(o);
                    u.cached_fqname[n] = i.join("\n");
                    return u.cached_fqname[n]
                }(o = o || e.__jx__constructor).replace(/\*\*self/g, t),
                u.cache[i] = u.cache[i] || [],
                w[i] = w[i] || [],
                u.cache[i].push(n),
                w[i].push(n),
                b[i] = !!r,
                g = g || d.schedule(a, this))
            }
            function a(e) {
                g = g && d.clearSchedule(g);
                var t, n, i, o, r = e ? u.cache : w, s = {};
                for (i in v = {},
                u.palettes)
                    if (u.palettes.hasOwnProperty(i))
                        for (n in o = p(i, u.priorities),
                        u.palettes[i])
                            u.palettes[i].hasOwnProperty(n) && (isNaN(s[n]) || o > s[n]) && (u.palettes[i][n] || f(u.palettes[i][n])) && (v[n] = u.palettes[i][n],
                            s[n] = o);
                for (t in r)
                    if (r.hasOwnProperty(t)) {
                        if (!r[t])
                            continue;
                        var a = r[t].join("\n").replace(_.replaceVariables, m);
                        l.getIFrameOnly() || h.setStyleSheet(document, "jcss" + t, a, e || b[t]);
                        for (var c = 0; c < y.length; c++)
                            h.setStyleSheet(y[c].idoc, "jcss" + t, a, e || b[t]);
                        u.cache_replaced[t] = e ? a : (u.cache_replaced[t] || "") + a,
                        b[t] = !1
                    }
                w = {},
                this.fire("write", a)
            }
            function m(e, t, n) {
                for (; v[n] || f(v[n]); )
                    n = v[n].toString().replace(_.removePrefix, "");
                return t ? o.toStyle(t, n) : n || ""
            }
            var g, _, v, w, b, y;
            n.exports = (_ = e.REGEX,
            e = {
                generateAll: function(e) {
                    var t, n;
                    for (n in i)
                        i.hasOwnProperty(n) && (t = i[n]) && t.prototype && t.__jx__jcss && !t.__jx__jcss_generated && (r.call(this, null, t.prototype.__jx__fqname, t.__jx__jcss, null, t),
                        t.__jx__jcss_generated = !0);
                    e || a.call(this)
                },
                generate: r,
                writeChanges: a
            },
            v = {},
            w = {},
            b = {},
            y = l.getIFrames(),
            t(e, "jx_core_jcss_modules_JCSSGenerator"),
            e)
        }
        .call(e, t(34), t(36), t(23), t(37), t(39), t(38), t(8), t(40), t(41), t(42), t(1))
    }
    , function(i, e, t) {
        !function(o, r, t, e) {
            var n, s;
            i.exports = (s = [],
            e(e = {
                bindIFrame: function(e) {
                    for (var t, n = 0, i = s.length; n < i; n++)
                        if (e === s[n])
                            return;
                    for (t in s.push(e),
                    o.cache)
                        o.cache.hasOwnProperty(t) && r.setStyleSheet(e.idoc, "jcss" + t, o.cache_replaced[t])
                },
                unbindIFrame: function(e) {
                    for (var t = 0, n = s.length; t < n; t++)
                        e === s[t] && s.splice(t, 1)
                },
                setIFrameOnly: function(e) {
                    n = t(e)
                },
                getIFrameOnly: function() {
                    return n
                },
                getIFrames: function() {
                    return s
                }
            }, "jx_core_jcss_modules_JCSSIFrame"),
            e)
        }
        .call(e, t(37), t(38), t(16), t(1))
    }
    , function(t, e, n) {
        !function(e) {
            t.exports = (e(e = {
                cached_fqname: {},
                cache: {},
                cache_replaced: {},
                palettes: {},
                priorities: []
            }, "jx_core_jcss_modules_JCSSStore"),
            e)
        }
        .call(e, n(1))
    }
    , function(i, e, t) {
        !function(e, t) {
            var n, r;
            i.exports = (n = {
                setStyleSheet: function(e, t, n, i) {
                    var o = function(e, t) {
                        if (t) {
                            e = e || document;
                            for (var n = 0, i = e.styleSheets.length; n < i; n++)
                                if ((e.styleSheets[n].ownerNode && e.styleSheets[n].ownerNode.getAttribute("__jx__stylesheet_id") || e.styleSheets[n].owningElement && e.styleSheets[n].owningElement.getAttribute("__jx__stylesheet_id")) == t)
                                    return e.styleSheets[n].ownerNode && e.styleSheets[n].ownerNode || e.styleSheets[n].owningElement && e.styleSheets[n].owningElement
                        }
                    }(e = e || document, t);
                    o ? i ? o.styleSheet ? o.styleSheet.cssText = n : o[r ? "textContent" : "innerText"] = n : o.styleSheet ? o.styleSheet.cssText = [o.styleSheet.cssText, n].join("") : (i = document.createTextNode(n),
                    o.appendChild(i)) : (o = e.createElement("style"),
                    e.getElementsByTagName("head")[0].appendChild(o),
                    o.type = "text/css",
                    t && o.setAttribute("__jx__stylesheet_id", t),
                    void 0 !== o.styleSheet ? o.styleSheet ? o.styleSheet.cssText = n : (e.getElementsByTagName("head")[0].removeChild(o),
                    o = null) : o[r ? "textContent" : "innerText"] = n)
                }
            },
            r = e.isTextContent,
            t(n, "jx_core_jcss_modules_JCSSStyleSheet"),
            n)
        }
        .call(e, t(4), t(1))
    }
    , function(f, e, t) {
        !function(e) {
            function t() {
                d = -d,
                r.data = d
            }
            function n() {
                setTimeout(i, 0)
            }
            function i() {
                for (var e = 0; e < l.length; e++) {
                    var t = l[e]
                      , n = t.cb
                      , t = t.self;
                    n.call(t)
                }
                c = !(l = [])
            }
            function o() {}
            var r, s, a, c, l, u, d, h;
            f.exports = (c = !(a = {
                schedule: function(e, t) {
                    var n;
                    if ("function" == typeof e)
                        return n = h++,
                        l.push({
                            cb: e,
                            self: t,
                            id: n
                        }),
                        c || (s(),
                        c = !0),
                        n
                },
                clearSchedule: function(e) {
                    for (var t = l.length - 1; 0 <= t; t--)
                        l[t].id === e && (l[t].cb = o)
                }
            }),
            l = [],
            u = window.MutationObserver || window.WebKitMutationObserver,
            h = d = 1,
            s = u ? (u = new u(i),
            r = document.createTextNode(""),
            u.observe(r, {
                characterData: !0
            }),
            t) : n,
            e(a, "jx_core_jcss_modules_JCSSAsap"),
            a)
        }
        .call(e, t(1))
    }
    , function(o, e, t) {
        !function(e, l, t) {
            function u() {
                u = function() {}
                ;
                for (var i = ["Moz", "webkit", "ms"], o = document.createElement("div").style, e = r.length; e--; ) {
                    var t = r[e];
                    g[t] = function(e) {
                        if (!(e in o))
                            for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = i.length; n--; )
                                if (i[n] + t in o)
                                    return "-" + i[n].toLowerCase() + "-" + d(e);
                        return e
                    }(t)
                }
            }
            function d(e) {
                return e.replace(m.selectorCase, "-$1").replace(m.commaStart, "").toLowerCase()
            }
            function h(e, t, n) {
                return e + ":" + t + (n ? "!important;" : ";")
            }
            function f(e) {
                return "string" != typeof e ? "" : "rgb" == (e = "#" == e.charAt(0) ? e.substring(1) : e).slice(0, 3) ? p(e) : "#" + (e = 3 == e.length ? e.charAt(0) + e.charAt(0) + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2) : e)
            }
            function p(e, t) {
                return 3 == (e = (e = e.slice(5, -1)).split(",")).length || t ? "#" + n(e[0]) + n(e[1]) + n(e[2]) : (e[3] = (255 * parseFloat(e[3], 10)).toFixed(),
                "#" + n(e[3]) + n(e[0]) + n(e[1]) + n(e[2]))
            }
            function n(e) {
                return e = 1 == (e = parseInt(e, 10).toString(16)).length ? "0" + e : e
            }
            var m, i, r, g, _;
            o.exports = (m = e.REGEX,
            i = {
                toStyle: function(e, t) {
                    var n;
                    if (u(),
                    m.isVariable.test(t += ""))
                        return e + ":" + t + ";";
                    switch ("!important" === t.substr(-10) && (n = !0,
                    t = t.substr(0, t.length - 10).trim()),
                    !0) {
                    case "background" === e:
                        var i, o, r, s = t, a = n, c = [];
                        switch ((i = s.split(" "))[0]) {
                        case "linear-gradient":
                            i.splice(0, 1),
                            s = i.join(" "),
                            c.push(h("background", "-webkit-linear-gradient" + s, a), h("background", "-o-linear-gradient" + s, a), h("background", "-moz-linear-gradient" + s, a), h("background", "-ms-linear-gradient" + s, a), h("background", "-linear-gradient" + s, a));
                            break;
                        case "gradient":
                            c.push(h("background", function(t, n) {
                                function e(e) {
                                    return (16 * Math.round((parseInt(t.substring(e, e + 2), 16) + parseInt(n.substring(e, e + 2), 16)) / 32)).toString(16)
                                }
                                "rgb" == t.slice(0, 3) && (t = p(t, !0)),
                                "rgb" == n.slice(0, 3) && (n = p(n, !0)),
                                t = f(t).substring(1),
                                n = f(n).substring(1);
                                var i = e(0)
                                  , o = e(2)
                                  , r = e(4);
                                return "#" + i + o + r
                            }(i[2], i[3]), a)),
                            "top" == i[1] && (o = "bottom"),
                            "left" == i[1] && (o = "right"),
                            "right" == i[1] && (o = "left"),
                            "bottom" == i[1] && (o = "top"),
                            r = _(["(", i[1], ",", i[2], ",", i[3], ")"]),
                            c.push(h("background", "-o-linear-gradient" + r, a), h("background", "-moz-linear-gradient" + r, a), h("background", "-ms-linear-gradient" + r, a), h("background", "linear-gradient" + r, a)),
                            r = "left" == i[1] || "right" == i[1] ? (c.push(h("background", _(["-webkit-gradient(linear,", i[1], " center,", o, " center,", "from(", i[2], "),to(", i[3], "))"]))),
                            _(["progid:DXImageTransform.Microsoft.gradient(startColorstr=", f(i[2]), ", endColorstr=", f(i[3]), ", GradientType=1)"])) : (c.push(h("background", _(["-webkit-gradient(linear,", "center ", i[1], ",", "center ", o, ",", "from(", i[2], "),to(", i[3], "))"]))),
                            _(["progid:DXImageTransform.Microsoft.gradient(startColorstr=", f(i[2]), ", endColorstr=", f(i[3]), ")"])),
                            c.push(h("filter", r, a), h("-ms-filter", r, a));
                            break;
                        default:
                            c.push(h("background", s, a))
                        }
                        return c.join("");
                    case "display" === e:
                        return l.bugs.noBoxSizing && "inline-block" == t ? "" + h("display", "inline", n) + h("zoom", "1", n) : h("display", t, n);
                    case e in g:
                        return h(g[e], t, n);
                    default:
                        return h(d(e), t, n)
                    }
                }
            },
            r = ["animation", "userSelect", "appearance", "transform", "transformOrigin"],
            g = {},
            _ = e.join,
            t(i, "jx_core_jcss_modules_JCSSConverter"),
            i)
        }
        .call(e, t(34), t(4), t(1))
    }
    , function(n, e, t) {
        !function(e) {
            function t(e, t, n) {
                return i.call(t, e, n)
            }
            var i;
            n.exports = ("function" == typeof (i = Array.prototype.indexOf) && /\[native code\]/.test(i.toString()) || (i = function(e) {
                "use strict";
                if (null == this)
                    throw new TypeError;
                var t = Object(this)
                  , n = t.length >>> 0;
                if (0 != n) {
                    var i = 0;
                    if (0 < arguments.length && ((i = Number(arguments[1])) != i ? i = 0 : 0 != i && i != 1 / 0 && i != -1 / 0 && (i = (0 < i || -1) * Math.floor(Math.abs(i)))),
                    !(n <= i))
                        for (var o = 0 <= i ? i : Math.max(n - Math.abs(i), 0); o < n; o++)
                            if (o in t && t[o] === e)
                                return o
                }
                return -1
            }
            ),
            e(t, "jx_core_globals_indexOf"),
            t)
        }
        .call(e, t(1))
    }
    , function(n, e, t) {
        !function(e, p, m, g, t) {
            function _(e, t, n, i, o) {
                var r, s, a, c, l, u, d = [], h = [];
                for (r in e)
                    if (e.hasOwnProperty(r)) {
                        if (s = e[r],
                        a = void 0,
                        "@keyframes" == r) {
                            for (var f in s)
                                s.hasOwnProperty(f) && (u = f + " { " + _(s[f]).join(" ") + " } ",
                                h.push("@-webkit-keyframes " + u, "@-moz-keyframes " + u, "@-ms-keyframes " + u, "@-o-keyframes " + u, "@keyframes " + u));
                            continue
                        }
                        switch ("@media" == r.slice(0, 6) && (r = [r, "@mediaend"].join("")),
                        typeof s) {
                        case "boolean":
                        case "number":
                        case "string":
                            for (c = 0,
                            l = (a = r.split(",")).length; c < l; c++)
                                d.push(p.toStyle(a[c], s));
                            break;
                        default:
                            if (m(s))
                                for (c = 0,
                                l = s.length; c < l; c++)
                                    d.push(p.toStyle(r, s[c]));
                            else {
                                if (v.placeholder.test(r))
                                    for (u = r.replace(v.placeholder, ""),
                                    a = [],
                                    c = 0,
                                    l = w.placeholder.length; c < l; c++)
                                        a.push(b([u, w.placeholder[c]]));
                                for (c = 0,
                                l = (a = m(a) ? a : r.split(",")).length; c < l; c++)
                                    h = h.concat(_(s, a[c].trim()))
                            }
                        }
                    }
                if (d.length && (o || (d.unshift("{"),
                d.push("}")),
                h.push(d.join(""))),
                t || n || i && !(g.isIE < 9))
                    for (c = 0,
                    l = h.length; c < l; c++)
                        t && (h[c] = [t.replace(v.replacePseudo, ".$1"), " ", h[c]].join("")),
                        n && (h[c] = h[c].replace(v.prePrependFQName, " ").replace(v.prependFQName, n)),
                        i && (h[c] = h[c].replace(v.replaceAppend, "")),
                        i && -1 !== h[c].indexOf("@media") && (h[c] = h[c].replace(v.replaceMedia, "$2 { $1 $3 }"));
                return h
            }
            var v, w, b;
            n.exports = (v = e.REGEX,
            w = {
                placeholder: ["::-webkit-input-placeholder", ":-moz-placeholder", "::-moz-placeholder", ":-ms-input-placeholder", ".placeholder"]
            },
            b = e.join,
            t(_, "jx_core_jcss_modules_transform2CSS"),
            _)
        }
        .call(e, t(34), t(40), t(19), t(4), t(1))
    }
    , function(c, e, t) {
        !function(i, o, n, e) {
            function t(e, t, n) {
                e = function e(t, n, i) {
                    if (t) {
                        for (var o in n = n || {},
                        i ? i += "." : i = "",
                        t)
                            t.hasOwnProperty(o) && ("object" == typeof t[o] ? e(t[o], n, i + o) : n[i + o] = t[o]);
                        return n
                    }
                }(e) || {},
                t = t || s,
                n = parseInt(n, 10),
                !i.palettes[t] && isNaN(n) || !isNaN(n) && n < 0 || t == s && !isNaN(n) && n != a || i.priorities[n] && i.priorities[n] != t || (i.palettes[t] = e,
                isNaN(n)) || (-1 != (e = o(t, i.priorities)) && (i.priorities[e] = void 0),
                i.priorities[n] = t)
            }
            function r() {
                t({}, s, a)
            }
            var s, a;
            c.exports = (s = "__jcss__default",
            a = 0,
            e(e = {
                initDefaultPalette: r,
                setPalette: t,
                delPalette: function(e) {
                    var t;
                    e && (n(e) ? i.priorities[e] && (delete i.palettes[i.priorities[e]],
                    i.priorities[e] = void 0) : i.palettes[e] && (t = o(e, i.priorities),
                    delete i.palettes[e],
                    i.priorities[t] = void 0))
                },
                delPalettes: function() {
                    i.palettes = {},
                    i.priorities.length = 0,
                    r()
                },
                appendPalette: function() {},
                getPalette: function(e) {
                    return i.palettes[e = e || s] || {}
                }
            }, "jx_core_jcss_modules_JCSSPalette"),
            e)
        }
        .call(e, t(37), t(41), t(8), t(1))
    }
    , function(i, e, t) {
        !function(e) {
            function t() {}
            function n(e) {
                return t.prototype = e,
                new t
            }
            i.exports = (e(n, "jx_core_globals_clone"),
            n)
        }
        .call(e, t(1))
    }
    , function(n, e, t) {
        !function(e, t) {
            n.exports = (e = {
                livechat: {
                    timestamp$int: +new Date,
                    settings: {
                        behavior: {
                            do_not_display$bool: !1
                        },
                        theme: {
                            name$string: "simple",
                            message_type$string: "bubble_avatar",
                            colors: {
                                placeholder$string: "_"
                            },
                            chat_button: {
                                position$string: "br",
                                position_mobile$string: "br"
                            },
                            chat_window: {
                                position$string: "br",
                                size$string: "medium",
                                profile_card: {
                                    display_avatar$bool: !0,
                                    display_rating$bool: !0,
                                    display_title_name$bool: !0
                                },
                                use_banner$bool: !0,
                                title_bar: {
                                    hide_minimize$bool: !1,
                                    hide_popout$bool: !1
                                }
                            },
                            branding: {
                                type$string: "icon_font_zopim"
                            }
                        },
                        greetings: {
                            online$string: e("Chat With Us"),
                            offline$string: e("Leave a Message")
                        },
                        banner: {
                            enabled$bool: !0,
                            layout$string: "image_right",
                            text$string: e("Chat with us"),
                            image_path$string: "",
                            image_data$string: ""
                        },
                        chat_button: {
                            hide_when_offline$bool: !1
                        },
                        chat_window: {
                            mobile_mode$string: "popout",
                            title_bar: {
                                title$string: e("support"),
                                status_messages: {
                                    online$string: e("We're online."),
                                    away$string: e("We're away."),
                                    offline$string: e("We're offline.")
                                }
                            }
                        },
                        login: {
                            allowed_types: {
                                email$bool: !0,
                                facebook$bool: !0,
                                twitter$bool: !1,
                                google$bool: !0
                            },
                            phone_display$bool: !1,
                            restrict_profile$bool: !1
                        },
                        concierge: {
                            display_name$string: e("Live Support"),
                            title$string: e("Ask us anything"),
                            avatar_path$string: "",
                            avatar_data$string: "",
                            greeting: {
                                enabled$bool: !1,
                                message$string: e("Hi, welcome to our website!")
                            }
                        },
                        branding: {
                            hide_branding$bool: !1,
                            hide_favicon$bool: !1,
                            custom_favicon_path$string: ""
                        },
                        language: {
                            language$string: "--"
                        },
                        cookie_law: {
                            enabled$bool: !1
                        },
                        sound: {
                            disabled$bool: !1
                        },
                        popout: {
                            enabled$bool: !0
                        },
                        rating: {
                            enabled$bool: !0
                        },
                        end_chat_menu: {
                            enabled$bool: !0,
                            message$string: ""
                        },
                        emoticons: {
                            enabled$bool: !1
                        },
                        bubble: {
                            enabled$bool: !0,
                            title$string: e("Questions?"),
                            text$string: e("Click here to chat with us")
                        },
                        forms: {
                            pre_chat_form: {
                                required$bool: !1,
                                profile_required$bool: !1,
                                message$string: "",
                                form: {
                                    0: {
                                        name$string: "name",
                                        required$bool: 0
                                    },
                                    1: {
                                        name$string: "email",
                                        required$bool: 0
                                    },
                                    2: {
                                        label$string: e("Choose a Department"),
                                        name$string: "department",
                                        required$bool: 0,
                                        type$string: "department"
                                    },
                                    3: {
                                        label$string: e("Message"),
                                        name$string: "message",
                                        required$bool: 0,
                                        type$string: "textarea"
                                    },
                                    4: {
                                        label$string: e("Phone"),
                                        name$string: "phone",
                                        required$bool: 0,
                                        type$string: "text",
                                        hidden$bool: !0
                                    }
                                }
                            },
                            offline_form: {
                                message$string: e("Sorry, we aren't online at the moment. Leave a message and we'll get back to you."),
                                message_disabled$string: e("Sorry, we aren't online at the moment."),
                                post_submit_message$string: e("Thanks for the message! We'll get back to you as soon as we can."),
                                profile_required$bool: !0,
                                form: {
                                    0: {
                                        name$string: "name",
                                        required$bool: 1
                                    },
                                    1: {
                                        name$string: "email",
                                        required$bool: 1
                                    },
                                    2: {
                                        label$string: e("Message"),
                                        name$string: "message",
                                        required$bool: 1,
                                        type$string: "textarea"
                                    },
                                    3: {
                                        label$string: e("Phone"),
                                        name$string: "phone",
                                        required$bool: 0,
                                        type$string: "text",
                                        hidden$bool: !0
                                    }
                                }
                            },
                            post_chat_form: {
                                header$string: e("Nice chatting with you!"),
                                message$string: e("How would you rate the chat experience you just had?"),
                                comments_enabled$bool: !0,
                                comments_messages: {
                                    good: {
                                        message$string: e("Thanks for the good rating! Would you like to leave a comment?"),
                                        placeholder$string: e("What did you like about this chat?")
                                    },
                                    bad: {
                                        message$string: e("Sorry that we disappointed you. We'd appreciate it if you could tell us how to improve."),
                                        placeholder$string: e("What did you dislike about this chat?")
                                    }
                                }
                            },
                            card_form: {}
                        }
                    }
                }
            },
            t(e, "meshim_widget_controllers_DefaultDataNode"),
            e)
        }
        .call(e, t(22), t(1))
    }
    , function(n, e, i) {
        !function(r, s, e) {
            function a(e) {
                return t[e] || "UNKNOWN_ERROR"
            }
            var f, p, c, l, m, g, u, d, t, h;
            n.exports = (l = i(47),
            m = i(12),
            g = i(48),
            u = i(49),
            d = i(21),
            t = {
                TOO_LARGE: "EXCEED_SIZE_LIMIT",
                ILLEGAL_TYPE: "INVALID_EXTENSION",
                NO_SESSION: "INTERNAL_ERROR",
                UNEXPECTED_ERROR: "INTERNAL_ERROR",
                UNABLE_TO_GET_SETTINGS: "INTERNAL_ERROR",
                S3_UPLOAD_ERROR: "INTERNAL_ERROR",
                NO_GATES: "INTERNAL_ERROR",
                FILE_UPLOADS_DISABLED: "NOT_ALLOWED",
                FILE_UPLOADS_TEMPORARILY_DISABLED: "INVALID_PLAN"
            },
            e(h = {
                FILE_SENDING_ERRORS: {
                    NOT_SUPPORTED: "NOT_SUPPORTED",
                    NOT_ALLOWED: "NOT_ALLOWED",
                    CONN_ERROR: "CONN_ERROR",
                    INVALID_EXTENSION: "INVALID_EXTENSION",
                    INVALID_PLAN: "INVALID_PLAN",
                    EXCEED_SIZE_LIMIT: "EXCEED_SIZE_LIMIT",
                    INTERNAL_ERROR: "INTERNAL_ERROR",
                    UNKNOWN_ERROR: "UNKNOWN_ERROR"
                },
                init: function(e, t) {
                    p = t,
                    (f = e).$("livechat").$("channel").$("department_id$int").on("value", function(e) {
                        e && (c = e)
                    })
                },
                sendChatMsg: function(e, t, n) {
                    var i = (t = parseInt(t, 10) || parseInt(p.getServerTime().toFixed(0), 10)) + ""
                      , o = f.$("livechat").$("profile")
                      , r = c
                      , s = (e.msg || "") + "";
                    "department"in e && (r = e.department),
                    f.$("livechat").$("channel").$("log").$(i).write({
                        timestamp$int: t,
                        type$string: "chat.msg",
                        msg$string: s,
                        nick$string: o.$("nick$string").getValue() || "",
                        display_name$string: o.$("display_name$string").getValue() || "",
                        department_id$int: r,
                        unverified$bool: !0,
                        __client$bool: !0
                    }, n)
                },
                sendFiles: function(e, t) {
                    if (e = h._validateAndPrepareData(e),
                    r(e))
                        return e;
                    i = {
                        file_name: e.name,
                        file_type: e.type,
                        file_size: e.size
                    },
                    t = t,
                    n = (t = parseInt(t, 10) || parseInt(p.getServerTime().toFixed(0), 10)) + "",
                    f.$("livechat").$("channel").$("log").$(n).write({
                        timestamp$int: t,
                        nick$string: f.$("livechat").$("profile").$("nick$string").getValue() || "",
                        display_name$string: f.$("livechat").$("profile").$("display_name$string").getValue() || "",
                        type$string: "chat.file.upload",
                        file_name$string: i.file_name || "",
                        file_type$string: i.file_type || "",
                        file_size$int: i.file_size || 0,
                        unverified$bool: !0,
                        __client$bool: !0
                    });
                    var n = t
                      , i = "https://" + e.host + m.FILE_UPLOAD_PATH
                      , t = {
                        "X-Zopim-MID": e.mid,
                        "X-Zopim-UID": e.uid
                    };
                    h._uploadFiles(e.form_data, i, {
                        ts: n
                    }, t)
                },
                sendFileWithCallback: function(e, t) {
                    var n, i, o = h._validateAndPrepareData([e]);
                    t = l.once(t),
                    r(o) ? s(function() {
                        t(new window.Error(o))
                    }) : (e = p.registerCallback(function(e) {
                        return "ok" !== e.raw.__status ? t(new window.Error(a(e.raw.error))) : e.raw.data && "chat.file" === e.raw.data.type ? void t(null, d.pick(e.raw.data, ["mime_type", "name", "size", "url"])) : t(new window.Error("INTERNAL_ERROR"))
                    }),
                    n = "https://" + o.host + m.CALLBACK_FILE_UPLOAD_PATH,
                    e = {
                        ts: parseInt(p.getServerTime().toFixed(0), 10),
                        __messageID: e
                    },
                    i = {
                        "X-Zopim-MID": o.mid,
                        "X-Zopim-UID": o.uid
                    },
                    h._uploadFiles(o.form_data, n, e, i, {
                        error: function() {
                            t(new window.Error("CONN_ERROR"))
                        },
                        load: function() {
                            if (200 !== this.status) {
                                var e;
                                try {
                                    e = JSON.parse(this.responseText)
                                } catch (e) {}
                                t(e && e.error ? new window.Error(a(e.error)) : new window.Error("INTERNAL_ERROR"))
                            }
                        }
                    }))
                },
                _validateAndPrepareData: function(e) {
                    if (!window.FormData)
                        return "NOT_SUPPORTED";
                    var t = (r = f.$("livechat")).$("settings").$("file_sending")
                      , n = r.$("settings").$("package")
                      , i = void 0 === (i = t.$("enabled$bool").getValue()) || i
                      , o = (t.$("allowed_extensions$string").getValue() || "").trim().replace(/\s*,\s*/g, ",").split(",")
                      , t = n.$("color_customization_enabled$int").getValue() || n.$("widget_customization_enabled$int").getValue()
                      , n = r.$("profile").$("mid$string").getValue()
                      , r = r.$("profile").$("uid$string").getValue()
                      , s = p.getHost()
                      , a = new window.FormData
                      , c = []
                      , l = []
                      , u = 0;
                    if (!s)
                        return "CONN_ERROR";
                    if (!t)
                        return "INVALID_PLAN";
                    if (!i)
                        return "NOT_ALLOWED";
                    for (var d = 0, h = e.length; d < h; d++) {
                        if (!g.isValidType(e[d].name, o))
                            return "INVALID_EXTENSION";
                        c.push(e[d].name),
                        l.push(e[d].type),
                        u += e[d].size || 0,
                        a.append("file_" + e[d].name, e[d])
                    }
                    return u > m.FILE_UPLOAD_MAX ? "EXCEED_SIZE_LIMIT" : {
                        form_data: a,
                        name: c.join(", "),
                        type: l.join(", "),
                        size: u,
                        host: s,
                        mid: n,
                        uid: r
                    }
                },
                _uploadFiles: function(e, t, n, i, o) {
                    var r = new window.XMLHttpRequest
                      , t = t + (Object.keys(n).length ? "?" + u.buildQuery(n) : "");
                    if (r.upload) {
                        for (var s in r.open("POST", t, !0),
                        i)
                            i.hasOwnProperty(s) && r.setRequestHeader(s, i[s]);
                        for (var a in o)
                            o.hasOwnProperty(a) && r.addEventListener(a, o[a]);
                        r.send(e)
                    }
                }
            }, "meshim_widget_controllers_ChatUtils"),
            h)
        }
        .call(e, i(9), i(27), i(1))
    }
    , function(n, e, t) {
        !function(r, e) {
            var t, s;
            n.exports = (t = {
                bind: function(e, t) {
                    var n, i, o;
                    if (r(e))
                        return !r(e.bind) || "prototype"in e.bind ? (n = s.call(arguments, 2),
                        (i = function() {}
                        ).prototype = (o = function() {
                            return e.apply(this instanceof i && t ? this : t, n.concat(s.call(arguments)))
                        }
                        ).prototype,
                        o.prototype = new i,
                        o) : e.bind.apply(e, s.call(arguments, 1));
                    throw new TypeError("FunctionUtils.bind - what is trying to be bound is not callable")
                },
                once: function(e) {
                    var t;
                    return function() {
                        if (!t)
                            return t = !0,
                            e.apply(this, s.call(arguments))
                    }
                }
            },
            s = Array.prototype.slice,
            e(t, "jx_core_FunctionUtils"),
            t)
        }
        .call(e, t(6), t(1))
    }
    , function(_, e, t) {
        !function(e, n, i, t) {
            var r, s, o, a, c, l, u, d, h, f, p, m, g;
            _.exports = (o = e("File size too large. Maximum limit is <size>."),
            a = e("The file you are trying to send is not supported."),
            c = e("File sending is temporarily disabled. Please try again later."),
            l = e("<size> bytes"),
            u = e("<size> KB"),
            d = e("<size> MB"),
            h = {
                ERR_SIZE: "TOO_LARGE",
                ERR_FORMAT: "ILLEGAL_TYPE",
                ERR_DISABLED: "FILE_UPLOADS_TEMPORARILY_DISABLED"
            },
            f = /^(x-|vnd\.)/i,
            p = ["png", "jpg", "jpeg", "gif", "txt", "pdf"],
            m = {},
            g = e("Failed to send. Please try again."),
            m[h.ERR_SIZE] = o,
            m[h.ERR_FORMAT] = a,
            m[h.ERR_DISABLED] = c,
            h.prettySize = (r = [l, u, d],
            s = [0, 1, 2],
            function(e, t) {
                e = Math.max(parseInt(e, 10) || 0, 0);
                for (var n, i = (t = t || {}).base2 ? 1024 : 1e3, o = r.length; o--; )
                    if ((n = Math.pow(i, o)) <= e)
                        return r[o].replace("<size>", (e / n).toFixed(s[o]))
            }
            ),
            h.prettyType = function(e, t, n) {
                n = n || window.Infinity;
                e = e.split("/")[1];
                return ((e = e && e.replace(f, "")) && e.length < n ? e : (e = t.split(".").pop()) || "").toLowerCase()
            }
            ,
            h.isValidType = function(e, t) {
                if (e)
                    return t = t || p,
                    e = e.substr(e.lastIndexOf(".") + 1).toLowerCase(),
                    -1 !== n(e, t)
            }
            ,
            h.prettyError = function(e, t) {
                e = e in m ? m[e] : g;
                return e = i(t) ? e : e.replace("<size>", h.prettySize(t || 5e6))
            }
            ,
            h.blobToFile = function(e, t, n) {
                return e.lastModifiedDate = new Date,
                e.name = t,
                new window.File([e],t,{
                    type: n
                })
            }
            ,
            h.getExtension = function(e) {
                var t = e.lastIndexOf(".");
                return -1 === t ? null : e.substr(t + 1).toLowerCase()
            }
            ,
            t(h, "meshim_common_FileUtil"),
            h)
        }
        .call(e, t(22), t(41), t(7), t(1))
    }
    , function(s, e, t) {
        !function(l, e) {
            function c(e) {
                return this instanceof c ? e ? c.parseQuery(e) : void (this.store = {}) : (t || c._initSingleton(window),
                t)
            }
            function o(e, t, n) {
                if (void 0 === t && void 0 === n)
                    return e;
                if ((t = void 0 === t ? "string" : t)in r)
                    return void 0 === e ? void 0 !== n ? n : r[t] : "boolean" === t ? i.test(e) : "integer" === t ? parseInt(e, 10) : "float" === t ? parseFloat(e) : e;
                throw "invalid type requested"
            }
            var i, r, t, n;
            s.exports = (r = {
                boolean: !(i = /^(1|on|true)$/i),
                integer: 0,
                float: 0,
                string: ""
            },
            t = null,
            c._initSingleton = function(e) {
                t = new c(e.location.search)
            }
            ,
            c.buildQuery = function(e) {
                var t, n, i, o, r, s, a = [], c = [];
                for (r in e)
                    e.hasOwnProperty(r) && a.push(r);
                for (a.sort(),
                t = 0,
                i = a.length; t < i; t++)
                    if (s = e[r = a[t]],
                    r = window.encodeURIComponent(r),
                    l(s))
                        for (n = 0,
                        o = s.length; n < o; n++)
                            c.push(r + "=" + window.encodeURIComponent(s[n] + ""));
                    else
                        c.push(r + "=" + window.encodeURIComponent(s + ""));
                return c.join("&")
            }
            ,
            c.parseQuery = function(e) {
                for (var t, n = new c, i = (e = e.replace(/^\?|\/+$/g, "")).split("&"), o = 0, r = i.length; o < r; o++) {
                    var s, a = i[o];
                    a.length && (a = (s = a.indexOf("=")) <= -1 ? (t = a,
                    "1") : (t = a.slice(0, s),
                    a.slice(s + 1)),
                    n.add(window.decodeURIComponent(t), window.decodeURIComponent(a)))
                }
                return n
            }
            ,
            c.getHash = function(e, t) {
                t = t || window.location.hash;
                return c.parseQuery(t.replace(/^#/, "")).get(e)
            }
            ,
            (n = c.prototype).add = function(e, t) {
                this.has(e) ? this.store[e].push(t) : this.store[e] = [t]
            }
            ,
            n.has = function(e) {
                return this.store.hasOwnProperty(e)
            }
            ,
            n.getLast = function(e, t, n) {
                return this.has(e) ? this.getAt(e, this.store[e].length - 1, t, n) : o(void 0, t, n)
            }
            ,
            n.getFirst = function(e, t, n) {
                return this.getAt(e, 0, t, n)
            }
            ,
            n.getAt = function(e, t, n, i) {
                return o(this.has(e) ? this.store[e][t] : void 0, n, i)
            }
            ,
            n.getRaw = function(e) {
                return this.has(e) ? this.store[e].concat() : []
            }
            ,
            n.get = n.getLast,
            n.toString = function() {
                return c.buildQuery(this.store)
            }
            ,
            e(c, "meshim_common_QueryString"),
            c)
        }
        .call(e, t(19), t(1))
    }
    , function($, e, E) {
        !function(e, t, n, i) {
            function o(e, t, n) {
                return s(e, t, n),
                !1
            }
            function r(e, t, n) {
                return s(e, t, n),
                !0
            }
            function s(e, t, n) {
                var i;
                !e || v || g.test(e) || "string" == typeof t && !m.test(t) || (i = [e.stack ? [e.toString(), e.stack].join("\n") : e.toString(), t, n].join(" "),
                y[i]) || (y[i] = !0,
                a(e.toString(), {
                    script: t + "",
                    line: n + "",
                    stack: e.stack
                }))
            }
            function a(e, t) {
                var n;
                Math.random() > b || !e || !c || (n = c.getHost()) && ((t = d.extend({}, t, {
                    error: e,
                    system: f.stringify(u.info),
                    connection: f.stringify(c.getConnectionStats())
                })).stack && (t.stack = t.stack.toString()),
                p.post("https://" + n + "/client/widget/errors", {
                    params: t
                }))
            }
            var c, l, u, d, h, f, p, m, g, _, v, w, b, y;
            $.exports = (u = E(51),
            d = E(10),
            h = E(32),
            f = E(18),
            p = E(52),
            m = /^($|about:blank$|(https?:\/\/)?([\w_-]+\.)*zopim\.com)/i,
            g = /Script error/,
            _ = /^en/i,
            v = (e.isIE || e.isNewIE) && ("language"in window.navigator && !_.test(window.navigator.language) || "userLanguage"in window.navigator && !_.test(window.navigator.userLanguage) || "browserLanguage"in window.navigator && !_.test(window.navigator.browserLanguage)),
            w = ["zopim"],
            b = .1,
            y = {},
            i(_ = {
                init: function(e) {
                    l = h.root.$("livechat").$("account").$("key$string"),
                    c = e,
                    t.on("error", r),
                    -1 != n(l.getValue(), w) && (t.window.on("error", o),
                    t.window.on("unload", function() {
                        t.window.un("error", o)
                    }))
                },
                post: a,
                bind: function(e) {
                    e && (e.onerror = r)
                }
            }, "meshim_widget_controllers_ErrorHandler"),
            _)
        }
        .call(e, E(4), E(3), E(41), E(1))
    }
    , function(i, e, t) {
        !function(e, t, n) {
            i.exports = (e = {
                info: {
                    gitCommit: e.git_commit,
                    buildNumber: e.build_number,
                    userAgent: window.navigator.userAgent,
                    platform: window.navigator.platform,
                    language: t.language,
                    browser: t.browser,
                    version: t.version,
                    javaVersion: t.hasJava,
                    flashVersion: t.hasFlash,
                    url: window.location.toString()
                }
            },
            n(e, "meshim_common_System"),
            e)
        }
        .call(e, t(13), t(4), t(1))
    }
    , function(n, e, t) {
        !function(e, i, d, t) {
            var o;
            n.exports = ((o = e.isIE6 || e.isIE7 || e.isIE8 ? function(e, t, n, i) {
                var o = document;
                if (window.ActiveXObject)
                    try {
                        (o = new window.ActiveXObject("htmlfile")).open(),
                        o.close()
                    } catch (e) {}
                var r, s, a, c, l = "form" + ~~(1e5 * Math.random()), u = n.timeout || 1e4, d = o.createElement('<form target="' + l + '"/>'), h = o.createElement('<iframe name="' + l + '"/>');
                if (d.method = e,
                d.action = t,
                h.style.display = "none",
                n.params)
                    for (a in n.params)
                        n.params.hasOwnProperty(a) && ((c = o.createElement('<input name="' + a + '"/>')).value = n.params[a],
                        d.appendChild(c));
                o.body.appendChild(d),
                o.body.appendChild(h),
                d.submit(),
                o.body.removeChild(d),
                c = d = null,
                s = setTimeout(function e() {
                    h.contentWindow.frames.length ? (h.contentWindow.location.href = "about:blank",
                    clearTimeout(r),
                    setTimeout(function() {
                        i && i(null, h.contentWindow.name),
                        o.body.removeChild(h),
                        o = h = null
                    }, 0)) : s = setTimeout(e, 100)
                }, 100),
                r = setTimeout(function() {
                    i && i("timeout"),
                    clearTimeout(s),
                    o.body.removeChild(h),
                    o = h = null
                }, u)
            }
            : function(e, t, n, i) {
                var o, r, s, a = "form" + ~~(1e5 * Math.random()), c = n.timeout || 1e4, l = document.createElement("form"), u = document.createElement("iframe");
                if (l.method = e,
                l.action = t,
                u.style.display = "none",
                n.params)
                    for (r in n.params)
                        n.params.hasOwnProperty(r) && ((s = document.createElement("input")).name = r,
                        s.value = n.params[r],
                        l.appendChild(s));
                document.body.appendChild(l),
                document.body.appendChild(u),
                l.target = u.contentWindow.name = a,
                d(function() {
                    l.submit(),
                    document.body.removeChild(l),
                    s = l = null,
                    u.onload = function() {
                        u.onload = null,
                        u.contentWindow.location.href = "about:blank",
                        u.onload = function() {
                            u.onload = null,
                            clearTimeout(o),
                            i && i(null, u.contentWindow.name),
                            document.body.removeChild(u),
                            u = null
                        }
                    }
                }),
                o = setTimeout(function() {
                    i && i("timeout"),
                    document.body.removeChild(u),
                    u = null
                }, c)
            }
            ).get = function(e, t, n) {
                i(t) && (n = t,
                t = null),
                o("GET", e, t = t || {}, n)
            }
            ,
            o.post = function(e, t, n) {
                i(t) && (n = t,
                t = null),
                o("POST", e, t = t || {}, n)
            }
            ,
            t(o, "jx_io_Form"),
            o)
        }
        .call(e, t(4), t(6), t(27), t(1))
    }
    , function(v, e, w) {
        !function(s, e) {
            function a(e, t, n, i) {
                if (!h)
                    throw "No available transports";
                for (var o in this.provider = h,
                this.options = i = i || {},
                p)
                    !p.hasOwnProperty(o) || o in i || (i[o] = p[o]);
                s.extend(this),
                this.id = n || a.generateID(),
                this.host = e,
                this.ns = t,
                this.path = "/" + ["s", this.ns, this.provider.protocol, this.id].join("/"),
                this.url = this.host + this.path + "/",
                this.status = "connecting",
                this.connected = !1,
                this.quality = 0,
                this.rtt = i.INITIAL_RTT,
                this.clock_skew = 0,
                this.connect_attempts = 0,
                this.connections = 0,
                this.disconnects = 0,
                this.sent_bytes = 0,
                this.recv_bytes = 0,
                this.sent_messages = 0,
                this.recv_messages = 0,
                this.sent_frames = 0,
                this.recv_frames = 0,
                this.lost_frames = 0,
                this.ooo_frames = 0,
                this.remote_seq = 0,
                this.local_seq = 0,
                this.timeout_server = 0,
                this.timeout_response_soft = 0,
                this.timeout_response_hard = 0,
                this.bytes_at_connect = -1,
                this.time_last_alive = -1,
                this.time_last_open = -1,
                this.starttime = +new Date,
                this.uptime = 0,
                this.connected_time = new c,
                this.idle_time = new c,
                this.last_frame_time = 0,
                this.raw_clock_skew = 0,
                this.smooth_skewed_transit_time_in = 0,
                this.remote_smooth_skewed_transit_time_out = 0,
                this.cur_conn_recv_messages = 0,
                this.drained = !0,
                this.buffer = [],
                this.glitch_timer = this.reconnect_timer = null,
                this.reconnect_delay = i.RECONNECT_DELAY_MS * (.2 * Math.random() + .8),
                this.keep_alive_interval = 15e3,
                this.data_packet_queue = new l(this),
                this.connect();
                var r = this;
                this.onoffline = function() {
                    a.prototype.onoffline.call(r)
                }
                ,
                this.ononline = function() {
                    a.prototype.ononline.call(r)
                }
                ,
                s.window.on("offline", this.onoffline),
                s.window.on("online", this.ononline)
            }
            function t(e) {
                for (var t = "", n = _; 0 < e--; )
                    t += n.charAt(Math.floor(Math.random() * n.length));
                return t
            }
            function i(e, t, n) {
                return Math.min(n, Math.max(t, e))
            }
            function c() {
                this.count = 0,
                this.sum = 0,
                this.sq_sum = 0,
                this.mean = 0,
                this.stddev = 0
            }
            function l(e) {
                this.socket = e,
                this.queue = [],
                this.curFrame = null,
                this.curIdx = 0,
                this.last_work_finished_time = 0,
                this.work_timer = null,
                this.processing = !1
            }
            var u, n, o, r, d, h, f, p, m, g, _;
            v.exports = (u = w(18),
            n = w(54),
            o = w(55),
            r = w(56),
            d = w(57),
            h = r || n || o || d,
            f = d,
            p = {
                INITIAL_RTT: 1e3,
                RECONNECT_DELAY_MS: 3e4,
                FAST_RECONNECT_MS: 100,
                FLUSH_DELAY_MS: 75,
                MAX_BLOCKING_TIME_MS: 40,
                MAX_NO_WORK_TIME_MS: 15
            },
            a.available = function() {
                return !!h
            }
            ,
            a.generateID = function() {
                return t(16)
            }
            ,
            a.prototype.connect = function(e) {
                var n, t;
                this.debug("connect(" + (e ? "glitch" : "") + ")"),
                this.reconnect_timer || (t = (n = this).options,
                this.connections && this.cur_conn_recv_messages || (this.provider = 1 & this.connect_attempts ? f : h),
                this.response_timer = clearTimeout(this.response_timer),
                this.timeout_timer = clearTimeout(this.timeout_timer),
                this.socket && (this.socket.onclose = this.socket.ondrain = this.socket.onerror = this.socket.onmessage = this.socket.onopen = null,
                this.socket.abort("connect"),
                this.socket = null),
                this.connected = !1,
                this.cur_conn_recv_messages = 0,
                e && (this.reconnect_delay = t.RECONNECT_DELAY_MS * (.2 * Math.random() + .9),
                this.glitch_timer = setTimeout(function() {
                    n.quality = 0,
                    n.glitch_timer = setTimeout(function() {
                        n.status = "reconnecting",
                        n.fire_break()
                    }, i(3 * n.rtt, 1e3, 5e3))
                }, i(3 * this.rtt, 1e3, 5e3))),
                this.debug("reconnect_delay: " + this.reconnect_delay),
                clearTimeout(this.reconnect_timer),
                this.reconnect_timer = setTimeout(function() {
                    n.reconnect_timer = null,
                    n.reconnect_delay = Math.min(1.4 * n.reconnect_delay + 1e3, 6e4),
                    n.reconnect_delay *= .2 * Math.random() + .9,
                    n.connect()
                }, this.reconnect_delay),
                this.path = "/" + ["s", this.ns, this.provider.protocol, this.id].join("/"),
                this.url = this.host + this.path + "/",
                this.debug("connecting: " + this.url),
                this.socket = new this.provider(this.url),
                this.transport = this.provider.protocol,
                this.connect_attempts++,
                this.socket.onopen = function() {
                    n.status = "connected",
                    n.glitch_timer = clearTimeout(n.glitch_timer),
                    n.reconnect_timer = clearTimeout(n.reconnect_timer),
                    n.connections++,
                    n.drained = !0,
                    n.connected = !0,
                    n.time_last_open = n.time_last_alive = +new Date,
                    0 <= n.uptime && (n.uptime -= n.time_last_open),
                    1 == n.connections ? n.fire("open") : n.fire_resume(),
                    n.flush(),
                    n.keep_alive(),
                    n.debug("connected"),
                    -1 == n.bytes_at_connect && setTimeout(function() {
                        n.bytes_at_connect = n.recv_bytes
                    }, 50)
                }
                ,
                this.socket.onmessage = function(e, t) {
                    n.onmessage(e, t)
                }
                ,
                this.socket.onclose = function(e) {
                    n._onclose(e)
                }
                ,
                this.socket.ondrain = function(e) {
                    n._ondrain(e)
                }
                ,
                this.socket.onerror = function(e) {
                    n._onerror(e)
                }
                )
            }
            ,
            a.prototype.reconnect = function() {
                this.reconnect_timer = clearTimeout(this.reconnect_timer),
                this.broken_reason = "FORCED_RECONNECT",
                this.connect()
            }
            ,
            a.prototype.send = function(e, t) {
                "disconnected" != this.status && ("null" == this.buffer[0] && (this.buffer = []),
                this.buffer.push(u.stringify(e)),
                this.schedule_flush(),
                t) && this.response_timeout()
            }
            ,
            a.prototype.close = function(e) {
                this.debug("close()"),
                this.flush_scheduled = clearTimeout(this.flush_scheduled),
                this.keep_alive_timer = clearTimeout(this.keep_alive_timer),
                this.reconnect_timer = clearTimeout(this.reconnect_timer),
                this.response_timer = clearTimeout(this.response_timer),
                this.timeout_timer = clearTimeout(this.timeout_timer),
                this.broken_reason || (this.broken_reason = "CLOSE"),
                this.fire_break(),
                this.status = e ? "reconnecting" : "disconnected",
                this.connected = !1,
                this.quality = 0,
                this.socket && (this.socket.onclose = this.socket.ondrain = this.socket.onerror = this.socket.onmessage = this.socket.onopen = null,
                this.socket.abort("close"),
                this.socket = null,
                e || (s.window.un("offline", this.onoffline),
                s.window.un("online", this.ononline)))
            }
            ,
            a.prototype.hibernate = function() {}
            ,
            a.prototype.onoffline = function() {
                this.broken_reason = "OFFLINE",
                this.debug("onoffline"),
                this.close(!0)
            }
            ,
            a.prototype.ononline = function() {
                this.debug("ononline"),
                "disconnected" == this.status || this.connected || (this.reconnect_timer = clearTimeout(this.reconnect_timer),
                this.connect())
            }
            ,
            a.prototype.schedule_flush = function() {
                var e, t;
                "disconnected" != this.status && !this.flush_scheduled && this.drained && this.connected && (t = (e = this).options,
                this.flush_scheduled = setTimeout(function() {
                    e.flush()
                }, t.FLUSH_DELAY_MS))
            }
            ,
            a.prototype.flush = function() {
                var e;
                "disconnected" != this.status && this.buffer.length && this.drained && this.connected && (e = this.buffer,
                this.sent_messages += e.length,
                this.sent_frames++,
                e = this.generate_frame(e.join("\n")),
                this.drained = this.socket.send(e),
                this.sent_bytes += e.length,
                this.flush_scheduled = clearTimeout(this.flush_scheduled),
                this.buffer = [],
                this.keep_alive(),
                this.time_last_alive = +new Date)
            }
            ,
            a.prototype.keep_alive = function() {
                var e;
                "disconnected" != this.status && (clearTimeout(this.keep_alive_timer),
                (e = this).keep_alive_timer = setTimeout(function() {
                    e.debug("pong!"),
                    e.send(null)
                }, this.keep_alive_interval))
            }
            ,
            a.prototype.response_timeout = function() {
                var e, t;
                this.response_timer || (t = i(4 * (e = this).rtt + this.options.FLUSH_DELAY_MS, 2e3, 2e4),
                this.response_timer = setTimeout(function() {
                    e.timeout_response_soft++,
                    e.debug("response timeout, " + t + "ms"),
                    e.fire_break("SOFT_RESPONSE_TIMEOUT"),
                    e.response_timer = setTimeout(function() {
                        e.timeout_response_hard++,
                        e.debug("response timeout - reconnecting"),
                        e.broken_reason = "HARD_RESPONSE_TIMEOUT",
                        e.connect(!0)
                    }, 2 * t)
                }, t))
            }
            ,
            a.prototype.reset_server_timeout = function() {
                clearTimeout(this.timeout_timer);
                var e = this
                  , t = 4 * this.keep_alive_interval + i(4 * e.rtt, 2e3, 2e4);
                this.timeout_timer = setTimeout(function() {
                    e.timeout_server++,
                    e.debug("server " + t + "ms timeout, reconnecting"),
                    e.broken_reason = "SERVER_TIMEOUT",
                    e.connect(!0)
                }, t)
            }
            ,
            a.prototype.fire_break = function(e) {
                this.broken || this.fire("break", e || this.broken_reason),
                this.broken = !0,
                this.broken_reason = "",
                this.uptime < 0 && (this.uptime += +new Date)
            }
            ,
            a.prototype.fire_resume = function() {
                this.broken_reason = "",
                this.broken && this.fire("resume"),
                this.broken = !1,
                0 <= this.uptime && (this.uptime -= +new Date)
            }
            ,
            a.prototype.onmessage = function(e, t) {
                if (this.recv_bytes += e.length,
                (e = e.split("\n")).length < 6)
                    this.debug("Bad data: " + e.join("\n"));
                else {
                    var n = +new Date
                      , i = +e[0]
                      , o = +e[1]
                      , r = +e[2]
                      , s = (e[3],
                    e[4]);
                    switch (this.calculate_clocks(t || +new Date, i, o),
                    this.reset_server_timeout(),
                    s) {
                    case "a":
                        this.broken_reason = "ABORT",
                        this.close();
                        break;
                    case "d":
                        this.response_timer = clearTimeout(this.response_timer),
                        this.fire_resume(),
                        this.check_sequence(r),
                        this.data_packet_queue.queueFrame(e, 5, n);
                        break;
                    case "e":
                        this.debug("server: Are you still there?"),
                        this.send(null),
                        this.flush();
                        break;
                    case "n":
                        this.remote_seq = r,
                        this.keep_alive_interval = +e[5] || 15e3,
                        this.debug("keep_alive is " + this.keep_alive_interval + "ms"),
                        1 < this.connections && this.fire("reopen");
                        break;
                    case "p":
                        this.debug("ping!")
                    }
                }
            }
            ,
            a.prototype._onclose = function(e) {
                var t = this
                  , n = this.options;
                0 == this.connections && 0 == this.disconnects && this.fire("close"),
                this.debug("_onclose"),
                this.disconnects++,
                this.broken_reason = "HANGUP",
                this.connected ? this.reconnect_timer = setTimeout(function() {
                    t.reconnect_timer = null,
                    t.connect(!0)
                }, n.FAST_RECONNECT_MS) : this.connections || 1 != this.connect_attempts || (clearTimeout(this.reconnect_timer),
                this.reconnect_timer = setTimeout(function() {
                    t.reconnect_timer = null,
                    t.connect()
                }, 0)),
                this.connected = !1,
                clearTimeout(this.keep_alive_timer),
                0 < this.time_last_alive && this.idle_time.add(+new Date - this.time_last_alive),
                0 < this.time_last_open && this.connected_time.add(+new Date - this.time_last_open),
                this.time_last_alive = this.time_last_open = -1,
                this.uptime < 0 && (this.uptime += +new Date)
            }
            ,
            a.prototype._ondrain = function() {
                this.drained = !0,
                this.flush()
            }
            ,
            a.prototype._onerror = function(e) {
                this.debug("_error"),
                this.fire("error", e)
            }
            ,
            a.prototype.generate_frame = function(e, t) {
                return [+new Date, this.smooth_skewed_transit_time_in, ++this.local_seq, this.remote_seq, t || "d", e].join("\n")
            }
            ,
            m = Math.pow(50, .1),
            g = Math.pow(1e3, .1) - m,
            a.prototype.calculate_clocks = function(e, t, n) {
                var t = e - t
                  , i = 1 / (Math.max(0, e - this.last_frame_time) / 45e3 + 1);
                this.smooth_skewed_transit_time_in ? this.smooth_skewed_transit_time_in = i * this.smooth_skewed_transit_time_in + (1 - i) * t : this.smooth_skewed_transit_time_in = t,
                this.remote_smooth_skewed_transit_time_out = n,
                this.smooth_skewed_transit_time_in && this.remote_smooth_skewed_transit_time_out && (this.rtt = this.smooth_skewed_transit_time_in + this.remote_smooth_skewed_transit_time_out,
                this.quality = ~~(100 * (1 - (Math.pow(this.rtt, .1) - m) / g)),
                this.quality = Math.min(100, Math.max(0, this.quality)),
                this.raw_clock_skew = t - this.rtt / 2,
                this.clock_skew ? this.clock_skew = .9 * this.clock_skew + .1 * this.raw_clock_skew : this.clock_skew = this.raw_clock_skew),
                this.time_last_alive = this.last_frame_time = e
            }
            ,
            a.prototype.check_sequence = function(e) {
                var t;
                this.remote_seq + 1 == e ? this.remote_seq = e : this.remote_seq < e ? (t = e - this.remote_seq + 1,
                this.lost_frames += t,
                this.fire("lost", t),
                this.remote_seq = e) : (this.ooo_frames++,
                this.fire("out_of_order"))
            }
            ,
            h && (a.prototype.transport = h.protocol),
            a.prototype.debug = function() {}
            ,
            _ = "+-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            a.genDate = function() {
                var e = _
                  , t = (a = new Date).getUTCFullYear() - 2e3
                  , n = a.getUTCMonth() + 1
                  , i = a.getUTCDate()
                  , o = a.getUTCHours()
                  , r = a.getUTCMinutes()
                  , s = a.getUTCSeconds()
                  , a = a.getUTCMilliseconds();
                return e[t] + e[n] + e[i] + e[o] + e[r] + e[s] + e[a >> 6] + e[63 & a]
            }
            ,
            a.genID = t,
            c.prototype.add = function(e) {
                this.count++,
                this.sum += e,
                this.sq_sum += e * e,
                this.mean = this.sum / this.count,
                this.stddev = Math.sqrt(this.sq_sum / this.count - this.mean * this.mean)
            }
            ,
            (r = l.prototype).queueFrame = function(e, t, n) {
                this.queue.push({
                    msgs: e,
                    start_idx: t,
                    receive_time: n
                }),
                this.process()
            }
            ,
            r.process = function() {
                var e = +new Date - this.last_work_finished_time;
                this.processing && e < this.socket.options.MAX_NO_WORK_TIME_MS || (this.work_timer = window.clearTimeout(this.work_timer),
                this.processing = !0,
                this.work())
            }
            ,
            r.work = function() {
                for (var t, n, e, i = +new Date + this.socket.options.MAX_BLOCKING_TIME_MS, o = !1, r = this.socket.recv_frames, s = this, a = 0; a < this.queue.length; a++) {
                    "start_time"in (t = this.queue[a]) || (t.start_time = +new Date,
                    t.ticks = 0,
                    t.idx = t.start_idx),
                    t.ticks++,
                    e = (n = t.msgs).length;
                    for (; t.idx < e; ) {
                        var c, l = +new Date;
                        if (i < l) {
                            o = !0;
                            break
                        }
                        this.socket.dispatch_delay = l - t.receive_time;
                        try {
                            c = u.parse(n[t.idx]),
                            t.idx++
                        } catch (e) {
                            this.socket.debug("Invalid json message: " + n[t.idx]);
                            continue
                        }
                        this.socket.fire("message", c),
                        this.socket.recv_messages++,
                        this.socket.cur_conn_recv_messages++
                    }
                    if (t.idx >= e && this.socket.recv_frames++,
                    o)
                        break
                }
                this.queue.splice(0, this.socket.recv_frames - r),
                this.queue.length ? this.work_timer = window.setTimeout(function() {
                    s.work()
                }, 0) : this.processing = !1,
                this.last_work_finished_time = +new Date
            }
            ,
            e(a, "jx_io_Socket"),
            a)
        }
        .call(e, w(3), w(1))
    }
    , function(i, e, t) {
        !function(a, e) {
            function t(e) {
                function t(e) {
                    u("extracting data"),
                    !n && o.onopen && o.onopen(),
                    n = e,
                    r += i.responseText.substr(s),
                    s = i.responseText.length,
                    r = r.split("\n\n");
                    for (var t = 0; t < r.length - 1; t++)
                        o.onmessage && o.onmessage(r[t], n);
                    r = r[r.length - 1],
                    (1048576 < s && !r.length || 4194304 < s) && o.abort()
                }
                var n, i = this.xhr = new c, o = this, r = "", s = 0;
                this.url = l + e,
                i.open("GET", this.url + ["c", +new Date].join("/"), !0),
                i.onerror = function(e) {
                    o.abort(e)
                }
                ,
                a.isIE ? (i.onprogress = function() {
                    t(+new Date)
                }
                ,
                i.onload = function() {
                    o.abort("close")
                }
                ) : i.onreadystatechange = function() {
                    switch (i.readyState) {
                    case 3:
                        t(+new Date);
                        break;
                    case 4:
                        o.abort("close")
                    }
                }
                ,
                u("CXHR connecting to: " + this.url),
                i.send()
            }
            var c, n, l, u;
            i.exports = (c = a.isIE ? window.XDomainRequest : !a.isOpera && !a.isAndroid && window.XMLHttpRequest,
            n = c ? t : null,
            l = a.isIE ? "//" : "https://",
            t.protocol = "cxhr",
            t.prototype.send = function(e) {
                function t() {
                    s.abort("send failed")
                }
                function n() {
                    s.xhr_sender = null,
                    clearTimeout(i),
                    s.ondrain && s.ondrain()
                }
                var i, o = this.url + ["d", +new Date].join("/"), r = new c, s = this;
                return r.open("POST", o, !0),
                r.send(e),
                a.isIE ? (r.onerror = t,
                r.onload = n) : r.onreadystatechange = function() {
                    4 == r.readyState && (200 != r.status && t(),
                    n())
                }
                ,
                i = setTimeout(t, 5e3),
                this.xhr_sender = r,
                !1
            }
            ,
            t.prototype.abort = function(e) {
                this._abort || (this._abort = !0,
                u(e),
                this.xhr && this.xhr.abort(),
                this.xhr_sender && this.xhr_sender.abort(),
                this.onclose && this.onclose(e),
                this.onerror = this.onload = this.onprogress = this.onreadystatechange = this.xhr = this.xhr_sender = null)
            }
            ,
            u = function() {}
            ,
            e(n, "jx_io_socket_ChunkedXHR"),
            n)
        }
        .call(e, t(4), t(1))
    }
    , function(i, e, t) {
        !function(e, t) {
            function n(e) {
                function t(e) {
                    !r && s.onopen && s.onopen(),
                    r = +new Date,
                    e.origin == n && ("event-stream" == e.data ? a.onload = null : s.onmessage && s.onmessage(e.data, r))
                }
                var n, i, o, r, s = this, a = this.iframe = (i = "iframe",
                i = document.createElement(i),
                (o = i.style).position = "absolute",
                o.width = o.height = 0,
                o.overflow = "hidden",
                i);
                this.url = "https://" + e,
                a.src = this.src = o = this.url + ["c", +new Date].join("/"),
                n = o.match(/https?:\/\/[^\/]+/)[0],
                a.onload = function(e) {
                    s.abort(e)
                }
                ,
                document.body.insertBefore(a, document.body.firstChild),
                c("SPM connecting to: " + this.url),
                window.addEventListener("message", t, !1),
                this.remove_listeners = function() {
                    window.removeEventListener("message", t, !1)
                }
            }
            var c;
            i.exports = (e = window.postMessage ? !e.isAndroid && n : null,
            n.protocol = "spm",
            n.prototype.send = function(e) {
                return this.iframe.contentWindow.postMessage(e, this.src),
                !0
            }
            ,
            n.prototype.abort = function(e) {
                this._abort || (this._abort = !0,
                c(e),
                this.iframe && document.body.removeChild(this.iframe),
                this.onclose && this.onclose(e),
                this.remove_listeners(),
                this.iframe = this.remove_listeners = null)
            }
            ,
            c = function() {}
            ,
            t(e, "jx_io_socket_StreamingPostMessage"),
            e)
        }
        .call(e, t(4), t(1))
    }
    , function(o, e, t) {
        !function(e) {
            function t(e) {
                var e = new n("wss://" + e + ["c", +new Date].join("/"))
                  , t = this;
                e.onclose = function(e) {
                    t.onclose && t.onclose(e)
                }
                ,
                e.onerror = function(e) {
                    t.onerror && t.onerror(e)
                }
                ,
                e.onmessage = function(e) {
                    t.onmessage && t.onmessage(e.data, +new Date)
                }
                ,
                e.onopen = function(e) {
                    t.onopen && t.onopen(e)
                }
                ,
                this.ws = e
            }
            var n, i;
            o.exports = (n = window.WebSocket || window.MozWebSocket,
            i = n ? t : null,
            t.prototype.abort = function() {
                var e;
                this._aborted || (this._aborted = !0,
                (e = this.ws).readyState == n.CONNECTING ? e.onopen = function() {
                    e.close()
                }
                : e.close())
            }
            ,
            t.prototype.send = function(e) {
                return this.ws.send(e),
                !0
            }
            ,
            t.protocol = "ws",
            e(i, "jx_io_socket_WebSocket"),
            i)
        }
        .call(e, t(1))
    }
    , function(s, e, a) {
        !function(o, e) {
            function t(e) {
                var t = this
                  , n = this.longpoll = new r(!0)
                  , i = this.sender = new r(!0);
                n.on("success", function(e) {
                    t.process_data(e)
                }),
                n.on("error", function() {
                    t.abort("longpoll error")
                }),
                i.on("success", function() {
                    t.ondrain && t.ondrain()
                }),
                i.on("error", function() {
                    t.abort("sender error")
                }),
                this.url = "https://" + e,
                o.window.on("unload", this.unload = function() {
                    t.abort("unload")
                }
                ),
                this.longpoll.load(this.url + ["c", +new Date].join("/"))
            }
            var n, r, i;
            s.exports = ((n = t).protocol = "xdds",
            r = a(26),
            t.prototype.process_data = function(e) {
                e && !this._abort && (!this.ts && this.onopen && this.onopen(),
                this.ts = +new Date,
                this.onmessage && this.onmessage(e, this.ts),
                this.longpoll) && this.longpoll.load(this.url + ["p", +new Date].join("/"))
            }
            ,
            t.prototype.send = function(e) {
                return this._abort || (e = this.url + ["d", +new Date, window.encodeURIComponent(e)].join("/"),
                this.sender && this.sender.load(e)),
                !1
            }
            ,
            t.prototype.abort = function(e) {
                this._abort || (this._abort = !0,
                i("XDDS - abort: " + e),
                o.window.un("unload", this.unload),
                this.longpoll.destroy(),
                this.sender.destroy(),
                this.longpoll = this.sender = this.unload = null,
                this.onclose && this.onclose(e),
                window.CollectGarbage && window.CollectGarbage())
            }
            ,
            i = function() {}
            ,
            e(n, "jx_io_socket_XDomainDynScript"),
            n)
        }
        .call(e, a(3), a(1))
    }
    , function(t, e, n) {
        !function(e) {
            t.exports = (e(e = {
                CLUSTERS: {
                    US: ["us08", "us10", "us12", "us14", "us16", "us18", "us20", "us22", "us24", "us26", "us28", "us30", "us32", "us34", "us36", "us38", "us40", "us42", "us44", "us46"],
                    DE: ["de04", "de06", "de08", "de10", "de12", "ie02", "ie04", "ie06", "ie08", "ie10", "ie12", "ie14", "ie16", "de14", "de16", "de18", "de20", "ie18", "ie20", "ie22", "ie24", "de22", "de24", "de26", "de28"],
                    SG: ["sg06", "sg08", "sg10", "sg12", "sg14", "sg16", "sg18", "sg20"],
                    JP: ["jp02", "jp04", "jp06", "jp08"],
                    AU: ["au02", "au04"],
                    BR: ["br02", "br04", "br06", "br08", "br10", "br12"]
                },
                FALLBACKS: {
                    US: ["DE"],
                    DE: ["US"],
                    SG: ["US"],
                    JP: ["US"],
                    AU: ["SG", "US"],
                    BR: ["US"]
                },
                NEAR_MAP: {
                    AL: "DE",
                    AD: "DE",
                    AM: "DE",
                    AT: "DE",
                    BY: "DE",
                    BE: "DE",
                    BA: "DE",
                    BG: "DE",
                    CH: "DE",
                    CY: "DE",
                    CZ: "DE",
                    DE: "DE",
                    DK: "DE",
                    EE: "DE",
                    ES: "DE",
                    EU: "DE",
                    FO: "DE",
                    FI: "DE",
                    FR: "DE",
                    GB: "DE",
                    GE: "DE",
                    GI: "DE",
                    GR: "DE",
                    HU: "DE",
                    HR: "DE",
                    IE: "DE",
                    IM: "DE",
                    IS: "DE",
                    IT: "DE",
                    LT: "DE",
                    LU: "DE",
                    LV: "DE",
                    MC: "DE",
                    MK: "DE",
                    MT: "DE",
                    NO: "DE",
                    NL: "DE",
                    PK: "DE",
                    PO: "DE",
                    PT: "DE",
                    RO: "DE",
                    SA: "DE",
                    SE: "DE",
                    SI: "DE",
                    SK: "DE",
                    SM: "DE",
                    TR: "DE",
                    UA: "DE",
                    VA: "DE",
                    ZA: "DE",
                    NG: "DE",
                    MA: "DE",
                    AP: "SG",
                    BD: "SG",
                    BN: "SG",
                    CN: "SG",
                    ID: "SG",
                    IN: "SG",
                    LA: "SG",
                    KH: "SG",
                    LK: "SG",
                    MM: "SG",
                    MY: "SG",
                    SG: "SG",
                    TH: "SG",
                    VN: "SG",
                    AU: "AU",
                    NZ: "AU",
                    HK: "JP",
                    KR: "JP",
                    JP: "JP",
                    PH: "US",
                    RU: "JP",
                    TW: "JP",
                    AR: "BR",
                    BO: "BR",
                    BR: "BR",
                    CL: "BR",
                    PE: "BR",
                    PY: "BR",
                    UY: "BR",
                    DEFAULT: "US"
                }
            }, "meshim_config_geo_WidgetMediatorsAccessDefinition"),
            e)
        }
        .call(e, n(1))
    }
    , function(c, e, l) {
        !function(e) {
            function t(e, t) {
                this.clusters_config = e,
                this.setGeoCode("geo" === i ? o : i);
                try {
                    if (t.length <= 0)
                        throw "SSI cluster definition not found";
                    if ("<" == t.charAt(0))
                        throw "SSI not processed";
                    this.clusters_config = JSON.parse(t)
                } catch (e) {}
            }
            var s, n, i, o, a, r;
            c.exports = (s = l(60),
            n = l(10),
            i = '\x3c!--# echo var="http_cf_ipcountry" default="geo" --\x3e'.toUpperCase(),
            o = '\x3c!--# echo var="geoip_country_code" default="geo" --\x3e'.toUpperCase(),
            a = [".zopim.net", ".zopim.org", ".zdch.at"],
            "<" == i.charAt(0) && (i = "geo"),
            "<" == o.charAt(0) && (o = "geo"),
            t.SUPPORTED_DOMAINS = a,
            (r = t.prototype).getGeoCode = function() {
                return this.countryCode
            }
            ,
            r.setGeoCode = function(e) {
                e && "--" !== e && (this.countryCode = e,
                window.__$__GEO = e)
            }
            ,
            r.updateClustersConfig = function(e) {
                try {
                    n.extend(this.clusters_config, JSON.parse(e))
                } catch (e) {
                    window.console && window.console.log("Unable to process update")
                }
            }
            ,
            r.getGeoAccess = function(e, t, n, i, o, r) {
                return new s(this.clusters_config,o || ".zopim.com",this.countryCode,e,t,n,i,r || a)
            }
            ,
            e(t, "meshim_common_GeoAccessFactory"),
            t)
        }
        .call(e, l(1))
    }
    , function(r, e, s) {
        !function(a, i, e) {
            function t(e, t, n, i, o, r, s, a) {
                this.CLUSTERS = e.CLUSTERS,
                this.WEIGHTS = e.WEIGHTS,
                this.NEAR_MAP = e.NEAR_MAP,
                this.FALLBACKS = e.FALLBACKS,
                this.geo_code = n || "geo",
                this.default_domain = t,
                this.supported_domains = (a || []).concat(this.default_domain);
                e = c.map(this.supported_domains, l.escape);
                this.supported_proxy_re = new RegExp("^[a-z][a-z0-9_-]*(.[a-z][a-z0-9_-]*)*(" + e.join("|") + ")(:\\d+)?$","i"),
                this.cluster_hosts = [],
                this.host_list = [],
                this.host_index = 0,
                this.last_connected_host = o && this.getValidatedHost(o),
                this.override_proxy = i && this.getValidatedHost(i),
                this.num_primary_hosts = r || 0,
                this.num_fallback_hosts = s || 0,
                this.init()
            }
            var c, l, n, o;
            r.exports = (c = s(61),
            l = s(62),
            n = /^([a-z][a-z0-9_-]*)(:\d+)?$/i,
            (o = t.prototype).init = function() {
                var e = this.geo_code && this.geo_code in this.NEAR_MAP ? this.NEAR_MAP[this.geo_code] : this.NEAR_MAP.DEFAULT;
                if (!e)
                    throw "Error: no cluster code found for " + this.geo_code;
                if (e in this.CLUSTERS)
                    this._growClusterHosts(e, this.num_primary_hosts);
                else if (!this.override_proxy && !this.last_connected_host)
                    throw "Error: " + e + " has no cluster definition";
                if (e in this.FALLBACKS)
                    for (var t = this.FALLBACKS[e], n = 0, i = t.length; n < i; n++) {
                        var o = t[n];
                        o in this.CLUSTERS && this._growClusterHosts(o, this.num_fallback_hosts)
                    }
                this._makeHostList()
            }
            ,
            o._verifyHostInGeoConfig = function(t) {
                var n = this;
                return Object.keys(n.CLUSTERS).some(function(e) {
                    return n.CLUSTERS[e].some(function(e) {
                        return t === n.getValidatedHost(e)
                    })
                })
            }
            ,
            o._growClusterHosts = function(e, t) {
                var n = this.CLUSTERS[e]
                  , e = this.getWeights(e);
                c.shuffle(n, e),
                t && (n = n.slice(0, t)),
                this.cluster_hosts = this.cluster_hosts.concat(n)
            }
            ,
            o.getWeights = function(e) {
                if (!(e in this.CLUSTERS))
                    return [];
                var t = this.CLUSTERS[e]
                  , n = t.length
                  , i = new Array(n);
                if (this.WEIGHTS && this.WEIGHTS[e])
                    for (var o = this.WEIGHTS[e], r = n; r--; ) {
                        var s = t[r];
                        i[r] = a(o[s]) ? o[s] : 1
                    }
                else
                    for (r = n; r--; )
                        i[r] = 1;
                return i
            }
            ,
            o.getValidatedHost = function(e, t) {
                if (e) {
                    if (!t && n.test(e))
                        return this._expandSimpleHost(e);
                    if (this.supported_proxy_re.test(e))
                        return e
                }
                return !1
            }
            ,
            o._expandSimpleHost = function(e) {
                return e.replace(n, "$1" + this.default_domain + "$2")
            }
            ,
            o._makeHostList = function() {
                var t = this
                  , e = c.map(this.cluster_hosts, function(e) {
                    return t._expandSimpleHost(e)
                })
                  , n = [];
                this.override_proxy && n.push(this.override_proxy),
                this.last_connected_host && this.last_connected_host !== this.override_proxy && this._verifyHostInGeoConfig(this.last_connected_host) && n.push(this.last_connected_host),
                e = e.filter(function(e) {
                    return -1 === i(e, n)
                }),
                this.host_list = n.concat(e),
                this.host_index = 0
            }
            ,
            o.getHostList = function() {
                return this.host_list
            }
            ,
            o.getNextHost = function() {
                return this.host_index >= this.host_list.length ? "" : this.host_list[this.host_index++]
            }
            ,
            o.hasNext = function() {
                return this.host_index < this.host_list.length
            }
            ,
            o.rewind = function() {
                this.host_index = 0
            }
            ,
            o.pushHostToLast = function(e) {
                var e = this.getValidatedHost(e)
                  , e = i(e, this.host_list);
                -1 !== e && (e = this.host_list.splice(e, 1),
                this.host_list = this.host_list.concat(e))
            }
            ,
            e(t, "meshim_common_GeoAccess"),
            t)
        }
        .call(e, s(8), s(41), s(1))
    }
    , function(t, e, n) {
        !function(l, u, e) {
            function p(e, t) {
                if (l(t)) {
                    if (t.length === e.length)
                        return t.concat();
                    throw new window.Error("Invalid weights array: length does not match")
                }
                if (u(t))
                    return n(e, t);
                throw new window.Error("Invalid weights supplied")
            }
            function n(e, t, n) {
                var i, o, r;
                if (!l(e))
                    throw new TypeError(" arr is not an array");
                var s, a = Object(e), c = a.length >>> 0;
                if (!u(t))
                    throw new TypeError(t + " is not a function");
                for (2 < arguments.length && (i = n),
                o = new Array(c),
                r = 0; r < c; )
                    r in a && (s = a[r],
                    s = t.call(i, s, r, a),
                    o[r] = s),
                    r++;
                return o
            }
            t.exports = (e(e = {
                shuffle: function(e, t) {
                    if (t) {
                        var n, i, o, r, s, a = e, c = t, l = a.concat();
                        for (c = p(a, c),
                        a.length = 0,
                        s = 0,
                        n = c.length; n--; )
                            s += c[n];
                        for (o = Math.random() * s,
                        n = r = 0; l.length; )
                            r += c[n],
                            o <= r ? (s -= c[n],
                            i = l.splice(n, 1)[0],
                            c.splice(n, 1),
                            a.push(i),
                            o = Math.random() * s,
                            n = r = 0) : n++;
                        return a
                    }
                    for (var u, d, h = e, f = h.length; 1 < f; )
                        u = Math.floor(f-- * Math.random()),
                        d = h[u],
                        h[u] = h[f],
                        h[f] = d;
                    return h
                },
                random_index: function(e, t) {
                    if (!e || e.length <= 0)
                        return -1;
                    if (!t)
                        return Math.floor(Math.random() * e.length);
                    for (var n = 0, i = (t = p(e, t)).length; i--; )
                        n += t[i];
                    var o = Math.random() * n
                      , r = 0
                      , s = t.length;
                    for (i = 0; i < s - 1; i++)
                        if (o <= (r += t[i]))
                            return i;
                    return i
                },
                map: n
            }, "meshim_common_ArrayUtils"),
            e)
        }
        .call(e, n(19), n(6), n(1))
    }
    , function(i, e, t) {
        !function(e) {
            var t, n;
            i.exports = (t = "[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+([a-z0-9][a-z0-9-]*[a-z0-9])",
            n = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)",
            n = {
                email: new RegExp("^" + t + "$","i"),
                ip_token: new RegExp("^" + n + "$"),
                ip: new RegExp("^(?:" + n + "\\.){3}" + n + "$"),
                tld: /^(AERO|ARPA|ASIA|A[CDEFGILMNOQRSTUWXZ]|BIZ|B[ABDEFGHIJMNORSTVWYZ]|CAT|COM|COOP|C[ACDFGHIKLMNORUVXYZ]|D[EJKMOZ]|EDU|E[CEGRSTU]|F[IJKMOR]|GOV|G[ABDEFGHILMNPQRSTUWY]|H[KMNRTU]|INFO|INT|I[DELMNOQRST]|JOBS|J[EMOP]|K[EGHIMNPRWYZ]|L[ABCIKRSTUVY]||MIL|MOBI|MUSEUM|M[ACDEGHKLMNOPQRSTUVWXYZ]|NAME|NET|N[ACEFGILOPRUZ]|ORG|OM|PRO|P[AEFGHKLMNRSTWY]|QA|R[EOSUW]|S[ABCDEGHIJKLMNORTUVYZ]|TEL|TRAVEL|T[CDFGHJKLMNOPRTVWZ]|U[AGKSYZ]|V[ACEGINU]|W[FS]|XN|Y[ET]|Z[AMW])$/i,
                search: {
                    email: new RegExp("(^|\\s+)" + t,"ig"),
                    hurl: /(^|\s+)(?:(?:https?|ftps?):\/\/)(?:\S+)/gi,
                    url: /(^|\s+)(?:[\w-]+\.)+(\w{2,})(?::[0-9]+)?(?:\/\S*)?/g,
                    phone_number: /(?:^|\s+)(?:(?:\+?\d{1,3}|\(\d{1,3}\))([-.\s])?)?\d{3,10}(?:([-.\s])\d{3,10})?/gi
                },
                file_upload: /uploaded.+\n.+https?:\/\/v2uploads\.zopim\.(com|io)\//i,
                escape: function(e) {
                    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                }
            },
            e(n, "meshim_common_Regex"),
            n)
        }
        .call(e, t(1))
    }
    , function(n, e, t) {
        !function(e) {
            var t;
            n.exports = ((t = {
                SECOND: 1e3
            }).MINUTE = 60 * t.SECOND,
            t.HOUR = 60 * t.MINUTE,
            t.DAY = 24 * t.HOUR,
            t.WEEK = 7 * t.DAY,
            e(t, "meshim_common_Time"),
            t)
        }
        .call(e, t(1))
    }
    , function(a, e, t) {
        !function(t, e) {
            function n() {
                r++
            }
            function i() {
                r && o.write({
                    active$int: +new Date
                }),
                r = 0,
                window.setTimeout(i, s)
            }
            var o, r, s;
            a.exports = (r = 1,
            s = 2e4,
            e(e = {
                init: function(e) {
                    o = e.$("livechat").$("profile"),
                    t.document.on("mousemove", n),
                    t.window.on("click", n),
                    t.window.on("scroll", n),
                    t.window.on("keypress", n),
                    i()
                }
            }, "meshim_widget_controllers_Tracker"),
            e)
        }
        .call(e, t(3), t(1))
    }
    , function(t, e, l) {
        !function(r, e) {
            function i() {
                var t = this;
                return this.arr = [],
                this.validate = n.bind(this.validate, this),
                s.concat(["validateAndThrow", "validateAndLog"]).forEach(function(e) {
                    t.validate[e] = t[e].bind(t)
                }),
                this.validate
            }
            var n, c, o, s, a;
            t.exports = (n = l(47),
            c = window.Error,
            o = {
                any: function(i) {
                    return function(e) {
                        if (0 === i.length)
                            return !1;
                        for (var t = 0, n = i.length; t < n; t++)
                            if (!(0,
                            i[t])(e))
                                return !1;
                        return new c('Expect "' + e + '" to fulfill at least one condition')
                    }
                },
                equal: function(t) {
                    return function(e) {
                        if (e !== t)
                            return new c('expect "' + e + '" to equal "' + t + '"')
                    }
                },
                obj: function(s, a) {
                    return function(e) {
                        if ("object" != typeof e || !e)
                            return new c('Expect "' + e + '" to be an object');
                        if (a && a.requiredKeys)
                            for (var t = 0, n = a.requiredKeys.length; t < n; t++) {
                                var i = a.requiredKeys[t];
                                if (!(i in e))
                                    return new c('Expect key "' + i + '" to be defined')
                            }
                        for (var o in e)
                            if (e.hasOwnProperty(o)) {
                                var r = e[o]
                                  , o = s[o];
                                if (!o)
                                    continue;
                                if (o = o(r))
                                    return o
                            }
                    }
                },
                type: function(t) {
                    return function(e) {
                        if (typeof e !== t)
                            return new c('Expect "' + e + '" to have type "' + t + '"')
                    }
                },
                ok: function() {
                    return function(e) {
                        if (!e)
                            return new c('Expect "' + e + '" to be truthty')
                    }
                },
                chain: function(e) {
                    return e
                },
                regex: function(t) {
                    return function(e) {
                        if (t.lastIndex = 0,
                        !t.test(e))
                            return new c('Expect "' + e + '" to match predefined format')
                    }
                },
                array: function() {
                    return function(e) {
                        if (!r(e))
                            return new c('Expect "' + e + '" to be an Array')
                    }
                },
                each: function(o) {
                    return function(e) {
                        var t;
                        if (!r(e))
                            return new c('Expect "' + e + '" to be an Array');
                        for (var n = 0, i = e.length; n < i; n++)
                            if (t = o(e[n]))
                                return t
                    }
                }
            },
            s = Object.keys(o),
            a = i.prototype,
            s.forEach(function(t) {
                var n = o[t];
                i[t] = a[t] = function() {
                    var e;
                    return this instanceof i ? (e = n.apply(null, arguments),
                    this.arr.push(e),
                    this.validate) : (e = new i)[t].apply(e, arguments)
                }
            }),
            a.validate = function(e) {
                for (var t, n = 0, i = this.arr.length; n < i; n++)
                    if (t = (0,
                    this.arr[n])(e))
                        return t
            }
            ,
            a.validateAndThrow = function(e, t) {
                e = this.validate(e);
                if (t = t ? t + " - " : "",
                e)
                    throw new c(t + e.message)
            }
            ,
            a.validateAndLog = function(e, t) {
                var n, e = this.validate(e);
                if (t = t ? t + " - " : "",
                e)
                    return t = new c(t + e.message),
                    (n = window.console).error ? n.error(t) : n.log && n.log(t),
                    e
            }
            ,
            e(i, "meshim_widget_utils_Validator"),
            i)
        }
        .call(e, l(19), l(1))
    }
    ])
});
!function(e, t) {
    var n, o;
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self,
    n = e.Cookies,
    (o = e.Cookies = t()).noConflict = function() {
        return e.Cookies = n,
        o
    }
    )
}(this, function() {
    "use strict";
    function c(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n, o = arguments[t];
            for (n in o)
                e[n] = o[n]
        }
        return e
    }
    return function t(u, i) {
        function n(e, t, n) {
            if ("undefined" != typeof document) {
                "number" == typeof (n = c({}, i, n)).expires && (n.expires = new Date(Date.now() + 864e5 * n.expires)),
                n.expires && (n.expires = n.expires.toUTCString()),
                e = encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
                var o, r = "";
                for (o in n)
                    n[o] && (r += "; " + o,
                    !0 !== n[o]) && (r += "=" + n[o].split(";")[0]);
                return document.cookie = e + "=" + u.write(t, e) + r
            }
        }
        return Object.create({
            set: n,
            get: function(e) {
                if ("undefined" != typeof document && (!arguments.length || e)) {
                    for (var t = document.cookie ? document.cookie.split("; ") : [], n = {}, o = 0; o < t.length; o++) {
                        var r = t[o].split("=")
                          , i = r.slice(1).join("=");
                        try {
                            var c = decodeURIComponent(r[0]);
                            if (n[c] = u.read(i, c),
                            e === c)
                                break
                        } catch (e) {}
                    }
                    return e ? n[e] : n
                }
            },
            remove: function(e, t) {
                n(e, "", c({}, t, {
                    expires: -1
                }))
            },
            withAttributes: function(e) {
                return t(this.converter, c({}, this.attributes, e))
            },
            withConverter: function(e) {
                return t(c({}, this.converter, e), this.attributes)
            }
        }, {
            attributes: {
                value: Object.freeze(i)
            },
            converter: {
                value: Object.freeze(u)
            }
        })
    }({
        read: function(e) {
            return (e = '"' === e[0] ? e.slice(1, -1) : e).replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
        },
        write: function(e) {
            return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
        }
    }, {
        path: "/"
    })
});
let lang = $("html").prop("lang");
var currentGlobalResourceFile = "/api/data_table_i18n?lang=" + lang
  , resources = {};
$.ajax({
    dataType: "json",
    url: currentGlobalResourceFile,
    success: function(e) {
        resources = e
    }
});
let navbarScrollBreakPoint = 0;
$("header > div").each(function() {
    $(this).hasClass("stickyOnScroll") || (navbarScrollBreakPoint += $(this).outerHeight())
});
var cardCarouselBreakPointUnslick = 576
  , cardCarouselConfig = {
    dots: !1,
    speed: 500,
    autoplay: !1,
    autoplaySpeed: 2e3,
    focusOnSelect: !0,
    infinite: !0,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: "progressive",
    responsive: [{
        breakpoint: 1300,
        settings: {
            slidesToShow: 3
        }
    }, {
        breakpoint: 1024,
        settings: {
            slidesToShow: 2
        }
    }, {
        breakpoint: cardCarouselBreakPointUnslick,
        settings: "unslick"
    }]
}
  , logoGalleryBreakPointUnslick = (cardCarouselConfig.rtl = "ar" === lang,
$(".card-carousel").slick(cardCarouselConfig),
$(".card-carousel .slick-prev").hide(),
$(".card-carousel").on("afterChange", function(e, t, a, n) {
    0 !== a && $(".card-carousel .slick-prev").show()
}),
992)
  , logoGalleryConfig = {
    dots: !1,
    arrows: !1,
    speed: 500,
    autoplay: !0,
    autoplaySpeed: 1e3,
    infinite: !0,
    slidesToShow: 6,
    slidesToScroll: 1,
    rtl: !1,
    lazyLoad: "progressive",
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: !0
        }
    }, {
        breakpoint: logoGalleryBreakPointUnslick,
        settings: "unslick"
    }]
};
function collapsedDataTable() {
    $("table.dataTable.collapsed") && $.each($("table.dataTable.collapsed"), function() {
        $(this).find("tbody tr:first-child:not(.dt-hasChild) .dtr-control").click()
    })
}
logoGalleryConfig.rtl = "ar" === lang,
$(".logo-gallery").slick(logoGalleryConfig),
$(document).on("click", ".logo-gallery-container .pause", function() {
    $(this).css("visibility", "hidden"),
    $(".logo-gallery-container .play").css("visibility", "visible"),
    $(".logo-gallery-container .logo-gallery").slick("slickPause")
}),
$(document).on("click", ".logo-gallery-container .play", function() {
    $(this).css("visibility", "hidden"),
    $(".logo-gallery-container .pause").css("visibility", "visible"),
    $(".logo-gallery-container .logo-gallery").slick("slickPlay")
}),
function() {
    "use strict";
    var o = document.querySelectorAll(".needs-validation");
    if (Array.prototype.slice.call(o).forEach(function(t) {
        t.addEventListener("submit", function(e) {
            t.checkValidity() ? (e.preventDefault(),
            $("#subscription-form").addClass("d-none"),
            $(".success-message").removeClass("d-none")) : (e.preventDefault(),
            e.stopPropagation()),
            t.classList.add("was-validated")
        }, !1)
    }),
    $(".chat-enabled").length) {
        let e = $(".chat-enabled").attr("data-offline")
          , t = $(".chat-enabled").attr("data-online");
        var o = $(".chat-enabled").attr("data-subdomain")
          , l = $(".chat-enabled").attr("data-chatkey");
        let a = $(".chat-enabled").data("departments")
          , n = "egmsecurities.zendesk.com" === o;
        o = "equitisey.zendesk.com" === o;
        if (l && "None" !== l) {
            if (!window.zE) {
                var r = document
                  , s = "script";
                let t = window.zE = window.zEmbed = function() {
                    t._.push(arguments)
                }
                  , e = t.s = r.createElement(s)
                  , a = r.getElementsByTagName(s)[0];
                t.set = function(e) {
                    t.set._.push(e)
                }
                ,
                t._ = [],
                t.set._ = [],
                e.async = !0,
                e.setAttribute("charset", "utf-8"),
                e.src = "https://static.zdassets.com/ekr/asset_composer.js?key=" + l,
                t.t = +new Date,
                e.type = "text/javascript",
                a.parentNode.insertBefore(e, a)
            }
        } else if (n) {
            if (!window.zE) {
                r = document,
                s = "script";
                let t = window.zE = window.zEmbed = function() {
                    t._.push(arguments)
                }
                  , e = t.s = r.createElement(s)
                  , a = r.getElementsByTagName(s)[0];
                t.set = function(e) {
                    t.set._.push(e)
                }
                ,
                t._ = [],
                t.set._ = [],
                e.async = !0,
                e.setAttribute("charset", "utf-8"),
                e.src = "https://static.zdassets.com/ekr/asset_composer.js?key=65869e6d-cfdc-450f-b70b-5a4c362d06a4",
                t.t = +new Date,
                e.type = "text/javascript",
                a.parentNode.insertBefore(e, a)
            }
        } else if (o) {
            if (!window.zE) {
                l = document,
                o = "script";
                let t = window.zE = window.zEmbed = function() {
                    t._.push(arguments)
                }
                  , e = t.s = l.createElement(o)
                  , a = l.getElementsByTagName(o)[0];
                t.set = function(e) {
                    t.set._.push(e)
                }
                ,
                t._ = [],
                t.set._ = [],
                e.async = !0,
                e.setAttribute("charset", "utf-8"),
                e.src = "https://static.zdassets.com/ekr/asset_composer.js?key=19469ee5-12bb-429d-8b2c-e931dac2bf39",
                t.t = +new Date,
                e.type = "text/javascript",
                a.parentNode.insertBefore(e, a)
            }
        } else if (!window.zE) {
            l = document,
            o = "script";
            let t = window.zE = window.zEmbed = function() {
                t._.push(arguments)
            }
              , e = t.s = l.createElement(o)
              , a = l.getElementsByTagName(o)[0];
            t.set = function(e) {
                t.set._.push(e)
            }
            ,
            t._ = [],
            t.set._ = [],
            e.async = !0,
            e.setAttribute("charset", "utf-8"),
            e.src = "js/asset_composer.js?key=32989c05-f4da-4bb2-8ca1-46a3bd8516fa",
            t.t = +new Date,
            e.type = "text/javascript",
            a.parentNode.insertBefore(e, a)
        }
        let i = setInterval(function() {
            void 0 !== window.$zopim && void 0 !== window.$zopim.livechat && ($zopim(function() {
                $zopim.livechat.connectOnPageLoad = !1,
                n && $zopim.livechat.concierge.setAvatar("assets/images/logo/fav.png"),
                a && ("number" == typeof a ? $zopim.livechat.departments.filter(a) : $zopim.livechat.departments.filter.apply(null, a.split(",").filter(e => e.trim().length && !isNaN(e)).map(Number))),
                $zopim.livechat.setLanguage(lang),
                "ar" === lang && ($zopim.livechat.button.setPosition("bl"),
                $zopim.livechat.button.setPositionMobile("bl")),
                t && e && $zopim.livechat.setGreetings({
                    online: t,
                    offline: e
                })
            }),
            clearInterval(i))
        }, 100)
    }
    l = $.cookie("geoLocationClosed"),
    void 0 !== l && "true" === l && $("#GeoLocationContainer").hide(),
    o = $.cookie("alertBannerClosed");
    void 0 !== o && "true" === o && $("#alertBannerContainer").hide()
}();
let tag = document.createElement("script")
  , firstScriptTag = (tag.src = "https://www.youtube.com/iframe_api",
document.getElementsByTagName("script")[0]);
function removeSkeletonLoader() {
    $(".skeleton-loader").removeClass("skeleton-loader")
}
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag),
$(document).on("click", "#GeoLocationContainer  .dropdown-item", function() {
    $("#GeoLocationContainer  .dropdown-item").each(function() {
        $(this).removeClass("selected")
    }),
    $(this).addClass("selected");
    var e = $(this).attr("label")
      , e = ($(this).parents(".eq-select").find("#geo-location-country-list").html(e),
    $(this).attr("href"));
    $(this).parents("#GeoLocationContainer").find("#geo-location-country-link").attr("href", e)
}),
$(window).resize(function() {
    var e = $(this).width()
      , e = (logoGalleryBreakPointUnslick < e & !$(".logo-gallery").hasClass("slick-initialized") && $(".logo-gallery").slick(logoGalleryConfig),
    cardCarouselBreakPointUnslick < e);
    e & !$(".card-carousel").hasClass("slick-initialized") && $(".card-carousel").slick(cardCarouselConfig)
}),
$(document).on("click", "#closeGeoLocation", function() {
    $.cookie("geoLocationClosed", "true")
}),
$(document).on("click", "#alertBannerClosed", function() {
    $.cookie("alertBannerClosed", "true")
}),
document.addEventListener("DOMContentLoaded", function() {
    handleApplicationLinks(),
    removeSkeletonLoader()
});
var offcanvasTop = 0;
function handleMenuTop(e) {
    offcanvasTop = 0,
    $(window).scrollTop() >= navbarScrollBreakPoint && !safariAgent || (offcanvasTop = (offcanvasTop = (offcanvasTop += $("#alertBannerContainer").length && !$("#alertBannerContainer").is(":hidden") ? $("#alertBannerContainer").outerHeight() : 0) + ($(".navbar-nav.secondary_nav").length ? $(".navbar-nav.secondary_nav").outerHeight() : 0)) + ($("#GeoLocationContainer").length && !$("#GeoLocationContainer").is(":hidden") ? $("#GeoLocationContainer").outerHeight() : 0),
    safariAgent) || (offcanvasTop -= $(window).scrollTop()),
    offcanvasTop = (offcanvasTop += $(".navbar.navbar-light").length ? $(".navbar.navbar-light").outerHeight() : 0) + ($("#riskDisclaimerContainer").length ? $("#riskDisclaimerContainer").outerHeight() : 0),
    $("#" + e).css({
        cssText: `padding-top: ${offcanvasTop}px; visibility: visible;`
    }),
    $("nav.navbar .navbar-login-menu").hasClass("bg-white") || $("nav.navbar .navbar-login-menu").addClass("bg-white")
}
function handleOffcanvasBackdrop() {
    $(".offcanvas-backdrop").css("top", offcanvasTop)
}
if ($("#navbarNavAltMarkup").length) {
    let e = document.getElementById("navbarNavAltMarkup");
    e.addEventListener("show.bs.offcanvas", function() {
        $('button[data-bs-target="#navbarNavAltMarkup"]').attr("aria-expanded", !0),
        e.previousElementSibling.getElementsByClassName("btn-primary-cta").length && (e.previousElementSibling.getElementsByClassName("btn-primary-cta")[0].style.opacity = 0),
        handleMenuTop("navbarNavAltMarkup"),
        $("body").addClass("p-0")
    }),
    e.addEventListener("shown.bs.offcanvas", function() {
        handleOffcanvasBackdrop(),
        safariAgent && (handleSafariScroll("shown"),
        e.addEventListener("pointermove", function(e) {
            e.preventDefault()
        }),
        e.addEventListener("touchmove", function(e) {
            e.preventDefault()
        }))
    }),
    e.addEventListener("hide.bs.offcanvas", function() {
        $('button[data-bs-target="#navbarNavAltMarkup"]').attr("aria-expanded", !1),
        e.previousElementSibling.getElementsByClassName("btn-primary-cta").length && (e.previousElementSibling.getElementsByClassName("btn-primary-cta")[0].style.opacity = 1),
        safariAgent && (handleSafariScroll("hide"),
        e.addEventListener("pointermove", function(e) {
            e.preventDefault()
        }),
        e.addEventListener("touchmove", function(e) {
            e.preventDefault()
        })),
        $("body").removeClass("p-0")
    })
}
if ($("#navbarNavSignIn").length) {
    let e = document.getElementById("navbarNavSignIn");
    e.addEventListener("shown.bs.offcanvas", function() {
        $('button[data-bs-target="#navbarNavSignIn"]').attr("aria-expanded", !0),
        handleMenuTop("navbarNavSignIn"),
        $("body").addClass("p-0")
    }),
    e.addEventListener("shown.bs.offcanvas", function() {
        handleOffcanvasBackdrop(),
        safariAgent && (handleSafariScroll("shown"),
        e.addEventListener("pointermove", function(e) {
            e.preventDefault()
        }),
        e.addEventListener("touchmove", function(e) {
            e.preventDefault()
        }))
    }),
    e.addEventListener("hide.bs.offcanvas", function() {
        $('button[data-bs-target="#navbarNavSignIn"]').attr("aria-expanded", !1),
        safariAgent && (handleSafariScroll("hide"),
        e.addEventListener("pointermove", function(e) {
            e.preventDefault()
        }),
        e.addEventListener("touchmove", function(e) {
            e.preventDefault()
        })),
        $("body").removeClass("p-0")
    })
}
$(window).scroll(function() {
    $(window).scrollTop() >= navbarScrollBreakPoint ? ($("header > div").each(function() {
        $(this).hasClass("stickyOnScroll") || $(this).hasClass("d-none") && $(this).hasClass("d-lg-none") || $(this).addClass("d-lg-none d-none")
    }),
    $("nav.navbar .navbar-login-menu").hasClass("bg-white") && $("nav.navbar .navbar-login-menu").removeClass("bg-white")) : ($("header > div").each(function() {
        !$(this).hasClass("stickyOnScroll") && $(this).hasClass("d-none") && $(this).hasClass("d-lg-none") && $(this).removeClass("d-lg-none d-none")
    }),
    $("nav.navbar .navbar-login-menu").hasClass("bg-white") || $("nav.navbar .navbar-login-menu").addClass("bg-white"))
});
var initValue = nextCounter = pervCounter = scrollerItems = windowWidth = singleItemWidth = extraSpaceFromRightSid = numberOfItemsVisible = numberOfClickAvailable = gap = 0;
const containerWidth = 1200;
var equitiCarusole = {};
function initVariablesCarusole(e) {
    var t = e.parents(".cards-scroller").attr("id");
    scrollerItems = e.find("[equiti-carousel-item]").length,
    windowWidth = $(window).width(),
    gap = 24,
    singleItemWidth = e.find("[equiti-carousel-item]").width() + gap,
    extraSpaceFromRightSide = (windowWidth - containerWidth) / 2 < 0 ? 0 : (windowWidth - containerWidth) / 2,
    numberOfItemsVisible = Math.floor((Math.min(containerWidth, windowWidth) + extraSpaceFromRightSide) / singleItemWidth),
    equitiCarusole["numberOfClickAvailable-" + t] = scrollerItems - numberOfItemsVisible,
    numberOfItemsVisible >= scrollerItems ? $("#" + t).find(".paddlenav-arrow-next").prop("disabled", "disabled") : $("#" + t).find(".paddlenav-arrow-next").prop("disabled", !1),
    equitiCarusole["nextCounter-" + t] = equitiCarusole["pervCounter-" + t] = equitiCarusole["initValue-" + t] = 0
}
$(document).on("click", ".paddlenav-arrow", function() {
    var e, t = $(this).parents(".cards-scroller").attr("id");
    $(this).hasClass("paddlenav-arrow-next") && equitiCarusole["nextCounter-" + t] <= equitiCarusole["numberOfClickAvailable-" + t] ? (equitiCarusole["nextCounter-" + t] += 1,
    equitiCarusole["pervCounter-" + t] = 0 < equitiCarusole["pervCounter-" + t] ? --equitiCarusole["pervCounter-" + t] : 0,
    "ar" == lang ? equitiCarusole["initValue-" + t] += singleItemWidth : equitiCarusole["initValue-" + t] -= singleItemWidth,
    e = "matrix(1, 0, 0, 1, " + equitiCarusole["initValue-" + t] + ", 0)",
    $("#" + t).find(".rf-cards-scroller-platter").css("transform", e),
    $("#" + t).find(".paddlenav-arrow-previous").removeAttr("disabled"),
    equitiCarusole["nextCounter-" + t] == equitiCarusole["numberOfClickAvailable-" + t] && $(this).prop("disabled", "disabled")) : $(this).hasClass("paddlenav-arrow-previous") && equitiCarusole["pervCounter-" + t] <= equitiCarusole["numberOfClickAvailable-" + t] && 0 != equitiCarusole["nextCounter-" + t] && (equitiCarusole["pervCounter-" + t] += 1,
    equitiCarusole["nextCounter-" + t] = 0 < equitiCarusole["nextCounter-" + t] ? --equitiCarusole["nextCounter-" + t] : 0,
    "ar" === lang ? equitiCarusole["initValue-" + t] -= singleItemWidth : equitiCarusole["initValue-" + t] += singleItemWidth,
    e = "matrix(1, 0, 0, 1, " + equitiCarusole["initValue-" + t] + ", 0)",
    $("#" + t).find(".rf-cards-scroller-platter").css("transform", e),
    $("#" + t).find(".paddlenav-arrow-next").removeAttr("disabled"),
    equitiCarusole["pervCounter-" + t] != equitiCarusole["numberOfClickAvailable-" + t] && 0 != equitiCarusole["nextCounter-" + t] || $(this).attr("disabled", "disabled"))
}),
$(document).ready(function() {
    $("[equiti-carousel]").length && $("[equiti-carousel]").each(function() {
        initVariablesCarusole($(this))
    }),
    syncHeight();
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(e) {
        return new bootstrap.Tooltip(e)
    });
    var e = document.querySelectorAll('a[href^="#"]');
    let a = $("nav.navbar").outerHeight() + 10;
    e.forEach(t => {
        t.addEventListener("click", e => {
            e.preventDefault();
            e = t.getAttribute("href").replace("#", ""),
            e = document.getElementById(e).offsetTop - a;
            window.scrollTo({
                top: e,
                behavior: "smooth"
            })
        }
        )
    }
    )
});
const userAgentString = navigator.userAgent.toLowerCase();
let chromeAgent = -1 < userAgentString.indexOf("chrome")
  , safariAgent = -1 < userAgentString.indexOf("safari");
chromeAgent && (safariAgent = safariAgent && !1);
let scrollY;
function handleSafariScroll(e) {
    "shown" === e ? (scrollY = window.scrollY,
    document.documentElement.classList.add("is-locked")) : (document.documentElement.classList.remove("is-locked"),
    window.scrollTo(0, scrollY))
}
function syncHeight() {
    document.documentElement.style.setProperty("--window-inner-height", window.innerHeight + "px")
}
function drawLengthMenu(e, t) {
    var e = $(".table_id_" + e).parents(".dataTables_wrapper").prop("id")
      , a = $("#" + e).find(".dataTables_length")
      , n = $("#" + e).find(".lengthMenu-select");
    if (a.length && 0 === n.length) {
        a.find(".form-select.form-select-sm").addClass("d-none");
        var n = document.createElement("div")
          , i = (n.style.display = "inline-flex",
        n.className = "eq-select-datatable lengthMenu-select",
        document.createElement("div"))
          , o = (i.className = "dropdown",
        document.createElement("div"))
          , l = (o.className = "dropdown-toggle dropdown-item-selected gap-2",
        o.setAttribute("id", e + "-dropdown-page-lengthMenu"),
        o.setAttribute("aria-labelledby", e + "-dropdown-page-lengthMenu"),
        o.setAttribute("data-bs-toggle", "dropdown"),
        document.createElement("div"))
          , r = (l.className = "dropdown-menu",
        l.setAttribute("aria-labelledby", e + "-dropdown-list-lengthMenu"),
        document.createElement("ul"))
          , s = (r.setAttribute("id", e + "-dropdown-list-lengthMenu"),
        l.appendChild(r),
        i.appendChild(o),
        i.appendChild(l),
        a.find("select option").length);
        for (let e = 0; e < s; e++) {
            var d = document.createElement("li");
            d.className = "dropdown-item",
            d.innerHTML = a.find(`select option:eq(${e})`).val(),
            0 === e && (o.innerHTML = a.find(`select option:eq(${e})`).val()),
            r.appendChild(d)
        }
        n.appendChild(i),
        a[0].appendChild(n)
    }
    if ($("#" + e).find(".eq-select-datatable.paginate-select").length) {
        var c = Math.ceil(t.fnRecordsDisplay() / t._iDisplayLength)
          , u = Math.ceil(t._iDisplayStart / t._iDisplayLength) + 1
          , p = t.aanFeatures.p;
        for (let e = 0, t = p.length; e < t; e++) {
            var h = p[e].getElementsByTagName("ul")
              , g = p[e].getElementsByClassName("dropdown-toggle")
              , f = p[e].getElementsByTagName("select")
              , m = document.createElement("option")
              , v = f[0];
            if (h[0].childElementCount !== c) {
                h[0].innerHTML = "";
                for (let e = 0; e < c; e++) {
                    var b = document.createElement("li");
                    b.className = "dropdown-item",
                    b.innerHTML = e + 1;
                    try {
                        h[0].appendChild(b)
                    } catch (e) {
                        v.add(m)
                    }
                }
            }
            g[0].innerHTML = u
        }
    }
}
function drawPaginationDropdownMenu(e, t) {
    var e = $(".table_id_" + e).parents(".dataTables_wrapper").prop("id")
      , a = document.createElement("div")
      , n = Math.ceil(t.fnRecordsDisplay() / t._iDisplayLength)
      , i = document.createElement("div")
      , o = document.createElement("div")
      , l = document.createElement("ul")
      , r = document.createElement("div");
    r.style.display = "inline",
    r.className = "eq-select-datatable paginate-select",
    a.className = "dropdown",
    i.className = "dropdown-toggle dropdown-item-selected gap-2",
    i.setAttribute("id", t.sTableId + "-dropdown-page"),
    i.setAttribute("aria-labelledby", t.sTableId + "-dropdown-page"),
    i.setAttribute("data-bs-toggle", "dropdown"),
    i.innerHTML = "1",
    o.className = "dropdown-menu",
    o.setAttribute("aria-labelledby", t.sTableId + "-dropdown-list"),
    l.setAttribute("id", t.sTableId + "-dropdown-list"),
    o.appendChild(l),
    a.appendChild(i),
    a.appendChild(o);
    for (let e = 1; e <= n; e++) {
        var s = document.createElement("li");
        s.className = "dropdown-item",
        s.innerHTML = e,
        l.appendChild(s)
    }
    r.appendChild(a);
    t = $("#" + e).find(".dataTables_paginate")[0];
    t && ($("#" + e).find(".dataTables_paginate select").addClass("d-none"),
    t.prepend(r))
}
window.addEventListener("resize", syncHeight),
$(document).on("click", ".see-all-btn", function() {
    var e, t = $(this).parents(".swap-container").find("table");
    t.length && ((e = (t = t.dataTable()).fnSettings())._iDisplayLength = e.fnRecordsTotal(),
    t.fnDraw(),
    $(this).parents(".row").remove())
}),
$(document).on("click", ".eq-select-datatable.paginate-select .dropdown-item", function() {
    var e = $(this)[0].innerHTML
      , t = $(this).parents(".dataTables_wrapper").prop("id");
    $("#" + t + " .paging_listboxWithButtons").find(".dropdown-toggle")[0].innerHTML = e,
    $("#" + t + " .paging_listboxWithButtons").find("select").val(e).change()
}),
$(document).on("click", ".eq-select-datatable.lengthMenu-select .dropdown-item", function() {
    var e = $(this)[0].innerHTML
      , t = $(this).parents(".dataTables_wrapper").prop("id");
    $("#" + t + " .dataTables_length").find(".dropdown-toggle")[0].innerHTML = e,
    $("#" + t + " .dataTables_length").find("select").val(e).change()
}),
$('ul[aria-labelledby*="language_navbar_Link').each( (e, t) => {
    $(t).find("li").each( (e, t) => {
        $(t).find('a[href*="-tl"]').text("Tagalog")
    }
    )
}
);
!function(e) {
    var t = function(n, f, s) {
        "use strict";
        var m, y, z, D, i, h, e, c, k, o, H, O, a, P, r, u, g, p, v, C, b, $, A, t, q, I, l, d, U, j, G, E, _, J, w, K, Q, V, M, N, L, x, X, Y, Z, ee, te, W, ae, ne, ie, se, S, B, T, oe, F, re, le, de, R, ce, ue, fe, me, ye, ze, he, ge = {
            lazyClass: "lazyload",
            loadedClass: "lazyloaded",
            loadingClass: "lazyloading",
            preloadClass: "lazypreload",
            errorClass: "lazyerror",
            autosizesClass: "lazyautosizes",
            fastLoadedClass: "ls-is-cached",
            iframeLoadMode: 0,
            srcAttr: "data-src",
            srcsetAttr: "data-srcset",
            sizesAttr: "data-sizes",
            minSize: 40,
            customMedia: {},
            init: !0,
            expFactor: 1.5,
            hFac: .8,
            loadMode: 2,
            loadHidden: !0,
            ricTimeout: 0,
            throttleDelay: 125
        };
        for (he in y = n.lazySizesConfig || n.lazysizesConfig || {},
        ge)
            he in y || (y[he] = ge[he]);
        return f && f.getElementsByClassName ? (z = f.documentElement,
        D = n.HTMLPictureElement,
        h = "getAttribute",
        e = n[i = "addEventListener"].bind(n),
        c = n.setTimeout,
        k = n.requestAnimationFrame || c,
        o = n.requestIdleCallback,
        H = /^picture$/i,
        O = ["load", "error", "lazyincluded", "_lazyloaded"],
        a = {},
        P = Array.prototype.forEach,
        r = function(e, t) {
            return a[t] || (a[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")),
            a[t].test(e[h]("class") || "") && a[t]
        }
        ,
        u = function(e, t) {
            r(e, t) || e.setAttribute("class", (e[h]("class") || "").trim() + " " + t)
        }
        ,
        g = function(e, t) {
            (t = r(e, t)) && e.setAttribute("class", (e[h]("class") || "").replace(t, " "))
        }
        ,
        p = function(t, a, e) {
            var n = e ? i : "removeEventListener";
            e && p(t, a),
            O.forEach(function(e) {
                t[n](e, a)
            })
        }
        ,
        v = function(e, t, a, n, i) {
            var s = f.createEvent("Event");
            return (a = a || {}).instance = m,
            s.initEvent(t, !n, !i),
            s.detail = a,
            e.dispatchEvent(s),
            s
        }
        ,
        C = function(e, t) {
            var a;
            !D && (a = n.picturefill || y.pf) ? (t && t.src && !e[h]("srcset") && e.setAttribute("srcset", t.src),
            a({
                reevaluate: !0,
                elements: [e]
            })) : t && t.src && (e.src = t.src)
        }
        ,
        b = function(e, t) {
            return (getComputedStyle(e, null) || {})[t]
        }
        ,
        $ = function(e, t, a) {
            for (a = a || e.offsetWidth; a < y.minSize && t && !e._lazysizesWidth; )
                a = t.offsetWidth,
                t = t.parentNode;
            return a
        }
        ,
        ye = [],
        ze = me = [],
        Ne._lsFlush = Me,
        A = Ne,
        t = function(a, e) {
            return e ? function() {
                A(a)
            }
            : function() {
                var e = this
                  , t = arguments;
                A(function() {
                    a.apply(e, t)
                })
            }
        }
        ,
        q = function(e) {
            function t() {
                var e = s.now() - n;
                e < 99 ? c(t, 99 - e) : (o || i)(i)
            }
            var a, n, i = function() {
                a = null,
                e()
            };
            return function() {
                n = s.now(),
                a = a || c(t, 99)
            }
        }
        ,
        ne = /^img$/i,
        ie = /^iframe$/i,
        se = "onscroll"in n && !/(gle|ing)bot/.test(navigator.userAgent),
        T = -1,
        oe = function(e) {
            return (X = null == X ? "hidden" == b(f.body, "visibility") : X) || !("hidden" == b(e.parentNode, "visibility") && "hidden" == b(e, "visibility"))
        }
        ,
        Y = Ce,
        ee = B = S = 0,
        te = y.throttleDelay,
        W = y.ricTimeout,
        ae = o && 49 < W ? function() {
            o(be, {
                timeout: W
            }),
            W !== y.ricTimeout && (W = y.ricTimeout)
        }
        : t(function() {
            c(be)
        }, !0),
        re = t(Ae),
        le = function(e) {
            re({
                target: e.target
            })
        }
        ,
        de = t(function(t, e, a, n, i) {
            var s, o, r, l, d;
            (o = v(t, "lazybeforeunveil", e)).defaultPrevented || (n && (a ? u(t, y.autosizesClass) : t.setAttribute("sizes", n)),
            a = t[h](y.srcsetAttr),
            n = t[h](y.srcAttr),
            i && (s = (l = t.parentNode) && H.test(l.nodeName || "")),
            r = e.firesLoad || "src"in t && (a || n || s),
            o = {
                target: t
            },
            u(t, y.loadingClass),
            r && (clearTimeout(J),
            J = c(ve, 2500),
            p(t, le, !0)),
            s && P.call(l.getElementsByTagName("source"), Ee),
            a ? t.setAttribute("srcset", a) : n && !s && (ie.test(t.nodeName) ? (e = n,
            0 == (d = (l = t).getAttribute("data-load-mode") || y.iframeLoadMode) ? l.contentWindow.location.replace(e) : 1 == d && (l.src = e)) : t.src = n),
            i && (a || s) && C(t, {
                src: n
            })),
            t._lazyRace && delete t._lazyRace,
            g(t, y.lazyClass),
            A(function() {
                var e = t.complete && 1 < t.naturalWidth;
                r && !e || (e && u(t, y.fastLoadedClass),
                Ae(o),
                t._lazyCache = !0,
                c(function() {
                    "_lazyCache"in t && delete t._lazyCache
                }, 9)),
                "lazy" == t.loading && B--
            }, !0)
        }),
        ce = q(function() {
            y.loadMode = 3,
            F()
        }),
        I = {
            _: function() {
                K = s.now(),
                m.elements = f.getElementsByClassName(y.lazyClass),
                E = f.getElementsByClassName(y.lazyClass + " " + y.preloadClass),
                e("scroll", F, !0),
                e("resize", F, !0),
                e("pageshow", function(e) {
                    var t;
                    e.persisted && (t = f.querySelectorAll("." + y.loadingClass)).length && t.forEach && k(function() {
                        t.forEach(function(e) {
                            e.complete && R(e)
                        })
                    })
                }),
                n.MutationObserver ? new MutationObserver(F).observe(z, {
                    childList: !0,
                    subtree: !0,
                    attributes: !0
                }) : (z[i]("DOMNodeInserted", F, !0),
                z[i]("DOMAttrModified", F, !0),
                setInterval(F, 999)),
                e("hashchange", F, !0),
                ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(e) {
                    f[i](e, F, !0)
                }),
                /d$|^c/.test(f.readyState) ? we() : (e("load", we),
                f[i]("DOMContentLoaded", F),
                c(we, 2e4)),
                m.elements.length ? (Ce(),
                A._lsFlush()) : F()
            },
            checkElems: F = function(e) {
                var t;
                (e = !0 === e) && (W = 33),
                Z || (Z = !0,
                (t = te - (s.now() - ee)) < 0 && (t = 0),
                e || t < 9 ? ae() : c(ae, t))
            }
            ,
            unveil: R = function(e) {
                var t, a, n, i;
                e._lazyRace || !(!(i = "auto" == (n = (a = ne.test(e.nodeName)) && (e[h](y.sizesAttr) || e[h]("sizes")))) && _ || !a || !e[h]("src") && !e.srcset || e.complete || r(e, y.errorClass)) && r(e, y.lazyClass) || (t = v(e, "lazyunveilread").detail,
                i && l.updateElem(e, !0, e.offsetWidth),
                e._lazyRace = !0,
                B++,
                de(e, t, i, n, a))
            }
            ,
            _aLSL: _e
        },
        j = t(function(e, t, a, n) {
            var i, s, o;
            if (e._lazysizesWidth = n,
            e.setAttribute("sizes", n += "px"),
            H.test(t.nodeName || ""))
                for (s = 0,
                o = (i = t.getElementsByTagName("source")).length; s < o; s++)
                    i[s].setAttribute("sizes", n);
            a.detail.dataAttr || C(e, a.detail)
        }),
        l = {
            _: function() {
                U = f.getElementsByClassName(y.autosizesClass),
                e("resize", G)
            },
            checkElems: G = q(function() {
                var e, t = U.length;
                if (t)
                    for (e = 0; e < t; e++)
                        pe(U[e])
            }),
            updateElem: pe
        },
        d = function() {
            !d.i && f.getElementsByClassName && (d.i = !0,
            l._(),
            I._())
        }
        ,
        c(function() {
            y.init && d()
        }),
        m = {
            cfg: y,
            autoSizer: l,
            loader: I,
            init: d,
            uP: C,
            aC: u,
            rC: g,
            hC: r,
            fire: v,
            gW: $,
            rAF: A
        }) : {
            init: function() {},
            cfg: y,
            noSupport: !0
        };
        function pe(e, t, a) {
            var n = e.parentNode;
            n && (a = $(e, n, a),
            (t = v(e, "lazybeforesizes", {
                width: a,
                dataAttr: !!t
            })).defaultPrevented || (a = t.detail.width) && a !== e._lazysizesWidth && j(e, n, t, a))
        }
        function ve(e) {
            B--,
            e && !(B < 0) && e.target || (B = 0)
        }
        function Ce() {
            var e, t, a, n, i, s, o, r, l, d, c, u = m.elements;
            if ((w = y.loadMode) && B < 8 && (e = u.length)) {
                for (t = 0,
                T++; t < e; t++)
                    if (u[t] && !u[t]._lazyRace)
                        if (!se || m.prematureUnveil && m.prematureUnveil(u[t]))
                            R(u[t]);
                        else if ((o = u[t][h]("data-expand")) && (i = +o) || (i = S),
                        l || (l = !y.expand || y.expand < 1 ? 500 < z.clientHeight && 500 < z.clientWidth ? 500 : 370 : y.expand,
                        d = (m._defEx = l) * y.expFactor,
                        c = y.hFac,
                        X = null,
                        S < d && B < 1 && 2 < T && 2 < w && !f.hidden ? (S = d,
                        T = 0) : S = 1 < w && 1 < T && B < 6 ? l : 0),
                        r !== i && (Q = innerWidth + i * c,
                        V = innerHeight + i,
                        s = -1 * i,
                        r = i),
                        d = u[t].getBoundingClientRect(),
                        (x = d.bottom) >= s && (M = d.top) <= V && (L = d.right) >= s * c && (N = d.left) <= Q && (x || L || N || M) && (y.loadHidden || oe(u[t])) && (_ && B < 3 && !o && (w < 3 || T < 4) || function(e, t) {
                            var a, n = e, i = oe(e);
                            for (M -= t,
                            x += t,
                            N -= t,
                            L += t; i && (n = n.offsetParent) && n != f.body && n != z; )
                                (i = 0 < (b(n, "opacity") || 1)) && "visible" != b(n, "overflow") && (a = n.getBoundingClientRect(),
                                i = L > a.left && N < a.right && x > a.top - 1 && M < a.bottom + 1);
                            return i
                        }(u[t], i))) {
                            if (R(u[t]),
                            n = !0,
                            9 < B)
                                break
                        } else
                            !n && _ && !a && B < 4 && T < 4 && 2 < w && (E[0] || y.preloadAfterLoad) && (E[0] || !o && (x || L || N || M || "auto" != u[t][h](y.sizesAttr))) && (a = E[0] || u[t]);
                a && !n && R(a)
            }
        }
        function be() {
            Z = !1,
            ee = s.now(),
            Y()
        }
        function Ae(e) {
            var t = e.target;
            t._lazyCache ? delete t._lazyCache : (ve(e),
            u(t, y.loadedClass),
            g(t, y.loadingClass),
            p(t, le),
            v(t, "lazyloaded"))
        }
        function Ee(e) {
            var t, a = e[h](y.srcsetAttr);
            (t = y.customMedia[e[h]("data-media") || e[h]("media")]) && e.setAttribute("media", t),
            a && e.setAttribute("srcset", a)
        }
        function _e() {
            3 == y.loadMode && (y.loadMode = 2),
            ce()
        }
        function we() {
            _ || (s.now() - K < 999 ? c(we, 999) : (_ = !0,
            y.loadMode = 3,
            F(),
            e("scroll", _e, !0)))
        }
        function Me() {
            var e = ze;
            for (ze = me.length ? ye : me,
            fe = !(ue = !0); e.length; )
                e.shift()();
            ue = !1
        }
        function Ne(e, t) {
            ue && !t ? e.apply(this, arguments) : (ze.push(e),
            fe || (fe = !0,
            (f.hidden ? c : k)(Me)))
        }
    }(e, e.document, Date);
    e.lazySizes = t,
    "object" == typeof module && module.exports && (module.exports = t)
}("undefined" != typeof window ? window : {});
