console.log('Client side javascript file is loaded!')

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)=>{
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2') 

//msg1.textContent = 'asdsdasd'

console.log(weatherForm)

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msg1.textContent = 'Loading...'

    const location = search.value
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
})