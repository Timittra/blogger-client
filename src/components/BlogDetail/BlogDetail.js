import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './BlogDetail.css';

const BlogDetail = () => {
    const [blog, setBlog] = useState([]);
    const history = useHistory();
    let {id} = useParams();
    
    useEffect(()=>{
        fetch(`http://localhost:6030/blog/${id}`)
        .then(res => res.json())
        .then(result => setBlog(result));
       
    },[id]);

    console.log(blog);

    return (
        <div className="blog_content">
            <div className="container text-center detail">
            <h1>{blog.title}</h1>
            <img src={blog.imageURL} alt="images" />
            <p>{blog.description}</p>
        </div>
        </div>
    );
};

export default BlogDetail;