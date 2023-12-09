export const user = async (req, res, next) => {

    try {
        res.status(201).json({
            Status: 1,
            Message: "User Details",
        })
    } catch (error) {
        next(error)
    }
}