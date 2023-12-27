"use client";
import PostCard from "@/components/postPreview";
import { allPosts } from "contentlayer/generated";

export default function Blog() {
  return (
    <section>
      <div className="my-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl	font-bold">안녕하세요 개발자 이동욱입니다.</h1>
            <p className="font-light">
              <br />
              <br />
              사용자의 행동을 분석하고 <b>다양한 역할에서 서로 다른 시각을 가진 팀원들과 협업</b>하여 서비스를 발전시키는 것이 제게 업무적인 즐거움이고 이 과정에서 얻는 기업의 성장 수치는 가장 큰
              보람을 줍니다.
              <br />
              <br />
              또한, 경험한 이슈와 학습한 내용에 대해 공유가 적극적인 개발 업계의 문화를 좋아합니다. 이러한 문화에 도움이 되기 위해 <b>오픈소스 활동과 블로그</b>를 통해 정보를 나누고 있습니다.
            </p>
            <ul className="flex flex-col mt-3">
              <li className="mr-2">
                <strong>
                  <a href="https://github.com/ddowoo" className="ease-out duration-300 hover:text-orange-400" target="_blank">
                    Github
                  </a>
                </strong>
              </li>
              <li className="mr-2">
                <strong>
                  <a href="https://github.com/ddowoo" className="ease-out duration-300 hover:text-orange-400" target="_blank">
                    Resume
                  </a>
                </strong>
              </li>
              <li className="mr-2">
                <strong>
                  <a href="https://github.com/ddowoo" className="ease-out duration-300 hover:text-orange-400" target="_blank">
                    Velog
                  </a>
                </strong>
              </li>
            </ul>
          </div>
          <img src="/images/profile.jpeg" alt="이동욱" className="rounded-full w-80	h-80 object-cover ml-10" />
        </div>
      </div>
      <div className="my-5 d-flex flex-wrap">
        <p className="text-xl font-semibold">최근 게시물</p>
      </div>
      {allPosts.slice(0, 5).map((post) => {
        return <PostCard key={post.title} post={post} />;
      })}
    </section>
  );
}
