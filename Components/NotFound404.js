import React from 'react'
import Particles from './Particle';
import Navbar from '@/Components/Navbar';
import Link from 'next/link';

const NotFound404 = () => {
    return <>
        <div className='w-full h-dvh relative bg-black' >
            <Navbar />
            <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
            />

            <div className="text-white text-4xl z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]">
                <div className="title-404 text-center">
                    404
                </div>
                <div className="subtitle-404 text-center">
                    Page Not Found.
                </div>
                <div className="desc-404 text-center">
                    It seems the page you're looking for doesn't exist.<br /> Let's get you back on track.
                </div>
                <div className="flex justify-center">
                    <Link className='btn-return' href={"/"}>Return to home page</Link>
                </div>

            </div>
        </div>
    </>
}

export default NotFound404;