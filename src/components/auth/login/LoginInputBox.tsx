import * as s from './LoginStyle.css';
import { Input } from '@/shared/components/input';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
	name: string;
	type: string;
	placeholder?: string;
}

const LoginInputBox = ({ name, type, placeholder }: Props) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Input
					{...field}
					id={name}
					name={name}
					value={field.value}
					type={type}
					className={s.loginInputStyle}
					placeholder={placeholder}
					onChange={field.onChange}
				/>
			)}
		/>
	);
};

export default LoginInputBox;
