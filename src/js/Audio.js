import React, { useRef, useEffect, useContext } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import { Midi } from '@tonejs/midi'
import PlayIcon from './functions/PlayIcon.js';

import audio from "../audio/strings-no-2.ogg";
import midi from "../audio/strings-no-2.mid";
import { Context } from "./context/Context.js";

const Audio = () => {
    let animation = null;
    const sketchRef = useRef();
    const { updateNotes, resetNotes, updateIsAudioPlaying } = useContext(Context);

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.audioLoaded = false;

        p.player = null;

        p.PPQ = 3840 * 4;

        p.loadMidi = () => {
            Midi.fromUrl(midi).then(
                function(result) {
                    console.log(result);
                    const noteSet1 = result.tracks[9].notes; // Sampler 3 - ORCHSTRINGS
                    p.scheduleCueSet(noteSet1, 'executeCueSet1');
                    p.audioLoaded = true;
                    // document.getElementById("loader").classList.add("loading--complete");
                    document.getElementById("play-icon").classList.remove("fade-out");
                }
            );
            
        }

        p.preload = () => {
            p.song = p.loadSound(audio, p.loadMidi);
            p.song.onended(p.logCredits);
        }

        p.scheduleCueSet = (noteSet, callbackName, poly = false)  => {
            let lastTicks = -1,
                currentCue = 1;
            for (let i = 0; i < noteSet.length; i++) {
                const note = noteSet[i],
                    { ticks, time } = note;
                if(ticks !== lastTicks || poly){
                    note.currentCue = currentCue;
                    p.song.addCue(time, p[callbackName], note);
                    lastTicks = ticks;
                    currentCue++;
                }
            }
        } 


        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.noLoop()
        }

        p.draw = () => {
            if(p.audioLoaded && p.song.isPlaying()){

            }
        }


        p.executeCueSet1 = (note) => {
            const { currentCue } = note;
            const colours = ['blue', 'orange', 'pink', 'purple'],
                colour  = colours[Math.floor(Math.random() * colours.length)];

            if(currentCue % 4 === 1){
                resetNotes();
            }

            updateNotes(
                {
                    colour: colour,
                    xPos: p.random(-50, 50),
                    yPos: p.random(-50, 50),
                    zPos: p.random(-50, 50)
                }
            )
        }

        p.mousePressed = () => {
            
        }

        p.creditsLogged = false;

        p.logCredits = () => {
            if (
                !p.creditsLogged &&
                parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
            ) {
                p.creditsLogged = true;
                    console.log(
                    "Music By: http://labcat.nz/",
                    "\n",
                    "Animation By: https://github.com/LABCAT/"
                );
                p.song.stop();
            }
        };

        p.reset = () => {

        }

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.canvas = p.resizeCanvas(p.canvasWidth, p.canvasHeight);
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    const playHandler = () => {
        console.log(animation);
        if(animation) {
            if(animation.audioLoaded){
                console.log(animation.song);
                if (animation.song.isPlaying()) {
                    animation.song.pause();
                } else {
                    if (parseInt(animation.song.currentTime()) >= parseInt(animation.song.buffer.duration)) {
                        animation.reset();
                    }
                    // document.getElementById("play-icon").classList.add("fade-out");
                    animation.canvas.addClass("fade-in");
                    animation.song.play();
                }
            }
        }
    }

    useEffect(() => {
        animation = new p5(Sketch, sketchRef.current);
    }, []);


    return (
        <div ref={sketchRef}>
            <button onClick={playHandler} id="play-button">
                <PlayIcon  />
            </button>
        </div>
    );
};

export default Audio;
