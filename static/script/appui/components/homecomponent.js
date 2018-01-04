/**
* @preserve Copyright (c) 2013 British Broadcasting Corporation
* (http://www.bbc.co.uk) and TAL Contributors (1)
*
* (1) TAL Contributors are listed in the AUTHORS file and at
*     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
*     not this notice.
*
* @license Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* All rights reserved
* Please contact us for an alternative licence
*/

define(
  "sampleapp/appui/components/homecomponent",
  [
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/widgets/horizontallist",
    "antie/widgets/verticallist",
    "antie/widgets/carousel",
    "antie/datasource",
    "sampleapp/appui/formatters/simpleformatter",
    "sampleapp/appui/datasources/simplefeed",
    'antie/widgets/container',
    "antie/runtimecontext"
  ],
  function (Component, Button, Label, HorizontalList ,VerticalList, Carousel, DataSource, SimpleFormatter, Container , SimpleFeed, RuntimeContext) {
    'use strict';
        
    var app = RuntimeContext.getCurrentApplication(),device = RuntimeContext.getDevice();

    return Component.extend({
      init: function init () {
        var self = this;

        // It is important to call the constructor of the superclass
        init.base.call(this, "homecomponent");

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

        /** Primary Horizontal Layer **/
        var HomeControlButtons = new HorizontalList("HomeButtons");

        var InnerLogoLabel = new Label("InnerLogoLabel", "");
        this.appendChildWidget(InnerLogoLabel); 

        /** Primary Section **/
        var InnerTitleLabel = new Label("InnerTitleLabel", "");
        HomeControlButtons.appendChildWidget(InnerTitleLabel);

        var HomeDashboardButtons = new HorizontalList("HomeDashboardButtons");

        /** Movie **/
        var moviedashboard = new Button('moviedashboard');
        moviedashboard.appendChildWidget(new Label('MOVIE'));
        HomeDashboardButtons.appendChildWidget(moviedashboard);
        moviedashboard.addEventListener('select', function(evt) {
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/moviecategorycomponent");
        });

        /** Back **/
        var serialdashboard = new Button('serialdashboard');
        serialdashboard.appendChildWidget(new Label('SERIAL'));
        HomeDashboardButtons.appendChildWidget(serialdashboard);
        serialdashboard.addEventListener('select', function(evt) {
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/serialcategorycomponent");
        });

        HomeControlButtons.appendChildWidget(HomeDashboardButtons); 
        /** Primary Section Ends Here **/

        /** Secondary Vertical Layer **/
        var VerticalHomeControls = new VerticalList("VerticalHomeControls"); 
        
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
          localStorage.removeItem("user");
          localStorage.removeItem("password");
          localStorage.removeItem("movie_storage");
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simple");
        });

        HomeControlButtons.appendChildWidget(VerticalHomeControls); 

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