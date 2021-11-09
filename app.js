new Glide('.glide').mount()
window.addEventListener("load", () => {
  const temp = document.querySelector(".temp");
  const locat = document.querySelector(".locality");
  const image = document.querySelector(".icon-temp");

  // Second Parts elements
  const getHours = document.querySelectorAll(".hourCurrent");

  let lat;
  let long;
 
  navigator.geolocation.getCurrentPosition((position) => {
    long = position.coords.longitude;
    lat = position.coords.latitude;

    const appID = "191789f7840621a53dc7ca630cd9889f";
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&lang=it&appid=${appID}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        temp.innerHTML = Math.floor(response.current.temp) + "°";
        locat.innerHTML = response.timezone;
        image.src = `http://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png`;
        
        // Second Section View
        for (let i = 0; i < getHours.length; i++) {
          let hourss = response.hourly[i].dt;
          const realHour = new Date(hourss);
          realHour.setUTCSeconds(hourss);
          finalHour = realHour.getUTCHours();
          getHours[i].innerHTML = finalHour + ":00";
        }

        const daily = document.querySelectorAll(".daily-temp");
        for (let j = 0; j < daily.length; j++) {
          let dayy = response.hourly[j].temp;
          daily[j].innerHTML = Math.floor(dayy) + "°";
        }

        const icons = document.querySelectorAll(".ico");
        for (let z = 0; z < icons.length; z++) {
          let icoon = response.hourly[z].weather[0].icon;
          icons[z].src = `http://openweathermap.org/img/wn/${icoon}@2x.png`;
        }

        // Third View
        //Temperatura
        const getTempDate = document.querySelectorAll(".dayTemp");
        console.log(getTempDate)
        for (let dt = 0; dt < getTempDate.length; dt++) {
          let getDt = Math.floor(response.daily[dt].temp.day);
          getTempDate[dt].innerHTML = getDt;
         
        }
        //Icona
        const iconsss = document.querySelectorAll(".icooo");
        for (let ico = 0; ico < iconsss.length; ico++) {
          let ic = response.daily[ico].weather[0].icon;
          iconsss[ico].src = `http://openweathermap.org/img/wn/${ic}@2x.png`;
        }
        //Orario
        const getWeek = document.querySelectorAll(".wee");
        for (let y = 0; y < getWeek.length; y++) {
          const week = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
          let getDay = response.daily[y].dt;
          const date = new Date (getDay * 1000)
          const weekD = date.getDay()
          getWeek[y].innerHTML = week[weekD];
        }
      });
  });
});
