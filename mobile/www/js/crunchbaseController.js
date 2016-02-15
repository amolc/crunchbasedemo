angular.module('starter.controllers')

.controller('crunchbaseController', function($scope, $sce, $http, $state, $location, $ionicPopup, $timeout) {

   $scope.init = function() {
    
   }

  /**
   * function mail_to
   * [open mail with send to option]
   * @return {[type]} [description]
   */
  
  $scope.mail_to = function(){
    cordova.InAppBrowser.open('mailto:hi@ben.gy', '_system', 'location=yes');  
  }

  /**
   * function clearCompany
   * [clear company name input field]
   */
  
  $scope.clearCompany = function(){
    $scope.companyname.value = "";
  }


  /**
   * function showAlert
   * [open popup for company details page]
   */
  $scope.showAlert = function(comp) {
    
      $scope.abc = function(event) {
        if(event.target.id == 'linkedin'){
          cordova.InAppBrowser.open(comp.properties.linkedin_url, '_system', 'location=yes');  
        }
        if(event.target.id == 'fburl'){
          cordova.InAppBrowser.open(comp.properties.facebook_url, '_system', 'location=yes');     
        }
        if(event.target.id == 'twitterurl'){
          cordova.InAppBrowser.open(comp.properties.twitter_url, '_system', 'location=yes');        
        }
        if(event.target.id == 'homeurl'){
            cordova.InAppBrowser.open(comp.properties.homepage_url, '_system', 'location=yes');        
        }
        if (event.target.id == 'locationurl'){
          cordova.InAppBrowser.open("https://www.google.co.in/maps/place/" +  comp.properties.city_name, '_system', 'location=yes');        
        }
      }

      $scope.opencompanyonCrunch = function(){
        company_url_oncrunch = "https://www.crunchbase.com/organization/" + comp.properties.name;
        cordova.InAppBrowser.open(company_url_oncrunch, '_system', 'location=yes');  
      }


     var customTemplate =
      '<div class="item item-avatar" ng-controller="crunchbaseController">' +
      '<img src="'+comp.properties.profile_image_url+'"/>' +
      '<h2 class="popoup_heading_limit">'+comp.properties.name+'</h2>' +
      '<label>'+comp.properties.primary_role+'</lable>' + 
      '<br/>' +
      '</div>' +
      '<div style="padding-left: 15px;">'+comp.properties.short_description+'</div>' + 
      '<div class="list" style="margin-top: 1px;">' +
        '<span class="item item-icon-left" id="locationurl" ng-click="abc($event);" style="border-width: 0px;">' +
            '<i class="icon ion-location"></i>' +
            comp.properties.city_name +
        '</span>' +

        '<span class="item item-icon-left" id="linkedin" ng-click="abc($event);" style="border-width: 0px;">' +
            '<i class="icon ion-social-linkedin"></i>' +
            comp.properties.linkedin_url +
        '</span>' +

        '<span class="item item-icon-left" id="fburl" ng-click="abc($event);" style="border-width: 0px;">' +
            '<i class="icon ion-social-facebook"></i>' +
            comp.properties.facebook_url +
        '</span>' +

        '<span class="item item-icon-left" id="twitterurl" ng-click="abc($event);" style="border-width: 0px;">' +
            '<i class="icon ion-social-twitter"></i>' +
            comp.properties.twitter_url +
        '</span>' +

        '<span class="item item-icon-left" id="homeurl" ng-click="abc($event);" style="border-width: 0px;">' +
            '<i class="icon ion-earth"></i>' +
            comp.properties.homepage_url +
        '</span>' +
     '</div>'+
     '<div class="bar bar-footer bar-balanced backgroud">'+
            '<div class="title" style="font-size: 16px;" ng-click="opencompanyonCrunch()">View more on <b>CrunchBase</b></div>'+
    '</div>';

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: customTemplate,
      scope: $scope,
      title: '<h3 class="popoup_heading_limit">' + comp.properties.name + '</h3>',
      buttons: [{
        text:  '<i class="ion-close-round"></i>',
        onTap: function(e) {

        }
      }]
      
    });
  };

  /**
   * function searchcompany 
   * [allow search by company name]
   */
  $scope.searchcompany = function(){
    var companyurl = baseUrl+"name="+$scope.companyname.value+"&"+"user_key="+userkey;
    $http.get(companyurl, {
      header:{'Access-Control-Allow-Origin': '*'}
    }).success(function(res,req) { 
        $scope.companydetails = res.data.items;
        if($scope.companydetails == ""){
          $scope.organization_not_found ='Couldn’t find any companies with that name';
            $scope.showorganization_not_found = true;

            $timeout(function() {
              $scope.showorganization_not_found = false;
            }, 10000);
        }        
    });
  
  }

  /**
   * function suggest_state_remote
   * [suggest_state_remote function allows the autosuggest company names list]
   */
  
  $scope.companyname = {};
  $scope.tags = [];
  $scope.onlycompany_names = [];

  function highlight(str, term) {
    var highlight_regex = new RegExp('(' + term + ')', 'gi');
    return str.replace(highlight_regex, '<span class="highlight">$1</span>');
  }

  function suggest_state_remote(term) {
      var results = [];
      $scope.tags = [];
      $scope.onlycompany_names = [];
      $scope.companyname.term = term;
     
    if(term.length > 2){
        var autosuggestednames = baseUrl+"name="+term+"&"+"user_key="+userkey;
        return $http.get(autosuggestednames).then(
          
          function success(data) {
            var results = []; 
            var compantlistobj = data.data.data.items;

            for (var i = 0; i < compantlistobj.length; i++) {
              $scope.onlycompany_names.push(compantlistobj[i].properties.name);
            }
              
            var limit = 10;

            // Find first 10 companies that start with `term`.
            for (var i = 0; i <$scope.onlycompany_names.length; i++) {
              var item = $scope.onlycompany_names[i];
              if (results.length == limit)
                break;
              results.push({
                label: $sce.trustAsHtml(highlight(item, term)),
                value: item
              });
            }
            
            return results;
          },
          function error(data) {
            return data;
          });
    }else{
      var results = [];
      $scope.tags = [];
      $scope.onlycompany_names = [];
      return results;
    }
  }

  $scope.autocomplete_options = {
    suggest: suggest_state_remote,
    on_error: console.log
  };

  /****** offline code ******/
  /*$scope.companylist = [
   {
     id:1,
     name:'Github',
     image:"img/1.png",
     address:"San Francisco, CA , USA",
     linkedinlink:"linkedin.com/company/github",
     facebooklink:"fb.com/github",
     twitterlink:"twitter.com/github",
     website:"github.com",
     primary_role:"company",
     short_description:"Github is the company"
  },
   {
     id:2,
     name:'Airbnb',
     image:"img/5.jpg",
     address:"San Francisco, CA , USA",
     linkedinlink:"linkedin.com/company/airbnb",
     facebooklink:"fb.com/airbnb",
     twitterlink:"twitter.com/airbnb",
     website:"airbnb.com",
     primary_role:"company",
     short_description:"Airbnb is the company"
  },
  {
    id:3,
    name:'Stripe',
    image:"img/3.png",
    address:"San Francisco, CA , USA",
    linkedinlink:"linkedin.com/company/stripe",
    facebooklink:"fb.com/stripe",
    twitterlink:"twitter.com/stripe",
    website:"stripe.com",
    primary_role:"company",
    short_description:"Stripe is the company"
   } 
  ]

  

 $scope.showAlert1 = function(com) {

      $scope.opencompanyonCrunch = function(){
        company_url_oncrunch = "https://www.crunchbase.com/organization/" + com.name;
        cordova.InAppBrowser.open(company_url_oncrunch, '_system', 'location=yes');  
      }

     var customTemplate =
      '<div class="item item-avatar" ng-controller="crunchbaseController">' +
      '<img src="'+com.image+'"/>' +
      '<h2 class="popoup_heading_limit">'+com.name+'</h2>' +
      '<label>'+com.primary_role+'</lable>' + 
      '<br/>' +
      '</div>' +
      '<div style="padding-left: 15px;">'+com.short_description+'</div>' + 
      '<div class="list" style="margin-top: 1px;">' +
        '<span class="item item-icon-left" id="locationurl" ng-click="abc($event);" style="border-width: 0px;">' +
            '<i class="icon ion-location"></i>' +
            com.address +
        '</span>' +

        '<span class="item item-icon-left" id="linkedin" ng-click="abc($event);" style="border-width: 0px;">' +
            '<i class="icon ion-social-linkedin"></i>' +
            com.linkedinlink +
        '</span>' +

        '<span class="item item-icon-left" id="fburl" ng-click="abc($event);" style="border-width: 0px;">' +
            '<i class="icon ion-social-facebook"></i>' +
            com.facebooklink +
        '</span>' +

        '<span class="item item-icon-left" id="twitterurl" ng-click="abc($event);" style="border-width: 0px;">' +
            '<i class="icon ion-social-twitter"></i>' +
            com.twitterlink +
        '</span>' +

        '<span class="item item-icon-left" id="homeurl" ng-click="abc($event);" style="border-width: 0px;">' +
            '<i class="icon ion-earth"></i>' +
            com.website +
        '</span>' +
        
     '</div>'+
     '<div class="bar bar-footer bar-balanced backgroud">'+
            '<div class="title" style="font-size: 16px;" ng-click="opencompanyonCrunch()">View more on <b>CrunchBase</b></div>'+
    '</div>';

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: customTemplate,
      scope: $scope,
      title: '<h3 class="popoup_heading_limit">' + com.name + '</h3>',
      buttons: [{
        text:  '<i class="ion-close-round"></i>',
        onTap: function(e) {

        }
      }]
      
    });
  };*/
   //end offline code
 
  
})