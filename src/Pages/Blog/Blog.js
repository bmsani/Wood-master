import React from 'react';

const Blog = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-5xl text-center font-bold pt-5 pb-7'>Frequently Asked Questions</h1>
            <div class="collapse collapse-arrow border border-base-300 rounded-box">
                <input type="checkbox" class="peer" />
                <div class="collapse-title text-xl font-medium bg-gray-900 text-white">
                    How will you improve the performance of a React Application?
                </div>
                <div class="collapse-content bg-slate-200 text-black">
                    <p>Ans:</p>
                    <p>1: We can keep component State Local Where necessary. This way we can render a component only when necessary. We can extract the part of code that cares about the component state, making it local to the part of the code. This ensures that only the component that cares about the state renders</p>
                    <p>2: Memoizing React components to prevent unnecessary re-renders. Memoization is an optimization strategy that caches a component-rendered operation, saves the result in memory, and returns the cached result for the same input.</p>
                    <p>3: Code-splitting in React using dynamic import(). This method tells React to load each component dynamically. So, when a user follows a link to the home page, for instance, React only downloads the file for the requested page instead of loading the entire file for the entire application.</p>
                    <p>4: Lazy loading images in React. We can load only the image of the page which user is watching that moment if he change his view then react loads the images of that part. It is very essential for large page because media file take much data to load.</p>
                </div>
            </div>
            <div class="collapse collapse-arrow border border-base-300 rounded-box">
                <input type="checkbox" class="peer" />
                <div class="collapse-title text-xl font-medium bg-gray-900 text-white">
                    What are the different ways to manage a state in a React application?
                </div>
                <div class="collapse-content bg-slate-200 text-black">
                    <p>There are four main types of state you need to properly manage in your React apps:</p>
                    <p>1: Local state</p>
                    <p>2: Global state</p>
                    <p>3: Server state</p>
                    <p>4: URL state</p>
                </div>
            </div>
            <div class="collapse collapse-arrow border border-base-300 rounded-box">
                <input type="checkbox" class="peer" />
                <div class="collapse-title text-xl font-medium bg-gray-900 text-white">
                    How does prototypical inheritance work?
                </div>
                <div class="collapse-content bg-slate-200 text-black">
                    <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.
                    </p>
                </div>
            </div>
            <div class="collapse collapse-arrow border border-base-300 rounded-box">
                <input type="checkbox" class="peer" />
                <div class="collapse-title text-xl font-medium bg-gray-900 text-white">
                    Why you do not set the state directly in React?
                </div>
                <div class="collapse-content bg-slate-200 text-black">
                    <p>If we set the state directly, it will change the reference of the state in the previous virtual DOM as well. So, React won't be able to see that there is a change of the state and so it won't be reflected in the original DOM until we reload.</p>
                </div>
            </div>
            
            <div class="collapse collapse-arrow border border-base-300 rounded-box">
                <input type="checkbox" class="peer" />
                <div class="collapse-title text-xl font-medium bg-gray-900 text-white">
                    What is unit test? Why should write unit tests?
                </div>
                <div class="collapse-content bg-slate-200 text-black">
                    <p>Unit test is a type of software testing where individual units or components of a software are tested. It is mainly used to validate that each unit of the software code performs as expected. Unit Testing is done during the development (coding phase) of an application by the developers. Unit Tests isolate a section of code and verify its correctness.</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;