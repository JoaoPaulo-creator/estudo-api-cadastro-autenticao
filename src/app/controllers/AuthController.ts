import { Request, Response } from "express";
import { connectionDataBase } from '../../config/ormconfig'
import UserModel from "../models/UserModel";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthController{
    public async authenticate(req: Request, res: Response){
        const repository = connectionDataBase.getRepository(UserModel)
        const { email, password } = req.body
        const user = await repository.findOne({ where: { email } })

        if(!user){
            return res.status(401).json({message: 'Email not found'})
        }

        //realizando a compração da senha informada com a senha salva
        //o primeiro argumento é a senha digitada no payload e o segundo, a senha salva em baco
        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword){
            return res.status(401).json({message: 'Invalid password'})
        }

        //gerando token
        // o segundo argumento é a chave de autenticação
        // o ideal é que esta chave esteja em uma variável de ambient ou algo do tipo
        // para evitar que suba no github da vida e gere problemas de segurança
        const token = jwt.sign({id: user.id}, 'secret', {expiresIn: '1d'})

        
        //deletando o password do payload   
        
        // TODO por enquanto não consegui deletar, resolver depois

        //delete user.password        
        return res.json({user: {id: user.id, email: user.email}, token})
    }
}

export default new AuthController()