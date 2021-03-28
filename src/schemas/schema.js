import { schema } from 'normalizr';

const postSchema = new schema.Entity('posts');
// const postListSchema = new schema.Array(postSchema);
const userSchema = new schema.Entity('users', {
    posts: [postSchema]
});

export const userListSchema = [userSchema];