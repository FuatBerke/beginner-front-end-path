
let greeting = document.querySelector("#greeting")
let clock = document.querySelector("#clock")
let userName = prompt("Adınızı Giriniz: ")

greeting.innerHTML = `Merhaba <span class="user-name"> ${userName} </span>, Hoşgeldin!`

setInterval (showTime, 1000);
function showTime() {
let weekday = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
let today = new Date()
let d = weekday[today.getDay()]
let h = today.getHours()
let m = today.getMinutes()
let s = today.getSeconds()

h = h < 10 ? "0" + h : h
m = m < 10 ? "0" + m : m
s = s < 10 ? "0" + s : s

let currentTime = `${h} : ${m} : ${s} <br> <span  class="day" > ${d.toUpperCase()} </span>`
clock.innerHTML = currentTime

}



showTime()


