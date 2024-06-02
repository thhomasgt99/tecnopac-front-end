import { useState, useEffect } from 'react'

export function Form({ nameUser, name, user_role = 'Aministrador', status = 'Active', social_profile = ['Facebook', 'GitHub'], promote = true, rating = 5, last_login = 'June 2024'}) {
	const [data, setData] = useState()
	const [formData, setFormData] = useState({
		name: nameUser,
		user_role: user_role,
		status: status,
		social_profile: social_profile,
		promote: promote,
		rating: rating,
		last_login: last_login,

	});

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch('http://localhost:3800/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData)
		})
			.then(response => response.json())
			.then((data) => {
				setData(data)
				window.location.reload();
			})
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,

		});
	};

	return (
		<>
			<form className="form formTwo" onSubmit={handleSubmit}>
				<label htmlFor="name">Name:</label>
				<input required type="text" name="name" value={formData.name} onChange={handleChange} />

				<label htmlFor="user_role">User_role:</label>
				<input required type="text" name="user_role" value={formData.user_role} onChange={handleChange} />

				<label htmlFor="status">Escribe: Active</label>
				<input required type="text" name="status" value={formData.status} onChange={handleChange} />

				<label htmlFor="social_profile">Social_profile:</label>
				<input required type="text" name="social_profile" value={formData.social_profile} onChange={handleChange} />

				<label htmlFor="promote">Promote:</label>
				<input required type="text" name="promote" value={formData.promote} onChange={handleChange} />

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
