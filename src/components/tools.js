import React from 'react';
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const filters = [
    {id: '0', name: 'none'},
    {id: '1', name: 'brightness(0.5)'},
    {id: '2', name: 'contrast(200%)'},
    {id: '3', name: 'grayscale(80%)'},
    {id: '4', name: 'sepia(1)'},
    {id: '5', name: 'saturate(0.25)'},
    {id: '6', name: 'hue-rotate(320deg)'},
];

const Tools = ({setBorderRadius, setNewSize, setFilter, filter, ...props}) => {
    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const onChangeSlider = (e, v) => {
        setNewSize(v);
    };

    const onChangeSlider2 = (e, v) => {
        setBorderRadius(v);
    };

    return (
        <Paper elevation={3} {...props}>
            <Box display='flex'>
                <Box px='20px' py='20px' style={{maxWidth: 300}}>
                    <Typography gutterBottom>Change images size</Typography>
                    <Slider
                        defaultValue={50}
                        aria-labelledby="discrete-slider"
                        step={1}
                        min={-70}
                        max={90}
                        onChangeCommitted={onChangeSlider}
                    />
                    <Typography gutterBottom>Change images radius</Typography>
                    <Slider
                        defaultValue={50}
                        aria-labelledby="discrete-slider"
                        step={1}
                        min={0}
                        max={50}
                        onChangeCommitted={onChangeSlider2}
                    />
                </Box>
                <Box m='20px'>
                    <TextField
                        style={{minWidth: 200}}
                        id="outlined-select-currency"
                        select
                        label="Change filter"
                        value={filter}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {filters.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Box>
        </Paper>
    );
};

export default Tools;