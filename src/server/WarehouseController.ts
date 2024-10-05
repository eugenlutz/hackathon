import { Request, Response } from 'express';

export const createId = (req: Request, res: Response) => 
{
    console.log('createId called with ' + req)
    res.send('createId received')
}

export const moveId = (req: Request, res: Response) => 
{
    console.log('moveId called with ' + req)
    res.send('moveId received')
}