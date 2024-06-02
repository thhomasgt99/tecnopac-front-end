import { useState, useEffect, useContext} from 'react'
import { Form } from './form'
import AppContext from '../context/AppContext'

export function Modal({ nameUser, name, user_role, status, social_profile, promote, rating, last_login }) {
	const [text, setText] = useState(false)
	const [textEdit, setTextEdit] = useState(false)
	const [data, setData] = useState()
	const { state, setState } = useContext(AppContext)

	console.log(state)

	function toggleBtn() {
		setText(!text)
	}
	function toggleBtnEdit() {
		setTextEdit(!textEdit)
		console.log('hola desde el toggle')
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const url = `http://localhost:3800/api/register/${nameUser}`;

		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				setData(data);
				console.log('Este es el mensaje:', data)
				window.location.reload();
			})
			.catch(error => {
				console.error('Problema con el fetch:', error);
			});
	};

	return (
		<div className='formModal'>
			<ul>
				<button className='icon'><i className="fa-solid fa-ellipsis" onClick={toggleBtn}></i></button>
				{
					text ? (
						<div className='formModal-container'>
							<li><button className='formModalBtn formModalBtn-delete' onClick={handleSubmit}>Eliminar usuario</button></li>
							<li>
								<button className='formModalBtn formModalBtn-Edit' onClick={()=>{
									setState(true)
									toggleBtnEdit()
									console.log('hola desde el modal')
								}}>
									Editar usuario
								</button>
								{
									textEdit ? (
										<Form nameUser={nameUser} user_role={user_role} status={status} social_profile={social_profile} promote={promote} rating={rating} last_login={last_login}/>
									) : ''
								}
							</li>
						</div>
					) : ''
				}
			</ul>
		</div>
	)

}
