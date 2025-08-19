const fs = require("fs");

fs.readFile(`${__dirname}/cat.txt`, (err, data) => {
    console.log(`Cat bread id: ${data}`);

    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${data}`, {
        headers: {
            "x-api-key": "live_uNoODOh2SVfDIrGd19uOclwkvWugLph8TiWcCAE7al1ddHf8NQUhU3t2UZUCeN6J"
        }
    })
    .then((res) => {
        return res.json()
    })
    .then(data => {
        console.log(...data);

        if (data === undefined || data === null) {
            return console.log("Breead of a cat not found");
        }
        
        const imageUrl = data[0].url;

        fs.writeFile("cat-image.txt", imageUrl, (error) => {
            if (error) {
                return console.error("Error al guardar:", error);
            }
            console.log("URL de la imagen guardada en cat-image.txt");
        });
    })
    .catch(err => {
        console.error("Error en fetch:", err);
    });
})