import { useState, useEffect, useContext} from 'react'

export function Image(){
	const [image, setImage] = useState()

	useEffect(() => {
		fetch('https://randomfox.ca/floof')
			.then(response => response.json())
			.then((data) => setImage(data))
	}, [])


	return (
		<>
			{
				image ? (<img className='image-user' src={image.image}/>) : ''
			}
		</>
	)
}
