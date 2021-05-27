const convert = (qty, val) => qty * val
const toMoney = val => {
    return parseFloat(val).toFixed(2)
}

const toQuote = val => {
    return parseFloat(val).toFixed(5)
}

module.exports = {
    convert,
    toMoney,
    toQuote
}