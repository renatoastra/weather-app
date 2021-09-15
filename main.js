const api = {
    key:"ad85a67be07c796276ff6d4be6bca3ae",
    base:"https://api.openweathermap.org/data/2.5/"
}

const apiImg = {
    key:"kpGgQZyLvAAEXVNw3rBfCpsOglZeI2iqVIED41O7Uf4",
    base:"https://api.unsplash.com/"
}



const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery);


function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchBox.value);
        ;
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
        return weather.json();
    }).then(displayResults).catch(cityErrorAlert)
}

function cityErrorAlert(){
    
    (Swal.fire(
        'Algo deu errado..',
        'Você inseriu uma cidade inválida',
        'error'
    ))
}

function displayResults(weather){
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerText =  `${weather.name}, ${weather.sys.country}`


    let date = document.querySelector('.date');
    date.innerText = dateFormat();

    let clima = document.querySelector('.weather');
    clima.innerText = traduzClima(weather.weather[0].main)

    let temp = document.querySelector('.temp');
    temp.innerText = `${parseInt(weather.main.temp)}°C`

    let hiLow = document.querySelector('.hi-low');
    hiLow.innerText = `min ${parseInt(weather.main.temp_max)}°C / max ${parseInt(weather.main.temp_min)}°C`

    getImg();

}

function dateFormat(){

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", 
    "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro",
     "Novembro", "Dezembro"];

    const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", 
    "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]; 

    let data = new Date();
    let monthDay = data.getDate();
    let weekDay = data.getDay();
    let month = data.getMonth();
    let year = data.getFullYear();

        return `${weekDays[weekDay]}, ${monthDay} de ${monthNames[month]} de ${year} `
}

window.addEventListener('load', () => {

    let date = document.querySelector('.date');
    date.innerText = dateFormat();

    getImg();
    console.log(`${apiImg.base}/photos/random?query=office&client_id=${apiImg.key}`);

})

function getImg(){
    fetch(`${apiImg.base}/photos/random?query=city&client_id=${apiImg.key}`)
    .then((pictures) =>{
        return pictures.json();
    }).then((result) => {
        
        let body = document.querySelector('body');
        console.log(result)
        body.style.backgroundImage = `url(${result.urls.regular})`
        body.style.backgroundPosition = 'center'
        console.log(result.urls.regular)
    })
}

function traduzClima(clima){

    if(clima == "Rain"){
      return  clima = "Chuva"
    }
    if(clima == "Sunny"){
        return clima = "Ensolarado"
    }
    if(clima == "Clear"){
        return clima = "Tempo Claro"
    }
    if(clima == "Snow"){
        return clima = "Neve"
    }
    if(clima == "Clouds"){
        return clima = "Nublado"
    }

    return clima
}

