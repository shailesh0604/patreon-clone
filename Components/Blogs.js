import React from 'react'


const Blogs = ({ username }) => {
    return <>
        <section className='section-blogs'>
            <div className="">Blogs</div>
            <div className="">{username?.patreon_account_username}</div>
        </section>
    </>
}

export default Blogs