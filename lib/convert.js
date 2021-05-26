const convert = (qty, val) => qty * val
const toMoney = val => {
    return parseFloat(val).toFixed(2)
}

module.exports = {
    convert,
    toMoney
}