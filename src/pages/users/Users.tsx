import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EnhancedTable from '../../components/UserTable';
import DataTable from '../../components/table'
import { UsersModel } from '../../features/users/userModel';
import { getAllUser } from '../../features/users/userSlice';

interface Props{
  userData: UsersModel[];
}

function Users() {

  const {id} = useParams();

  console.log("get param from user" + id);
  const dispatch = useDispatch();
  const { users, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.users
  );
  console.log(users);
  
  let userData : UsersModel[] = users as UsersModel[];

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
    // <DataTable data={userData} />
    <EnhancedTable data={users} />
  )
}

export default Users