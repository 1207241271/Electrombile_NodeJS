module.exports = CarInfo;
function CarInfo()
{

}

CarInfo.prototype.IMEI = ' ';
CarInfo.prototype.carName = ' ';
CarInfo.prototype.userName = ' ';
CarInfo.prototype.userPhone = ' ';
CarInfo.prototype.setIMEIAndCarName = function(IMEI,carName){
	this.IMEI = IMEI;
	this.carName = carName;
}
CarInfo.prototype.setUserNameAndPhone = function(name,phone){
	this.userName = name;
	this.userPhone = phone;
}

CarInfo.prototype.description = function(){
	console.log('---------------------CarInfo-------------------------');
	console.log('IMEI:'+this.IMEI+'\n'+'carName:'+this.carName+'\n'+'userName:'+this.userName+'\n'+'userPhone:'+this.userPhone);
	console.log('-----------------------------------------------------');
}
