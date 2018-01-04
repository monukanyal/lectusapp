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
  "sampleapp/appui/components/singledetailcomponent",
  [
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/widgets/horizontallist",
    "antie/widgets/verticallist",
    "sampleapp/appui/formatters/newformatter",
    'antie/widgets/image',
    'antie/widgets/list',
    "antie/runtimecontext"
  ],
  function (Component, Button, Label, HorizontalList , VerticalList , NewFormatter , Image , List , RuntimeContext) {
    function evtBind(self, functionName){
      return function (evt) {
        self[functionName].call(self, evt);
      };
    }
    
    return Component.extend({   
      init: function init (evt){
        var self = this;
        var newFormatter , list;

        // console.log("Movie selected :"+evt.args);

        var data = {"title":"Argo","released":"2012-10-11","runtime":"120 min","description":"As the Iranian revolution reaches a boiling point, a CIA 'exfiltration' specialist concocts a risky plan to free six Americans who have found shelter at the home of the Canadian ambassador.","genres":["Drama","Thriller"],"cast":["Ben Affleck","Bryan Cranston","Alan Arkin","John Goodman"],"file":"E:\\Movies\\Argo\\Manifest.mpd","poster":"C:/Users/acer/Lectus files/posters/1kjr09asgj9zacwmu.jpg","backdrop":"C:/Users/acer/Lectus files/backdrops/1kjr09asgj9zacwmv.jpg","_id":"zeSKvEZ5S9huT9wh"};

        // It is important to call the constructor of the superclass
        init.base.call(this, "singledetailcomponent");

        this._onLoad && this.addEventListener('load', this._onLoad.bind(this));

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

        /** Single Player **/
        var player = new Button('player');
        player.appendChildWidget(new Label('From Beginning'));
        VerticalHomeControls.appendChildWidget(player);
        player.addEventListener('select', function(evt) {
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simplevideocomponent");
        });

        /** Single Player **/
        var player2 = new Button('player2');
        player2.appendChildWidget(new Label('Resume'));
        VerticalHomeControls.appendChildWidget(player2);
        player2.addEventListener('select', function(evt) {
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simplevideocomponent");
        });

        HomeControlButtons.appendChildWidget(VerticalHomeControls);  

        /** Primary Section **/
        var InnerTitleLabel = new Label("InnerTitleLabel", data.title);
        HomeControlButtons.appendChildWidget(InnerTitleLabel); 

        var HorizontalList1 = new HorizontalList("HorizontalList1");
        HorizontalList1.appendChildWidget(new Image("InnerLabelList11","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFPZq19eecKoZl41BaYf7T0A8AjnYjbkKt5n2vHOe_SQkR0PwL",{width:350,height:230}));

        var VerticalList1 = new VerticalList("VerticalList1");
        var InnerLabelListTitle = new Label("InnerLabelListTitle", "Description");
        var InnerLabelList12 = new Label("InnerLabelList12", data.description);
        VerticalList1.appendChildWidget(InnerLabelListTitle);
        VerticalList1.appendChildWidget(InnerLabelList12);
        HorizontalList1.appendChildWidget(VerticalList1);
        HomeControlButtons.appendChildWidget(HorizontalList1); 

        var HorizontalList2 = new HorizontalList("HorizontalList2");
        var VerticalList21 = new VerticalList("VerticalList21");
        var InnerListTitle21 = new Label("InnerListTitle21", "Genres");
        var InnerListDesc21 = new Label("InnerListDesc21", data.genres[0]+" / "+data.genres[1]);
        VerticalList21.appendChildWidget(InnerListTitle21);
        VerticalList21.appendChildWidget(InnerListDesc21);
        HorizontalList2.appendChildWidget(VerticalList21);        
        var VerticalList22 = new VerticalList("VerticalList22");
        var InnerListTitle22 = new Label("InnerListTitle22", "Run Time");
        var InnerListDesc22 = new Label("InnerListDesc22", data.runtime);
        VerticalList22.appendChildWidget(InnerListTitle22);
        VerticalList22.appendChildWidget(InnerListDesc22);
        HorizontalList2.appendChildWidget(VerticalList22);
        HomeControlButtons.appendChildWidget(HorizontalList2); 

        newFormatter = new NewFormatter();

        list = new List("ListItemDetails", newFormatter, data.cast);
        HomeControlButtons.appendChildWidget(list);
        
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
      },

        _onLoad: function(evt){
            console.log("Selected _onLoad :"+JSON.stringify(evt.args));
        }
    });
  }
);