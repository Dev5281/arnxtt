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

        const materials = {
            fabricBlue: {
                diffuse: "/assets/textures/fabric_blue_diffuse.jpg",
                normal: "/assets/textures/fabric_blue_normal.jpg",
                mr: "/assets/textures/fabric_blue_metallicRoughness.jpg",
            },
            leatherBrown: {
                diffuse: "/assets/textures/leather_brown_texture1.jpg",
                normal: "/assets/textures/leather_brown_texture.jpg",
                mr: "/assets/textures/leather_brown_metallicRoughness.jpg",
            }
        };

        const applyMaterialSet = async (set) => {
            for (const material of viewerRef.current.model.materials) {
                if (set) {
                    const diffuse = await viewerRef.current.createTexture(set.diffuse);
                    const normal = await viewerRef.current.createTexture(set.normal);
                    const mr = await viewerRef.current.createTexture(set.mr);

                    material.pbrMetallicRoughness.baseColorTexture.setTexture(diffuse);
                    material.normalTexture.setTexture(normal);
                    material.pbrMetallicRoughness.metallicRoughnessTexture.setTexture(mr);
                } else {
                    // Clear textures
                    material.pbrMetallicRoughness.baseColorTexture.setTexture(null);
                    material.normalTexture.setTexture(null);
                    material.pbrMetallicRoughness.metallicRoughnessTexture.setTexture(null);
                }
            }
        };

        viewerRef.current.addEventListener("load", () => {
            document.querySelector('#materialSelect').addEventListener('input', (event) => {
                const value = event.target.value;
                if (value === "none") {
                    applyMaterialSet(null);
                } else {
                    applyMaterialSet(materials[value]);
                }
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
                            <p>Material Preset</p>
                            <select id="materialSelect">
                                <option value="none">None</option>
                                <option value="fabricBlue">Fabric Blue</option>
                                <option value="leatherBrown">Leather Brown</option>
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
