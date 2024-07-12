'use client';

import * as cs from '@/shared/styles/common.css';
import * as s from './FooterStyle.css';

import { PintossLogo, SecureTransaction } from '../../../public/svgs';
import Image from 'next/image';
import Spacing from '@/shared/components/layout/Spacing';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
	const path = usePathname();

	if (path.includes('admin')) return null;

	return (
		<>
			<div className={s.footerBox}>
				<Spacing margin="44px" />
				<Flex justify="space-between">
					<div>
						<Link href="/">
							<Image src={PintossLogo} alt="로고 이미지" width={165} height={45} />
						</Link>
						<Spacing margin="25px" />
						<p className={s.pText}>
							(47190) 부산광역시 부산진구 당감로17 (당감동,삼익) 7-906 핀토스
						</p>
						<Spacing margin="8px" />
						<p className={s.pText}>
							대표 조문국 l 사업자등록번호: 590 -95- 01527 l 통신판매업신고 제 2024-부산진-1016호 l
							Email : c0810@naver.com
						</p>
						<Spacing margin="8px" />
						<p className={s.pText}>
							고객센터 주소 : 부산광역시 부산진구 당감로17 7-906호 l 핀토스 고객센터 Tel:1544-4202{' '}
						</p>
						<Spacing margin="8px" />
						<p className={s.pText}>Copyright 핀토스 Information Service.All rights reserved</p>
						<Spacing margin="25px" />
						<Flex
							justify="center"
							align="center"
							className={cs.darkBlueButton}
							style={{ width: '324px', height: '49px' }}>
							<a href="mailto:c0818@naver.com" style={{ color: vars.color.white }}>
								대량구매/제휴문의 : c0818@naver.com
							</a>
						</Flex>
						<Spacing margin="20px" />
						<p className={s.pText} style={{ color: vars.color.lightGray }}>
							ⓒ 핀토스. All rights reserved.
						</p>
					</div>
					<Flex direction="column" align="flex-end">
						<div style={{ color: vars.color.darkerGray, fontSize: '18px', fontWeight: '600' }}>
							고객센터
						</div>
						<Spacing margin="15px" />
						<div style={{ color: vars.color.darkBlue, fontSize: '30px', fontWeight: 'bold' }}>
							1544-4202
						</div>
						<Spacing margin="5px" />
						<p style={{ color: vars.color.darkerGray, fontSize: '18px' }}>
							오전 09:00 ~ 새벽 01:00 연중무휴
						</p>
						<Spacing margin="20px" />
						<div>
							<Link href="/" style={{ color: vars.color.darkBlue, fontSize: '15px' }}>
								개인정보 처리방침
							</Link>
							<Link
								href="/"
								style={{ color: vars.color.mediumGray, marginLeft: '14px', fontSize: '15px' }}>
								이용약관
							</Link>
						</div>
						<Spacing margin="77px" />
						<Image src={SecureTransaction} alt="안전 거래 가맹점 이미지" width={488} height={60} />
					</Flex>
				</Flex>
			</div>
			<Spacing margin="34px" />
		</>
	);
};

export default Footer;
