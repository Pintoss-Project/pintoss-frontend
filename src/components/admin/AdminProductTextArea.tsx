'use client';

import { Flex } from '@/shared/components/layout';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import * as s from './AdminStyle.css';

interface Props<T extends FieldValues> {
	name: Path<T>;
	label?: string;
}

const AdminProductTextArea = <T extends FieldValues>({ name, label }: Props<T>) => {
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
					<div style={{ flex: '3' }}>
						<textarea className={s.customTextarea} {...field} />
					</div>
				</Flex>
			)}
		/>
	);
};

export default AdminProductTextArea;
