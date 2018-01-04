define(
  "sampleapp/appui/components/logincomponent",
  [
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/widgets/horizontallist",
    "antie/runtimecontext",
    "antie/widgets/componentcontainer"
  ],
  function (Component, Button, Label, HorizontalList , RuntimeContext , ComponentContainer){
    'use strict';
        
    var app = RuntimeContext.getCurrentApplication(),device = RuntimeContext.getDevice();
    
    return Component.extend({
      init: function init () {
        /** It is important to call the constructor of the superclass **/
        init.base.call(this, "logincomponent");

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
        var raw_data ={"name":"anmolsaini","password":"admin","udId":"4512pklmn"};

        /** Create a a label add a class to it, this class can be used as a CSS selector **/
        LogoLabel = new Label("SideLogoLabel", "");
        this.appendChildWidget(LogoLabel);

        var LoginTitle = new Label("Login");
        LoginTitle.addClass("LoginTitle");
        this.appendChildWidget(LoginTitle);

        var UserLabelContent = new HorizontalList("UserLabelContent");

        var UserLabel = new Label("UserLabel", "Lectus ID");
        UserLabelContent.appendChildWidget(UserLabel);

        var UserValue = new Label("UserValue", raw_data.name);
        UserLabelContent.appendChildWidget(UserValue);

        this.appendChildWidget(UserLabelContent);

        var PasswordLabelContent = new HorizontalList("PasswordLabelContent");

        var PasswordLabel = new Label("PasswordLabel", "Password");
        PasswordLabelContent.appendChildWidget(PasswordLabel);

        var PasswordValue = new Label("PasswordValue", "*******");
        PasswordLabelContent.appendChildWidget(PasswordValue);

        this.appendChildWidget(PasswordLabelContent);

        /** Create a horizontal list that contains buttons to control the layout **/
        var LoginControlButtons = new HorizontalList("OuterButtons");

        /** Edit **/
        var login = new Button('login');
        login.appendChildWidget(new Label('LOGIN'));
        LoginControlButtons.appendChildWidget(login);
        login.addEventListener('select', function(evt) {
          var xhttp = new XMLHttpRequest();
          var response_data , response_token , user_data;
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              response_data = JSON.parse(this.responseText);
              // console.log("User Data :"+JSON.stringify(response_data.data));
              response_token = response_data.token;
              
              localStorage.setItem("user", raw_data.name);
              localStorage.setItem("password", raw_data.password);  
              localStorage.setItem("accessToken", response_token);
            }
          };
          xhttp.open("POST", "http://182.71.167.76:8098/profiles/appuserlogin", true);
          xhttp.setRequestHeader('Content-Type', 'application/json');
          xhttp.send(JSON.stringify(raw_data));
          
          var accessToken = localStorage.getItem("accessToken");

          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/homecomponent");
        });

        /** Back **/
        var back = new Button('newback');
        back.appendChildWidget(new Label('BACK'));
        LoginControlButtons.appendChildWidget(back);
        back.addEventListener('select', function(evt) {
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simple");
        });

        /** Append the player control buttons to the component **/
        this.appendChildWidget(LoginControlButtons);
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