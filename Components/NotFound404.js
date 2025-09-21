import React from 'react'
import Particles from './Particle';
import Navbar from '@/Components/Navbar';

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

            <div className="text-white text-4xl z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">404</div>
        </div>
    </>
}

export default NotFound404;