"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/Components/Sidebar";
import useSidebarStore from "@/lib/store/sidebarStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";

const Library = () => {

    const { isToggled } = useSidebarStore(); // get the global toggle state from Zustand
    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!session?.user?.patreon_account_username) return;

        const loadPostData = async () => {
            try {
                const res = await fetch(`/api/posts/user/${session?.user?.patreon_account_username}`);
                const data = await res.json();
                setPosts(data);
                console.log(data);
            } catch (error) {

            }
        }

        loadPostData();
    }), [session?.user?.patreon_account_username]

    return <>
        <div className="user-main-container">
            <div className={`user-container ${isToggled ? "resized" : ""}`}>
                <div className="user-sidebar-container">
                    <Sidebar isCreator={true} />
                </div>

                <div className="user-content-container">
                    <div className="custom-content">
                        <div className="custom-title">Library</div>
                        <div className="custom-tabs">
                            <div className="ml-10 mt-8 text-lg underline underline-offset-8 text-white">Posts {'>'}</div>
                        </div>

                        <div className="posts-container">
                            <div className="post-contents">
                                {posts.map((post) => (
                                    <div key={post._id} className="post-content">
                                        <div className="user-post">
                                            <div className="post-media">
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

                                            <div className="post-heading">
                                                <div className="post-title">{post.title}</div>
                                                <div className="post-subtitle">{post.content}</div>
                                            </div>
                                        </div>
                                        <div className="line"></div>
                                        <div className="post-activity flex justify-end">
                                            <button className="btn-delete">
                                                <span><MdDelete className="text-xl" /></span>
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default Library