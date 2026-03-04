import WonderModePage from "./_components/WonderClient";

export async function generateStaticParams() {
  return [{ profile: "johnny" }, { profile: "jasmine" }];
}

export default function WonderPage() {
  return <WonderModePage />;
}
