# EmailJS 설정 가이드

현재 연락하기 폼은 `mailto:` 링크를 사용하고 있습니다. 
이메일이 자동으로 전송되도록 하려면 EmailJS를 설정해야 합니다.

## EmailJS 설정 방법

1. **EmailJS 계정 만들기**
   - https://www.emailjs.com/ 에 접속
   - 무료 계정 생성

2. **이메일 서비스 추가**
   - Dashboard > Email Services
   - Gmail, Outlook 등 원하는 서비스 선택
   - 연결 및 인증 완료

3. **이메일 템플릿 생성**
   - Dashboard > Email Templates
   - 새 템플릿 생성
   - To Email: `khj55533@naver.com`
   - From Name: `{{from_name}}`
   - Reply To: `{{from_email}}`
   - Subject: `{{subject}}`
   - Content:
     ```
     이름: {{from_name}}
     이메일: {{from_email}}
     
     제목: {{subject}}
     
     메시지:
     {{message}}
     ```
   - 템플릿 ID 복사

4. **Public Key 확인**
   - Dashboard > Account > General
   - Public Key 복사

5. **코드 업데이트**
   - `script.js` 파일에서:
     - `YOUR_PUBLIC_KEY`를 발급받은 Public Key로 변경
     - `YOUR_SERVICE_ID`를 서비스 ID로 변경
     - `YOUR_TEMPLATE_ID`를 템플릿 ID로 변경
   - mailto 코드를 주석 처리하고 EmailJS 코드의 주석을 해제

## 현재 상태

현재는 `mailto:` 링크를 사용하여 사용자의 이메일 클라이언트를 엽니다.
사용자가 직접 "전송" 버튼을 눌러야 이메일이 전송됩니다.

