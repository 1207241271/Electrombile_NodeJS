module.exports = PointData;
function PointData(){

}

PointData.prototype.longitude	= 0.0;
PointData.prototype.latitude 	= 0.0;
PointData.prototype.speed 		= 0;
PointData.prototype.course		= 0;
PointData.prototype.timeStamp	= 0.0;
// status 表示车辆状态，0表示在线，100表示离线，101表示报警
PointData.prototype.status		= 100;

PointData.prototype.initWithLonAndLat = function(longitude,latitude){
	this.longitude = longitude;
	this.latitude = latitude;
}

PointData.prototype.initWithAll = function(longitude,latitude,speed,course,timeStamp){
	this.longitude = longitude;
	this.latitude = latitude;
	this.speed = speed;
	this.course = course;
	this.timeStamp = timeStamp;
}

PointData.prototype.initWithAVObject = function(AVObject){
	this.latitude = AVObject.get('lat');
	this.longitude = AVObject.get('lon');
	this.speed = AVObject.get('speed');
	this.course = AVObject.get('course');
	this.timeStamp = AVObject.get('time');
}

PointData.prototype.initWithResult = function(result){
	this.latitude = result.lat;
	this.longitude = result.lng;
	this.speed = result.speed;
	this.course = result.course;
	this.timeStamp = result.timestamp;
}




