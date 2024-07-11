import { Flex } from '@/shared/components/layout';
import * as s from './AdminStyle.css';
import Spacing from '@/shared/components/layout/Spacing';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import { Input } from '@/shared/components/input';
import AdminUserList from './AdminUserList';

const AdminUserMain = () => {
	return (
		<div>
			<div className={s.userSearchBox} style={{ minWidth: '700px' }}>
				<Flex align="center" style={{ width: '650px' }}>
					<div style={{ width: '100%' }}>
						<Flex align="center">
							<div className={s.darkGraySmallText} style={{ marginRight: '30px' }}>
								가입일
							</div>
							<Input
								className={s.lighterGrayInput}
								style={{ width: '200px', height: '25px', marginRight: '13px' }}
							/>
							<div>~</div>
							<Input
								className={s.lighterGrayInput}
								style={{ width: '200px', height: '25px', marginLeft: '13px' }}
							/>
						</Flex>
						<Spacing margin="13px" />
						<Flex align="center">
							<div className={s.darkGraySmallText} style={{ marginRight: '30px' }}>
								검색어
							</div>
							<Input className={s.lighterGrayInput} style={{ width: '435px', height: '25px' }} />
						</Flex>
					</div>
					<Button color={vars.color.black} style={{ marginLeft: '15px', fontSize: '16px' }}>
						<Flex justify="center" align="center" className={s.userSearchButton}>
							검색
						</Flex>
					</Button>
				</Flex>
			</div>
			<Spacing margin="30px" />
			<AdminUserList />
		</div>
	);
};

export default AdminUserMain;
