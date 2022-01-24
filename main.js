//then si funciona correctamente
//catch si hay un error
//dar una respuesta si algo anda mal en ese fetch por consola con el catch. En esas 3 promesas
//Cosas secundarias para hacer: mejorar el codigo, agregar el catch, hacerlo con asyc await, agregar css

const loadJson = async () => {
    const response = await fetch('https://swapi.dev/api/films')
    const json = await response.json()
    const list = document.querySelector('ul')
    for (let i = 0; i < json.results.length; i++) {
        const movie = document.createElement('li')
        movie.innerHTML = `<h3>${json.results[i].title}</h3>`
        movie.innerHTML += `<p> Episode ${json.results[i].episode_id}</p>`
        movie.innerHTML += `<p>${json.results[i].opening_crawl}</p>`
        let castList = '<ul>'
        let urlNames = json.results[i].characters.map(async url => {
            return `<li>${await getCharacters(url)}</li>`})
        let results = await Promise.all(urlNames)
        castList += results.join("")
        console.log(results);
        castList += '</ul>'
        movie.innerHTML += `Cast: ${castList}`
        list.appendChild(movie)
    }
}

const getCharacters = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
    return data.name
    } catch(err) {
        console.log(err);
    }
}
