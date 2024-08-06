'use client';

import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import * as s from './AdminStyle.css';
import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';

interface Props<T extends FieldValues> {
	label: string;
	placeholder?: string;
	name: Path<T>;
}

const AdminInputField = <T extends FieldValues>({ label, placeholder, name }: Props<T>) => {
	const { control } = useFormContext<T>();

	return (
		<Flex align="center">
			<div className={s.darkGraySmallText} style={{ flex: 1 }}>
				{label}
			</div>
			<div
				style={{
					flex: 3,
					marginLeft: '20px',
					borderBottom: `1px solid ${vars.color.lighterGray}`,
				}}>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							id={name}
							onChange={field.onChange}
							value={field.value}
							type="text"
							className={s.noInputStyle}
							placeholder={placeholder}
						/>
					)}
				/>
			</div>
		</Flex>
	);
};

export default AdminInputField;
