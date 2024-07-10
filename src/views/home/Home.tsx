import Card from "./Card/Card";

function Home() {

  return (
    <div className="px-12 py-16">
      <h1 className="font-medium mb-2">Recent</h1>
      <Card title="Logs" updatedAt={1720616586000} logsCount={12} dataName="Logs / Time" dataUpdatedAt={1720616586000} />
      <h1 className="font-medium mt-8 mb-2">Saved</h1>
    </div>
  );
}

export default Home;
