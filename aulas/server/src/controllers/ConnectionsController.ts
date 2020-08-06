import {Request, Response} from 'express';
import db from '../database/connection';

export default class ConnectionsController {

    async Create(req: Request, res: Response){
        
        const {id} = req.body;

        await db('connections').insert({
            user_id: id
        })
        return res.status(201).send()
    }

    async Index(req: Request, res: Response){
        const totalConnectionsCount = await db('connections').count('* as total');

        const { total} = totalConnectionsCount[0];

        return res.json({total})
    }
}