function maxTotal(array) {
    if (array.length !== 10) {
        throw "Invalid array length";
    }
    array.sort(function(a,b){return a - b})
    let sum = 0
    for (let i = 5; i < 10; i++) {
        sum += array[i]
    }
    return sum
}
