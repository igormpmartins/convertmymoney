const convert = require('./convert')

test('test convert.convert val 4', ()=> {
    expect(convert.convert(5, 4)).toBe(20)
})
test('test convert.convert val 5', ()=> {
    expect(convert.convert(5, 5)).toBe(25)
})
test('test convert.toMoney float', ()=> {
    expect(convert.toMoney(5.01)).toBe('5.01')
})
test('test convert.toMoney string', ()=> {
    expect(convert.toMoney('6.02')).toBe('6.02')
})
test('test convert.toQuote float', ()=> {
    expect(convert.toQuote(3.01)).toBe('3.01000')
})
test('test convert.toQuote string', ()=> {
    expect(convert.toQuote('4.56789')).toBe('4.56789')
})

