import { useState } from "react";

const useInitialState = () => {
	const [state, setState] = useState(false)
	const [count, setCount] = useState(3)
	const [stateFormData, setStateFormData] = useState({})

	
	return (
			{
				count,
				setCount,
				state,
				setState,
				stateFormData,
				setStateFormData,
			}
		)
	}

	export default useInitialState