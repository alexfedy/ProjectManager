import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

type postProps = {
    userEmail: string
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
                const data = await prisma.post.findMany({
                    where: {userId: prismaUser.id},
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        user: true, // Include the associated user
                    },
                })
                res.status(200).json(data)
            }catch(error){
                return res.status(500).json({message: "Error creating a new post"})
            }
        }
    }
    catch(error){
        return res.status(500).json(error)
    }
}