$(async () => {

    $('button').on('click', async () => {

        $.get('/api/teste', {foo: 'blau'}).then(data => console.log(data))
        
        // const info = await getInfosModelo(80, 2785, 1990) //cg 125
        // console.log(info)
    })

    const targetMarcas = [
        'HONDA',
        'YAMAHA',
        'SUZUKI',
        'HAOJUE',
        'BMW',
        'DUCATI',
        'Royal Enfield',
    ]
})

async function localDB(datatype) {
    return await $.get(`/data/${datatype}.json`)
}
