import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider;
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName: result.user.displayName, email: result.user.email, photo: result.user.photoURL })
            })

            const data = await res.json()
            if (data.Status === 0) {
                dispatch(signInFailure(data.Message))
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            dispatch(signInFailure(error.message))

        }
    }
    return (
        <button type='button' onClick={handleGoogleClick} className='bg-red-700 uppercase rounded-lg p-3 text-white hover:opacity-95'>Continue with google</button>
    )
}

export default OAuth
