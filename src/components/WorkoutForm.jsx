import {useState} from 'react'
import axios from 'axios';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const baseURL = import.meta.env.VITE_API_BASE_URL

const WorkoutForm = () => {
    // Dispatch for useContext
    const {dispatch} = useWorkoutsContext();
    // Import state variables:
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] =useState(null);
    // Image State
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // To prevent it from refreshing the page

        // Get user then set user_id = the user email
        const user = JSON.parse(localStorage.getItem('user'))
        const user_id = user.email
        // Set an object to send to the database as payload
        // const workout = {title, load, reps, user_id}

        const formData = new FormData();
        formData.append('title', title);
        formData.append('load', load);
        formData.append('reps', reps);
        formData.append('user_id', user_id);
        formData.append('image', image);

        // HTTP Request:
        try {
            // const response = await axios.post(`${baseURL}/api/workouts/`, workout, {
            //     headers : {
            //         'Content-Type': 'application/json'
            //     }
            // });
            const response = await axios.post(`${baseURL}/api/workouts/`, formData, {
                headers : {
                    // 'Content-Type': 'application/json' // Telling it to use and expect json data
                    'Content-Type': 'multipart/form-data'
                }
            });
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('New workout added', response.data);
            dispatch({type: 'CREATE_WORKOUTS', payload: response.data})
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add A New Workout</h3>

        <label>Exercise Title:</label>
        <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />

        <label>Load (in kg):</label>
        <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
        />

        <label>Reps:</label>
        <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
        />

        <label>Upload Image:</label>
        <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm
