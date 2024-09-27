import {
    getTabelas, getMarcas, getModelos,
    getAnosModelo, getInfosModelo
} from '../src/fipeApi'

/* -------------------------------------------------------------------------- */
/*                                  CRAWLING                                  */
/* -------------------------------------------------------------------------- */

async function crawl(tabela_id, tipo_id) {
    console.time("Execution Time");
    console.log('Processing...')
    const data = {}

    data.marcas = await getMarcas(tabela_id, tipo_id)
    data.modelos = await crawlForModelos(tabela_id, tipo_id, Object.keys(data.marcas))
    
    console.timeEnd("Execution Time"); // Logs the time taken between `time` and `timeEnd`
    console.log(data);
    console.log('Finished.')
    // Object.keys(marcas).forEach(marca_id => {
    //     jobs.modelos = getModelos(tabela_id, tipo_id, marca_id)
    // })

    // const anos = await getAnosModelo(80, 2785)
}

export async function crawlForModelos(tabela_id, tipo_id, marcas) {
    const modelos = []

    for (let marca_id of marcas) {
        let modelo = await getModelos(tabela_id, tipo_id, marca_id)
        modelos.push(modelo)
        await new Promise(resolve => setTimeout(resolve, 200))
    }
    return modelos
}