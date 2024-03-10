import React, { useState } from 'react';
import Razorpay from 'razorpay-checkout';

const BidNow = ({ setShowBidModal }) => {
    const [amount, setAmount] = useState('');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handlePayment = async () => {
        try {
            const response = await fetch('/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: amount // Replace with the actual bid amount
                })
            });
            const data = await response.json();

            const options = {
                key: 'rzp_test_xUIHrkrkhUtUlU',
                key_secret: "4iNHYNHaV6AeuHX73xdzHLje",
                amount: data.amount,
                currency: 'INR',
                name: 'OBS',
                description: 'Payment for bidding',
                order_id: data.orderId,
                handler: function (response) {
                    alert('Payment successful');
                    setShowBidModal(false); // Close the bid modal after successful payment
                },
                prefill: {
                    name: 'sathvik',
                    email: 'kstsathvik005@gmail.com',
                    contact: '8897674181'
                },
                theme: {
                    color: '#007bff'
                }
            };
            const rzp = new Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <div>
            <h2>Place Your Bid</h2>
            <input type="text" placeholder="Enter bid amount" value={amount} onChange={handleAmountChange} />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default BidNow;
