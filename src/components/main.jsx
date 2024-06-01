import { useState, useEffect } from 'react'
import { Form } from './form';
import { Modal } from './modal';

export function Main() {
	const [data, setData] = useState([]);
	const [text, setText] = useState(false)

	useEffect(() => {
		fetch('http://localhost:3800/api/getusers')
			.then(response => response.json())
			.then((data) => setData(data))

	}, [])

	function toggleBtn() {
		setText(!text)
	}

	return (
		<main>
			<h1 className='title'>Tecnopac CRUD</h1>
			<button className='btnNewUser' onClick={toggleBtn}>
				+ Add new user
			</button>
			{
				text ? (<Form />) : ''
			}
			<table>
				<tr>
					<th>NAME</th>
					<th>USER_ROLE</th>
					<th>STATUS</th>
					<th>SOCIAL_PROFILE</th>
					<th>PROMOTE</th>
					<th>RATING</th>
					<th>LAST_LOGIN</th>
					<th></th>
				</tr>
				{
					data?.map((item) => (
						<>

							<tr>
								<td key={item._id}>{item.name}</td>
								<td key={item._id}>{item.user_role}</td>
								<td key={item._id}>{item.status}</td>
								<td key={item._id}>{item.social_profile}</td>
								<td key={item._id}>{item.promote}</td>
								<td key={item._id}>{item.rating}</td>
								<td key={item._id}>{item.last_login}</td>
								<Modal nameUser={item.name} user_role={item.user_role} status={item.status} social_profile={item.social_profile} promote={item.promote} rating={item.rating} last_login={item.last_login} />
							</tr>

						</>
					))
				}
			</table>
		</main>

	)

}
