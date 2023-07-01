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

function App() {
  const [rawName, setName] = useState('');
  const nameError = checkNameForError(rawName);
  const printedName = (nameError || !rawName) ? spaces : rawName;

  const [rawReason, setReason] = useState('');
  const reasonError = checkReasonForError(rawReason);
  const printedReason = (reasonError || !rawReason) ? spaces : rawReason;

  const today = new Date();
  const year = today.getFullYear();
  const date = today.getDate();
  const month = months[today.getMonth()];
  const fullDateString = `${month} ${date}, ${year}`;
  return (
    <div className="main">
      <div className="web">
        <h1>
          I'm Sorry, but I Signed an NDA 🤷
        </h1>
        <p>
          Gap in your resume? <br/>
          Need to sound more interesting at parties? <br/>
          <strong>Just sign an NDA.</strong>
        </p>

      <form>
        <div>
          Your full name:<br/>
          <input className={`input ${nameError && 'error'}`} onChange={e => setName(e.target.value)}/>
          <br/>
          {nameError && <span className="error-reason">
            Go easy on the punctuation; keep it to 30 characters.
          </span>}
          <br/>
        </div>

        <div>
          What would you like to avoid disclosing? <br/>
          <textarea className={`input ${reasonError && 'error'}`} onChange={e => setReason(e.target.value)}/>
          <br/>
          {reasonError && <span className="error-reason">Keep it to 200 characters; avoid end punctuation (semicolons are cool).</span>}
          <br/>
        </div>
      </form>


      <button onClick={window.print} className="input">
        Print
      </button>

      </div>


      <div className="print">
        <h1>Non-Disclosure Agreement </h1>

        <hr/>

        <h2>I. Parties</h2>
        This non-disclosure agreement, referred to hereafter as the "Agreement,"
        is entered into by {printedName} (the "Undersigned")  and Chris Bolin (the "System Administrator")
        on {fullDateString} (the Effective Date). 

        <h2>II. Unilateral Agreement</h2>

        The Undersigned agrees to withhold all Confidential Information as defined below from third parties. This agreement is effective beginning on the Effective Date and ending ten (10) years hence.

        <h2>III. Confidential Information</h2>

        The Undersigned aggress to keep the following information confidential: {printedReason}.

        <h2>IV. Obligations</h2>

        This document enables the Undersigned to truthfully respond that they "signed an NDA."
        There are almost certainly no further benefits.
        No lawyer has reviewed this Aggreement.
        This Agreement is best thought of as poorly researched fan fiction.

        <h2>V. Signatures</h2>

        <h3>Undersigned</h3>
        <div>Signature: {spaces}</div>
        <div>Print name: <span className="monospace">{printedName}</span></div>
        <div>Date: <span className="monospace">{fullDateString}</span></div>

        <h3>System Administrator</h3>
        <div>Signature: <span className="script">Chris Bolin</span></div>
        <div>Print name: <span className="monospace">Chris Bolin</span></div>
        <div>Date: <span className="monospace">{fullDateString}</span></div>
      </div>
    </div>
  );
}

export default App;
