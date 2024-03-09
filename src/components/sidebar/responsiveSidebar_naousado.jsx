import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const drawerWidth = 240;

const ResponsiveSidebar = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <div className="responsive-container">
      <nav style={{ width: minimized ? 56 : open ? drawerWidth : 0, transition: 'width 0.3s' }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              { !minimized && <ListItemText primary="Inbox" /> }
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              { !minimized && <ListItemText primary="Drafts" /> }
            </ListItem>
          </List>
        </Drawer>
        <div style={{ position: 'fixed', top: 0, left: 0 }}>
          <Button
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            style={{ marginRight: 8 }}
          >
            { open ? <MenuIcon /> : minimized ? <MenuIcon /> : <ExpandMoreIcon />}
          </Button>
          { minimized && 
            <Button
              color="inherit"
              aria-label="expand drawer"
              onClick={toggleMinimize}
            >
              <ExpandLessIcon />
            </Button>
          }
        </div>
      </nav>
    </div>
  );
};

export default ResponsiveSidebar;
