'use strict';
var express = require('express');
var AV = require('leanengine');
var async = require('async');
var carInfo = require('./CarInfoClass');
var localData = require('./localData');
var client = require('./client');

var DID = AV.Object.extend('DID');
var Binding = AV.Object.extend('Bindings');
var User = AV.Object.extend('_User');

exports.initLocate = function(){
	var query = new AV.Query(DID);
	query.greaterThan('group',0);
	query.find().then(function(results){
		async.each(results,function(object){
			var car = new carInfo();
			var carName = object.get('name');
			if( carName == undefined){
				carName = '未知';
			}
			car.setIMEIAndCarName(object.get('IMEI'),carName);
			localData.carInfoArray()[localData.carInfoArray().length] = car;
			localData.IMEIList()[localData.IMEIList().length] = object.get('IMEI');
			var index = localData.carInfoArray().length - 1;
			
			
			//查询Bindings表获取User
			var queryBinding = new AV.Query(Binding); 
			queryBinding.equalTo('IMEI',object.get('IMEI'));
			queryBinding.first().then(function(binding){
// 				console.log(binding.get('user').get('objectId'));


//				查询User表
				var queryUser = new AV.Query(User);
				queryUser.equalTo('objectId',binding.get('user').get('objectId'));
				queryUser.first().then(function(user){
					var userName = user.get('name');
					if(userName == undefined){
						userName = '未知';
					}
					car.setUserNameAndPhone(userName,user.get('username'));
					localData.carInfoArray()[index] = car;
				},function(err){
					if(err){
						console.log('user err:'+err);
					}
				});
				
				
			},function(err){
				if(err){
					console.log('bind err:'+err);
				}
			});
			
			
			
			
		},function(err){
			if(err){
				console.log('did err:'+err);
			}
		});
		//初始化pointArray
		localData.pointArray()[results.length-1] = {};
		console.log(localData.carInfoArray());
		console.log(localData.IMEIList());
		results.forEach(function(object){
			client.subscribeIMEI(object.get('IMEI'));
		});
	});
}