import './ImageBox.scss';
import DeleteBtn from '../assets/images/delete.svg';
import PlusBtn from '../assets/images/plus.svg';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

export default function ImageBox({ numbering, getImage, postImg }) {
	const [imgFile, setImgFile] = useState('');
	const imgRef = useRef();

	useEffect(() => {
		setImgFile(postImg);
		// console.log('post', imgFile);
	}, [postImg]);

	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJkbGFjb2R1czA0MDdAa3lvbmdnaS5hYy5rciIsImlhdCI6MTY5MzUwMjE1NCwiZXhwIjoxNzAyMTQyMTU0LCJpc3MiOiJ1bml2ZXVzIn0.I2bppL98omYb4GxMXbooPiLg7XSzADwhBU1D5BPj-Jk';
	// 이미지 업로드 input의 onChange
	const saveImgFile = (e) => {
		console.log(e);
		const file = imgRef.current.files[0];
		// const reader = new FileReader();
		// reader.readAsDataURL(file);
		// reader.onloadend = () => {
		// 	setImgFile(reader.result);
		// };
		e.preventDefault();
		//FormData 객체선언
		const formData = new FormData();

		//File 추가
		//객체를 Json타입으로 파싱하여 Blob객체 생성, type에 json 타입 지정
		formData.append('image', file);
		// console.log(formData);
		axios({
			headers: {
				'x-access-token': jwtToken,
				'Content-Type': 'multipart/form-data',
			},
			method: 'post',
			url: 'https://univeus.site/post/image/upload',
			data: formData,
		}).then((res) => {
			console.log(res);
			setImgFile(JSON.stringify(res.data.result[0]['pic_url']).replace(/"/g, ''));
			// key:value 형태로 넘겨주기
			// console.log(typeof numbering);
			getImage(JSON.stringify({ [numbering]: res.data.result[0]['pic_url'].replace(/"/g, '') }));
			// console.log(JSON.stringify({ [numbering]: res.data.result[0]['pic_url'].replace(/"/g, '') }));
		});
	};
	return (
		<div className="ciu-img">
			{imgFile ? (
				<img
					className="ciu-img-delete"
					src={DeleteBtn}
					alt="이미지 삭제 버튼"
					onClick={() => {
						setImgFile('');
						getImage(JSON.stringify({ [numbering]: '' }));
					}}
				/>
			) : (
				<></>
			)}
			<label htmlFor={`ciu-img-upload${numbering}`}>
				<img
					className="ciu-img-file"
					src={imgFile ? imgFile : PlusBtn}
					alt={`이미지${numbering['numbering']}`}
					style={{ width: imgFile ? '72px' : '', height: imgFile ? '72px' : '' }}
				/>
			</label>
			<input
				type="file"
				accept="image/*"
				id={`ciu-img-upload${numbering}`}
				onChange={saveImgFile}
				ref={imgRef}
				style={{ display: 'none' }}
			/>
		</div>
	);
}
