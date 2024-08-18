'use client'
import BuyProductForm from '@/components/orderProduct';
import { useSession } from 'next-auth/react';
import React from 'react';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    const { data: session } = useSession();
    const email=session?.user?.email||'test@gmail.com'
    return <div className='mt-4'>
                <BuyProductForm userEmail={email}/>

    </div>
}
export default page;