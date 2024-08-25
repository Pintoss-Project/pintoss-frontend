'use client';

import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as s from './AdminStyle.css';
import * as cs from '@/shared/styles/common.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BoardInfoFormData } from '@/utils/validation/board';
import { postBoard } from '@/app/api/board/postBoard';
import { useSearchParams } from 'next/navigation';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import BoardError from '@/utils/error/BoardError';
import { uploadImageToCloudinary } from '@/app/api/image/uploadImageToCloudinary';
import { updateBoard } from '@/app/api/board/updateBoard';
import { deleteImageFromBackend } from '@/app/api/board/deleteBoard';
import { deleteImageFromCloudinary } from '@/app/api/image/deleteImageFromCloudinary';

interface UploadedImage {
	id: string;
	url: string;
	savedToBackend?: boolean;
}

interface Props {
	title: string;
	formId: string;
	editBoard?: { id: number; title: string; content: string; images?: string[] } | null;
	resetEditBoard: () => void;
}

const BoardWriter = ({ title, formId, editBoard, resetEditBoard }: Props) => {
	const [boardTitle, setBoardTitle] = useState<string>('');
	const [boardContent, setBoardContent] = useState<string>('');
	const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
	const [deletedImages, setDeletedImages] = useState<UploadedImage[]>([]);

	const { open, close } = useAlertContext();

	const searchParams = useSearchParams();
	const type = searchParams.get('type') as string;
	const queryClient = useQueryClient();
	const quillRef = useRef<ReactQuill>(null);

	const initializeState = () => {
		setBoardTitle('');
		setBoardContent('');
		setUploadedImages([]);
		setDeletedImages([]);
	};

	const handleImageUpload = async (file: File) => {
		try {
			const result = await uploadImageToCloudinary(file);
			const newImage = { id: result.public_id, url: result.secure_url, savedToBackend: false };
			setUploadedImages((prevImages) => [...prevImages, newImage]);

			if (quillRef.current) {
				const editor = quillRef.current.getEditor();
				const range = editor.getSelection(true);
				editor.insertEmbed(range.index, 'image', newImage.url);
			}
		} catch (error: any) {
			// @ts-ignore: Suppress any type error
			open({
				width: '300px',
				height: '200px',
				title: '이미지 업로드 실패',
				main: <AlertMainTextBox text={error.message} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		}
	};

	const handleImageDelete = (imageUrl: string) => {
		const image = uploadedImages.find((img) => img.url === imageUrl);
		if (!image) return;

		setDeletedImages((prevImages) => [...prevImages, image]);
		setUploadedImages((prevImages) => prevImages.filter((img) => img.url !== imageUrl));
	};

	const finalImageDeletion = async () => {
		for (const image of deletedImages) {
			try {
				await deleteImageFromCloudinary(image.id);
				if (image.savedToBackend) {
					await deleteImageFromBackend(+image.id);
				}
			} catch (error: any) {
				// @ts-ignore: Suppress any type error
				console.error('Image delete failed:', error);
				// @ts-ignore: Suppress any type error
				open({
					width: '300px',
					height: '200px',
					title: '이미지 삭제 실패',
					main: <AlertMainTextBox text={error.message} />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: close,
				});
			}
		}
	};

	const imageHandler = () => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.addEventListener('change', async () => {
			const file = input.files ? input.files[0] : null;
			if (file) {
				await handleImageUpload(file);
			}
		});
	};

	const modules = useMemo(() => {
		return {
			toolbar: {
				container: [
					[{ header: [1, 2, 3, false] }],
					['bold', 'italic', 'underline', 'strike'],
					['blockquote'],
					[{ list: 'ordered' }, { list: 'bullet' }],
					[{ color: [] }, { background: [] }],
					[{ align: [] }, 'link', 'image'],
				],
				handlers: {
					image: imageHandler,
				},
			},
		};
	}, []);

	const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setBoardTitle(event.target.value);
	};

	const handleEditorChange = (
		content: string,
		// @ts-ignore: Suppress any type error
		delta: any,
		// @ts-ignore: Suppress any type error
		source: any,
		// @ts-ignore: Suppress any type error
		editor: any,
	) => {
		setBoardContent(content);

		// @ts-ignore: Suppress any type error
		const currentContents = editor.getContents();
		const insertedImages = currentContents.ops
			// @ts-ignore: Suppress any type error
			.filter((op: any) => op.insert && op.insert.image)
			// @ts-ignore: Suppress any type error
			.map((op: any) => op.insert.image);

		uploadedImages.forEach((img) => {
			if (!insertedImages.includes(img.url) && !deletedImages.includes(img)) {
				handleImageDelete(img.url);
			}
		});
	};

	const mutation = useMutation({
		mutationFn: (data: BoardInfoFormData) => postBoard(type, data),
		onSuccess: async () => {
			await finalImageDeletion();
			open({
				width: '300px',
				height: '200px',
				title: `${type === 'notice' ? '공지사항' : '자주묻는질문'} 등록 완료`,
				main: <AlertMainTextBox text="게시글이 등록 되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			queryClient.invalidateQueries({ queryKey: ['boardList'] });
			setBoardTitle('');
			setBoardContent('');
			setDeletedImages([]);
		},
		onError: (error: BoardError) => {
			open({
				width: '300px',
				height: '200px',
				title: `${type === 'notice' ? '공지사항' : '자주묻는질문'} 등록 실패`,
				main: <AlertMainTextBox text={error.errorMessage} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const updateMutation = useMutation({
		mutationFn: (data: BoardInfoFormData) => updateBoard(type, editBoard?.id as number, data),
		onSuccess: async () => {
			await finalImageDeletion();
			open({
				width: '300px',
				height: '200px',
				title: '수정 완료',
				main: <AlertMainTextBox text="게시글 정보가 수정되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			queryClient.invalidateQueries({ queryKey: ['boardList'] });
			setBoardTitle('');
			setBoardContent('');
			resetEditBoard();
			setDeletedImages([]);
		},
		onError: (error: BoardError) => {
			open({
				width: '300px',
				height: '200px',
				title: '수정 실패',
				main: <AlertMainTextBox text={error.errorMessage} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const imageUrls = uploadedImages.map((img) => img.url);

		if (editBoard) {
			updateMutation.mutate({
				title: boardTitle,
				content: boardContent,
				imageUrls,
			});
		} else {
			mutation.mutate({
				title: boardTitle,
				content: boardContent,
				imageUrls,
			});
		}
	};

	useEffect(() => {
		if (editBoard) {
			setBoardTitle(editBoard.title);
			setBoardContent(editBoard.content);

			if (editBoard.images) {
				setUploadedImages(editBoard.images.map((url) => ({ id: url, url, savedToBackend: true })));
			}
		} else {
			initializeState();
		}
	}, [editBoard]);

	return (
		<form id={formId} onSubmit={handleSubmit}>
			<div style={{ fontSize: '18px', fontWeight: '500' }}>{title}</div>
			<Spacing margin="27px" />
			<Flex direction="column">
				<Flex align="center">
					<div className={s.darkGraySmallText} style={{ marginRight: '4px' }}>
						제목
					</div>
					<Input
						style={{
							width: '300px',
							height: '25px',
							paddingLeft: '10px',
							border: `1px solid ${vars.color.lighterGray}`,
						}}
						value={boardTitle}
						onChange={handleTitleValueChange}
					/>
				</Flex>
				<Spacing margin="14px" />
				<Flex align="center">
					<div className={s.darkGraySmallText} style={{ marginRight: '4px' }}>
						내용
					</div>
					<ReactQuill
						ref={quillRef}
						value={boardContent}
						onChange={handleEditorChange}
						style={{ width: '95%', height: '170px' }}
						theme="snow"
						modules={modules}
					/>
				</Flex>
				<Spacing margin="60px" />
				<Flex justify="flex-end" style={{ width: '100%', padding: '0 30px' }}>
					<Button
						id={formId}
						type="submit"
						color={vars.color.black}
						style={{
							width: '100px',
							padding: '10px 20px',
							backgroundColor: vars.color.lightestGray,
							borderRadius: '5px',
						}}>
						{editBoard ? '수정' : '작성'}
					</Button>
				</Flex>
			</Flex>
		</form>
	);
};

export default BoardWriter;
