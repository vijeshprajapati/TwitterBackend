import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createTweetValidation, updateTweetValidation } from "../helpers/validation";
import { validationResult } from "express-validator";

const router = Router();
const prisma = new PrismaClient();

router.post('/', createTweetValidation, async (req : any, res : any) => {
    const { content, image, userId } = req.body;

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        };

        const result = await prisma.tweet.create({
            data : {
                content,
                image,
                userId,
            },
        });  
        res.json(result);
    }
    catch(e){
        res.status(400).json({error : "Unexpected Error"});
    }
});

router.get('/', async (req, res) => {
    const allTweets = await prisma.tweet.findMany({
        include: {user: {
            select : {
                id : true,
                name : true,
                username : true,
                image : true,
            }
        }}
    });
    res.json(allTweets);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const tweet = await prisma.tweet.findUnique(
        {
            where : {id : Number(id)},
            include : { user : true }
        });

    !tweet ? res.json({error : 'Tweet not found'}) : res.json(tweet);
});

router.put('/:id', updateTweetValidation, async (req : any, res : any) => {
    const id = req.params.id;

    const {content} = req.body;
 
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const result = await prisma.tweet.update({
            where: {id : Number(id)},
            data: {content}
        });

        res.send(result);
    } catch(e){
        res.status(501).json({error : "Error updating Tweet"});
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try{
        await prisma.tweet.delete({
            where: {id : Number(id)}
        })
        res.json({message : `Successfully deleted tweet with id : ${id}`})
    }
    catch(e){
        res.status(400).json({error : `Tweet with id : ${id} not found`});
    }
});

export default router;