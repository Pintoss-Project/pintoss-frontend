import { useCallback, useEffect, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import Spacing from '@/shared/components/layout/Spacing';
import DropImageBox from '../icons/DropImageBox';
import * as s from './AdminStyle.css';
import { UseFormSetValue, Path, FieldValues, PathValue } from 'react-hook-form';

interface Props<T extends FieldValues> {
	label1: string;
	label2: string;
	imageWidth: number;
	imageHeight: number;
	name1: Path<T>;
	name2: Path<T>;
	setValue: UseFormSetValue<T>;
	onImageUpload: (file: File, imageType: 'desktop' | 'mobile') => Promise<string>;
	onImageDelete?: (imageType: 'desktop' | 'mobile') => void;
	isImageAdded1: boolean;
	isImageAdded2: boolean;
	setIsImageAdded1: React.Dispatch<React.SetStateAction<boolean>>;
	setIsImageAdded2: React.Dispatch<React.SetStateAction<boolean>>;
	initialImageUrls: {
		desktopImageUrl?: string | null | undefined;
		mobileImageUrl?: string | null | undefined;
		topImageUrl?: string | null | undefined;
		bottomImageUrl?: string | null | undefined;
	};
	resetTrigger: boolean;
}

interface FileWithPreview extends File {
	preview: string;
}

function BannerImageBox<T extends FieldValues>({
	label1,
	label2,
	imageWidth,
	imageHeight,
	name1,
	name2,
	setValue,
	onImageUpload,
	isImageAdded1,
	isImageAdded2,
	setIsImageAdded1,
	setIsImageAdded2,
	initialImageUrls,
	resetTrigger,
}: Props<T>) {
	const [files1, setFiles1] = useState<FileWithPreview[]>([]);
	const [files2, setFiles2] = useState<FileWithPreview[]>([]);

	useEffect(() => {
		if (initialImageUrls?.desktopImageUrl || initialImageUrls?.topImageUrl) {
			const previewUrl = initialImageUrls.desktopImageUrl || initialImageUrls.topImageUrl;
			setFiles1([{ preview: previewUrl } as FileWithPreview]);
			setIsImageAdded1(true);
		} else {
			setFiles1([]);
			setIsImageAdded1(false);
		}

		if (initialImageUrls?.mobileImageUrl || initialImageUrls?.bottomImageUrl) {
			const previewUrl = initialImageUrls.mobileImageUrl || initialImageUrls.bottomImageUrl;
			setFiles2([{ preview: previewUrl } as FileWithPreview]);
			setIsImageAdded2(true);
		} else {
			setFiles2([]);
			setIsImageAdded2(false);
		}
	}, [initialImageUrls, setIsImageAdded1, setIsImageAdded2, resetTrigger]);

	const handleDrop = async (
		acceptedFiles: File[],
		setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>,
		setIsImageAdded: React.Dispatch<React.SetStateAction<boolean>>,
		name: Path<T>,
		imageType: 'desktop' | 'mobile',
	) => {
		const file = acceptedFiles[0];
		if (file) {
			const preview = URL.createObjectURL(file);
			setFiles([{ ...file, preview }]);
			setIsImageAdded(true);
			try {
				const imageUrl = await onImageUpload(file, imageType);
				setValue(name, imageUrl as PathValue<T, Path<T>>, { shouldValidate: true });
			} catch (error) {
				console.error('Image upload failed', error);
			}
		}
	};

	const onDrop1 = useCallback(
		(acceptedFiles: File[]) =>
			handleDrop(acceptedFiles, setFiles1, setIsImageAdded1, name1, 'desktop'),
		[setFiles1, setIsImageAdded1, name1, onImageUpload, setValue],
	);

	const onDrop2 = useCallback(
		(acceptedFiles: File[]) =>
			handleDrop(acceptedFiles, setFiles2, setIsImageAdded2, name2, 'mobile'),
		[setFiles2, setIsImageAdded2, name2, onImageUpload, setValue],
	);

	const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
		accept: { 'image/*': [] } as Accept,
		onDrop: onDrop1,
	});

	const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({
		accept: { 'image/*': [] } as Accept,
		onDrop: onDrop2,
	});

	const renderThumbs = (files: FileWithPreview[]) =>
		files.map((file) => (
			<div
				key={file.preview}
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
					{renderThumbs(files1)}
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
					{renderThumbs(files2)}
				</div>
			</div>
		</div>
	);
}

export default BannerImageBox;
