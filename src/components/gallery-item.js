import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
    root: {
        margin: '1rem 1.6rem',
        width: '25%',
        transition: 'ease .3s',
        willChange: 'width, height, opacity',
        ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
            maxWidth: '300px',
            maxHeight: '300px',
        }
    },
    rootHovered: {
        position: 'relative',
        zIndex: 10,
    },
    inner: {
        position: 'relative',
        width: '100%',
        height: '100%',
        willChange: 'border-radius',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 100%)',
        zIndex: 1,
        opacity: .2,
        transition: 'ease-out .3s',
    },
    overlayHovered: {},
    image: {
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        objectFit: 'cover',
        objectPosition: '50% 50%',
        boxShadow: '0 0 15px #000',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    detailsTop: {
        padding: '0 15px',
        position: 'absolute',
        top: '-18px',
        left: 0,
        width: '100%',
        height: 'auto',
        textAlign: 'center',
        transform: 'translateY(70%)',
        transition: 'ease-out .3s',
        borderRadius: '3px',
        backgroundColor: '#616161',
        color: '#ffffff',
        opacity: 0,
        zIndex: 2,

        '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: -13,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '15px 16px 0 15px',
            borderColor: '#616161 transparent transparent transparent',
        }
    },
    detailsTopHovered: {
        opacity: 1,
        transform: 'translateY(-100%)',
        willChange: 'transform, opacity',
    },
    detailsBottom: {
        padding: '0 15px',
        position: 'absolute',
        bottom: '-18px',
        left: 0,
        width: '100%',
        height: 'auto',
        textAlign: 'center',
        transform: 'translateY(-70%)',
        transition: 'ease-out .3s',
        backgroundColor: '#616161',
        borderRadius: '3px',
        color: '#ffffff',
        opacity: 0,
        zIndex: 2,
        willChange: 'transform, opacity',

        '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: -13,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 15px 16px 15px',
            borderColor: 'transparent transparent #616161 transparent',
        }
    },
    detailsBottomHovered: {
        opacity: 1,
        transform: 'translateY(100%)'
    },
    profileImage: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '0',
        height: '0',
        transform: 'translate(-50%, -50%)',
        transition: 'ease-out .3s',
        objectFit: 'cover',
        willChange: 'width, height, border-radius',
    },
    profileImageHovered: {
        width: '100%',
        height: '100%',
    }
}));


const GalleryItem = ({isVisible, newSize, filter, url, borderRadius, data}) => {
    const classes = useStyles();

    function getSize(image) {
        const img = new Image();
        img.src = image;

        return Math.round(img.width / 12);
    }

    const [hover, setHover] = useState(false);

    const onMouseEnter = () => {
        setHover(true);
    };

    const onMouseLeave = () => {
        setHover(false);
    };

    return (
        <div
            className={`${classes.root} ${hover && classes.rootHovered}`}
            style={{
                height: url && getSize(url) + newSize,
                width: url && getSize(url) + newSize,
                opacity: `${isVisible ? 1 : 0}`
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className={classes.inner} style={{
                borderRadius: `${borderRadius}%`
            }}>
                <div className={`${classes.overlay} ${hover && classes.overlayHovered}`}>&nbsp;</div>
                <div className={classes.image} style={{
                    backgroundImage: `url(${url})`,
                    filter: filter,
                }}>&nbsp;</div>
                <div className={`${classes.detailsBottom} ${hover && classes.detailsBottomHovered}`}>
                    <p>{data.bio}</p>
                </div>
                <img
                    className={`${classes.profileImage} 
                    ${hover && classes.profileImageHovered}`}
                    src={data.profile_image} alt='alt'
                    style={{
                        borderRadius: `${borderRadius}%`
                    }}
                />
                <div className={`${classes.detailsTop} ${hover && classes.detailsTopHovered}`}>
                    <h3>{data.name}</h3>
                </div>
            </div>
        </div>
    );
};

export default GalleryItem;