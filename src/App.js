import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from "./components/navbar";
import Gallery from "./components/gallery";
import GalleryItem from "./components/gallery-item";
import CircularProgress from "@material-ui/core/CircularProgress";
import TrackVisibility from "react-on-screen";
import Form from "./components/form";

const App = () => {
    const [images, setImages] = useState();
    const [preloader, setPreloader] = useState(true);
    const [newSize, setNewSize] = useState(null);
    const [borderRadius, setBorderRadius] = useState(50);
    const [filter, setFilter] = React.useState('none');
    const [form, setForm] = React.useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/images?limit=10')
            .then(res => res.json())
            .then(data => {
                console.log('Success:', data);
                setImages(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        if (images) {
            setPreloader(false);
        }
    }, [images]);

    return (
        <div className='app'>
            <Navbar
                setFilter={setFilter}
                setNewSize={setNewSize}
                setBorderRadius={setBorderRadius}
                filter={filter}
                form={form}
                setForm={setForm}
            />
            <div className="main">
                {preloader &&
                <div className="preloader-wrapper">
                    <CircularProgress/>
                </div>}
                {!preloader &&
                <Gallery>
                    {images && images.map(img => {
                        return (
                            <TrackVisibility offset={400} key={img.id}>
                                <GalleryItem
                                    filter={filter}
                                    data={img.user}
                                    borderRadius={borderRadius}
                                    newSize={newSize}
                                    url={img.url}
                                />
                            </TrackVisibility>
                        )
                    })}
                </Gallery>
                }
                <div className='form-wrapper' style={{
                    transform: `${form ? 'translateX(0)' : 'translateX(100%)'}`
                }}>
                    <Form/>
                </div>
            </div>
        </div>
    );
};

export default App;
