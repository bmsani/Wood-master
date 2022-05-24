import React from 'react';
import sani from '../../assets/about-me/IMG_20210205_164744.jpg'

const MyPortfolio = () => {
    return (
        <div className='mt-10'>
            <div class="card w-10/12 mx-auto bg-base-100 shadow-xl">
                <div class="avatar w-96 lg:w-[80vh] mx-auto mt-5">
                    <div class="rounded">
                        <img className='' src={sani} alt=""/>
                    </div>
                </div>
                <div class="card-body">
                    <h2 class="card-title text-4xl font-bold mx-auto">Md Asgar Sani</h2>
                    <p> <span className="text-xl text-neutral font-bold">Email : </span> bmsani6@gmail.com</p>
                    <p> <span className="text-xl text-neutral font-bold">Education : </span> Honours</p>
                    <p> <span className="text-xl text-neutral font-bold">Year : </span> 4th year</p>
                    <p> <span className="text-xl text-neutral font-bold">Subject : </span> Management</p>
                    <p> <span className="text-xl text-neutral font-bold">Web development Skills : </span> Html, css, Javascript (basic), React, mongodb (basic)</p>
                    <p> <span className="text-xl text-neutral font-bold">Practice project link 1 : </span> <button className='btn btn-link'>https://mountain-rockers.web.app/</button> </p>
                    <p> <span className="text-xl text-neutral font-bold">Practice project link 2 : </span> <button className='btn btn-link'>https://assingment-10-a59fb.web.app/</button> </p>
                    <p> <span className="text-xl text-neutral font-bold">Practice project link 3 : </span> <button className='btn btn-link'>https://my-todo-app-5605a.web.app/</button> </p>
                    

                    
                </div>
            </div>
        </div>
    );
};

export default MyPortfolio;