import { DataSource } from "typeorm";

export const connectionDataBase = new DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "banco123",
    "database": "tsauth",        
    "entities": [
        "src/app/models/*.ts"
    ],
    "migrations": [
        "src/database/migrations/*.ts"
    ]
})
