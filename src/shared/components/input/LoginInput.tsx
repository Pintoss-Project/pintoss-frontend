'use client';

import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Input } from './Input';
import * as s from './style.css';

interface Props<T extends FieldValues> {
	name: Path<T>;
	type: string;
	placeholder: string;
}

const LoginInput = <T extends FieldValues>({ name, type, placeholder }: Props<T>) => {
	const { control } = useFormContext<T>();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Input
					{...field}
					id={name}
					className={s.loginInputStyle}
					data-invalid={fieldState.invalid ? 'true' : 'false'}
					onChange={field.onChange}
					type={type}
					value={field.value}
					placeholder={placeholder}
				/>
			)}
		/>
	);
};

export default LoginInput;
