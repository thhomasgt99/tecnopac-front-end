import { useState, useContext } from "react";
import AppContext from '../context/AppContext'

export function Btn({promote}) {
	const [state, setState]=useState(promote)
	const { stateFormData,setStateFormData} = useContext(AppContext)

	function handleToggleBtn(){
		setState(!state)
		
		console.log('aqui: ',  stateFormData)
	}

	return (
		<>
			{
				state ? (
					<label class="toggle">
				<input type="checkbox" onClick={handleToggleBtn}/>
				<span class="slider round"></span>
			</label>
				) : (
					<label class="toggle">
				<input type="checkbox" checked onClick={handleToggleBtn}/>
				<span class="slider round"></span>
			</label>
				)
			}
		</>
	)
}