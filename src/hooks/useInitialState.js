import { useState } from "react";

const useInitialState = () => {
	const [state, setState] = useState(false)
	const [stateFormData, setStateFormData] = useState({})

	function arbi() {
		console.log('Texto de prueba')
	}
	return (
			{
				arbi,
				state,
				setState,
				stateFormData,
				setStateFormData,
			}
		)
	}

	export default useInitialState