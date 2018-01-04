define(
  "sampleapp/appui/components/new_moviecategorycomponent",
    [
        'antie/widgets/component',
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/verticallist",
        'antie/widgets/carousel',
        'antie/widgets/carousel/strips/cullingstrip',
        'antie/widgets/carousel/binder',
        'antie/widgets/carousel/keyhandlers/activatefirsthandler',
        'antie/datasource',
        'antie/runtimecontext',
        "antie/widgets/image",
        'sampleapp/appui/formatters/tmdb',
        'sampleapp/appui/datasources/tmdb'  
    ],
    function (        
        Component,
        Button, 
        Label,
        VerticalList,
        Carousel,
        CullingStrip,
        Binder,
        ActivateFirstHandler,
        DataSource,
        RuntimeContext,
        Image,
        tmDBFormatter,
        tmDBFeed
        ) 
    {
        'use strict';
        
        var app = RuntimeContext.getCurrentApplication(),device = RuntimeContext.getDevice();

        return Component.extend({
            init: function init () {
                var self = this;

                init.base.call(this, "new_moviecategorycomponent");

                // component events
                this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
                this._onBeforeRender && this.addEventListener('beforerender', this._onBeforeRender.bind(this));
                this._onBeforeShow && this.addEventListener('beforeshow', this._onBeforeShow.bind(this));
                this._onAfterShow && this.addEventListener('aftershow', this._onAfterShow.bind(this));
                this._onBeforeHide && this.addEventListener('beforehide', this._onBeforeHide.bind(this));
                this._onAfterHide && this.addEventListener('afterhide', this._onAfterHide.bind(this));

                // bound removable listener
                this._onDataBound = this._onDataBound.bind(this);
                this._onCarouselSelectBound = this._onCarouselSelect.bind(this);

            },

            _onLoad: function (evt) {
                // console.log("Selected Event :"+JSON.stringify(evt.args));
                var Loader = new Image("loader", "static/img/loader.gif" , { width : 170, height: 150});
                this.appendChildWidget(Loader);

                var InnerLogoLabel = new Label("InnerLogoLabel", "");
                this.appendChildWidget(InnerLogoLabel);

                // create widgets
                var carousel = new Carousel('horizontal-video-carrousel', Carousel.orientations.HORIZONTAL),
                    handler = new ActivateFirstHandler(),
                    ds = new DataSource(null, new tmDBFeed(), 'loadData'),
                    formatter = new tmDBFormatter(),
                    binder = new Binder(formatter, ds);

                evt.stopPropagation();

                // configure widgets     
                handler.setAnimationOptions({
                    skipAnim: false
                });
                handler.attach(carousel);

                carousel.setWidgetStrip(CullingStrip);
                carousel.setNormalisedAlignPoint(0);
                carousel.setNormalisedWidgetAlignPoint(0);
                carousel.autoCalculate(true);
           

                this.appendChildWidget(carousel);

                this._carousel = carousel;
                this._binder = binder;
            },           
            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            _onBeforeRender: function (evt) {
                evt.stopPropagation();

                this._carousel.addEventListener('databound', this._onDataBound);
                this._carousel.addEventListener('select', this._onCarouselSelectBound);

                // init the append of the carousel child widgets
                this._binder.appendAllTo(this._carousel);

            },

            _onAfterShow: function (evt) {
                evt.stopPropagation();

                this.getCurrentApplication().ready();
            },

            _onBeforeHide: function (evt) {
                evt.stopPropagation();

                this._carousel.removeEventListener('databound', this._onDataBound);
            },

            _onDataBound: function () {
                this._carousel.setWidgetLengths(264);
                this._carousel.recalculate();
                this._carousel.alignToIndex(0);
                this._carousel.setActiveChildIndex(0);
                this._carousel.getChildWidgets()[0].focus();
            },

            _onCarouselSelect: function (evt) {
                this.parentWidget.pushComponent('sampleapp/appui/components/singledetailcomponent',evt.target.getDataItem());
            }
        });
    }
);