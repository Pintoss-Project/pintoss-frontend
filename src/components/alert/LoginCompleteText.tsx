import Spacing from '@/shared/components/layout/Spacing';

const LoginCompleteText = () => {
	return (
		<div style={{ width: '100%', height: '100px' }}>
			<p style={{ lineHeight: '1.5', textAlign: 'left' }}>
				로그인이 완료되었습니다. <br />
				확인 버튼을 클릭 후 서비스를 이용해주세요.
			</p>
		</div>
	);
};

export default LoginCompleteText;
