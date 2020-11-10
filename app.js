window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('icon');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos => {  
            long = pos.coords.longitude; //80.972968;
            lat = pos.coords.latitude; //26.878154;
        
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=47f166773e351368285402b79068ea73&units=metric`;
            console.log(api);
            
            //Toggle temp C <-> F
            document.addEventListener("click", () => {
                    if(document.getElementById("cel").innerText == "℃"){
                        document.getElementById("cel").innerHTML = "F"; 
                        var localtemp= document.getElementById("temp").innerText;
                        var newtemp = Math.ceil((localtemp * 9/5) + 32);
                        document.getElementById("temp").innerText = newtemp;
                    }else if (document.getElementById("cel").innerText == "F"){
                        var localtemp= document.getElementById("temp").innerText;
                        var newtemp = Math.ceil((localtemp - 32) * 5/9); 
                        // temperatureDegree.textContent = newtemp;
                        document.getElementById("temp").innerText = newtemp;
                        document.getElementById("cel").innerHTML = "℃"; 
                    }
                });


            //Fetching weather data from Openweathermap api
            fetch(api)
                .then(response => response.json())   
                .then(data => {
                    console.log(data);
                    var temp = data['main']['temp'];
                    var tempdes = data['weather'][0]['description'];
                    var country = data['sys']['country'];
                    var area = data['name'];
                    var iconid = data['weather'][0]['icon'];
                    // var newicon = 'http://openweathermap.org/img/wn/'+iconid+'@2x.png';
                    // tempdes = 'mist'; for test

                    //Set DOM elements
                    temperatureDegree.textContent = Math.ceil(temp);
                    temperatureDescription.textContent = tempdes;
                    locationTimezone.textContent = country + " - " + area;
                    // ReplacingImage(newicon);

                    //alternate icons
                    var icon;
                    const hours = new Date().getHours();
                    const isDayTime = hours > 6 && hours < 20;
                    console.log(isDayTime);
                    if(tempdes == "clear sky" && isDayTime ){//&& time < 01:14:22 ){
                        icon = "CLEAR_DAY";
                        document.body.style.background = "linear-gradient(rgb(236, 219, 63),rgb(214, 108, 21))";
                    }else if((tempdes == "clear sky" && !isDayTime )){
                        icon = "CLEAR_NIGHT";
                        document.body.style.background = "linear-gradient(rgb(63, 80, 236),rgb(14, 34, 145)) ";
                    }else if(tempdes == "few clouds" && isDayTime ){
                        icon = "PARTLY_CLOUDY_DAY";
                    }else if((tempdes == "few clouds" && !isDayTime )){
                        icon = "PARTLY_CLOUDY_NIGHT";
                    }else if(tempdes == "scattered clouds"){
                        icon = "CLOUDY";
                    }else if(tempdes == "shower rain" || tempdes == "rain" || tempdes == "moderate rain"){
                        icon = "RAIN";
                    }else if(tempdes == "thunderstorm"){
                        icon = "WIND";
                        document.body.style.background = "grey";
                    }else if(tempdes == "snow" ){
                        icon = "SNOW"
                        document.body.style.color ="black";
                        document.body.style.background = "white";
                    }else if(tempdes == "mist"){
                        icon = "FOG";
                        document.body.style.background = "rgb(194, 204, 120)";
                    }
                    // calling function to display animated weather icon
                    setIcons(icon, document.querySelector(".icon"));
                    
                    
                });

        });

        function setIcons(icon, iconIDsky) {
            if(icon == "SNOW")
                var skycons = new Skycons({color:"black"});
            else
                var skycons = new Skycons({color:"white"});
            skycons.play();
            return skycons.set(iconIDsky,Skycons[icon]);
        }

        
    }

    

    // function ReplacingImage(newUrl){ 
 
    //     document.getElementById("x").src=newUrl;
     

});