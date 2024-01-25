import {Request, Response, Router} from "express";
import User from "../models/user";
import Order from "../models/order";

const router: Router = Router();

router.post('/user', async (req: Request, res: Response) => {
    const data = new User({
        personalCode: req.body.personalCode,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephone: req.body.telephone,
        address: req.body.address,
        password: req.body.password,
        admin: req.body.admin,
        created: new Date()
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error})
    }
})

router.get('/user', async (req: Request, res: Response) => {
    try {
        const data = await User.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete('/user/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        const data = await User.find();
        res.send(data);
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.put('/user/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new: true};

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get('/user/:id/order', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const result = await User.findById(id).populate("orders");

        res.send(result);
    } catch (error) {
        res.status(500).json({message: error})
    }
})


export default router;