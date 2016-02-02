angular.module('starter.controllers')

.controller('logincontroller', function($scope, $http, $state,$location,$ionicPopup) {

	 $scope.init = function() {
    
   }

  $scope.companylist = [
    {
      id:1,
      company:'Github',
      image:"img/1.png",
      address:"San Francisco, CA , USA",
      linkedinlink:"linkedin.com/company/github",
      facebooklink:"fb.com/github",
      twitterlink:"twitter.com/github",
      website:"github.com"
    },
    {
      id:2,
      company:'Airbnb',
      image:"img/5.jpg",
      address:"San Francisco, CA , USA",
      linkedinlink:"linkedin.com/company/airbnb",
      facebooklink:"fb.com/airbnb",
      twitterlink:"twitter.com/airbnb",
      website:"airbnb.com"
    },
    {
      id:3,
      company:'Stripe',
      image:"img/3.png",
      address:"San Francisco, CA , USA",
      linkedinlink:"linkedin.com/company/stripe",
      facebooklink:"fb.com/stripe",
      twitterlink:"twitter.com/stripe",
      website:"stripe.com"

    },
    {
      id:4,
      company:'Groupon',
      image:"img/2.png",
      address:"San Francisco, CA , USA",
      linkedinlink:"linkedin.com/company/groupon",
      facebooklink:"fb.com/groupon",
      twitterlink:"twitter.com/groupon",
      website:"groupon.com"
    },
    {
      id:5,
      company:'Google+',
      image:"img/7.png",
      address:"San Francisco, CA , USA",
      linkedinlink:"linkedin.com/company/google-plus",
      facebooklink:"fb.com/google-plus",
      twitterlink:"twitter.com/google-plus",
      website:"plus.google.com"
    },
    {
      id:6,
      company:'Apple',
      image:"img/8.png",
      address:"San Francisco, CA , USA",
      linkedinlink:"linkedin.com/company/apple",
      facebooklink:"fb.com/india.apple",
      twitterlink:"twitter.com/apple",
      website:"apple.com"
    }
  ]  

  //console.log($scope.companylist);

  $scope.testcruchdb = function(){
    var compname = 'SkillSoft';
     $http.post(baseUrl + 'getsamplecompany', compname).success(function(res,req){ 
        console.log(res);
     });
  }

  //$scope.testcruchdb();

  $scope.openPopup = function(comp) {
    var websiteadd = "http://www." + comp.website;
    var linkedinadd = "http://www." + comp.linkedinlink;
    var facebookadd = "http://www." + comp.facebooklink;
    var twitteradd = "http://www." + comp.twitterlink;
    var location = "https://www.google.co.in/maps/place/" + comp.address;
   
    var customTemplate =
      '<div class="item item-avatar">' +
      '<img src="'+comp.image+'"/>' +
      '<h2>'+comp.company+'</h2>' +
      '<label>Company</lable>' + 
      '<br/>' +
      '<div>Its features focus on users.</div>' +  
      '</div>' +
      '<div class="list" style="margin-top: 1px;">' +
        '<a class="item item-icon-left" href="'+location+'" style="border-width: 0px;">' +
            '<i class="icon ion-location"></i>' +
            comp.address +
        '</a>' +

        '<a class="item item-icon-left" href="'+linkedinadd+'" style="border-width: 0px;">' +
            '<i class="icon ion-social-linkedin"></i>' +
            comp.linkedinlink +
        '</a>' +

        '<a class="item item-icon-left" href="'+facebookadd+'" style="border-width: 0px;">' +
            '<i class="icon ion-social-facebook"></i>' +
            comp.facebooklink +
        '</a>' +

        '<a class="item item-icon-left" href="'+twitteradd+'" style="border-width: 0px;">' +
            '<i class="icon ion-social-twitter"></i>' +
            comp.twitterlink +
        '</a>' +

        '<a class="item item-icon-left" href="'+websiteadd+'" style="border-width: 0px;">' +
            '<i class="icon ion-earth"></i>' +
            comp.website +
        '</a>' +
     '</div>';
     console.log(comp.website);
    $ionicPopup.show({
      template: customTemplate,
      title: '<h3>' + comp.company + '</h3>',
      buttons: [{
        text:  '<i class="ion-close-round"></i>',
        onTap: function(e) {

        }
      }]
    });

  }
  
   
   /*
    @function userlogin
    @type post
    @author Sameer Vedpathak
    @initialDate 
    @lastDate
    **/
    // $scope.data = {
    //   user_email: '' ,
    //   user_password:''
    // };

    // $scope.userlogin = function(data,valid) {
    //   if(valid){
    //     $http.post(baseUrl + 'login', $scope.data).success(function(res,req){
    //         if(res.status == true){
    //           var userDetail = {
    //             login:'true',
    //             userid: res.record[0].id,
    //             useremail: res.record[0].user_email,
    //             username:res.record[0].user_name
    //           };
    //           store.set('userDetail', userDetail);
    //           $scope.init(); 
    //           $state.go('tab.addreminder'); 
    //         }else{
    //           $scope.loginerrormsg = 'Invalid Email Id and Password Combination';
    //           $scope.showloginerrormsg = true;
    //           // Simulate 2 seconds loading delay
    //           $timeout(function() {
    //             // Loadind done here - Show message for 3 more seconds.
    //             $timeout(function() {
    //               $scope.showloginerrormsg = false;
    //             }, 3000);

    //           }, 2000);
    //         }

    //         if(store.get('platform')){
    //           var deviceinfo = {
    //             platform: store.get('platform'),
    //             deviceid: store.get('deviceid'),
    //             device_token: store.get('device_token'),
    //             userid: $scope.usersession.userid
    //           }

    //           $http.post(baseUrl + 'deviceregister', deviceinfo).success(function(res,req){
    //             console.log("res:",res);
    //           }).error(function(){
    //               console.log("Error to get device info");
    //           });

    //         }
          
    //     }).error(function(){
    //       console.log("Connection Problem..");
    //     });

    //       //console.log("platform:",store.get('platform'));
    //       //console.log("deviceid:",store.get('deviceid'));
    //       //console.log("device_token:",store.get('device_token'));
          
    //   }
    // };

    // /**
    //   @function usersignout
    //   @author Sameer Vedpathak
    //   @initialDate 
    //   @lastDate
    // */
   
    // $scope.usersignout = function() {
    //   store.remove('userDetail');
    //   store.remove('platform');
    //   store.remove('deviceid');
    //   store.remove('device_token');
    //   $location.path('/login');
    //   document.getElementById("loginfrm").reset();
    // };

     
    // $scope.signup = function(info,valid){
    //   if(valid){
    //      $http.post(baseUrl + 'signup', info).success(function(res,req){
    //         console.log("res:",res);
    //         if(res.status == true)
    //           {
    //               $scope.signupmsg = 'User Created Successfully';
    //               $scope.showsignmsg = true;
                  
    //               $timeout(function() {
    //                 $timeout(function() {
    //                   $scope.showsignmsg = false;
    //                 }, 3000);
    //                 document.getElementById("signupfrm").reset();
    //                 $location.path('signin');
    //                 }, 2000);
    //           }else{
    //             if(res.record == ""){

    //               $scope.userexistmsg = 'User Already Exists..';
    //               $scope.showuserexistmsg = true;
                  
    //               $timeout(function() {
    //                 $timeout(function() {
    //                   $scope.showuserexistmsg = false;
    //                 }, 3000);
    //                 }, 2000);
    //             }else{

    //               $scope.userrormsg = 'User Not Crated';
    //               $scope.showuserrormsg = true;
                  
    //               $timeout(function() {
    //                 $timeout(function() {
    //                   $scope.showuserrormsg = false;
    //                 }, 3000);
    //                 }, 2000);
    //             }
    //           }
    //      }).error(function(){
    //         console.log("problem In signup");
    //      });  
    //   }
      
    // }

})