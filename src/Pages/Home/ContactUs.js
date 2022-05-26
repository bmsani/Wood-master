import React from 'react';

const ContactUs = () => {
    const handleSubmit = (event) => {
       event.preventDefault();
    }
    return (
        <div className='mt-10'>
            <div className="card w-96 lg:w-2/4 mx-auto bg-base-100 shadow-xl">
                <h1 className='text-center text-5xl py-10 text-error font-bold'>Contac Us</h1>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="grid gap-1">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Type email" className="input input-bordered w-full"/>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Subject</span>
                            </label>
                            <input type="number" placeholder="Subject" className="input input-bordered w-full"/>
                            
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Your message</span>
                            </label>
                            <textarea type="text" placeholder="message" className="input input-bordered w-full h-24"/>
                            
                        </div>

                        <input type="submit" value={"submit"} placeholder="Type here" className="w-full lg:w-1/4 mx-auto btn border-t-zinc-90 mt-4" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;