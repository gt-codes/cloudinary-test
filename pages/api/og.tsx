import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
	runtime: 'experimental-edge',
};

export default function handler(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const src = searchParams.get('src');
	console.log({ src });

	return new ImageResponse(
		(
			<div tw='bg-red-500 w-full h-full flex justify-center items-center'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				{src && <img tw='absolute h-full w-full' alt='og ' src={src} />}
				<h1 tw='text-center text-5xl font-bold'>My OG Image</h1>
			</div>
		),
		{
			width: 1200,
			height: 600,
		}
	);
}
