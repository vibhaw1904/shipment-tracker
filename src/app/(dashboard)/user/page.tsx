'use client'; 


import UserDashboard from '@/components/userHome';
import React from 'react';

type pageProps = {

};

const page:React.FC<pageProps> = () => {
    
    return <div>
       <UserDashboard/>
    </div>
}
export default page;