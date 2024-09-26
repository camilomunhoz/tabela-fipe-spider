import { describe } from 'node:test';
import {
    getTabelas, getMarcas, getModelos,
    getAnosModelo, getInfosModelo
} from '../src/fipeApi'

describe('Teste dos endpoints da API da Fipe', () => {

    let tabela_id, tipo_id, marca_id, modelo_id, anoModelo, combustivel_id
    
    beforeAll(() => {
        tabela_id = 313
        tipo_id = 1
        marca_id = 29
        modelo_id = 11014
        anoModelo = 2025
        combustivel_id = 1
    })
    
    test('deve retornar as tabelas', async () => {
        await expect(getTabelas()).resolves.toBe('object');
    });
    
    test('deve retornar as marcas', async () => {
        // await expect(getMarcas(tipo_id, marca_id)).resolves.toBe('object');
    });
    
    test('deve retornar os modelos de uma marca', async () => {
        // await expect(getModelos(tipo_id, marca_id, modelo_id)).resolves.toBe('object');
    });
    
    test('deve retornar as marcas', async () => {
        // await expect(getAnosModelo(tipo_id, marca_id, modelo_id, anoModelo)).resolves.toBe('object');
    });
    
    test('deve retornar as marcas', async () => {
        // await expect(getInfosModelo(tipo_id, marca_id, modelo_id, anoModelo, combustivel_id)).resolves.toBe('object');
    });

})
