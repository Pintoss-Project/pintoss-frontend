'use client';

import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import { Controller, useFormContext } from 'react-hook-form';
import ValidationMessages from '../register/ValidationMessages';
import * as s from '../register/RegisterStyle.css';

interface Props {
	name: string;
	label: string;
	star?: boolean;
	type?: string;
	placeholder?: string;
	disabled?: boolean;
	value?: string;
}

const FindIdInputBox = ({
	value,
	name,
	label,
	star,
	type,
	placeholder,
	disabled = false,
}: Props) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<Flex align="center" className={s.personalInfoInputBox}>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<>
						<label className={s.labelText}>
							{label}
							{star && <span className={s.starStyle}>*</span>}
						</label>
						<Flex direction="column">
							<Input
								{...field}
								id={name}
								name={name}
								value={field.value}
								type={type}
								className={s.inputStyle}
								placeholder={placeholder}
								onChange={field.onChange}
								disabled={disabled}
							/>
							<Flex justify="start" align="center">
								{errors[name] && (
									<ValidationMessages
										firstMessage={(errors[name]?.message as string) || '오류가 발생했습니다.'}
									/>
								)}
							</Flex>
						</Flex>
					</>
				)}
			/>
		</Flex>
	);
};

export default FindIdInputBox;
