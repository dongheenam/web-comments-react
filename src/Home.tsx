import A from "./components/A";

export default function Home() {
  return (
    <>
      <h1>Web Comments Generator</h1>
      <h2>About</h2>
      <h2>Howto</h2>
      <h2>Updates</h2>
      <h2>Acknowledgements</h2>
      <p>
        {"The favicon was generated using the graphics from "}
        <A blank href="https://github.com/twitter/twemoji">
          Twitter Twemoji
        </A>
        {" from "}
        <A blank href="https://favicon.io/">
          favicon.io
        </A>
        .
      </p>
    </>
  );
}
