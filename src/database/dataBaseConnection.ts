import { connectionDataBase } from '../config/ormconfig'

connectionDataBase.initialize().then(
    () => { console.log('Conectado com sucesso ao banco de dados')})
    .catch(error => {console.error(error)})
