var mqtt = require('mqtt');
var client = mqtt.connect('http://www.xiaoan110.com');
var localData = require('./localData');
var PointDataClass = require('./PointDataClass')

module.exports = client;

client.subscribeIMEI = function(IMEI){
// 	client.on('connect',function(){
		var cmd = 'dev2app/'+IMEI+'/cmd';
/*
		var gps = 'dev2app/'+IMEI+'/gps';
		var alarm = 'dev2app/'+IMEI+'/alarm';
*/
		client.subscribe(cmd,0,function(err,granted){
			if(err){
				console.log('----------------Subsctibe error--------------------');
				console.log('err:'+err);
				console.log('-----------------------------------------------------');
			}else{
				client.getLatAndLon(IMEI);
				console.log('----------------Subsctibe success--------------------');
				console.log(granted);
				console.log('-----------------------------------------------------');
			}
		});
// 	});
}

client.getAllLatAndLon = function(){
	var dic = '{ "cmd": 6 }';
	localData.IMEIList().forEach(function(IMEI){
		var cmd = 'app2dev/'+IMEI+'/cmd';
		client.publish(cmd,dic,function(){
		console.log('------------------Publish success--------------------');
		console.log('topic:'+cmd+'   cmd'+dic);
		console.log('-----------------------------------------------------');
		});
	});
}

client.getLatAndLon = function(IMEI){
	var dic = '{ "cmd": 6 }';
	var cmd = 'app2dev/'+IMEI+'/cmd';
	client.publish(cmd,dic,function(){
		console.log('------------------Publish success--------------------');
		console.log('topic:'+cmd+'   cmd'+dic);
		console.log('-----------------------------------------------------');
	});
}

client.on('message',function(topic,message){
/*
	console.log('----------------------GET success--------------------');
	console.log('topic:'+topic);
	console.log('message'+message.toString());
	console.log('-----------------------------------------------------');
*/
	var i =0
	for(;i<localData.IMEIList().length;i++){
		var IMEI = localData.IMEIList()[i];
		if(topic.indexOf(IMEI) > 0){
/*
			console.log('----------------------GET success--------------------');
			console.log('index:'+i);
			console.log('topic:'+topic);
			console.log('message:'+message.toString());
			console.log('-----------------------------------------------------');
*/
			break;
		}
	}
	//判断消息类型
	if(topic.indexOf('cmd')){
		var object = JSON.parse(message);
		if(object.cmd == 6){
			console.log('----------------------cmd :  6  ---------------------');
			console.log(object);
			console.log('-----------------------------------------------------');
			var point = new PointDataClass();
			point.initWithResult(object.result);
			if(object.code == 0){
				point.status = 0;
			}else{
				point.status = 100;
			}
			localData.pointArray()[i] = point;
// 			console.log(localData.pointArray());
			
		}
	}
	
});