import React from 'react';
import { Button, Menu, MenuItem, ListItemIcon, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import UpdateIcon from '@mui/icons-material/Update';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import InfoIcon from '@mui/icons-material/Info';

const ActionDropdown = ({ row, dropDownOptions }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                sx={{
                    padding: '3px 10px',
                }}
                id="actions-menu-button"
                aria-controls="actions-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                color="primary"
                endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                onClick={handleClick}
            >
                Actions
            </Button>
            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'actions-menu-button',
                }}
            >
                {dropDownOptions && dropDownOptions.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            if (option?.action) {
                                option.action(row);
                            }
                            handleClose(); // Close the menu after executing the action
                        }}
                    >
                        <ListItemIcon>
                            {option?.icon}
                        </ListItemIcon>
                        {option?.label}
                    </MenuItem>
                ))}


            </Menu>
        </div >
    );
}

export default ActionDropdown;
