
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

	var tempforcast = data.query.results.channel.item.forecast[1];
	var forcast_1 = new oneParticularDay(tempforcast.low, tempforcast.day, tempforcast.text,
		data.query.results.location);
		forcast_1.report("temp_1","High: "+tempforcast.high+"°F"+"    Low: "+forcast_1.temp+"°F");
		forcast_1.report("date_1",forcast_1.day + " " +tempforcast.date);
		forcast_1.report("condition_1",forcast_1.condition);
		forcast_1.getImage("pic_1");

	tempforcast = data.query.results.channel.item.forecast[2];
	var forcast_2 = new oneParticularDay(tempforcast.low, tempforcast.day, tempforcast.text,
		data.query.results.location);
		forcast_2.report("temp_2","High: "+tempforcast.high+"°F"+"    Low: "+forcast_2.temp+"°F");
		forcast_2.report("date_2",forcast_2.day + " " +tempforcast.date);
		forcast_2.report("condition_2",forcast_2.condition);
		forcast_2.getImage("pic_2");

	tempforcast = data.query.results.channel.item.forecast[3];
	var forcast_3 = new oneParticularDay(tempforcast.low, tempforcast.day, tempforcast.text,
		data.query.results.location);
		forcast_3.report("temp_3","High: "+tempforcast.high+"°F"+"    Low: "+forcast_3.temp+"°F");
		forcast_3.report("date_3",forcast_3.day+ " " +tempforcast.date);
		forcast_3.report("condition_3",forcast_3.condition);
		forcast_3.getImage("pic_3");

	tempforcast = data.query.results.channel.item.forecast[4];
	var forcast_4 = new oneParticularDay(tempforcast.low, tempforcast.day, tempforcast.text,
		data.query.results.location);
		forcast_4.report("temp_4","High: "+tempforcast.high+"°F"+"    Low: "+forcast_4.temp+"°F");
		forcast_4.report("date_4",forcast_4.day+ " " +tempforcast.date);
		forcast_4.report("condition_4",forcast_4.condition);
		forcast_4.getImage("pic_4");

	tempforcast = data.query.results.channel.item.forecast[5];
	var forcast_5 = new oneParticularDay(tempforcast.low, tempforcast.day, tempforcast.text,
		data.query.results.location);
		forcast_5.report("temp_5","High: "+tempforcast.high+"°F"+"    Low: "+forcast_5.temp+"°F");
		forcast_5.report("date_5",forcast_5.day+ " " +tempforcast.date);
		forcast_5.report("condition_5",forcast_5.condition);
		forcast_5.getImage("pic_5");


}

function ftoc(temp){
	 return Math.round((temp-32)/1.8);
}

/* called when submit button is pushed */
function lookupWoeid() {
	var searchText = document.getElementById("zip").value;
	if(searchText.length < 2){
		searchText = "davis";
	}
	getNewPlace(searchText);
}


/* function to get new woeid and place by forcing the browser to make a
 query, in the form of asking Yahoo to download a Javascript file.  */
function getNewPlace(place) {
	var script = document.createElement('script');
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select woeid,name,admin1,country  from   geo.places where text='"+place+"' & format=json & callback=placeCallback";
	document.body.appendChild(script);
}


/* called when Yahoo returns a new place result */
function placeCallback(data) {
    // did it find it?
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
