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
  "sampleapp/appui/formatters/newformatter",
  [
    "antie/formatter",
    "antie/widgets/label",
    "antie/widgets/button",
    "antie/widgets/image"
  ],
  function(Formatter, Label, Button, Image) {
    return Formatter.extend({
      format : function (iterator) {
        var button, item;
        item = iterator.next();
        button = new Button("Cast_" + item);
        button.appendChildWidget(new Image("img-src","https://media1.popsugar-assets.com/files/thumbor/tyulznsE8cqwCN3QaPD4yahGt4E/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2012/12/51/3/192/1922398/973677e591433c11_ben.jpg"));
        // button.appendChildWidget(new Image("img-item11" , { width : 200, height: 200}));
        button.appendChildWidget(new Label("cast_name",item));
        button.addEventListener('select', function(evt) {
          // alert("Test :"+item);
        });
        return button;
      }
    });
  }
);
