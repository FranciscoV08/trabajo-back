import {randomUUID} from 'crypto'

// Generador de ID
export const generatorID = () => {
    const cid = randomUUID()
    return cid;
}
