import React from 'react'
import Sidebar from '../components/Home/Sidebar';
import { Outlet } from 'react-router-dom';

const Home=()=>{
    return (
        <div className='flex h-[98vh]'>
           <div className='w-1/6 border border-transparent rounded p-4 flex flex-col justify-between'>
            <Sidebar/>
            </div>
            <div className='w-5/6 border border-transparent rounded p-4 flex flex-col justify-between'>
            <Outlet/>
            </div>
        </div>
    )
}

export default Home;