'use client';

import { Flex } from '@/shared/components/layout';
import { Input } from '@/shared/components/input';
import { vars } from '@/shared/styles/theme.css';
import * as s from './AdminStyle.css';
import { ReactNode } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

interface Props<T extends FieldValues> {
	name: Path<T>;
	label?: string;
}

const AdminProductSelect = <T extends FieldValues>({ name, label }: Props<T>) => {
	const { control } = useFormContext<T>();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Flex align="center">
					<div className={s.darkGraySmallText} style={{ flex: '1' }}>
						{label}
					</div>
					<div style={{ flex: '3', width: '100%' }}>
						<select className={s.customSelect} {...field}>
							<option value="">카테고리를 선택하세요</option>
							<option value="CBM">문화/도서/영화</option>
							<option value="GO">게임/온라인 콘텐츠</option>
							<option value="LS">생활/쇼핑</option>
						</select>
					</div>
				</Flex>
			)}
		/>
	);
};

export default AdminProductSelect;
