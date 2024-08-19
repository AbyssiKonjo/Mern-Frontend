import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    // Checking if we are inside the WWorkoutContextProvider
    if (!context) {
        throw Error ('useWorkoutContext hook must be used inside of WorkoutContextProvider')
    }

    return context
}