import React from 'react';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
    root: {
        position: 'absolute',
        top: 'calc(50% + 64px)',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600,
    },
}));

const Form = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(50);
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [input, setInput] = React.useState({
        name: '',
        email: '',
        dateOfBirth: '',
        favouriteColour: '',
    });

    const [inputErrors, setInputErrors] = React.useState({
        name: '',
        email: '',
        dateOfBirth: '',
        favouriteColour: '',
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const isEmpty = value => {
        if (!value || value.trim().length === 0 || value === '') {
            return true;
        }
    };

    const validateDate = date => {
        const pattern = /^[0-9]{1,2}([,.][0-9]{1,2})?$/;
        return pattern.test(date);
    };

    const validateEmail = email => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    };

    const validate = (name, value) => {
        const err = {};
        let isError = false;
        if (isEmpty(value)) {
            isError = true;
            err[name] = `${value} can't be empty`;
        }
        if (value.length < 5) {
            isError = true;
            err[name] = `${name} must be 3 characters long!`;
        }
        if (name === 'email') {
            if (!validateEmail(value)) {
                isError = true;
                err[name] = 'Please, enter valid email address';
            }
        }
        if (name === 'phone') {
            const num = Number(value);
            if (num.length < 10) {
                isError = true;
                err[name] = `${name} must numbers!`;
            }
            if (!validateDate(num)) {
                isError = true;
                err.phone = 'Please, enter valid date';
            }
        }
        return {isError, err};
    };

    const inputChange = (e) => {
        const {id, value} = e.target;
        const {isError, err} = validate(id, value);
        setInput({
            ...input,
            [id]: value,
        });
        if (isError) {
            setIsDisabled(true);
            setInputErrors(err);
        } else {
            setIsDisabled(false);
            setInputErrors({});
        }
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Paper elevation={3} className={classes.root}>
            <Box py='40px' px='20px'>
                <form noValidate autoComplete="off">
                    <Box mb='20px'>
                        <Typography gutterBottom component='h2' variant='h5'>Contact us</Typography>
                    </Box>
                    <Box mb='16px'>
                        <TextField
                            style={{minWidth: 320}}
                            id="name"
                            label="Name"
                            helperText={inputErrors.name}
                            error={Boolean(inputErrors.name)}
                            variant="outlined"
                            value={input.name}
                            onChange={(e) => {
                                inputChange(e)
                            }}
                            required
                        />
                    </Box>
                    <Box mb='16px'>
                        <TextField
                            style={{minWidth: 320}}
                            type="email"
                            id="email"
                            label="Email"
                            variant="outlined"
                            value={input.email}
                            helperText={inputErrors.email}
                            error={Boolean(inputErrors.email)}
                            onChange={inputChange}
                        />
                    </Box>
                    <Box mb='16px'>
                        <TextField
                            style={{minWidth: 320}}
                            id="dateOfBirth"
                            label="Date of birth"
                            variant="outlined"
                            value={input.dateOfBirth}
                            helperText={inputErrors.dateOfBirth}
                            error={Boolean(inputErrors.dateOfBirth)}
                            onChange={inputChange}
                        />
                    </Box>
                    <Box mb='16px'>
                        <TextField
                            style={{minWidth: 320}}
                            type="name"
                            id="favouriteColour"
                            label="Favourite colour"
                            variant="outlined"
                            value={input.favouriteColour}
                            helperText={inputErrors.favouriteColour}
                            error={Boolean(inputErrors.favouriteColour)}
                            onChange={inputChange}
                        />
                    </Box>
                    <Box>
                        <Typography gutterBottom component='h4' variant='body1'>Salary:</Typography>
                        <Typography gutterBottom component='h5' variant='h5'>{value} $</Typography>
                        <Box mb='20px' py='10px'>
                            <Slider
                                defaultValue={50}
                                value={value}
                                onChange={handleChange}
                                aria-labelledby="continuous-slider"
                                step={1}
                                min={0}
                                max={999999}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={onFormSubmit}
                            disabled={isDisabled}
                        >
                            Apply
                        </Button>
                    </Box>
                </form>
            </Box>
        </Paper>
    );
};

export default Form;