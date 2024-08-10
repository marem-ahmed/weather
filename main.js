
let searchInput=document.querySelector('#searchInput')
let ancorLinks=document.querySelectorAll('.nav-link')
console.log(ancorLinks);

ancorLinks.forEach((ancorLink) => {
  ancorLink.addEventListener('click',function(){
ancorLinks.forEach(ancorLink=>ancorLink.classList.remove('active-ancor'))
this.classList.add('active-ancor')
  })

});

// today
let todayName=document.querySelector('#today-name')
let todayNum=document.querySelector('#today-number')
let todayMonth=document.querySelector('#today-month')
let todayLocation=document.querySelector('#today-location')
let todayTemp=document.querySelector('#today-temp')
let todayImg=document.querySelector('#today-img')
let todayText=document.querySelector('#today-text')
let todayDeg=document.querySelector('#deg')
let todayWind=document.querySelector('#wind')
let todayDir=document.querySelector('#dir')


 function displayTodayData(api){
  let todayDate=new Date()
  
  todayNum.innerHTML=todayDate.getDate()
  todayMonth.innerHTML=todayDate.toLocaleDateString('en-us',{month:'long'})
  todayName.innerHTML=todayDate.toLocaleDateString('en-us',{weekday:'long'})
todayLocation.innerHTML=api.location.name;
todayNum.innerHTML=api.current.is_day;
todayTemp.innerHTML=api.current.temp_c;
todayWind.innerHTML=api.current.wind_kph;
todayDir.innerHTML=api.current.wind_dir;
todayDeg.innerHTML=api.current.humidity+'%'
todayImg.setAttribute("src",api.current.condition.icon)
todayText.innerHTML=api.current.condition.text
}

 

searchInput.addEventListener('input',function(){
  start(searchInput.value)
  
})


// nextDays

let nextDaysTempBone=document.querySelectorAll('.nextDay-temp-bone ')
let nextDaysTempJunior=document.querySelectorAll('.nextDay-temp-junior')
let textnextDays=document.querySelectorAll('.text-nextDay')
let nextDaysImg=document.querySelectorAll('.nextDay-img');
let nextdayname=document.querySelectorAll(".nextDayname")
function displayNextDaysData(api){
  let forecastData=api.forecast.forecastday
  
  
  for(let i=0;i<2;i++){
      let date=new Date(forecastData[i+1].date)
nextdayname[i].innerHTML=date.toLocaleDateString('en-us',{weekday:'long'})
  nextDaysTempBone[i].innerHTML=forecastData[i+1].day.maxtemp_c;
   nextDaysTempJunior[i].innerHTML=forecastData[i+1].day.mintemp_c
   textnextDays[i].innerHTML=forecastData[i+1].day.condition.text
  nextDaysImg[i].setAttribute('src',forecastData[i+1].day.condition.icon)
  }

 }
async function start(city='london'){
   let weatherData=await getApi(city)
   if(!weatherData.error){
displayTodayData(weatherData)
    displayNextDaysData(weatherData)
   }
    
 }
 start()


// fetch APi data
async function getApi(city){
    
 let  response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=633e5400f70c4175b6e173011240901&q=${city}&days=3`)
  let weatherData= await response.json()  
  return weatherData;
}






