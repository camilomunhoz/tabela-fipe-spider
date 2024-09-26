/* -------------------------------------------------------------------------- */
/*                                  CRAWLING                                  */
/* -------------------------------------------------------------------------- */

async function crawl(tabela_id, tipo_id) {
    console.time("Execution Time");
    console.log('Processing...')
    const data = {}

    data.marcas = await getMarcas(tabela_id, tipo_id)
    data.modelos = []

    for (let marca_id of Object.keys(data.marcas)) {
        data.modelos.push(await getModelos(tabela_id, tipo_id, marca_id))
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    console.timeEnd("Execution Time"); // Logs the time taken between `time` and `timeEnd`
    console.log(data);
    console.log('Finished.')
    // Object.keys(marcas).forEach(marca_id => {
    //     jobs.modelos = getModelos(tabela_id, tipo_id, marca_id)
    // })

    // const anos = await getAnosModelo(80, 2785)
}