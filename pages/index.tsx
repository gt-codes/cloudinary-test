import Script from 'next/script';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Home() {
	const [imagesUploadedList, setImagesUploadedList] = useState<string[]>([]);

	const showWidget = () => {
		let widget = (window as any).cloudinary.createUploadWidget(
			{
				cloudName: `heaustio`,
				uploadPreset: `event-cover`,
				multiple: false,
				cropping: true,
				croppingAspectRatio: 2,
				singleUploadAutoClose: false,
				croppingShowBackButton: false,
				// preBatch: (cb: (opts?: any) => void, data: any) => {
				// 	console.log({ file: data.files[0] });
				// 	cb();
				// 	if (data.files[0].name === 'TopSecret') {
				// 		cb({ cancel: true });
				// 	} else {
				// 		cb();
				// 	}
				// },
			},
			(error: Error, result: any) => {
				if (!error && result && result.event === 'success') {
					console.log({ result });
					setImagesUploadedList([...imagesUploadedList, result.info.secure_url]);
				}
			}
		);
		widget.open();
	};
	return (
		<>
			<Script src='https://widget.cloudinary.com/v2.0/global/all.js' />
			<button onClick={showWidget}>Upload Image</button>
			<div>
				{imagesUploadedList.map((image, idx) => (
					<Image
						key={idx}
						alt='uploaded event cover'
						style={{ objectFit: 'cover' }}
						src={image}
						width={100}
						height={100}
					/>
				))}
			</div>
		</>
	);
}
