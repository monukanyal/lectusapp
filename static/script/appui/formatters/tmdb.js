define('sampleapp/appui/formatters/tmdb', [
    'antie/formatter',
    'antie/widgets/label',
    'antie/widgets/button',
    'antie/widgets/image',    
    'sampleapp/appui/config/app.config',
    'sampleapp/appui/common/util'
], function (
    Formatter,
    Label, 
    Button,
    Image,
    appConfig,
    util
) {
    'use strict';
   
    return Formatter.extend({
        format: function (iterator) {
            var imgOpts = {width: 342, height: 513}, 
                button,singlecategorybutton,
                item;

            item = iterator.next();

            button = new Button("#video-" + item.id);
            button.appendChildWidget(new Image("#img-"+item.id, util.buildImgUrl(item.poster_path), imgOpts));
            button.appendChildWidget(new Label(item.title));
            button.setDataItem(item);
            button.addClass('tmdb-item')

            singlecategorybutton = new Button('singlecategorybutton_'+item.title);
            singlecategorybutton.appendChildWidget(new Image("movie-img", item.poster , { width : 180, height: 100}));
            singlecategorybutton.appendChildWidget(new Image("movie-play", "static/img/player.gif" , {width : 20, height: 20}));
            singlecategorybutton.appendChildWidget(new Label("movie-title" , item.title));
            singlecategorybutton.appendChildWidget(new Label("movie-time" , "1:30 hr"));

            return button;
        }
    });
});