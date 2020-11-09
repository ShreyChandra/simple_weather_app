window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('icon');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos => {  
            long = pos.coords.longitude;
            lat = pos.coords.latitude;
        
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=47f166773e351368285402b79068ea73&units=metric`;
            console.log(api);

        
            fetch(api)
                .then(response => response.json())   
                .then(data => {
                    console.log(data);
                    var temp = data['main']['temp'];
                    var tempdes = data['weather'][0]['description'];
                    var country = data['sys']['country'];
                    var area = data['name'];
                    var iconid = data['weather'][0]['icon'];
                    var newicon = 'http://openweathermap.org/img/wn/'+iconid+'@2x.png';

                    //Set DOM elements
                    temperatureDegree.textContent = temp;
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
                    }else if(tempdes == "shower rain" || tempdes == "rain"){
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
                    // var icon = "PARTLY_CLOUDY_DAY";
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