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
  "sampleapp/appui/datasources/simplefeed",
  [
    "antie/class"
  ],
  function(Class) {
    return Class.extend({
      // You will probably want to do something more useful then returning static data
      loadData : function(callbacks) {
        callbacks.onSuccess(
          [
            {
              "id":"1",
              "title":"Apple",
              "img" : "static/img/fruit/apple.png"
            },
            {
              "id":"2",
              "title":"Banana",
              "img" : "static/img/fruit/banana.png"
            },
            {
              "id":"3",
              "title":"Grapes",
              "img" : "static/img/fruit/grapes.png"
            },
            {
              "id":"4",
              "title":"Orange",
              "img" : "static/img/fruit/orange.png"
            },
            {
              "id":"5",
              "title":"Peach",
              "img" : "static/img/fruit/peach.png"
            },
            {
              "id":"6",
              "title":"Pear",
              "img" : "static/img/fruit/pear.png"
            }
          ]
        );
      },
      MovieCategoryData : function(callbacks) {
        callbacks.onSuccess(
          [
            {
              "id":"1",
              "title":"Action",
              "img" : "static/img/movie/action.png"
            },
            {
              "id":"2",
              "title":"Thriller",
              "img" : "static/img/movie/thriller.png"
            },
            {
              "id":"3",
              "title":"Comedy",
              "img" : "static/img/movie/comedy.png"
            },
            {
              "id":"4",
              "title":"Animated",
              "img" : "static/img/movie/animated.png"
            },
            {
              "id":"5",
              "title":"Horror",
              "img" : "static/img/movie/horror.png"
            },
            {
              "id":"6",
              "title":"Drama",
              "img" : "static/img/movie/drama.png"
            }
          ]
        );
      },
      SerialCategoryData : function(callbacks) {
        callbacks.onSuccess(
          [
            {
              "id":"1",
              "title":"Action",
              "img" : "static/img/fruit/apple.png"
            },
            {
              "id":"2",
              "title":"Thriller",
              "img" : "static/img/fruit/banana.png"
            },
            {
              "id":"3",
              "title":"Comedy",
              "img" : "static/img/fruit/grapes.png"
            },
            {
              "id":"4",
              "title":"Animated",
              "img" : "static/img/fruit/orange.png"
            },
            {
              "id":"5",
              "title":"Horror",
              "img" : "static/img/fruit/peach.png"
            },
            {
              "id":"6",
              "title":"Drama",
              "img" : "static/img/fruit/pear.png"
            }
          ]
        );
      },

      DemoData : function(callbacks) {
        callbacks.onSuccess(
          [
            {
              "title": "Family Plot1",
              "released": 1976,
              "runtime": "1.48333333 min",
              "description": "Lighthearted suspense film about a phony psychic/con artist and her taxi driver/private investigator boyfriend who encounter a pair of serial kidnappers while trailing a missing heir in California.",
              "genres": [
                  "Drama",
                  "Family",
                  "Animation"
              ],
              "cast": [
                  {
                      "name": "Karen Black",
                      "image": "http://182.71.167.76:8098/public/images/actor-not-found.png"
                  },
                  {
                      "name": "Bruce Dern",
                      "image": "http://182.71.167.76:8098/public/images/actor-not-found.png"
                  },
                  {
                      "name": "Barbara Harris",
                      "image": "http://182.71.167.76:8098/public/images/actor-not-found.png"
                  },
                  {
                      "name": "William Devane",
                      "image": "http://182.71.167.76:8098/public/images/actor-not-found.png"
                  }
              ],
              "rated": {
                  "name": "PG",
                  "image": "http://182.71.167.76:8098/public/images/PG.png"
              },
              "rating": "6.8",
              "director": "Alfred Hitchcock",
              "writer": "Ernest Lehman (screenplay), Victor Canning (novel)",
              "imdbid": "tt0074581",
              "file": "http://182.71.167.76:8098/dir//plot.mp4",
              "poster": "http://182.71.167.76:8098/dir2/posters/poster.jpg",
              "backdrop": "http://182.71.167.76:8098/dir2/backdrops/backdrop.jpg",
              "_id": "X6hY8LbVaIVTkQpm",
              "isWatching": true,
              "isWatched": false
          },
          {
              "title": "The Shawshank Redemption",
              "released": "1994",
              "runtime": "1.48333333 min",
              "description": "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
              "genres": [
                  "Crime",
                  "Drama"
              ],
              "cast": [
                  {
                      "name": "Tim Robbins",
                      "image": "http://182.71.167.76:8098/dir2/actors/Tim Robbins.jpg"
                  },
                  {
                      "name": "Morgan Freeman",
                      "image": "http://182.71.167.76:8098/dir2/actors/Morgan Freeman.jpg"
                  },
                  {
                      "name": "Bob Gunton",
                      "image": "http://182.71.167.76:8098/dir2/actors/Bob Gunton.jpg"
                  },
                  {
                      "name": "William Sadler",
                      "image": "http://182.71.167.76:8098/dir2/actors/William Sadler.jpg"
                  }
              ],
              "rated": {
                  "name": "R",
                  "image": "http://182.71.167.76:8098/public/images/PG.png"
              },
              "rating": "9.3",
              "director": "Frank Darabont",
              "writer": "Stephen King (short story \"Rita Hayworth and Shawshank Redemption\"), Frank Darabont (screenplay)",
              "imdbid": "tt0111161",
              "file": "http://182.71.167.76:8098/dir//plot.mp4",
              "poster": "http://182.71.167.76:8098/dir2/posters/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
              "backdrop": "http://182.71.167.76:8098/dir2/backdrops/xBKGJQsAIeweesB79KC89FpBrVr.jpg",
              "_id": "XyhY8LbVaIVTkEda",
              "isWatching": true,
              "isWatched": false
          }
        ]
      ); 
    } 
  });
});
