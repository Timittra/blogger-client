import React, { useEffect, useState } from 'react';
import './Admin.css';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Grid } from '@material-ui/core';
import { faTrashAlt,faThLarge } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

const Admin = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const history = useHistory();

    function refreshPage() {
        window.location.reload(false);
    }


    useEffect(() =>{
        fetch('http://localhost:6030/blogs')
        .then(res => res.json())
        .then(data => {
            setBlogs(data);
        });

    }, []);

    const deleteBlog =(id) => {
        
      fetch(`http://localhost:6030/deleteBlog/${id}`,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            refreshPage(history.push('/'));
            console.log(result);
        });
    };


    const onSubmit = data => {
        const EventData = {
            title: data.title,
            description: data.description,
            imageURL: imageURL
        };
        const url = `http://localhost:6030/addBlogs`;

        fetch(url, {
          method: 'POST', 
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(EventData)
        })
        .then(res => console.log('server side response', res))
    };

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '95a9ed8a9b45c730f4310b020c4e3e43');
        imageData.append('image', event.target.files[0]);
        
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    };

    return (
        <div className='admin'>


            <div className='container add-blogs'>
                <h3 style={{ color: 'black' }}><FontAwesomeIcon icon={faPlus} />Add Blogs</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="title" defaultValue="Blog Title" ref={register} />
                    <br />
                    <input name="description" defaultValue="description" ref={register} />
                    <br />
                    <input name="exampleRequired" type="file" onChange={handleImageUpload} />
                    <br />
                    <input style={{ border:'2px solid white' }} type="submit" value="Save" />
                </form>
            </div>

            <div id='delete-blog'>
            <div className='manage-blogs'>
                <h3><FontAwesomeIcon style={{ padding: '3px' }} icon={faThLarge} />Manage Blogs</h3>
                {blogs.map((blog) => (
                    <div className='container list'>

                        <Grid xs={12} sm={12} md={12} lg={12} key={blog._id} item>
                           <h5>{blog.title}
                                <Button onClick={() => deleteBlog(blog._id)}>
                                    <FontAwesomeIcon style={{ color: 'red' }} icon={faTrashAlt} />
                                </Button>
                              </h5>
                        </Grid>

                    </div>

                ))}
            </div>
        </div>

        </div>
    );
};

export default Admin;