//then si funciona correctamente
//catch si hay un error
//dar una respuesta si algo anda mal en ese fetch por consola con el catch. En esas 3 promesas
//Cosas secundarias para hacer: mejorar el codigo, agregar el catch, hacerlo con asyc await, agregar css

const loadJson = () => {
    return fetch('https://swapi.dev/api/films')
        .then(response => response.json())
        .then(json => {
            const list = document.querySelector('ul')
            for(let i = 0; i < json.results.length; i++) {
                const movie = document.createElement('li')
                movie.innerHTML = `<h3>${json.results[i].title}</h3>`
                movie.innerHTML += `<p> Episode ${json.results[i].episode_id}</p>`
                movie.innerHTML += `<p>${json.results[i].opening_crawl}</p>`
                list.appendChild(movie)
            }
        }).catch((err) => {
            console.log('Hubo un error cargando las peliculas!' + err);
        })
        .then(json=> {      
            const characterList = json.results.map((results)=> {
                let castList = '<ul>'
                const toons = results.characters.map(async (toon)=>await Promise.all(toon).then(res=>res.json()))
                results.characters = toons;
                return results;
                })
                castList += '</ul>'
                movie.innerHTML += `Cast: ${castList}`
                json.results = characterList;
               return json; 
               
        
        }).catch((err) => {
            console.log('Hubo un error cargando los personajes!' + err);
        })
}
