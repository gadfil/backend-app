import User from '../models/User.js';
import {sequelize} from '../database/index.js';

class UserService {

    /**
     * Update user balance in a single query
     * @param userId
     * @param amount
     * @returns {Promise<{userId, success: boolean, message: string}|{userId, success: boolean}>}
     */
    async updateBalance({userId, amount}) {


        try {
            const [updatedRows, updatedUsers] = await User.update(
                {
                    balance: sequelize.literal(`balance + ${Number(amount)}`)
                },
                {
                    where: {id: userId},
                    returning: true
                }
            )

            if (updatedRows === 0) {
                return {userId: userId, success: false, message: 'User not found'};
            }
            return {success: true, userId: userId, balance: updatedUsers[0].balance};

        } catch (error) {
            console.log(error)
            return {userId: userId, success: false, message: 'balance cannot be negative'};
        }
    }
}

export default new UserService();
