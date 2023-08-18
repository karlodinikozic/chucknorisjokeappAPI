import {Request, Response} from "express";

export type defaultResponseHandler = (req: Request, res: Response) => Promise<Response>;
export function  createDefaultRequestWithBodyResponse<T, K>(handleFunction: (data: T) => Promise<K>) {
    return async (req: Request, res: Response) => {
        try {
            return res.json(await handleFunction(req.body));
        } catch (error) {
            return res.status(400).json({ error: String(error) });
        }
    };
}

export function  createDefaultRequestWithEmptyBodyResponse<K>(handleFunction: () => Promise<K>) {
    return async (_: Request, res: Response) => {
        try {
            return res.json(await handleFunction());
        } catch (error) {
            return res.status(400).json({ error: String(error) });
        }
    };
}

