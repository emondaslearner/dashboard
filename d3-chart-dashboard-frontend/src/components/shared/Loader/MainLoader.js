import React from 'react';
import { HashLoader } from 'react-spinners';

const MainLoader = () => {
    return (
        <div className='fixed left-0 top-0 w-full h-full bg-[#00000056] flex justify-center items-center z-50'>
            <HashLoader color='#e74c3c' />
        </div>
    );
};

export default MainLoader;