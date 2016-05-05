
function oneParticularDay(temp, day, condition, place){
	this.temp = temp;
	this.day = day;
	this.place = place;
	this.condition = condition;

	this.report = function(loc, item){
		clear(loc);
		var what = document.getElementById(loc);
		var para = document.createElement("p");
		var text = document.createTextNode(item);
		para.appendChild(text);
		what.appendChild(para);
	}

	function clear(item){
	  var div = document.getElementById(item);
	  while(div.firstChild){
	    div.removeChild(div.firstChild);
	  }
	}

	this.getImage =function(loc){
		var temp = document.getElementById(loc);
		if(this.condition.indexOf("loudy")> -1){
			temp.src = "partly_cloudy.png"
		}else if(this.condition.indexOf("unny")> -1){
			temp.src = "sunny.png"
		}else if (this.condition.indexOf("now")> -1) {
			temp.src = "snow.png"
		}else if (this.condition.indexOf("hunder")> -1) {
			temp.src = "thunder.png"
		}else if (this.condition.indexOf("reezy")> -1 || this.condition.indexOf("indy")> -1) {
			temp.src = "windy.png"
		}else if (this.condition.indexOf("hower")> -1){
			temp.src = "showers.png"
		}else {
			temp.src = "sunny.png"
		}
	}

}


window.onload = function(){
	getNewPlace("davis");
}


function getWeather(locationid){
	var weatherscript = document.createElement("script");
	weatherscript.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid="+ locationid +"&format=json&callback=callbackFunction";
	document.body.appendChild(weatherscript);
}

function changeBackground(location){
	if(location.date.indexOf("AM")> -1){
		document.body.style.backgroundImage = "url('sunny.png'),linear-gradient(#fa4d48, #fa9748)";
	}else {
		document.body.style.backgroundImage = "url('sunny.png'), linear-gradient(#29588c, #8a69d4)";
	}
}


function callbackFunction(data){
	locationid = data;
	var temp = data.query.results.channel.item.condition;
	changeBackground(temp);
	var currentday = new oneParticularDay(temp.temp,temp.date,temp.text,
		data.query.results.channel.location);
	currentday.report("current_temp",currentday.temp+"°F");
	currentday.report("date",currentday.day.substring(0,17));
	currentday.report("condition",currentday.condition);
	var cel = ftoc(currentday.temp);
	currentday.report("celsius", cel+"°C");
	currentday.getImage("pic_0");
	var curr_place =  currentday.place.city + ", " + currentday.place.region;
	currentday.report("city",curr_place);

	var temp = data.query.results.channel.item.forecast[0];
	currentday.report("highandlow","High: "+temp.high+"    Low: "+temp.low);
	currentday.report("windspeed","Wind Speed: "+data.query.results.channel.wind.speed+" mph");

	getForecast(data, 1, "temp_1", "date_1", "condition_1","pic_1");
	getForecast(data, 2, "temp_2", "date_2", "condition_2","pic_2");
	getForecast(data, 3, "temp_3", "date_3", "condition_3","pic_3");
	getForecast(data, 4, "temp_4", "date_4", "condition_4","pic_4");
	getForecast(data, 5, "temp_5", "date_5", "condition_5","pic_5");

}

function getForecast(data, index, temperature, date, condition, picture){
	var tempforcast = data.query.results.channel.item.forecast[index];
	var myforcast = new oneParticularDay(tempforcast.low, tempforcast.day, tempforcast.text,
		data.query.results.location);
		myforcast.report(temperature,"High: "+tempforcast.high+"°F"+"    Low: "+myforcast.temp+"°F");
		myforcast.report(date, myforcast.day+ " " +tempforcast.date);
		myforcast.report(condition,myforcast.condition);
		myforcast.getImage(picture);

}

function ftoc(temp){
	 return Math.round((temp-32)/1.8);
}

function lookupWoeid() {
	var searchText = document.getElementById("zip").value;
	if(searchText.length < 2){
		searchText = "davis";
	}
	getNewPlace(searchText);
}

function getNewPlace(place) {
	var script = document.createElement('script');
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select woeid,name,admin1,country  from   geo.places where text='"+place+"' & format=json & callback=placeCallback";
	document.body.appendChild(script);
}


function placeCallback(data) {
	var place = data;
  if (data.query.results == null) {
		var woeid = "not found";
		var name = "not found";
  } // was it unique?
  else {
		if (data.query.results.place[0] == undefined) {
	    place = data.query.results.place;
		} // multiple ones - pick the first one
		else {
	    place = data.query.results.place[0];
		}
  }

	getWeather(place.woeid);

}
