import {DataTypes} from 'sequelize';

export const up = async ({context: queryInterface}) => {
    await queryInterface.createTable('Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    });

    await queryInterface.sequelize.query(`
        ALTER TABLE "Users"
            ADD CONSTRAINT "balance_non_negative" CHECK (balance >= 0);
    `);

    await queryInterface.sequelize.query(`
        INSERT INTO "Users" (balance)
        VALUES (10000.00);
    `);
};

export const down = async ({context: queryInterface}) => {
    await queryInterface.dropTable('Users');
};
