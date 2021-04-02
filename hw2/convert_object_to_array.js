function toArr(obj) {
    try {
        let arr = []
        Object.entries(obj).forEach(([key, value]) => arr.push([key, value]))
        return arr
    }
    catch (TypeError) {
        console.log("Invalid input type")
    }
}