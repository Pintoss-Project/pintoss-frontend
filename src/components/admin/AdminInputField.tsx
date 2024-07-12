import * as s from './AdminStyle.css';
import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';

interface Props {
	label: string;
	placeholder?: string;
}

const AdminInputField = ({ label, placeholder }: Props) => {
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
				<Input className={s.noInputStyle} placeholder={placeholder} />
			</div>
		</Flex>
	);
};

export default AdminInputField;
