import { Request, Response } from 'express';

export const createId = (req: Request, res: Response) => 
{
    console.log('createId called with ' + req)
    res.send('createId received')
}

export const moveId = (
    req: Request, 
    res: Response) => 
{
    console.log('moveId called with ' + req.params['id'])
    res.status(200).json({id : req.params['id'], bin: "12"})
}

export const moveIdAuto = (    
    req: Request, 
    res: Response) => 
{
    console.log('moveIdAuto called with ' + req.params['id'] + 'and' + req.params['bin'])
    res.status(200).json({ id: req.params['id'], bin: "12"})
}