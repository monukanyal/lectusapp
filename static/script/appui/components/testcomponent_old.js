define(
  "sampleapp/appui/components/testcomponent",
  [
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/widgets/horizontallist",
    "antie/widgets/horizontalcarousel",
    "sampleapp/appui/formatters/newformatter",
    "sampleapp/appui/formatters/simpleformatter",
    'antie/widgets/keyboard',
    "antie/runtimecontext"
  ],
  function (Component, Button, Label, HorizontalList , HorizontalCarousel , NewFormatter , SimpleFormatter , Keyboard , RuntimeContext) {
    return Component.extend({
      init: function init () {
        var self = this;
        var newFormatter , simpleformatter , keyboard;
        var keys;

        /** It is important to call the constructor of the superclass **/
        init.base.call(this, "testcomponent");

        /** Get a reference to the current application and device objects **/
        this._application = this.getCurrentApplication();
        this._device = this._application.getDevice();

        newFormatter = new NewFormatter();

        simpleformatter = new SimpleFormatter();

        this._carousel = new HorizontalCarousel("testcarousel", simpleformatter);
        this._carousel.setWrapMode(HorizontalCarousel.WRAP_MODE_NAVIGATION_ONLY);

        this.appendChildWidget(this._carousel);

        
        /** Add a 'beforerender' event listener to the component that takes care of video instantiation **/
        this.addEventListener("beforerender", function (evt) {
          self._onBeforeRender(evt);
        });
      },
      _onBeforeRender: function(ev) {
        /** do the bind (and build the carousel's items) **/
        var data = [
                        {
                          "id":"1",
                          "title":"Apple",
                          "img" : "static/img/fruit/apple.png"
                        },
                        {
                          "id":"2",
                          "title":"Banana",
                          "img" : "static/img/fruit/banana.png"
                        },
                        {
                          "id":"3",
                          "title":"Grapes",
                          "img" : "static/img/fruit/grapes.png"
                        },
                        {
                          "id":"4",
                          "title":"Orange",
                          "img" : "static/img/fruit/orange.png"
                        },
                        {
                          "id":"5",
                          "title":"Peach",
                          "img" : "static/img/fruit/peach.png"
                        },
                        {
                          "id":"6",
                          "title":"Pear",
                          "img" : "static/img/fruit/pear.png"
                        }
                    ];
        this._carousel.setDataSource(data);
      }
    });
  }
);