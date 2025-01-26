import React from 'react'
import Image from 'next/image'
import "@/css/style.css";

const HomeDesc = () => {
    return (
        <>
            <section className="section-description">
                <div className='overlay-user'>
                    <Image src={"/assets/images/banner/person.jpg"} width={0} height={0} sizes='100' alt='user' />
                </div>
                <div className="container-description w-full px-4 md:px-8">
                    <div className="description-text pb-12 flex justify-between w-full md:flex-row-reverse flex-col-reverse gap-12 md:gap-6">
                        <div className="description-title text-end md:text-start">
                            KAMAUU
                        </div>
                        <div className="description-subtitle max-w-2xl">
                            "Patreon provides a space for artists to sustain themselves by connecting them directly to their own communities."
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeDesc
