import userModel from "../models/user.js";
import Auth from "../auth/auth.js";


const login = async (req, res) => {
  try {
    let user = await userModel.findOne({
      email: req.body.email,
    });
    if (user) {
      let hashCompare = await Auth.hashCompare(req.body.password, user.password);
      if (hashCompare) {
        let token = await Auth.createToken({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });

        let userData = await userModel.findOne({ email: req.body.email }, { _id: 0, status: 0, createdAt: 0, email: 0, password: 0 });

        res.status(200).send({
          message: "Login Successful",
          data: userData,
          token: token,
        });
      } else {
        res.status(401).send({
          message: "Invalid password",
        });
      }
    } else {
      res.status(400).send({
        message: "User doesn't exist",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    let existingUser = await userModel.findOne({email:req.body.email});
    if(existingUser){
       return res.status(400).send({
            message:`Account with ${req.body.email} exists`
        })
    }else{
        req.body.password = await Auth.hashPassword(req.body.password);
        await userModel.create(req.body);
        res.status(201).send({
            message:"User created successfully"
        })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error.message,
    });
  }
};

const getUser = async (req,res) => {
    try {
        let user = await userModel.find({});
        if(user){
            res.status(200).send({
                message:"User fetched successfully",
                data:user
            })
        }
    } catch (error) {
      res.status(500).send({
        message:"Internal server Error",
        error: error.message
      })  
    }
}

const getuserById = async (req, res) => {
  try {
    let params = req.params.id;

    let user = await userModel.findById(params);
    if(user){
        res.status(200).send({
            message:"UserData fetched success",
            data:user
        })
    }else{
        res.status(400).send({
            message:"User not found"
        })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const editUser = async (req, res) => {
  try {
    let userId = req.params.id;
    let user = await userModel.findById(userId);
    if(!user){
        res.status(400).send({
            message:"Invalid id or user not found"
        })
    }else{
        if(name) user.name = req.body.name;
        if(email) user.email = req.body.email;
        
        await user.save();

        res.status(200).send({
            message:"UserData edited successfully",
            data:user
        })
    }

  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export default {
  login,
  signup,
  getUser,
  getuserById,
  editUser,
};
