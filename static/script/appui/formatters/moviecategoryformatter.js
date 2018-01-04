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
  "sampleapp/appui/formatters/moviecategoryformatter",
  [
    "antie/formatter",
    "antie/widgets/label",
    "antie/widgets/button",
    "antie/widgets/image",
    "antie/widgets/horizontallist",
    "antie/widgets/verticallist"
  ],
  function(Formatter, Label, Button, Image, HorizontalList, VerticalList){
    return Formatter.extend({
      format : function (iterator){
        var button , innerButton , item , movie_len , categoryTitle , movieSingleCategory , moviesLists;
        item = iterator.next();

        // movieSingleCategory = new VerticalList("movieSingleCategory");
        // categoryTitle = new Label("categoryTitle" , item.genre);
        // movieSingleCategory.appendChildWidget(categoryTitle);
        // console.log("Genre :"+item.genre);
        // moviesLists = new HorizontalList("moviesLists");        
        // movie_len = item.movies.length;
        // button = new Button("singleMovie");
        // for (var i = 0 ; i < movie_len; i++) {
        //   console.log("Title Movies :"+item.movies[i].title);
        //   button.appendChildWidget(new Image("img-item11" , item.movies[i].poster ,{ width : 200, height: 200}));
        //   button.appendChildWidget(new Label("cast_name",item.movies[i].title));
        //   button.addEventListener('select', function(evt) {
        //     alert("Movie Id :"+item.movies[i]._id);
        //   });
        //   moviesLists.appendChildWidget(button);
        // }
        // movieSingleCategory.appendChildWidget(moviesLists);

        // return movieSingleCategory;

        // movieSingleCategory = new VerticalList("movieSingleCategory");
        // movieSingleCategory.appendChildWidget(new Label("category_list",item.genre));
        // console.log("Genre :"+item.genre);
        // movie_len = item.movies.length;
        // for (var i = 0 ; i < movie_len; i++) {
        //   console.log("Title Movies :"+item.movies[i].title);
        //   innerButton = new Button("singleMovie_" + item.movies[i].title);
        //   innerButton.appendChildWidget(new Image("img-item11" , item.movies[i].poster ,{ width : 200, height: 200}));
        //   innerButton.appendChildWidget(new Label("cast_name",item.movies[i].title));
        //   innerButton.addEventListener('select', function(evt) {
        //     alert("Movie Id :"+item.movies[i]._id);
        //   });
        //   movieSingleCategory.appendChildWidget(innerButton);
        // }
        // return movieSingleCategory;

        button = new Button("Category_" + item.title);
        button.appendChildWidget(new Label("category_list",item.title));
        button.addEventListener('select', function(evt) {
          alert("Movie Genre :"+item.title);
        });
        return button;
      }
    });
  }
);
