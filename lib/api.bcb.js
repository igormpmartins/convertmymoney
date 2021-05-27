const axios = require('axios')
const moment = require('moment')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=1&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getQuoteDay = () => {

    const data = new Date()

    if (data.getDay() == 0) {
        data.setDate(data.getDate()-2)
    } else if (data.getDay() == 6) {
        data.setDate(data.getDate()-1)
    }

    //data em json é month-day-fullYear
    const saida = moment(data).format('MM-DD-yyyy')

    //código sem utilizar a lib moment. Observar o mês!!!
    //const saida2 =  (data.getMonth() +1)+ '-' + data.getDate() + '-' + data.getFullYear()
    return saida
}
const getCotacao = async() => {

    try {
        const data = getQuoteDay()
        const url = getUrl(data)
        const res = await getCotacaoAPI(url)

        const cotacao = extractCotacao(res)
        return cotacao    
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    getUrl,
    getCotacao, 
    getCotacaoAPI,
    extractCotacao
}