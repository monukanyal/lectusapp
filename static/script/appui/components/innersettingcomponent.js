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
  "sampleapp/appui/components/innersettingcomponent",
  [
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/widgets/horizontallist",
    "antie/widgets/verticallist",
    "antie/runtimecontext"
  ],
  function (Component, Button, Label, HorizontalList , VerticalList , RuntimeContext) {

    return Component.extend({
      init: function init () {
        var self = this;

        // It is important to call the constructor of the superclass
        init.base.call(this, "innersettingcomponent");

        // Get a reference to the current application and device objects
        this._application = this.getCurrentApplication();
        this._device = this._application.getDevice();

        /** Primary Horizontal Layer **/
        var HomeControlButtons = new HorizontalList("HomeButtons");

        /** Secondary Vertical Layer **/
        var VerticalHomeControls = new VerticalList("VerticalNewHomeControls"); 

        var InnerLogoLabel = new Label("InnerLogoLabel", "");
        VerticalHomeControls.appendChildWidget(InnerLogoLabel);

        /** Edit **/
        var edit = new Button('edit');
        edit.appendChildWidget(new Label('EDIT'));
        VerticalHomeControls.appendChildWidget(edit);
        edit.addEventListener('select', function(evt) {
          alert("IP Address Not Configured !");
        });

        /** Back **/
        var back = new Button('back');
        back.appendChildWidget(new Label('BACK'));
        VerticalHomeControls.appendChildWidget(back);
        back.addEventListener('select', function(evt) {
          self.parentWidget.back();
        });


        HomeControlButtons.appendChildWidget(VerticalHomeControls);  

        /** Primary Section **/
        var InnerTitleLabel = new Label("InnerTitleLabel", "IP Settings Dashboard");
        HomeControlButtons.appendChildWidget(InnerTitleLabel); 

        var IPLabel = new Label("IP_Label", "127.0.0.1");
        HomeControlButtons.appendChildWidget(IPLabel);

        var SettingsControlButtons = new HorizontalList("SettingsButtons");

        /** Edit **/
        var edit = new Button('edit');
        edit.appendChildWidget(new Label('EDIT'));
        SettingsControlButtons.appendChildWidget(edit);
        edit.addEventListener('select', function(evt) {
          alert("IP Address Not Configured !");
        });

        /** Back **/
        var back = new Button('back');
        back.appendChildWidget(new Label('BACK'));
        SettingsControlButtons.appendChildWidget(back);
        back.addEventListener('select', function(evt) {
          self.parentWidget.back();
        });

        // HomeControlButtons.appendChildWidget(SettingsControlButtons);
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