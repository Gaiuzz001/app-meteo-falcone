const form = document.querySelector("#requests form");
const input = document.querySelector("#requests input");
const msg = document.querySelector("#requests .msg");
const cities = document.getElementById("results");
const lang = "it"
const apiKey = "9e5a252b5eeca9d81166f9b9cae3294c";

form.addEventListener("submit", event => {
    event.preventDefault();

    let city = input.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            

            let name = data.name;
            let country = data.sys.country;
            let temp = data.main.temp;
            let icon = data.weather[0].icon;
            let description = data.weather[0].description;

            

            var parent = document.getElementById("results");
            var child = parent.getElementsByTagName("div")[0];
            parent.removeChild(child);

            let card = document.createElement("div");
            card.classList.add("card-meteo");

            let templateCard = `
                <div class="card-meteo-header">
                    <h2 class="card-meteo-title">
                        <span>${name}</span>
                        <sup>${country}</sup>
                    </h2>
                   </div>
                   <div class="card-meteo-body">
                        <div class="card-meteo-temp">
                            <span>${temp}</span>
                            <sup>°C</sup>
                        </div>
                        <figure class="card-meteo-figure">
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
                            <figcaption>${description}</figcaption>
                        </figure>   
                       </div>   
                       
        `;

            card.innerHTML = templateCard;
            cities.appendChild(card);


        })

        .catch(() => {
            msg.textContent = "Città non trovata 🫠, cerca una città diversa!"
        });

    msg.textContent = "";
    form.reset();
    input.focus();


});