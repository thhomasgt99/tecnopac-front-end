import { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { Form } from './form';
import { Modal } from './modal';
import { Image } from './image';
import { Btn } from './btn';
// import Paginate from './paginate';
import AppContext from '../context/AppContext'




export function Main() {
	const [select, setSelect] = useState(0);
	const [data, setData] = useState([]);
	const [filter, setFilter] = useState(0);
	const [text, setText] = useState(false)
	const [date, setDate] = useState()
	const [savedList, setSavedList] = useState([])
	const [num, setNum] = useState(0)
	const { count, setCount } = useContext(AppContext)

	useEffect(() => {
		async function e() {
			const arbi = await fetch('http://localhost:3800/api/getusers')
				.then(response => response.json())
				.then((data) => setData(data))
		}
		// return arbi
		e()
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

	useEffect(() => {
		if (data != []) {
			let arbi = data.slice(select, count)
			setSavedList(arbi)
			console.log(savedList)
		}
	}, [data, count])


	function after() {
		let	 arbi = select + Number(num)
		console.log('arvi: 	',arbi)
		setSelect(arbi)
		console.log('soy select: ' , select)
		setSavedList(data.slice(select , count))
		setCount((count*2))
		console.log('after: ', count)
	}

	function back() {
		// setSelect(select - (count))
		// setBackData(afterData / count)
		setSavedList(data.slice(select, afterData * count))
		console.log('back: ', count)

	}

	function getValue() {
    var selectElement = document.getElementById("paginate");
    var selectedValue = selectElement.value;
		console.log('yo: ', selectedValue)
		setCount(selectedValue)
		setNum(selectedValue)
		setFilter(2)
	}

	useEffect(()=>{
		getValue()
	},[filter])

	if (true) {
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
						<th>{filter}</th>
						<th></th>
					</tr>

					{
						savedList.map((item) => (
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
				{
					// data.length != 0 && (
					(
						<div className='paginate-container'>
							<div className='paginate-per-page'>
								<h3>Rows per page</h3>

								<select name="paginate" id="paginate" onChange={getValue} >
									<option value="3">3</option>
									<option value="5">5</option>
									<option value="10">10</option>
								</select>

								<div>
									<strong>1-10</strong>
									of
									<strong>
										{
											data.length
										}
									</strong>
								</div>

							</div>

							<div className='paginate-numeric'>
								<span onClick={back}><i class="fa-solid fa-arrow-left"></i></span>
								<div>1</div>
								<div>2</div>
								<div>3</div>
								<div>...</div>
								<div>100</div>
								<span onClick={after}><i class="fa-solid fa-arrow-right"></i></span>
							</div>
						</div>
						// <Paginate length={data.length} after={after} back={back} />
					)
				}

			</main>
		)
	}

}
