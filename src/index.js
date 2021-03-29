const pupDiv = document.querySelector('div#dog-bar')

function dogBar(pupObj) {
    //const pupDiv = document.querySelector('div#dog-bar')
    //console.log(pupDiv)
    const span = document.createElement('span')
    span.dataset.id = pupObj.id
    span.textContent = pupObj.name
    console.log(span)
    pupDiv.append(span)
}

function listPupName() {
    fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(pupName => {
            pupName.forEach(name => {
                dogBar(name)
            })
        })
}

function pupInfo(dogInfo){
    const infoDiv = document.querySelector('div#dog-info')
    infoDiv.innerHTML = ''
    // infoDiv.dataset.id = dogInfo.id
    // console.log(infoDiv)

    let goodDog = dogInfo.isGoodDog
    if (dogInfo.isGoodDog === true){
        goodDog = 'Good Dog!'
    } else {
        goodDog = 'Bad Dog!'
    }

    const img = document.createElement('img')
    img.src = dogInfo.image

    const name = document.createElement('h2')
    name.textContent = dogInfo.name

    const isGoodDogStatus = document.createElement('button')
    isGoodDogStatus.dataset.id = dogInfo.id
    isGoodDogStatus.textContent = `${goodDog}`

    infoDiv.append(img, name, isGoodDogStatus)
}

//Cannot read property 'addEventListener' of null
// This is probably because the script is executed before the page loads. By placing the script at the bottom of the page, I circumvented the problem.
pupDiv.addEventListener('click', e => {
    if (e.target.matches('span')) {
        const dogId = e.target.dataset.id
        console.log(dogId)
        fetch(`http://localhost:3000/pups/${dogId}`)
            .then(response => response.json())
            .then(oneDogInfo => pupInfo(oneDogInfo))
    }
})


function dogStatus(event) {
    const id = event.dataset.id
    
    let dogStatus = event.isGoodDog
   if (dogStatus === true){
       dogStatus = 'Good Dog!'
   } else {
       dogStatus = 'Bad Dog!'
   }

    fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({isGoodDog: dogStatus})
    })
//      .then(response => response.json())
//      .then(data => pupInfo(data))
}

const infoDiv = document.querySelector('div#dog-info')
infoDiv.addEventListener('click', event => {
   console.log(infoDiv)
 if (event.target.matches('button')){

           dogStatus(event.target)
    }
 
 })

listPupName()

