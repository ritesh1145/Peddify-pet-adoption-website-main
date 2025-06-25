import React, { useState, useEffect } from 'react';
import { Badge, IconButton, Menu, MenuItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const getNotifications = () => JSON.parse(localStorage.getItem('notifications') || '[]');
const setNotifications = n => localStorage.setItem('notifications', JSON.stringify(n));

const NotificationsBell = ({ sx = {} }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotificationsState] = useState([]);

  useEffect(() => {
    setNotificationsState(getNotifications());
  }, []);

  const handleOpen = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleClear = () => {
    setNotifications([]);
    setNotificationsState([]);
    handleClose();
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
        aria-label="Open notifications"
        sx={{
          ml: 1,
          position: 'relative',
          background: notifications.length > 0 ? 'linear-gradient(135deg, #FFD70033, #FF980033)' : 'transparent',
          boxShadow: notifications.length > 0 ? '0 0 12px 2px #FFD70055' : 'none',
          borderRadius: '50%',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFD70066, #FF980066)',
            transform: 'scale(1.12) rotate(-8deg)',
            boxShadow: '0 0 24px 6px #FFD70099',
          },
          outline: 'none',
          ...sx
        }}
        aria-haspopup="true"
        aria-controls="notifications-menu"
      >
        <Badge
          badgeContent={notifications.length}
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              fontWeight: 700,
              fontSize: '0.8rem',
              minWidth: 22,
              height: 22,
              borderRadius: '50%',
              boxShadow: notifications.length > 0 ? '0 0 8px 2px #FFD70099' : 'none',
              background: notifications.length > 0 ? 'linear-gradient(135deg, #FFD700, #FF9800)' : undefined,
              color: notifications.length > 0 ? '#fff' : undefined,
              animation: notifications.length > 0 ? 'notif-pulse 1.2s infinite alternate' : 'none',
            }
          }}
        >
          <NotificationsIcon aria-label="Notifications" sx={{ fontSize: 28 }} />
        </Badge>
      </IconButton>
      <Menu id="notifications-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} role="menu" aria-label="Notifications Menu">
        {notifications.length === 0 ? (
          <MenuItem disabled>No new notifications</MenuItem>
        ) : (
          notifications.map((n, i) => (
            <MenuItem key={i} tabIndex={0} aria-label={`Notification: ${n}`}>
              <ListItemText primary={n} />
            </MenuItem>
          ))
        )}
        {notifications.length > 0 && (
          <MenuItem onClick={handleClear} sx={{ color: 'error.main' }} aria-label="Clear all notifications">
            Clear All
          </MenuItem>
        )}
      </Menu>
      <style>{`
        @keyframes notif-pulse {
          0% { box-shadow: 0 0 8px 2px #FFD70099; }
          100% { box-shadow: 0 0 20px 8px #FFD70033; }
        }
      `}</style>
    </>
  );
};

export default NotificationsBell; 