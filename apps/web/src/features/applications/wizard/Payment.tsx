import React, { useState } from 'react';
import { useNavigate, useSearchParams, useOutletContext } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { uniName } = useOutletContext<{ uniName: string }>();
    const [selectedMethod, setSelectedMethod] = useState('card');

    const handleBack = () => {
        navigate(-1);
    };

    const handleContinue = () => {
        // In a real app, this would process payment.
        // For now, we simulate a successful payment by saving to local storage or just passing state.
        // We'll navigate to Review, and maybe pass a state that payment is done if we were simulating the flow accurately.
        // But the HTML review page checks local storage.
        localStorage.setItem('paymentStatus', 'paid');
        navigate(`/application/review?${searchParams.toString()}`);
    };

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Select Payment Method</h1>
                <p className="text-sm md:text-base text-gray-500 mt-1">Choose how you would like to pay the application fee securely.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
                <div className="lg:col-span-8">
                    <div className="flex flex-col gap-6">
                        <div className="bg-surface-light rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                            <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Payment Options</h3>
                            </div>
                            <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-4">
                                <label className="relative cursor-pointer group">
                                    <input
                                        checked={selectedMethod === 'card'}
                                        onChange={() => setSelectedMethod('card')}
                                        className="peer sr-only"
                                        name="payment_method"
                                        type="radio"
                                        value="card"
                                    />
                                    <div className={`p-3 md:p-4 rounded-lg border transition-all flex items-center gap-3 md:gap-4 ${selectedMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-600/50 bg-white'}`}>
                                        <div className={`size-4 md:size-5 rounded-full border flex-shrink-0 flex items-center justify-center ${selectedMethod === 'card' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                                            {selectedMethod === 'card' && <div className="size-1.5 md:size-2 bg-white rounded-full"></div>}
                                        </div>
                                        <div className="size-8 md:size-10 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined !text-[20px] md:!text-[24px]">credit_card</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900">Credit or Debit Card</span>
                                                <div className="flex gap-2">
                                                    <span className="text-[10px] font-bold text-gray-400 border border-gray-200 rounded px-1 py-0.5">VISA</span>
                                                    <span className="text-[10px] font-bold text-gray-400 border border-gray-200 rounded px-1 py-0.5">MC</span>
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500">Pay securely with your bank card.</span>
                                        </div>
                                    </div>
                                </label>

                                <label className="relative cursor-pointer group">
                                    <input
                                        checked={selectedMethod === 'bank'}
                                        onChange={() => setSelectedMethod('bank')}
                                        className="peer sr-only"
                                        name="payment_method"
                                        type="radio"
                                        value="bank"
                                    />
                                    <div className={`p-3 md:p-4 rounded-lg border transition-all flex items-center gap-3 md:gap-4 ${selectedMethod === 'bank' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-600/50 bg-white'}`}>
                                        <div className={`size-4 md:size-5 rounded-full border flex-shrink-0 flex items-center justify-center ${selectedMethod === 'bank' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                                            {selectedMethod === 'bank' && <div className="size-1.5 md:size-2 bg-white rounded-full"></div>}
                                        </div>
                                        <div className="size-8 md:size-10 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined !text-[20px] md:!text-[24px]">account_balance</span>
                                        </div>
                                        <div className="flex-1">
                                            <span className="block font-medium text-gray-900">Bank Transfer</span>
                                            <span className="text-sm text-gray-500">Direct transfer from your bank account. Processing may take 2-3 days.</span>
                                        </div>
                                    </div>
                                </label>

                                <label className="relative cursor-pointer group">
                                    <input
                                        checked={selectedMethod === 'wallet'}
                                        onChange={() => setSelectedMethod('wallet')}
                                        className="peer sr-only"
                                        name="payment_method"
                                        type="radio"
                                        value="wallet"
                                    />
                                    <div className={`p-3 md:p-4 rounded-lg border transition-all flex items-center gap-3 md:gap-4 ${selectedMethod === 'wallet' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-600/50 bg-white'}`}>
                                        <div className={`size-4 md:size-5 rounded-full border flex-shrink-0 flex items-center justify-center ${selectedMethod === 'wallet' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                                            {selectedMethod === 'wallet' && <div className="size-1.5 md:size-2 bg-white rounded-full"></div>}
                                        </div>
                                        <div className="size-8 md:size-10 rounded-md bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined !text-[20px] md:!text-[24px]">account_balance_wallet</span>
                                        </div>
                                        <div className="flex-1">
                                            <span className="block font-medium text-gray-900">Digital Wallet</span>
                                            <span className="text-sm text-gray-500">Pay via PayPal, Google Pay, or Apple Pay.</span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="bg-surface-light rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                            <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900">Billing Information</h3>
                                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Edit</button>
                            </div>
                            <div className="p-4 md:p-6 text-sm text-gray-600 flex flex-col gap-1">
                                <p className="font-medium text-gray-900">Alex Morgan</p>
                                <p>123 Maple Street, Apt 4B</p>
                                <p>New York, NY 10001</p>
                                <p>United States</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-surface-light rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm sticky top-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Order Summary</h3>
                        <div className="flex gap-3 md:gap-4 items-start mb-4 md:mb-6">
                            <div className="size-10 md:size-12 rounded border border-gray-200 bg-white p-1 shrink-0 flex items-center justify-center">
                                <span className="material-symbols-outlined text-gray-400 !text-[20px] md:!text-[24px]">school</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 leading-tight text-sm md:text-base">{uniName}</h4>
                                <p className="text-xs text-gray-500 mt-0.5 md:mt-1">MS in Computer Science • Fall 2024</p>
                            </div>
                        </div>
                        <div className="space-y-3 border-t border-gray-100 pt-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Application Fee</span>
                                <span className="font-medium text-gray-900">$115.00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Processing Fee</span>
                                <span className="font-medium text-gray-900">$2.50</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Tax</span>
                                <span className="font-medium text-gray-900">$0.00</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                            <span className="font-bold text-gray-900 text-lg">Total</span>
                            <span className="font-bold text-blue-600 text-xl">$117.50</span>
                        </div>
                        <div className="mt-8 flex flex-col gap-3">
                            <button
                                onClick={handleBack}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 md:px-5 md:py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                            >
                                <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
                                Back to Documents
                            </button>
                            <button
                                onClick={handleContinue}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 md:px-5 md:py-3 bg-blue-600 text-white rounded-lg font-medium text-sm shadow-sm shadow-blue-200"
                            >
                                Pay & Continue
                                <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                            </button>
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-2">
                                <span className="material-symbols-outlined !text-[14px]">lock</span>
                                Secure Encrypted Payment
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
