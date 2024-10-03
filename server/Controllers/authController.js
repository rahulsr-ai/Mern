
import { hashPassword, passwordCompare } from '../Helpers/PasswordHashed.js';
import { User } from '../Models/User.model.js';
import JWT from 'jsonwebtoken'


// Creating User in the database 
export const registerController = async (req, res) => {

    try {
        console.log('passed');

        let { name, email, password, phone, address, answar } = req.body;

        if (!name) {
            return res.send({ message: 'name is required' })
        }
        if (!email) {
            return res.send({ message: 'email is required' })
        }
        if (!password) {
            return res.send({ message: 'password is required' })
        }
        if (!address) {
            return res.send({ message: 'address is required' })
        }
        if (!phone) {
            return res.send({ message: 'phone is required' })
        }
        if (!answar) {
            return res.send({ message: 'answar is required' })
        }

        // CHEKING IS THERE ANY USER IN THE DB WIH THE PROVIDED EMAIL 
        const existinguser = await User.findOne({ email });


        // IF USER EXIST 
        if (existinguser) {

            return res.status(200).send({
                success: false,
                message: 'users allready registerd'
            })

        }

        const hashedPassword = await hashPassword(password);

        // Here we creating new user in the MONGO DATABASE 
        const user = await new User({ name, email, password: hashedPassword, phone, address, answar })
        await user.save()

        return res.status(200).send({
            success: true,
            message: 'users registerd'
        })



    }
    catch (error) {
        res.status(500).send(
            {
                success: false,
                message: 'error in registercontroller',
                error: error.message
            }
        )
    }
}




// ===============================  CONTROLLER FOR LOGIN ============================


export const authLogin = async (req, res) => {



    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "invaild email or password",
            })

        }


        let user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "wrong email id"
            })
        }

        let match = await passwordCompare(password, user.password)
        console.log(password);

        if (!match) {
            return res.status(401).send({
                success: false,
                message: "wrong password"
            })
        }


        const token = await JWT.sign({ _id: user._id }, process.env.secret_key, {
            expiresIn: "7d"
        })




        res.status(200).json({
            success: true,
            message: "loged in successfully",
            user: {
                email: user.email,
                name: user.name,
                password: user.password
            }
            , token

        })


    }


    catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "error in authlogin",
            error
        })
    }

}

export const forgetPassword = async (req, res) => {
    try {
        const { email, answar, newPassword } = req.body;
        if (!email) {
            return res.status(400).send({ message: "email is required" })
        }
        if (!newPassword) {
            return res.status(400).send({ message: "newpassword is required" })
        }
        if (!answar) {
            return res.status(400).send({ message: "answar is required" })
        }
        //
        // check
        let user = await User.findOne({ email, answar })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "invalid email or password"
            })
        }

        const hashed = await hashPassword(newPassword);

        let changed = await User.findByIdAndUpdate(user._id, { password: hashed }, { new: true });

        console.log('changed password successfully???');

        res.status(200).send({
            success: true,
            message: "you have changed password successfully."
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in forgetpassword",
            error: error.message
        })
    }
}

export const usertest = async (req, res) => {
    try {
        res.send("protected routes")
    } catch (error) {
        console.log(error)
        console.log("error in usertest")
    }
}

