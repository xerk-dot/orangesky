import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import PostForm from './_components/PostForm';
import SortableList from './_components/main-page_ui/SortableList';

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

      </main>
    </HydrateClient>
  );
}
