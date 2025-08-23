const fs = require("fs").promises;

const { config } = require("../1-intro-node-js/config/");


// Using Promises

/* fs.readFile(`${__dirname}/cat.txt`, "utf-8")
  .then(breedId => {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId.trim()}`, {
      headers: { "x-api-key": config.apiKeyCats }
    });
  })
  .then(res => res.json())
  .then(json => {
    console.log(...json);

    if (!json || json.length === 0) {
      throw new Error("Breed of cat not found");
    }

    return fs.writeFile("cat-image.txt", json[0].url);
  })
  .then(() => {
    console.log("URL de la imagen guardada en cat-image.txt");
  })
  .catch(err => {
    console.error("Error:", err);
  }); */


// Using async/await

(async () => {
  try {
    // leer el archivo con await (promesa)
    const data = await fs.readFile(`${__dirname}/cat.txt`, "utf-8");
    console.log(`Cat breed id: ${data}`);
    
    // fetch devuelve promesa
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${data}`, {
      headers: { 
            "x-api-key": config.apiKeyCats 
        }
    });

    const json = await res.json();
    console.log(...json);

    if (!json || json.length === 0) {
      return console.log("Breed of cat not found");
    }

    // escribir archivo con promesa
    const imageUrl = json[0].url;
    await fs.writeFile("cat-image.txt", imageUrl);

    console.log("URL de la imagen guardada en cat-image.txt");
  } catch (err) {
    console.error("Error:", err);
  }
})();
