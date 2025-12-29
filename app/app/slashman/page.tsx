"use client";
import { useRef, useState } from "react";

const figlet = `
  /////  //      //  /////  //   //
 //      //      // //      // //
//       //      // //      ////
//       //      // //      // //
 //      //      //  //     //  //
  /////  //////  //   ///// //   //

////// /////
  //   //  //
  //   //  //
  //   //  //
  //   //  //
  //   /////

//    // /////// /////// ////////
///  /// //      //         //
// // // /////   /////      //
//    // //      //         //
//    // //      //         //
//    // /////// ///////    //

////// //  // ///////
  //   //  // //
  //   ////// /////
  //   //  // //
  //   //  // //
  //   //  // ///////

 /////  //       ////   /////  //  // //    //  ////  //   //
//      //      //  // //      //  // ///  /// //  // ///  //
 ////   //      ////// //////  ////// // // // ////// // / //
    //  //      //  //     //  //  // //    // //  // //  ///
/////   //////  //  // /////   //  // //    // //  // //   //
`;

export default function Slashman() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [started, setStarted] = useState(false);

    const handleClick = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.play();
            setStarted(true);
        }
    };

    return (
        <div 
            className="overflow-hidden bg-black h-[100vh] flex justify-center items-center cursor-pointer relative"
            onClick={!started ? handleClick : undefined}
        >
            <video 
                ref={videoRef}
                className="h-[100vh] object-cover" 
                autoPlay 
                muted 
                loop 
                playsInline
            >
                <source src="/slash/main.mp4" type="video/mp4" />
            </video>
            
            {!started && (
                <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
                    <pre className="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-mono whitespace-pre select-none text-center">
                        {figlet}
                    </pre>
                </div>
            )}
        </div>
    );
}
