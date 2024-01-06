import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import createUserValidation from '../helpers/validation';
import { validationResult } from "express-validator";

const router = Router();
const prisma = new PrismaClient();

router.post('/', createUserValidation, async (req : any, res : any) => {

    const {email, name , username, bio, image} = req.body;

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const result = await prisma.user.create({
            data : {
                email,
                name,
                username,
                bio,
                image,            }
        });
        res.json(result);
    }
    catch(e){
        res.status(400).json({error : "User already exists"});
    }
});

router.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const user = await prisma.user.findUnique({where : {id : Number(id)}});
    res.json(user);
});


router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const {bio, name , image} = req.body;
 
    try{
        const result = await prisma.user.update({
            where: {id : Number(id)},
            data: {bio, name, image}
        });

        res.send(result);
    } catch(e){
        res.status(501).json({error : "Error updating User"});
    }
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try{
        await prisma.user.delete({
            where: {id : Number(id)}
        })
        res.json({message : `Successfully deleted user with id : ${id}`})
    }
    catch(e){
        res.status(400).json({error : `User with id : ${id} not found`});
    }
});

export default router;