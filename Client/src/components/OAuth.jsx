import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async ()=>{
        try{
            dispatch(signInStart());
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const res  = await fetch('/api/auth/google',{
              method:"POST",
              headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify({
                name:result.user.displayName,
                email:result.user.email,
                photoURL: result.user.photoURL
              })

           })
           const data = await res.json();
           console.log(data);
          if (data.success === false){
              dispatch(signInFailure(data.message));
              return ;
          }
          dispatch(signInSuccess(data));
          navigate('/');
        }   
        catch(err){
            console.log(err);
            dispatch(signInFailure(err.message));
        } 
    }
  return (
    <>
    <button onClick={handleGoogleClick} type='button' className='bg-red-500 p-3 rounded-lg text-slate-200 hover:opacity-90'>Sign In with Google</button>
    </>
  )
}

export default OAuth