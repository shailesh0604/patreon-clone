import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { FaLock } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
const Blogs = ({ username }) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!username?.patreon_account_username) return;

        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/user/${username.patreon_account_username}`);
                if (!res.ok) throw new Error("Failed to fetch posts");

                const data = await res.json();

                setPosts(Array.isArray(data) ? data : []);

            } catch (error) {
                // console.error("Error fetching posts: ", error);
                setPosts([]);
            }
            finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [username]);

    if (loading) return <div className='flex justify-center items-center gap-3 mt-10 mb-16'>
        <div className='loader'></div>
        <p>Loading blogs</p>
    </div>;

    return <>
        <section className="section-blogs mb-16">
            <h2 className="recent-title">
                Recent posts by <span className='capitalize'>{username?.patreon_account_username}</span>
            </h2>

            {posts.length === 0 ? (
                <p className='text-center'>{username?.patreon_account_username} not posted anything yet!!</p>
            ) : (

                <div className="blogs">
                    {posts.map((post) => (
                        <div key={post._id} className="blog">
                            <div className="blog-media">
                                <div className="locked">
                                    <span><FaLock /></span>
                                    <span>locked</span>
                                </div>
                                {post.media && (
                                    <>
                                        {post.media.match(/\.(mp4|webm|ogg)$/i) ? (
                                            <video
                                                src={post.media}
                                                autoPlay muted loop
                                                playsInline
                                            />
                                        ) : (
                                            <Image width={0} height={0} sizes='100'
                                                src={post.media}
                                                alt={post.title}
                                            />
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="blog-heading">
                                <h2 className="blog-title">{post.title}</h2>
                                <p className="blog-subtitle">{post.content}</p>
                                <small className='blog-date'>
                                    {new Date(post.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}</small>

                                <div>
                                    <button type='button' className="btn-join">
                                        Join to unlock
                                    </button>
                                </div>


                                <div className="acivity flex justify-between items-center mt-5 flex-wrap gap-3">
                                    <div className="acivity-1 flex items-center gap-4">
                                        <div className="likes flex items-center gap-1">
                                            <span><FaHeart /></span>
                                            <span>250</span>
                                        </div>

                                        <div className="comment flex items-center gap-1">
                                            <span><FaComment /></span>
                                            <span>100</span>
                                        </div>
                                    </div>

                                    <div className="acivity-2 flex items-center gap-7">
                                        <div className="share flex items-center gap-1">
                                            <span><FiShare /></span>
                                            <span>Share</span>
                                        </div>

                                        <div className="comment flex items-center gap-1">
                                            <span><FaLock /></span>
                                            <span>Locked</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section >
    </>
}

export default Blogs