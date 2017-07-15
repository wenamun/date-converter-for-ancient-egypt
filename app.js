'use strict';

var URL_BASE = "http://online-resourcen.de/api/";

var egyptianMonths = [
    { name: 'Thoth = Achet I', value: '1' },
    { name: 'Phaophi = Achet II', value: '2' },
    { name: 'Hathyr = Achet III', value: '3' },
    { name: 'Choiak = Achet IV', value: '4' },
    { name: 'Tybi = Peret I', value: '5' },
    { name: 'Mecheir = Peret II', value: '6' },
    { name: 'Phamenoth = Peret III', value: '7' },
    { name: 'Pharmuthi = Peret IV', value: '8' },
    { name: 'Pachons = Shemu I', value: '9' },
    { name: 'Payni = Shemu II', value: '10' },
    { name: 'Epeiph = Shemu III', value: '11' },
    { name: 'Mesore = Shemu IV', value: '12' },
    { name: 'epagomenal days', value: '13' }
];

angular.module('dcApp', ['ngResource','ngRoute','ngMessages'])
.config(function ($routeProvider,$locationProvider){
    $routeProvider.
        when('/romanEmperors', {
            templateUrl: 'partials/roman.html',
            controller: 'convertDateRomanCtrl'
        })
        .when('/ptolemies', {
            templateUrl: 'partials/ptolemies.html',
            controller: 'convertDatePtolemiesCtrl'
        })
        .when('/latePeriod', {
            templateUrl: 'partials/latePeriod.html',
            controller: 'convertDateLatePeriodCtrl'
        })
        .when('/home', {
            templateUrl: 'partials/home.html'
        })
        .when('/rest_api', {
            templateUrl: 'partials/rest_api.html'
        })
        .when('/about', {
            templateUrl: 'partials/about.html'
        })
        .when('/contact', {
            templateUrl: 'partials/contact.html',
            controller: 'sendMessageCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
        $locationProvider.html5Mode({
          enabled: true
        });
})
.factory('Date',function($resource){
    return $resource(URL_BASE + ':period/:reign/:year/:month/:day',
    {},
    {add:{headers:{'Content-Type':'application/json'}}});
})
.controller("convertDateRomanCtrl", function ($scope,Date){
    $scope.romanEmperorsOptions = [
        { name: 'Augustus, years 1-43', value: '1' },
        { name: 'Tiberius, years 1-23', value: '2' },
        { name: 'Caligula, years 1-5', value: '3' },
        { name: 'Claudius, years 1-15', value: '4' },
        { name: 'Nero, years 1-14', value: '5' },
        { name: 'Galba, years 1-2', value: '6' },
        { name: 'Otho, year 1', value: '7' },
        { name: 'Vitellius, years 1-2', value: '8' },
        { name: 'Vespasian, years 1-11', value: '9' },
        { name: 'Titus, years 1-4', value: '10' },
        { name: 'Domitian, years 1-16', value: '11' },
        { name: 'Nerva, years 1-2', value: '12' },
        { name: 'Traian, years 1-20', value: '13' },
        { name: 'Hadrian, years 1-22', value: '14' },
        { name: 'Antoninus Pius, years 1-24', value: '15' },
        { name: 'Marc Aurel, years 1-20', value: '16' },
        { name: 'Commodus, years 20-33', value: '17' },
        { name: 'Pertinax, year 1', value: '18' },
        { name: 'Pescennius Niger, years 1-2', value: '19' },
        { name: 'Septimius Severus, years 1-19', value: '20' },
        { name: 'Caracalla, years 19-25', value: '21' },
        { name: 'Macrinus, years 1-2', value: '22' },
        { name: 'Elagabal, years 1-5', value: '23' },
        { name: 'Severus Alexander, years 1-14', value: '24' },
        { name: 'Maximinus Thrax, years 1-4', value: '25' },
        { name: 'Gordian, years 1-7', value: '26' },
        { name: 'Phillipus Arabs, years 1-7', value: '27' },
        { name: 'Decius, years 1-2', value: '28' },
        { name: 'Gallus / Volusianus, years 1-3', value: '29' },
        { name: 'Aemilian, years 1-2', value: '30' },
        { name: 'Valerian / Gallienus, years 1-8', value: '31' },
        { name: 'Macrianus / Quietus, years 1-2', value: '32' },
        { name: 'Gallienus, years 9-16', value: '33' },
        { name: 'Claudius Gothicus, years 1-2', value: '34' },
        { name: 'Aurelian, years 1-7', value: '35' },
        { name: 'Tacitus, year 1', value: '36' },
        { name: 'Probus, years 1-7', value: '37' },
        { name: 'Carus / Carinus, years 1-3', value: '38' },
        { name: 'Diocletian, years 1 ff.', value: '39' }
    ];
    $scope.formRoman = { romanEmperors : $scope.romanEmperorsOptions[0].value };
    $scope.monthOptions = egyptianMonths;
    var romanMonths = { months : $scope.monthOptions[0].value };
    angular.extend($scope.formRoman, romanMonths);
    $scope.convert = function(){
        $scope.convert.result = "";
        var date_params = {
            'period':'romanEmperors',
            'reign':$scope.formRoman.romanEmperors,
            'year':$scope.formRoman.year,
            'month':$scope.formRoman.months,
            'day':$scope.formRoman.day
        };
        var result = Date.get(date_params, function(){
        }, function(response){
            $scope.convert.result = response.data.message;
        });
        result.$promise.then(function(d) {
           $scope.convert.result = getDateString(d);
        });
    };
    $scope.clearData = function() {
        $scope.formRoman.year = undefined;
        $scope.formRoman.day = undefined;
        $scope.formRoman.romanEmperors = $scope.romanEmperorsOptions[0].value;
        $scope.formRoman.months = $scope.monthOptions[0].value
        $scope.convert.result = "";
        $scope.form_roman.year.$setUntouched();
        $scope.form_roman.day.$setUntouched();
    };
})
.controller("convertDatePtolemiesCtrl", function ($scope,Date){
    $scope.ptolemiesOptions = [
        { name: 'Alexander III (the Great), years 1-9', value: '1' },
        { name: 'Philip Arrhidaeus, years 1-8', value: '2' },
        { name: 'Alexander IV, years 1-13', value: '3' },
        { name: 'Ptolemy I Soter, years 1-21', value: '4' },
        { name: 'Ptolemy II Philadelphus, years 1-39', value: '5' },
        { name: 'Ptolemy III Euergetes, years 1-26', value: '6' },
        { name: 'Ptolemy IV Philopator, years 1-18', value: '7' },
        { name: 'Ptolemy V Epiphanes, years 1-25', value: '8' },
        { name: 'Ptolemy VI Philometor, years 1-12', value: '9' },
        { name: 'Ptolemy VI Philometor, Ptolemy VIII (Euergetes II), Cleopatra II, years 1-7 / 12-18', value: '10' },
        { name: 'Ptolemy VIII (Euergetes II) alone, year 7', value: '11' },
        { name: 'Ptolemy VI Philometor and Cleopatra II restored, years 18-36', value: '12' },
        { name: 'Ptolemy VII Neos Philopator, year 1', value: '13' },
        { name: 'Ptolemy VIII Euergetes II restored, years 25-54', value: '14' },
        { name: 'Cleopatra III and Ptolemy IX Soter II (Lathyros), years 1-11', value: '15' },
        { name: 'Cleopatra III and Ptolemy X Alexander I, years 11-17', value: '16' },
        { name: 'Ptolemy X Alexander I and Cleopatra III, years 8-14', value: '17' },
        { name: 'Ptolemy X Alexander I and Cleopatra Berenice, years 14-27', value: '18' },
        { name: 'Ptolemy IX Soter II (Lathyros) restored, years 30-37', value: '19' },
        { name: 'Cleopatra Berenice (afterwards with Ptolemy XI Alexander II), year 1', value: '20' },
        { name: 'Ptolemy XII Neos Dionysos (Auletes), years 1-24', value: '21' },
        { name: 'Berenice IV (at first with Cleopatra Tryphaena), years 1-2', value: '22' },
        { name: 'Berenice IV and Archelaus, years 2-3', value: '23' },
        { name: 'Archelaus and Berenice IV, years 1-2', value: '24' },
        { name: 'Ptolemy XII Neos Dionysos (Auletes) restored, years 26-30', value: '25' },
        { name: 'Cleopatra VII Philopator, years 1-22', value: '26' }
    ];
    $scope.formPtolemies = { ptolemies : $scope.ptolemiesOptions[0].value };
    $scope.monthOptions = egyptianMonths;
    var ptolemaicMonths = { months : $scope.monthOptions[0].value };
    angular.extend($scope.formPtolemies, ptolemaicMonths);
    $scope.convert = function(){
        $scope.convert.result = "";
        var date_params = {
            'period':'ptolemies',
            'reign':$scope.formPtolemies.ptolemies,
            'year':$scope.formPtolemies.year,
            'month':$scope.formPtolemies.months,
            'day':$scope.formPtolemies.day
        };
        var result = Date.get(date_params, function(){
        }, function(response){
            $scope.convert.result = response.data.message;
        });
        result.$promise.then(function(d) {
           $scope.convert.result = getDateString(d);
        });
    };
    $scope.clearData = function() {
        $scope.formPtolemies.year = undefined;
        $scope.formPtolemies.day = undefined;
        $scope.formPtolemies.ptolemies = $scope.ptolemiesOptions[0].value;
        $scope.formPtolemies.months = $scope.monthOptions[0].value
        $scope.convert.result = "";
        $scope.form_ptol.year.$setUntouched();
        $scope.form_ptol.day.$setUntouched();
    };
})
.controller("convertDateLatePeriodCtrl", function ($scope,Date){
    $scope.latePeriodOptions = [
        { name: 'Psametik I, years 1-55', value: '1' },
        { name: 'Necho, years 1-16', value: '2' },
        { name: 'Psametik II, years 1-7', value: '3' },
        { name: 'Apries, years 1-20', value: '4' },
        { name: 'Amasis, years 1-45', value: '5' },
        { name: 'Psametik III, years 1-2', value: '6' },
        { name: 'Cambyses, years 1-4', value: '7' },
        { name: 'Darius I, years 1-36', value: '8' },
        { name: 'Xerxes I, years 1-21', value: '9' },
        { name: 'Artaxerxes, years 1-42', value: '10' },
        { name: 'Darius II, years 1-20', value: '11' },
        { name: 'Artaxerxes II, years 1-4', value: '12' },
        { name: 'Amyrtaeos, years 1-6', value: '13' },
        { name: 'Nepherites I, years 1-7', value: '14' },
        { name: 'Achoris, years 1-14', value: '15' },
        { name: 'Psammuthis, year 1', value: '16' },
        { name: 'Nepherites II, year 1', value: '17' },
        { name: 'Nektanebo I, years 1-19', value: '18' },
        { name: 'Theos, years 1-5', value: '19' },
        { name: 'Nektanebo II, years 1-18', value: '20' },
        { name: 'Artaxerxes III, years 1-6', value: '21' },
        { name: 'Arses, years 1-2', value: '22' },
        { name: 'Darius III, years 1-6', value: '23' },
        { name: 'Khababash, years 1-3', value: '24' }
    ];
    $scope.formLatePeriod = { latePeriod : $scope.latePeriodOptions[0].value };
    $scope.monthOptions = egyptianMonths;
    var latePeriodMonths = { months : $scope.monthOptions[0].value };
    angular.extend($scope.formLatePeriod, latePeriodMonths);
    $scope.convert = function(){
        $scope.convert.result = "";
        var date_params = {
            'period':'latePeriod',
            'reign':$scope.formLatePeriod.latePeriod,
            'year':$scope.formLatePeriod.year,
            'month':$scope.formLatePeriod.months,
            'day':$scope.formLatePeriod.day
        };
        var result = Date.get(date_params, function(){
        }, function(response){
            $scope.convert.result = response.data.message;
        });
        result.$promise.then(function(d) {
           $scope.convert.result = getDateString(d);
        });
    };
    $scope.clearData = function() {
        $scope.formLatePeriod.year = undefined;
        $scope.formLatePeriod.day = undefined;
        $scope.formLatePeriod.latePeriod = $scope.latePeriodOptions[0].value;
        $scope.formLatePeriod.months = $scope.monthOptions[0].value
        $scope.convert.result = "";
        $scope.form_lp.year.$setUntouched();
        $scope.form_lp.day.$setUntouched();
    };
})
.controller("sendMessageCtrl", function ($scope,$http){
    $scope.sendMessage = function(){
        var data = $.param({
            name: $scope.formMessage.name,
            email: $scope.formMessage.email,
            message: $scope.formMessage.message
        });
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        $http.post('http://online-resourcen.de/m/sendMessage.php', data, config)
        .success(function (data, status, headers, config) {
            $scope.sendMessage.result = data.result;
        })
        .error(function (data, status, header, config) {
            var error_message = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            $scope.sendMessage.result = error_message;
        });
    };
    $scope.reset = function() {
        $scope.formMessage.message = undefined;
        $scope.formMessage.name = undefined;
        $scope.formMessage.email = undefined;
        $scope.sendMessage.result = "";
        $scope.form_Message.message.$setUntouched();
        $scope.form_Message.name.$setUntouched();
        $scope.form_Message.email.$setUntouched();
    };
});

function getDateString(d){
    if (d.status === "success"){
        var stringBuffer = "";
        if (d.data.type === "range"){
            stringBuffer = formatDateString(d.data.dateRangeStart.dateJulian) + " - " +
                formatDateString(d.data.dateRangeEnd.dateJulian) + " (Julian date)";
            stringBuffer += " = " + formatDateString(d.data.dateRangeStart.dateGregorian) + " - " +
                    formatDateString(d.data.dateRangeEnd.dateGregorian) + " (Gregorian date)";
        } else if (d.data.type === "day") {
            stringBuffer = formatDateString(d.data.dateJulian) + " (Julian date)";
            stringBuffer += " = " + formatDateString(d.data.dateGregorian) + " (Gregorian date)";
        }
        return stringBuffer;
    } else {
        return "some error occurred!";
    }
}

function formatDateString(datum){
    var datumArray = datum.split("-");
    if (datumArray.length == 4){
        return parseInt(datumArray[3],10) + " " + getMonthName(datumArray[2]) + " " + parseInt(datumArray[1],10) + " BC";
    } else {
        return parseInt(datumArray[2],10) + " " + getMonthName(datumArray[1]) + " " + parseInt(datumArray[0],10) + " AD";
    }
}

function getMonthName(m){
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return months[parseInt(m,10)-1];
}
