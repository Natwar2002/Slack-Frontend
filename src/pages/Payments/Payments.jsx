import { useState } from 'react';

import { RenderRazorpayPopup } from '@/components/molecules/RenderRazorpayPopup/RenderRazorpayPopup';
import { Input } from '@/components/ui/input';
import { useCreateOrder } from '@/hooks/apis/payments/useCreateOrder';

export const Payments = () => {
    const [orderResponse, setOrderResponse] = useState(null);
    const [amount, setAmount] = useState('');
    const { createOrderMutation, isSuccess } = useCreateOrder();

    async function handleFormSubmit(e) {
        e.preventDefault();
        const response = await createOrderMutation(amount*100);
        setOrderResponse(response);
    }

    return (
        <div className='h-full w-full flex justify-center items-center'>
           <div className='border p-5 rounded-2xl'>
                <form onSubmit={handleFormSubmit} className='flex flex-col gap-3'>
                    <div className='place-items-center'>
                        <h1>Make a payment</h1>
                    </div>
                    <Input 
                        type='number'
                        name='amount'
                        onChange={(e)=> setAmount(e.target.value)}
                        placeholder='Enter amount'
                    />
                    <button type='submit' className='bg-black text-white rounded-xl py-2'>
                        Pay
                    </button>
                    { isSuccess && <RenderRazorpayPopup 
                        amount={amount*100}
                        orderId={orderResponse?.id}
                        currency={'INR'}
                    />}
                </form>
            </div>
        </div>
    );
};