import { useState } from "react";

const useInitialState = () => {
	const [state, setState] = useState(false)

	function arbi() {
		console.log('Texto de prueba')
	}
	return (
			{
				arbi,
				state,
				setState,
			}
		)
	}

	export default useInitialState