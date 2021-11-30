// // Connexion à la première API OpenCage ======>

$("button").click(function(e) {
    e.preventDefault()
    let myCity = $("#city-name-forms").val();
    const keyApi1 = "604f6a6ae76d45d8a6f48e1862b2faba"
    // console.log(myCity)
    const api1Url =  "https://api.opencagedata.com/geocode/v1/json?key="+ keyApi1 +"&q=" + myCity
    // console.log(api1Url)

    $.get(api1Url, function(data) {
        let lat = data["results"][0]["geometry"]["lat"]
        let long = data["results"][0]["geometry"]["lng"]
        // console.log(lat, long)
        getWeather(lat, long)
    })
})

// Connexion à la deuxième API OpenCage ======>

function getWeather(lat, long) {
    const keyApi2 = "dfb25325e15e305923250b993e21cd76"
    const api2Url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long +"&units=metric"+"&appid=" + keyApi2
    console.log(api2Url)
    $.get(api2Url, function(data) {
        let current = data["current"]        
        console.log(current)        
       
        displayData(data)
             
    })
}
// // Récupération des données de la seconde API

function displayData(data) {
    // console.log(data)
    let cloudsPourcentage = data.current.clouds
    // console.log(cloudsPourcentage)    
    let temps = data.current.weather[0]["main"];    
    let myList = [{"clouds" : cloudsPourcentage, "main": temps}]
    for (let k = 1; k <= 4; k++) { 
        tempsNextDays = data.daily[k].weather[0]["main"];
        cloudsPourcentageNextDays = data.daily[k].clouds
        // console.log("je suis le temps des jours restants", tempsNextDays, cloudsPourcentageNextDays)
        myList.push({"clouds": cloudsPourcentageNextDays, "main": tempsNextDays})
        
    }
    myFunction()
    anOtherFunction(myList)   
}


// affichage de la météo des 5 jours de la semaine


let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" ,"Saturday"]
let day = new Date()
// console.log(adj)
let options = {weekday:'long'}
let currentDay = day.toLocaleDateString('en-EN', options)
// console.log(jourActuel)
let orderDays = daysOfWeek.slice(daysOfWeek.indexOf(currentDay)).concat(daysOfWeek.slice(0, daysOfWeek.indexOf(currentDay)))
// console.log(orderDays)


let divAfficherMeteo = document.getElementById('meteo')



function myFunction() {
    
   
    for(let k = 0; k < orderDays.length-2; k++){
        let div = document.createElement('div')
        div.style.margin = '4%'
        let divImage = document.createElement('div')
        divImage.setAttribute('class', 'divMeteo')
        divImage.style.height = '100px'
        divImage.style.width = '100px'        
        let h2Jour = document.createElement('h2')
        // h2Jour.setAttribute('class', 'jour')
        // h2Jour.style.color = 
        div.appendChild(h2Jour)
        div.appendChild(divImage)        
        divAfficherMeteo.appendChild(div)
        // h2Jour[k].innerText = orderDays[k]
        h2Jour.textContent = orderDays[k]
        // getMyDays(clouds, main, k)
    }
}

function anOtherFunction(myList) {
    for (let k = 0; k < myList.length; k++) { 
        main = myList[k]["main"]
        clouds = myList[k]["clouds"]
        getMyDays(clouds, main, k)

    }
}

    
function getMyDays(clouds, main, k) {
    let divImage = document.getElementsByClassName("divMeteo")   

    
        if (main == "Clear") {
            
            const img = document.createElement("img");            
            img.src = "./images/sun.png";
            divImage[k].appendChild(img)            
            
            
        }
        
        if (main == "Snow") {
            
            const img = document.createElement("img");            
            img.src = "./images/snow.png";          
            divImage[k].appendChild(img)
           
        }
        if (main == "Rain") {
            const img = document.createElement("img");           
            img.src = "./images/rain.png";
            divImage[k].appendChild(img)
            
            
        }
        if (main == "Clouds") {
            if (clouds > 50) {
                const img = document.createElement("img");
                img.src = "./images/clouds.png";
                divImage[k].appendChild(img)            
                

            }
            else {
                const img = document.createElement("img");                
                img.src = "./images/cloudy.png";
                divImage[k].appendChild(img)
                
                
            }     
            
        }
    
    }



     


