import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import * as cs from '@/shared/styles/common.css';

interface Props {
	disabled: boolean;
}

const FindIdButton = ({ disabled }: Props) => {
	return (
		<div>
			<Button
				form="register-form"
				className={cs.darkBlueButton}
				color={vars.color.white}
				type="submit"
				disabled={disabled}>
				아이디 찾기
			</Button>
		</div>
	);
};

export default FindIdButton;
