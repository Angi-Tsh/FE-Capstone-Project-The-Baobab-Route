import React from 'react';

function landingPageImg(){
    return (
        <div
            className="relative h-96 w-full overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1527436553949-ea84cd6cf13c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8fGVufDB8fHx8fA%3D%3D')` }}
        >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
    
        
        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center p-4">
             All you need to know about a safari
            </h1>
        </div>
        </div>
    );
}
export default landingPageImg;