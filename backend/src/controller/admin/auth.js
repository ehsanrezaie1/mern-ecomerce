const User = require('../../models/user');
const jwt = require('jsonwebtoken');
exports.signup = (req,res) => {
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message:"Admin Already exist"
        });

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const _user = new User({ 
            firstName,
            lastName,
            email,
            password,
            role:'admin',
            username: Math.random()    
        });

        _user.save((error,data)=>{
            if(error)
            {
                return res.status(400).json({message:"somethings went wrong"+error})
            }
            if(data)
            {
                return res.status(200).json({message:"Admin Created successfully"})
            }
        })
    })

}


exports.signin = (req,res)=>{
    User.findOne({email:req.body.email})
        .exec((error,user)=>{
            if(error) return res.status(400).json({ error });
            if(user){
                if(user.authenticate(req.body.password && user.role === 'admin'))
                {
                    const token = jwt.sign({_id: user.id, role:user.role},process.env.JWT_SECRATE, {expiresIn: '1h'});
                    res.cookie('token',token,{expiresIn:'6h'});
                    const {_id, firstName, lastName, email, role, fullName} = user;
                    return res.status(200).json(
                        { 
                            token,
                            user:{_id,firstName, lastName, email, role, fullName}
                        }
                    )
                }else{
                    return res.status(400).json(
                        {
                            message: "Invalid Password"
                        }
                    )
                }
            }
        })

}


exports.signout = (req,res)=>{
    res.clearCookie('token');
    res.status(200).json({
        message:'Signout successfully'
    })
}


exports.requireSignin = (req,res,next)=>{ 
    const token =  req.headers.authorization.split(" ")[1];  
    const user  = jwt.verify(token,process.env.JWT_SECRATE);
    req.user = user;
    console.log(token);
    next();
    //jwt.decode()
}