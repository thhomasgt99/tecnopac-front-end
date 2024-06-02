import { useState, useEffect } from 'react'
import { Form } from './form';
import { Modal } from './modal';


export function Main() {
	const [data, setData] = useState([]);
	const [text, setText] = useState(false)
	const [date, setDate] = useState()

	useEffect(() => {
		fetch('http://localhost:3800/api/getusers')
			.then(response => response.json())
			.then((data) => setData(data))

	}, [])

	function toggleBtn() {
		setText(!text)
	}

	useEffect(() => {
		const today = new Date();
		const formattedDate = today.toLocaleDateString('es-CO');
		const day = formattedDate.toString();
		setDate(day)
	}, [])


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
								<td key={item._id}>
									{
										item.user_role == 'Aministrador' ? (
											<div className='divUser-viewer'>
												<i class="fa-solid fa-user"></i>
												Aministrator
											</div>
										) : (
											<div className='divUser-viewer'>
												<i class="fa-solid fa-eye"></i>
												Viewer
											</div>
										)
									}
								</td>
								<td key={item._id}>
									{
										item.status == 'Active' ? (
											<div className='btnStatus'>
												<div className='green'></div>
												<span>Active</span>
											</div>
										) : (
											<div className='btnStatus'>
												<div className='red'></div>
												<span>Inactive</span>
											</div>
										)
									}
								</td>
								<td key={item._id}>
									{
										item.social_profile ? (
											<div className='socialImgs'>
												<i class="fa-brands fa-facebook"></i>
												<i class="fa-brands fa-github"></i>
												<i class="fa-brands fa-dribbble"></i>
												<i class="fa-brands fa-twitter"></i>
												<i class="fa-brands fa-google"></i>
											</div>
										) : ''
									}
								</td>
								<td key={item._id}>
									{
										item.promote ? (
											<div class="toggle-component">
												<input type="checkbox" class="toggle-button" id="element-id-name" />
												<label for="element-id-name"></label>
											</div>
										) : ''
									}
								</td>
								<td key={item._id}>
									{
										item.rating >= 4.5 ? (
											<div>
												<i class="fa-sharp fa-solid fa-arrow-up"></i> {item.rating}
											</div>
										) : (
											<div>
												<i class="fa-sharp fa-solid fa-arrow-down"></i> {item.rating}
											</div>)
									}
								</td>
								<td key={item._id}>{date}</td>
								<Modal nameUser={item.name} user_role={item.user_role} status={item.status} social_profile={item.social_profile} promote={item.promote} rating={item.rating} last_login={date} />
							</tr>

						</>
					))
				}
			</table>
		</main>
	)
}
