import {z} from 'zod'


export const UserUpdateBalanceRequestDTO = z.object({
    userId: z.number()
        .int("userId must be an integer")
        .min(1, "userId must be greater than zero"),
    amount: z.number().int("amount must be an integer")
})
