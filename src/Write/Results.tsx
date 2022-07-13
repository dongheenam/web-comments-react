import Button from "../components/Button";

export default function Results() {
  return (
    <>
      <h3>Renerated comments</h3>
      <textarea className="w-full text-lg" />
      <div className="flex gap-2">
        <Button variant="solid" color="primary">
          Copy
        </Button>
        <Button variant="outline" color="red">
          Clear traits
        </Button>
      </div>
    </>
  );
}
