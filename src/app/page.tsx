"use client";
import Image from "next/image";
import AudioCaptureButton from "@/components/DesktopAudio";
import SideBar from "@/components/SideBar";
import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useRef, useState } from "react";

  dotenv.config();

export default function Home() {
  const [finalTranscript, setFinalTranscript] = useState("");
  const [transcriptBoxValue, setTranscriptBoxValue] = useState("");
  const transcriptRef = useRef<HTMLDivElement>(null);
  //let recognition: any;
  const recognition = useRef<any>(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new webkitSpeechRecognition();
    } else {
      alert(
        "Your browser does not support the Web Speech API. Please try another browser."
      );
    }
  }, []);

  const startTranscription = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Your browser does not support the Web Speech API. Please try another browser."
      );
    } else {
      //recognition = new webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          let currentResult = event.results[i];
          if (currentResult.isFinal) {
            setTranscriptBoxValue(
              (prevValue) => prevValue + " " + currentResult[0].transcript
            );
          }
          interimTranscript += currentResult[0].transcript;
        }
        if (transcriptRef.current) {
          transcriptRef.current.innerText =
            finalTranscript + " " + interimTranscript;
        }
      };

      recognition.current.start();
    }
  };

  const stopTranscription = () => {
    if (recognition) {
      recognition.current.stop();
      console.log("Speech recognition has stopped.");
    }
  };

  const clearTranscription = () => {
    setFinalTranscript("");
    setTranscriptBoxValue("");
    if (transcriptRef.current) {
      transcriptRef.current.innerText = "";
    }
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("data-name", "BMC-Widget");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-id", bmcId);
    script.setAttribute("data-description", "Thank you for your support!");
    script.setAttribute(
      "data-message",
      "This website is free to use. Do you want to help support it?"
    );
    script.setAttribute("data-color", "#FF5F5F");
    script.setAttribute("data-position", "right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");
    script.async = true;
    script.onload = function () {
      var evt = document.createEvent("Event");
      evt.initEvent("DOMContentLoaded", false, false);
      window.dispatchEvent(evt);
    };

  const numRows = Math.max(
    3,
    Math.ceil(transcriptBoxValue.split("\n").length / 2)
  );

  return (
    <>
      <SideBar></SideBar>
      <main className="flex flex-col items-center justify-between p-24 bg-white dark:bg-[#171717]">
        {/* <div className="h-full w-[15%] min-w-[20rem] absolute left-0 top-0 bg-gray-200"></div> */}

        <div>
          <h1 style={{ fontSize: "60px", fontWeight: "450" }}>
            GPT Finds Title
          </h1>
        </div>
        <MDEditor
          value={transcriptBoxValue}
          onChange={(value) => value && setTranscriptBoxValue(value)}
          preview="edit"
          height={400}
          visiableDragbar={false}
        />

    const startTranscription = () => {
      if (!("webkitSpeechRecognition" in window)) {
        alert("Your browser does not support the Web Speech API. Please try another browser.");
      } else {
        recognition.current = new webkitSpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
        
        recognition.current.onresult = async (event) => {
          let interimTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            let currentResult = event.results[i];
            if (currentResult.isFinal) {
              const transcript = currentResult[0].transcript;
              setTranscriptBoxValue((prevValue) => prevValue + transcript);
    
              const newWords = transcript.split(' ').length;
              setWordCount((prevWordCount) => prevWordCount + newWords);
              setWordsSinceLastApiCall((prevCount) => prevCount + newWords);
              
              // Check if the accumulated words since the last API call are more than or equal to 250
              if (wordsSinceLastApiCall + newWords >= 10) {
                console.log("More than 250 words have been recognized.");
                  
                // Assuming finalTranscript is up to date with the latest state
                let words = (finalTranscript + transcript).split(" ");
                let chunks = [];
                for (let i = 0; i < words.length; i += 250) {
                  chunks.push(words.slice(i, i + 250).join(" "));
                }
                console.log("Chunks: ", chunks);
        
                // Reset word count
                setWordCount(0);
                setWordsSinceLastApiCall(0);
      
                // Send the chunks to the API and handle the response
                const response = await generateResponse(chunks);
                setGeneratedResponses(response);
              } else {
                // Otherwise, just update the word count
                // setWordCount(newWordCount);
              }
            }
            interimTranscript += currentResult[0].transcript;
          }
        
          if (transcriptRef.current) {
            transcriptRef.current.innerText = finalTranscript + " " + interimTranscript;
          }
        };
        recognition.current.start();
      }
    };

        <div className="bg-gray-200 fixed items-end flex h-1/32 w-1/4 left-100 top-5 text-white p-2.5 rounded-full">
          <button
            onClick={startTranscription}
            className="absolute right-12 top-1 h-3 w-3 rounded-full bg-green-500 text-white"
          ></button>
          <button
            onClick={stopTranscription}
            className="absolute right-7 top-1 h-3 w-3 rounded-full bg-yellow-500 text-white"
          ></button>
          <button
            onClick={clearTranscription}
            className="absolute right-2 top-1 h-3 w-3 rounded-full bg-red-500 text-white"
          ></button>
        </div>
        <AudioCaptureButton />
      </main>
    </>
  );
}

    const clearTranscription = () => {
      setFinalTranscript("");
      setTranscriptBoxValue("");
      if (transcriptRef.current) {
        transcriptRef.current.innerText = "";
      }
    };
    useEffect(() => {
      const script = document.createElement("script");
      script.setAttribute("data-name", "BMC-Widget");
      script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
      script.setAttribute("data-id", bmcId);
      script.setAttribute("data-description", "Thank you for your support!");
      script.setAttribute(
        "data-message",
        "This website is free to use. Do you want to help support it?"
      );
      script.setAttribute("data-color", "#FF5F5F");
      script.setAttribute("data-position", "right");
      script.setAttribute("data-x_margin", "18");
      script.setAttribute("data-y_margin", "18");
      script.async = true;
      script.onload = function () {
        var evt = document.createEvent("Event");
        evt.initEvent("DOMContentLoaded", false, false);
        window.dispatchEvent(evt);
      };
      document.head.appendChild(script);
    }, []);

    const numRows = Math.max(
      3,
      Math.ceil(transcriptBoxValue.split("\n").length / 2)
    );

    return (
      <>
        <SideBar></SideBar>
        <main className="flex flex-col items-center justify-between p-24 bg-white">
          {/* <div className="h-full w-[15%] min-w-[20rem] absolute left-0 top-0 bg-gray-200"></div> */}

          <div>
            <h1 style={{ fontSize: "50px", fontWeight: "450" }}>
              GPT Finds Title
            </h1>
          </div>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(transcriptBoxValue),
            }}
          /> */}
          <MarkdownEditor />


          <button className="fixed bottom-5 right-5 h-12 w-12 rounded-full bg-gray-200 text-white"></button>

          <div className="bg-gray-200 fixed items-end flex h-1/32 w-1/4 left-100 top-5 text-white p-2.5 rounded-full">
            <button
              onClick={startTranscription}
              className="absolute right-12 top-1 h-3 w-3 rounded-full bg-green-500 text-white"
            ></button>
            <button
              onClick={stopTranscription}
              className="absolute right-7 top-1 h-3 w-3 rounded-full bg-yellow-500 text-white"
            ></button>
            <button
              onClick={clearTranscription}
              className="absolute right-2 top-1 h-3 w-3 rounded-full bg-red-500 text-white"
            ></button>
          </div>
        </main>
      </>
    );
  }
