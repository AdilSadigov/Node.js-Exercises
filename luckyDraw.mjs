function luckyDraw(player) {
    return new Promise((resolve, reject) => {
        const win = Boolean(Math.round(Math.random()));
  
        process.nextTick(() => {
            if (win) {
                resolve(`${player} won a prize in the draw!`);
            } 
            else {
                reject(new Error(`${player} lost the draw.`));
            }
        });
    });
}

let Joe = luckyDraw("Joe")
let Caroline = luckyDraw("Caroline")
let Sabrina = luckyDraw("Sabrina")

Joe
    .then ((result) => console.log(result))
    .catch((error) => console.error(error))

Caroline
    .then ((result) => console.log(result))
    .catch((error) => console.error(error))

Sabrina
    .then ((result) => console.log(result))
    .catch((error) => console.error(error))