import { useRef } from "react";
import QRCode from "react-qr-code";
import '@google/model-viewer';
import { useEffect } from "react";


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
    const view = () => {
  if (!viewerRef.current) return;
  viewerRef.current.activateAR();
};

    useEffect(() => {
        if (!viewerRef.current) return;

        viewerRef.current.addEventListener("load", () => {
            const material = viewerRef.current.model.materials[0];

            const createAndApplyTexture = async (channel, event) => {
                if (event.target.value === "None") {
                    if (channel.includes('base') || channel.includes('metallic')) {
                        material.pbrMetallicRoughness[channel].setTexture(null);
                    } else {
                        material[channel].setTexture(null);
                    }
                } else {
                    const texture = await viewerRef.current.createTexture(event.target.value);
                    if (channel.includes('base') || channel.includes('metallic')) {
                        material.pbrMetallicRoughness[channel].setTexture(texture);
                    } else {
                        material[channel].setTexture(texture);
                    }
                }
            };

            document.querySelector('#diffuse').addEventListener('input', (event) => {
                createAndApplyTexture('baseColorTexture', event);
            });

            document.querySelector('#metallicRoughness').addEventListener('input', (event) => {
                createAndApplyTexture('metallicRoughnessTexture', event);
            });

            document.querySelector('#normals').addEventListener('input', (event) => {
                createAndApplyTexture('normalTexture', event);
            });
        });
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <model-viewer
                    ref={viewerRef}
                    src="/assets/models/sofa_chair.glb"
                    poster="/assets/posters/chair.webp"
                    // environment-image="/assets/environments/studio.hdr"
                    ar
                    ar-button
                    camera-controls
                    shadow-intensity="1"
                    touch-action="pan-y"
                    ar-modes="webxr scene-viewer quick-look"
                    style={{ width: "60%", height: "70vh" }}
                >
                    <div className="controls" style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '5px', maxWidth: '200px' }}>
                        <div>
                            <p>Diffuse</p>
                            <select id="diffuse">
                                <option>None</option>
                                <option value="/assets/textures/diffuse.jpg">Diffuse Texture</option>
                            </select>
                        </div>
                        <div>
                            <p>Metallic-Roughness</p>
                            <select id="metallicRoughness">
                                <option>None</option>
                                <option value="/assets/textures/metallicRoughness.jpg">Metallic-Roughness Texture</option>
                            </select>
                        </div>
                        <div>
                            <p>Normals</p>
                            <select id="normals">
                                <option>None</option>
                                <option value="/assets/textures/normal.jpg">Normal Texture</option>
                            </select>
                        </div>
                    </div>
                </model-viewer>
                <div style={{ width: "15%", display: 'flex', justifyContent: 'center', marginLeft: '20px' }}>
                    <QRCode
                        size={200}
                        value={"https://arnxtt-qukm.vercel.app/"}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <button onClick={view}>View in AR</button>
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
