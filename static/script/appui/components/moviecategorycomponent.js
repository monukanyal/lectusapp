define(
  "sampleapp/appui/components/moviecategorycomponent",
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
    WrappingNavigator, CullingStrip, HidingStrip, RuntimeContext){
    'use strict';
        
    var app = RuntimeContext.getCurrentApplication(),device = RuntimeContext.getDevice();

    return Component.extend({
      init: function init (){
        var self = this;
        var simpleFormatter, simpleFeed , newFormatter , movieCategoryFormatter , list , carousel;

        // It is important to call the constructor of the superclass
        init.base.call(this, "moviecategorycomponent");

        // component events
        this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
        this._onBeforeRender && this.addEventListener('beforerender', this._onBeforeRender.bind(this));
        this._onBeforeShow && this.addEventListener('beforeshow', this._onBeforeShow.bind(this));
        this._onAfterShow && this.addEventListener('aftershow', this._onAfterShow.bind(this));
        this._onBeforeHide && this.addEventListener('beforehide', this._onBeforeHide.bind(this));
        this._onAfterHide && this.addEventListener('afterhide', this._onAfterHide.bind(this));

      },

      _onLoad: function (evt) {
        var self = this;
        var simpleFormatter, simpleFeed , newFormatter , movieCategoryFormatter , list , carousel;

        /** Primary Horizontal Layer **/
        var HomeControlButtons = new HorizontalList("HomeButtons");

        /** Secondary Vertical Layer **/
        var VerticalHomeControls = new VerticalList("VerticalNewHomeControls"); 

        var InnerLogoLabel = new Label("InnerLogoLabel", "");
        VerticalHomeControls.appendChildWidget(InnerLogoLabel);

        /** Inner Back **/
        var InnerBackButton = new Button('innerback');
        InnerBackButton.appendChildWidget(new Label('BACK'));
        VerticalHomeControls.appendChildWidget(InnerBackButton);
        InnerBackButton.addEventListener('select', function(evt) {
            self.parentWidget.back();
        });

        HomeControlButtons.appendChildWidget(VerticalHomeControls);  

        /** Primary Section **/
        var InnerTitleLabel = new Label("InnerTitleLabel", "Movie Categories");
        HomeControlButtons.appendChildWidget(InnerTitleLabel); 

        var Loader = new Image("loader", "static/img/loader.gif" , { width : 170, height: 150});
        HomeControlButtons.appendChildWidget(Loader);

        var CategoryHorizontal = new HorizontalList("CategoryHorizontal"); 
        var testList = new VerticalList("testList");

        var moviecategorybutton;
        movieCategoryFormatter = new MovieCategoryFormatter();
        var accessToken = localStorage.getItem("accessToken");
        // console.log("Access Token :"+accessToken);
        var xhttp = new XMLHttpRequest();
        var response_data , response_result , container;
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                document.getElementById('loader').style.display = 'none';
                response_data = JSON.parse(this.responseText);
                response_result = this.responseText;
                localStorage.setItem("movie_storage", response_data);
                // console.log("Response Data :"+JSON.stringify(response_data));
                for(var i=0;i<response_data.length;i++)
                {
                    moviecategorybutton = new Button('moviecategorybutton_'+response_data[i].genre);
                    moviecategorybutton.appendChildWidget(new Image("category-img", "static/img/movie/"+response_data[i].genre+".png" , { width : 150, height: 80}));
                    moviecategorybutton.appendChildWidget(new Label(response_data[i].genre));
                    // moviecategorybutton.setDataItem(response_data[i]);
                    CategoryHorizontal.appendChildWidget(moviecategorybutton);
                    moviecategorybutton.addEventListener('select', function(evt){
                        self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/new_moviecategorycomponent",{'genre':'action'});
                    });
                    HomeControlButtons.appendChildWidget(CategoryHorizontal);
                }
            }
        };
        xhttp.open("GET", "http://182.71.167.76:8098/api/appmovies/", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.setRequestHeader('x-access-token', accessToken);
        xhttp.send();

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