import {sequelize} from '../database/database.js';

class UserService {

    /**
     * Update user balance in a single query
     * @param userId
     * @param amount
     * @returns {Promise<{userId, success: boolean, message: string}|{userId, success: boolean}>}
     */
    async updateBalance({userId, amount}) {


        try {
            const [updatedRows, updatedUsers] = await sequelize.query(
                `UPDATE "Users"
                 SET "balance" = "balance" + :amount
                 WHERE "id" = :userId
                   AND ("balance" + :amount) >= 0 RETURNING "id", "balance";`,
                {
                    replacements: {userId, amount},
                    type: sequelize.QueryTypes.RAW
                }
            );
            if (updatedRows?.length === 0) {
                return {success: false, message: 'User not found or insufficient balance'};
            }
            return {success: true, userId: userId, balance: updatedRows[0].balance};

        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
}

export default new UserService();
