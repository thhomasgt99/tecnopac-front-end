import { useState, useEffect } from 'react'
import { Form } from './form';
import { Modal } from './modal';
import { Image } from './image';
import { Btn } from './btn';


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

	function deleteAll(e) {
		e.preventDefault();

		fetch('http://localhost:3800/api/register', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then((data) => {
				setData(data)
				window.location.reload();
			})
	};


	useEffect(() => {
		const today = new Date();
		const formattedDate = today.toLocaleDateString('es-CO');
		const day = formattedDate.toString();
		setDate(day)
	}, [])


	return (
		<main>
			<h1 className='title'>Tecnopac CRUD</h1>
			<div className='butons-operation'>
				<button className='btnNewUser' onClick={toggleBtn}>
					+ Add new user
				</button>

				<button className="btnDeleteAll" onClick={deleteAll}>Delete all</button>
			</div>
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

							<tr key={item._id}>
								<td key={item._id}>
									<div>
										<Image />
										{item.name}
									</div>
								</td>
								<td key={item._id}>
									{
										item.user_role == 'Administrador' ? (
											<div className='divUser-viewer admin'>
												<i class="fa-solid fa-clipboard"></i>
												Administrator
											</div>
										) : item.user_role == 'Moderator' ? (
											<div className='divUser-viewer moderator'>
												<i class="fa-solid fa-user"></i>
												Moderator
											</div>
										) : (
											<div className='divUser-viewer viewer'>
												<i className="fa-solid fa-eye"></i>
												Viewer
											</div>
										)
									}
								</td>
								<td key={item._id}>
									{
										item.status ? (
											<div className='btnStatus'>
												<div className='red'></div>
												<span>Inactive</span>
											</div>

										) : (
											<div className='btnStatus'>
												<div className='green'></div>
												<span>Active</span>
											</div>
										)
									}
								</td>
								<td key={item._id}>
									<div className='socialImgs'>
										{
											item.social_profile.includes('Facebook') && (

												<i className="fa-brands fa-facebook"></i>
											)
										}
										{
											item.social_profile.includes('GitHub') && (
												<i className="fa-brands fa-github"></i>
											)
										}
										{
											item.social_profile.includes('Dribbble') && (
												<i className="fa-brands fa-dribbble"></i>
											)
										}
										{
											item.social_profile.includes('X') && (
												<i class="fa-brands fa-x-twitter"></i>
											)
										}
										{
											item.social_profile.includes('Google') && (
												<i className="fa-brands fa-google"></i>
											)
										}
									</div>
								</td>
								<td key={item._id}>
									{
										item.promote ? (
											<Btn promote={item.promote} />
										) : <Btn promote={item.promote} />
									}
								</td>
								<td key={item._id}>
									{
										item.rating >= 4.5 ? (
											<div>
												<i className="fa-sharp fa-solid fa-arrow-up"></i> {item.rating}
											</div>
										) : (
											<div>
												<i className="fa-sharp fa-solid fa-arrow-down"></i> {item.rating}
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
