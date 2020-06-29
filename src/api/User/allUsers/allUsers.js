import {prisma} from "../../../../generated/prisma-client";

export default {
    Query: {
        allUsers: (_,args) => {
            return prisma.users()
        }
    }
};