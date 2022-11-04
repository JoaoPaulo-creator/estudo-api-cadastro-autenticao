import {Request, Response} from 'express'
import UserModel from '../models/UserModel';
import { connectionDataBase } from '../../config/ormconfig'

class UserController{

    public async store(req: Request, res: Response){
        const repository = connectionDataBase.getRepository(UserModel)        
        const { email, password } = req.body
        const userExists = await repository.findOne({ where: { email } })

        if(userExists){
            return res.status(409).json({message: 'Email already exists'})
        }

        const createUser = repository.create({ email, password})
        await repository.save(createUser)        
        return res.json(createUser)
    }

    public async search(req: Request, res: Response){
        return res.status(200).json({ userId: req.userId })
    }
}

export default new UserController()