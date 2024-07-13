'use client';

import * as s from './AdminStyle.css';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
	title: string;
	formId: string;
}

const BoardWriter = ({ title, formId }: Props) => {
	const [value, setValue] = useState('');

	const handleEditorChange = (content: string) => {
		setValue(content);
	};

	return (
		<form id={formId}>
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
							border: `1px solid ${vars.color.lighterGray}`,
						}}
					/>
				</Flex>
				<Spacing margin="14px" />
				<Flex align="center">
					<div className={s.darkGraySmallText} style={{ marginRight: '4px' }}>
						내용
					</div>
					<ReactQuill
						value={value}
						onChange={handleEditorChange}
						style={{ width: '95%', height: '170px' }}
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
						작성
					</Button>
				</Flex>
			</Flex>
		</form>
	);
};

export default BoardWriter;
