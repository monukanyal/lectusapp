require.def("sampleapp/appui/components/newcarouselcomponent",
    [
        "antie/widgets/component",
        "antie/datasource",
        "antie/widgets/carousel",
        "antie/widgets/carousel/binder",
        "antie/widgets/carousel/keyhandlers/activatefirsthandler",
        "antie/widgets/carousel/strips/wrappingstrip",
        "antie/widgets/carousel/navigators/wrappingnavigator",
        "antie/widgets/carousel/strips/cullingstrip",
        "antie/widgets/carousel/strips/hidingstrip",
        "sampleapp/appui/formatters/simpleformatter",
        "sampleapp/appui/datasources/simplefeed"

    ],
    function (Component , DataSource , Carousel , Binder , ActivateFirstHandler, WrappingStrip,
    WrappingNavigator, CullingStrip, HidingStrip , SimpleFormatter , SimpleFeed){
        return Component.extend({
            init: function init(){
                var self, simpleFormatter, simpleFeed;
                self = this;
                init.base.call(self, "newcarouselcomponent");

                // Create a new formatter and feed
                simpleFormatter = new SimpleFormatter();
                simpleFeed = new SimpleFeed();

                // Create a DataSource, this uses the feed to get data and presents it to the formatter
                var dataSource = new DataSource(this, simpleFeed, "loadData");

                // Create a new carousel with the formatter
                this._carousel = new Carousel('someCarousel', Carousel.orientations.HORIZONTAL);
                this._carousel.setNormalisedAlignPoint(0.5);
                this._carousel.setNormalisedWidgetAlignPoint(0.5);

                var handler;
                handler = new ActivateFirstHandler();
                handler.setAnimationOptions("{skipAnim: false}");
                handler.attach(this._carousel);

                var binder = new Binder(simpleFormatter, dataSource);
                binder.appendAllTo(this._carousel);

                // Add it to the component
                this.appendChildWidget(this._carousel);

                // We want to rebind every time the component is pushed, so listen for beforerender.           
                this.addEventListener(
                    "beforerender",
                    function(ev) {
                        self._onBeforeRender(ev);
                    }
                );
            },
            onDataBound: function (){
                this._carousel.alignToIndex(4);
                this._carousel.setActiveChildIndex(4);
                this._carousel.getChildWidgets()[4].focus();
            }
        });
    }
);