'use client';

import * as cs from '@/shared/styles/common.css';
import * as s from './MyPageStyle.css';

import { fetchDeactivate } from '@/app/api/auth/fetchDeactivate';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import InfoBox from '../InfoBox';
import AuthenticationInfoBox from './AuthenticationInfoBox';
import MemberInfoBox from './MemberInfoBox';

const MyPageMain = () => {
	const { open, close } = useAlertContext();
	const router = useRouter();

	const deactivateUserMutation = useMutation({
		mutationFn: () => fetchDeactivate(),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '회원탈퇴',
				main: <AlertMainTextBox text="회원탈퇴가 완료되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: () => {
					router.push('/');
					close();
				},
			});
		},
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '회원탈퇴',
				main: <AlertMainTextBox text="회원탈퇴가 실패되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const handleDeactivateUser = () => {
		open({
			width: '300px',
			height: '200px',
			title: '회원탈퇴',
			main: (
				<AlertMainTextBox text="회원 탈퇴를 진행하면 모든 유저 정보가 삭제됩니다. 탈퇴하시겠습니까?" />
			),
			rightButtonStyle: cs.lightBlueButton,
			rightButtonLabel: '확인',
			leftButtonStyle: cs.whiteAndBlackButton,
			leftButtonLabel: '취소',
			onRightButtonClick: () => {
				deactivateUserMutation.mutate();
				close();
			},
			onLeftButtonClick: close,
		});
	};

	return (
		<div>
			<Spacing margin="42px" />
			<Flex justify="center" align="center" className={s.memberInfoFlexBox}>
				<InfoBox title="회원정보" info={<MemberInfoBox />} className={s.memberInfoBox} />
				<div style={{ width: '100%' }}></div>
				{/* <InfoBox title="SNS 계정 연동" info={<SnsInfoBox />} className={s.snsInfoBox} /> */}
			</Flex>
			<Spacing margin="30px" />
			<div>
				<InfoBox
					title="본인인증"
					info={<AuthenticationInfoBox />}
					className={s.authenticationInfoBox}
				/>
			</div>
			<Spacing margin="170px" />
			<div className={s.excludeMemberButtonWrap}>
				<Flex justify="center" align="center" className={s.grayButton}>
					<Button
						color={vars.color.lightGray}
						style={{
							width: '100%',
							height: '100%',
							fontSize: '18px',
							backgroundColor: 'transparent',
						}}
						onClick={handleDeactivateUser}>
						회원탈퇴
					</Button>
				</Flex>
			</div>
		</div>
	);
};

export default MyPageMain;
