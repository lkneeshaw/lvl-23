// @codekit-prepend "jquery.js";
// @codekit-prepend "semantic.js";
// @codekit-prepend "airtable.js";


//===================================================
//AIRTABLE STUFF

// CONFIGURE & "Handshake"
//var Airtable = require('airtable');
//Airtable.configure({
//    endpointUrl: 'https://api.airtable.com',
//    apiKey: 'app4MMf37RjlzUWBw'
//});
//var base = Airtable.base('app4MMf37RjlzUWBw');
//// Check-Check
//console.log(base);

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyCYIL8w8qxlK7UU'}).base('app4MMf37RjlzUWBw');


// Get Records
base('Hamilton').select({
    maxRecords: 1,
    view: 'Grid view'
}).firstPage(function(err, records) {
    
    if (err) { console.error(err); return; }

    records.forEach(function(record) {
       
      // Check-Check 
       console.log('Retrieved', record.get('Name'));
       console.log( record.fields.Image[0].url ); 
        console.log(record);

      // Display Data
      showHam(record)

    });
});

// Template Literal
var showHam = function(record) {

  var template = 
  `
    <section class="ui card">
        <div class="image">
           <img src=" ${record.fields.Image[0].url} " alt="">
        </div>
       <div class="content">
           <h3>${record.fields.Name}</h3>
           <p class="description">
               ${record.fields.Description}
           </p>
       </div>
    </section>
  `;

  // Display Collected Data
  $('#hamilton').append(template);

}

//============================================
// JS30 stuff


const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
    voices = this.getVoices();
//    console.log(voices)
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function setVoice() {
//    console.log(this.value);
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', toggle.bind(null, false));