import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload // Update all the workouts to new workouts
            }
        case 'CREATE_WORKOUTS':
            return {
                workouts: [action.payload, ...state.workouts] /// ... is taking the workouts state and spreading out the individual workouts to put the new workout at the top for the reverse just flip it
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT': {
            const updatedWorkout = action.payload;
            const updatedWorkouts = state.workouts.map(workout => {
                if (workout._id === updatedWorkout._id) {
                    // Swap the workout for the new one if the id's match
                    return updatedWorkout
                }

                // Return each workout
                return workout
            });

            // Return the map of updatedWorkouts
            return {
                workouts: updatedWorkouts
            }
        }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null //No workouts to begin with
    })

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}