import React from 'react'
import PostPage from './PostPage'

const Posts = async ({ params }) => {

    function generate9DigitId() {
        return Math.floor(100000000 + Math.random() * 900000000); // 9-digit
    }

    const { postId } = await params;

    return <>
        <div className="">heelo {postId}</div>
        <PostPage />
    </>

}

export default Posts