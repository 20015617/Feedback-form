// const jwtTokenVerify = require("../controllers/jwtTokenVerify.js");
const UserModel = require("../models/UserModel.js");
const Bcrypt = require("bcryptjs");

module.exports = (app) =>{
    app.get("/signup", async(req, res)=>{
        try {
            const {name, email, password, role} = req.body;
            const exist = await UserModel.findOne(email)
            if(exist){
                return res.status(400).json({
                    success: false,
                    message: "User Already exist with this Email"
                }).end();
            }
            req.body.password = Bcrypt.hashSync(req.body.password, 10);

            new UserModel(req.body).save()
            .then(res => {
                console.log('res:::::::', res)
                // const token = jwt.sign({
                //     emailId: 
                // },
                // config.secretKey, {
                // expiresIn: "7 days",
                // });
                // return res.status(200).json({
                //     success: true,
                //     token:
                // })
            })
            .catch(error => {

            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong, Please try again",
                error: error
            });  
        }
    });

    app.post("/login", (req, res)=>{

    });
}