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
  "sampleapp/appui/components/settingcomponent",
  [
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/widgets/horizontallist",
    "antie/runtimecontext"
  ],
  function (Component, Button, Label, HorizontalList , RuntimeContext) {
    'use strict';
    var app = RuntimeContext.getCurrentApplication(),device = RuntimeContext.getDevice();

    return Component.extend({
      init: function init () {
        // It is important to call the constructor of the superclass
        init.base.call(this, "settingcomponent");

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
        
        // Create a a label add a class to it, this class can be used as a CSS selector
        var SettingTitle = new Label("Update You IP Address");
        SettingTitle.addClass("SettingTitle");
        this.appendChildWidget(SettingTitle);

        var IPLabel = new Label("IPLabel", "127.0.0.1");
        this.appendChildWidget(IPLabel);

        // Create a horizontal list that contains buttons to control the layout
        var SettingsControlButtons = new HorizontalList("OuterButtons");

        /** Edit **/
        var edit = new Button('login');
        edit.appendChildWidget(new Label('EDIT'));
        SettingsControlButtons.appendChildWidget(edit);
        edit.addEventListener('select', function(evt) {
          alert("IP Address Not Configured !");
          // self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simple");
        });

        /** Back **/
        var back = new Button('back');
        back.appendChildWidget(new Label('BACK'));
        SettingsControlButtons.appendChildWidget(back);
        back.addEventListener('select', function(evt) {
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simple");
        });

        // Append the player control buttons to the component
        this.appendChildWidget(SettingsControlButtons);
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