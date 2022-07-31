import { A } from "./components";

export default function Home() {
  return (
    <article className="w-[min(70ch,100%)] m-auto">
      <h1>Home</h1>
      <section>
        <h2>About</h2>
        <p>
          This app is a tool that lets you generate student report comments
          based on the pre-defined &quot;traits&quot;.
        </p>
        <p>
          Each trait describes a single characteristic of a student. Does the
          student come to class on time? Can the student solve word problems?
          And so on. Traits can be either <strong>inactive (grey)</strong>,{" "}
          <strong>positive (blue)</strong> and <strong>negative (red)</strong>.
          An inactive trait <em>asks a question</em> about a student, a positive
          trait <em>describes</em> a student, and a negative trait{" "}
          <em>tells</em> a student what to do.
        </p>
        <img src="traits.png" alt="three states of the traits" />
        <p>
          When they are active, they can generate comments based on their state,
          either commending the students or suggesting improvements. For
          example, the trait <em>&quot;Has good inquiry skills&quot;</em> has
          the following comments:
        </p>
        <ul>
          <li>
            <strong>Positive</strong>
            <ul className="mb-4">
              <li>
                his/her ability to inquire into concepts using a range of
                resources
              </li>
              <li>
                ability to interpret complex questions and apply efficient
                strategies to solve problems
              </li>
            </ul>
          </li>
          <li>
            <strong>Negative</strong>
            <ul>
              <li>
                persevering with more difficult problems and thinking of
                different strategies to approach the question
              </li>
              <li>
                taking the time to inquire into concepts using a range of
                resources
              </li>
            </ul>
          </li>
        </ul>
        <p>
          When the user details a student with a set of positive and negative
          traits, they will populate the pool of comments. The app will then
          choose commending and suggesting comments from the pool and show them
          to the user to review and use.
        </p>
      </section>
      <section>
        <h2>How-to</h2>
        <p>
          Click the <strong>Commments</strong> button on the top menu to
          generate comments.
        </p>
        <h3>Gender</h3>
        <p>
          Required for the pronouns. Use <strong>male</strong> for he/him,{" "}
          <strong>female</strong> for she/her, and <strong>other</strong> for
          they/them.
        </p>
        <h3>Topics and skills</h3>
        <p>
          If you fill these in, the app will also generate topic and skill
          comments. Fill the boxes in and click the <strong>label</strong>{" "}
          buttons to either print a commending (good) comment or suggesting
          (bad) comment. For example, the picture below shows a student who
          achieved well in the Algebra topic and needs improvement in the
          Measurement topic.
        </p>
        <img src="write1.png" alt="including topics" />
        <p>
          The picture below shows a student who needs some practise in adding
          fractions.
        </p>
        <img src="write2.png" alt="including skills" />
        <h3>Traits</h3>
        <p>
          Each trait is classified according to the effort grade categories:
          Punctuality and Organisation, Effective Use of Class Time and
          Technology, Independent Approach to Learning, Meeting Deadlines, and
          Others (not part of effort grades). Clicking the trait will change its
          status.
        </p>
        <p>
          You can mark as many traits as positive or negative, but note that
          only <strong>up to 16</strong> of them (eight positives and eight
          negatives) will populate the comment pool due to the current
          restriction in the database.
        </p>
        <p>
          Once you are happy with the choices, press the{" "}
          <strong>Load comments</strong> button. The app will start download the
          comments.
        </p>

        <h3>Results</h3>
        <p>
          Once the comments are downloaded, you will see the effort grades and
          comments.
        </p>

        <img src="write3.png" alt="generated effort grades" />

        <p>
          The effort grades are calculated from the traits. The more the traits
          in each criteria are marked as positive, the more grades the students
          will receive. There is currently a cap of{" "}
          <strong>six positive traits</strong> to receive a grade of 5.
        </p>

        <p>
          You can drag and copy the values to paste them into Excel or other
          programs, but it will also copy the styles. Use the{" "}
          <strong>Copy</strong> button to copy the values only.
        </p>

        <img src="write4.png" alt="generated comments" />

        <p>
          There will be up to 12 comments, six commending and six suggesting.
          One missing feature is the automatic conversion of verbs to gerends
          (i.e. adding &quot;ing&quot; at the end), which you need to do
          manually. I do not have plans to write the logic any time soon, you
          are welcome to suggest me{" "}
          <A
            blank
            href="https://continuingstudies.uvic.ca/elc/studyzone/410/grammar/gerund"
          >
            an implementation
          </A>
          !
        </p>
        <p>
          Once you are happy with the comments, you can copy the comments by
          pressing the <strong>Copy</strong> button. The app will then show a
          pop-up message asking if you want to clear the traits. If you select{" "}
          <strong>Yes</strong>, the form will reset to the initial state and you
          can move on to the next student.
        </p>
      </section>
      <section>
        <h2>Updates</h2>
        <p>
          The app is still in its alpha stage, and there may be some bugs and
          many traits are missing their comments. I expect every trait will have
          at least one positive and one negative comment before September.
        </p>
      </section>
      <section>
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
      </section>
    </article>
  );
}
