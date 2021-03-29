function findMin(array) {
    let min = array[0]
    for (let elem of array) {
        min = elem < min ? elem : min
    }
    return min
}


function findMax(array) {
    let max = array[0]
    for (let elem of array) {
        max = elem > max ? elem : max
    }
    return max
}


function minMax(array) {
    return [findMin(array), findMax(array)]
}


function canNest(array1, array2) {
    return findMin(array1) > findMin(array2) && findMax(array1) < findMax(array2)
}


function tuckIn(array1, array2) {
    let idx = array1.length % 2 ? (array1.length/2) + 0.5 : array1.length/2
    return array1.slice(0, idx).concat(array2).concat(array1.slice(idx))
}

