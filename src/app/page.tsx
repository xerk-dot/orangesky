import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import PostForm from './_components/PostForm';
import SortableList from './_components/main-page_ui/SortableList';
import Title from './_components/Title';
export default async function Home() {
  return (
    <HydrateClient>
        <Title />
    </HydrateClient>
  );
}
