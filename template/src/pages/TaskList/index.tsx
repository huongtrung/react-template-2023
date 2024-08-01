
import React, { useEffect } from "react"
import {
 Box,
 Divider,
} from "@mui/material"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelector"
import { AuthActions } from "@/reduxSaga/Auth"
import Utilities from "@/utils/Util";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Approval';
import { CanView, CommonModal, CustomButton } from "@/components";
import { globalModal } from "@/components/Modals/GlobalModal";
import { COMPONENT_TYPE } from "@/components/Modals/CommonModal/types";
import { useNavigate } from "react-router-dom";
import { TestActions } from "@/reduxSaga/TestRedux";

function generate(element: React.ReactElement) {
 return [0, 1, 2].map((value) =>
  React.cloneElement(element, {
   key: value,
  }),
 );
}

const APPROVE_METHOD = [
 { value: "OK", label: "Đồng ý" },
 { value: "REJECT", label: "Từ chối" },
]

const settings = ['Trang cá nhân', 'Đăng xuất'];
const TaskList: React.FC = () => {
 const { isSignedIn, role, userName } = useAppSelector(state => state.auth)

 const dispatch = useAppDispatch()
 const navigate = useNavigate()

 const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
 const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

 const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElNav(event.currentTarget);
 };
 const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElUser(event.currentTarget);
 };

 const handleCloseNavMenu = () => {
  setAnchorElNav(null);
 };

 const handleCloseUserMenu = () => {
  setAnchorElUser(null);
  dispatch(AuthActions.logout())
 };

 useEffect(() => {
  dispatch(TestActions.getTaskListRequest())
 }, []);

 return (
  <div>
   <AppBar position="static">
    <Toolbar>
     <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
     <MenuItem onClick={() => {
       navigate('/bpmn')
       handleCloseNavMenu()
     }}>
      <Typography variant="subtitle1" textAlign="center">{'BPMN Editor'}</Typography>
     </MenuItem>
     <MenuItem onClick={handleCloseNavMenu}>
      <Typography variant="subtitle1" textAlign="center">{'Danh sách Task list'}</Typography>
     </MenuItem>
     <Box sx={{ flexGrow: 1 }} />
     <Box>
      <Tooltip title="Open settings">
       <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={userName?.toUpperCase()} src="/static/images/avatar/2.jpg" />
       </IconButton>
      </Tooltip>
      <Menu
       sx={{ mt: '45px' }}
       id="menu-appbar"
       anchorEl={anchorElUser}
       anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
       }}
       keepMounted
       transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
       }}
       open={Boolean(anchorElUser)}
       onClose={() => setAnchorElUser(null)}
      >
       <MenuItem>
        <Typography textAlign="center">{Utilities.leverUser(role)}</Typography>
       </MenuItem>
       {settings.map((setting) => (
        <MenuItem key={setting} onClick={handleCloseUserMenu}>
         <Typography textAlign="center">{setting}</Typography>
        </MenuItem>
       ))}
      </Menu>
     </Box>
    </Toolbar>
   </AppBar>
   <List sx={{ m: 5 }}>
    {generate(
     <>
      <ListItem
       onClick={() => {
        globalModal.open({
         hideFooter: true,
         children: (
          <div
           style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
           <div>
            <h1 style={{ margin: 20 }} onClick={() => console.log("flow: click")}>Phê duyệt đơn xin nghỉ</h1>
           </div>

          </div>
         )
        })
       }}
       secondaryAction={
        <IconButton edge="end" aria-label="delete">
         <DeleteIcon />
        </IconButton>
       }
      >
       <ListItemAvatar>
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
       </ListItemAvatar>
       <ListItemText
        primary="Single-line item"
        secondary={'Secondary text'}
       />
      </ListItem>
      <Divider />
     </>
    )}
   </List>
  </div>
 );
}

export default TaskList;