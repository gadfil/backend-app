import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';

class User extends Model {
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: false,
        hooks: {
            afterSync: async () => {
                await sequelize.query(`
                    ALTER TABLE "Users"
                        ADD CONSTRAINT "balance_non_negative" CHECK (balance >= 0)
                `);
            }
        }
    }
);

export default User;
