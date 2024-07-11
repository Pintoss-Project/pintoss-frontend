'use client';

import { Flex } from '@/shared/components/layout';
import * as s from './AdminStyle.css';
import { vars } from '@/shared/styles/theme.css';
import Spacing from '@/shared/components/layout/Spacing';
import { Input } from '@/shared/components/input';
import { DropImageBox } from '../../../public/svgs';
import Image from 'next/image';
import { useDropzone, Accept } from 'react-dropzone';
import { useState, useCallback } from 'react';
import { Button } from '@/shared/components/button';

interface FileWithPreview extends File {
	preview: string;
}

const AddProductBox = () => {
	const [files, setFiles] = useState<FileWithPreview[]>([]);
	const [isImageAdded, setIsImageAdded] = useState(false);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				}),
			),
		);
		setIsImageAdded(true);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: { 'image/*': [] } as Accept,
		onDrop,
	});

	const thumbs = files.map((file) => (
		<div
			key={file.name}
			style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
			<img
				src={file.preview}
				alt={file.name}
				style={{ width: '100px', height: '100px', objectFit: 'cover' }}
				onLoad={() => {
					URL.revokeObjectURL(file.preview);
				}}
			/>
		</div>
	));

	return (
		<div
			style={{
				width: '65%',
				height: '500px',
				padding: '18px 2.5%',
				backgroundColor: vars.color.white,
				border: `1px solid ${vars.color['lighter-gray']}`,
			}}>
			<div className={s.blackMediumText}>상품권 추가</div>
			<Spacing margin="23px" />
			<Flex>
				<div style={{ flex: 1, marginRight: '10px' }}>
					<Flex align="center">
						<div className={s.darkGraySmallText} style={{ flex: '1' }}>
							상품권명
						</div>
						<div
							style={{
								flex: '3',
								marginLeft: '1.5%',
								padding: '0 10px',
								borderBottom: `1px solid ${vars.color['lighter-gray']}`,
							}}>
							<Input className={s.baseInputStyle} />
						</div>
					</Flex>
					<Spacing margin="25px" />
					<Flex align="center">
						<div className={s.darkGraySmallText} style={{ flex: '1' }}>
							로고
						</div>
						<div
							{...getRootProps({ className: s.dropzone })}
							style={{ position: 'relative', flex: '3', marginLeft: '1.5%' }}>
							<input {...getInputProps()} />
							{!isImageAdded && (
								<Image src={DropImageBox} alt="이미지 등록 하기" className={s.dropImageBox} />
							)}
							{thumbs}
						</div>
					</Flex>
					<Spacing margin="25px" />
					<Flex align="center">
						<div className={s.darkGraySmallText} style={{ flex: '1' }}>
							홈페이지
						</div>
						<div
							style={{
								flex: '3',
								marginLeft: '1.5%',
								padding: '0 10px',
								borderBottom: `1px solid ${vars.color['lighter-gray']}`,
							}}>
							<Input className={s.baseInputStyle} />
						</div>
					</Flex>
					<Spacing margin="25px" />
					<Flex align="center">
						<div className={s.darkGraySmallText} style={{ flex: '1' }}>
							고객센터
						</div>
						<div
							style={{
								flex: '3',
								marginLeft: '1.5%',
								padding: '0 10px',
								borderBottom: `1px solid ${vars.color['lighter-gray']}`,
							}}>
							<Input className={s.baseInputStyle} />
						</div>
					</Flex>
					<Spacing margin="25px" />
					<Flex align="flex-start">
						<div
							className={s.darkGraySmallText}
							style={{ flex: '1', marginTop: '8px', textAlign: 'center' }}>
							상세설명
						</div>
						<div
							style={{
								flex: '3',
								marginLeft: '1.5%',
							}}>
							<textarea name="" className={s.customTextarea} />
						</div>
					</Flex>
					<Spacing margin="25px" />
				</div>
				<div style={{ flex: 1 }}>
					<Flex align="center">
						<div className={s.darkGraySmallText} style={{ flex: '1' }}>
							발행업체
						</div>
						<div
							style={{
								flex: '3',
								marginLeft: '1.5%',
								padding: '0 10px',
								borderBottom: `1px solid ${vars.color['lighter-gray']}`,
							}}>
							<Input className={s.baseInputStyle} />
						</div>
					</Flex>
					<Spacing margin="25px" />
					<Flex align="center">
						<div className={s.darkGraySmallText} style={{ flex: '1' }}>
							카테고리
						</div>
						<div style={{ flex: '3', marginLeft: '1.5%' }}>
							<div style={{ width: '100%' }}>
								<select className={s.customSelect}>
									<option value="">카테고리를 선택하세요</option>
									<option value="category1">카테고리1</option>
									<option value="category2">카테고리2</option>
								</select>
							</div>
						</div>
					</Flex>
					<Spacing margin="25px" />
					<Flex align="center">
						<div className={s.darkGraySmallText} style={{ flex: '1', minWidth: '50px' }}>
							판매금액
						</div>
						<Flex
							style={{
								flex: '3',
								marginLeft: '1.5%',
								alignItems: 'center',
								overflow: 'hidden',
							}}>
							<div
								style={{
									flex: '1',
									marginRight: '15px',
									borderBottom: `1px solid ${vars.color['lighter-gray']}`,
								}}>
								<Input
									placeholder="금액명"
									className={s.rateInputStyle}
									style={{ textAlign: 'left', width: '100%' }}
								/>
							</div>
							<div
								style={{
									flex: '1',
									marginRight: '15px',
									borderBottom: `1px solid ${vars.color['lighter-gray']}`,
								}}>
								<Input
									type="number"
									step="1000"
									placeholder="상품금액(원)"
									className={s.rateInputStyle}
									style={{ textAlign: 'left', width: '100%' }}
								/>
							</div>
							<Button
								color={vars.color.black}
								style={{
									minWidth: '40px',
									padding: '4px',
									backgroundColor: vars.color.white,
									border: `1px solid ${vars.color['lightest-gray']}`,
								}}>
								추가
							</Button>
						</Flex>
					</Flex>
					<Spacing margin="25px" />
				</div>
			</Flex>
		</div>
	);
};

export default AddProductBox;
