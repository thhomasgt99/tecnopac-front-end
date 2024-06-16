// import {useEffect, useState, useContext} from 'react'
// import AppContext from '../context/AppContext'


// function Paginate({length, after, back}) {
// 	const { count, setCount  } = useContext(AppContext)

// 	function getValue() {
//     var selectElement = document.getElementById("paginate");
//     var selectedValue = selectElement.value;
// 		console.log('yo: ', selectedValue)
// 		setCount(selectedValue)
// 	}

// 	useEffect(()=>{
// 		getValue()
// 	},[])

// 	return (
// 		<div className='paginate-container'>
// 			<div className='paginate-per-page'>
// 				<h3>Rows per page</h3>

// 				<select name="paginate" id="paginate" onChange={getValue} >
// 					<option value="3">3</option>
// 					<option value="5">5</option>
// 					<option value="10">10</option>
// 				</select>

// 				<div>
// 					<strong>1-10</strong>
// 					of
// 					<strong>
// 						{
// 							length
// 						}
// 					</strong>
// 				</div>

// 			</div>

// 			<div className='paginate-numeric'>
// 				<span onClick={back}><i class="fa-solid fa-arrow-left"></i></span>
// 					<div>1</div>
// 					<div>2</div>
// 					<div>3</div>
// 					<div>...</div>
// 					<div>100</div>
// 				<span onClick={after}><i class="fa-solid fa-arrow-right"></i></span>
// 			</div>
// 		</div>
// 	)
// }

// export default Paginate