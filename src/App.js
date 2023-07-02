import { useState } from 'react';
import './App.css';

const endPunctuationRE = /[\.\?!]/;
const parensRE = /[\.\?!\(\)]/;

function checkNameForError(name) {
  if (name.length >= 30) return true;
  if (name.match(endPunctuationRE)) return true;
  if (name.match(parensRE)) return true;
  return false;
}

function checkReasonForError(reason) {
  if (reason.length >= 200) return true;
  if (reason.match(endPunctuationRE)) return true;
  return false;
}

const spaces = '_____________________';
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function getOrdinal(number) {
  const mod100 = number % 100;
  const mod10 = number % 10;

  if (mod10 === 1 && mod100 !== 11) {
    return number + 'st';
  } else if (mod10 === 2 && mod100 !== 12) {
    return number + 'nd';
  } else if (mod10 === 3 && mod100 !== 13) {
    return number + 'rd';
  } else {
    return number + 'th';
  }
}

for (let index = 0; index <= 31; index++) {
  console.log(index, getOrdinal(index));
}

function App() {
  const [rawName, setName] = useState('');
  const nameError = checkNameForError(rawName);
  const printedName = (nameError || !rawName) ? spaces : rawName;

  const [rawReason, setReason] = useState('');
  const reasonError = checkReasonForError(rawReason);
  const printedReason = (reasonError || !rawReason) ? spaces : rawReason;

  const today = new Date();
  const year = today.getFullYear();
  const day = today.getDate();
  const month = months[today.getMonth()];
  const shortDateString = `${month} ${day}, ${year}`;
  const fancyDateString = `${getOrdinal(day)} day of ${month}, in the year ${year}`;

  return (
    <div className="main">
      <div className="web">
        <h1>
          I'm Sorry, but I Signed an NDA 🤷
        </h1>
        <p>
          Gap in your resume? <br />
          Need to sound more interesting at parties? <br />
          <strong>Just sign an NDA.</strong>
        </p>

        <form>
          <div>
            Your full name:<br />
            <input className={`input ${nameError && 'error'}`} onChange={e => setName(e.target.value)} />
            <br />
            {nameError && <span className="error-reason">
              Go easy on the punctuation; keep it to 30 characters.
            </span>}
            <br />
          </div>

          <div>
            What would you like to avoid disclosing? <br />
            <textarea className={`input ${reasonError && 'error'}`} onChange={e => setReason(e.target.value)} />
            <br />
            {reasonError && <span className="error-reason">Keep it to 200 characters; avoid end punctuation (semicolons are cool).</span>}
            <br />
          </div>
        </form>


        <button onClick={window.print} className="input">
          Print
        </button>

      </div>


      <div className="print">
        <h1>Non-Disclosure Agreement </h1>

        <hr />

        <h2>I. Parties</h2>
        <p>This non-disclosure agreement is entered into on this {fancyDateString} (hereinafter referred to as the "Effective Date") by and between the undersigned party, identified as {printedName} (hereinafter referred to as the "Receiving Party"), and no one else (hereinafter referred to as the “Undisclosed Party").</p>

        <h2>II. Unilateral Agreement</h2>
        <p>The Receiving Party expressly acknowledges and affirms their consent to be bound by the terms and conditions set forth in this Agreement. Henceforth, this Agreement can be referred to as a "Non-Disclosure Agreement" or "NDA." The primary objective of this Agreement is to enable the Receiving Party to claim truthfully that they have "signed an NDA" concerning the information as described in Section III below. This Agreement shall commence its effect on the Effective Date and shall remain in effect for ten (10) years henceforth.</p>

        <h2>III. Confidential Information</h2>
        <p>The Receiving Party hereby acknowledges and confirms that this Agreement is specifically intended to govern the handling, use, and disclosure of certain sensitive information, collectively referred to as the "Confidential Information." The Confidential Information may include, but is not limited to, trade secrets, business plans, financial data, know-how, wasted summers, embarrassing jobs, misspent time, awkward photos, failed relationships, and any other non-public information which is known or has been known by the Receiving Party. This Agreement specifically includes, but is not limited to, {printedReason}.</p>

        <h2 className="page-break-before">IV. Stipulations</h2>
        <p>By the Receiving Party's execution and delivery of this Agreement, the Receiving Party explicitly acknowledges the following:</p>
        <ol>
          <li>
            <h3>Non-Disclosure</h3>
            <p>The Receiving Party shall refrain from directly or indirectly disclosing, disseminating, or making available the Confidential Information to any third party without the prior consent of their own conscience ("internal compass"), except as required by applicable and governing law.</p>
          </li>
          <li>
            <h3>No Further Benefits</h3>
            <p>The Receiving Party acknowledges and agrees that beyond the obligations and benefits expressly outlined in this Agreement, no other benefits, rights, or entitlements shall arise from this Agreement. In its speculation and naivety, this Agreement is best thought of as fan fiction.</p>
          </li>
          <li>
            <h3>Legal Advice</h3>
            <p>The Receiving Party further acknowledges that this Agreement has been prepared without the involvement of any legal counsel whatsoever. The Receiving Party acknowledges that it is their responsibility to seek independent legal advice to ensure the sufficiency of this Agreement, considering their specific circumstances.</p>
          </li>
          <li>
            <h3>Severability</h3>
            <p>In the event that any provision of this Agreement is deemed invalid, unenforceable, or contrary to law, the invalid provision shall be deemed severed from this Agreement, and any remaining provisions shall continue in full force and effect.</p>
          </li>
        </ol>

        <h2 className="page-break-before">V. Signatures</h2>
        <p>Receiving Party:<br />
          Signature: _____________________<br />
          Printed Name: {printedName} <br />
          Date: {shortDateString}</p>

        <p>Undisclosed Party:<br />
          Signature: <span className="script">No One Else</span><br />
          Printed Name: No One Else<br />
          Date: {shortDateString}</p>
      </div>
    </div>
  );
}

export default App;
