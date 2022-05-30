import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

function getFormattedDate(int) {

    let date = new Date(int);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    let hours = date.getHours();
    hours = hours >= 10 ? hours : "0" + hours;
    let minutes = date.getMinutes();
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    return day + "/" + month + "/" + year + ' ' + hours + ':' + minutes;
}

const showStatus = (status) => {
    if (status === '1') return <Typography variant="caption" display="inline" color="green">
        Mới
    </Typography>
    if (status === '0') return <Typography variant="caption" display="inline" color="yellow">
        Phân tích
    </Typography>
    else return <Typography variant="caption" display="inline" color="blue">
        Hoàn thành
    </Typography>
}

const Report = (props) => {
    return (
        <Paper
            sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
        >
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <Typography variant="h6" paddingBottom='0px' marginRight='6px' >
                            {props.reportNo !== undefined && props.reportNo}
                        </Typography>
                        <Typography variant="caption" display="inline" fontStyle='italic' padding='0px'>
                            {props.reportTime !== undefined && getFormattedDate(props.reportTime)}
                        </Typography>
                    </Box>
                    {showStatus(props.status)}
                </Box>
                <Box>
                    <IconButton color="inherit">
                        <MoreVertIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box>
                <Typography variant="caption" display="inline" color='#777'>
                    {props.reportType === '0' ? 'Tự nguyện' : 'Bắt buộc'} | Trang thiết bị/cơ sở hạ tầng
                </Typography>
            </Box>
            <Box>
                <Typography variant="body2">
                    {props.reporterName !== undefined && props.reporterName}
                </Typography>
                <Typography variant="body2">
                    {props.detailDescription !== undefined && props.detailDescription}
                </Typography>
            </Box>
        </Paper>
    )
}

export default Report;