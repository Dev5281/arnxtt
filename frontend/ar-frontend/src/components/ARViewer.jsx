import { useRef } from "react";
import QRCode from "react-qr-code";
import '@google/model-viewer';


const ARViewer = () => {
    const viewerRef = useRef(null);
    // console.log(viewerRef);
    //   const setColor = (color) => {
    //     const material = viewerRef?.current?.model?.materials[0];
    //     const colors = {
    //       red: [1, 0, 0, 1],
    //       blue: [0, 0, 1, 1],
    //       black: [0, 0, 0, 1]
    //     };
    //     material.pbrMetallicRoughness.setBaseColorFactor(colors[color]);
    //   };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <model-viewer
                    ref={viewerRef}
                    src="/assets/models/1739779353165_chair (2).glb"
                    poster="/assets/posters/chair.webp"
                    // environment-image="/assets/environments/studio.hdr"
                    ar
                    ar-button
                    camera-controls
                    shadow-intensity="1"
                    touch-action="pan-y"
                    ar-modes="webxr scene-viewer quick-look"
                    style={{ width: "60%", height: "70vh" }}
                />
                <div style={{ width: "15%", display: 'flex', justifyContent: 'center', marginLeft: '20px' }}>
                    <QRCode
                        size={200}
                        value={"hello"}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </div>

            {/* <div className="controls">
        <button onClick={() => setColor("red")}>Red</button>
        <button onClick={() => setColor("blue")}>Blue</button>
        <button onClick={() => setColor("black")}>Black</button>
      </div> */}
        </>
    );
};

export default ARViewer;
