import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { MdOutlineSecurity } from 'react-icons/md';
import { CiLock } from 'react-icons/ci';
import { Ri24HoursLine } from 'react-icons/ri';
import { MdOutlinePayment } from 'react-icons/md';
import * as s from './HomeStyle.css';

const HomeServiceInfoBox = () => {
	return (
		<Flex direction="column" align="center" className={s.homeServiceInfoContainer}>
			<div className={s.homeServiceInfoTitleBox}>
				<div className={s.serviceText}>SERVICE</div>
				<Spacing margin="8px" />
				<h3 className={s.homeServiceInfoTitle}>핀토스의 특별한 서비스</h3>
			</div>
			<div className={s.homeServiceInfoBox}>
				<div className={s.homeServiceInfoBoxContent} style={{ backgroundColor: '#00B69F' }}>
					<Flex direction="column" justify="center" align="center">
						<Ri24HoursLine className={s.homeServiceInfoIcon} />
						<h3 className={s.homeServiceInfoH3Text}>24시간 운영</h3>
						<p className={s.homeServiceInfoText}>
							핀토스 자동화 시스템을
							<br />
							사용하여 구매 즉시
							<br />
							상품권을 발송합니다.
						</p>
					</Flex>
				</div>
				<div className={s.homeServiceInfoBoxContent} style={{ backgroundColor: '#EE982B' }}>
					<Flex direction="column" justify="center" align="center">
						<MdOutlineSecurity className={s.homeServiceInfoIcon} />
						<h3 className={s.homeServiceInfoH3Text}>안전한 상품권</h3>
						<p className={s.homeServiceInfoText}>
							구매요청이 들어오면
							<br />
							즉시 새 상품권을 발행해서
							<br />
							판매하기 때문에 안전합니다.
						</p>
					</Flex>
				</div>
				<div className={s.homeServiceInfoBoxContent} style={{ backgroundColor: '#924C00' }}>
					<Flex direction="column" justify="center" align="center">
						<CiLock className={s.homeServiceInfoIcon} />
						<h3 className={s.homeServiceInfoH3Text}>철저한 보안 시스템</h3>
						<p className={s.homeServiceInfoText}>
							해킹 피해를 방지하기 위해
							<br />
							체계적으로 고안된 2채널
							<br />
							보안시스템을 가동합니다.
						</p>
					</Flex>
				</div>
				<div className={s.homeServiceInfoBoxContent} style={{ backgroundColor: '#00507C' }}>
					<Flex direction="column" justify="center" align="center">
						<MdOutlinePayment className={s.homeServiceInfoIcon} />
						<h3 className={s.homeServiceInfoH3Text}>다양한 결제수단 지원</h3>
						<p className={s.homeServiceInfoText}>
							카드, 휴대폰 모두
							<br />
							통합하여 사이트 이동 없이
							<br />
							이용이 가능합니다.
						</p>
					</Flex>
				</div>
			</div>
			<Spacing margin="20px" />
		</Flex>
	);
};

export default HomeServiceInfoBox;
