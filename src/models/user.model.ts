import { Table, Column, Model, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcrypt';

@Table
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @BeforeCreate
    @BeforeUpdate
    static hashPassword(instance: User) {
        if (instance.changed('password')) {
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(instance.password, saltRounds);
            instance.password = hashedPassword;
        }
    }
}
