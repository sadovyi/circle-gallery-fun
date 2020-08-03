import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuIcon from '@material-ui/icons/Menu';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import Tools from "./tools";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = ({setNewSize, setBorderRadius, setFilter, filter, form, setForm}) => {
    const classes = useStyles();

    const [toolsPanel, setToolsPanel] = React.useState(false);

    const onToggleTools = () => {
        setToolsPanel(prevState => !prevState);
    };

    const onToggleForm = () => {
        setForm(prevState => !prevState);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={onToggleTools}
                >
                    {toolsPanel ? <HighlightOffIcon/> : <MenuIcon/>}
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Create your style -:)
                </Typography>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={onToggleForm}
                >
                    {!form ? <AssignmentReturnIcon/> : <DoubleArrowIcon/>}
                </IconButton>
            </Toolbar>
            <Tools
                style={{
                    transition: 'ease .4s',
                    maxHeight: toolsPanel ? 1000 : 0,
                    overflow: 'hidden',
                }}
                filter={filter}
                setFilter={setFilter}
                setNewSize={setNewSize}
                setBorderRadius={setBorderRadius}
            />
        </AppBar>
    );
};

export default Navbar;