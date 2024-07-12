'use client';

import { Flex } from '@/shared/components/layout';
import * as s from './RegisterStyle.css';
import { Input } from '@/shared/components/input';
import Spacing from '@/shared/components/layout/Spacing';
import { useState } from 'react';
import clsx from 'clsx';

interface Props {
	label: string;
}

const RegisterAcceptTermsBox = ({ label }: Props) => {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(event.target.checked);
	};

	return (
		<div>
			<Flex align="center">
				<label className={s.checkboxLabel}>
					<Input
						type="checkbox"
						className={`${s.hiddenCheckbox}`}
						checked={isChecked}
						onChange={handleCheckboxChange}
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
		</div>
	);
};

export default RegisterAcceptTermsBox;
