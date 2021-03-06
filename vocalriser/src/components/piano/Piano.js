
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import './Piano.css'
let Soundfont = require('soundfont-player')


const PianoPlay = ({width,classAdd}) => {

    
    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('d4');
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    return (
        <Piano
            noteRange={{ first: firstNote, last: lastNote }}
            playNote={(midiNumber) => {
                Soundfont.instrument(new AudioContext(), 'electric_piano_1', { soundfont: 'MusyngKite' }).then(function (marimba) {
                    marimba.play(midiNumber)
                })
            }}
            stopNote={(midiNumber) => {
                // Stop playing a given note - see notes below
            }}
            width={width}
            className={`piano ${classAdd}`}
            keyboardShortcuts={keyboardShortcuts}
        />
    );
}

export default PianoPlay