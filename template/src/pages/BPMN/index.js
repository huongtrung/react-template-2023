import React, { useEffect, useRef, useState } from 'react';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material"
import './style.less';
import BpmnJS from 'bpmn-js/lib/Modeler';
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule
} from 'bpmn-js-properties-panel';
import magicPropertiesProviderModule from './provider/magic';
import magicModdleDescriptor from './descriptors/magic';

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
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { AuthActions } from "@/reduxSaga/Auth"
import { saveAs } from 'file-saver';
import { CustomButton } from '@/components';
import { useNavigate } from 'react-router-dom';
import Utilities from '@/utils/Util';
import { globalLoading } from '@/components/GlobalLoading';
import axios from 'axios';
import APIConfig from '@/constants/APIConfig';
import { globalModal } from '@/components/Modals/GlobalModal';
import { webLocalStorage } from '@/utils/storage';
import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'
import minimapModule from 'diagram-js-minimap';

const pages = ['Vẽ BPMN', 'Danh sách Task list'];
const settings = ['Trang cá nhân', 'Đăng xuất'];

const BPMN = () => {
  const containerRef = useRef(null);
  const propertiesPanelRef = useRef(null);
  const bpmnJSRef = useRef(null);
  const fileInputRef = useRef(null);
  const fileRef = useRef(null);
  const navigate = useNavigate()

  const { isSignedIn, role, userName } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
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
    try {
      bpmnJSRef.current = new BpmnJS({
        container: containerRef.current,
        propertiesPanel: {
          parent: propertiesPanelRef.current,
        },
        additionalModules: [
          BpmnPropertiesPanelModule,
          BpmnPropertiesProviderModule,
          magicPropertiesProviderModule,
          CamundaPlatformPropertiesProviderModule,
          minimapModule
        ],
        moddleExtensions: {
          magic: magicModdleDescriptor,
          camunda: CamundaBpmnModdle,
        }
      });
      return () => {
        bpmnJSRef.current?.destroy();
      };
    } catch (error) {
      console.log({error})
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const xml = e.target?.result;
        bpmnJSRef.current?.importXML(xml, (err) => {
          if (err) {
            console.error('Error importing BPMN diagram', err);
          } else {
            bpmnJSRef.current?.get('minimap').open();
            console.log('BPMN diagram imported successfully');

            const elementRegistry = bpmnJSRef.current?.get('elementRegistry')
            const modeling = bpmnJSRef.current?.get('modeling')

            var elementToColor = elementRegistry.get('Activity_1pssn0f');
            modeling.setColor([ elementToColor ], {
              stroke: 'green',
              fill: 'rgb(152, 203, 152)'
            });

            bpmnJSRef.current.get('canvas').addMarker('Activity_1pssn0f', 'highlight');
            highlightActiveTasks(['Activity_1pssn0f']);
          }
        });
      };
      reader.readAsText(file);
    }
  };

  const highlightActiveTasks = (activeTaskIds) => {
    const canvas = bpmnJSRef.current.get('canvas');
    canvas.addMarker('Activity_1pssn0f', 'highlight');
  };

  const handleSave = () => {
    // Assuming you have a reference to the BPMN modeler instance
    const bpmnModeler = bpmnJSRef.current;
    if (bpmnModeler) {
      bpmnModeler.saveXML({ format: true }, function (err, xml) {
        if (err) {
          console.error('Error saving BPMN file:', err);
        } else {
          const blob = new Blob([xml], { type: 'application/xml' });
          saveAs(blob, 'diagram.bpmn');
        }
      });
    } else {
      console.error('BPMN Modeler is not initialized');
    }
  };

  const handleOpenFileDialog = () => {
    fileInputRef.current.click();

  };

  const handleSelectFile = () => {
    fileRef.current.click();
  };

  const handleFileChoose = async (event) => {
    const file = event.target.files[0];
    if (file) {
      globalLoading.show()
      const bodyFormData = new FormData()
      bodyFormData.append('upload', file)
      console.log('Selected file:', bodyFormData);
      try {
        const response = await axios.post(APIConfig.API_URL + '/engine-rest/deployment/create', bodyFormData, {
          headers: {
            'Content-type': 'multipart/form-data',
          }
        })
        globalLoading.hide()
        const res = response?.data
        console.log('res = ', response)
        if (response?.status === 200 && response?.statusText === '') {
          const data = res?.deployedProcessDefinitions
          let keySave = ''
          Object.keys(data).forEach(function (k, index) {
            keySave = data[k]?.key
          });
          console.log('keySave', keySave)
          webLocalStorage.set('KEY', keySave)
          globalModal.open({ title: 'Upload file thành công', onCancel: '' })
        } else {
          globalModal.open({ title: 'Upload file không thành công', onCancel: '' })
        }
      } catch (error) {
        globalLoading.hide()
        console.log('err = ', error)
        globalModal.open({
          title: 'Lỗi hệ thống ! Hãy thử lại sau.',
          children: undefined
        })
      }
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <MenuItem onClick={handleCloseNavMenu}>
            <Typography variant="subtitle1" textAlign="center">{'BPMN Editor'}</Typography>
          </MenuItem>
          <MenuItem onClick={() => {
            navigate('/task-list')
            handleCloseNavMenu()
          }}>
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
      <div style={{ display: 'flex', height: '84vh' }}>
        <div style={{ flex: 1 }} ref={containerRef}></div>
        <div style={{ width: '300px', height: '85vh', overflow: 'auto' }} ref={propertiesPanelRef}></div>
      </div>
      <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
        <CustomButton
          variant="contained"
          title='Mở file'
          onClick={() => {
            handleOpenFileDialog()
          }}
        />
        <CustomButton
          variant="contained"
          sx={{ marginLeft: 20, marginRight: 20 }}
          title='Lưu file'
          onClick={() => {
            handleSave()
          }}
        />

        <CustomButton
          variant="contained"
          sx={{ marginRight: 20 }}
          title='Upload file'
          onClick={() => {
            handleSelectFile()
          }}
        />
      </div>
      <input
        type="file"
        ref={fileRef}
        style={{ display: 'none' }}
        accept=".bpmn"
        onChange={handleFileChoose}
      />
      <input type="file" accept=".bpmn, .xml" onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
      <style>
        {`
          .djs-activate {
            stroke: red !important;
            stroke-width: 2px !important;
          }import { *asR } from 'ramda';

          .highlight::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background-color: red;
            border-radius: 50%;
            transform: translate(-50%, -50%);
          }
        `}
      </style>
    </div>
  );
};

export default BPMN;