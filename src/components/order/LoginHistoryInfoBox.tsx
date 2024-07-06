import * as s from './OrderStyle.css';
import { Flex } from '@/shared/components/layout';

const LOGIN_HISTORY = [
	{ id: 1, ip: '172.70.199.134', date: '2024-06-13' },
	{ id: 2, ip: '172.70.199.134', date: '2024-06-13' },
	{ id: 3, ip: '172.70.199.134', date: '2024-06-13' },
	{ id: 4, ip: '172.70.199.134', date: '2024-06-13' },
	{ id: 5, ip: '172.70.199.134', date: '2024-06-13' },
	{ id: 6, ip: '172.70.199.134', date: '2024-06-13' },
	{ id: 7, ip: '172.70.199.134', date: '2024-06-13' },
];

const LoginHistoryInfoBox = () => {
	return (
		<div className={s.loginHistoryInfoBox}>
			<Flex align="center" className={s.menuBarTitle}>
				<span className={s.loginFlexItem1}>아이피</span>
				<span className={s.loginFlexItem2}>접속일시</span>
			</Flex>
			{LOGIN_HISTORY.map((history) => (
				<Flex align="center" className={s.loginHistoryItem}>
					<span className={s.loginFlexItem1}>{history.ip}</span>
					<span className={s.loginFlexItem2}>{history.date}</span>
				</Flex>
			))}
		</div>
	);
};

export default LoginHistoryInfoBox;
