import {Request, Response, Router} from 'express';
import Todo  from '../models/todo';
import {verifyToken} from '../middleware/auth';
import User from "../models/user";
import * as yup from "yup";
import {todoSchema} from "../schemas/todo.schema";
import {shareTodoSchema} from "../schemas/shareTodo.schema";

const router = Router();

/**
 * send list of all todos with all tasks and users
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await Todo.findAll({include: {all: true, attributes: { exclude: ['password'] }}});
        res.status(200).json({ result });
    }
    catch (error){
        res.status(500);
        console.log(error);
    }
});

/**
 * create new todo record under user
 */
router.post('/create',verifyToken ,async (req: Request, res: Response) => {
    let validatedTodo: yup.InferType<typeof todoSchema>
    try {
        validatedTodo = todoSchema.validateSync(req.body)
    }
    catch (error){
        res.status(400).json({message: 'wrong request body'})
        return
    }
    try {
        const todo = await Todo.create(validatedTodo)
        const user = await User.findOne({
                where: {
                    email: req.body.verifyToken.email
                }
            }
        )
        if (!user){
            res.status(500).send({message: "Todo not created"});
            console.log('auth user not find');
            return
        }
        await user.addTodo(todo);
        res.status(201).json({ message: 'new Todo was created'});
    }
    catch (error: any){
        res.status(400).json({   message: 'Todo not added',
            'error code': error.code,
            error: error.message, });
    }
});

/**
 * share with users
 */

router.post('/share',verifyToken ,async (req: Request, res: Response) => {
    let validatedShareTodo: yup.InferType<typeof shareTodoSchema>
    try {
        validatedShareTodo = shareTodoSchema.validateSync(req.body)
    }
    catch (error){
        res.status(400).json({message: 'wrong request body'})
        return
    }

    try {
        const user = await User.findOne({
                include:{all: true},
                where: {
                    email: req.body.verifyToken.email
                }
            }
        )
        if (!user){
            res.status(500).send({message: "Todo not shared"});
            console.log('auth user not find');
            return

        }
        const todo = user.Todos?.find(item => item.name === validatedShareTodo.name);

        if (!todo){
            res.status(400).json({message: "cant share this todo"})
            return
        }

        const userToAdd = await User.findOne({where: {email: validatedShareTodo.email}})

        if (!userToAdd){
            res.status(400).json({message: "user doesnt exist"})
            return
        }

        await userToAdd.addTodo(todo);
        res.status(200).json({ message: 'Todo was shared' });
    }
    catch (error: any){
        res.status(400).json({   message: 'Todo not shared',
            'error code': error.code,
            error: error.message, });
    }
});


export default router;