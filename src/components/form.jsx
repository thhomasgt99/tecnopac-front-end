import { useState, useEffect, useContext } from 'react'
import AppContext from '../context/AppContext'

export function Form({ nameUser, status, name, user_role = 'Administrador', social_profile = ['Facebook', 'GitHub'], rating = 5, last_login = 'June 2024' }) {
	const [stateUser, setStateUser] = useState(true)
	const [statePromote, setStatePromote] = useState(true)
	const { state, setState,stateFormData,setStateFormData} = useContext(AppContext)

	const [formData, setFormData] = useState({
		name: nameUser,
		user_role: user_role,
		status: stateUser,
		social_profile: social_profile,
		promote: statePromote,
		rating: rating,
		last_login: last_login,

	});

	const handleSubmitPost = (e) => {
		e.preventDefault();
		setState(false)

		fetch('http://localhost:3800/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData)
		})
			.then(response => response.json())
			.then((data) => {
				window.location.reload();
			})
	};

	const handleSubmitPut = (e) => {
		e.preventDefault();
		setState(true)

		fetch(`http://localhost:3800/api/register/${nameUser}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData)
		})
			.then(response => response.json())
			.then((data) => {
				window.location.reload();
			})
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
		setStateFormData(formData)
		console.log('handleChange:  ' + formData)
	};

	const handleChangeState = (e) => {
		setFormData({
			...formData,
			status: !stateUser
		});
		setStateUser(!stateUser)
		setStateFormData(formData)
		console.log('handleChangeState: ' + formData.status)
	};

	const handleChangePromote = (e) => {
		setFormData({
			...formData,
			promote: !formData.promote
		});
		setStatePromote(formData.promote)
		setStateFormData(formData)
		console.log('promote: ' + formData.promote)
	};

	

	if (state) {
		return (
			<>
				<form className="form formTwo" onSubmit={handleSubmitPut}>
					<label htmlFor="name">Name:</label>
					<input required type="text" name="name" value={formData.name} onChange={handleChange} />

					<label htmlFor="user_role">User_role:</label>
					<input required type="text" name="user_role" value={formData.user_role} onChange={handleChange} />

					<label htmlFor="status">Status: Active</label>
					{
						
						formData.status ? (

							<input type="checkbox" name="status" value={formData.status} onChange={handleChangeState} />
						) : (
							<input type="checkbox" checked name="status" value={formData.status} onChange={handleChangeState} />

						)
					}

					<label htmlFor="social_profile">Social_profile:</label>
					<input required type="text" name="social_profile" value={formData.social_profile} onChange={handleChange} />

					<label htmlFor="promote">Promote:</label>
					<input type="checkbox" name="promote" value={formData.promote} onChange={handleChangePromote} />

					<label htmlFor="rating">Rating:</label>
					<input required type="text" name="rating" value={formData.rating} onChange={handleChange} />

					<label htmlFor="last_login">Last_login:</label>
					<input required type="text" name="last_login" value={formData.last_login} onChange={handleChange} />

					{/* <label htmlFor="created_at">created_at:</label>
					<input required type="text" name="created_at" value={formData.created_at} onChange={handleChange} /> */}

					<button type="submit">Submit</button>
				</form>
			</>

		)
	} else {
		return (
			<>
				<form className="form formTwo" onSubmit={handleSubmitPost}>
					<label htmlFor="name">Name:</label>
					<input required type="text" name="name" value={formData.name} onChange={handleChange} />

					<label htmlFor="user_role">User_role:</label>
					<input required type="text" name="user_role" value={formData.user_role} onChange={handleChange} />

					<label htmlFor="status">Status: Active</label>
					{
						stateUser ? (
							<input type="checkbox" name="status" value={formData.status} onChange={handleChangeState} />

						) : (
							<input type="checkbox" checked name="status" value={formData.status} onChange={handleChangeState} />
						)
					}

					<label htmlFor="social_profile">Social_profile:</label>
					<input required type="text" name="social_profile" value={formData.social_profile} onChange={handleChange} />

					<label htmlFor="promote">Promote:</label>
					<input  type="checkbox" name="promote" value={formData.promote} onChange={handleChangePromote} />

					<label htmlFor="rating">Rating:</label>
					<input required type="text" name="rating" value={formData.rating} onChange={handleChange} />

					<label htmlFor="last_login">Last_login:</label>
					<input required type="text" name="last_login" value={formData.last_login} onChange={handleChange} />

					{/* <label htmlFor="created_at">created_at:</label>
					<input required type="text" name="created_at" value={formData.created_at} onChange={handleChange} /> */}

					<button type="submit">Submit</button>
				</form>
			</>

		)
	}


}
