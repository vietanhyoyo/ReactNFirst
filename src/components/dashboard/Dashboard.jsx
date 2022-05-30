import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Report from './reports/Report'
import { mainListItems } from './listItems';
import Masonry from '@mui/lab/Masonry';
import './dashboard.css';
import { connect } from 'react-redux';

function dateToString(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return year + "-" + month + "-" + day;
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                MaySoft
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme({
    palette: {
        primary: {
            main: '#0A8E9D'
        }
    }
});

function Dashboard(props) {
    //Đóng mở drawer
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    //Dữ liệu được hiển thị
    const [displayData, setDisplayData] = React.useState({
        data: props.dataAPI
    })
    //filter
    const [filter, setFilter] = React.useState({
        startDate: new Date(1970, 0, 18, 0, 0, 0),
        endDate: new Date(1970, 0, 25, 0, 0, 0),
        status: 3,
        type: 2
    })

    const getWidth = () => {
        if (window.innerWidth < 700) return 1;
        if (window.innerWidth < 1000) return 2;
        else return 3;
    }


    React.useEffect(() => {
        let datafilter = {
            data: props.dataAPI
        }
        if (filter.startDate !== undefined) {
            let start = filter.startDate;
            start.setHours(0)
            datafilter.data = datafilter.data.filter(ele => {
                return ele.reportTime >= start.getTime();
            })
        }
        if (filter.endDate !== undefined) {
            let end = filter.endDate;
            end.setHours(23, 59);
            datafilter.data = datafilter.data.filter(ele => {
                return ele.reportTime <= end.getTime();
            })
        }
        if (filter.status !== 3) {
            let status = filter.status;
            datafilter.data = datafilter.data.filter(ele => {
                return Number(ele.status) === status;
            })
        }
        if (filter.type !== 2) {
            let type = filter.type;
            datafilter.data = datafilter.data.filter(ele => {
                return Number(ele.reportType) === type;
            })
        }
        setDisplayData(datafilter);
    }, [filter, props.dataAPI])

    React.useEffect(() => {
        fetch('https://qlsc.maysoft.io/server/api/getAllReports', {
            method: "POST",
            body: JSON.stringify({
                page: "1"
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Bearer ' + localStorage.getItem('qlscToken'),
            }
        })
            .then(response => response.json())
            .then(json => {
                //Cập nhật lại Redux
                props.updateData(json.data.data);
            })
            .catch(err => console.log(err));

    }, [props.token])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Danh mục
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Avatar sx={{
                            marginLeft: '14px'
                        }}>H</Avatar>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ marginBottom: '18px' }}>
                                        <Typography color='primary' >Danh sách các báo cáo</Typography>
                                    </Box>
                                    <Box>
                                        <FormControl sx={{ paddingRight: '10px' }} >
                                            <label
                                                htmlFor='start-date'
                                                className='fake-mui-label'
                                                style={{
                                                    backgroundColor: '#fff',
                                                    fontSize: '12px',
                                                    color: '#777',
                                                    padding: '4px',
                                                    top: -13,
                                                    left: 8
                                                }}
                                            >Ngày bắt đầu</label>
                                            <input
                                                type='date'
                                                value={dateToString(filter.startDate)}
                                                style={{
                                                    userSelect: 'none',
                                                    padding: '16.5px 14px',
                                                    borderWidth: '1.5px',
                                                    borderColor: '#bbb',
                                                    boxShadow: 'none',
                                                    borderRadius: '4px',
                                                    fontSize: '15px',
                                                    fontWeight: '100',
                                                    borderStyle: 'solid',
                                                    marginBottom: '20px'
                                                }}
                                                name='start-date'
                                                onChange={event => {
                                                    setFilter(prev =>
                                                    (
                                                        {
                                                            ...prev, startDate: new Date(event.target.value)
                                                        }
                                                    )
                                                    )
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ paddingRight: '10px' }} >
                                            <label
                                                htmlFor='end-date'
                                                className='fake-mui-label'
                                                style={{
                                                    backgroundColor: '#fff',
                                                    fontSize: '12px',
                                                    color: '#777',
                                                    padding: '4px',
                                                    top: -13,
                                                    left: 8
                                                }}
                                            >Ngày kết thúc</label>
                                            <input
                                                type='date'
                                                value={dateToString(filter.endDate)}
                                                style={{
                                                    userSelect: 'none',
                                                    padding: '16.5px 14px',
                                                    borderWidth: '1.5px',
                                                    borderColor: '#bbb',
                                                    boxShadow: 'none',
                                                    borderRadius: '4px',
                                                    fontSize: '15px',
                                                    fontWeight: '100',
                                                    borderStyle: 'solid',
                                                    marginBottom: '20px'
                                                }}
                                                name='end-date'
                                                onChange={event => {
                                                    setFilter(prev =>
                                                    (
                                                        {
                                                            ...prev, endDate: new Date(event.target.value)
                                                        }
                                                    )
                                                    )
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ paddingRight: '10px' ,  marginBottom: '20px' }} >
                                            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={filter.status}
                                                label="Trạng thái"
                                                marginBottom= '20px'
                                                onChange={event => {

                                                    setFilter(prev => (
                                                        { ...prev, status: event.target.value }))
                                                }
                                                }
                                                sx={{ width: 200 }}
                                            >
                                                <MenuItem value={3}>Tất cả</MenuItem>
                                                <MenuItem value={0}>Phân tích</MenuItem>
                                                <MenuItem value={1}>Mới</MenuItem>
                                                <MenuItem value={2}>Hoàn thành</MenuItem>
                                            </Select>
                                        </FormControl >
                                        <FormControl sx={{ paddingRight: '10px', marginBottom: '20px' }} >
                                            <InputLabel id="demo-simple-select-label">Loại</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={filter.type}
                                                label="Loại"
                                                onChange={event => {

                                                    setFilter(prev => (
                                                        { ...prev, type: event.target.value }))
                                                }
                                                }
                                                sx={{ width: 200 }}
                                            >
                                                <MenuItem value={2}>Tất cả</MenuItem>
                                                <MenuItem value={0}>Tự nguyện</MenuItem>
                                                <MenuItem value={1}>Bắc buộc</MenuItem>
                                            </Select>
                                        </FormControl >
                                    </Box>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sx={{ marginRight: '-20px' }}>
                                <Box sx={{ width: '100%', minHeight: 393 }}>
                                    <Masonry columns={getWidth()} spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {displayData.data.map((ele, index) => {
                                            console.log(ele.reportType)
                                            return <Report
                                                key={index}
                                                reporterName={ele.reporterName}
                                                reportNo={ele.reportNo}
                                                detailDescription={ele.detailDescription}
                                                reportTime={ele.reportTime}
                                                incidentObject={ele.incidentObject}
                                                status={ele.status}
                                                reportType={ele.reportType}
                                            />
                                        })}
                                    </Masonry>
                                </Box>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

//Lấy state của redux
const mapStateToProps = (state) => {
    return {
        dataAPI: state.data,
        qlscToken: state.token
    }
}
//Tạo action để gọi đến redux
const mapDispatchToProps = (dispatch) => {
    return {
        updateData: (input) => dispatch({ type: 'UPDATE_DATA', payload: input })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);