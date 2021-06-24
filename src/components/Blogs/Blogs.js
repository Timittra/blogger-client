import React from 'react';
import { useHistory } from 'react-router-dom';
import './Blogs.css';

const Blogs = ({blog}) => {
    const history = useHistory();

    const handleClick = (id) =>{
        const url = `/blogDetail/${id}`;
        history.push(url);
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="blog_img mb_20">
                            <img src={blog.imageURL} alt="" />
                            <div className="blog_overlay">
                                <h5>{blog.title}</h5>
                                <div className='btn-main'>
                                <button onClick={()=>handleClick(blog._id)} className='btn-detail detail'>Detail</button>
                                </div>
                            </div>
             </div>  
        </div>
    );
};

export default Blogs;