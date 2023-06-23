import * as Tonal from "tonal";
import * as ABCJS from "abcjs";

import "./App.css";

function updateChord(value) {
  const valueCleaned = value.replace(/[(),\s]/g, "");
  const result = Tonal.Chord.get(valueCleaned);
  const resultWithOctave = Tonal.Chord.getChord(
    result.aliases[0],
    result.tonic + "4"
  );
  if (result.notes.join(" ") !== "") {
    const notes = result.notes.join(" ");
    document.getElementById("chordOutput").textContent =
      result.symbol + " 和弦的組成音是 " + notes;
    let abcNoteArray = resultWithOctave.notes.map((item) => {
      // Replace '#' with '^' and 'b' with '_'
      let replaced = item.replace(/#/g, "^").replace(/b/g, "_");

      // Check if item contains '5' or '6', if so, convert to lowercase
      if (replaced.includes("5") || replaced.includes("6")) {
        replaced = replaced.toLowerCase();
      }

      // Move the first character to the end
      let rearranged = replaced.substring(1) + replaced.charAt(0);

      // Check if item contains '6', if so, add a "'" at the end
      if (rearranged.includes("6")) {
        rearranged = rearranged + "'";
      }

      // Remove all numbers
      rearranged = rearranged.replace(/\d/g, "");

      return rearranged;
    });

    const abcSyntax = "[" + abcNoteArray.join("8") + "8]";
    ABCJS.renderAbc("paper", `X:1\nK:C\n${abcSyntax}`);
  }
}

function App() {
  return (
    <div className="App">
      <h3>
        不囉唆的和弦代號查詢器 by{" "}
        <a href="https://nicechord.com">NiceChord 好和弦</a>
      </h3>
      <div>
        <input
          type="text"
          id="inputField"
          onInput={(e) => {
            updateChord(e.target.value);
          }}
          placeholder="輸入和弦代號"
        />
      </div>
      <div id="chordOutput"></div>
      <div id="paper"></div>
    </div>
  );
}

export default App;
