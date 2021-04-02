function avgWordLengthCalc(string) {
    try {
        const split = (str) =>  {
            return str.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g,"").split(" ")
        }
        const avg = (arr) => {
            let sum = 0
            for (let x of arr) {
                sum += x.length
            }
            return sum / arr.length
        }
        return avg(split(string))
    }
    catch (TypeError) {
        console.log("Invalid input type")
    }
}
