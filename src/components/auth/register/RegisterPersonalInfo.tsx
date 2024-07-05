import * as cs from '@/shared/styles/common.css';
import * as s from './RegisterStyle.css';

import Spacing from '@/shared/components/layout/Spacing';
import RegisterInputBox from './RegisterInputBox';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';

const RegisterPersonalInfo = () => {
	return (
		<div style={{ marginLeft: '10px' }}>
			<div style={{ width: '100%', textAlign: 'left' }}>
				<span className={s.baseText}>휴대폰인증</span>
				<span className={s.skyBlueText}>[필수]</span>
			</div>
			<Spacing margin="8px" />
			<div className={s.phoneInfoBox}>
				<p className={s.redText}>* 상품권 구매는 휴대폰인증을 필수로 하셔야합니다.</p>
				<Spacing margin="5px" />
				<p className={s.smallText}>* 본인명의 휴대폰이 아닐 경우 추가인증을 요구 할 수 있습니다.</p>
				<Spacing margin="30px" />
				<Button color={vars.color['light-blue']} className={cs.whiteAndBlueButton}>
					휴대폰 본인 인증하기
				</Button>
			</div>
			<Spacing margin="15px" />
			<RegisterInputBox name="name" label="이름" star placeholder="본인인증 후 자동입력됩니다." />
			<Spacing margin="20px" />
			<RegisterInputBox
				name="phone"
				label="휴대폰"
				star
				placeholder="본인인증 후 자동입력됩니다."
			/>
			<Spacing margin="40px" />
		</div>
	);
};

export default RegisterPersonalInfo;