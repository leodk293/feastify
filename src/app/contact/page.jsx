'use client';
import React from 'react'
import { useState } from 'react'
import { SendHorizontal, Phone, Mail, CircleUser } from 'lucide-react';

export default function Page() {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {

        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3_KEY);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <main className='flex flex-col items-center mx-3 md:mx-0'>
            
            <div className=' flex flex-row gap-2'>
                <h1 className=' text-3xl font-bold'>Contact Us</h1>
                <CircleUser className=' self-center' size={36} color="#0a0000" />
            </div>

            <div className=' flex flex-wrap mt-10 gap-10 justify-center'>

                <div className=' flex flex-col mt-10 gap-3 border border-transparent bg-[#e4ab6530] p-7 w-auto rounded-[5px] shadow md:w-[35rem]'>
                    <form
                        className=' flex flex-col gap-3'
                        onSubmit={onSubmit}
                    >
                        <input
                            className=' outline-none border font-bold border-red-950 p-2 text-xl rounded-[5px] bg-transparent placeholder:text-red-950'
                            placeholder='Enter Your Name'
                            type="text" name="name"
                            required
                        />
                        <input
                            className=' outline-none border font-bold border-red-950 p-2 text-xl rounded-[5px] bg-transparent placeholder:text-red-950'
                            placeholder='Enter Your Email'
                            type="email" name="email"
                            required />

                        <textarea
                            className=' outline-none border font-bold border-red-950 p-2 text-xl rounded-[5px] bg-transparent placeholder:text-red-950'
                            placeholder='Write Your Message'
                            name="message" required>

                        </textarea>

                        <button
                            className=' flex flex-row gap-2 border border-transparent w-[140px] px-5 py-2 rounded-[5px] bg-orange-950 hover:translate-x-1 duration-200'
                            type="submit"
                        >
                            <p className=' text-white self-center text-xl'>Send</p>
                            <SendHorizontal color='#fff' size={27} strokeWidth={1.5} />
                        </button>

                    </form>
                    <span className=' font-semibold text-green-900'>{result}</span>

                </div>

                <div className=' flex flex-col gap-5 md:mt-10 '>
                    <h1 className=' text-4xl underline underline-offset-[10px] font-bold'>Let&apos;s stay in touch</h1>
                    <div className=' flex flex-row mt-5 gap-2'>
                        <Phone size={28} strokeWidth={1.75} />
                        <p className=' self-center text-xl font-bold'>+212 0619965635</p>
                    </div>
                    <div className=' flex flex-row gap-3'>
                        <Mail size={28} strokeWidth={1.75} />
                        <p className=' self-center text-xl font-bold'>feastify05@gmail.com</p>

                    </div>

                </div>

            </div>

        </main>
    )
}
