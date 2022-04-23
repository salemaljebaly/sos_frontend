import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DataTable from '../../components/table'
import { UsersModel } from '../../features/auth/userModel';
import { getAllUser } from '../../features/auth/userSlice';

interface Props{
  userData: UsersModel[];
}

function Users() {

  const {id} = useParams();

  console.log("get param from user" + id);
  const dispatch = useDispatch();
  const { user, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.user
  );
  console.log(user[0]);
  
  let userData : UsersModel[] = user as UsersModel[];

  useEffect(() => {
    dispatch(getAllUser());
    
    try{
    userData.map((elements : UsersModel) => {
      // elements.isActive ? 'مفعل' : 'غير مفعل';
      // console.log(elements.isActive ? 'مفعل' : 'غير مفعل');
      console.log(elements);

    });
  }
    catch {
      console.log('cbhjhbvnnjkljhgvcbfghvjkh.gjfdxhfjhfjg');
      
      console.log(userData);
      
    } 

  }, [])
  return (
    // TODO fix object to array 
    <DataTable data={userData} />
  )
}

export default Users