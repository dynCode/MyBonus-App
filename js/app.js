//-- AngularJS --//
(function(){
    'use strict';

    var module = angular.module('app', ['onsen']);

    module.controller('AppController', function ($scope, $http, $window, $timeout) {
        $scope.data = [];
        
        //API URL path
        var apiPath = 'http://www.mybonus.co.za/myBonusApp/api';
        
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
        $scope.title = '';
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
        $scope.Title = '';
        
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
        
        // distName drop down for registration
        $scope.searchOk = false;
        $scope.regCityDD = [];

        $scope.init = function() {
            var user = $window.localStorage.getItem('userMpacc'); 
            var pass = $window.localStorage.getItem('userPass'); 
            var proid = $window.localStorage.getItem('userProId'); 
            
            if (user && pass) {
                //modal.show();
                //$scope.data.errorCode = 'Processing, please wait...';
                $http.post(apiPath + '/login.php', {"reqType" : "login", "user" : user, "pass" : pass, "proid" : proid})
                .success(function(data, status){
                    if (data['error'] === 0) {
                        //modal.hide();
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
                        if (data['NewMPacc'] === null) {
                            $scope.newMpacc = user;
                        } else {
                            $scope.newMpacc = data['NewMPacc'];
                        }
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
                        $scope.Title = data['title'];
                        
                        //modal.show();
                        //$scope.data.errorCode = 'Collecting your data...';
                        
                        $timeout(function(){
                            //modal.hide();
                            myNavigator.pushPage('views/users/home.html', { animation : 'fade' });
                        },'2000');
                    } else if (data['error'] === 2) {    
                        modal.hide();
                        $scope.data.result = data['html'];
                        $scope.data.errorCode = data['html'];
                        modal.show();
                        $timeout(function(){
                            modal.hide();
                            myNavigator.pushPage('views/register.html', { animation : 'fade' });
                        },'2000');
                    } else {
                        modal.hide();
                        $scope.data.result = data['html'];
                        $scope.data.errorCode = data['html'];
                        modal.show();
                        $timeout(function(){
                            modal.hide();
                            myNavigator.pushPage('views/login.html', { animation : 'fade' });
                        },'1000');
                    }
                })
                .error(function(data, status) {
                    modal.hide();
                    $scope.data.errorCode = 'Request failed' + data;
                    modal.show();
                    $timeout(function(){
                        modal.hide();
                        myNavigator.pushPage('views/login.html', { animation : 'fade' });
                    },'1000');
                });
            } else {
                $timeout(function(){
                    myNavigator.pushPage('views/login.html', { animation : 'fade' });
                },'1000');
            }
        }    
        
        // process login
        $scope.LogIn = function() {
            var user = $scope.data.loyaltyNum;
            var pass = $scope.data.password;
            var proid = $scope.data.procId;
            
            if (user && pass) {
                modal.show();
                $scope.data.errorCode = 'Processing, please wait...';
                $http.post(apiPath + '/login.php', {"reqType" : "login", "user" : user, "pass" : pass, "proid" : proid})
                .success(function(data, status){
                    if (data['error'] === 0) {
                        modal.hide();
                        $scope.data.result = data['html'];
                        $scope.updateDate = data['updateDate'];
                        $scope.totalEarned = data['totalEarned'];
                        $scope.totalBonusEarned = data['totalBonusEarned'];
                        $scope.totalUsed = data['totalUsed'];
                        $scope.totalBucks = data['totalBucks'];
                        $scope.currentUnits = data['currentUnits'];
                        $scope.currentRands = data['currentRands'];
                        $scope.userMpacc = user;
                        if (data['NewMPacc'] === null) {
                            $scope.newMpacc = user;
                        } else {
                            $scope.newMpacc = data['NewMPacc'];
                        }
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
                        $scope.Title = data['title'];
                        
                        $window.localStorage.setItem('userMpacc',user); 
                        $window.localStorage.setItem('userPass',pass); 
                        $window.localStorage.setItem('userProId',proid); 
                        
                        modal.show();
                        $scope.data.errorCode = 'Collecting your data...';
                        
                        $timeout(function(){
                            modal.hide();
                            myNavigator.pushPage('views/users/home.html', { animation : 'fade' });
                        },'2000');
                    } else if (data['error'] === 2) {    
                        modal.hide();
                        $scope.data.reg_Mpacc = user;
                        ons.notification.alert({
                            message: data['html'],
                            title: 'Error',
                            buttonLabel: 'Continue',
                            animation: 'default',
                            callback: function() {
                                myNavigator.pushPage('views/register.html', { animation : 'fade' });
                            }
                        });
                        
                    } else {
                        modal.hide();
                        $scope.data.result = data['html'];
                        $scope.data.errorCode = data['html'];
                        modal.show();
                        $timeout(function(){
                            modal.hide();
                            myNavigator.pushPage('views/login.html', { animation : 'fade' });
                        },'1000');
                    }
                })
                .error(function(data, status) {
                    modal.hide();
                    $scope.data.result = data['html'];
                    $scope.data.errorCode = data['html'];
                    modal.show();
                    $timeout(function(){
                        modal.hide();
                        myNavigator.pushPage('views/login.html', { animation : 'fade' });
                    },'1000');
                });
            } else {
                $scope.data.errorCode = 'Invalid Loyalty Number or Password.';
                modal.show();
                $timeout(function(){
                    modal.hide();
                    myNavigator.pushPage('views/login.html', { animation : 'fade' });
                },'1000');
            }
        };
        
        // log out function
        $scope.logout = function(){
            $scope.data = [];
            $window.localStorage.removeItem('userMpacc'); 
            $window.localStorage.removeItem('userPass'); 
            $scope.loggedIn = false;
            myNavigator.pushPage('views/login.html', { animation : 'fade' });
        };
        
        //password reset function
        $scope.resetPassword = function () {
            var resetMpacc = $scope.data.reset.loyaltyNum;
            
            if (resetMpacc) {
                modal.show();
                $scope.data.errorCode = 'Processing, please wait...';
                $http.post(apiPath + '/resetPassword.php', {"reqType" : "reset", "user" : resetMpacc})
                .success(function(data, status){
                    if (data['error'] === 0) {
                        
                    } else {
                        modal.hide();
                        $scope.data.result = data['html'];
                        $scope.data.errorCode = data['html'];
                        modal.show();
                        $timeout(function(){
                            modal.hide();
                            myNavigator.pushPage('views/login.html', { animation : 'fade' });
                        },'1000');
                    }
                })
                .error(function(data, status) {
                    modal.hide();
                    $scope.data.result = data['html'];
                    $scope.data.errorCode = data['html'];
                    modal.show();
                    $timeout(function(){
                        modal.hide();
                        myNavigator.pushPage('views/login.html', { animation : 'fade' });
                    },'1000');
                });
            } else {
                $scope.data.errorCode = 'Invalid Loyalty Number or Password.';
                modal.show();
                $timeout(function(){
                    modal.hide();
                    myNavigator.pushPage('views/login.html', { animation : 'fade' });
                },'1000');
            }
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
                $scope.catPartnerGroupList = data;
                if (data) {
                    myNavigator.pushPage('views/partners/partnerGroupList.html', { animation : 'fade'});
                } else {
                    $scope.data.errorCode = 'No Partners were found!';
                    modal.show();
                }         
            })
            .error(function(data, status) {
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
                $scope.groupPartnerList = data;
                if (data) {
                    myNavigator.pushPage('views/partners/partners.html', { animation : 'fade'});
                } else {
                    $scope.data.errorCode = 'No Partners were found!';
                    modal.show();
                }         
            })
            .error(function(data, status) {
                modal.hide();
                $scope.data.errorCode = 'Request failed';
                modal.show();
            });
        };
        
        //get transaction list
        $scope.getTransList = function() {
            var user = $window.localStorage.getItem('userMpacc'); 
            var pass = $window.localStorage.getItem('userPass'); 
            
            console.log("user: " + user+", pass: "+pass+", sessionId: " +$scope.sessionId);
            
            $scope.transList = [];
            modal.show();
            $scope.data.errorCode = 'Processing, please wait...';
            $http.post(apiPath + '/translistList.php', {"user" : user, "pass" : pass, "sessionId" : $scope.sessionId})
            .success(function(data, status){
                modal.hide();
                $scope.transList = data;
                if (data) {
                    myNavigator.pushPage('views/users/transactions.html', { animation : 'fade'});
                } else {
                    $scope.data.errorCode = 'No transactions were found!';
                    modal.show();
                }         
            })
            .error(function(data, status) {
                modal.hide();
                $scope.data.errorCode = 'Request failed';
                modal.show();
            });
        };
        
        //check ID Number (disabled for now)
        /*
        $scope.checkId = function () {
            var idVal = $scope.data.reg_IdNumber;
            var IDLen = idVal.length;

            if(IDLen != 13){
                $scope.data.errorCode = 'Your ID number is not valid';
                modal.show();
                $scope.data.reg_IdNumber.value = "";
                $scope.data.reg_IdNumber.focus();

                return false;
            }

            var checkDigit = parseInt(idVal.charAt(idVal.length - 1));
            var odd = 0;
            var even = "";
            var evenResult = 0;
            var result;
            for(var c = 1; c <= idVal.length; c++){
                if(c % 2 == 0){
                    even += idVal.charAt(c - 1);
                } else {
                    if(c == idVal.length){
                        continue;
                    } else {
                        odd = (parseInt(odd) + parseInt(idVal.charAt(c - 1)));
                    }
                }
            }
            even = (Number(even) * 2);
            even = even.toString();
            for(var r = 1; r <= even.length; r++){
                evenResult = (parseInt(evenResult) + parseInt(even.charAt(r - 1)));
            }
            result = (parseInt(odd) + parseInt(evenResult));
            result = result.toString();
            result = (10 - parseInt(result.charAt(result.length - 1)));
            result = result.toString();
            if(result.length > 1){
                result = result.charAt(result.length - 1);
            }
            if(parseInt(result) != checkDigit){
                $scope.data.errorCode = 'Your ID number is not valid';
                modal.show();
                $scope.data.reg_IdNumber.value = "";
                $scope.data.reg_IdNumber.focus();
            } else {
                return true;
            }
        };
        */
        
        //Registration of user
        // (New Way)
        $scope.registerMe = function () {
            var City = $scope.data.reg_City;
            var CNumber = $scope.data.reg_ContactNumber;
            var Email = $scope.data.reg_EmailAddress;
            var Name = $scope.data.reg_FirstName;
            var LastName = $scope.data.reg_LastName;
            var Province = $scope.data.reg_Province;
            var gender = $scope.data.reg_gender;
            var title = $scope.data.reg_title;
            var dobY = $scope.data.reg_year;
            var dobM = $scope.data.reg_month;
            var dobD = $scope.data.reg_day;
            var mpacc = $scope.data.reg_Mpacc;

            var dob = dobY+'-'+dobM+'-'+dobD;
            
            var regsPath;
            
            if(mpacc) {
                regsPath = apiPath + '/registerMpacc.php';
            } else {
                regsPath = apiPath + '/register.php';
            }
            
            if ( CNumber && Email && Name && LastName && gender && title ) {
                modal.show();
                console.log({"reqType" : "register", "city" : City, "telephoneNumber" : CNumber, "emailAddress" : Email, "givenNames" : Name, "surname" : LastName, "province" : Province, "gender" : gender, "title" : title, "dob" : dob, "MPacc" : mpacc});
                $scope.data.errorCode = 'Processing, please wait...';
                $http.post(regsPath, {"reqType" : "register", "city" : City, "telephoneNumber" : CNumber, "emailAddress" : Email, "givenNames" : Name, "surname" : LastName, "province" : Province, "gender" : gender, "title" : title, "dob" : dob, "MPacc" : mpacc })
                .success(function(data, status){
                    if (data['error'] === 0) {
                        modal.hide();
                        $scope.data.result = data['html'];
                        
                        $window.localStorage.setItem('userMpacc',data['userMpacc']); 
                        $window.localStorage.setItem('userPass',data['userMpacc']); 
                        
                        $timeout(function(){
                            modal.hide();
                            $scope.init();
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
                    $scope.data.errorCode = 'Request failed' + data;
                    modal.show();
                });
            } else {
                $scope.data.errorCode = 'Please complete all the flieds.';
                modal.show();
            }
        };
        /* OLD WAY
        $scope.registerMe = function () {
            var Addline1 = $scope.data.reg_Addressline1;
            var Addline2 = $scope.data.reg_Addressline2;
            var Addline3 = $scope.data.reg_Addressline3;
            var City = $scope.data.reg_City;
            var CNumber = $scope.data.reg_ContactNumber;
            var Email = $scope.data.reg_EmailAddress;
            var Name = $scope.data.reg_FirstName;
            var IdNum = $scope.data.reg_IdNumber;
            var LastName = $scope.data.reg_LastName;
            var Province = $scope.data.reg_Province;
            var Suburb = $scope.data.reg_Suburb;
            var gender = $scope.data.reg_gender;
            var postalCode = $scope.data.reg_postalCode;
            var title = $scope.data.reg_title;
            var reg_for =  $scope.data.reg_for;
            
            // set dob
            var iddob = IdNum.slice(0,6);
            var dobYear = iddob.slice(0,2);
            var dobMonth = iddob.slice(2,4);
            var dobDay = iddob.slice(4,6);

            var d = new Date();
            var n = d.getFullYear();
            var str = n.toString();
            var y = str.slice(2,4);    

            console.log('DOB: '+iddob+' dobYear: '+dobYear+' dobMonth: '+dobMonth+' dobDay: '+dobDay);

            if (dobYear >= '00' && dobYear <= y) {
                dobYear = '20'+dobYear;
            } else {
                dobYear = '19'+dobYear;
            }

            var dob = dobYear+'-'+dobMonth+'-'+dobDay;
            
            
            if (Addline1 && City && CNumber && Email && Name && IdNum && LastName && Province && Suburb && gender && postalCode && title) {
                modal.show();
                $scope.data.errorCode = 'Processing, please wait...';
                $http.post(apiPath + '/register.php', {"reqType" : "register", "line1" : Addline1, "line2" : Addline2, "line3" : Addline3, "city" : City, "telephoneNumber" : CNumber, "emailAddress" : Email, "givenNames" : Name, "nationalIdNum" : IdNum, "surname" : LastName, "province" : Province, "suburb" : Suburb, "gender" : gender, "postalCode" : postalCode, "title" : title, "dob" : dob, "reg_for" : reg_for})
                .success(function(data, status){
                    if (data['error'] == 0) {
                        modal.hide();
                        $scope.data.result = data['html'];
                        
                        $window.localStorage.setItem('userMpacc',data['userMpacc']); 
                        $window.localStorage.setItem('userPass',data['userMpacc']); 
                        
                        $timeout(function(){
                            modal.hide();
                            $scope.init();
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
                    $scope.data.errorCode = 'Request failed' + data;
                    modal.show();
                });
            } else {
                $scope.data.errorCode = 'Please complete all the flieds.';
                modal.show();
            }
        };
        */
        
        $scope.SetupUpdate = function() {
            $scope.data.up_Addline1 = $scope.Addressline1;
            $scope.data.up_Addline2 = $scope.Addressline2;
            $scope.data.up_Addline3 = $scope.Addressline3;
            $scope.data.up_City = $scope.City;
            $scope.data.up_CNumber = $scope.ContactNumber;
            $scope.data.up_Email = $scope.EmailAddress;
            $scope.data.up_Name = $scope.FirstName;
            $scope.data.up_IdNum = $scope.IdNumber;
            $scope.data.up_LName = $scope.LastName;
            $scope.data.up_Prov = $scope.Province;
            $scope.data.up_Sub = $scope.Suburb;
            $scope.data.up_sex = $scope.gender;
            $scope.data.up_pCode = $scope.postalCode;
            $scope.data.up_title = $scope.Title;
            
            myNavigator.pushPage('views/users/update.html', { animation : 'fade' });
            
        };
        
        //update member profile
        $scope.updateMe = function () {
            var user = $window.localStorage.getItem('userMpacc'); 
            var pass = $window.localStorage.getItem('userPass'); 
            var Addline1 = $scope.data.up_Addline1;
            var Addline2 = $scope.data.up_Addline2;
            var Addline3 = $scope.data.up_Addline3;
            var City = $scope.data.up_City;
            var CNumber = $scope.data.up_CNumber;
            var Email = $scope.data.up_Email;
            var Prov = $scope.data.up_Prov;
            var pCode = $scope.data.up_pCode;
            
            if (CNumber && Email) {
                modal.show();
                $scope.data.errorCode = 'Processing, please wait...';
                $http.post(apiPath + '/update.php', {"reqType" : "update", "line1" : Addline1, "line2" : Addline2, "line3" : Addline3, "city" : City, "telephoneNumber" : CNumber, "emailAddress" : Email, "province" : Prov, "postalCode" : pCode, "user" : user, "pass" : pass, "sessionId" : $scope.sessionId})
                .success(function(data, status){
                    if (data['error'] === 0) {
                        modal.hide();
                        $scope.data.result = data['html'];
                        $scope.data.errorCode = data['html'];
                        modal.show();
                        $timeout(function(){
                            modal.hide();
                            $scope.init();
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
                $scope.data.errorCode = 'Please complete all the flieds.';
                modal.show();
            }
        };
        
        // get dist code for registration
        $scope.getDistCode = function () {
            $scope.searchOk = false;
            $scope.regCityDD = [];
            var provCode;
            
            if (undefined != this.data.reg_Province) {
                console.log('Province',this.data.reg_Province);
                var provCode = this.data.reg_Province;
            } else {
                console.log('Province',this.data.up_Prov);
                var provCode = this.data.up_Prov;
            }
            
            modal.show();
            $scope.data.errorCode = 'Processing, please wait...';
            $http.post(apiPath + '/provlist.php', {"provCode" : provCode})
            .success(function(data, status){
                modal.hide();
                console.log('City Data',data);
                $scope.searchOk = true;
                $scope.regCityDD = data;
            })
            .error(function(data, status) {
                modal.hide();
                $scope.data.errorCode = 'Request failed';
                modal.show();
            });
        };
        
        // user passward change request
        $scope.passwordUpdate = function () {
            var password = $scope.data.password;
            var re_paswword = $scope.data.password_r;
            var cur_pass = $window.localStorage.getItem('userPass');
            
            if (password && re_paswword) {
                if (password.length >= 6) {
                    if (password === re_paswword) {
                        modal.show();
                        $scope.data.errorCode = 'Processing, please wait...';
                        
                        console.log("password:" + password +", oldpassword:" + cur_pass + ", sessionId:" + $scope.sessionId + ", member:" + $scope.userMpacc + ", fname:" + $scope.FirstName + ", telNum"  + $scope.ContactNumber);
                        
                        $http.post(apiPath + '/updatePassword.php', {"password" : password, "oldpassword" : cur_pass, "sessionId" : $scope.sessionId, "member" : $scope.userMpacc, "fname" : $scope.FirstName, "telNum" :$scope.ContactNumber})
                        .success(function(data, status){
                            if (data['error'] === 0) {
                                modal.hide();
                                $scope.data.result = data['html'];
                                $scope.data.errorCode = data['html'];
                                modal.show();
                                $timeout(function(){
                                    modal.hide();
                                    $scope.init();
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
                            $scope.data.errorCode = 'Request failed';
                            modal.show();
                        });
                    } else {
                        $scope.data.errorCode = 'Password did not match.';
                        modal.show();
                    }
                } else {
                    $scope.data.errorCode = 'Password not long enough.';
                    modal.show();
                }
            } else {
                $scope.data.errorCode = 'Please complete all the flieds.';
                modal.show();
            }
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

// regular JavaScript

function moveOnMax(field,nextFieldID,ml) { 
    var fl = document.getElementById(field).value.length;
    if(fl >= ml) { 
        document.getElementById(nextFieldID).focus(); 
    } 
}