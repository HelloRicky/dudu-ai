import ExplainEchoPage from "./_components/ExplainClient";

export async function generateStaticParams() {
  return [{ profile: "johnny" }, { profile: "jasmine" }];
}

export default function ExplainPage() {
  return <ExplainEchoPage />;
}
