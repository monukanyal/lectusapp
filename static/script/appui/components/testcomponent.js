define(
  "sampleapp/appui/components/testcomponent",
  [
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/datasource",
    "antie/widgets/horizontallist",
    "antie/widgets/horizontalcarousel",
    "sampleapp/appui/formatters/moviecategoryformatter",
    "sampleapp/appui/formatters/simpleformatter",
    "sampleapp/appui/datasources/simplefeed",
    'antie/widgets/keyboard',
    "antie/widgets/carousel",
    "antie/widgets/carousel/binder",
    "antie/widgets/carousel/keyhandlers/activatefirsthandler",
    "antie/widgets/carousel/strips/wrappingstrip",
    "antie/widgets/carousel/navigators/wrappingnavigator",
    "antie/widgets/carousel/strips/cullingstrip",
    "antie/widgets/carousel/strips/hidingstrip",
    "antie/runtimecontext"
  ],
  function (Component, Button, Label, DataSource , HorizontalList , HorizontalCarousel , MovieCategoryFormatter ,SimpleFormatter ,SimpleFeed , Keyboard ,Carousel, Binder, ActivateFirstHandler, WrappingStrip,
    WrappingNavigator, CullingStrip, HidingStrip, RuntimeContext){
    return Component.extend({
      init: function init () {
        var self = this;
        var moviecategoryformatter , keyboard;
        var keys;

        /** It is important to call the constructor of the superclass **/
        init.base.call(this, "testcomponent");

        /** Get a reference to the current application and device objects **/
        this._application = this.getCurrentApplication();
        this._device = this._application.getDevice();

        var simpleFormatter = new SimpleFormatter();
        var simplefeed = new DataSource(null, new SimpleFeed(), 'loadData');
        var carousel = new Carousel('someCarousel', Carousel.orientations.HORIZONTAL);
        carousel.setNormalisedAlignPoint(0.5);
        carousel.setNormalisedWidgetAlignPoint(0.5);

        var handler;
        handler = new ActivateFirstHandler();
        handler.setAnimationOptions("{skipAnim: false}");
        handler.attach(carousel);

        var binder = new Binder(simpleFormatter, simplefeed);
        binder.appendAllTo(carousel);

        this.appendChildWidget(carousel);
        /** Add a 'beforerender' event listener to the component that takes care of video instantiation **/
        this.addEventListener("beforerender", function (evt) {
          self._onBeforeRender(evt);
        });
      }
    });
  }
);