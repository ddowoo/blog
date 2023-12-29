import PostTagList from "@/components/postTagList";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <PostTagList />
      {props.children}
    </div>
  );
}
