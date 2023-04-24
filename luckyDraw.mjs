function luckyDraw(player) {
    return new Promise((resolve, reject) => {
        const win = Boolean(Math.round(Math.random()));
  
        process.nextTick(() => {
            if (win) {
                resolve(`${player} won a prize in the draw!`);
            } else {
                reject(new Error(`${player} lost the draw.`));
            }
        });
    });
}


async function getResults() {
    try {
        const [Tina, Jorge, Juilen] = await Promise.allSettled([
            luckyDraw("Tina"),
            luckyDraw("Jorge"),
            luckyDraw("Juilen")
        ])

        if (Tina.status === "fulfilled") {
            console.log(Tina.value)
        }
        else {
            console.error(Tina.reason)
        }

        if (Jorge.status === "fulfilled") {
            console.log(Jorge.value)
        }
        else {
            console.error(Jorge.reason)
        }

        if (Juilen.status === "fulfilled") {
            console.log(Juilen.value)
        }
        else {
            console.error(Juilen.reason)
        }
    } 
    catch (error) {
        console.error(error)
    }
}

getResults()