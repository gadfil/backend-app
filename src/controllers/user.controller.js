class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    updateBalance = async (req, res) => {
        console.log('updateBalance')
        try {
            console.log(req.body);

            const result = await this.userService.updateBalance(req.body);
            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(400).json({error: result.message})
            }
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

export default UserController
