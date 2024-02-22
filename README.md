# NEXT JS 낙서장 블로그

## 설명
정제된 글을 올려두는 벨로그와 별개로 일상중에 생기는 각종 낙서 글을 모으고 싶어 블로그를 만들었습니다.
<br/>
NEXT 14버전 APP Router로 작업했고, 처음에는 mdx기반으로 포스팅을 관리했습니다.
하지만 mdx로 관리해 포스트를 올리때마다 커밋을 남기게 되고 이로인해 낙서가 아닌 계속 정제된 글로 만들기 위한, 의도와 다른 공수가 들어가 현재는 notion API를 사용해 포스트를 관리하고 있습니다.

## 📂 src 폴더 구조

```markdown
src
├─ app        // Next.js 앱 라우터
├─ components // 공통으로 사용되는 리액트 컴포넌트
├─ constants  // 상수값들을 정의한 파일들
├─ styles     // 스타일 코드
├─ types      // 타입스크립트 타입 선언
└─ utils      // 여러 부분에서 사용되는 함수들
```
