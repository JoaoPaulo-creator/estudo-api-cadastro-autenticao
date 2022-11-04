import {Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

//criando interface para conseguir extrair o id do payload do token
interface ITokenPayload{
    id: string,
    iat: number
}

export default function authMiddleware( req: Request, res: Response, next: NextFunction ){
    const { authorization } = req.headers 

    if(!authorization){
        return res.sendStatus(401)
    }


    const token = authorization.replace('Bearer', '').trim()
    try {

        // o mesmo secret informando lá no model de autorização, será passado aqui
        const data = jwt.verify(token, 'secret')
       const { id } = data as ITokenPayload

       /*
       Naturalmanete aqui vai dar um erro, para resolver esse erro, será criado um arquivo com um tipo customizado
       para o express

        Porém, mesmo tendo criado um arquivo com um tipo custom, será necessário passar a flag --files no script de execução
        no arquivo package.json
        */ 

        // Todo esse processo mecionado acima é para poder realizar alguma ação enquanto estiver autenticado

       req.userId = id
       return next()

    } catch {
        return res.sendStatus(401)
    }

}