import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, Exclusion } from 'typeorm'
import bcrypt from 'bcryptjs'

// Criando uma entidade e linkando com a tabela users
@Entity('users')
class UserModel{
    //Indicando qual é a chave primaria da minha coluna
    //O que vai dentro dos parenteses é o tipo "primitivo" da coluna
    
    @PrimaryGeneratedColumn('uuid')    
    id: string

    @Column('text')
    email: string
    
    @Column('text')
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    public hashPassword(): void{
        // criando um hash da senha com um salt de 10
        this.password = bcrypt.hashSync(this.password, 10)
    }
}


export default UserModel