const axios = require('axios')
const moment = require('moment')

//const urlBCB = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=1&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
const getCotacaoAPI = data => axios.get(getUrl(data))
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getQuoteDay = () => {
    //TODO: tirar isso!
    const data = new Date().setDate(26);
    //data em json é month-day-fullYear
    const saida = moment(data).format('MM-DD-yyyy')
    //const saida2 =  (data.getMonth() +1)+ '-' + data.getDate() + '-' + data.getFullYear()
    return saida
}
const getCotacao = async() => {

    
    try {
        const data = getQuoteDay()
        const res = await getCotacaoAPI(data)
        const cotacao = extractCotacao(res)
        return cotacao    
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    getCotacao, 
    getCotacaoAPI,
    extractCotacao
}