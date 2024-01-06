import { Router } from "express";

const router = Router();

router.post('/', (req, res) => {
    res.status(501).json({error : 'Not Implemented'});
});

router.get('/', (req, res) => {
    res.status(501).json({error : 'Not Implemented'});
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.status(501).json({error : `Not Implemented: ${id}`});
});


router.put('/:id', (req, res) => {
    const id = req.params.id;
    res.status(501).json({error : `Not Implemented: ${id}`});
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.status(501).json({error : `Not Implemented: ${id}`});
});

export default router;