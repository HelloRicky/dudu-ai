import StoryBuilderPage from "./_components/StoryClient";

export async function generateStaticParams() {
  return [{ profile: "johnny" }, { profile: "jasmine" }];
}

export default function StoryPage() {
  return <StoryBuilderPage />;
}
