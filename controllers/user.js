exports.signup =  async (req, res, next) => {
    try{
        console.log(req.body)
        res.status(200).json({message: 'signupdata is succesful'})
    }catch(err){
        res.status(500).json({messgae: 'something went wront', error: err})
    }
}