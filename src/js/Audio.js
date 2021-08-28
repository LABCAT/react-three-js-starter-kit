import React, { useState, useEffect } from "react";
import Tone, { Buffer } from 'tone'
import { Midi } from '@tonejs/midi'
import audio from "../audio/strings-no-2.ogg";
import midi from "../audio/strings-no-2.mid";

const Audio = () => {
    Tone.Transport.PPQ = 3840 * 4;
    let buffer = null,
        player = null
    const [loaded, setLoaded] = useState(false),
        initPlayer = () => {
            if(!loaded){
                player = new Tone.Player(audio).toMaster();
                player.sync().start(0);
                document.body.addEventListener('click',  async () => { mousePressed() }, true);
                setLoaded(true);
                console.log("loaded");
            }
        },
        mousePressed = () => {
          
          if (player.state === "started") {
            // Use the Tone.Transport to pause audio
            Tone.Transport.pause();
          } 
          else if (player.state === "stopped") {
            // Use the Tone.Transport to start again
            Tone.Transport.start();
            console.log(player.state);
          }
        };

    useEffect(
        () => {
            if(!loaded){
              Midi.fromUrl(midi).then(
                  function(result) {
                    console.log(result.tracks);
                      const noteSet1 = result.tracks[0].notes;
                      buffer = new Buffer(audio, () => { initPlayer(); });
                      let lastTicks = -1;
                      for (let i = 0; i < noteSet1.length; i++) {
                          const note = noteSet1[i],
                              { ticks, time } = note;
                          if(ticks !== lastTicks){
                              // Tone.Transport.schedule(
                              //     () => {
                              //         //update the global contect provider
                              //     }, 
                              //     time
                              // );
                              lastTicks = ticks;
                          }
                      } 
                  }
              );
            }
        }, 
        [loaded]
    );
    
    

    return <></>;
}
 
export default Audio;
