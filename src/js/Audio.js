import React, { useEffect } from "react";
import * as Tone from 'tone'
import { Midi } from '@tonejs/midi'
//import audio from "../audio/.ogg";
//import midi from "../audio/.mid";

const Audio = () => {
    buffer = null;
    player = null;
    isLoaded = false;

    Tone.Transport.PPQ = 3840 * 4;
    
    const loaded = () => {
        this.player = new Tone.Player(buffer).toMaster();
        this.player.sync().start(0);
        this.isLoaded = true;
    },
    mousePressed = () => {
      if (this.player.state === "started") {
        // Use the Tone.Transport to pause audio
        Tone.Transport.pause();
      } 
      else if (this.player.state === "stopped") {
        // Use the Tone.Transport to start again
        Tone.Transport.start();
      }
    };

    Midi.fromUrl(midi).then(
        function(result) {
            p.noteSet1 = result.tracks[0].notes;
            this.buffer = new Tone.Buffer(audio, loaded());
            let lastTicks = -1;
            for (let i = 0; i < p.noteSet1.length; i++) {
                const note = p.noteSet1[i],
                    { ticks, time } = note;
                if(ticks !== lastTicks){
                    Tone.Transport.schedule(
                        () => {
                            //update the global contect provider
                        }, 
                        time
                    );
                    lastTicks = ticks;
                }
            } 
        }
    );

    return <></>;
}
 
export default Audio;
