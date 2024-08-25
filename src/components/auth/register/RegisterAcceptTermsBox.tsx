'use client';

import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import * as s from './RegisterStyle.css';
import ValidationMessages from './ValidationMessages';

interface Props {
	name: string;
	label: string;
}

const RegisterAcceptTermsBox = ({ name, label }: Props) => {
	const [isChecked, setIsChecked] = useState(false);

	const {
		control,
		formState: { errors },
	} = useFormContext();

	const handleCheckedChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsChecked(event.target.checked);
	};

	return (
		<div>
			<Flex align="center">
				<label className={s.checkboxLabel}>
					<Controller
						name={name}
						control={control}
						rules={{ required: '약관 동의가 필요합니다.' }}
						render={({ field }) => (
							<Input
								{...field}
								id={name}
								name={name}
								type="checkbox"
								className={`${s.hiddenCheckbox}`}
								checked={field.value || false}
								onChange={(e) => {
									handleCheckedChange(e);
									field.onChange(e.target.checked);
								}}
							/>
						)}
					/>
					<div className={s.customCheckboxContainer}>
						<div className={s.customCheckbox}></div>
					</div>
				</label>
				<span className={s.skyBlueText}>[필수]</span>
				<label className={s.label} style={{ marginLeft: '3px', fontWeight: '400' }}>
					{label}
				</label>
			</Flex>
			<Spacing margin="10px" />
			<div className={clsx(s.acceptTermsBox, { [s.acceptTermsBoxChecked]: isChecked })}>
				<div className={s.acceptTermsInnerWrap}>
					<p className={s.acceptTermsText}>
						이용약관 내용이 여기에 표시됩니다. 이용약관 내용이 여기에 표시됩니다. 이용약관 내용이
						여기에 표시됩니다. 이용약관 내용이 여기에 표시됩니다. 이용약관 내용이 여기에 표시됩니다.
						이용약관 내용이 여기에 표시됩니다. 이용약관 내용이 여기에 표시됩니다. 이용약관 내용이
						여기에 표시됩니다. 이용약관 내용이 여기에 표시됩니다. 이용약관 내용이 여기에 표시됩니다.
						이용약관 내용이 여기에 표시됩니다. 이용약관 내용이 여기에 표시됩니다. 이용약관 내용이
						여기에 표시됩니다. 이용약관 내용이 여기에 표시됩니다. 이용약관 내용이 여기에 표시됩니다.
					</p>
				</div>
			</div>
			<Flex justify="start" align="center">
				{errors[name] && (
					<ValidationMessages
						firstMessage={(errors[name]?.message as string) || '오류가 발생했습니다.'}
					/>
				)}
			</Flex>
		</div>
	);
};

export default RegisterAcceptTermsBox;
