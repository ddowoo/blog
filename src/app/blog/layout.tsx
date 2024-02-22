import Utterances from "@/components/uttarences";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="p-3 rounded-md bg-gray-700 mb-3">
        <p>
          <b>개발 관련 낙서</b>들을 모아두는 블로그 입니다.
        </p>
        <p>
          낙서 남기기 아쉬운 내용은 <a href="">벨로그</a>에 정리되어 있습니다.
        </p>
        <p>내용에 틀린 부분이 있거나 코드에 아쉬운 부분이 있으면 댓글 부탁드립니다. {":)"}</p>
      </div>
      {children}
    </>
  );
}
