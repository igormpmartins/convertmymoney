const convert = require('./convert')

test('test convert.convert val 4', ()=> {
    expect(convert.convert(5, 4)).toBe(20)
})
test('test convert.convert val 5', ()=> {
    expect(convert.convert(5, 5)).toBe(25)
})
test('test convert.toMoney float', ()=> {
    expect(convert.toMoney(5)).toBe('5.00')
})
test('test convert.toMoney string', ()=> {
    expect(convert.toMoney('5')).toBe('5.00')
})
