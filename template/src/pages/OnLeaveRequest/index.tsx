import React, { useEffect } from "react"
import FormInput from "@/components/FormInput"
import {
 Box,
 Button,
 Card,
 CardActions,
 CardContent,
 CardHeader,
} from "@mui/material"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FORM_FIELD_NAME } from "./fieldname"
import { testSchema } from "./validate"
import { typeInputComponent } from "@/components/FormInput/helper"
import { CanView, CustomButton } from "@/components"
import { isEmpty, T } from "ramda"
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
import Utilities from "@/utils/Util"
import { TestActions } from "@/reduxSaga/TestRedux"
import { webLocalStorage } from "@/utils/storage"

const pages = ['Xin nghỉ phép'];
const settings = ['Trang cá nhân', 'Đăng xuất'];

const OFF_METHOD = [
 { value: "ON_LEAVE", label: "Nghỉ phép" },
 { value: "OFF", label: "Thôi việc" },
]

const TestForm = () => {
 const methods = useForm({
  mode: "onSubmit",
  resolver: yupResolver(testSchema),
 })

 const {
  control,
  getValues,
  watch,
  setValue,
  handleSubmit,
  formState: { errors },
 } = methods
 const { isSignedIn, role, userName } = useAppSelector(state => state.auth)
 const { id } = useAppSelector(state => state.test)

 const dispatch = useAppDispatch()

 useEffect(() => {
  const key = webLocalStorage.get('KEY')
  console.log('key', key)
  dispatch(TestActions.startProcessRequest(key))
 }, [])

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

 const onSubmit = () => {
  const method = getValues(FORM_FIELD_NAME.OFF_METHOD)
  const dayOff = getValues(FORM_FIELD_NAME.DAY_OFF)
  let value = 0
  if (method == 'OFF') {
   value = 31
  } else {
   value = parseInt(dayOff)
  }
  const data = {
   "variables": {
    "dayOff": {
     "value": value
    }
   }
  }
  dispatch(TestActions.completeRequest({ id, data }))
 }

 const onError = () => {
  console.log({ errors })
 }
 return (
  <>
   <AppBar position="static">
    <Container maxWidth="xl">
     <Toolbar disableGutters>
      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
       variant="h6"
       noWrap
       component="a"
       href="#app-bar-with-responsive-menu"
       sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
       }}
      >
       LOGO
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
       <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
       >
        <MenuIcon />
       </IconButton>
       <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
         vertical: 'top',
         horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={() => setAnchorElUser(null)}
        sx={{
         display: { xs: 'block', md: 'none' },
        }}
       >
        {pages.map((page) => (
         <MenuItem key={page} onClick={handleCloseNavMenu}>
          <Typography variant="subtitle1" textAlign="center">{page}</Typography>
         </MenuItem>
        ))}
       </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
       {pages.map((page) => (
        <Typography
         key={page}
         onClick={() => { }}
         sx={{ my: 2, color: 'white', display: 'block', marginLeft: 2, marginRight: 2 }}
        >
         {page}
        </Typography>
       ))}
      </Box>

      <Box sx={{ flexGrow: 0 }}>
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
    </Container>
   </AppBar>
   <Box>
    <Card
     sx={{
      p: 5,
      m: 5,
      minHeight: '80vh',
     }}
    >
     <CardHeader title='Đơn xin nghỉ phép' />
     <CardContent sx={{
      width: '50%',
     }}>
      <FormInput
       disabled
       label='Tên người xin nghỉ'
       placeholder='Nhập tên người xin nghỉ'
       control={control}
       defaultValue="Nguyễn Trung Kiên"
       name={FORM_FIELD_NAME.NAME}
       type={typeInputComponent.InputText}
      />
      <FormInput
       label='Hình thức nghỉ'
       placeholder='Chọn hình thức nghỉ'
       control={control}
       name={FORM_FIELD_NAME.OFF_METHOD}
       options={OFF_METHOD}
       type={typeInputComponent.InputSelect}
       errorMessage={errors[FORM_FIELD_NAME.OFF_METHOD]?.message}
      />
      <CanView condition={watch(FORM_FIELD_NAME.OFF_METHOD) === 'ON_LEAVE'}>
       <FormInput
        label='Ngày bắt đầu nghỉ'
        control={control}
        name={FORM_FIELD_NAME.DAY_START}
        type={typeInputComponent.InputDate}
        inputType={'number'}
       />
       <FormInput
        label='Số ngày nghỉ'
        placeholder='Số ngày nghỉ'
        control={control}
        name={FORM_FIELD_NAME.DAY_OFF}
        type={typeInputComponent.InputText}
        inputType={'number'}
       />
      </CanView>
      <FormInput
       required
       label='Lý do nghỉ'
       placeholder='Nhập lý do nghỉ'
       control={control}
       name={FORM_FIELD_NAME.REASON}
       type={typeInputComponent.InputText}
      />
     </CardContent>
     <CardActions>
      <CustomButton
       variant="contained"
       sx={{ width: '49%' }}
       title='Gửi'
       onClick={() => {
        handleSubmit(onSubmit, onError)()
       }}
      />
     </CardActions>
    </Card>
   </Box>
  </>
 )
}

export default TestForm
