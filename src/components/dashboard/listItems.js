import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ListSubheader from '@mui/material/ListSubheader';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TvIcon from '@mui/icons-material/Tv';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton >
      <ListItemIcon>
        <FormatListBulletedIcon color='primary'/>
      </ListItemIcon >
      <ListItemText primary="Danh mục" sx={{color: '#0A8E9D'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <TvIcon />
      </ListItemIcon>
      <ListItemText primary="Theo dõi và giám sát" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Biểu đồ" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NotificationsNoneIcon />
      </ListItemIcon>
      <ListItemText primary="Thông báo" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PermIdentityIcon />
      </ListItemIcon>
      <ListItemText primary="Cá nhân" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);