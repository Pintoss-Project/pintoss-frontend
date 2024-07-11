import { useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import Spacing from '@/shared/components/layout/Spacing';
import DropImageBox from '../icons/DropImageBox';
import * as s from './AdminStyle.css';

interface Props {
	label1: string;
	label2: string;
	imageWidth: number;
	imageHeight: number;
}

interface FileWithPreview extends File {
	preview: string;
}

const BannerImageBox = ({ label1, label2, imageWidth, imageHeight }: Props) => {
	const [files1, setFiles1] = useState<FileWithPreview[]>([]);
	const [files2, setFiles2] = useState<FileWithPreview[]>([]);
	const [isImageAdded1, setIsImageAdded1] = useState(false);
	const [isImageAdded2, setIsImageAdded2] = useState(false);

	const onDrop1 = useCallback((acceptedFiles: File[]) => {
		setFiles1(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				}),
			),
		);
		setIsImageAdded1(true);
	}, []);

	const onDrop2 = useCallback((acceptedFiles: File[]) => {
		setFiles2(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				}),
			),
		);
		setIsImageAdded2(true);
	}, []);

	const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
		accept: { 'image/*': [] } as Accept,
		onDrop: onDrop1,
	});

	const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({
		accept: { 'image/*': [] } as Accept,
		onDrop: onDrop2,
	});

	const thumbs1 = files1.map((file) => (
		<div
			key={file.name}
			style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
			<img
				src={file.preview}
				alt={file.name}
				style={{ width: `${imageWidth}px`, height: `${imageHeight}px`, objectFit: 'cover' }}
				onLoad={() => {
					URL.revokeObjectURL(file.preview);
				}}
			/>
		</div>
	));

	const thumbs2 = files2.map((file) => (
		<div
			key={file.name}
			style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
			<img
				src={file.preview}
				alt={file.name}
				style={{ width: `${imageWidth}px`, height: `${imageHeight}px`, objectFit: 'cover' }}
				onLoad={() => {
					URL.revokeObjectURL(file.preview);
				}}
			/>
		</div>
	));

	return (
		<div>
			<div>
				<div className={s.darkGraySmallText} style={{ textAlign: 'left' }}>
					{label1}
				</div>
				<Spacing margin="10px" />
				<div
					{...getRootProps1({ className: s.dropzone })}
					style={{ position: 'relative', flex: '3', marginLeft: '1.5%' }}>
					<input {...getInputProps1()} />
					{!isImageAdded1 && <DropImageBox width={imageWidth} height={imageHeight} />}
					{thumbs1}
				</div>
			</div>
			<Spacing margin="20px" />
			<div>
				<div className={s.darkGraySmallText} style={{ textAlign: 'left' }}>
					{label2}
				</div>
				<Spacing margin="10px" />
				<div
					{...getRootProps2({ className: s.dropzone })}
					style={{ position: 'relative', flex: '3', marginLeft: '1.5%' }}>
					<input {...getInputProps2()} />
					{!isImageAdded2 && <DropImageBox width={imageWidth} height={imageHeight} />}
					{thumbs2}
				</div>
			</div>
		</div>
	);
};

export default BannerImageBox;
