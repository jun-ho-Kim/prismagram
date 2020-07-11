import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        post: ({}) => prisma.user({id}).post(),
        following: ({id}) => prisma.user({id}).following(),
        followers: ({id}) => prisma.user({id}).followers(),
        likes: ({id}) => prisma.user({id}).likes(),
        comments:({id}) => prisma.user({id}).comments(),
        rooms: ({id}) => prisma.user({id}).rooms(),
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async(parent, _, {request}) => {
            const {user} = request;
            const {id:parentId} = parent;
            try {
                return prisma.$exists.user({
                    AND: [
                        {
                                id: user.id
                        },
                        {
                            following_some: {
                                id:parentId
                            }
                        }
                    ]
                });
            } catch(error) {
                console.log(error);
                return false;
            }
        },
        isSelf: (parent, _, {request}) => {
            const {id: parentId} = parent;
            const {user} = request;
            return user.id === parentId;
        }
    }
};