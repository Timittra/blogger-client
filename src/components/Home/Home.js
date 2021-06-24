import React, { useEffect, useState } from 'react';
import Blogs from '../Blogs/Blogs';
import './Home.css';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:6030/blogs')
        .then(res => res.json())
        .then(data => {
            setBlogs(data);
        });

    }, []);

    return (
        <section id='event-section' className="pt_60 pb_40">
        <div className="container"> 
            <h2>Blogs</h2>
            <div className="row">
                {
                    blogs.map(blog => <Blogs blog={blog}></Blogs>)
                }
            </div>
        </div>
    </section>
    );
};

export default Home;