import { Flex } from '@/shared/components/layout';
import * as s from './AdminStyle.css';
import { vars } from '@/shared/styles/theme.css';
import { Input } from '@/shared/components/input';
import { Button } from '@/shared/components/button';
import Spacing from '@/shared/components/layout/Spacing';

const ManageFeeBox = () => {
	return (
		<div
			style={{
				width: '35%',
				height: '500px',
				padding: '18px 30px',
				marginRight: '16px',
				backgroundColor: vars.color.white,
				border: `1px solid ${vars.color['lighter-gray']}`,
			}}>
			<div className={s.blackMediumText}>수수료 관리</div>
			<Flex direction="column" justify="center" align="center" style={{ height: '85%' }}>
				<Flex align="center">
					<div className={s.lightGrayMediumText} style={{ width: '100px' }}>
						카드결제
					</div>
					<div
						style={{ marginLeft: '27px', borderBottom: `1px solid ${vars.color['lighter-gray']}` }}>
						<Input
							type="number"
							step="0.1"
							placeholder="수수료를 입력하세요"
							className={s.rateInputStyle}
						/>
						%
					</div>
				</Flex>
				<Spacing margin="39px" />
				<Flex align="center">
					<div className={s.lightGrayMediumText} style={{ width: '100px' }}>
						휴대폰결제
					</div>
					<div
						style={{ marginLeft: '27px', borderBottom: `1px solid ${vars.color['lighter-gray']}` }}>
						<Input
							type="number"
							step="0.1"
							placeholder="수수료를 입력하세요"
							className={s.rateInputStyle}
						/>
						%
					</div>
				</Flex>
			</Flex>
			<Flex justify="flex-end">
				<Button color={vars.color.black} className={s.lightGrayButton}>
					수정
				</Button>
			</Flex>
		</div>
	);
};

export default ManageFeeBox;
