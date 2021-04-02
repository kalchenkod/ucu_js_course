function pentagonalNumber(n) {
    if (n <= 0) {
        throw "Invalid argument"
    }
    if (n === 1) {
        return 1
    }
    return pentagonalNumber(n - 1) + 3*n -2
}
