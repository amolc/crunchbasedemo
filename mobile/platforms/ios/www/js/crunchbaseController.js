angular.module('starter.controllers')

.controller('crunchbaseController', function($scope, $sce, $http, $state, $location, $ionicPopup, $timeout) {

   $scope.init = function() {
    
   }
  
  $scope.openPopup = function(comp) {

    var websiteadd = comp.properties.homepage_url;
    var linkedinadd = comp.properties.linkedin_url;
    var facebookadd = comp.properties.facebook_url;
    var twitteradd = comp.properties.twitter_url;
    var location = "https://www.google.co.in/maps/place/" +  comp.properties.city_name;
   
    var customTemplate =
      '<div class="item item-avatar">' +
      '<img src="'+comp.properties.profile_image_url+'"/>' +
      '<h2>'+comp.properties.name+'</h2>' +
      '<label>'+comp.properties.primary_role+'</lable>' + 
      '<br/>' +
      '</div>' +
      '<div style="padding-left: 15px;">'+comp.properties.short_description+'</div>' + 
      '<div class="list" style="margin-top: 1px;">' +
        '<a class="item item-icon-left" href="'+location+'" style="border-width: 0px;">' +
            '<i class="icon ion-location"></i>' +
            comp.properties.city_name +
        '</a>' +

        '<a class="item item-icon-left" href="'+linkedinadd+'" style="border-width: 0px;">' +
            '<i class="icon ion-social-linkedin"></i>' +
            comp.properties.linkedin_url +
        '</a>' +

        '<a class="item item-icon-left" href="'+facebookadd+'" style="border-width: 0px;">' +
            '<i class="icon ion-social-facebook"></i>' +
            comp.properties.facebook_url +
        '</a>' +

        '<a class="item item-icon-left" href="'+twitteradd+'" style="border-width: 0px;">' +
            '<i class="icon ion-social-twitter"></i>' +
            comp.properties.twitter_url +
        '</a>' +

        '<a class="item item-icon-left" href="'+websiteadd+'" style="border-width: 0px;">' +
            '<i class="icon ion-earth"></i>' +
            comp.properties.homepage_url +
        '</a>' +
     '</div>';

    $ionicPopup.show({
      template: customTemplate,
      title: '<h3>' + comp.properties.name + '</h3>',
      buttons: [{
        text:  '<i class="ion-close-round"></i>',
        onTap: function(e) {

        }
      }]
    });

  }

    
    $scope.searchcompany = function(){
     
      var companyurl = baseUrl+"name="+$scope.companyname.value+"&"+"user_key="+userkey;
      $http.get(companyurl, {
        header:{'Access-Control-Allow-Origin': '*'}
      }).success(function(res,req) { 
          $scope.companydetails = res.data.items;
          if($scope.companydetails == ""){
              //console.log("company not found");
              $scope.organization_not_found = 'Couldn’t find any companies with that name';
              $scope.showorganization_not_found = true;

              $timeout(function() {
                $scope.showorganization_not_found = false;
              }, 10000);
          }        
      });
    
    }

   

/*    $scope.autosuggested_names = function(){
     $scope.organisationlist = [];  
      if($scope.companyname.length > 2){
        console.log("length is greater than 2");
        console.log($scope.companyname);
        var autosuggestednames = baseUrl+"name="+$scope.companyname+"&"+"user_key="+userkey;
          $http.get(autosuggestednames, {
            header:{'Access-Control-Allow-Origin': '*'}
          }).success(function(res,req) { 
            
            var items_obj = res.data.items;
            
            for (var i = 0; i < items_obj.length; i++) {
               $scope.organisationlist.push(items_obj[i].properties.name);
            }
              //console.log($scope.organisationlist);
          });
      }
    
    }*/

/*************** New dynamic Auto Completed Code********************/

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

      /*if(term.length < 2){*/

          var autosuggestednames = baseUrl+"name="+term+"&"+"user_key="+userkey;
          return $http.get(autosuggestednames).then(
            
            function success(data) {
              var results = []; 
              var compantlistobj = data.data.data.items;
               //console.log("compantlistobj:",compantlistobj.length);

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
              
              // this callback will be called asynchronously
              // when the response is available
            },
            function error(data) {
              return data;
            });
      /*}else{
        var results = [];
        $scope.tags = [];
        $scope.onlycompany_names = [];
        return results;
      }*/
    }

    $scope.autocomplete_options = {
      suggest: suggest_state_remote,
      on_error: console.log
    };
 
/*************** End New dynamic Auto Completed Code********************/  
  
});