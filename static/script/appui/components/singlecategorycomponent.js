define(
  "sampleapp/appui/components/singlecategorycomponent",
  [
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/datasource",
    "antie/widgets/horizontallist",
    "antie/widgets/verticallist",
    "sampleapp/appui/formatters/newformatter",
    "sampleapp/appui/formatters/moviecategoryformatter",
    "sampleapp/appui/formatters/simpleformatter",
    "sampleapp/appui/datasources/simplefeed",
    "antie/widgets/image",
    "antie/widgets/list",
    "antie/widgets/horizontalcarousel",
    "antie/widgets/carousel",
    "antie/widgets/carousel/binder",
    "antie/widgets/carousel/keyhandlers/activatefirsthandler",
    "antie/widgets/carousel/strips/wrappingstrip",
    "antie/widgets/carousel/navigators/wrappingnavigator",
    "antie/widgets/carousel/strips/cullingstrip",
    "antie/widgets/carousel/strips/hidingstrip",
    "antie/runtimecontext"
  ],
  function (Component, Button, Label, DataSource , HorizontalList , VerticalList , NewFormatter , MovieCategoryFormatter , SimpleFormatter , SimpleFeed , Image , List , HorizontalCarousel ,Carousel, Binder, ActivateFirstHandler, WrappingStrip,
    WrappingNavigator, CullingStrip, HidingStrip, RuntimeContext) {
    'use strict';
        
    var app = RuntimeContext.getCurrentApplication(),device = RuntimeContext.getDevice();    

    return Component.extend({
      init: function init (evt) {
        var self = this;
        var simpleFormatter, simpleFeed , newFormatter , movieCategoryFormatter , list , carousel;

        // It is important to call the constructor of the superclass
        init.base.call(this, "singlecategorycomponent");
        
        /** Primary Horizontal Layer **/
        var HomeControlButtons = new HorizontalList("HomeButtons");

        /** Secondary Vertical Layer **/
        var VerticalHomeControls = new VerticalList("VerticalHomeControls"); 

        var InnerLogoLabel = new Label("InnerLogoLabel", "");
        VerticalHomeControls.appendChildWidget(InnerLogoLabel);

        /** Inner Back **/
        var InnerBackButton = new Button('innerback');
        InnerBackButton.appendChildWidget(new Label('BACK'));
        VerticalHomeControls.appendChildWidget(InnerBackButton);
        InnerBackButton.addEventListener('select', function(evt) {
            self.parentWidget.back();
        });

        /** Movies **/
        var movieCarouselButton = new Button('movie');
        movieCarouselButton.appendChildWidget(new Label('MOVIE'));
        VerticalHomeControls.appendChildWidget(movieCarouselButton);
        movieCarouselButton.addEventListener('select', function(evt) {
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/moviecategorycomponent");
        });

        /** Serial **/
        var serialCarouselButton = new Button('serial');
        serialCarouselButton.appendChildWidget(new Label('SERIAL'));
        VerticalHomeControls.appendChildWidget(serialCarouselButton);
        serialCarouselButton.addEventListener('select', function(evt) {
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/serialcategorycomponent");
        });
        
        /** Setting **/
        var setting = new Button('setting');
        setting.appendChildWidget(new Label('SETTING'));
        VerticalHomeControls.appendChildWidget(setting);
        setting.addEventListener('select', function(evt) {
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/innersettingcomponent");
        });

        /** Logout **/
        var logout = new Button('logout');
        logout.appendChildWidget(new Label('LOGOUT'));
        VerticalHomeControls.appendChildWidget(logout);
        logout.addEventListener('select', function(evt) {
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simple");
        });

        HomeControlButtons.appendChildWidget(VerticalHomeControls);  

        /** Primary Section **/
        var Loader = new Image("loader", "static/img/loader.gif" , { width : 170, height: 150});
        HomeControlButtons.appendChildWidget(Loader);

        var CategoryHorizontal = new HorizontalList("SingleCategoryHorizontal"); 
        var singlecategorybutton , movie_storage , InnerTitleLabel;

        var xhttp = new XMLHttpRequest();
        var accessToken = localStorage.getItem("accessToken");
        var response_data , response_result;
        
        // xhttp.onreadystatechange = function(){
        //     if(this.readyState == 4 && this.status == 200){
        //         document.getElementById('loader').style.display = 'none';
        //         response_data = JSON.parse(this.responseText);
        //         response_result = this.responseText;
        //         // console.log("Response data :"+JSON.stringify(response_data));
        //         InnerTitleLabel = new Label("InnerTitleLabel", response_data.genre+" Category");
        //         for(var i=0;i<response_data.length;i++)
        //         {
        //             // console.log("Movie Genre :"+response_data[i].genre);
        //             response_data[i].movies.forEach(function(single_movie){
        //                 // console.log("Movie List :"+JSON.stringify(single_movie.title));
        //                 singlecategorybutton = new Button('singlecategorybutton_'+single_movie.title);
        //                 singlecategorybutton.appendChildWidget(new Image("movie-img", single_movie.poster , { width : 180, height: 100}));
        //                 singlecategorybutton.appendChildWidget(new Image("movie-play", "static/img/player.gif" , {width : 20, height: 20}));
        //                 singlecategorybutton.appendChildWidget(new Label("movie-title" , single_movie.title));
        //                 singlecategorybutton.appendChildWidget(new Label("movie-time" , "1:30 hr"));
        //                 CategoryHorizontal.appendChildWidget(singlecategorybutton);
        //                 singlecategorybutton.addEventListener('select', function(evt){
        //                   self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/singledetailcomponent");
        //                 });
        //             });
        //         }
        //         HomeControlButtons.appendChildWidget(InnerTitleLabel); 
        //         HomeControlButtons.appendChildWidget(CategoryHorizontal);
        //     }
        // };
        // xhttp.open("GET", "http://182.71.167.76:8098/api/appmovies/genre/action", true);
        // xhttp.setRequestHeader('Content-Type', 'application/json');
        // xhttp.setRequestHeader('x-access-token', accessToken);
        // xhttp.send();

        /** Primary Section Ends Here **/


        /** SideBar Section **/
        this.appendChildWidget(HomeControlButtons);

        /** Footer Section **/
        var ControlGuideButtons = new HorizontalList("ControlGuideButtons");

        var LeftRightLabel = new Label("LeftRightLabel", "Left/Right");
        ControlGuideButtons.appendChildWidget(LeftRightLabel); 

        var MenuLabel = new Label("MenuLabel", "Menu");
        ControlGuideButtons.appendChildWidget(MenuLabel); 
        
        var SelectLabel = new Label("SelectLabel", "Select");
        ControlGuideButtons.appendChildWidget(SelectLabel); 
        
        var ReturnLabel = new Label("ReturnLabel", "Return");
        ControlGuideButtons.appendChildWidget(ReturnLabel); 

        HomeControlButtons.appendChildWidget(ControlGuideButtons);

        this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
        // Add a 'beforerender' event listener to the component that takes care of video instantiation
        // this.addEventListener("beforerender", function (evt) {
        //   self._onBeforeRender(evt);
        // });
      },

      _onLoad: function (evt) {
        console.log("Selected Event :"+JSON.stringify(evt.args));
      }

    });
  }
);