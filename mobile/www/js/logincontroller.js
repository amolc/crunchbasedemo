angular.module('starter.controllers')

.controller('logincontroller', function($scope, $http, $state,$location,$ionicPopup) {

	 $scope.init = function() {
    
   }

  $scope.companylist = [
    {
      id:1,
      company:'A'
    },
    {
      id:2,
      company:'B'
    },
    {
      id:3,
      company:'D'
    },
    {
      id:4,
      company:'E'
    },
    {
      id:5,
      company:'Github'
    }
  ]  

  console.log($scope.companylist);

  $scope.testcruchdb = function(){

    var compname = 'SkillSoft';
     $http.post(baseUrl + 'getsamplecompany', compname).success(function(res,req){ 
        console.log(res);
     });
  }

  $scope.openPopup = function() {

    var customTemplate =
      '<ion-toggle>enable</ion-toggle>' +
      '<label class="item item-input"><input type="text" placeholder="your address"></label>';

    $ionicPopup.show({
      template: customTemplate,
      title: 'alternative location',
      subTitle: 'select this option if GPS is unavailable',
      buttons: [{
        text: 'Cancel',
        //type: 'button-positive',
        onTap: function(e) {

        }
      }, {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          
        }
      }]
    });

  }
  //$scope.testcruchdb();
   
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