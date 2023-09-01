import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

type postProps = {
    userEmail: string;
    id: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    try{
        const post: postProps = JSON.parse(req.body);
        if(req.method === 'POST'){
            const prismaUser = await prisma.user.findUnique({
                where: {email: post.userEmail},
            });
            if(!prismaUser){
                return res.status(401).json({message: "Unauthorized"});
            }
            try{
                const data = await prisma.project.delete({
                    where:{
                        id: post.id
                    },
                })
                res.status(200).json(data)
            }catch(error){
                return res.status(500).json({message: "Error deleting the project."})
            }
        }
    }
    catch(error){
        return res.status(500).json(error)
    }
}