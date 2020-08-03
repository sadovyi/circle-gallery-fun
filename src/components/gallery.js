import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

const Gallery = ({children}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {children}
        </div>
    );
};

export default Gallery;