define(
  "sampleapp/appui/components/simple",
  [
    "antie/widgets/component",
    "antie/widgets/componentcontainer",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/widgets/verticallist",
    "antie/widgets/carousel",
    "antie/datasource",
    'antie/runtimecontext',
    "sampleapp/appui/formatters/simpleformatter",
    "sampleapp/appui/datasources/simplefeed"
  ],
  function (Component, ComponentContainer , Button, Label, VerticalList, Carousel, DataSource, RuntimeContext,SimpleFormatter, SimpleFeed) {
    'use strict';
        
    var app = RuntimeContext.getCurrentApplication(),device = RuntimeContext.getDevice();

    return Component.extend({
      init: function init () {
        // It is important to call the constructor of the superclass
        init.base.call(this, "simplecomponent");

        // component events
        this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
        this._onBeforeRender && this.addEventListener('beforerender', this._onBeforeRender.bind(this));
        this._onBeforeShow && this.addEventListener('beforeshow', this._onBeforeShow.bind(this));
        this._onAfterShow && this.addEventListener('aftershow', this._onAfterShow.bind(this));
        this._onBeforeHide && this.addEventListener('beforehide', this._onBeforeHide.bind(this));
        this._onAfterHide && this.addEventListener('afterhide', this._onAfterHide.bind(this));

      },

      _onLoad: function (evt) {
        var self, LectusTvLabel, LogoLabel, carouselButtonLabel, verticalListMenu;

        self = this;

        var container = new ComponentContainer("logincomponent");

        LogoLabel = new Label("LogoLabel", "");
        
        /** Login Option **/
        var args = {test : 'testing'};
        var LoginButton = new Button("LoginButton");
        LoginButton.addEventListener("select", function(evt){
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/logincomponent");
        });
        LoginButton.appendChildWidget(new Label("Login"));
        LoginButton.setDataItem(args);

        /** Settings Option **/
        var settingButton = new Button("settingButton");
        settingButton.addEventListener("select", function(evt){
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/settingcomponent");
        });
        settingButton.appendChildWidget(new Label("Settings"));

        // Create a vertical list and append the buttons to navigate within the list
        verticalListMenu = new VerticalList("mainMenuList");
        verticalListMenu.appendChildWidget(LogoLabel);
        verticalListMenu.appendChildWidget(LoginButton);
        verticalListMenu.appendChildWidget(settingButton);
        this.appendChildWidget(verticalListMenu);

        // calls Application.ready() the first time the component is shown
        // the callback removes itself once it's fired to avoid multiple calls.
        this.addEventListener("aftershow", function appReady(evt){
          self.getCurrentApplication().ready();
          self.removeEventListener('aftershow', appReady);

          /** Managing Sessions **/
          var user = localStorage.getItem("user");
          var password = localStorage.getItem("password");

          if(user == "anmolsaini" && password == "admin")
          {
            self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/homecomponent");
          }
          else
          {
            self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simple");
          }
        });
      },           
      
      _onBeforeRender: function (evt) {
        evt.stopPropagation();
      },

      _onAfterShow: function (evt) {
        evt.stopPropagation();
      },

      _onBeforeHide: function (evt) {
        evt.stopPropagation();
      }
    });
  }
);