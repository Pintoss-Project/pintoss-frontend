

## 홈 메인에 뿌려주는 데이터 (백엔드 변경 전) 엔드포인트

사이트 푸터 정보
api/site/list

중앙에 판매상품 섹션
/api/product/simple

베너 캐로셀
/api/site/banner/list

중앙에 인기 상품 리스트
/api/product/popular

공지사항, 자주묻는질문
/api/board/list?type=NOTICE
/api/board/list?type=FAQS

## 다음

토큰 처리
Auth context


curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email": "test@naver.com", "password": "test1234!"}' \
  -c cookies.txt \
  -b cookies.txt \
  https://pintossmall2.com/api/auth/login

curl -X GET \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -b cookies.txt \
  https://pintossmall2.com/api/users/info
