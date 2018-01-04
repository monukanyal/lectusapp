require.def("sampleapp/appui/components/simplecarouselcomponent",
    [
        "antie/widgets/component",
        "antie/datasource",
        "antie/widgets/horizontalcarousel",
        "sampleapp/appui/formatters/simpleformatter",
        "sampleapp/appui/datasources/simplefeed"

    ],
    function (Component, DataSource, HorizontalCarousel, SimpleFormatter, SimpleFeed) {
        return Component.extend({
            init: function init () {
                var self, simpleFormatter, simpleFeed;

                self = this;

                init.base.call(self, "simplecarouselcomponent");

                // Create a new formatter and feed
                simpleFormatter = new SimpleFormatter();
                simpleFeed = new SimpleFeed();

                // Create a DataSource, this uses the feed to get data and presents it to the formatter
                this._dataSource = new DataSource(this, simpleFeed, "loadData");

                // Create a new carousel with the formatter
                this._carousel = new HorizontalCarousel("simplecarousel", simpleFormatter);

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
            _onBeforeRender: function(ev) {
                // do the bind (and build the carousel's items)
                this._carousel.setDataSource(this._dataSource);
            }
        });
    }
);