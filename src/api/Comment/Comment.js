export default {
    Comment: {
        user: ({id}) => prisma.Comment({id}).user(), 
        post: ({id}) => prisma.Comment({id}).post()
    }
}