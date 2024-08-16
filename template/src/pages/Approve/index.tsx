
import React, { useEffect, useMemo } from "react"
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
import FormInput from "@/components/FormInput";
import { FORM_FIELD_NAME } from "./fieldname";
import { typeInputComponent } from "@/components/FormInput/helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { testSchema } from "./validate";
import { TestActions } from "@/reduxSaga/TestRedux";
import ModalApprove from "./ModalApprove";
import { Button, Modal } from 'antd';
import CloseIcon from '@mui/icons-material/Close'

const APPROVE_METHOD = [
 { value: "OK", label: "Đồng ý" },
 { value: "REJECT", label: "Từ chối" },
]

const settings = ['Trang cá nhân', 'Đăng xuất'];
const Approve: React.FC = () => {
 const { isSignedIn, role, userName } = useAppSelector(state => state.auth)
 const { assignList } = useAppSelector(state => state.test)

 const dispatch = useAppDispatch()

 const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
 const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
 const [isOpen, setIsOpen] = React.useState<boolean>(false);
 const [itemId, setItemId] = React.useState<string>('');
 const [approveStr, setApproveStr] = React.useState<String>('');

 const methods = useForm({
  mode: "onSubmit",
  resolver: yupResolver(testSchema),
 })

 const {
  control,
  getValues,
  setError,
  setValue,
  handleSubmit,
  reset,
  formState: { errors },
 } = methods

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
  const query = Utilities.userId(role)
  dispatch(TestActions.getAssignListRequest(query))
 }, [])

 console.log({ isOpen })

 const handleClaimUser = (id: string) => {
  console.log({ id })
  const values: any = getValues()
  if (Utilities.isEmpty(values[FORM_FIELD_NAME.METHOD])) {
   setApproveStr('Ngày bắt đầu nghỉ không được để trống')
  } else {
   setApproveStr('')
   let approve = ''
   if (values[FORM_FIELD_NAME.METHOD] == 'OK') {
    approve = 'Yes'
   } else {
    approve = 'No'
   }
   const data = {
    "variables": {
     "comment": {
      "value": approve,
      "type": "String"
     }
    }
   }
   const callback = () => {
    reset()
    const query = Utilities.userId(role)
    dispatch(TestActions.getAssignListRequest(query))
   }
   dispatch(TestActions.claimUserByManager({ id, data, callback }))
  }
 }


 const isGDK = useMemo(() => {
  return Utilities.userId(role) == 'tonggiamdoc'
 }, [role])

 return (
  <div>
   <AppBar position="static">
    <Toolbar>
     <MenuItem onClick={handleCloseNavMenu}>
      <Typography variant="subtitle1" textAlign="center">{'Danh sách đơn xin nghỉ'}</Typography>
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
    {assignList?.map((item: any) => {
     return (
      <>
       <ListItem
        onClick={() => {
         setIsOpen(true)
         setItemId(item?.id)
        }}
       >
        <ListItemAvatar>
         <Avatar alt="Kiên" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
         primary="Nhân viên : Nguyễn Trung Kiên"
         secondary={item?.id}
        />
       </ListItem>
       <Divider />
      </>
     )
    })
    }
   </List>
   <Modal
    open={isOpen}
    mask={false}
    style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
    closable={false}
    footer={null}
   >
    <div
     style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
     <div>
      <h1 style={{ margin: 20, textAlign: 'center', color: isGDK ? 'red' : 'black' }}>{isGDK ? 'Phê duyệt đơn xin thôi việc' : 'Phê duyệt đơn xin nghỉ'}</h1>
      <IconButton edge="end" onClick={() => {
       setIsOpen(false)
      }}
       sx={{
        position: 'absolute',
        right: 18,
        top: 10,
       }}
      >
       <CloseIcon />
      </IconButton>
      <FormInput
       label={isGDK ? 'Phê duyệt đơn xin thôi việc' : 'Phê duyệt đơn xin nghỉ phép'}
       control={control}
       options={APPROVE_METHOD}
       name={FORM_FIELD_NAME.METHOD}
       type={typeInputComponent.InputSelect}
       errorMessage={errors[FORM_FIELD_NAME.METHOD]?.message}
      />
      <FormInput
       required
       label='Ý kiến'
       placeholder='Nhập ý kiến'
       control={control}
       name={FORM_FIELD_NAME.REASON}
       type={typeInputComponent.InputText}
       errorMessage={errors[FORM_FIELD_NAME.REASON]?.message}
      />
      <CustomButton
       variant="contained"
       sx={{ width: '100%' }}
       title='Gửi'
       onClick={handleSubmit(() => {
        setIsOpen(false)
        handleClaimUser(itemId)
       })}
      />
     </div>
    </div>
   </Modal>
  </div>
 );
}

export default Approve;