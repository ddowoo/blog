import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <p>제가 하는 작업을 아카이브로 모아두는 블로그 입니다.</p>
      <p>내용에 틀린 부분이 있거나 코드에 아쉬운 부분이 있으면 댓글 부탁드립니다.</p>
      {children}
    </>
  );
}
