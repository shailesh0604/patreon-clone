import React, { useState, useEffect } from 'react';
import Image from "next/image";

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
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [username]);

    if (loading) return <p>Loading posts...</p>;

    return <>
        <section className="section-blogs">
            <h2 className="text-xl font-bold">
                Blogs by {username?.patreon_account_username}
            </h2>

            {posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (

                <div className="blogs">
                    {posts.map((post) => (
                        <div key={post._id} className="blog">

                            <div className="blog-media">
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
                                <small> Posted on{" "}
                                    {new Date(post.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}</small>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section >
    </>
}

export default Blogs