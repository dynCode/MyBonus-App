//-- AngularJS --//
(function(){
    'use strict';

    var module = angular.module('app', ['onsen']);

    module.controller('AppController', function ($scope, $http, $window, $timeout) {
        $scope.data = [];
        
        //API URL path
        var apiPath = 'http://www.myitmanager.co.za/myBonusApp/api';
        
        //Membder Data
        $scope.userMpacc = ''; 
        $scope.newMpacc = ''; 
        $scope.userPass = ''; 
        $scope.loggedIn = false; 
        $scope.updateDate = '';
        $scope.totalEarned = '';
        $scope.totalBonusEarned = '';
        $scope.totalUsed = '';
        $scope.totalBucks = '';
        $scope.currentUnits = '';
        $scope.currentRands = '';
        $scope.sessionId = '';
        $scope.FirstName = '';
        $scope.LastName = '';
        $scope.gender = '';
        $scope.IdNumber = '';
        $scope.dob = '';
        $scope.EmailAddress = '';
        $scope.ContactNumber = '';
        $scope.Province = '';
        $scope.City = '';
        $scope.Suburb = '';
        $scope.Addressline1 = '';
        $scope.Addressline2 = '';
        $scope.Addressline3 = '';
        $scope.postalCode = '';
        
        //Category Partner Lists
        $scope.catList = [];
        $scope.catPartnerGroupList = [];
        $scope.groupPartnerList = [];
        
        //Partner Data
        $scope.partner_group = '';
        $scope.partner_name = '';
        $scope.partner_province = '';
        $scope.partner_city = '';
        $scope.partner_address = '';
        $scope.partner_tel = '';
        
        //Transaction list
        $scope.transList = [];
        
        //Profile Summary List
        $scope.proSumList = [];
        
        // test auto complete
        /* will use later
        $scope.movies = ["Lord of the Rings",
                        "Drive",
                        "Science of Sleep",
                        "Back to the Future",
                        "Oldboy"];

        // gives another movie array on change
        $scope.updateMovies = function(typed){
            $scope.newmovies.then(function(data){
                $scope.movies = data;
            });
        }
        */

        $scope.init = function() {
            var user = $window.localStorage.getItem('userMpacc'); 
            var pass = $window.localStorage.getItem('userPass'); 
            
            if (user && pass) {
                modal.show();
                $scope.data.errorCode = 'Processing, please wait...';
                $http.post(apiPath + '/login.php', {"reqType" : "login", "user" : user, "pass" : pass})
                .success(function(data, status){
                    if (data['error'] == 0) {
                        modal.hide();
                        console.log(data);
                        $scope.data.result = data['html'];
                        $scope.updateDate = data['updateDate'];
                        $scope.totalEarned = data['totalEarned'];
                        $scope.totalBonusEarned = data['totalBonusEarned'];
                        $scope.totalUsed = data['totalUsed'];
                        $scope.totalBucks = data['totalBucks'];
                        $scope.currentUnits = data['currentUnits'];
                        $scope.currentRands = data['currentRands'];
                        $scope.userMpacc = user;
                        $scope.newMpacc = data['NewMPacc'];
                        $scope.sessionId = data['sessionId'];
                        $scope.loggedIn = true;
                        
                        $scope.FirstName = data['FirstName'];
                        $scope.LastName = data['LastName'];
                        $scope.gender = data['gender'];
                        $scope.IdNumber = data['IdNumber'];
                        $scope.dob = data['dob'];
                        $scope.EmailAddress = data['EmailAddress'];
                        $scope.ContactNumber = data['ContactNumber'];
                        $scope.Province = data['Province'];
                        $scope.City = data['City'];
                        $scope.Suburb = data['Suburb'];
                        $scope.Addressline1 = data['Addressline1'];
                        $scope.Addressline2 = data['Addressline2'];
                        $scope.Addressline3 = data['Addressline3'];
                        $scope.postalCode = data['postalCode'];
                        
                        modal.show();
                        $scope.data.errorCode = 'Collecting your data...';
                        
                        $timeout(function(){
                            modal.hide();
                            myNavigator.pushPage('views/users/home.html', { animation : 'fade' });
                        },'2000');
                        
                    } else {
                        modal.hide();
                        $scope.data.result = data['html'];
                        $scope.data.errorCode = data['html'];
                        modal.show();
                    }
                })
                .error(function(data, status) {
                    modal.hide();
                    console.log(status);
                    console.log(data);
                    $scope.data.errorCode = 'Request failed' + data;
                    modal.show();
                });
            }
        }    
        
        // process login
        $scope.LogIn = function() {
            var user = $scope.data.loyaltyNum;
            var pass = $scope.data.password;
            
            console.log('U:'+user+' P:'+pass);
            
            if (user && pass) {
                modal.show();
                $scope.data.errorCode = 'Processing, please wait...';
                $http.post(apiPath + '/login.php', {"reqType" : "login", "user" : user, "pass" : pass})
                .success(function(data, status){
                    if (data['error'] == 0) {
                        modal.hide();
                        console.log(data);
                        $scope.data.result = data['html'];
                        $scope.updateDate = data['updateDate'];
                        $scope.totalEarned = data['totalEarned'];
                        $scope.totalBonusEarned = data['totalBonusEarned'];
                        $scope.totalUsed = data['totalUsed'];
                        $scope.totalBucks = data['totalBucks'];
                        $scope.currentUnits = data['currentUnits'];
                        $scope.currentRands = data['currentRands'];
                        $scope.userMpacc = user;
                        $scope.newMpacc = data['NewMPacc'];
                        $scope.loggedIn = true;
                        $scope.sessionId = data['sessionId'];
                        
                        $scope.FirstName = data['FirstName'];
                        $scope.LastName = data['LastName'];
                        $scope.gender = data['gender'];
                        $scope.IdNumber = data['IdNumber'];
                        $scope.dob = data['dob'];
                        $scope.EmailAddress = data['EmailAddress'];
                        $scope.ContactNumber = data['ContactNumber'];
                        $scope.Province = data['Province'];
                        $scope.City = data['City'];
                        $scope.Suburb = data['Suburb'];
                        $scope.Addressline1 = data['Addressline1'];
                        $scope.Addressline2 = data['Addressline2'];
                        $scope.Addressline3 = data['Addressline3'];
                        $scope.postalCode = data['postalCode'];
                        
                        $window.localStorage.setItem('userMpacc',user); 
                        $window.localStorage.setItem('userPass',pass); 
                        
                        modal.show();
                        $scope.data.errorCode = 'Collecting your data...';
                        
                        $timeout(function(){
                            modal.hide();
                            myNavigator.pushPage('views/users/home.html', { animation : 'fade' });
                        },'2000');
                        
                    } else {
                        modal.hide();
                        $scope.data.result = data['html'];
                        $scope.data.errorCode = data['html'];
                        modal.show();
                    }
                })
                .error(function(data, status) {
                    modal.hide();
                    console.log(status);
                    console.log(data);
                    $scope.data.errorCode = 'Request failed' + data;
                    modal.show();
                });
            } else {
                $scope.data.errorCode = 'Invalid Loyalty Number or Password.';
                modal.show();
            }
        };
        
        // log out function
        $scope.logout = function(){
            $scope.data = [];
            $window.localStorage.removeItem('userMpacc'); 
            $window.localStorage.removeItem('userPass'); 
            $scope.loggedIn = false;
            myNavigator.pushPage('views/home.html', { animation : 'fade' });
        };
        
        //get category list
        $scope.getCatList = function() {
            $scope.catList = [];
            modal.show();
            $scope.data.errorCode = 'Processing, please wait...';
            $http.post(apiPath + '/catList.php', {"reqType" : "listCat", "partnerCat" : "catList"})
            .success(function(data, status){
                modal.hide();
                console.log(data);
                $scope.catList = data;
                if (data) {
                    myNavigator.pushPage('views/partners/partnerCats.html', { animation : 'fade'});
                } else {
                    $scope.data.errorCode = 'No Partners were found!';
                    modal.show();
                }         
            })
            .error(function(data, status) {
                console.log(data);
                console.log(status);
                modal.hide();
                $scope.data.errorCode = 'Request failed';
                modal.show();
            });
        };
        
        //get partner group list
        $scope.getPartnerGroupList = function(catName) {
            var partnerCat = catName;
            $scope.catPartnerGroupList = [];
            modal.show();
            $scope.data.errorCode = 'Processing, please wait...';
            $http.post(apiPath + '/partnerGroupList.php', {"reqType" : "listCat", "partnerCat" : partnerCat})
            .success(function(data, status){
                modal.hide();
                console.log(data);
                $scope.catPartnerGroupList = data;
                if (data) {
                    myNavigator.pushPage('views/partners/partnerGroupList.html', { animation : 'fade'});
                } else {
                    $scope.data.errorCode = 'No Partners were found!';
                    modal.show();
                }         
            })
            .error(function(data, status) {
                console.log(data);
                console.log(status);
                modal.hide();
                $scope.data.errorCode = 'Request failed';
                modal.show();
            });
        };
        
        //get partner group list
        $scope.getPartnerList = function(groupName) {
            var partnerGroup = groupName;
            $scope.groupPartnerList = [];
            modal.show();
            $scope.data.errorCode = 'Processing, please wait...';
            $http.post(apiPath + '/partnerList.php', {"reqType" : "listCat", "partnerCat" : partnerGroup})
            .success(function(data, status){
                modal.hide();
                console.log(data);
                $scope.groupPartnerList = data;
                if (data) {
                    myNavigator.pushPage('views/partners/partners.html', { animation : 'fade'});
                } else {
                    $scope.data.errorCode = 'No Partners were found!';
                    modal.show();
                }         
            })
            .error(function(data, status) {
                console.log(data);
                console.log(status);
                modal.hide();
                $scope.data.errorCode = 'Request failed';
                modal.show();
            });
        };
        
        //get transaction list
        $scope.getTransList = function() {
            var user = $window.localStorage.getItem('userMpacc'); 
            var pass = $window.localStorage.getItem('userPass'); 
            
            $scope.transList = [];
            modal.show();
            $scope.data.errorCode = 'Processing, please wait...';
            $http.post(apiPath + '/translistList.php', {"user" : user, "pass" : pass, "sessionId" : $scope.sessionId})
            .success(function(data, status){
                modal.hide();
                console.log(data);
                $scope.transList = data;
                if (data) {
                    myNavigator.pushPage('views/users/transactions.html', { animation : 'fade'});
                } else {
                    $scope.data.errorCode = 'No transactions were found!';
                    modal.show();
                }         
            })
            .error(function(data, status) {
                console.log(data);
                console.log(status);
                modal.hide();
                $scope.data.errorCode = 'Request failed';
                modal.show();
            });
        };
        
        // get profile summary list
        /*
        $scope.getProfileSum = function () {
            $scope.proSumList = [];
            modal.show();
            $scope.data.errorCode = 'Processing, please wait...';
            $http.post(apiPath + '/profileSummary.php', {"mpacc" : $scope.userMpacc, "sessionId" : $scope.sessionId})
            .success(function(data, status){
                modal.hide();
                console.log(data);
                $scope.proSumList = data;
                if (data) {
                    myNavigator.pushPage('views/users/Profile.html', { animation : 'fade'});
                } else {
                    $scope.data.errorCode = 'No profile info was found!';
                    modal.show();
                }         
            })
            .error(function(data, status) {
                console.log(data);
                console.log(status);
                modal.hide();
                $scope.data.errorCode = 'Request failed';
                modal.show();
            });
        };
        */
    });
})();