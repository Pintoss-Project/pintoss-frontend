import fs from 'fs';
import path from 'path';
import * as s from '@/components/home/HomeStyle.css';
async function PrivacyPage() {
	const filePath = path.join(process.cwd(), 'public', 'privacy.txt');

	// 텍스트 파일 읽기
	let terms = fs.readFileSync(filePath, 'utf8');

	// 다양한 줄바꿈 형식 처리
	terms = terms.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

	// 줄바꿈 처리 함수
	const formatText = (text) => {
		return text.split('\n').map((line, index) => (
			<p key={index} style={{ marginBottom: '1rem' }}>
				{line}
			</p>
		));
	};

	return (
		<main className={s.homeSection}>
			<h1>개인정보 처리방침</h1>
			<div>{formatText(terms)}</div>
		</main>
	);
}

export default PrivacyPage;
