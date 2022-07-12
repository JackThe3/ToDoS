import {Request, Response, Router} from 'express';
import User from '../models/user';
import { secret } from "../config";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import {userSchema} from "../schemas/user.schema";
import {verifyToken} from "../middleware/auth";


const router = Router();

/**
 * users/
 * Return all users in database
 */
router.get('/',verifyToken, async (req: Request, res: Response) => {
    try {
        const result = await User.findAll({attributes: { exclude: ['password'] }});
        res.status(200).json({ users: result });
    }
    catch (error){
        res.status(500).json({message: 'server error'})
        console.log(error)
    }
});

/**
 * After sending correct email and password
 * Returns valid token that expires in 2 hours
 */
router.post('/authentication', async (req: Request, res: Response) =>{
    try {
        let validatedBody: yup.InferType<typeof userSchema>
        try {
            validatedBody = userSchema.validateSync(req.body)
        }
        catch (error){
            res.status(400).json({message: 'wrong request body'})
            return
        }

        const { email, password } = validatedBody

        const user = await User.findOne({
            where: {
                email
            },
            include: {all: true},
            }
        )

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ email }, secret, {expiresIn: '2h',})
            res.status(200).send({ token, user: { email}})
        } else {
            res.status(401).send({ message: 'Invalid Credentials' })
        }
    } catch (err) {
        console.log(err)
    }
})

/**
 * add new user do database
 */
router.post('/register', async (req: Request, res: Response) => {
    let validatedBody: yup.InferType<typeof userSchema>
    try {
        validatedBody = userSchema.validateSync(req.body)
    }
    catch (error){
        res.status(400).json({message: 'wrong request body'})
        return
    }
    try {
        await User.create({...validatedBody, password: await hashPassword(validatedBody.password)})
        res.status(201).json({ message: 'REGISTER was successful'});
    }
    catch (error: any){
        res.status(400).json({   message: 'REGISTER was not successful',
            'error code': error.code,
            error: error.message, });
    }
});

/**
 * encrypt password
 * @param password
 * @param saltRounds
 */
const hashPassword = async (password: string, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }
    return ""
};

export default router;