import React ,{useEffect , useState} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import {useSelector,useDispatch} from 'react-redux'
//import { deleteUser, loadUsers } from '../Redux/Actions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { Update } from '@material-ui/icons';
import {useNavigate} from 'react-router-dom';
import firebasedb from './Firebase'
import { toast } from 'react-toastify';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }
  
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

// const useStyles=styled({
//     table:{
//         marginTop:200,
//         minWidth:900,
//     },
// });
// const classes = useStyles();
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    //marginRight:theme.spacing(2)
  },
}));


const Home = () => {
  const classes = useStyles();
  //const dispatchh = useDispatch();
  //const {users} = useSelector((state) => state.dataReducer);  //reducer
  const navigate = useNavigate();
  const [dataa, setdataa] = useState({})

useEffect(() => {
   firebasedb.child("Contacts").on("value",(snapshot)=>{
     if(snapshot.val() !== null){
      setdataa({...snapshot.val()})
     }else{
       setdataa({})
     }
   })
   return()=>{
    setdataa({})
  }
},[]);



// useEffect(() => {
//   dispatchh(loadUsers())   //action
// },[])

const handleDelete=(id)=>{
  if(window.confirm("Are you want to delete this")){
     firebasedb.child(`Contacts/${id}`).remove((err)=>{
       if(err){
        toast.error(err)
       }else{
        toast.success("Contact deleted successfully")
    }})}}


    return (
        <div  >
        
        <div style={{marginTop:"10px"  , textAlign:"center"}}  >
        <Button variant="contained" color="primary"  onClick={()=>navigate("/addUser")} >Add User Data</Button>
        </div>
       
           <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 , marginTop :5 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center"   >Address</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {Object.keys(dataa).map((idd,index) => (
              <StyledTableRow key={idd}>
                <StyledTableCell component="th" scope="row"> {index + 1}</StyledTableCell>
                <StyledTableCell align="center">{dataa[idd].name}</StyledTableCell>
                <StyledTableCell align="center">{dataa[idd].email}</StyledTableCell>
                <StyledTableCell align="center">{dataa[idd].contact}</StyledTableCell>
                <StyledTableCell align="center">{dataa[idd].address}</StyledTableCell>
                <StyledTableCell align="center">
                <div className={classes.button}>
                <Button variant="contained" style={{marginRight:"3px"}}  color="secondary"  startIcon={<DeleteIcon />} onClick={()=>handleDelete(idd)} >
                Delete</Button>
                <Button variant="contained" style={{marginRight:"3px"}} color="primary"  startIcon={<Update />} onClick={()=>navigate(`/editUser/${idd}`)} >
                Update</Button>
                <Button variant="outlined" color="primary" onClick={()=>navigate(`/viewUser/${idd}`)} > View</Button>
                </div>
                </StyledTableCell>
              </StyledTableRow>
            ))} 
            </TableBody>
      </Table>
    </TableContainer>
        </div> 
    )
}

export default Home

