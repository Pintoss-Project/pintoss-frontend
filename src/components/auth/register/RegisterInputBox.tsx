import * as s from './RegisterStyle.css';

import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';

interface Props {
	name?: string;
	label: string;
	star?: boolean;
	type?: string;
	placeholder?: string;
}

const RegisterInputBox = ({ name, label, star, type, placeholder }: Props) => {
	return (
		<Flex align="center">
			<label className={s.labelText}>
				{label}
				{star && <span className={s.starStyle}>*</span>}
			</label>
			<Input name={name} type={type} className={s.inputStyle} placeholder={placeholder} />
		</Flex>
	);
};

export default RegisterInputBox;
