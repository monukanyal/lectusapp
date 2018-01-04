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
  "sampleapp/appui/components/serialcategorycomponent",
  [
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/datasource",
    "antie/widgets/horizontallist",
    "antie/widgets/verticallist",
    "antie/runtimecontext"
  ],
  function (Component, Button, Label, DataSource , HorizontalList , VerticalList , RuntimeContext) {

    return Component.extend({
      init: function init () {
        var self = this;
        
        // It is important to call the constructor of the superclass
        init.base.call(this, "serialcategorycomponent");

        // Get a reference to the current application and device objects
        this._application = this.getCurrentApplication();
        this._device = this._application.getDevice();

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
        var InnerTitleLabel = new Label("InnerTitleLabel", "Serial Categories");
        HomeControlButtons.appendChildWidget(InnerTitleLabel); 

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

        // Add a 'beforerender' event listener to the component that takes care of video instantiation
        this.addEventListener("beforerender", function (evt) {
          self._onBeforeRender(evt);
        });
      }

    });
  }
);