import { Router } from "express";

const router = Router();

router.post('/', (req, res) => {
    res.status(501).json({error : 'Not implemented'});
});

router.get('/', (req, res) => {
    res.status(501).json({error : 'Not implemented'});
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.status(501).json({error : `Not implemented : ${id}`});
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    res.status(501).json({error : `Not implemented : ${id}`});
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.status(501).json({error : `Not implemented : ${id}`});
});

export default router;