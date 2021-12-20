const API_URL = 'https://rickandmortyapi.com/api/character'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'https://rickandmortyapi.com/api/character/?name='



const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')



const getCharacters = (url) => {
    const peticion = fetch(url)
    peticion.then (resp => resp.json())
    .then (data => showCharacters(data.results))
    .catch(error => swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }))
    
}

// const getMovies2 = async (url) =>
// {
//     const resp = await fetch (url)
//     const data = await resp.json()
//     console.log(data);
// }


getCharacters(API_URL)
//getMovies2(API_URL)


const showCharacters = (characters) =>{
    console.log(characters)

    main.innerHTML = ''
    characters.forEach(character => {
        const {name, status, gender, location, image, episode} = character
        const divCharacter = document.createElement('div')
        divCharacter.classList.add('character')
        divCharacter.innerHTML = `
            <img src="${image}" alt="">
            <div class="character-info">
                <h3>${name}</h3>
                
              
                <span class=${getClassStatus(status)}>Status: ${status}</span>
            </div>
            <div class="overview">
            <h3>Genero</h3>
            ${gender}
            </div>
            `

            main.appendChild(divCharacter)
            

    })
}


const getClassStatus = (Status) => {
    if (Status == "Alive"){
        return "green"
    }else if (Status == "Dead"){
        return"red"
    } else{
        return "orange"
    }
}


form.addEventListener('submit', e => {
    e.preventDefault()
    const searchTerm = search.value

    //que exista esa palabra y que sea diferente a vacio
    if(searchTerm && searchTerm !== ''){

        getCharacters(SEARCH_URL + searchTerm)
        search.value = ""

    }else{
        window.location.reload()
    }
})