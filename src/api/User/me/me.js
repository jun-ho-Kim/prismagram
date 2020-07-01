import { prisma } from "../../../../generated/prisma-client";

export default {
    Query : {
        me: async (_, __, {request, isAuthenticated}) => {
            const {user} = request;
            isAuthenticated(request);
            /* fragment를 사용했을 경우의 코드(주석처리된 부분만 이용)
            return prisma.user({i:user.id}).$fragment(USER_FRAGMENT); */
            const userProfile = prisma.user({id:user.id});
            const posts = await prisma.user({id:user.id}).post();
            return {user: userProfile, posts};
        }
    }
}