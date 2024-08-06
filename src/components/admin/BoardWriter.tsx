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
import { updateBoard } from '@/app/api/board/updateBoard';

interface Props {
	title: string;
	formId: string;
	editBoard?: { id: number; title: string; content: string } | null;
	resetEditBoard: () => void;
}

const BoardWriter = ({ title, formId, editBoard, resetEditBoard }: Props) => {
	const [boardTitle, setBoardTitle] = useState<string>('');
	const [boardContent, setBoardContent] = useState<string>('');

	const { open, close } = useAlertContext();

	const searchParams = useSearchParams();
	const type = searchParams.get('type') as string;

	const queryClient = useQueryClient();

	const quillRef = useRef<ReactQuill>(null);

	const imageHandler = () => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();
		input.addEventListener('change', async () => {
			const file = input.files ? input.files[0] : null;
			if (file && quillRef.current) {
				const editor = quillRef.current.getEditor();
				const range = editor.getSelection(true);

				const imageUrl = '';

				editor.insertEmbed(range.index, 'image', imageUrl);
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

	const handleEditorChange = (content: string) => {
		setBoardContent(content);
	};

	const mutation = useMutation({
		mutationFn: (data: BoardInfoFormData) => postBoard(type, data),
		onSuccess: () => {
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
		onSuccess: () => {
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
		if (editBoard) {
			updateMutation.mutate({
				title: boardTitle,
				content: boardContent,
			});
		} else {
			mutation.mutate({
				title: boardTitle,
				content: boardContent,
			});
		}
	};

	useEffect(() => {
		if (editBoard) {
			setBoardTitle(editBoard.title);
			setBoardContent(editBoard.content);
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
